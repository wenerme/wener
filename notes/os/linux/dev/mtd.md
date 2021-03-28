---
title: mtd
---

# mtd
* 是什么？
  * memory technology device - Linux 访问 内存设备(rom, flash) 的子系统
  * 常用于嵌入式设备 Flash 存储
* [mtd-utils](http://www.linux-mtd.infradead.org/)
* flash, jffs, nand, ubi
* `/dev/mtdN` - 字符设备
  * ioctl
  * MEMGETINFO, MEMERASE
* `/dev/mtdblockN` - 伪装块设备
* 参考
  * https://my.oschina.net/shelllife/blog/123482
  * https://unix.stackexchange.com/questions/513415

```bash
# 查看 mtd 和 ubi 分区
cat /proc/partitions
# mtd 块
cat /proc/mtd

nanddump -f /tmp/mtd0.bin /dev/mtd0

/usr/bin/ubiattach /dev/ubi_ctrl -m <MTD_partition> -O <block_size>
/bin/mount -t ubifs ubi1:rootfs0 /media/mnt

# 如果没有 fs
nanddump -f /tmp/mtd0.bin /dev/mtdblock0
# data flash / NOR
dd if=/dev/mtdblock1 of=/tmp/mtd1.bin


mknod -m 644 /dev/mtd9        c 90 9
mknod -m 644 /dev/mtdblock9   b 31 9
mount -t jffs2 /dev/mtdblock9 /mnt
```
