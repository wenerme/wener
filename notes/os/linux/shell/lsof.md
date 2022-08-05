---
title: lsof
---

# lsof

- [lsof.8](https://man7.org/linux/man-pages/man8/lsof.8.html)

```bash
# 搜索目录
lsof +D /var/lib/k0s/containerd/io.containerd.snapshotter.v1.overlayfs/
# 搜索 Linux 文件
sudo lsof -f -- /run/k0s/konnectivity-server/konnectivity-server.sock
```
