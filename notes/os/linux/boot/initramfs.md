---
id: initramfs
---

# initramfs
* [How to unpack/uncompress and repack/re-compress an initial ramdisk (initrd/initramfs) boot image file?](https://access.redhat.com/solutions/24029)

```bash
# 因为会解压到当前目录，使用空目录避免清理
mkdir -p /tmp/initrd
cd /tmp/initrd

# GZIP
zcat < /boot/initramfs-lts | cpio -idmv
find . | cpio -o -c -R root:root | gzip -9 > /boot/new.img

# xz/LZMA
xz -dc < /boot/initramfs-lts | cpio -idmv
find . 2>/dev/null | cpio -o -c -R root:root | xz -9 --format=lzma > /boot/new.img
```
