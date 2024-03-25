---
title: ZFS 常见问题
tags:
  - FAQ
---

# ZFS 常见问题

:::tip

- renameat2/overlayfs ZFS v2.2+
  - [zfs_rename: support RENAME\_ flags](https://github.com/openzfs/zfs/commit/dbf6108b4df92341eea40d0b41792ac16eabc514)
  - feature zilsaxattr

:::

| abbr. | stand for                  | cn             |
| ----- | -------------------------- | -------------- |
| SPA   | Storage Pool Allocator     |
| vdev  | Virtual Device             | 虚拟设备       |
| ZIL   | ZFS Intent Log             |
| TXG   | Transaction Group          |
| SLOG  | Sync Log                   |
| ARC   | Adaptive Replacement Cache | 自适应替换缓存 |
| L2ARC | Level 2 ARC                | 二级 ARC       |

```bash
zfs get all | grep -E 'used\b|logicalused|compression|\bcompress'

zfs get all | grep -E 'sync'
```

## 如何选择 RAIDZ/mirror/dRAID

- RAIDZ - striped vdevs - RAID5/6/7
  - 66%
    - 3wide RADIZ1
    - 6wide RADIZ2
    - 9wide RADIZ3
  - `N*W RAIDZx`
    - N group
    - W wide
  - 不能/不方便 扩容
  - 固定 parity
- mirror - RAID10
  - 50%
  - degraded 性能更好
  - 恢复快
  - 扩容方便
- [dRAID](./zfs-draid.md)
  - 更灵活

**参考**

- 2015 [ZFS: You should use mirror vdevs, not RAIDZ.](https://jrs-s.net/2015/02/06/zfs-you-should-use-mirror-vdevs-not-raidz/)
  - by Author of [jimsalterjrs/sanoid](https://github.com/jimsalterjrs/sanoid)

## 修复

```bash
# -t temporary 重启后恢复
zpool offline main scsi-0000
zpool replace main scsi-0000 scsi-1111

# -e 如果新的硬盘更大
zpool online main scsi-1111
```

**resilver**

- group 里全部扫
- 会很慢

## raidz1 to raidz2

**不可以**

- https://serverfault.com/a/799952/190601

## 查看实际大小

```bash
# 查看压缩后的大小
du -h .
# 查看实际大小
du --apparent-size -h .
```

## 目录下很多文件时非常慢

尝试关闭 atime

## cannot create '/data/db': pool must be upgraded to set this property or value

```bash
sudo zpool upgrade -a
```

## 计算使用空间

- compressratio - 压缩率
  - 1/compressratio = 压缩比
  - compressratio=logicalused/used
- used - 实际占用空间
- logicalused - 逻辑占用空间
- 占用空间也和什么时候开启的 compression 有关
  - 开启 compression 之后新写入数据会压缩
- 占用空间会对齐，因此可能会比逻辑更多

```bash
zfs get all | grep -E 'used\b|logicalused|compression|\bcompress'
```

```
data                 used                  884G                  -
data                 compressratio         1.47x                 -
data                 compression           lz4                   local
data                 logicalused           1.24T                 -
```

## zfs compression vs application compression

- zfs 压缩
  - 全量压缩，简单易用
  - 压缩率受 block 大小影响
  - 支持 lz4、zstd
- 应用 压缩
  - 涉及到应用功能是否支持
  - 压缩的范围和 ZFS 压缩的范围不同
    - 一般应用只压缩 数据
  - 压缩率 不一定就比 ZFS 压缩率 高

---

- zfs vs pg
  - PostgreSQL 14 支持 LZ4 TOAST
    - default_toast_compression=lz4
    - 可以在建表时设置 `col1 text COMPRESSION lz4`
  - PostgreSQL 15 支持 LZ4 WAL

## ZFS 缓存

- ZIL - ZFS Intent Log - 缓冲 WRITE 操作
- SLOG - Separate Intent Log
  - `zpool add tank log`
  - 不需要特别大的设备 - 例如 16G, 64G SSD 足矣
- ARC - 缓存 READ 操作 - Adaptive Replacement Cache
  - 内存
- L2ARC
  - `zpool add tank cache`
  - 不需要特别大的设备 - 例如 128G SSD
  - 系统重启后缓存依然可用

```bash
zpool add tank log ada3             # 添加 ZIL - 单磁盘
zpool add tank log mirror ada3 ada4 # 添加 ZIL - RAID1 - 坏一个 SSD 写入的数据也不会丢
zpool add tank cache ada3           # 添加 L2ARC
```

## ZFS 性能估算

> 调优应先找到瓶颈在哪里。

- RAIDZn 顺序 4KB 读取 - 无 cache 场景
  - RAIDZ1 - `N/(N-1) * IOPS`
  - RAIDZ2 - `N/(N-2) * IOPS`
  - RAIDZ3 - `N/(N-3) * IOPS`
  - 有 cache 时，则上限为 cache 磁盘的 IOPS
- 写入性能
  - 无法直接估算，zfs 内部 zil 为异步写入
  - 额外的 ZIL 设备可提升 write 性能
  - 默认会在每个磁盘预留空间存储 ZIL
- 性能影响因素
  - recordsize - 默认 128k
  - compression
  - ashift
  - dedup - 默认关闭 - 特殊场景去重能提升性能
  - atime - 默认开启 - 一般不需要，可关闭提升读取性能
  - logbias - 默认 latency, 可设置为 throughput, 减少使用额外 zil 设备
  - sync
    - 关闭最多丢失 30s 数据 - 如果场景允许丢失，则不影响
    - 通过 UPS 确保存储 比 网络后异常 可考虑关闭 sync
  - primarycache
  - secondarycache

## zfs import

- 正常系统启动会从缓存 导入 - zfs import -c /etc/zfs/zpool.cache
- 如果缓存丢失，则可以直接搜索磁盘
  - 例如: 更换了系统
- [zpool-import.8](https://openzfs.github.io/openzfs-docs/man/8/zpool-import.8.html)

```bash
# 查看 可导入 的 pool
# 使用 lsblk 搜索
zpool import
# 执行导入 - 导入所的
zpool import -a

# 手动指定搜索目录
zpool import -d /dev/disk/by-id
```

## 关闭所有 atime

```bash
zfs get atime | grep '\son\s' | cut -d ' ' -f 1 | xargs -n1 sudo zfs set atime=off
```

## atime=on temporary

- https://gitlab.alpinelinux.org/alpine/aports/-/issues/12382
- https://github.com/openzfs/zfs/issues/7947

```sh title=/etc/conf.d/zfs
MOUNT_EXTRA_OPTIONS="-o atime=off"
```

## zvol vs zfs

- zvol - 块设备
  - raidz、压缩
  - 没有所有 zfs 伴随的能力
  - blocksize=8k
- zfs - 文件系统 - dataset
  - 快照、克隆
  - 文件系统有一定特性 - 也有缺陷
    - ~~主要缺陷: 不支持 rename2/overlay~~ - ZFS v2.2+
  - recordsize=128k

## High System Usage

- z_wr_iss
- spl_dynamic_tas
- z_wr_iss_h
- l2arc_feed
- z_wr_int_h
- rcu_sched
- txg_sync
- z_ioctl_int
- kworker/0:1-events
- z_null_iss
- z_null_int
- dp_sync_taskq
- z_wr_int
- arc_reap
- ksoftirqd
- dbuf_evict
- mmp
- migration/0

## zfs list slow

- dataset 多了后 `zfs list` 非常慢

```bash
time zfs list | wc -l

# docker zfs volume 使用的命令
zfs list -s name -o name,guid,available -H -p
zfs list -r -t all -Hp -o name,origin,used,available,mountpoint,compression,type,volsize,quota,referenced,written,logicalused,usedbydataset main/docker

# containerd
zfs list -Hp -o name,origin,used,available,mountpoint,compression,type,volsize,quota,referenced,written,logicalused,usedbydataset data/var/k3s/snapshotter/60519
```

```
758

real    0m1.777s
user    0m0.177s
sys     0m1.599s
```

- https://github.com/openzfs/zfs/discussions/8898

```bash
time zfs list -s name -o name,guid,available -H -p > zfs-list.txt
```

```
real    2m10.183s
user    0m3.016s
sys     2m6.836s
```

```bash
wc -l zfs-list.txt
# 20177 zfs-list.txt
```

## ZFS vs Hard RAID

- ZFS 有校验和,和可避免位翻转等问题,而 RAID 主要用于避免整个磁盘的损坏
- ZFS 只需要 HBAs (host bus adapter ) 而不需要 RAID 控制器
- 最多只需要 Z2, Z3 很少使用,并且可能会有问题,有其他的办法来避免可能的错误
- ZFS 并不是 RAID, 而是一个软件,一个文件系统
- ZFS 重建比 RAID 更快,例如 1TB 的云盘,实际数据只有 100MB, 那么 ZFS 只需要 100MB 的 IO, 而 RAID 需要 1TB 的 IO.
- scrub 是用来保证数据安全的,而不是保证磁盘健康的.不是自动的,需要定时调度.
- 额外特性
  - 自定义划分存储空间
  - 可根据应用调优
  - 加密
  - 增量同步

---

- "PFA"s, as in Pre-Failure Alerts
- [ZFS vs RAID6](https://www.reddit.com/r/storage/comments/3jcg2r/zfs_vs_raid6/)

## z0 is write-protected but explicit read-write mode requested

```bash
umount /dev/z0
e2fsck /dev/z0
mount /dev/z0
```

## Superblock needs_recovery flag is clear, but journal has data.

```
Buffer I/O error on dev zd0, logical block 0, lost async page write
```

**磁盘满了**

```bash
zfs list -o space,mountpoint
```

## is in use and contains a unknown filesystem

- mdraid, lvm, multipath

```bash
cat /proc/mdstat

mdadm --stop /dev/md127
```

## zvol 扩容

```bash
zfs get volsize data/vol      # 当前
zfs set volsize=500G data/vol # 修改 Quota
resize2fs /dev/zvol/data/vol  # 扩容 fs
```

## cannot label 'sdf': failed to detect device partitions on '/dev/sdf1': 19

## Missing /dev/zvol

```bash
apk add zfs zfs-{scripts,udev}

udevadm trigger
```

## cannot trim: no devices in pool support trim operations

```bash
zpool trim data

hdparm -I /dev/sda | grep -i trim # 检查 TRIM 支持
```

- SATA 控制器
- https://github.com/openzfs/zfs/discussions/14231
  - L2ARC device is in use as a cache
- https://github.com/openzfs/zfs/issues/13108

## retry UNAVAL

```bash
zpool online data DISK
zpool clear data
zpool scrube data # 推荐
```

## remount zvol rw

```bash
mount -o remount,rw /data/docker
```

- cache 异常后导致 zvol 被重新挂载为 ro
- clear cache 的 error 后还是无法挂载，因为 fs 损坏


```ansi
[0;33mEXT4-fs warning (device zd0): [0;1mext4_end_bio:343: I/O error 3 writing to inode 5767264 starting block 14909936)[0m
[0;31mBuffer I/O error on device zd0, logical block 14909936[0m
[0;33mEXT4-fs warning (device zd0): [0;1mext4_end_bio:343: I/O error 3 writing to inode 5898267 starting block 11927556)[0m
[0;31mBuffer I/O error on device zd0, logical block 11927556[0m
[0;33mEXT4-fs warning (device zd0): [0;1mext4_end_bio:343: I/O error 3 writing to inode 5898258 starting block 20496389)[0m
[0;31mBuffer I/O error on device zd0, logical block 20496389[0m
[0;33mEXT4-fs warning (device zd0): [0;1mext4_end_bio:343: I/O error 3 writing to inode 5898266 starting block 2630818)[0m
[0;31mBuffer I/O error on device zd0, logical block 2630818[0m
[0;33mEXT4-fs warning (device zd0): [0;1mext4_end_bio:343: I/O error 3 writing to inode 2919521 starting block 16194810)[0m
[0;31mBuffer I/O error on device zd0, logical block 16194810[0m
[0;31mBuffer I/O error on device zd0, logical block 16194811[0m
[0;31mBuffer I/O error on device zd0, logical block 16194812[0m
[0;31mBuffer I/O error on device zd0, logical block 16194813[0m
[0;33mEXT4-fs warning (device zd0): [0;1mext4_end_bio:343: I/O error 3 writing to inode 2920494 starting block 14332529)[0m
[0;33mEXT4-fs warning (device zd0): [0;1mext4_end_bio:343: I/O error 3 writing to inode 2883634 starting block 24493815)[0m
[0;31mBuffer I/O error on device zd0, logical block 24493815[0m
[0;33mEXT4-fs warning (device zd0): [0;1mext4_end_bio:343: I/O error 3 writing to inode 2883634 starting block 24493816)[0m
[0;31mBuffer I/O error on device zd0, logical block 14332529[0m
[0;31mBuffer I/O error on dev zd0, logical block 0, lost async page write[0m
[0;31mBuffer I/O error on dev zd0, logical block 1, lost async page write[0m
[0;31mBuffer I/O error on dev zd0, logical block 2, lost async page write[0m
[0;33mEXT4-fs error (device zd0): [0;31;1mext4_check_bdev_write_error:217: comm kworker/u8:0: Error while async write back metadata[0m
[0;33mEXT4-fs (zd0): [0;31mprevious I/O error to superblock detected[0m
[0;31mBuffer I/O error on dev zd0, logical block 5, lost async page write[0m
[0;31mBuffer I/O error on dev zd0, logical block 6, lost async page write[0m
[0;31mBuffer I/O error on dev zd0, logical block 8, lost async page write[0m
[0;31mBuffer I/O error on dev zd0, logical block 1048588, lost async page write[0m
[0;31mBuffer I/O error on dev zd0, logical block 1048589, lost async page write[0m
[0;31mBuffer I/O error on dev zd0, logical block 1466067, lost async page write[0m
[0;31mBuffer I/O error on dev zd0, logical block 1505175, lost async page write[0m
[0;33mEXT4-fs warning (device zd0): [0;1mext4_end_bio:343: I/O error 3 writing to inode 2883634 starting block 24493838)[0m
[0;33mEXT4-fs error (device zd0): [0;31;1mext4_check_bdev_write_error:217: comm VM Periodic Tas: Error while async write back metadata[0m
[0;33mEXT4-fs warning (device zd0): [0;1mext4_end_bio:343: I/O error 3 writing to inode 2883634 starting block 24493839)[0m
[0;31mAborting journal on device zd0-8.[0m
[0;33mEXT4-fs error (device zd0) in ext4_convert_unwritten_io_end_vec:4859: [0;31;1mIO failure[0m
[0;33mEXT4-fs (zd0): [0mfailed to convert unwritten extents to written extents -- potential data loss!  (inode 2883634, error -5)
[0;33mJBD2: [0;31mI/O error when updating journal superblock for zd0-8.[0m
[0;33mEXT4-fs error (device zd0): [0;31;1mext4_journal_check_start:83: comm k3s-server: Detected aborted journal[0m
[0;33mEXT4-fs (zd0): [0;31mprevious I/O error to superblock detected[0m
[0;33mEXT4-fs error (device zd0): [0;31;1mext4_journal_check_start:83: comm http-nio-8080-P: Detected aborted journal[0m
[0;33mEXT4-fs (zd0): [0;31mI/O error while writing superblock[0m
[0;33mEXT4-fs (zd0): [0;31;1mRemounting filesystem read-only[0m
[0;33mEXT4-fs (zd0): [0;31mI/O error while writing superblock
```

- 停止服务自动启动
- reboot
- fsck

```bash
umount /dev/zd0
fsck -y /dev/zd0
mount -a

# ensure mount point working as expected
touch /data/docker/test

# start service
```

## zfs destory container snapshots

```bash
zfs list > zfs.txt
# main/1poezhz45yv210xqwve9vft0d
grep -E '^main/\w{25}\W' zfs.txt | cut -f 1 -d ' ' | xargs -n 1 sudo zfs destroy -r -R
```

## Feature Flags

```bash
zpool get all | grep feature@
zpool upgrade -v
```

```
async_destroy                         (read-only compatible)
     Destroy filesystems asynchronously.
empty_bpobj                           (read-only compatible)
     Snapshots use less space.
lz4_compress
     LZ4 compression algorithm support.
multi_vdev_crash_dump
     Crash dumps to multiple vdev pools.
spacemap_histogram                    (read-only compatible)
     Spacemaps maintain space histograms.
enabled_txg                           (read-only compatible)
     Record txg at which a feature is enabled
hole_birth
     Retain hole birth txg for more precise zfs send
extensible_dataset
     Enhanced dataset functionality, used by other features.
embedded_data
     Blocks which compress very well use even less space.
bookmarks                             (read-only compatible)
     "zfs bookmark" command
filesystem_limits                     (read-only compatible)
     Filesystem and snapshot limits.
large_blocks
     Support for blocks larger than 128KB.
large_dnode
     Variable on-disk size of dnodes.
sha512
     SHA-512/256 hash algorithm.
skein
     Skein hash algorithm.
edonr
     Edon-R hash algorithm.
userobj_accounting                    (read-only compatible)
     User/Group object accounting.
encryption
     Support for dataset level encryption
project_quota                         (read-only compatible)
     space/object accounting based on project ID.
device_removal
     Top-level vdevs can be removed, reducing logical pool size.
obsolete_counts                       (read-only compatible)
     Reduce memory used by removed devices when their blocks are freed or remapped.
zpool_checkpoint                      (read-only compatible)
     Pool state can be checkpointed, allowing rewind later.
spacemap_v2                           (read-only compatible)
     Space maps representing large segments are more efficient.
allocation_classes                    (read-only compatible)
     Support for separate allocation classes.
resilver_defer                        (read-only compatible)
     Support for deferring new resilvers when one is already running.
bookmark_v2
     Support for larger bookmarks
redaction_bookmarks
     Support for bookmarks which store redaction lists for zfs redacted send/recv.
redacted_datasets
     Support for redacted datasets, produced by receiving a redacted zfs send stream.
bookmark_written
     Additional accounting, enabling the written#<bookmark> property (space written since a bookmark), and estimates of send stream sizes for incrementals from bookmarks.
log_spacemap                          (read-only compatible)
     Log metaslab changes on a single spacemap and flush them periodically.
livelist                              (read-only compatible)
     Improved clone deletion performance.
device_rebuild                        (read-only compatible)
     Support for sequential mirror/dRAID device rebuilds
zstd_compress
     zstd compression algorithm support.
draid
     Support for distributed spare RAID
zilsaxattr                            (read-only compatible)
     Support for xattr=sa extended attribute logging in ZIL.
head_errlog
     Support for per-dataset on-disk error logs.
blake3
     BLAKE3 hash algorithm.
block_cloning                         (read-only compatible)
     Support for block cloning via Block Reference Table.
vdev_zaps_v2
     Support for root vdev ZAP.
```
