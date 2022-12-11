---
tags:
  - FAQ
---

# K0S FAQ

## Control plane vs. Worker

- Control plane
  - 作为其他组建的 守护进程/supervisor - 不调度工作负载
  - 不需要容器引擎、kubelet
  - kubectl get node 看不到
  - 维护 kine/etcd, api-server, scheduler, controller-manager, konnectivity-server, k0s-api
  - [Control Plane High Availability](https://docs.k0sproject.io/main/high-availability/)
- Worker
  - 运行 kubelet
  - 依赖 cri - 默认你 containerd+runc
  - 调度工作负载

## konnectivity-server.sock: socket: too many open files

检查 ulimit

```bash
cat /proc/$(pidof konnectivity-server)/limits
# 当前打开文件数
ls /proc/$(pidof konnectivity-server)/fd | wc -l
```

## cgroups: cgroup deleted: unknown

## Failed to run kubelet failed to run Kubelet: mountpoint for cpu not found

```bash
ls /sys/fs/cgroup
service cgroups start
```

## cni plugin not initialized

```
false reason:NetworkPluginNotReady message:Network plugin returns error: cni plugin not initialized
```

检查 kube-proxy pod 是否启动

## no IP ranges specified

## kube-router Failed to watch i/o timeout

```
Failed to watch *v1.Node: failed to list *v1.Node: Get "https://10.96.0.1:443/api/v1/nodes?limit=500&resourceVersion=0": dial tcp 10.96.0.1:443: i/o timeout
```

## k0s controller --single vs --enable-worker

- --single
  - 减少部分 leader 选取逻辑
  - 不可以添加 worker
  - etcd 默认使用 kine - 可配置使用 etcd
- --enable-worker
  - 正常节点
  - 可后续添加 worker

## konnectivity-server.sock: bind: address already in use

如果没有被使用，则可以安全删除

```bash
sudo lsof -f -- /run/k0s/konnectivity-server/konnectivity-server.sock
unlink /run/k0s/konnectivity-server/konnectivity-server.sock
```

如果被使用了，则考虑之前的 process 是否未正常退出，kill 即可。

## failed to get initial kubelet config with join token: failed to get kubelet config from API: Unauthorized"

- 启动失败，停止，再次启动时可能发生
- kubelet 的 token 有时效，可能已经过期了，可删除重启，会重新创建

```bash
k0s stop
rm /var/lib/k0s/kubelet-bootstrap.conf
k0s start
```

---

- https://github.com/k0sproject/k0s/issues/1524#issuecomment-1044287529

## coredns fatal plugin/loop: Loop detected for zone

- 循环 resolve 检测 - 一般是 /etc/resolv.conf 配置了 127.0.0.1 导致
- 修改 /etc/resolv.conf 然后删除 pod 即可
- https://coredns.io/plugins/loop/

## kill all

```bash
k0s stop
# 应该 pkill 杀掉进程树
# killall /var/lib/k0s/bin/containerd-shim-runc-v2
```

- containerd-shim 残留 [containerd#768](https://github.com/containerd/containerd/issues/768)
- [kubespray/roles/container-engine/docker/files/cleanup-docker-orphans](https://github.com/kubernetes-sigs/kubespray/blob/master/roles/container-engine/docker/files/cleanup-docker-orphans.sh)

## 网络配置问题

因为你服务器有多 lan，配置了路由策略，从 10gbe 进来的从 10gbe 出去

```
auto eth4
iface eth4 inet static
  address 192.168.1.10
  netmask 255.255.252.0
  gateway 192.168.1.1
  mtu 9000
  pre-up ip ro li tab tgbe &>/dev/null || echo '10 tgbe' >> /etc/iproute2/rt_tables
  post-up ip ru add from 192.168.1.10 table tgbe
  post-up ip ro add default via 192.168.76.1 dev eth4 table tgbe
```

导致 kube 无法自身访问到 api，因为不再一个路由表里，无法从 192.168.1.10 访问到 10.96.0.1。

移除规则后则一切恢复正常。

```bash
ip ru del from 192.168.1.10
```

## Error while reading from Writer: bufio.Scanner: token too long  component=kubelet

```bash
ps aux | grep keubelt
```

- 有可能 configmap 太大导致
- k0s v1.23 - 重启后无法再启动
- **系统重启后解决**
  - 再次重启 k0s 出现相同问题


## 手动启动

```bash
sudo k0s controller --config=/etc/k0s/k0s.yaml --enable-dynamic-config=true --enable-worker=true
```
