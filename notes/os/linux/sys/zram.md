---
title: zram
---

# zram

- 支持压缩的 内存 块存储系统
- 支持后端存储
- 场景 - swap, /tmp, ramdisk
- https://www.kernel.org/doc/html/next/admin-guide/blockdev/zram.html

```bash
modprobe zram
# zramctl
apk add util-linux-misc
zramctl /dev/zram0 --algorithm zstd --size 32G

# 可以用来做 swap - 减少内存使用
# 确保关闭 zswap
mkswap -U clear /dev/zram0
swapon --priority 100 /dev/zram0


echo zaram | tee -a /etc/modules-load.d/zram.conf

# https://github.com/vaeth/zram-init
apk add zram-init
```

```txt title=/etc/udev/rules.d/99-zram.rules
ACTION=="add", KERNEL=="zram0", ATTR{comp_algorithm}="zstd", ATTR{disksize}="4G", RUN="/usr/bin/mkswap -U clear /dev/%k", TAG+="systemd"
```

```txt title=/etc/fstab
/dev/zram0 none swap defaults,pri=100 0 0
```

- https://wiki.archlinux.org/title/Zram
