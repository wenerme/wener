---
title: ZFS 常见问题
tags:
  - FAQ
---

# ZFS 常见问题

:::tip

- renameat2/overlayfs ZFS v2.2+
  - [zfs_rename: support RENAME\_ flags](https://github.com/openzfs/zfs/commit/dbf6108b4df92341eea40d0b41792ac16eabc514)

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
zfs get all | egrep 'used\b|logicalused|compression|\bcompress'
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

## zvol vs zfs

- zvol - 块设备
  - raidz、压缩
  - 没有所有 zfs 伴随的能力
- zfs - 文件系统 - dataset
  - 快照、克隆
  - 文件系统有一定特性 - 也有缺陷
    - ~~主要缺陷: 不支持 rename2/overlay~~ - ZFS v2.2+

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
```

```
758

real    0m1.777s
user    0m0.177s
sys     0m1.599s
```

- https://github.com/openzfs/zfs/discussions/8898

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
