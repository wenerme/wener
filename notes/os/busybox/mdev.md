---
title: mdev
---

# mdev

- [util-linux/mdev.c](https://sourcegraph.com/github.com/mirror/busybox/-/blob/util-linux/mdev.c)
- udev 的 mini 版本
- 将从 `/sys` 检测到的设备生成 `/dev` 下链接
- 配置 `/etc/mdev.conf`

```ini
# %s      %d:%d       %s
# device  user:group  mode
```
