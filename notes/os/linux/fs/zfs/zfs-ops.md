---
title: ZFS Ops
---

# ZFS Ops

```bash
zfs set atime=off relatime=on xattr=sa compression=lz4 data
```

- ARC 默认 50% 内存
  - 可以增加为 70-80%
  - /sys/module/zfs/parameters/zfs_arc_max

## System

```bash
# System
zfs create data/var
zfs create -o mountpoint=/var/log/ data/var/log
zfs create -o mountpoint=/var/lib/kubelet data/var/kubelet
```

## MySQL

```bash
zfs create data/mysql
zfs set recordsize=16K primarycache=metadata logbias=throughput data/mysql
```

```ini title="my.zfs.cnf"
innodb_flush_method         = fsync
innodb_doublewrite          = 0       # ZIL 避免了 crash 问题
innodb_use_native_aio       = 0
innodb_use_atomic_writes    = 0
innodb_checksum_algorithm   = none    # 不需要考虑数据损坏
innodb_log_write_ahead_size = 16384   #=recordsize
innodb_flush_neighbors      = 0       # 传统机械盘适用
```

```ini title="my.ext4.cnf"
innodb_flush_method = O_DIRECT
```

```ini title="my.cnf"
skip-log-bin
innodb_buffer_pool_size=
innodb_flush_log_at_trx_commit = 1 # TPCC reqs.
innodb_log_file_size = 1G
innodb_log_group_home_dir = /var/lib/mysql/log
innodb_flush_neighbors = 0
innodb_fast_shutdown = 2

innodb_read_io_threads      = 10
innodb_write_io_threads     = 10
```

<!--
```ini
zfs_arc_max=2147483648
zfs_async_block_max_blocks=5000
zfs_delete_blocks=1000
```
- ARC=2G

-->

- zfs_prefetch_disable=1
- 临时增加性能
  - MySQL
    - innodb_flush_log_at_trx_commit=0
    - sync_binlog=0.
  - 或 ZFS 层面
    - sync=disabled
- https://github.com/bajrang0789/mysql-zfs
- https://www.percona.com/blog/mysql-zfs-performance-update/
- https://shatteredsilicon.net/mysql-mariadb-innodb-on-zfs/

```bash
cat /sys/block/*/queue/scheduler
```

## Postgres

```bash
zfs create data/postgres
zfs set recordsize=8K logbias=latency data/postgres
```

- logbias=throughput 导致碎片

```ini
full_page_writes=false # ZFS always writes full blocks

random_page_cost = 1
effective_io_concurrency = 200
```

- recordsize
  - 更小 TPS 更高
  - 更大 压缩比更高
- 倾向于使用 ARC 减少 shared_buffers
  - 太小影响写入，减小到不影响写入的时候
- https://vadosware.io/post/everything-ive-seen-on-optimizing-postgres-on-zfs-on-linux/

```ini
# pgtune https://pgtune.leopard.in.ua/
# SSD
random_page_cost = 1.1
effective_io_concurrency = 200
# HDD
random_page_cost = 4
effective_io_concurrency = 2
```

- https://bun.uptrace.dev/postgres/tuning-zfs-aws-ebs.html

# Vol

- -s sparse volume 不保留空间

## Kube Vol

- k3s, k0s
- avoid zfs snapshotter

```bash
zfs create -s -V 200GB data/kube-vol
mkfs.ext4 /dev/zvol/data/kube-vol

# 可以放在其他位置然后修改 data-dir
# mkdir -p /data/k3s
# mount /dev/zvol/data/kube-vol /data/k3s

mkdir -p /var/lib/rancher/k3s
mount /dev/zvol/data/kube-vol /var/lib/rancher/k3s
echo "/dev/zvol/data/kube-vol /var/lib/rancher/k3s ext4 rw,relatime,stripe=4 0 0" | tee -a /etc/fstab
```

## Docker Vol

```bash
zfs create -s -V 200GB data/docker-vol
mkfs.ext4 /dev/zvol/data/docker-vol

# 可以放在其他位置然后修改 data-dir

mkdir -p /var/lib/docker/
mount /dev/zvol/data/docker-vol /var/lib/docker/
echo "/dev/zvol/data/docker-vol /var/lib/docker ext4 rw,relatime,stripe=4 0 0" | tee -a /etc/fstab
```

- https://bigstep.com/blog/zfs-best-practices-and-caveats
