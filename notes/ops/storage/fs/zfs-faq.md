---
title: ZFS 常见问题
---

# ZFS 常见问题

## dRAID - Distributed RAID

- OpenZFS 2.1+
- dRAID 区别于之前的 RAIDz 方式处理备盘
  - 之前是物理备盘，现在是逻辑备盘
  - 没有备盘概念，有备用能力
  - 位置动态分配 - 传统 RAID 盘位角色固定
  - 适用于大规模存储，小规模建议使用传统 RAIDz
- dRAID 相当于是在一组数据里增加了一个 strip 作为备用打散到所有盘
- 格式 `draid[<parity>][:<data>d][:<children>c][:<spares>s]`
  - parity - 1-3, 默认 1
    - 校验数据/主数据
  - data - 每个冗余组的硬盘数量 默认 8
    - 数量小 - IOPS 高，压缩比高，恢复速度快
  - children - 交叉验证磁盘数量，避免磁盘多的时候配置错误
    - 总的磁盘数量
  - spares - 分布式热备数量 - 默认 0
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
