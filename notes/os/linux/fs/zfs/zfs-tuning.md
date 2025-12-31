---
title: ZFS 调优
---

# ZFS Tuning

:::tip 目的

- 提升 应用性能 - 针对工作负载调优 - recordsize，logbias、sync=off
- 提升 读 - cache、内存
- 提升 写 - slog、zfs_txg_timeout
- 提升 空间使用率 - 压缩、recordsize、draid
- 提升 安全 - 热备、冷备、sync

:::

:::caution

- slog 不是 write buffer

:::

- /proc/spl/kstat/zfs/main/iostats
- /sys/module/zfs/parameters
  - ZFS 内核模块参数

:::tip

- 使用机械盘时，建议配备一个 SSD 分两个区，一个做 SLOG 一个做 L2ARC - 并增加 zfs_txg_timeout
- compressratio 受 recordsize 影响
  - https://github.com/openzfs/zfs/discussions/11293
- 总是开启 compression

:::

| zpool prop | default | recommand   |
| ---------- | ------- | ----------- |
| ashift     | 0       | 12          |
| atime      | on      | off         |
| recordsize | 128K    |
| logbias    | latency |
| autotrim   | off     | SDD 推荐 on |

```bash
zdb | grep ashift # 查看使用的 ashift
```

- ashift
  - 2^n - block size/sector size
  - 匹配底层物理 sector size
  - 0 为自动检测
  - 一般为 12 - 4K

---

- source
  - default
  - temporary
    - 临时挂载点属性 - 会映射到 mount
  - inherited from
  - local
- xattrs=on
  - 存储扩展信息到隐藏目录，访问文件时需要额外 lookup
- xattr=sa
  - 存储扩展信息到 inode

```bash
zfs set compression=lz4 data
zfs set atime=off data
zfs set relatime=on data
zfs set xattr=sa data

# 断电可能丢失一定数据
zfs set sync=disabled POOL

# primarycache=metadata - 看情况
zfs set atime=off relatime=on xattr=sa compression=lz4 sync=disabled POOL

zfs get all POOL | grep -E 'compression|atime|xattr|sync|primarycache|recordsize'
```

## ZIL SLOG

- ZIL - ZFS Intent Log
  - 短期存储
  - ZIL 默认存在于硬盘上的特殊区域 - 产生双写 - 先写 ZIL 在写回到磁盘区域
  - 不会使用 ZIL 的场景
    - logbias=throughput
    - **大块** - 例如： 数据同步时不会用到
  - **只用于系统 crash 恢复**
- SLOG - Separate ZFS Intent Log
  - ZIL 存储于额外的磁盘
  - 替代存储磁盘上的 ZIL - 避免双写
  - **不是写缓存**
  - 用不了多少空间
    - 一般 16G 或 32G 足矣
    - max amount of write traffic per second x 15
    - TXG commit interval - transaction group commit interval - 5s-10s
      - zfs_txg_synctime
      - 增加 事务 延时来增加使用的 slog

:::tip

小的写操作会先聚合重排序，然后一次性写入，此时使用 SLOG 能提升性能

- 避免 write IOPS amplification

**无 SLOG**

- async write -> TXG RAM -> ZPool
- sync write -> TXG RAM & ZIL
- TXG RAM -> ZPool

**有 SLOG**

- sync write -> TXG RAM & SLOG
- 系统恢复时 SLOG -> TXG RAM -> replay TXG -> ZPool

:::

### sync

- sync=standard
  - POSIX-compatible
  - synchronous only if requested
  - 部分情况会写入到 slog
- sync=always
  - 主要保障数据安全
  - 有些不支持 journal 的 DB 必须要 sync
  - slog 很快 可以考虑
  - 会强制先写入到 log 设备 - **不会增加性能**
- sync=disabled - sync=never, sync=off
  - 让写入更快
  - 忽略 O_SYNC

```bash
# txg 提交间隔 - 5秒
cat /sys/module/zfs/parameters/zfs_txg_timeout
# 增加 slog 使用量, 180s 提交一次
echo 180 | sudo tee /sys/module/zfs/parameters/zfs_txg_timeout

# 持久化
echo "options zfs zfs_txg_timeout=180" | sudo tee /etc/modprobe.d/zfs.conf
```

