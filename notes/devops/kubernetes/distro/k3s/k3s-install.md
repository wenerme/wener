---
title: Install
---

# K3S Install

## Install

:::caution

- 如果 install 用了 https_proxy, 会被写入到 /etc/rancher/k3s/k3s.env

:::

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
# AlpineLinux
sed 's/sourcex/\./g' -i /etc/init.d/k3s

# 准备
service cgroups start
rc-update add cgroups
apk add nfs-utils coreutils iptables iproute2 findutils
# 配置检查
k3s check-config

# mkdir -p /etc/rancher/k3s
# 配置
echo 'rc_ulimit="-n 1048576"' > /etc/rancher/k3s/k3s.env
cat << YAML > /etc/rancher/k3s/registries.yaml
mirrors:
  docker.io:
    endpoint:
      - https://fogjl973.mirror.aliyuncs.com
      - https://8x40wsit.mirror.aliyuncs.com
      - https://registry-1.docker.io
YAML

cat << YAML > /etc/rancher/k3s/config.yaml
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
YAML

k3s check-config

service k3s start
rc-update add k3s

k3s kubectl get node
k3s kubectl get events -Aw
```

```bash
# 取回配置
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
- URL
  - hash
    - `${STORAGE_URL}/k3s${SUFFIX}-${INSTALL_K3S_COMMIT}.sha256sum`
    - `${GITHUB_URL}/download/${VERSION_K3S}/sha256sum-${ARCH}.txt`
  - binary
    - `${STORAGE_URL}/k3s${SUFFIX}-${INSTALL_K3S_COMMIT}`
    - `${GITHUB_URL}/download/${VERSION_K3S}/k3s${SUFFIX}`

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

## stable 版本

```bash
curl -sf https://update.k3s.io/v1-release/channels | jq -r '.data[] | select(.id == "stable") | .latest'
curl -sf https://update.k3s.io/v1-release/channels | yq -r '.data[] | select(.id == "stable") | .latest'
```

## cluster-init

默认为 SQLite，加 `cluster-init: true` 重启后会使用 etcd

## 本地 registry 缓存

```bash
cat << YAML > /etc/rancher/k3s/registries.yaml
mirrors:
  docker.io:
    endpoint:
      - http://docker-registry:5000
      - https://fogjl973.mirror.aliyuncs.com
      - https://8x40wsit.mirror.aliyuncs.com
      - https://docker.mirrors.ustc.edu.cn
      - https://registry-1.docker.io
configs:
  "docker-registry:5000":
YAML
```

```bash
# 配置了 REMOTEURL 可用于做 DockerHub 缓存，但是不能 PUSH https://github.com/distribution/distribution/issues/2386
# 不配置 REMOTEURL 可用于 AirGap 本地 Push，也能部署两个，推一个缓存一个
docker run --rm -it \
  -p 5000:5000 \
  -e REGISTRY_PROXY_REMOTEURL=https://registry-1.docker.io \
  -v $PWD/data:/var/lib/registry \
  --name registry registry:2

# 能直接使用 docker-registry 而不是用 IP
echo "127.0.0.1 docker-registry" >> /etc/hosts
```

## zfs k3s zvol

```bash
# -s sparse volume 不保留空间
zfs create -s -V 200GB data/k3s-vol
mkfs.ext4 /dev/zvol/data/k3s-vol

# 可以放在其他位置然后修改 data-dir
# mkdir -p /data/k3s
# mount /dev/zvol/data/k3s-vol /data/k3s

mkdir -p /var/lib/racher/k3s
mount /dev/zvol/data/k3s-vol /var/lib/racher/k3s
echo "/dev/zvol/data/k3s-vol /var/lib/racher/k3s ext4 rw,relatime,stripe=4 0 0" | tee -a /etc/fstab
```

## zfs rest storage

```bash
# System
zfs create data/var
zfs create -o mountpoint=/var/log/ data/var/log
zfs create -o mountpoint=/var/lib/kubelet data/var/kubelet

# Docker
zfs create -s -V 200GB data/docker-vol
mkfs.ext4 /dev/zvol/data/docker-vol

mkdir -p /var/lib/docker/
mount /dev/zvol/data/docker-vol /var/lib/docker/
echo "/dev/zvol/data/docker-vol /var/lib/docker ext4 rw,relatime,stripe=4 0 0" | tee -a /etc/fstab
```

## zfs snapshotter

:::caution

- 不推荐使用
  - vol 多了 zfs list 很慢
- 使用 zvol
- zfs 2.2 支持 overlayfs - 之后可以迁移出来

:::

```bash
zfs create -o mountpoint=/var/lib/racher/k3s/containerd/io.containerd.snapshotter.v1.zfs data/k3s-snapshotter
echo "snapshotter: zfs" >> /etc/rancher/k3s/config.yaml
```

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

## AlpineLinux openrc sourcex

- sourcex -> source/`.`
- https://github.com/k3s-io/k3s/issues/6739

```bash
sed 's/sourcex/\./g' -i /etc/init.d/k3s
```

## 升级 {#upgrade}

- v1.27 containerd 无 zfs snapshotter

```bash
# 准备
rc-update del k3s
reboot

# 升级
k3s -v                   # 当前版本
cp $(which k3s) k3s.last # backup

# ARCH=arm64
# SUFFIX=-${ARCH}
ARCH=amd64
SUFFIX=

VERSION_K3S=$(curl -sf https://update.k3s.io/v1-release/channels | jq -r '.data[] | select(.id == "stable") | .latest')
echo Upgrade $VERSION_K3S
# GITHUB_URL=https://github.com/k3s-io/k3s/releases
# 走代理
GITHUB_URL=https://ghproxy.com/github.com/k3s-io/k3s/releases
curl --remote-name-all -L "${GITHUB_URL}/download/${VERSION_K3S}/sha256sum-${ARCH}.txt" "${GITHUB_URL}/download/${VERSION_K3S}/k3s${SUFFIX}"

sha256sum -c sha256sum-amd64.txt --ignore-missing

cp k3s$SUFFIX k3s.$VERSION_K3S
chmod +x k3s.$VERSION_K3S
sudo cp k3s.$VERSION_K3S $(which k3s)

sudo k3s check-config

# 启动
service k3s restart
rc-update add k3s

k3s kubectl get nodes
```
