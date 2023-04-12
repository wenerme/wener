---
title: orbstack
---

# orbstack

- 轻量级 VM
- 替代 Docker Desktop

```bash
brew install orbstack

docker info # $HOME/.orbstack/run/docker.sock

orb create alpine alpine # 创建 linux vm
ssh orb                  # 进入 vm
orb uname -a             # 在 vm 内运行 command
orb shutdown             # 关机

tree ~/.orbstack/
file ~/.orbstack/data/data.img # 镜像
```
