---
title: MIPS 架构
tags:
  - Architecture
  - CPU
  - Embedded
---

# MIPS

- MIPS - Microprocessor without Interlocked Pipelined Stages
- RISC 精简指令集架构
- 常见于嵌入式设备：路由器、IoT 设备、网络设备

## 架构变种

| 架构      | 位宽  | 字节序     | 说明                     |
| --------- | ----- | ---------- | ------------------------ |
| mips      | 32bit | Big Endian | 标准 MIPS                |
| mipsel    | 32bit | Little     | MIPS Little Endian       |
| mips64    | 64bit | Big Endian | 64 位 MIPS               |
| mips64el  | 64bit | Little     | 64 位 Little Endian      |

## 常见设备

- 路由器: UBNT EdgeRouter, TP-Link, OpenWrt 设备
- 游戏机: PlayStation 1/2, Nintendo 64, PSP
- 网络设备: Cavium Octeon 系列

## QEMU 模拟

```bash
# 用户态模拟
qemu-mips ./program          # 运行 MIPS 程序
qemu-mipsel ./program        # 运行 MIPS LE 程序

# 系统模拟 - Malta 开发板
qemu-system-mips -M malta \
  -kernel vmlinux-4kc-malta \
  -hda disk.qcow2 \
  -m 512 \
  -append "root=/dev/sda1 console=tty0"
```

## binfmt_misc

通过 binfmt_misc 实现透明执行 MIPS 二进制：

```bash
# 加载模块
modprobe binfmt_misc
mount binfmt_misc -t binfmt_misc /proc/sys/fs/binfmt_misc

# 注册 MIPS 处理器
magic='\x7fELF\x01\x02\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x02\x00\x08'
mask='\xff\xff\xff\xff\xff\xff\xff\x00\xff\xff\xff\xff\xff\xff\xff\xff\xff\xfe\xff\xff'
echo ":qemu-mips:M::$magic:$mask:/usr/bin/qemu-mips:OC" > /proc/sys/fs/binfmt_misc/register

# Alpine 使用 qemu-openrc
apk add qemu-openrc
rc-service qemu-binfmt start
```

## chroot 到 MIPS rootfs

```bash
# 准备 rootfs
mkdir rootfs && cd rootfs
tar xf debian-mips-rootfs.tar.gz

# 复制静态链接的 qemu
cp $(which qemu-mips-static) ./usr/bin/

# 挂载必要文件系统
mount --bind /dev dev
mount --bind /proc proc
mount --bind /sys sys

# chroot
chroot . /usr/bin/qemu-mips-static /bin/bash
```

## 参考

- [Debian MIPS Port](https://www.debian.org/ports/mips/)
- [QEMU MIPS Documentation](https://wiki.qemu.org/Documentation/Platforms/MIPS)
- [binfmt_misc](https://en.wikipedia.org/wiki/Binfmt_misc)
- [qemu-user-static](https://github.com/multiarch/qemu-user-static)
