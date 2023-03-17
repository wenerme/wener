---
title: ZFS Awesome
tags:
  - Awesome
---

# ZFS Awesome

- [containerd/zfs](https://github.com/containerd/zfs)
  - containerd ZFS snapshotter
  - containerd 1.1 内置 - 2018-04-24

```bash
zfs create -o mountpoint=/var/lib/containerd/io.containerd.snapshotter.v1.zfs tank/containerd
```

- [kimono-koans/httm](https://github.com/kimono-koans/httm)
  - MPL-2.0, Rust
  - Time Machine-like tool for ZFS/btrfs/nilfs2
  - 文件级别
- [jimsalterjrs/sanoid](https://github.com/jimsalterjrs/sanoid)
  - 快照管理，副本管理
- [ubuntu/zsys](https://github.com/ubuntu/zsys)
  - 项目停止

## Issues

- [moby/moby#41055](https://github.com/moby/moby/issues/41055)
  - Docker zfs driver 有问题
  - 目前可考虑使用 zvol

## Stories

- We saved millions in SSD costs by upgrading our filesystem
  heap.io
  [HN](https://news.ycombinator.com/item?id=29164727)