| parameter                      | default | prefer | note                                                                 |
| ------------------------------ | ------- | ------ | -------------------------------------------------------------------- |
| zfs_txg_timeout                | 5       | 120    | 强制提交 Transaction Group (TXG) 的时间间隔,更大的值可以聚合更多数据 |
| ---                            |
| zfs_dirty_data_max             | 10% RAM |
| zfs_dirty_data_max_percent     | 10% RAM |
| zfs_dirty_data_sync_percent    | 20      |        | 达到 zfs_dirty_data_max 比例后出发 sync                              |
| zfs_dirty_data_max_max         | 25% RAM |
| zfs_dirty_data_max_max_percent | 25% RAM |

<!--
vfs.zfs.delay_min_dirty_percent=98 # write throttle when dirty "modified" data reaches 98% of dirty_data_max (default 60%)
vfs.zfs.dirty_data_max=17179869184 # dirty_data can use up to 16GB RAM, equal to dirty_data_max_max (default, 10% of RAM or up to 4GB)
vfs.zfs.dirty_data_sync_pct=95     # force commit Transaction Group (TXG) if dirty_data reaches 95% of dirty_data_max (default 20%, FreeBSD 12.1)
vfs.zfs.min_auto_ashift=13         # newly created pool ashift, set to 12 for 4K and 13 for 8k alignment, zdb (default 9, 512 byte, ashift=9)
vfs.zfs.trim.txg_delay=2           # delay TRIMs by up to this many TXGs, trim.txg_delay * txg.timeout ~= 240 secs (default 32, 32*5secs=160 secs)
vfs.zfs.txg.timeout=120            # force commit Transaction Group (TXG) at 120 secs, increase to aggregated more data (default 5 sec)
vfs.zfs.vdev.def_queue_depth=128   # max number of outstanding I/Os per top-level vdev (default 32)
vfs.zfs.vdev.write_gap_limit=0     # max gap between any two aggregated writes, 0 to minimize frags (default 4096, 4KB)
-->

- https://jrs-s.net/2019/05/02/zfs-sync-async-zil-slog/
- https://www.truenas.com/blog/zfs-zil-and-slog-demystified/

## logbias

- logbias=latency
  - 无 SLOG，block 较大能提升性能
- logbias=throughput
  - 小 block 写入产生非常多碎片

```bash
zfs send dataset > /dev/null

zpool iostat -r 1
```

- https://bun.uptrace.dev/postgres/tuning-zfs-aws-ebs.html#logbias

## ashift

| ashift | sector |
| -----: | -----: |
|      9 |  512 B |
|     10 |   1 KB |
|     11 |   2 KB |
|     12 |   4 KB |
|     13 |   8 KB |
|     14 |  16 KB |

- 12=4KB - 常用的 PageSize

## L2ARC

- 读缓存
- ARC 为内存
- L2ARC 为 cache 设备
- 之前是覆盖写
- 目前支持 TRIM - https://github.com/zfsonlinux/zfs/pull/9789
  - l2arc_trim_ahead - 需要时多 trim 多少

```bash
# 可查看 SSD trim 支持情况
zpool status -t
# 触发 pool
zpool trim pool
```

## 磁盘信息

```bash
# sector size
# phy sector size
blockdev --getss --getpbsz /dev/sda

cat /sys/block/sd{a,b}/queue/{logical_block_size,physical_block_size,optimal_io_size}
```

