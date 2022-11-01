---
title: ZFS 调优
---

# ZFS Tuning

:::tip 目的

- 提升应用性能 - 针对工作负载调优
- 提升 读
- 提升 写
- 提升 空间使用率

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
| ashift     | 0       |             |
| atime      | on      | off         |
| recordsize | 128K    |
| logbias    | latency |
| autotrim   | off     | SDD 推荐 on |

```bash
zdb | grep ashift  # 查看使用的 ashift
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

```bash
zfs set compression=lz4 POOL
zfs set atime=off POOL
zfs set xattr=sa POOL

# 断电可能丢失一定数据
zfs set sync=disabled POOL

# primarycache=metadata - 看情况
zfs set atime=off relatime=on xattr=sa sync=disabled POOL

zfs get all POOL | egrep 'compression|atime|xattr|sync|primarycache|recordsize'
```

## ZIL SLOG

- 写缓存
- ZIL - ZFS Intent Log
  - 短期存储
  - ZIL 默认存在于硬盘上的特殊区域 - 产生双写 - 先写 ZIL 在写回到磁盘区域
  - 不会使用 ZIL 的场景
    - logbias=throughput
    - 大块
- SLOG - Separate ZFS Intent Log
  - 存储于额外的磁盘 - 避免双写
  - 用不了多少空间
    - 一般 16G 或 64G 足矣
    - max amount of write traffic per second x 15
    - TXG commit interval - transaction group commit interval - 5s-10s
      - zfs_txg_synctime
      - 增加 事务 延时来增加使用的 slog
- sync=standard - POSIX-compatible - synchronous only if requested
- sync=always

```bash
# txg 提交间隔 - 5秒
cat /sys/module/zfs/parameters/zfs_txg_timeout
# 增加 slog 使用量
echo 180 | sudo tee /sys/module/zfs/parameters/zfs_txg_timeout
```

| parameter                      | default |
| ------------------------------ | ------- | --------------------------------------- |
| zfs_dirty_data_max             | 10% RAM |
| zfs_dirty_data_max_percent     | 10% RAM |
| zfs_dirty_data_sync_percent    | 20      | 达到 zfs_dirty_data_max 比例后出发 sync |
| zfs_dirty_data_max_max         | 25% RAM |
| zfs_dirty_data_max_max_percent | 25% RAM |

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
