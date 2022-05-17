---
title: Filesystem
---

# Filesystem

## Tips

- 在 Mac 下可通过虚拟机来格式化磁盘
- 使用 [rufus](https://rufus.akeo.ie/) 制作 Windows 启动盘
- CHS - 柱面-磁头-扇区 - Cylinder-head-sector
- [Solid State Drives](https://wiki.archlinux.org/index.php/Solid_State_Drives)
- [Flash file system](https://en.wikipedia.org/wiki/Flash_file_system)
- https://unix.stackexchange.com/questions/198590
- 针对闪存优化的文件系统
  - APFS
  - exFAT
  - F2FS
  - JFFS、JFFS2
  - ZFS - 利用 SSD 缓存、日志
- 虚拟化相关特性
  - COW
    - btrfs, zfs
  - holes
    - ext2, ext3
  - Snapshot
- XFS
  - 慢
  - 基于日志
  - 足够稳定,适合生产,使用最为广泛
- Btrfs
  - 最快
  - CopyOnWrite
  - 支持写快照
  - 支持 XATTRs 和 inline data
  - 支持热 fsck
  - Ceph 可同时写日志和对象数据
  - 正在趋于稳点和生产
- Ext4
  - 适合生产
  - 基于日志
  - 文件名有长度限制
- [F2FS](https://en.wikipedia.org/wiki/F2FS)
  - Linux 内核支持 - v3.8 - 2010-12-20
    - 5.6+ 支持压缩 - LZO、LZ4
    - 5.7+ 支持 zstd
  - 针对 闪存 优化 - SSD、TF、USB
  - 主流 Android 手机均使用该系统
- 参考
  - [List of cryptographic file systems](https://en.wikipedia.org/wiki/List_of_cryptographic_file_systems)
  - [List of file systems](https://en.wikipedia.org/wiki/List_of_file_systems)
  - [Comparison of file system](https://en.wikipedia.org/wiki/Comparison_of_file_systems)
  - [Which Linux File System Should You Use?](https://www.howtogeek.com/howto/33552/htg-explains-which-linux-file-system-should-you-choose/)
    - 如果不确定就用 EXT4

| N/A             | Minix   | Ext             | Ext2  | Xia   |
| --------------- | ------- | --------------- | ----- | ----- |
| Max FS size     | 64 MB   | 2 GB 4 TB 2 GB  |
| Max file size   | 64 MB   | 2 GB 2 GB 64 MB |
| Max file name   | 16/30 c | 255 c           | 255 c | 248 c |
| 3 times support | No      | No              | Yes   | Yes   |
| Extensible      | No      | No              | Yes   | No    |
| Var. block size | No      | No              | Yes   | No    |

| fs       | create | grow | shrink | move | copy | check | label | uuid | pkgs                         |
| -------- | ------ | ---- | ------ | ---- | ---- | ----- | ----- | ---- | ---------------------------- |
| btrfs    | ✅     | ✅   | ✅     | ✅   | ✅   | ✅    | ✅    | ✅   | btrfs-progs/btrfs-tools      |
| exfat    | ❌     | ❌   | ❌     | ✅   | ✅   | ❌    | ❌    | ❌   |
| ext2     | ✅     | ✅   | ✅     | ✅   | ✅   | ✅    | ✅    | ✅   | e2fsprogs                    |
| ext2     | ✅     | ✅   | ✅     | ✅   | ✅   | ✅    | ✅    | ✅   | e2fsprogs                    |
| ext2     | ✅     | ✅   | ✅     | ✅   | ✅   | ✅    | ✅    | ✅   | e2fsprogs                    |
| f2fs     | ✅     | ✅   | ❌     | ✅   | ✅   | ✅    | ❌    | ❌   | f2fs-tools                   |
| fat16    | ✅     | ✅   | ✅     | ✅   | ✅   | ✅    | ✅    | ✅   | dosfstools, mtools           |
| fat32    | ✅     | ✅   | ✅     | ✅   | ✅   | ✅    | ✅    | ✅   | dosfstools, mtools           |
| hfs      | ✅     | ❌   | ✅     | ✅   | ✅   | ❌    | ❌    | ❌   | hfsutils                     |
| hfs+     | ✅     | ❌   | ✅     | ✅   | ✅   | ✅    | ❌    | ❌   | hfsutils                     |
| jfs      | ✅     | ✅   | ❌     | ✅   | ✅   | ✅    | ✅    | ✅   | jfsutils                     |
| swap     | ✅     | ✅   | ❌     | ✅   | ✅   | ❌    | ✅    | ✅   | util-linux                   |
| luks     | ❌     | ✅   | ❌     | ✅   | ✅   | ❌    | ❌    | ❌   | cryptsetup, dmsetup          |
| lvm2 pv  | ✅     | ✅   | ✅     | ✅   | ✅   | ✅    | ✅    | ✅   | lvm2                         |
| minix    | ✅     | ❌   | ❌     | ✅   | ✅   | ✅    | ❌    | ❌   | util-linux                   |
| nilfs2   | ✅     | ✅   | ✅     | ✅   | ✅   | ❌    | ✅    | ✅   | nilfs-utils/nilfs-tools      |
| ntfs     | ✅     | ✅   | ✅     | ✅   | ✅   | ❌    | ✅    | ✅   | ntfs-3g/ntfsprogs            |
| reiser4  | ✅     | ❌   | ❌     | ✅   | ✅   | ✅    | ❌    | ❌   | reiser4progs                 |
| reiserfs | ✅     | ✅   | ✅     | ✅   | ✅   | ✅    | ✅    | ✅   | reiserfsprogs/reiserfs-utils |
| udf      | ✅     | ❌   | ❌     | ✅   | ✅   | ❌    | ✅    | ✅   | udftools                     |
| xfs      | ✅     | ✅   | ❌     | ✅   | ✅   | ✅    | ✅    | ✅   | xfsprogs, xfsdump            |

## 基准测试

```bash
# /dev/zero 最快,但可能会被压缩
time cat /dev/zero | head -c $((1024*1024*500)) > /dev/null
real	0m0.439s
user	0m0.026s
sys	0m0.747s

# /dev/urandom 性能较慢
time cat /dev/urandom | head -c $((1024*1024*500)) > /dev/null
real	1m25.427s
user	0m0.097s
sys	1m25.713s

# openssl 随机数相对更快
time openssl rand $((1024*1024*500)) | head -c $((1024*1024*500)) > /dev/null
real	0m9.721s
user	0m9.024s
sys	0m1.284s

# 监控 IO 状况
iostat -mx -d sda 1

dd bs=16M count=64 if=test of=test1 conv=fdatasync

```

- [dd benchmark](https://romanrm.net/dd-benchmark)

## 常用操作

```bash
# 可查看速度
pv /home/user/bigfile.iso | md5sum
# 8.25 后可查看进度
dd if=/dev/urandom of=/dev/null status=progress
# urandom 会限制速度,可以使用文件来测试
truncat -s 10G test.data
dd if=test.data of=/dev/null status=progress
# 似乎会更快
pv < /dev/sda > /dev/sdb
# 使用 PV 监控速度
dd if=/dev/urandom | pv | dd of=/dev/null
# 简单一点
pv bigfile.iso | dd of=VirtualDisk.raw
# 在 DD 执行以后也可以查看进度
kill -USR1 $(pgrep ^dd)
watch -n5 'kill -USR1 $(pgrep ^dd)'
# 在 BSD/MAC 下需要 INFO
kill -INFO $(pgrep ^dd$)
# 同上简单一点
pkill -usr1 dd

# 将磁盘制作为镜像文件
dd if=/dev/sdb of=./disk.img
# 从文件恢复到磁盘
dd if=./disk.img of=/dev/sdb

# 挂载 smb
# Windows 共享无密码时使用 guest
mount_smbfs //guest:guest@192.168.8.1/share/ ~/mnt/share/
# 或者挂载 cifs 也可以
mount -t cifs -o username=guest,password=guest //192.168.8.1/share/ ~/mnt/share/

# 如果使用的环境没有相关的 linux 工具,可以考虑使用 docker
docker run --rm -it --privileged -v /:/host ubuntu

```

## diskutil

- [diskutil.8](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man8/diskutil.8.html)

## OS X

```bash
# 相当于 fdisk -l
diskutil list
# umount 经常无法直接操作
diskutil unmount /Volumes/<挂载名>
diskutil unmountdisk /dev/disk2
# 格式化磁盘
diskutil eraseDisk HFS+ DISK disk2
# 磁盘分区
diskutil partitionDisk disk4 1 GPT HFS+ newdisk R

# 添加 ext 类磁盘操作工具
brew install e2fsprogs
ls `brew --prefix e2fsprogs`/sbin
```

## 特殊特性

- rename2
  - overlay 依赖
  - zfs 尚不支持
- clone
  - zfs 尚不支持

## FAQ

### disk vs rdisk on BSD

`man hdiutil`

> /dev/rdisk nodes are character-special devices, but are "raw" in the BSD sense and force block-aligned I/O. They are closer to the physical disk than the buffer cache. /dev/disk nodes, on the other hand, are buffered block-special devices and are used primarily by the kernel's filesystem code.

即 rdisk 几乎是直接访问物理设备,disk 还会经过系统缓存.在能使用 rdisk 时不使用 disk.

http://superuser.com/questions/631592

### 文件时间

- HN [Linus on btime: “Let’s wait five years” (2010)](https://news.ycombinator.com/item?id=12555160)

| 时间缩写 | 全称        | 说明                            |
| -------- | ----------- | ------------------------------- |
| atime    | Access Time | 访问时间                        |
| ctime    | Change Time | 当访问权限等修改时,会修改该时间 |
| mtime    | Modify Time | 当修改文件内容时会修改该时间    |
| btime    | Birth Time  | 创建时间                        |

|       | windows | linux | solaris | dragonfly | nacl | freebsd | darwin | netbsd | openbsd | plan9 |
| :---: | :-----: | :---: | :-----: | :-------: | :--: | :-----: | :----: | :----: | :-----: | :---: |
| atime |    ✓    |   ✓   |    ✓    |     ✓     |  ✓   |    ✓    |   ✓    |   ✓    |    ✓    |   ✓   |
| mtime |    ✓    |   ✓   |    ✓    |     ✓     |  ✓   |    ✓    |   ✓    |   ✓    |    ✓    |   ✓   |
| ctime |   ✓\*   |   ✓   |    ✓    |     ✓     |  ✓   |    ✓    |   ✓    |   ✓    |    ✓    |       |
| btime |    ✓    |  n/a  |   n/a   |    n/a    | n/a  |    ✓    |   ✓    |   ✓    |

- Windows XP 不支持 ctime, Vista 以上支持.
- 可使用 `stat 文件名` 查看
- 该表格摘自 [djherbis/times](https://github.com/djherbis/times#supported-times)

```bash
$ stat sg_store.db
  File: 'sg_store.db'
  Size: 45056          	Blocks: 88         IO Block: 4096   regular file
Device: 1000004h/16777220d     	Inode: 45296478    Links: 1
Access: (0644/-rw-r--r--)  Uid: (  501/   root)   Gid: (   20/   root)
Access: 2016-09-22 15:26:54.000000000 +0800
Modify: 2016-09-22 15:26:54.000000000 +0800
Change: 2016-09-22 15:27:20.000000000 +0800
 Birth: 2016-09-21 23:05:30.000000000 +0800

# 修改 mtime 和 ctime
$ touch sg_store.db
# 修改 ctime
$ chown root:root sg_store.db
```
