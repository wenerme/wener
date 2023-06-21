---
title: ZFS Ops
---

# ZFS Ops

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

cat << EOF >> my.cnf
skip-innodb_doublewrite
innodb_use_native_aio=0
innodb_use_atomic_writes=0
EOF
```

## Postgres

```bash
zfs create data/postgres
zfs set recordsize=8K logbias=throughput data/postgres
```

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

mkdir -p /var/lib/racher/k3s
mount /dev/zvol/data/kube-vol /var/lib/racher/k3s
echo "/dev/zvol/data/kube-vol /var/lib/racher/k3s ext4 rw,relatime,stripe=4 0 0" | tee -a /etc/fstab
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
