---
title: orbstack
---

# orbstack

- VM
  - 提供 Docker
  - 提供 Linux Machine - LXC
- 替代 Docker Desktop

```bash
brew install orbstack

docker info # $HOME/.orbstack/run/docker.sock

orb create alpine alpine # 创建 linux vm
ssh orb                  # 进入 vm
orb uname -a             # 在 vm 内运行 command
orb shutdown             # 关机

tree ~/.orbstack/
file ~/.orbstack/data/data.img          # 数据 镜像
qemu-img info ~/.orbstack/data/data.img # 8TiB, raw 格式
```

- macOS Host 上的目录
  - ~/OrbStack/ - NFS
    - `<Machine>/` - LXC
    - `docker/`
      - volumes/
- Machine 里的目录
  - /mnt/machines/
  - /opt/orbstack-guest
  - /mnt/mac
  - /Applications
  - /Library
  - /Users
  - /Volumes
  - /private
  - /dev/vdb1 -> ~/.orbstack/data/data.img
- /Applications/OrbStack.app/Contents/Resources/assets/release/amd64/
  - data.img.tar.b64 -> ~/.orbstack/data/data.img
  - swap.img.tar.b64 -> ~/.orbstack/data/swap.img
  - kernel
  - rootfs.img - 实际系统 rootfs
