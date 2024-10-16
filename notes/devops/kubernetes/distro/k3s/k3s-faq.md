---
title: K3S 常见问题
tags:
  - FAQ
---

# K3S 常见问题

:::caution

- 尽量指定固定的 node-ip
  - 避免因网络迁移导致集群不可用
  - 同时影响 tls
  - node.spec.addresses
    - type: InternalIP

:::

## K3S 网络结构

- 容器 10.42.0.0/16 - 可以 ping 通
- 服务 10.43.0.0/16 - 不可以 ping
- 每个节点一个 /24 网络 - 也就是说最多 255 个节点
- 每个节点最多获取到 255 个 容器 IP 和 服务 IP
  - 默认限制每个节点 110 个 Pod - 一般来说是足够的

:::caution

- 使用 host-gw, 重启/重建 tun 设备后路由丢失，目前通过重启 k3s 服务解决。
  - [flannel-io/flannel#1070](https://github.com/flannel-io/flannel/issues/1070)

:::

## 访问 K3S 的 ETCD

- 只支持部分接口

```bash
# kine 不支持 --keys-only
ETCDCTL_API=3 etcdctl --endpoints=unix:///var/lib/rancher/k3s/server/kine.sock get /registry/clusterrolebindings/system:kube-dns
# 所有
# ETCDCTL_API=3 etcdctl --endpoints=unix:///var/lib/rancher/k3s/server/kine.sock get / --prefix
```

## DNS 问题

```bash
nslookup kubernetes.default

# 确保网络正常
ping 1.1.1.1
```

- 确保 coredns 能联网
- kube-dns.kube-system.svc.cluster.local
  - 10.43.0.10
  - coredns
- coredns

## flannel 网络问题

```bash
# 排查 host 路由
route -n

cat /run/flannel/subnet.env

# host
ping 10.42.0.1

# 排查 pod 网络
tcpdump -i cni0 -nn -s0 -v -l host
```

```ini title="subnet.env"
FLANNEL_NETWORK=10.42.0.0/16
FLANNEL_SUBNET=10.42.0.1/24
FLANNEL_MTU=1450
FLANNEL_IPMASQ=true
```

## pod 之间网络不通

```bash
iptables -P FORWARD ACCEPT
```

- https://github.com/k3s-io/k3s/issues/8809

## containerd 配置

- /var/lib/rancher/k3s/agent/etc/containerd/config.toml
- config.toml.tmpl
- https://github.com/k3s-io/k3s/blob/master/pkg/agent/templates/templates_linux.go

## docker vs containerd

- docker
  - 操作运维熟悉
  - 可独立使用
  - docker 命令好用
  - 镜像、缓存会更加友好 - 虽然 containerd 有 docker shim
- containerd
  - docker 底层也是使用的 containerd
  - 因此使用 docker 会额外消耗一些内存
  - 没有专用的 cli - crictl 主要用于调试

---

如果已经运行了 docker 建议使用 docker，否则没必要额外安装，直接使用内置 containerd。

## k3s 每月重启

- 90 天 renew
- 随机 sleep 0-99 分钟

```bash
echo '#!/bin/sh -
sleep ${RANDOM:0:2}m

rc-service k3s restart --ifstarted
rc-service k0scontroller restart --ifstarted
' | sudo tee /etc/periodic/monthly/kube-restart
sudo chmod +x /etc/periodic/monthly/kube-restart

sudo rc-service crond start --ifstopped
sudo rc-update add crond
```

## k3s 状态清理

- K3S 节点重置
- cni0 和 flannel.1 不一定存在
  - 取决于安装方式
  - /var/lib/cni

**脚本清理**

```bash
# 如果通过 get.k3s.io 安装会有该脚本
/usr/local/bin/k3s-killall.sh
```

**手动清理**

```bash
# 清理 iptables 规则
iptables-save | grep -v KUBE- | grep -v CNI- | iptables-restore
iptables-save | grep -v 10.4[2,3] | iptables-restore

# 容器镜像清理
# 停止所有 pod，清除停止容器，清除 volume，但保留下载的镜像
docker stop $(docker ps -aq)
docker system prune --volumes -f
docker system prune -f
# 如果不想保留镜像
# docker system prune -a
# 取消所有挂载
sudo umount $(mount -v | grep '/var/lib/kubelet' | awk '{print $3}')
# k3s 和 kubelet 状态
sudo rm -rf /var/lib/rancher
sudo rm -rf /var/lib/kubelet
# kubeconf
sudo rm -f /etc/rancher/k3s/k3s.yaml
# 日志清理
sudo rm -rf /var/log/containers/*
sudo rm -rf /var/log/pods/*
sudo rm -f /var/log/k3s.log

# 如果用了数据库
echo drop table if exists kine | psql -d $DATABASE_URL

# 如果有日志文件，例如 --log k3s-server.log --alsologtostderr
rm k3s{,-server,-agent}.log -f

ip li del cni0
ip li del flannel.1
rm -rf /var/lib/cni/*
```

## K3S 部署资源使用情况分析

- AlpineLinux - 50M
  - 显存 32M
  - sshd,tincd,dbus
- dockerd - 97M + shim/8M
- containerd - 50M + shim/11M
  - docker 也依赖 containerd
- server 550M
  - `--disable=traefik，servicelb`
  - server 也会启动 agent
  - 容器
    - metrics-server
    - coredns
    - local-path-provisioner
- agent 180M
- 运行基础服务 - ingress-nginx, metallb, cert-manager, kubernetes-dashboard
  - server - 1G
  - agent - 450M
  - +linkerd
    - server 1.55G
    - agent 920M
- 参考
  - [K3s Resource Profiling](https://rancher.com/docs/k3s/latest/en/installation/installation-requirements/resource-profiling/)
  - [Profiling Lightweight Container Platforms: MicroK8s and K3s in Comparison to Kubernetes](http://ceur-ws.org/Vol-2839/paper11.pdf)

## 区分 worker 和 cp

- `--node-taint k3s-controlplane=true:NoExecute`
- `--node-taint CriticalAddonsOnly=true:NoExecute`
  - 不运行一般 payload
- --node-label, --node-taint
  - 第一次加入集群时有效

## 生成的证书自定义域名

- `--tls-san YOUR_IP_OR_HOSTNAME_HERE`

## x509: certificate relies on legacy Common Name field, use SANs or temporarily enable Common Name matching with GODEBUG=x509ignoreCN=0

```
E0905 23:03:57.992668   12600 controller.go:114] loading OpenAPI spec for "v1alpha1.tap.linkerd.io" failed with: failed to retrieve openAPI spec, http error: ResponseCode: 503, Body: Error trying to reach service: 'x509: certificate relies on legacy Common Name field, use SANs or temporarily enable Common Name matching with GODEBUG=x509ignoreCN=0', Header: map[Content-Type:[text/plain; charset=utf-8] X-Content-Type-Options:[nosniff]]
```

```bash
# 启动时添加环境变量
GODEBUG=x509ignoreCN=0
```

## k3s etcd 备份

- 默认快照目录 /server/db/snapshots

## 迁移 k3s data-dir

> data-dir 包含 etc, local-path StorageClass, longhorn 存储 - 影响性能

```bash
service k3s stop
# 如果没有 k3s-killal 可以考虑关闭 k3s 开机自动启动然后重启
k3s-killall

mkdir -p /data/k3s
rsync -aP /var/lib/rancher/k3s/ /data/k3s/

# 修改 data-dir 启动服务
echo 'data-dir: /data/k3s' >> /etc/rancher/k3s/config.yaml
service k3s start

# busybox 的 lsof 不支持过滤路径
apk search lsof
lsof +D /data/k3s | wc -l
# 输出 0 则迁移完成
lsof +D /var/lib/rancher/k3s | wc -l

# 清除
rm -rf /var/lib/rancher/k3s
```

## ContainerStatus from runtime service failed: rpc error: code = Unavailable desc = connection error: desc = "transport: Error while dialing dial unix: missing address"

似乎是 containerd 的问题

- https://github.com/k3s-io/k3s/issues/1901

## 出现很奇怪的 probe 失败，看不到日志，重启 pod 也无法修复

可能是是 k3s 网络 proxy 异常了，尝试重启 k3s 服务。

## k3s 占用大量带宽

- master 之间交互跑完了 50M 带宽

重启 k3s 解决

## k3s check-config

- cgroups V1/Hybrid on non-Systemd init - https://github.com/tianon/cgroupfs-mount
- https://raw.githubusercontent.com/k3s-io/k3s/master/contrib/util/check-config.sh
  - 还不支持 cgroupv2 [#3897](https://github.com/k3s-io/k3s/issues/3897)
- cgroupv2
  - https://github.com/k3s-io/k3s/issues/900

## log rotate

- 直接 truncate 方式
  - https://github.com/rancher/k3os/issues/433#issuecomment-749216549

## Failed to authenticate request from

通常是 worker 证书失效了

## x509: certificate has expired or is not yet valid

> 注意区分是 worker 证书失效还是 server 证书失效

```
x509: certificate has expired or is not yet valid: current time 2022-03-28T15:55:27+08:00 is after 2022-02-20T13:44:47Z
```

```bash title="检查失效时间"
# 当前证书 失效时间
curl -v -k https://localhost:6443 -s 2>&1 | grep date
openssl s_client -connect localhost:6443 -showcerts < /dev/null 2>&1 | openssl x509 -noout -enddate

for i in $(ls /var/lib/rancher/k3s/server/tls/*.crt); do
  echo $i
  openssl x509 -enddate -noout -in $i
done

kubectl get secret -n kube-system k3s-serving -o jsonpath='{.data.tls\.crt}' | base64 -d | openssl x509 -noout -text | grep Not
```

```bash title="触发 rotate"
openssl s_client -connect localhost:6443 -showcerts < /dev/null 2>&1 | openssl x509 -noout -startdate -enddate

# 设置为 < 90 天
date -s 20210514
# sudo hwclock -w

service k3s restart

# sudo chronyc -a makestep
```

```bash
# 可以尝试
kubectl --insecure-skip-tls-verify delete secret -n kube-system k3s-serving
rm -f /var/lib/rancher/k3s/server/tls/dynamic-cert.json
# 重启 k3s
```

- https://www.ibm.com/support/pages/node/6444205
- https://github.com/k3s-io/k3s/issues/1621

## Unable to authenticate the request err="invalid bearer token"

- server 版本不一致 导致过问题 - v1.20, v1.22

**可以尝试，不一定能解决**

```bash
kubectl -n kube-system get secrets | grep "coredns"

kubectl -n kube-system delete secret coredns-token-lkt4c
kubectl -n kube-system delete pod coredns-66c464876b-25kl9
```

- https://github.com/k3s-io/k3s/issues/2788

## etcdserver: mvcc: required revision has been compacted

- 没问题
- https://github.com/k3s-io/k3s/issues/4419#issuecomment-962897354

## transport: Error while dialing dial tcp 127.0.0.1:2379: connect: connection refused

- https://github.com/k3s-io/k3s/issues/4728
  - 双节点 HA Matser 重启后出现
  - [#5254](https://github.com/k3s-io/k3s/pull/5254)
- https://github.com/k3s-io/k3s/issues/2345

## Failed to reconcile with temporary etcd: walpb: crc mismatch

- k3s restore 旧的会放到 `${data-dir}/server/db/etcd-old/`
- 默认本地快照 `${data-dir}/server/db/snapshots`
- data-dir=/var/lib/rancher/k3s

```bash
k3s etcd-snapshot list
# 尝试恢复
k3s server --cluster-reset --cluster-reset-restore-path=/var/lib/rancher/k3s/server/db/snapshots/XXX

# mv /var/lib/rancher/k3s/server/db/etcd/ etcd.bk
# k3s etcd-snapshot prune --snapshot-retention 10
```

## cluster ID mismatch

部分 master 恢复后可能出现，其他节点需要 reset 或 restore

## invalid bearer token, Token has been invalidated

renew 后出现

## User "k3s-cloud-controller-manager" cannot get resource "leases" in API group "coordination.k8s.io" in the namespace "kube-system"

- https://github.com/k3s-io/k3s/issues/6119

## ulimit

```bash
# openrc
echo 'rc_ulimit="-n 1048576"' >> /etc/rancher/k3s/k3s.env
```

## 单节点转多节点

- 单节点 -> HA
- SQLite -> ETCD
- 修改存储然后重启即可
  - 启动的时候添加 cluster-init 即可
  - 当本地已经发现 etcd 数据库时，--cluster-init, --server, --datastore-endpoint 会被忽略
- https://docs.k3s.io/datastore/ha-embedded#existing-clusters

```bash
echo 'cluster-init: true' >> /etc/rancher/k3s/config.yaml

# 迁移后会记录 state.db.migrated
service k3s restart
du -sh /var/lib/rancher/k3s/server/db/etcd

# etcd 支持快照
k3s etcd-snapshot save
k3s etcd-snapshot list
# 快照目录
ls /var/lib/rancher/k3s/server/db/snapshots

# 判断
lsof -f -- /var/lib/rancher/k3s/server/db/state.db-wal
```

## max-pods

- 默认 110

1. by config.yaml

```yaml
kubelet-arg:
  - config=/etc/rancher/k3s/kubelet.config
#  - 'maxPods=250'
#  - "kube-reserved=cpu=500m,memory=1Gi,ephemeral-storage=2Gi"
#  - "system-reserved=cpu=500m, memory=1Gi,ephemeral-storage=2Gi"
#  - "eviction-hard=memory.available<500Mi,nodefs.available<10%"
```

2. by config file

```
--kubelet-arg=config=/etc/rancher/k3s/kubelet.config
```

**/etc/rancher/k3s/kubelet.config**

```yaml
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
maxPods: 250
```

- https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/
- https://kubernetes.io/docs/reference/config-api/kubelet-config.v1beta1/
- https://docs.k3s.io/cli/agent#customized-flags

## Waiting for containerd startup: rpc error: code = Unimplemented desc = unknown service runtime.v1.RuntimeService

- k3s/agent/containerd/containerd.log
- k3s v1.25 -> v1.26

```
time="2023-06-04T16:17:14.398351570+08:00" level=info msg="Connect containerd service"
time="2023-06-04T16:17:14.398408099+08:00" level=info msg="using legacy CRI server"
time="2023-06-04T16:17:14.398418537+08:00" level=info msg="using experimental NRI integration - disable nri plugin to prevent this"
time="2023-06-04T16:17:14.398549887+08:00" level=warning msg="failed to load plugin io.containerd.grpc.v1.cri" error="failed to create CRI service: failed to find snapshotter \"zfs\""
time="2023-06-04T16:17:14.398913047+08:00" level=info msg=serving... address=/run/k3s/containerd/containerd.sock.ttrpc
time="2023-06-04T16:17:14.398971211+08:00" level=info msg=serving... address=/run/k3s/containerd/containerd.sock
time="2023-06-04T16:17:14.398989382+08:00" level=info msg="containerd successfully booted in 0.430664s"
```

是因为 `failed to find snapshotter "zfs"` 导致

```bash
k3s ctr plugin ls
```

## failed to get network \"cbr0\" cached result: decoding version from network config: unexpected end of JSON input"

```bash
grep 'failed to get network' /var/log/k3s.log
ls -s /var/lib/cni/flannel/ # size=0 的文件

k3s ctr container rm $(find /var/lib/cni/flannel/ -size 0 | xargs -n1 basename)

find /var/lib/cni/flannel/ -size 0 -delete
find /var/lib/cni/results/ -size 0 -delete # cached result
```

- https://github.com/k3s-io/k3s/issues/6185#issuecomment-1399502450

## watch chan error: etcdserver: no leader

- 2 master

## k3s: unable to apply RC_ULIMIT settings

## Cluster CA certificate is not trusted by the host CA bundle, but the token does not include a CA hash. Use the full token from the server's node-token file to enable Cluster CA validation.

## starting kubernetes: preparing server: token CA hash does not match the Cluster CA certificate hash

## etcd cluster join failed: cannot fetch cluster info from peer urls: could not retrieve cluster information from the given URLs

## iptables rule leak

```bash
iptables -L | wc -l -c
```

- https://github.com/k3s-io/k3s/issues/294


## containerd pid

```bash
ps -e -o pid= -o args= | sed -e 's/^ *//; s/\s\s*/\t/;' | grep containerd-shim | grep '/run/k3s/containerd' | cut -f1
```
