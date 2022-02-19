---
title: k0s
---

# k0s

- [k0s] 是什么？
  - 类似 k3s 的精简 k8s
    - 无系统依赖 - 静态
    - 无外部依赖
  - 支持 amd64 Windows
  - 支持 amd64, arm, arm64
  - 网络
    - kube-router - 默认
      - 资源占用更少 - 比 calico 少 15%
      - 不支持 DualStack
      - 不支持 Windows
    - calico
      - 默认 vxlan overlay
      - 不支持 armv7
      - 支持 DualStack
      - 支持 Windowss
      - IPv6 不支持 tunnal
  - etcd 层使用 k3s 的 [k3s-io/kine](https://github.com/k3s-io/kine)
  - 背后由 Mirants 公司支持
  - bin 包含了 containerd
  - 自 2020 年 - 相比 k3s 要年轻很多

[k0s]: https://github.com/k0sproject/k0s
[k0sctl]: https://github.com/k0sproject/k0sctl

## 安装

- 数据目录 /var/lib/k0s - `--data-dir`
- /etc/k0s/containerd.toml

```bash
# K0S_VERSION 控制版本
# DEBUG 开启 set -x
# 从 https://github.com/k0sproject/k0s 下载到 /usr/local/bin/k0s
# chmod 755 /usr/local/bin/k0s
curl -sSLf https://get.k0s.sh | sudo sh

# 命令补全
source <(k0s completion bash)
# 查看系统信息
k0s sysinfo
# 生成配置
mkdir -p /etc/k0s
k0s config create > /etc/k0s/k0s.yaml
k0s config validate --config /etc/k0s/k0s.yaml

# AlpineLinux 推荐依赖
# 官方说不需要依赖 - 但还是建议安装这些基础工具
apk add conntrack-tools coreutils dbus findutils ipvsadm ipset iptables socat iproute2 nfs-utils

# 创建 /etc/init.d/k0scontroller
# 用户 etcd kube-apiserver konnectivity-server kube-apiserver kube-scheduler
# 可修改 kublete 参数 - 默认 k0s 会用到 k8s.gcr.io 镜像 - 会下载失败
k0s install controller --enable-worker -c /etc/k0s/k0s.yaml --kubelet-extra-args='--pod-infra-container-image=registry.cn-hongkong.aliyuncs.com/cmi/pause:3.5'
id etcd kube-apiserver konnectivity-server kube-apiserver kube-scheduler

k0s start

k0s kubectl get nodes
k0s kc -n kube-system get pods

# 服务管理
# k0s install|start|stop|reset|status
# 运维
# k0s backup|restore
# Daemon
# k0s api|controller|worker
# CLI
# k0s ctr|kubectl|etcd

# 手动前台启动 - 方便排查问题
k0s controller --config=/etc/k0s/k0s.yaml --enable-worker=true

containerd config default > /etc/k0s/containerd.toml


# airegap
# ==========
# $K0S_DATA_DIR/images
# /var/lib/k0s/images/bundle_file
# 用到的镜像
k0s airgap list-images
# 可直接下载
# https://github.com/k0sproject/k0s/releases/download/v1.23.3%2Bk0s.1/k0s-airgap-bundle-v1.23.3+k0s.1-amd64
curl -LOC- 'https://ghproxy.com/https://github.com/k0sproject/k0s/releases/download/v1.23.3%2Bk0s.1/k0s-airgap-bundle-v1.23.3+k0s.1-amd64'
mkdir -p /var/lib/k0s/images
cp k0s-airgap-bundle-v1.23.3+k0s.1-amd64 /var/lib/k0s/images/bundle_file

# backup
# ==========
# k0s_backup_<ISODatetimeString>.tar.gz
# --save-path k0s-data
# 会备份较多内容
k0s backup
# k0s restore
```

```yaml
apiVersion: k0s.k0sproject.io/v1beta1
kind: ClusterConfig
metadata:
  name: k0s
spec:
  images:
    # airgap 时避免 pull
    default_pull_policy: Never
```

```bash
# containerd
k0s ctr --address /run/k0s/containerd.sock

k0s ctr i ls
k0s ctr c ls
```

- /var/lib/k0s/
  - kubelet.conf
  - kubelet-config.yaml
  - kubelet-bootstrap.conf
    - 启动 配置
    - 如果 worker token 超时可尝试删除，重启重新创建
- /var/lib/k0s/bin/
  - xtables-legacy-multi
    - ip6tables, ip6tables-restore, ip6tables-save
    - iptables-restore, iptables-save
  - containerd, containerd-shim, containerd-shim-runc-v1, containerd-shim-runc-v2
  - etcd
  - runc
  - kube-apiserver, kube-controller-manager, kube-scheduler, kubelet
- /var/lib/k0s/db/ - kine SQLite
- /var/lib/k0s/etcd/ - etcd 数据目录
- /var/lib/k0s/images/bundle_file - 离线 images 包
- /var/lib/k0s/pki/ - 各种证书相关内容
  - admin.conf - kubeconfig
- /var/lib/k0s/containerd/ - containerd 数据目录
- /var/lib/k0s/helmhome/ - HELM 数据目录
  - repositories.yaml
    - openebs-internal -> https://openebs.github.io/charts
  - k0s 部署时是使用的这里的 repo
- /var/lib/k0s/manifests/ - 启动部署内容
  - api-config
  - calico
  - coredns
  - helm
    - helm-crd-helm.k0sproject.io_charts.yaml
      - CustomResourceDefinition
      - helm.k0sproject.io/v1beta1/Chart
    - addon_crd_manifest_openebs.yaml
      - OpenEBS
  - kubeproxy
    - kube-proxy.yaml
      - KubeProxyConfiguration
      - /run/xtables.lock
  - metricserver
    - metric_server.yaml
  - bootstraprbac
    - ClusterRoleBinding
    - kubelet-bootstrap, node-autoapprove-bootstrap, node-autoapprove-certificate-rotation
  - calico_init
  - defaultpsp
    - default-psp.yaml
      - 00-k0s-privileged
      - 99-k0s-restricted
  - kubelet
    - kubelet-config.yaml
  - kuberouter
    - kube-router.yaml
    - /etc/cni/net.d/10-kuberouter.conflist
- /var/log/pods/
  - Pod 日志目录
- /var/lib/cni/ - CNI 工作空间

| port  | type  | component          | note                              |
| ----- | ----- | ------------------ | --------------------------------- |
| 179   | tcp   | kube-router        | worker <-> worker - BGP           |
| 2379  |       | kine               |
| 2380  | tcp   | etcd peers         | controller <-> controller         |
| 4789  | udp   | calico             | worker <-> worker - VXLAN overlay |
| 6443  | https | kube-apiserver     | worker,cli->controller            |
| 8132  | tcp   | konnectivity agent | worker <-> controller             |
| 8133  | tcp   | konnectivity admin |
| 9443  | tcp   | k0s-api            | controller <-> controller         |
| 10250 | tcp   | kubelet            | master,worker => host             |

## k0s.yaml

```yaml
apiVersion: k0s.k0sproject.io/v1beta1
kind: ClusterConfig
metadata:
  creationTimestamp: null
  name: k0s
spec:
  # kube-apiserver
  # https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/
  api:
    # LB 地址 - 供 woker 使用
    externalAddress:
    address: 192.168.1.2
    k0sApiPort: 9443
    port: 6443
    # 证书里的 SANs
    sans:
      - 192.168.1.2
      - kube.example.com
    # 额外的 kube-apiserver 参数
    extraArgs:
    # access to KAS through konnectivity tunnel
    tunneledNetworkingMode: false
  storage:
    # etcd, kine
    type: etcd
    etcd:
      # etcd 发现地址
      peerAddress: 192.168.1.2
    kine:
      dataSource:

  extensions:
    # 要部署的 Helm
    helm:
      # 仓库定义
      repositories:
        - name: stable
          url: https://charts.helm.sh/stable
      # Chart 定义
      charts:
        - name: prometheus-stack
          chartname: prometheus-community/prometheus
          version: '14.6.1'
          values: |
            # YAML values
          namespace: default
    # 存储配置
    storage:
      # 建议自行部署 openebs 不使用 k0s 部署
      # external_storage 不部署存储相关服务
      # openebs_local_storage 部署 openebs
      type: external_storage
      # openebs-device, openebs-hostpath
      # /var/openebs/
      create_default_storage_class: false
  images:
    # 默认 仓库 - 会加在所有 image 前 - 支持带 path
    repository:
    default_pull_policy: IfNotPresent
    # 不修改 - 建议使用 bundle 导入
    # 默认用到了 k8s.gcr.io 镜像 - 无法拉取
  installConfig:
    # 用户 - install 时会创建
    users:
      etcdUser: etcd
      kineUser: kube-apiserver
      konnectivityUser: konnectivity-server
      kubeAPIserverUser: kube-apiserver
      kubeSchedulerUser: kube-scheduler
  konnectivity:
    adminPort: 8133
    agentPort: 8132
  network:
    # calico, kuberouter, custom
    # 初始化后无法修改 - 只有重新部署
    provider: kuberouter
    podCIDR: 10.244.0.0/16
    serviceCIDR: 10.96.0.0/12
    calico:
      # vxlan, ipip
      mode: vxlan
      # Always, CrossSubnet, Never
      # vxlan 不使用
      overlay: Always
      vxlanPort: 4789
      # virtual network ID for VXLAN
      vxlanVNI: 4096
      mtu: 0
      # wireguard-based encryption
      wireguard: false
      flexVolumeDriverPath: /usr/libexec/k0s/kubelet-plugins/volume/exec/nodeagent~uds
      ipAutodetectionMethod:
    # https://github.com/cloudnativelabs/kube-router/blob/master/docs/user-guide.md
    kuberouter:
      autoMTU: true
      mtu: 0
      # BGP
      peerRouterASNs: ''
      peerRouterIPs: ''
    dualStack: {}
    kubeProxy:
      disabled: false
      # iptables, ipvs, userspace
      mode: iptables
  podSecurityPolicy:
    # 00-k0s-privileged - 宽松
    # 99-k0s-restricted - 严格限制
    defaultPolicy: 00-k0s-privileged
  # https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/
  controllerManager:
    extraArgs:
  # https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler/
  scheduler:
    extraArgs:
  # 区分定义 worker 配置
  workerProfiles:
    - name: custom-role
      values:
        volumePluginDir: /var/libexec/k0s/kubelet-plugins/volume/exec
  telemetry:
    # 默认开启 - 建议关闭
    enabled: false
```

## containerd.toml

- https://github.com/containerd/containerd/blob/main/docs/man/containerd-config.toml.5.md

```bash
# 参考，然后按需修改 /etc/k0s/containerd.toml
containerd config default > containerd.toml

# 查看支持的插件
k0s ctr plugins ls
```

```bash title="k3s 执行的 containerd"
/var/lib/k0s/bin/containerd \
  --root=/var/lib/k0s/containerd \
  --state=/var/lib/k0s/run/containerd \
  --address=/var/lib/k0s/run/containerd.sock \
  --config=/etc/k0s/containerd.toml
```

**使用 ZFS**

```bash
zfs create -o mountpoint=/var/lib/k0s/containerd/io.containerd.snapshotter.v1.zfs main/containerd
```

- 默认为 overlayfs

```toml title="/etc/k0s/containerd.toml"
version=2
[plugins."io.containerd.grpc.v1.cri".containerd]
snapshotter = "zfs"
```

```bash
# 应该为 ok 而不是 skip
k0s ctr plugins ls | grep zfs

# 判断旧的是否还在用
# 如果没重启之前容器，旧的也还还在使用
lsof +D /var/lib/k0s/containerd/io.containerd.snapshotter.v1.overlayfs/
```

## helm crd

```yaml
apiVersion: helm.k0sproject.io/v1beta1
kind: Chart
metadata:
  name: k0s-addon-chart-openebs
  namespace: 'kube-system'
  finalizers:
    - helm.k0sproject.io/uninstall-helm-release
spec:
  chartName: openebs-internal/openebs
  values: |

  version: 3.0.3
  namespace: openebs
```

## openrc

- 在 install 时生成

```sh title="/etc/init.d/k0scontroller"
#!/sbin/openrc-run
supervisor=supervise-daemon
name="k0s controller"
description="k0s - Zero Friction Kubernetes"
command=/usr/local/bin/k0s
command_args="controller --config=/etc/k0s/k0s.yaml --single=true "
name=$(basename $(readlink -f $command))
supervise_daemon_args="--stdout /var/log/${name}.log --stderr /var/log/${name}.err"
depend() {
        need net
        use dns
        after firewall
}
```

# FAQ

## Control plane vs. Worker

- Control plane
  - 作为其他组建的 守护进程/supervisor - 不调度工作负载
  - 不需要容器引擎、kubelet
  - kubectl get node 看不到
  - 维护 kine/etcd, api-server, scheduler, controller-manager, konnectivity-server, k0s-api
- Worker
  - 运行 kubelet
  - 依赖 cri - 默认你 containerd+runc
  - 调度工作负载

## Failed to run kubelet failed to run Kubelet: mountpoint for cpu not found

```bash
ls /sys/fs/cgroup
service cgroups start
```

## cni plugin not initialized

检查 kube-proxy pod 是否启动

## no IP ranges specified

## kube-router Failed to watch i/o timeout

```
Failed to watch *v1.Node: failed to list *v1.Node: Get "https://10.96.0.1:443/api/v1/nodes?limit=500&resourceVersion=0": dial tcp 10.96.0.1:443: i/o timeout
```
