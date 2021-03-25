---
title: Busybox
---

# Busybox
* [busybox](https://busybox.net/downloads/BusyBox.html)
* [live bbox](https://www.busybox.net/live_bbox/live_bbox.html)

```bash
# https://busybox.net/downloads/binaries/1.31.0-defconfig-multiarch-musl/
curl -o busybox https://busybox.net/downloads/binaries/1.31.0-defconfig-multiarch-musl/busybox-x86_64
chmod +x busybox
```

# 包管理
* ipkg - Itsy Package Management System - 2006-5-30
  * `.ipk`
* opkg - OPKG Package Manager
  * 支持 root fs 管理，而不只是安装到特定目录 - 例如 `/opt`
  * `.opk`
* 早期使用 ipkg, 之后被 opkg 替代
* 类似 apt/dpkg
