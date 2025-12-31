---
title: Linux Loop 设备 (Loop Device)
tags:
  - Linux
  - Device
  - Loop
---

# Linux Loop 设备 (Loop Device) {#loop-device}

Loop 设备、vnconfig (vnode disk) 或 lofi (loop file interface) 是一种伪设备，使文件可以像块设备一样被访问。

- [Loop device - Wikipedia](https://en.wikipedia.org/wiki/Loop_device)
- [losetup(8) - Linux man page](https://linux.die.net/man/8/losetup)

## 基本操作 (Basic Operations) {#basic-operations}

```bash
# 检查模块
ls /sys/module/loop
modprobe loop
```

```bash
# 使用 losetup
losetup /dev/loop0 example.img
mount /dev/loop0 /home/you/dir

# 自动查找空闲设备
losetup -f

# 挂载并设置偏移量
mount -o loop,offset=$((137216 * 512)) /images/2016-09-23-raspbian-jessie-lite.img /mnt

# 扫描分区
losetup --partscan --show --find "${OUTPUT_IMG}"
```

```bash
# 卸载
umount /home/you/dir
# 卸载 loop 设备
# 可以通过 mount | grep "/home/you/dir" 或 losetup -a | grep example.img 查找
umount /dev/loop<N>
```

### Docker 中使用 Loop 设备

```bash
docker run --rm -it --cap-add CAP_MKNOD --device-cgroup-rule="b 7:* rmw" -v "$PWD":/build -w /build wener/base
```

### 安装工具

```bash
apk add util-linux
```
