---
tags:
  - Upgrade
---

# K3S 升级 {#upgrade}

- v1.27 前面版本 containerd 无 zfs snapshotter

```bash
# 准备
rc-update del k3s
reboot

# 升级
k3s -v # 当前版本

sudo apk add jq

# ARCH=arm64
# SUFFIX=-${ARCH}
ARCH=amd64
SUFFIX=

VERSION_K3S=$(curl -sf https://update.k3s.io/v1-release/channels | jq -r '.data[] | select(.id == "stable") | .latest')
echo Upgrade $VERSION_K3S
# GITHUB_URL=https://github.com/k3s-io/k3s/releases
# 走代理
GITHUB_URL=https://mirror.ghproxy.com/github.com/k3s-io/k3s/releases
GITHUB_URL=https://github.com/k3s-io/k3s/releases
curl --remote-name-all -L "${GITHUB_URL}/download/${VERSION_K3S}/sha256sum-${ARCH}.txt" "${GITHUB_URL}/download/${VERSION_K3S}/k3s${SUFFIX}"

sha256sum -c sha256sum-${ARCH}.txt --ignore-missing

cp k3s$SUFFIX k3s.$VERSION_K3S
chmod +x k3s.$VERSION_K3S
cp $(which k3s) k3s.last              # backup
sudo cp k3s.$VERSION_K3S $(which k3s) # replace

sudo k3s check-config
k3s -v

# 启动
service k3s restart
rc-update add k3s

k3s kubectl get nodes
```
