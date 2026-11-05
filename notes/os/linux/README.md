---
title: Linux
tags:
  - Topic
---

# Linux

Linux 是一个 Unix-like 操作系统，最初作为 Minix 的扩展实现 [Tanenbaum 1987]，早期版本只支持 Minix 文件系统；Minix 文件系统有两个限制：block 地址用 16 位整数存储（文件系统最大 64 MB），目录项固定大小（文件名最长 14 字符）。

- [FAQ](./linux-faq.md)
- [术语](./linux-glossary.md)
- [Awesome](./linux-awesome.md)
- [版本](./linux-version.md)
- [默认值](./linux-default.md)
- [加固](./linux-hardening.md)
- [调优](./tuning.md)
- [PAM](./linux-pam.md)

## 目录

- [管理](./admin/README.md)
- [启动](./boot/README.md)
- 内核 - [FAQ](./kernel/kernel-faq.md), [模块](./kernel/kernel-module.md)
- 安全 - [chmod](./security/chmod.md), [grsecurity](./security/grsecurity.md), [keyrings](./security/keyrings.md), [selinux](./security/selinux.md), [tpm](./security/tpm.md)
- [文件系统](./fs/README.md) / [fs 杂项](./fs.md)
- [网络](./network/README.md)
- [设备](./dev/README.md) / [硬件](./hardware/README.md)
- init - [Awesome](./init/init-awesome.md), [systemd](./init/systemd.md), [openrc](./init/openrc.md), [s6](./init/s6.md), [inittab](./init/inittab.md)
- service - [incron](./service/incron.md)
- [libc](./libc/README.md)
- [shell](./shell/README.md)
- sys (/proc, /sys 等内核接口) - [kernel](./sys/kernel.md), [sysctl](./sys/sysctl.md), [meminfo](./sys/meminfo.md), [capabilities](./sys/capabilities.md), [cgroup](./sys/cgroup.md), [syscall](./sys/syscall.md)
- [stat](./stat/README.md)
- [embedded](./embedded/README.md)
- [desktop](./desktop/README.md) / [gui](./gui/README.md)
- cloud - [cloud-init](./cloud/cloud-init.md)
- cluster - [Awesome](./cluster/linux-cluster-awesome.md)
- mpp - [opencl](./mpp/opencl.md)
- pm (电源管理) - [nix](./pm/nix.md)

## 常用

- [hostname](./hostname.md)
- [账号](./account.md)
- [分区](./partition.md)
- [信号](./signal.md)
- [声音 (ALSA)](./alsa.md) / [sound](./sound.md)
- [coreutils](./coreutils.md)
- [util-linux](./util-linux.md)
- [chrony](./chrony.md) / [ntp](./ntp.md)
- [posix](./posix.md)
- [编辑器](./editor.md)
- [构建](./build.md)

## 相关项目

- [0xAX/linux-insides](https://github.com/0xAX/linux-insides)
  - 讲解 Linux 内核内部机制
- [SamyPesse/How-to-Make-a-Computer-Operating-System](https://github.com/SamyPesse/How-to-Make-a-Computer-Operating-System)
- [LinuxBoot](https://www.linuxboot.org/)
  - 用 Linux kernel + initramfs 替代部分传统固件（UEFI DXE 阶段）
- [Yocto Project](https://www.yoctoproject.org/)
  - 面向嵌入式产品构建定制 Linux 系统的开源协作项目，不限硬件架构
- [Zephyr Project](https://www.zephyrproject.org/)
  - 面向资源受限设备的可扩展实时操作系统（RTOS），支持多种硬件架构，强调安全设计
