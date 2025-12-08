---
tags:
  - Version
---

# OpenZFS Version

| version          | date       | Linux       | FreeBSD           |
| ---------------- | ---------- | ----------- | ----------------- |
| [OpenZFS 2.4]    |
| [OpenZFS 2.3]    | 2025-01-14 | 4.18 - 6.12 | 13.3, 14.0 - 14.2 |
| [OpenZFS 2.2]    | 2023-11-13 |
| [OpenZFS 2.1]    | 2021-07-03 | 3.10+       | 12.2              |
| [OpenZFS 2.0]    | 2020-10-01 | 3.10+       | 12.2              |
| [ZfsOnLinux 0.8] | 2019-05-24 | 2.6.32-5.9  |

:::tip Roadmap

- RAIDz 扩容 [#15022](https://github.com/openzfs/zfs/pull/15022)
- RAIDz 扩容 - 增加容量不增加安全
  - [#12225](https://github.com/openzfs/zfs/pull/12225)
  - [RAID-Z Expansion Feature for ZFS In the Home Stretch](https://freebsdfoundation.org/blog/raid-z-expansion-feature-for-zfs/)
- 支持 renameat2/overlayfs - [#12209](https://github.com/openzfs/zfs/pull/12209)

:::

## OpenZFS 2.4

- Linux: 4.18 - 6.17 kernels

- VDEV Properties
  - 以前是 pool 和 dataset 维度, 现在支持 vdev 维度
  - 例如可以针对 SSD 和 HDD 分别设置不同的属性
- ZStandard (Zstd) Early Abort
  - 如果发现压缩效果不理想会提前中断压缩，节约 CPU
- 支持 user/group/project 设置 quota

## OpenZFS 2.3

- Native OverlayFS
  - Docker 能直接使用 ZFS 不再需要通过 zvol 来使用了
- RAIDZ Expansion
  - 新的 RAID 逻辑
  - `zpool attach POOL raidzP-N NEW_DEVICE`
  - `feature@raidz_expansion`
- Fast Dedup
  - 去重不完全依赖内存 - 减少内存占用
  - Container-based Deduplication
- Direct IO
  - 绕过 ARC 缓存直接进行读写操作
  - O_DIRECT
  - 对 PostgreSQL, MySQL 等数据库有性能提升
- JSON 输出
- Long names - 文件/目录名 1023 字符
  - ZAP_MAXNAMELEN 256 -> 1023

---

- https://github.com/openzfs/zfs/releases/tag/zfs-2.3.0

## OpenZFS 2.2

- renameat(2)
  - 支持容器 - docker、containerd - 以前需要单独做 zvol
  - 支持 overlay
- Block cloning
  - file-level copy-on-write
  - reflinks
  - `cp --reflink=always`
- Scrub Error Only
  - `zpool scrub -e`
  - 只会去扫描和修复它已知有错误的那些块, 不再需要全盘扫描
  - 数据修复时间大幅降低: 几天 -> 几分钟
- BLAKE3 checksum
  - 比 sha256, sha512 更快
- Fully adaptive ARC

---

- https://github.com/openzfs/zfs/releases/tag/zfs-2.2.0

## OpenZFS 2.1

- dRAID
- compatibility 属性
  - 控制 pool 需要什么特性
  - 让 pool 能更好支持跨平台 - BSD, Linux
- `zpool influxdb`
- https://github.com/openzfs/zfs/releases/tag/zfs-2.1.0

## OpenZFS 2.0

- ZfsOnLinux -> OpenZFS
  - 合并 BSD ZFS 和 Linux ZFS 代码
  - Linux ZFS 获得了很多新的功能
  - 后续开发迭代更快
- zstd 压缩
- TRIM, ACLMODE
- NFSv4 ACLs
- AES-GCM 加密
- Direct IO
- **持久化 L2ARC** - 重启后缓存还可用
- scrub pause/resume
- https://github.com/openzfs/zfs/projects/25

## ZfsOnLinux 0.8

- 支持加密 - encryption
  - zfs send/receive -w
    - 发送接收也支持加密
- zpool remove
- zpool trim
  - 可开启 autotrim 后台自动操作
- zpool initialize
- zfs project, zfs projectspace
- zpool program - Lua 脚本管理
