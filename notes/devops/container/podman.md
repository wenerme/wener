---
title: podman
---

# podman

- 参考
  - [Containerfile.5](https://www.mankier.com/5/Containerfile)
  - https://news.ycombinator.com/item?id=28462495

```bash
# macOS
brew install podman

# 类似 docker desktop 方式启动虚拟机
podman machine init
podman machine start

# podman 会尝试兼容
alias docker=podman
```
