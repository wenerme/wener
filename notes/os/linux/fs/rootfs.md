---
title: rootfs
---

# rootfs

- chroot 或 switch_root 会隐藏 rootfs
- [ramfs-rootfs-initramfs](https://www.kernel.org/doc/Documentation/filesystems/ramfs-rootfs-initramfs.txt)
- 参考
  - [switch_root.8](https://man7.org/linux/man-pages/man8/switch_root.8.html)
  - [pivot_root.8](https://man7.org/linux/man-pages/man8/pivot_root.8.html)
  - [Why is there no rootfs file system present on my system?](https://unix.stackexchange.com/a/455136/47774)

```fstab
rootfs / rootfs rw 0 0
```

## switch_root

- 切换到 newroot 并调用 init 程序
  - 用在 initramfs 中，切换到真正的 rootfs
- 必须由 PID=1 调用
- 会移动已经挂载的 /proc, /dev, /sys, /run 到新 root

```bash
# -c /dev/console
switch_root newroot init # init args...
```

## pivot_root

- 修改当前进程的 root
- 要注意提前准备好环境

```bash
pivot_root new_root put_old

# 切换 root
mount /dev/hda1 /new-root
cd /new-root
pivot_root . old-root
exec chroot . sh < dev/console > dev/console 2>&1
umount /old-root
```

**umount rootfs**

```bash
fuser -vm /
# killall
umount -a

mkdir /tmp/tmproot
mount -t tmpfs none /tmp/tmproot
mkdir /tmp/tmproot/{proc,sys,dev,run,usr,var,tmp,oldroot}

cp -ax /{bin,etc,mnt,sbin,lib,lib64} /tmp/tmproot/
cp -ax /usr/{bin,sbin,lib,lib64} /tmp/tmproot/usr/
cp -ax /var/{account,empty,lib,local,lock,nis,opt,preserve,run,spool,tmp,yp} /tmp/tmproot/var/

mount --make-rprivate / # necessary for pivot_root to work
pivot_root /tmp/tmproot /tmp/tmproot/oldroot
for i in dev proc sys run; do mount --move /oldroot/$i /$i; done

fuser -vm /oldroot

umount /oldroot
# 操作原来 rootfs block device

# 操作完成后重新 mount
mount /dev/vda2 /oldroot
mount --make-rprivate /
pivot_root /oldroot /oldroot/tmp/tmproot
for i in dev proc sys run; do mount --move /tmp/tmproot/$i /$i; done

# 移除临时 rootfs
umount /tmp/tmproot
rmdir /tmp/tmproot

mount -a

# 启动服务

mount --make-rshared /
```

- https://unix.stackexchange.com/a/227318/47774
