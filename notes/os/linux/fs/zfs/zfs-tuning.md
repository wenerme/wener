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
    - 一般 16G 或 64G 足矣
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
zfs send dataset >/dev/null

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
