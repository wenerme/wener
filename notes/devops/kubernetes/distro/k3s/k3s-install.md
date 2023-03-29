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
```

```bash
# 准备
service cgroups start
rc-update add cgroups
# 配置检查
k3s check-config

# mkdir -p /etc/rancher/k3s
# 配置
echo 'rc_ulimit="-n 1048576"' >> /etc/rancher/k3s/k3s.env
cat <<YAML > /etc/rancher/k3s/registries.yaml
mirrors:
  docker.io:
    endpoint:
      - https://fogjl973.mirror.aliyuncs.com
      - https://8x40wsit.mirror.aliyuncs.com
      - https://docker.mirrors.ustc.edu.cn
      - https://registry-1.docker.io
YAML

cat <<YAML > /etc/rancher/k3s/config.yaml
# write-kubeconfig-mode: '0644'

token: $(uuidgen)
agent-token: $(uuidgen)

node-name: $(hostname)

disable:
- servicelb
- traefik

prefer-bundled-bin: true

#tls-san:
#- kube.dev.example.com

#data-dir: /data/var/k3s
#snapshotter: zfs
YAML

k3s check-config

service k3s start
rc-update add k3s

k3s kubectl get node
k3s kubectl get events -Aw
```

```bash
rsync --rsync-path 'sudo rsync' kube:/etc/rancher/k3s/k3s.yaml kubeconfig.yaml

# write-kubeconfig-mode: '0644'
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


```bash
# 非 root 出现
k3s check-config
# 此时不会出现
sudo k3s check-config

# /usr/local/bin/k3s check-config
# PATH=/data/var/k3s/data/current/bin/:$PATH
```

- https://docs.k3s.io/known-issues
