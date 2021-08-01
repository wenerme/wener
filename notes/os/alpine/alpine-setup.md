---
title: AlpineLinux Setup
---

# AlpineLinux Setup

- 参考
  - [alpinelinux/alpine-conf](https://github.com/alpinelinux/alpine-conf)
  - [Alpine setup scripts](https://wiki.alpinelinux.org/wiki/Alpine_setup_scripts)

## setup-disk

- 将系统写入存储介质
- [setup-disk](https://github.com/alpinelinux/alpine-conf/blob/master/setup-disk.in)
  - MKFS_OPTS_BOOT
  - MKFS_OPTS_ROOT
    - ext4 建议 设置 `-b 4096` 强制 4k

---

**diskmode**

- sys - 正常模式，boot 分区和 root 分区 - 适用于 开发环境，桌面，虚拟机
- data - OS 通过内存启动 tmpfs，无 boot 分区
- lvm
- lvmsys
- lvmdata

**bootloader**

- ARCH=s390x -> s390-tools
- ARCH=ppc64le -> grub-ieee1275
- USE_EFI - grub-efi
- BOOTLOADER
  - grub -> grub-bios
  - syslinux
  - zipl
  - raspberrypi-bootloader

```bash

```
