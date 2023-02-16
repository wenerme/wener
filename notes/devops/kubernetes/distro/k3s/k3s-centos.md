---
title: Centos
---

# Centos

## Install

```bash
# 下载到临时目录进行安装
curl -sfL https://get.k3s.io | INSTALL_K3S_SKIP_START=true INSTALL_K3S_SKIP_ENABLE=true sh -
```

下载不动可下载脚本自行修改镜像 `GITHUB_URL=https://ghproxy.com/github.com/k3s-io/k3s/releases`

- INSTALL_K3S_CHANNEL_URL https://update.k3s.io/v1-release/channels
- 安装内容
  - /usr/local/bin/kubectl -> k3s
  - /usr/local/bin/crictl -> k3s
  - /usr/local/bin/ctr -> k3s
    - 可能已经存在 /usr/bin/ctr
  - /usr/local/bin/k3s-killall.sh
  - /usr/local/bin/k3s-uninstall.sh
  - /etc/systemd/system/k3s.service.env
  - /etc/systemd/system/k3s.service
- 安装包 rancher-k3s-common-stable
  - k3s-selinux
- /var/lib/rancher/k3s/data/current/bin

```yaml title="/etc/rancher/k3s/config.yaml"
write-kubeconfig-mode: '0644'

data-dir: /data/k3s

token: $(uuidgen)
agent-token: $(uuidgen)

node-name: kube-1

disable:
  #- servicelb
  - traefik
```

```bash
service k3s start
```

# FAQ

## xtables-set-mode.sh was not found in PATH

```bash
export PATH=/var/lib/rancher/k3s/data/current/bin:$PATH
k3s server
```

## arm64 signal: segmentation fault: unknown

```bash
getconf PAGESIZE # rel7 64K
```

- https://github.com/k3s-io/k3s/issues/6708
- https://github.com/electron/electron/issues/25387
