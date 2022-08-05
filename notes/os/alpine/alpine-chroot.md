---
title: Alpine chroot 环境
---

# Alpine chroot 环境

- [Alpine Linux in a chroot](https://wiki.alpinelinux.org/wiki/Alpine_Linux_in_a_chroot)

```bash
mirror=http://mirrors.sjtug.sjtu.edu.cn/alpine/
arch=armhf
version=2.12.1-r0
curl -LO ${mirror}/latest-stable/main/${arch}/apk-tools-static-${version}.apk

curl -LO http://mirrors.sjtug.sjtu.edu.cn/alpine/v3.10/main/armhf/apk-tools-static-2.10.4-r2.apk

./sbin/apk.static -X ${mirror}/latest-stable/main -U --allow-untrusted -p ${chroot_dir} --initdb add alpine-base
mount -o bind /dev ${chroot_dir}/dev

mknod -m 666 ${chroot_dir}/dev/full c 1 7
mknod -m 666 ${chroot_dir}/dev/ptmx c 5 2
mknod -m 644 ${chroot_dir}/dev/random c 1 8
mknod -m 644 ${chroot_dir}/dev/urandom c 1 9
mknod -m 666 ${chroot_dir}/dev/zero c 1 5
mknod -m 666 ${chroot_dir}/dev/tty c 5 0

# scsi
# mknod -m 666 ${chroot_dir}/dev/sda b 8 0
# mknod -m 666 ${chroot_dir}/dev/sda1 b 8 1
# mknod -m 666 ${chroot_dir}/dev/sda2 b 8 2
# mknod -m 666 ${chroot_dir}/dev/sda3 b 8 3
# mknod -m 666 ${chroot_dir}/dev/sdb b 8 16
# mknod -m 666 ${chroot_dir}/dev/sdb1 b 8 17

mount -t proc none ${chroot_dir}/proc
mount -o bind /sys ${chroot_dir}/sys
cp -L /etc/resolv.conf ${chroot_dir}/etc/

mkdir -p ${chroot_dir}/etc/apk
echo "${mirror}/${branch}/main" > ${chroot_dir}/etc/apk/repositories

# 或者可以使用 busybox
curl -O https://busybox.net/downloads/binaries/1.21.1/busybox-armv6l
```

## alpine 3.1 armhf

- 最早的 armhf

```bash
# http://mirrors.sjtug.sjtu.edu.cn/alpine/v3.1/main/armhf/
curl -LO http://mirrors.sjtug.sjtu.edu.cn/alpine/v3.1/main/armhf/apk-tools-static-2.5.0_rc1-r1.apk

tar -zxvf apk-tools-static-2.5.0_rc1-r1.apk sbin/apk.static --strip-components 1
mkdir root
sudo apk.static -X http://mirrors.sjtug.sjtu.edu.cn/alpine/v3.1/main -U --allow-untrusted -p root --initdb add alpine-base
```
