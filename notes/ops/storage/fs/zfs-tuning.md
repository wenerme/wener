---
title: ZFS 调优
---

# ZFS Tuning

:::tip 目的

- 提升应用性能
- 提升 读
- 提升 写
- 提升 空间使用率

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
