---
title: bcachefs
---

# bcachefs

- [bcachefs](https://bcachefs.org) - [koverstreet/bcachefs](https://github.com/koverstreet/bcachefs)
  - 对标 zfs btrfs
  - COW
  - 支持 加密 - AEAD - ChaCha20, Poly1305
  - 支持 压缩 - LZ4, gzip, ZSTD
  - 支持 快照
  - 支持 CRC32 checksum
  - 支持使用 多 block device
  - Tiering/writeback caching
  - 支持 副本 - RAID 1/10
  - Erasure coding
- Bcache - a block-layer cache system for Linux
  - bcachefs 使用了 Bcache 80% 源码

:::caution

- 非常新 - 尚不成熟
- 目前尚未 包含在 内核

:::

```bash
bcachefs format /dev/sda
mount -t bcachefs /dev/sda /mnt

# RAID 0/1
bcachefs format /dev/sda /dev/sdb --replicas=n
mount -t bcachefs /dev/sda1:/dev/sdb1 /mnt

# RAID 0/1 + SSD 缓存
bcachefs format \
    --group=ssd /dev/sda /dev/sdb
    --group=hdd /dev/sdc /dev/sdd /dev/sde /dev/sdf \
    --data_replicas=1 --metadata_replicas=2 \
    --foreground_target=ssd \
    --background_target=hdd \
    --promote_target=ssd
mount -t bcachefs /dev/sda:/dev/sdb:/dev/sdc:/dev/sdd/dev/sde:/dev/sdf /mnt
```
