---
title: FreeBSD
tags:
  - OS
  - BSD
  - FreeBSD
---

# FreeBSD

- [Get FreeBSD](https://www.freebsd.org/where.html)
  - 可直接下载虚拟机使用的格式
- [FreeBSD - Wikipedia](https://en.wikipedia.org/wiki/FreeBSD)

## Tips

- Version: 10.0
- Package Manager: `pkg`

```bash
wget https://download.freebsd.org/ftp/releases/VM-IMAGES/11.1-RELEASE/amd64/Latest/FreeBSD-11.1-RELEASE-amd64.qcow2.xz
# brew install xz
xz -d FreeBSD-11.1-RELEASE-amd64.qcow2.xz

# macOS hvf 加速会异常
# 账号 root
qemu-system-x86_64 -smp 4 -hda FreeBSD-11.1-RELEASE-amd64.qcow2 -nic user
```
