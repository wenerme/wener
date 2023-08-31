---
title: NBD
---

# NBD

- [Network block device](https://en.wikipedia.org/wiki/Network_block_device)
- Linux 2.1.55 and released in 1997
- [Choice of SAN: iSCSI vs NBD vs AOE](https://www.reddit.com/r/HomeServer/comments/954ns2/choice_of_san_iscsi_vs_nbd_vs_aoe/)

```bash
# https://gist.github.com/shamil/62935d9b456a6f9877b5
# setup
# 默认 16
# modprobe nbd max_part=8
modprobe nbd
qemu-img create -f qcow2 alpine.qcow2 40G
qemu-nbd --connect=/dev/nbd0 alpine.qcow2

# 磁盘信息
fdisk /dev/nbd0 -l
mount /dev/nbd0p1 /mnt

# cleanup
umount /mnt/somepoint/
qemu-nbd --disconnect /dev/nbd0

#
rmmod nbd
```
