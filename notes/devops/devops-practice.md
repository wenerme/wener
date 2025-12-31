---
tags:
  - Practice
---

# DevOps Practice

## Linux

- /tmp 放在 tmpfs 上
- /var/tmp 放在磁盘上
- noatime
  - 一般不关心 rootfs 的 atime
  - commit=60 减少频繁提交次数

```
# rootfs 单独分区
UUID=A  /	ext4	rw,noatime,commit=60 0 1
# bootfs 单独分区
UUID=B  /boot	ext4	rw,noatime 0 2
# 数据和 rootfs 分开
UUID=C  /data ext4    rw,relatime 0 2

# 避免 rootfs 频繁读写
/data/var/log /var/log none defaults,bind 0 0
/data/var/cache /var/cache none defaults,bind 0 0
/data/var/tmp /var/tmp none defaults,bind 0 0

# 默认 50% 内存空间
tmpfs  /tmp  tmpfs  defaults,noatime,mode=1777  0 0

# 其他
/dev/cdrom  /media/cdrom	iso9660	noauto,ro 0 0
/dev/usbdisk  /media/usb	vfat	noauto	0 0
```