- [bradfa/flashbench](https://github.com/bradfa/flashbench)
  - 检测闪存的 block size

## atime on temporary

atime 总是为 on

## zfs_vdev_mirror_rotating_inc

- mirror ssd + hdd
  - 保留读性能
  - 写性能无法保障

## SSD TRIM

- `zpool set autotrim=on` + cron `zpool trim`
- https://github.com/openzfs/zfs/commit/1b939560be5c51deecf875af9dada9d094633bf7
- https://openzfs.github.io/openzfs-docs/man/8/zpool-trim.8.html

## 参考

- [How the ZFS Adaptive Replacement Cache works](https://www.youtube.com/watch?v=1Wo3i2gkAIk)
  - **Free RAM is wasted RAM**
  - ARC 维护 LRU,LFU
  - 缓存 fs 和 metadata - metadata 默认 25% cache
  - Compress ARC - 存储更多缓存
  - block - 512b - 16MB
  - 基于内存压力调整使用的缓存量 - adaptive
  - tuning
    - file server - 大 ARC, 缓存更多 metadata, 可考虑 L2ARC
    - block storage/iSCSI - 大 ARC, 配置 volblocksize
    - Database/A - 小 ARC, 只缓存 metadata, large db buffer cache
    - Database/B - 中 ARC, 只缓存 metadata, small db buffer cache, compression 能让 ARC 命中更多缓存
    - Hypervisor - 中小 ARC, 为 VM 预留内存, 避免双缓存
- [Workload Tuning](https://openzfs.github.io/openzfs-docs/Performance%20and%20Tuning/Workload%20Tuning.html)
  - PosstgreSQL - [Everything I've seen on optimizing Postgres on ZFS](https://vadosware.io/post/everything-ive-seen-on-optimizing-postgres-on-zfs-on-linux/)
    - recordsize=8K
    - logbias=throughput
  - MySQL InnoDB
    - recordsize=16K
    - primarycache=metadata
    - logbias=throughput
    - my.cnf
      - skip-innodb_doublewrite
      - innodb_use_native_aio=0
      - innodb_use_atomic_writes=0
- [ZFS RAIDZ stripe width, or: How I Learned to Stop Worrying and Love RAIDZ](https://www.delphix.com/blog/delphix-engineering/zfs-raidz-stripe-width-or-how-i-learned-stop-worrying-and-love-raidz)
- [ZFS – How to Extend ZPOOL and Re-layout ?](https://www.unixarena.com/2013/07/zfs-how-to-extend-zpool-and-re-layout.html)
- [ZFS Terminology](https://docs.oracle.com/cd/E23824_01/html/821-1448/ftyue.html)
- [ZFS overhead calc.xlsx](https://docs.google.com/spreadsheets/d/1pdu_X2tR4ztF6_HLtJ-Dc4ZcwUdt6fkCjpnXxAEFlyA)
- [Tuning ZFS recordsize](https://blogs.oracle.com/roch/tuning-zfs-recordsize)
- [Module Parameters](https://openzfs.github.io/openzfs-docs/Performance%20and%20Tuning/Module%20Parameters.html)
- https://calomel.org/freebsd_network_tuning.html
- https://docs.freebsd.org/en/books/handbook/zfs/#zfs-advanced-tuning
  \n## Tuning Reference\n

---

id: zfs-tuning
title: 调优

---

# ZFS Tuning

## RAIDZ

https://serverfault.com/a/1021299/190601

record size 默认 128KiB
Valid options are 512b to 1024KiB in powers of 2.
sector size / ashift = 512/4096
zfs set recordsize=64k mypool/myfs

ARC Adaptive Replacement Cache

cat /proc/spl/kstat/zfs/arcstats
c 目标 arc
c_max 最大 arc
size 当前 arc

modprobe zfs zfs_arc_max=N
/sys/module/zfs/parameters/zfs_arc_max

awk '/^size/ { print $1 " " $3 / 1048576 }' < /proc/spl/kstat/zfs/arcstats

https://superuser.com/a/1137417/242730
https://github.com/openzfs/zfs/blob/384328e544b1847236a07df231e1b7b10e4cc6ce/cmd/arc_summary/arc_summary.py

- [Performance tuning](http://open-zfs.org/wiki/Performance_tuning)
  https://docs.oracle.com/cd/E18752_01/html/819-5461/ftyue.html

| 属性       | 默认 | 说明                                                                                         |
| ---------- | ---- | -------------------------------------------------------------------------------------------- |
| recordsize | 128K | 内部 COW 的基本单位, 可选值 x^2 can be set to any power of 2 from 512 bytes to 128 kilobytes |

zdb

### recordsize

内部 COW 的基本单位
可选值 x^2
对新的文件生效

ZFS: Performance and Capacity Impact of Ashift=9 on 4K Sector Drives
http://louwrentius.com/zfs-performance-and-capacity-impact-of-ashift9-on-4k-sector-drives.html

ZAP (ZFS Attribute Processor)

basic unit of data used for internal copy-on-write on files

read from either ARC (cheap) or disk (expensive)

- https://wiki.freebsd.org/ZFSTuningGuide
- http://fibrevillage.com/storage/171-zfs-on-linux-performance-tuning

Introducing ZFS Properties
https://docs.oracle.com/cd/E53394_01/html/E54801/gazss.html

```bash
# 设置和查看 dedup
# 开启 dedup 后只对新写入的数据有效
zfs set dedup=on main
zfs get dedup main
# Simulated DDT histogram
# 模拟使用 dedup 会带来的好处
zdb -S main

# 获取 pool 的 dedup 率
zpool get dedupratio main
# 查看 dedup 状态
# Total allocated blocks 实际使用大小 Total referenced blocks 去重前的大小
# 内存占用 DDT entries 2530438, size 682B on disk, 151B in core = 2530438*151/1024/1024 = 364m
zpool status -D main
#  dedup: DDT entries 2530438, size 682B on disk, 151B in core
#
# bucket              allocated                       referenced
# ______   ______________________________   ______________________________
# refcnt   blocks   LSIZE   PSIZE   DSIZE   blocks   LSIZE   PSIZE   DSIZE
# ------   ------   -----   -----   -----   ------   -----   -----   -----
#      1    2.37M    285G    276G    276G    2.37M    285G    276G    276G
#      2    42.5K   5.30G   5.18G   5.18G    92.5K   11.5G   11.3G   11.3G
#      4    2.01K    255M    239M    239M    8.89K   1.10G   1.04G   1.04G
#      8      444   55.5M   54.1M   54.0M    4.74K    606M    594M    594M
#     16      108   13.5M   13.5M   13.5M    2.21K    282M    282M    282M
#  Total    2.41M    290G    281G    282G    2.47M    298G    289G    289G

# atime - 上次访问时间, 一般不需要, 并且非常影响读性能
zfs set atime=off main
# relatime - atime 的折中方案, 类似于 ext4/xfs atime 语义, 只有在修改时间或更新时间变化时更新 atime, 或者现在的 atime 有 24h 未更新
# 只有在开启 atime 时才会生效
zfs set atime=on relatime=on main

# compression - 压缩, 默认 lz4, 可选值 on, off, zstd, lzjb, lz4, gzip, gzip-N
# 目前设置为 lzjb, gzip, or gzip-N 等同于设置为 on
# 属性可缩写为 compress
# 设置压缩后只对新的数据有影响
zfs set compression=lz4 main
# 只读属性, 获取当前的压缩率
zfs get compressratio main

# logbias - 控制 zfs 如何优化同步请求, 默认 latency
# latency 以优化延迟为主, 使用额外的日志设备来处理
# throughput 不会使用额外的日志设备
# 在没有 log 设备时, 默认会在 pool 上预留部分空间用于存储 ZIL, zfs 使用 ZIL 用于崩溃恢复
zfs set logbias=all main
# 但数据库一般都会直接做同步操作, 开启该功能相当于对磁盘进行两次提交, 影响性能
# 在非数据库文件系统和一级配置了 log 设备的文件系统上, 设置这个可能对性能有不好的影响
zfs set logbias=throughput main/postgres

# recordsize - 推荐块大小, 默认情况下, 使用默认值即可, 默认 128KiB
# 可使用缩写  recsize
# 该属性主要针对数据库设计, 每次访问文件都是固定大小. ZFS 会根据内部算法自动调整块大小, 数据库会创建比较大的文件, 但每次访问都是非常小的随机块.
# 但针对数据库, 建议使用数据库记录大小, 大多数关系型数据库都是 8K 的块
zfs set recordsize=8K main/postgres
zfs get recordsize main/archive

# primarycache - 控制什么会被缓存在主要缓存中 ARC, 默认 all 可选值 all, none, metadata
# 一般数据库都会用自己的方式实现缓存, 因此没有必要让 zfs 再缓存数据
zfs set primarycache=metadata main/postgres

# secondarycache - 控制什么会进入到二级缓存 L2ARC, 默认 all, 可选值  all, none, metadata
zfs get secondarycache main

# type - 只读, 获取数据集类型 filesystem, volume, 或 snapshot.
zfs get type main
# used - 只读, 获取已使用空间
zfs get used main
# available - 只读, 可用空间
zfs get available main
# creation - 只读, 创建时间
zfs get creation main
# mounted - 只读, 是否已经挂载
# mountpoint - 挂载点
# quota - 限额
# readonly - 是否只读

# version - 只读, 磁盘文件系统版本, 独立于 pool 版本
zfs get version main
# xattr - 是否启用扩展属性
zfs get xattr main

# 所有配置参数
# ======
zfs get all p1
# NAME  PROPERTY              VALUE           SOURCE
# p1    type                  filesystem      -
# p1    creation              1507714508      -
# p1    used                  400K            -
# p1    available             138M            -
# p1    referenced            128K            -
# p1    compressratio         1.00x           -
# p1    mounted               yes             -
# p1    quota                 none            default
# p1    reservation           none            default
# p1    recordsize            128K            default
# p1    mountpoint            /mnt/data       local
# p1    sharenfs              off             default
# p1    checksum              on              default
# p1    compression           off             default
# p1    atime                 on              default
# p1    devices               on              default
# p1    exec                  on              default
# p1    setuid                on              default
# p1    readonly              off             default
# p1    zoned                 off             default
# p1    snapdir               hidden          default
# p1    aclinherit            restricted      default
# p1    canmount              on              default
# p1    xattr                 on              default
# p1    copies                1               default
# p1    version               5               -
# p1    utf8only              off             -
# p1    normalization         none            -
# p1    casesensitivity       sensitive       -
# p1    vscan                 off             default
# p1    nbmand                off             default
# p1    sharesmb              off             default
# p1    refquota              none            default
# p1    refreservation        none            default
# p1    primarycache          all             default
# p1    secondarycache        all             default
# p1    usedbysnapshots       0               -
# p1    usedbydataset         128K            -
# p1    usedbychildren        272K            -
# p1    usedbyrefreservation  0               -
# p1    logbias               latency         default
# p1    dedup                 off             default
# p1    mlslabel              none            default
# p1    sync                  standard        default
# p1    refcompressratio      1.00x           -
# p1    written               128K            -
# p1    logicalused           92.5K           -
# p1    logicalreferenced     40K             -
# p1    filesystem_limit      none            default
# p1    snapshot_limit        none            default
# p1    filesystem_count      none            default
# p1    snapshot_count        none            default
# p1    snapdev               hidden          default
# p1    acltype               off             default
# p1    context               none            default
# p1    fscontext             none            default
# p1    defcontext            none            default
# p1    rootcontext           none            default
# p1    relatime              off             default
# p1    redundant_metadata    all             default
# p1    overlay               off             default
```

## Tuning

- [#9375](https://github.com/openzfs/zfs/issues/9375) - Subpar performance of RAIDZ, reads are slower than writes
- [模块参数](https://openzfs.github.io/openzfs-docs/Performance%20and%20Tuning/ZFS%20on%20Linux%20Module%20Parameters.html)
- [zfs.8](https://openzfs.github.io/openzfs-docs/man/8/zfs.8.html)
- [zfsprops.8](https://openzfs.github.io/openzfs-docs/man/8/zfsprops.8.html)
- [zpoolprops.8](https://openzfs.github.io/openzfs-docs/man/8/zpoolprops.8.html)

zpool get -o all all main | egrep 'ashift'
zfs get all main/data | egrep 'ashift|relatime|canmount|compression|xattr|dnodesize|acltype|normalization'

ashift=12
relatime=on
canmount=off
compression=lz4
xattr=sa
dnodesize=auto
acltype=posixacl
normalization=formD

```bash
# https://jrs-s.net/2018/03/13/zvol-vs-qcow2-with-kvm/
# 4k 随机
# randread - 随机读
fio --name=random-write --ioengine=sync --iodepth=4 \
  --rw=randwrite --bs=4k --direct=0 --size=256m --numjobs=2 \
  --end_fsync=1
```

## RESULT

### raidz1 randwrite 4k x 2

```bash
fio --name=random-write --ioengine=sync --iodepth=4 \
  --rw=randwrite --bs=4k --direct=0 --size=256m --numjobs=2 \
  --end_fsync=1
```

```
Jobs: 1 (f=1): [F(1),_(1)][100.0%][w=232MiB/s][w=59.5k IOPS][eta 00m:00s]
random-write: (groupid=0, jobs=1): err= 0: pid=27959: Thu Jul 16 00:22:03 2020
  write: IOPS=2338, BW=9353KiB/s (9578kB/s)(256MiB/28027msec); 0 zone resets
    clat (usec): min=4, max=495041, avg=415.40, stdev=4703.61
     lat (usec): min=4, max=495042, avg=415.48, stdev=4703.63
    clat percentiles (usec):
     |  1.00th=[     5],  5.00th=[     5], 10.00th=[     5], 20.00th=[     6],
     | 30.00th=[     6], 40.00th=[     6], 50.00th=[     6], 60.00th=[     6],
     | 70.00th=[     6], 80.00th=[     7], 90.00th=[    12], 95.00th=[    54],
     | 99.00th=[ 13042], 99.50th=[ 20841], 99.90th=[ 67634], 99.95th=[ 82314],
     | 99.99th=[149947]
   bw (  KiB/s): min=   71, max=14744, per=4.02%, avg=751.23, stdev=2173.43, samples=47
   iops        : min=   17, max= 3686, avg=187.70, stdev=543.36, samples=47
  lat (usec)   : 10=89.76%, 20=2.80%, 50=2.36%, 100=2.50%, 250=0.21%
  lat (usec)   : 500=0.23%, 750=0.02%, 1000=0.01%
  lat (msec)   : 2=0.03%, 4=0.09%, 10=0.81%, 20=0.65%, 50=0.38%
  lat (msec)   : 100=0.12%, 250=0.04%, 500=0.01%
  cpu          : usr=0.33%, sys=3.28%, ctx=2037, majf=0, minf=13
  IO depths    : 1=100.0%, 2=0.0%, 4=0.0%, 8=0.0%, 16=0.0%, 32=0.0%, >=64=0.0%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     issued rwts: total=0,65536,0,0 short=0,0,0,0 dropped=0,0,0,0
     latency   : target=0, window=0, percentile=100.00%, depth=4
random-write: (groupid=0, jobs=1): err= 0: pid=27960: Thu Jul 16 00:22:03 2020
  write: IOPS=3768, BW=14.7MiB/s (15.4MB/s)(256MiB/17392msec); 0 zone resets
    clat (usec): min=4, max=122329, avg=253.68, stdev=2705.38
     lat (usec): min=4, max=122329, avg=253.78, stdev=2705.40
    clat percentiles (usec):
     |  1.00th=[    5],  5.00th=[    5], 10.00th=[    5], 20.00th=[    6],
     | 30.00th=[    6], 40.00th=[    6], 50.00th=[    6], 60.00th=[    6],
     | 70.00th=[    7], 80.00th=[   15], 90.00th=[   20], 95.00th=[   57],
     | 99.00th=[10159], 99.50th=[18220], 99.90th=[39584], 99.95th=[52167],
     | 99.99th=[82314]
   bw (  KiB/s): min=  312, max=209976, per=45.19%, avg=8454.06, stdev=36298.89, samples=33
   iops        : min=   78, max=52494, avg=2113.52, stdev=9074.72, samples=33
  lat (usec)   : 10=78.23%, 20=13.08%, 50=2.80%, 100=4.46%, 250=0.05%
  lat (usec)   : 500=0.18%, 750=0.01%, 1000=0.01%
  lat (msec)   : 2=0.01%, 4=0.01%, 10=0.16%, 20=0.59%, 50=0.37%
  lat (msec)   : 100=0.05%, 250=0.01%
  cpu          : usr=0.65%, sys=5.59%, ctx=1290, majf=0, minf=12
  IO depths    : 1=100.0%, 2=0.0%, 4=0.0%, 8=0.0%, 16=0.0%, 32=0.0%, >=64=0.0%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     issued rwts: total=0,65536,0,0 short=0,0,0,0 dropped=0,0,0,0
     latency   : target=0, window=0, percentile=100.00%, depth=4

Run status group 0 (all jobs):
  WRITE: bw=18.3MiB/s (19.2MB/s), 9353KiB/s-14.7MiB/s (9578kB/s-15.4MB/s), io=512MiB (537MB), run=17392-28027msec
```

### raidz1 seqwrite 512k x 2

```bash
fio --name=seq-write --ioengine=libaio --iodepth=4 \
  --rw=seqread --bs=4k --direct=0 --size=256m --numjobs=2 \
  --end_fsync=1
```

https://superuser.com/questions/1137416/how-can-i-determine-the-current-size-of-the-arc-in-zfs-and-how-does-the-arc-rel
https://www.unixarena.com/2013/07/zfs-zpool-cache-and-log-devices.html/

缓存使用情况
zpool iostat -v

ZFS Caches:
ZFS Caching mechanisms will also use LRU (Least Recently Used) caching algorithm which is used processor caching technology. ZFS has two type of caches.1.ZFS ARC 2.ZFS L2ARC

ZFS ARC:
ZFS Adjustable Replacement Cache will typically occupy 7/8 of available physical memory and this memory will be released for applications whenever required, ZFS ARC will adjust the memory usage according to the kernel needs.

ZFS L2ARC:
ZFS L2ARC is level 2 adjustable replacement cache and normally L2ARC resides on fastest LUNS or SSD.L2ARC Cache devices provide an additional layer of caching between main memory and disk.It increases the great performance of random-read workloads of static content.Here we will see how to setup L2ARC on physical disks.

https://www.servethehome.com/zfs-on-ubuntu-create-zfs-pool-with-nvme-l2arc-and-share-via-smb/
