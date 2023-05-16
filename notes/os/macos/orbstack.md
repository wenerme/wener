---
title: orbstack
---

# orbstack

- [orbstack](https://orbstack.dev)
  - 运行 VM
  - 提供 Docker - 运行在 VM 里
  - 提供 Linux Machine - 通过 LXC 实现
  - 替代 Docker Desktop, Colima

```bash
brew install orbstack # cask

docker info # $HOME/.orbstack/run/docker.sock

orbctl docker # 启动 Docker

orb create alpine alpine # 创建 linux vm
orb                      # 进入 vm 并进入到对应目录
ssh orb                  # 进入 vm
orb uname -a             # 在 vm 内运行 command
orb shutdown             # 关机

# Host 环境
tree ~/.orbstack/
file ~/.orbstack/data/data.img          # 数据 镜像
qemu-img info ~/.orbstack/data/data.img # 8TiB, raw 格式
```

- macOS Host 上的目录
  - ~/OrbStack/ - NFS
    - `<Machine>/` - LXC
    - `docker/`
      - volumes/
- Machine 里的目录 - 映射 macOS Host -> Linux Guest
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

## Machine

```bash
# /opt/orbstack-guest/bin/mac
which mac

# 进入到 macOS Host 环境
mac uname -a

# 可以 link 主机命令
# mac link docker
```

## USB

- https://docs.orbstack.dev/machines/#usb-devices

# FAQ

```bash
docker run -it --rm -v $SSH_AUTH_SOCK:/agent.sock -e SSH_AUTH_SOCK=/agent.sock alpine
```
