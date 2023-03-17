---
title: PostgreSQL & ZFS
tags:
  - PostgreSQL
  - Tuning
---

# PostgreSQL & ZFS

- 为什么？
  - 利用 ZFS 存储特性 - 快照、恢复、克隆、压缩、一致
- PostgreSQL 配置
  - full_page_writes
  - random_page_cost
  - effective_io_concurrency
- 参考
  - [postgresql-zfs-best-practices](https://www.slideshare.net/SeanChittenden/postgresql-zfs-best-practices)
  - [PostgreSQL optimize](https://gist.github.com/artizirk/e144065165b07dff1accc608c7e83f5a)
  - [Tuning ZFS + Postgres to outperform EXT4 + Postgres](https://gist.github.com/saurabhnanda/5258207935bf23cd112be292d22f00d5)

```bash
zfs create -o mountpoint=/data/ns/data-system/postgres \
  -o atime=off \
  -o primarycache=metadata \
  -o recordsize=16k \
  data/kube/data-system-postgres
```

**postgresql.conf**

```ini
# ZFS 总是一致的 - 2倍性能
full_page_writes=false

# ZFS 参考
random_page_cost = 1
effective_io_concurrency = 20

# pgtune https://pgtune.leopard.in.ua/
# SSD
random_page_cost = 1.1
effective_io_concurrency = 200
# HDD
random_page_cost = 4
effective_io_concurrency = 2
```

**zfs**

```ini
atime = off
relatime = on
# 2.0 后可以使用 zstd
# CPU 时间换 IO 时间
compression = lz4
# db 默认 8k, 但压缩率低
recordsize = 128K
# 只缓存元数据 - 避免双份数据缓存
primarycache = metadata
```

## 异步提交

- 接受异常丢失部分数据
- 换取 **20 倍** 的性能
- 适用于 数仓场景或大量写入场景

```bash
# 1s 超时, 最多丢失 1s 数据
echo 1 > /sys/module/zfs/parameters/zfs_txg_timeout
echo 'options zfs zfs_txg_timeout=1' >> /etc/modprobe.d/zfs.conf
```

**zfs**

```ini
logbias=throughput
```

**pg**

```ini
# 关闭同步提交
synchronous_commit = off
```
