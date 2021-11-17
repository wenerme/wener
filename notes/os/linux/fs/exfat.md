---
title: exFAT
---

# exFAT

- Linux exFAT
  - 类似 vfat
  - 没有权限概念，可以 mount 设置 `defaults,noatime,nofail,uid=1000,fmask=0133,dmask=0022`
  - Linux 5.4+ in kernel module
    - 之前使用 fuse
- 用户空间工具
  - fuse-exfat-utils - 基于 fuse
  - exfatprogs - 基于 kernel module
    - {dump,fsck,mkfs,tune}.exfat
    - exfatlabel
- Kernel fs [vfat](https://www.kernel.org/doc/html/latest/filesystems/vfat.html)

:::tip

- exFAT 最适合 闪存盘/U 盘/TF 卡

:::

```bash
apk del fuse-exfat fuse-exfat-utils
apk add exfatprogs

modprobe exfat
cat /proc/filesystems | grep exfat

mkfs.exfat /dev/sdc1
tune.exfat -vi /dev/sdc1
mount /dev/sdc1 /mnt
```
