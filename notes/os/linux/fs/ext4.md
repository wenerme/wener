---
title: ext4
---

## ext4

- 参考
  - man [ext4.5](https://man7.org/linux/man-pages/man5/ext4.5.html)
  - man [mke2fs.8](https://man7.org/linux/man-pages/man8/mke2fs.8.html)
  - man [resize2fs.8](https://man7.org/linux/man-pages/man8/resize2fs.8.html)
  - [e2image.8](https://man7.org/linux/man-pages/man8/e2image.8.html)
  - [Choose block size](https://serverfault.com/a/496099/190601)
  - https://linuxreviews.org/Year_2038_Timestamp_Problem

:::tip

- mkfs.ext4 默认 1k block - 导致不能超过 2T
  - 1k 一般用于 U 盘 这种存储比较小的设备
- inode >= 256 避免 Y2038 问题
- resize2fs 可以 on-line grow 但 **不能 on-line shrinking**
- e2image 可以从 QCOW2 读取 - 但如果 QCOW2 不是由 e2imaghe 生成则不一定支持
- QCOW2 不是 spare，因此默认空间更小，更方便下载

:::

```bash
apk add e2fsprogs e2fsprogs-extra

resize2fs -P /dev/sda3 # 预估 blocks 数量 - 实际大小*4K
tune2fs -l /dev/sda3   # 查看信息
e2fsck -p /dev/sda3    # 检测修复

# size 支持 KMGT
resize2fs /dev/sda3 100000         # 缩小分区
e2image -ra -p /dev/sda1 /dev/sdb1 # 复制分区 - 只复制用到的块 - 效率更高

e2image -rap /dev/vda3 vda3.img    # backup
resize2fs -P vda3.img
e2fsck -p vda3.img
e2fsck -f vda3.img
resize2fs -p vda3.img 4G
e2image -rap vda3.img /dev/vdb2

lsof /dev/vdb2 # 使用情况 - 需要 apk add lsof
lsof / | awk '$4 ~ /[0-9].*[wu]/'

# 挂载为只读
mount -f -o remount,ro /mount/point
echo 1 > /sys/block/dm-4/ro
echo 1 > /sys/block/sda/sda2/ro
# echo u > /proc/sysrq-trigger

tune2fs -O read-only /dev/vda  # 设置只读
tune2fs -O ^read-only /dev/vda # 取消只读

tune2fs -U $(uuidgen) /dev/sdb1 # 修改 UUID

lsblk -x NAME --output NAME,SIZE,VENDOR,FSTYPE,LABEL,UUID,MODE # 查看设备情况

# dd boot 100MB
# dd 后可以重新修改分区
dd if=/dev/vda of=/dev/vdb count=204800 bs=512
e2image -ra -p /dev/vda3 /dev/vdb2

mount -o remount,ro / # 不能成功 - 从 ro 到 rw 可以
mount | column -t
```

| resize2fs      | for                    |
| -------------- | ---------------------- |
| -b             | 64bit                  |
| -d debug-flags |
| -f             | force                  |
| -F             | flush                  |
| -M             | 缩到最小               |
| -p             | 显示完成进度           |
| -P             | 显示预估最小 blocks 数 |
| -s             | off 64bit, free blocks |
| -S RAID-stride |
| -z undo_file   |

- undo_file
  - resize2fs-device.e2undo
  - E2FSPROGS_UNDO_DIR

| e2image       | for                                                     |
| ------------- | ------------------------------------------------------- |
| -a            | include file data in image file, 默认只包含 fs metadata |
| -b superblock |
| -B blocksize  |
| -c            | 对比，相同则不拷贝 block                                |
| -f            | force - 允许 source 为非 readonly 状态                  |
| -I            |
| -n            |
| -o src_offset |
| -O tgt_offset |
| -p            | 显示进度                                                |
| -Q            | QCOW2                                                   |
| -r            | raw 格式                                                |
| -s            |

## 测试 fs

```bash
truncate --size 10M test

mkfs.ext4 -v test
```

- 选择 small fs type
- block-size 1024
- blocks 10240 = 10M
- 最大 fs blocks 10485760
  - 最大 resize 1024 倍 = 10240\*1024
  - = blocks per group * inodes per group = 8192*1280

```
fs_types for mke2fs.conf resolution: 'ext4', 'small'
Discarding device blocks: done
Discard succeeded and will return 0s - skipping inode table wipe
Filesystem label=
OS type: Linux
Block size=1024 (log=0)
Fragment size=1024 (log=0)
Stride=0 blocks, Stripe width=0 blocks
2560 inodes, 10240 blocks
512 blocks (5.00%) reserved for the super user
First data block=1
Maximum filesystem blocks=10485760
2 block groups
8192 blocks per group, 8192 fragments per group
1280 inodes per group
```

```bash
tune2fs -l test
```

可以反推 fs 初始化时的大小，可判断最大可 resize 空间

- Block size
- Blocks per group
- Inodes per group

```bash
file test

mkfs.ext4 -F -b 4096 test
```

## mke2fs.conf

- -T 指定类型
- man [mke2fs.conf.5](https://man7.org/linux/man-pages/man5/mke2fs.conf.5.html)

| size   | type   |
| ------ | ------ |
| <= 3mb | floppy |

```conf title="/etc/mke2fs.conf"
[defaults]
	base_features = sparse_super,large_file,filetype,resize_inode,dir_index,ext_attr
	default_mntopts = acl,user_xattr
	enable_periodic_fsck = 0
	blocksize = 4096
	inode_size = 256
	inode_ratio = 16384

[fs_types]
	ext3 = {
		features = has_journal
	}
	ext4 = {
		features = has_journal,extent,huge_file,flex_bg,metadata_csum,64bit,dir_nlink,extra_isize
		inode_size = 256
	}
	small = {
		blocksize = 1024
		inode_ratio = 4096
	}
	floppy = {
		blocksize = 1024
		inode_size = 128
		inode_ratio = 8192
	}
	big = {
		inode_ratio = 32768
	}
	huge = {
		inode_ratio = 65536
	}
	news = {
		inode_ratio = 4096
	}
	largefile = {
		inode_ratio = 1048576
		blocksize = -1
	}
	largefile4 = {
		inode_ratio = 4194304
		blocksize = -1
	}
	hurd = {
    blocksize = 4096
    inode_size = 128
	}
```

# FAQ

## resize 需要注意的参数

mke2fs will attempt to reserve enough space so that the filesystem may grow to 1024 times its initial size. This can be changed using the resize extended option.

如果初始空间是 1G，那么默认最大只能 resize 到 1T。

- -i
- `-E resize=max-online-resize`
- -m reserved-blocks-percentage

## New size results in too many block group descriptors

注意，默认最大 resize 1024 倍，如果初始 1G 则最大 1T。

- [tytso/e2fsprogs#74](https://github.com/tytso/e2fsprogs/issues/74#issuecomment-889894735)

```bash
e2fsck -f /dev/XXX
resize2fs /dev/XXX
```

或

```bash
resize2fs -f /dev/sdb2
```

## kernel error

```
blk_update_request: critical target error, dev sda, sector 1875240 op 0x1:(WRITE) flags 0x800 phys_seg 2 prio class 0
Aborting journal on device sda2-8.

blk_update_request: critical target error, dev sda, sector 1837056 op 0x1:(WRITE) flags 0x800 phys_seg 1 prio class 0
Buffer I/O error on dev sda2, logical block 196608, lost sync page write
JBD2: Error -5 detected when updating journal superblock for sda2-8.

EXT4-fs (sda2): I/O error while writing superblock
EXT4-fs error (device sda2): ext4_journal_check_start:83: Detected aborted journal
EXT4-fs (sda2): Remounting filesystem read-only
```

尝试修复

```
fsck
```

```
Journal checksum error found in /dev/sda2
fsck.ext4: unable to set superblock flags on /dev/sda2
```

应该是 SD 卡异常了，尝试更换硬件设备。

## online shrink

最难的是将 root remount 为 ro

1. 离线方式

- AlpineLinux 通过配置启动参数 rootflags=ro 重启挂载为只读
- `tune2fs -O read-only /dev/sda1`  设置后重启，会被挂载为 ro

2. 在线

- pivot root

## e2image seek_relative: Invalid argument

目标设备空间不够

## dd compress

```basj
dd bs=1M iflag=fullblock if=/dev/sda2 status=progress | gzip >img.gz
gzcat img.gz | dd bs=1M iflag=fullblock of=/dev/sda2 status=progress

dd bs=1M iflag=fullblock if=/dev/sda2 status=progress | zstd -16v >img.zst
zstdcat img.zst | dd bs=1M iflag=fullblock of=/dev/sda2 status=progress

pv /dev/sda2 | zstd -16 >img.zst
zstdzcat img.zst | pv >/dev/sda2

zstd -16v </dev/sda2 >sda2.zst
zstdcat -v sda2.zst >/dev/sda2
```
