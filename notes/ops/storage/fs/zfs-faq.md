---
title: ZFS 常见问题
tags:
  - FAQ
---

# ZFS 常见问题

## dRAID - Distributed RAID

- OpenZFS 2.1+
- dRAID 区别于之前的 RAIDz 方式处理备盘
  - 之前是物理备盘，现在是逻辑备盘
  - 没有备盘概念，有容灾能力
    - 备盘 - 冷备份
    - 容灾 - 从异常恢复
  - 位置动态分配 - 传统 RAID 盘位角色固定
  - 适用于大规模存储，小规模建议使用传统 RAIDz
  - group into rows - 16MB
  - 实现基于 RAIDz，但 allocate 方式有区别
- dRAID 相当于是在一组数据里增加了一个 strip 作为备用打散到所有盘
- 格式 `draid[<parity>][:<data>d][:<children>c][:<spares>s]`
  - parity - 1-3, 默认 1
    - 校验数据/主数据
  - data - 每个冗余组的硬盘数量 默认 8
    - 数量小 - IOPS 高，压缩比高，恢复速度快
  - children - 交叉验证磁盘数量，避免磁盘多的时候配置错误
    - 总的磁盘数量
  - spares - 分布式热备数量 - 默认 0
    - 异常快速恢复 - S -> D,P
  - 配置的是每 strip
  - draid1:2:0 -> RAIDz1
  - D+P 为一个组，分布到 C-S 个硬盘中
  - S 为全局 - 所有组共用
- 优势
  - 快速恢复
    - 传统模式的性能瓶颈在于单盘 - 速度慢
    - spare 分散后所有盘都在恢复 - 没有瓶颈
    - dRAID 换盘瓶颈也在 - 但是场景上来说每那么重要
  - 硬盘性能利用率更高
- 劣势
  - fixed strip width - 可能用更多空间，压缩比会低一些
    - draid2:4:1 - 4kn - 24KiB meta
    - draid2:8:1 - 4kn - 40KiB meta
      - 实现了特殊 vdev 空间分配 - 12KiB
    - RAIDz2 - 12KiB
  - 容错性低于传统
    - 例如 9 盘 draid1:2:0 / RAIDz1
      - draid1:2:0 最多只能坏 1 个 - 第二个坏会影响数据 - 没有盘位概念
      - RAIDz1 - 第二个坏可能不影响，只要不在一个分组 - 9 盘 3 分组 - 固定盘位
- 例如 draid1:4d:11c:1s
  - 11 个盘
  - 1p 4d 1s - 每个 strip 使用 5 个盘 + 一个备用
- 参考
  - [module/zfs/vdev_draid.c#L45-L167](https://github.com/openzfs/zfs/blob/c14ad80fcbcfc011686f01a89644eea7c028a879/module/zfs/vdev_draid.c#L45-L167)
  - [dRAID](https://openzfs.github.io/openzfs-docs/Basic%20Concepts/dRAID%20Howto.html)
  - [OpenZFS 2.1 is out—let’s talk about its brand-new dRAID vdevs](https://arstechnica.com/gadgets/2021/07/a-deep-dive-into-openzfs-2-1s-new-distributed-raid-topology/)

:::tip 使用场景

- dRAID 用于磁盘非常多的场景
  - 牺牲一点使用空间换取更快的恢复速度
- vdev >= 20 dRAID
- vdev 10-20 - 酌情
- vdev <= 8 选择 RAIDz

:::

## Expansion

- [Raid-Z Expansion](https://www.youtube.com/watch?v=yF2KgQGmUic)

**传统 RAID 4/5/6**

| sda | sdb | sdc | sdd  |
| --- | --- | --- | ---- |
| 1   | 2   | 3   | P1-3 |
| 4   | 5   | 6   | P4-6 |

| sda | sdb | sdc | sdd | sde  |
| --- | --- | --- | --- | ---- |
| 1   | 2   | 3   | 4   | P1-4 |
| 5   | 6   | 7   | 8   | P5-8 |

- P - parity group - strip
- 分组变化

**RAID-Z expansion: reflow**

| sda | sdb | sdc | sdd |
| --- | --- | --- | --- |
| 1P  | 2   | 3   | 4   |
| 5P  | 6   | 7   | 8   |
| 9P  | 10  | 11  | 12  |

| sda | sdb | sdc | sdd | sde |
| --- | --- | --- | --- | --- |
| 1P  | 2   | 3   | 4   | 5P  |
| 6   | 7   | 8   | 9P  | 10  |

- P - parity group - logical strip
- 分组没变 - 容灾能力没变
- 不修改 block 指针
- 顺序读写
- strip 独立
- parity group 迁移时会确保之前数据不被覆盖 - 避免迁移过程异常，丢失数据
- 迁移过程慢 - 因为全部数据都会动

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
