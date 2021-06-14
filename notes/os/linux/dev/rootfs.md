---
title: rootfs
---

# rootfs

- chroot 或 switch_root 会隐藏 rootfs
- [ramfs-rootfs-initramfs](https://www.kernel.org/doc/Documentation/filesystems/ramfs-rootfs-initramfs.txt)
- 参考
  - [Why is there no rootfs file system present on my system?](https://unix.stackexchange.com/a/455136/47774)

```
rootfs / rootfs rw 0 0
```
