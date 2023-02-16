---
title: K3S 配置
tags:
  - Configuration
---

# K3S 配置

- 自 v1.19 支持 yaml 配置
- /etc/rancher/k3s/config.yaml - K3S_CONFIG_FILE, --config, -c
  - yaml 配置
  - 参数基本与命令行参数一致
- /etc/rancher/k3s/k3s.yaml - KUBECONFIG
- /etc/rancher/k3s/registries.yaml - 容器镜像仓库配置
- 环境变量 K3S_DATASTORE_ENDPOINT 映射为 datastore-endpoint
- 参考
  - [K3s Server Configuration Reference](https://rancher.com/docs/k3s/latest/en/installation/install-options/server-config/)
  - [K3s Agent Configuration Reference](https://rancher.com/docs/k3s/latest/en/installation/install-options/agent-config/)

## registries.yaml

```yaml
mirrors:
  # 针对 docker.io 的镜像仓库
  docker.io:
    endpoint:
      - https://fogjl973.mirror.aliyuncs.com
      - https://8x40wsit.mirror.aliyuncs.com
      - https://docker.mirrors.ustc.edu.cn
      - https://registry-1.docker.io
# 私有仓库还需要配置认证信息
# configs:
#   # 添加授权和证书
#   "mycustomreg:5000":
#     auth:
#       username: xxxxxx
#       password: xxxxxx
#     tls:
#       cert_file:
#       key_file:
#       ca_file:
```

## config.yaml

### server

```yaml
# 数据库配置
datastore-endpoint:
# TLS 连接 - 比如 PG
datastore-cafile:
datastore-certfile:
datastore-keyfile:

# 加入 server 和 agent
token:
token-file:

agent-token:
agent-token-file:

# 写入 kubeconfig
write-kubeconfig: /etc/rancher/k3s/k3s.yml
write-kubeconfig-mode: '0644'

# Agent 配置 - server 也会运行 agent，配置同 agent 配置
#

# 监听配置
bind-address: 0.0.0.0
https-listen-port: 6443
advertise-address: #node-external-ip/node-ip
advertise-port:
# 如果希望证书在某个域名下可使用则需要添加 SAN
tls-san:
  - k3s.example.com

# 如果非 ROOT ${HOME}/.rancher/k3s
data-dir: /var/lib/rancher/k3s

# 网络
cluster-cidr: 10.42.0.0/16
service-cidr: 10.43.0.0/16
# CoreDNS
cluster-dns: 10.43.0.10
cluster-domain: cluster.local
# none,vxlan,ipsec,host-gw,wireguard
flannel-backend: vxlan

# 自定义
kube-apiserver-arg:
kube-scheduler-arg:
kube-controller-manager-arg:
kube-cloud-controller-manager-arg:

kubelet-arg:
kube-proxy-arg:

# 默认本地基于 path 的 sc 存储路径
default-local-storage-path:

# 组件
# coredns, servicelb, traefik, local-storage, metrics-server
disable:
  - servicelb
  - traefik
disable-scheduler: false
disable-cloud-controller: false
disable-network-policy: false

# 实验阶段
rootless: false
server:

# --cluster-init
# --cluster-reset

# Secret encryption at rest
secrets-encryption: false
```

### agent

```yaml
token: value
token-file: k3s-agent.token
server: value

data-dir: /var/lib/rancher/k3s

# Note
node-name: hostname
# with-node-id: true
# node-label
# node-taint

# Runtime
docker: true
container-runtime-endpoint:
pause-image: docker.io/rancher/pause:3.1
private-registry: /etc/rancher/k3s/registries.yaml

# Networking
# node-ip:
# node-external-ip:
# resolv-conf
flannel-iface:
flannel-conf:

kubelet-arg:
kube-proxy-arg:

rootless: true
```
