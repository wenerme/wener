---
title: QEMU Storage & Block Devices
tags:
  - Virtualization
  - QEMU
  - Storage
  - iSCSI
  - NBD
---

# QEMU Storage & Block Devices {#qemu-storage}

- [QEMU Block Drivers](https://www.qemu.org/docs/master/system/qemu-block-drivers.html)
- [QEMU Images](https://www.qemu.org/docs/master/system/images.html)
- [NBD - Network Block Device](https://en.wikipedia.org/wiki/Network_block_device) ([GitHub](https://github.com/NetworkBlockDevice/nbd))
- [SLES KVM Cache Modes](https://documentation.suse.com/sles/11-SP4/html/SLES-kvm4zseries/cha-qemu-cachemodes.html)

## Operations

```bash
# Convert Image
qemu-img convert -f parallels original.hds -O raw converted.raw
```

## iSCSI

```bash
# Connect to iSCSI target
qemu-system-x86_64 -iscsi initiator-name=iqn.2001-04.com.example:my-initiator \
  -cdrom iscsi://192.0.2.1/iqn.2001-04.com.example/2 \
  -drive file=iscsi://192.0.2.1/iqn.2001-04.com.example/1
```

## NBD (Network Block Device)

```bash
# Create image
qemu-img create test -F qcow2 test.qcow2

# Export via QEMU Storage Daemon
qemu-storage-daemon \
  --blockdev driver=qcow2,node-name=test,file.filename=test.qcow2,file.locking=off,file.driver=file \
  --nbd-server addr.type=inet,addr.host=0.0.0.0,addr.port=6789 \
  --export nbd,device=test

# Export via qemu-nbd (default port 10809)
qemu-nbd -f qcow2 file.qcow2
```

### NBD Server Options

```bash
--nbd-server addr.type=inet,addr.host=<host>,addr.port=<port>
# Optional TLS
# [,tls-creds=<id>][,tls-authz=<id>]
```
