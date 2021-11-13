---
id: k3s
title: K3S
---

# K3S

:::tip

- 节点的名字需要唯一
  - 默认使用 hostname
  - 可使用 `K3S_NODE_NAME` 或 `--node-name` 修改
- k3s 会读取 `/etc/machine-id` 或 `/var/lib/dbus/machine-id` 作为节点 UUID
- kubconfig 文件 `/etc/rancher/k3s/k3s.yaml`
- 部署 traefik 作为 ingress

:::

- [k3s-io/k3s](https://github.com/k3s-io/k3s)
- [环境要求](https://rancher.com/docs/k3s/latest/en/installation/installation-requirements/)
  - Linux 3.10+
  - Server 内存 512 MB+
  - Agent 内存 75 MB
  - 磁盘 200 MB
  - 架构 x86_64, ARMv7, ARM64
  - [AlpineLinux 额外配置](https://rancher.com/docs/k3s/latest/en/advanced/#additional-preparation-for-alpine-linux-setup)
  - Production
    - Small <= 10 节点 - Server 2C4G - Database 1C2G
    - Medium <= 100 节点 - Server 4C8G - Database 2C8G
- 端口
  - 6443 - server - 节点通信 - Kubernetes API
  - 6444
  - 8472/udp - server/agent - Flannel VXLAN
  - 10250 - server/agent - kubelet
  - 10251
  - 10010 - containerd
  - 10248 - 10252
  - 10249
  - 30518
  - 30643
  - 46517
- K3S 组件 - 安装时可禁用内置组件 `--disable`
  - containerd - 可选用 docker
  - Flannel
  - coredns - CoreDNS
    - 镜像 `rancher/coredns-coredns`
  - CNI
  - traefik - Ingress 控制器
    - 镜像 `rancher/library-traefik`
    - Traefik 2.0 integration - [#1141](https://github.com/rancher/k3s/issues/1141)
      - http 80
      - https 443
      - dash 8080
      - metric 9100
      - httpn 8880
  - servicelb - 内嵌负载均衡
    - [rancher/klipper-lb](https://github.com/rancher/klipper-lb)
      - https://github.com/rancher/klipper-lb/blob/master/entry
      - This works by using a host port for each service load balancer and setting up iptables to forward the request to the cluster IP. The regular k8s scheduler will find a free host port. If there are no free host ports, the service load balancer will stay in pending.
  - 内嵌网络策略控制器
  - local-storage
  - metrics-server
    - 镜像 [rancher/metrics-server](https://hub.docker.com/r/rancher/metrics-server)
    - [kubernetes-sigs/metrics-server](https://github.com/kubernetes-sigs/metrics-server)
- 参考
  - [Using a k3s Kubernetes Cluster for Your GitLab Project](https://medium.com/better-programming/b0b035c291a9)
  - [架构](https://rancher.com/docs/k3s/latest/en/architecture)
- 问题
  - 使用 Nginx 替代 Traefik - [#1466](https://github.com/rancher/k3s/pull/1466/files)
    - 已经被回退
  - K3S 有 [server-ca 和 client-ca](https://github.com/rancher/k3s/issues/684#issuecomment-517032871)
    - 默认 CSR 是使用 servert-ca，导致创建的证书无法使用
      - issuer 是 k3s-server-ca
    - 需要从服务器取 client-ca 创建证书
    - [#1768](https://github.com/rancher/k3s/pull/1768) - 默认使用 ClientCA 而不是 ServerCA
    - [自行创建脚本](https://github.com/rancher/k3s/issues/684#issuecomment-517501120)
  - 目前(1.18) admin 默认是密码 - [#1616](https://github.com/rancher/k3s/issues/1616) - 默认使用证书

```bash
apk add util-linux
[ -f /etc/machine-id ] || ( uuidgen | sudo tee -a /etc/machine-id )

apk add wireguard-virt wireguard-tools

# INSTALL_K3S_EXEC 默认为 agent
# flannel wireguard - https://github.com/coreos/flannel/blob/master/dist/extension-wireguard
K3S_NODE_NAME=k3s-server INSTALL_K3S_EXEC="server --flannel-backend=wireguard" INSTALL_K3S_SKIP_START=true INSTALL_K3S_BIN_DIR=/opt/k3s/bin curl -sfL https://get.k3s.io | sh -

k3s server --flannel-backend=wireguard

# 如果是 root 安装 - 修改下 kubeconfig 权限
sudo chmod a+r /etc/rancher/k3s/k3s.yaml
# k3s 默认会访问该文件

# 其他访问
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
```

## k3s server

- [k3s server 配置](https://rancher.com/docs/k3s/latest/en/installation/install-options/server-config/)
- [Advanced Options and Configuration](https://rancher.com/docs/k3s/latest/en/advanced/)
- `--docker` - 使用 docker - 默认 [containerd](https://containerd.io/)
- 在 `/var/lib/rancher/k3s/server/manifests` 下面的文件会被自动部署 - kubectl apply
  - 默认安装内容 - [rancher/k3s/tree/master/manifests](https://github.com/rancher/k3s/tree/master/manifests)
- 默认使用 `containerd`, 启动 agent 的时候添加 `--docker` 可使用 docker
- 针对 `containerd` 生成的配置位于 `/var/lib/rancher/k3s/agent/etc/containerd/config.toml`
  - 如果在目录下创建了 `config.toml.tmpl` 则会被使用
  - 模板可访问 `config.Node` 对象 https://github.com/rancher/k3s/blob/master/pkg/agent/templates/templates.go#L16-L32
- AlpineLinux 需要额外的配置 `/etc/update-extlinux.conf`
  - default_kernel_opts 添加 `cgroup_enable=cpuset cgroup_memory=1 cgroup_enable=memory`
  - 然后 `update-extlinux && reboot`
- 非 root 数据存放于 `~/.rancher/k3s/data`
- root 数据存放于 `/var/lib/rancher/k3s/data`
- 集群 cidr `10.42.0.0/16`
  - 节点 IP
  - cni0 - 本地网口 - 附带 IP
  - flannel1.1 - 集群通信
  - 会分配给每个 Pod
  - 每个节点一个 `/24` 地址 - 不同节点之间进行转发
- 服务 cidr `10.43.0.0/16`
  - 服务 IP
  - 不能 ping
  - 虚拟地址，通过 iptables 配置
- 集群域名 cluster.local
- coredns `10.43.0.10`
- [网络](https://rancher.com/docs/k3s/latest/en/networking/)
  - 默认使用 flannel 作为 CNI，使用 VXLAN 后端
  - flannel [配置](https://github.com/rancher/k3s/blob/fe7337937155af41f1aebeb87d1acd07091b71de/pkg/agent/flannel/setup.go#L42)
- 私有仓库 `/etc/rancher/k3s/registries.yaml`
- [服务配置](https://rancher.com/docs/k3s/latest/en/installation/install-options/server-config/)

### get.k3s.io

- [get.k3s.io](https://get.k3s.io) 安装脚本
- 下载地址为 STORAGE_URL=https://storage.googleapis.com/k3s-ci-builds
- 会安装 openrc 服务
  - /etc/rancher/k3s/k3s.env
  - /etc/rancher/k3s/k3s-agent.env
  - /etc/init.d/k3s
  - /etc/init.d/k3s-agent
- 日志文件 /var/log/k3s.log
- [安装选项](https://rancher.com/docs/k3s/latest/en/installation/install-options/)
  - 默认安装为 server 启动
    - 设置 `K3S_URL` 且设置 `K3S_TOKEN` 或 `K3S_CLUSTER_SECRET`
    - 或直接后面指定 agent
  - `INSTALL_K3S_SKIP_DOWNLOAD` - 不下载
  - `INSTALL_K3S_SYMLINK` - 创建 kubectl，crictl，ctr 符号链接 - 设置为 `skip` 会调过，设置为 force 会覆盖
  - `INSTALL_K3S_SKIP_ENABLE` - 不启用和启动 k3s - 即不会 add openrc 的 service 也不会 start
  - `INSTALL_K3S_SKIP_START` - 不启动服务
  - `INSTALL_K3S_BIN_DIR` - 安装目录 - 默认 `/usr/local/bin`
  - `INSTALL_K3S_EXEC` - 指向命令
    - 默认 agent 除非有 K3S_URL
  - `INSTALL_K3S_CHANNEL_URL` - 默认 https://update.k3s.io/v1-release/channels
  - `INSTALL_K3S_CHANNEL` - 默认 stable
  - 额外安装
    - `/usr/local/bin/k3s-killall.sh`
      - 调用 `service k3s stop`
      - umount
        - `/run/k3s`
        - `/var/lib/rancher/k3s`
        - `/var/lib/kubelet/pods`
        - `/run/netns/cni-`
      - 移除 `cni0` 和 `flannel1.1`
      - 删除 `/var/lib/cni/`
      - 移除 iptables 里的 KUBE 和 CNI 内容
    - `/usr/local/bin/k3s-uninstall.sh`
    - `/etc/rancher/k3s/k3s.env`
      - service 启动会 source 这个文件
    - `/etc/init.d/k3s`
      - 安装参数会直接在这里
      - 日志文件为 `/var/log/k3s.log`
- INSTALL_K3S_EXEC="--disable=traefik" 可禁用安装某些服务

```bash
curl -sfL https://get.k3s.io | sh -

# 可直接指定参数
curl -sfL https://get.k3s.io | sh -s - --write-kubeconfig-mode 644
# 也可以环境变量指定
curl -sfL https://get.k3s.io | K3S_KUBECONFIG_MODE="644" sh -s -

# INSTALL_K3S_EXEC 指定命令
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--no-flannel" sh -s -
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="server --no-flannel" sh -s -
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="server" sh -s - --no-flannel
curl -sfL https://get.k3s.io | sh -s - server --no-flannel
curl -sfL https://get.k3s.io | sh -s - --no-flannel
curl -sfL https://get.k3s.io | INSTALL_K3S_SKIP_ENABLE=1 sh -s -
```

## 手动安装启动

```bash
mkdir -p /opt/k3s
cd /opt/k3s
# https://github.com/rancher/k3s/releases
ver=$(curl -sL https://api.github.com/repos/rancher/k3s/releases/latest | jq .tag_name -r)

curl -LOC- https://github.com/rancher/k3s/releases/download/$ver/k3s
curl -LOC- https://github.com/rancher/k3s/releases/download/$ver/k3s-images.txt

ssh k3s -- "sudo sh -c 'mkdir -p /opt/k3s && chown admin:admin /opt/k3s'"
scp k3s k3s:/opt/k3s
scp k3s-images.txt k3s:/opt/k3s

# ssh k3s --
cat /opt/k3s/k3s-images.txt | xargs -n 1 docker pull

k3s server --cluster-init --alsologtostderr --log $PWD/k3s-server.log --docker
```

## containerd

- 会生成配置
  - /var/lib/rancher/k3s/agent/etc/containerd/config.toml
  - 如果有 config.toml.tmpl 则会使用
  - 默认模板 [templates.go#ContainerdConfigTemplate](https://github.com/rancher/k3s/blob/master/pkg/agent/templates/templates.go#L16-L72)
- 没有 docker 可以少 80m 内存
- 每个 containerd-shim 比 containerd-shim-runc-v2 少几 m 内存
  - containerd-shim 是 docker 的
  - containerd-shim-runc-v2 是 containerd 的

## registries

- `/etc/rancher/k3s/registries.yaml`
- 启动时检测，containerd 会使用这里的定义

```yaml
mirrors:
  # 镜像 DockerHub
  docker.io:
    endpoint:
      - 'https://mycustomreg.com:5000'
configs:
  # 添加授权和证书
  'mycustomreg:5000':
    auth:
      username: xxxxxx # this is the registry username
      password: xxxxxx # this is the registry password
    tls:
      cert_file: # path to the cert file used in the registry
      key_file: # path to the key file used in the registry
      ca_file: # path to the ca file used in the registry
```

## 笔记

- kubeconfig 位于 `/etc/rancher/k3s/k3s.yaml`
- K3S_TOKEN 位于 `/var/lib/rancher/k3s/server/node-token`
- 节点需要有唯一主机名 - `K3S_NODE_NAME`

### 代理节点注册逻辑

- k3s agent 初始化 Agent 节点的 websocket 链接。链接会有客户端进行负载均衡。
- Agent 会使用集群的密钥和随机生成的密码注册，密码存储于 `/etc/rancher/node/password`，服务端会存储节点的密码到 `/var/lib/rancher/k3s/server/cred/node-passwd`。
- 节点上的 `/etc/rancher/node` 目录被移除后密码会被从新生成，或由服务端移除。
- 启动时可为节点附加唯一节点标示，`--with-node-id`。
