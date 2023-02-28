---
title: Install
---

# K3S Install


## Install

```bash
# 下载到临时目录进行安装
curl -sfL https://get.k3s.io | INSTALL_K3S_SKIP_START=true INSTALL_K3S_SKIP_ENABLE=true sh -
```

下载不动可下载脚本自行修改镜像 `GITHUB_URL=https://ghproxy.com/github.com/k3s-io/k3s/releases`

```bash
curl -o k3s-install.sh https://get.k3s.io
sed '/GITHUB_URL=/a GITHUB_URL=https://ghproxy.com/github.com/k3s-io/k3s/releases' -i k3s-install.sh
INSTALL_K3S_SKIP_START=true INSTALL_K3S_SKIP_ENABLE=true bash k3s-install.sh

k3s check-config
```

```bash
# 准备
service cgroups start
rc-update add cgroups

#
service k3s start
rc-update add k3s
```

```bash
scp kube:/etc/rancher/k3s/k3s.yaml kubeconfig.yaml
```

## k3s-install.sh

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
  - k3s
  - coreutils
  - busybox
  - slirp4netns
  - runc
  - pigz
  - nsenter
  - losetup
  - ipset
  - ip
  - find
  - ethtool
  - conntrack
  - containerd
  - containerd-shim-runc-v2
  - cni
  - check-config
  - blkid
  - aux

```bash
cat <<YAML > /etc/rancher/k3s/config.yaml
write-kubeconfig-mode: '0644'

data-dir: /data/k3s

token: $(uuidgen)
agent-token: $(uuidgen)

node-name: kube-1

disable:
- servicelb
- traefik
YAML
```

```yaml title="/etc/rancher/k3s/config.yaml"
write-kubeconfig-mode: '0644'

data-dir: /data/k3s

token: $(uuidgen)
agent-token: $(uuidgen)

node-name: kube-1

disable:
- servicelb
- traefik
```

```bash
service k3s start
```

# FAQ

## links: aux/ip6tables should link to iptables-detect.sh

- https://docs.k3s.io/known-issues
