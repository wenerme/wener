---
title: AlpineLinux Install
---

# AlpineLinux Install

- iso 会加载 /dev/vda1/apkovl

## Tips

```bash
# 快速 dd
# conv=sync,noerror
dd if=alpine-lts.img | dd of=/dev/sdb bs=100M conv=notrunc status=progress
#
dd if=test.raw of=/dev/rdisk2 conv=sparse status=progress bs=128MB

# 分区
partprobe -s
```

## flavor

> 不同的内核特性

- virt
- lts
- xen
- rpi/rpi2/rpi4 - RaspberryPi
  - rpi - armhf, armv7, aarch64
  - rpi2 - armhf, armv7
  - rpi4 - armv7, aarch64
- gru/elm - aarch64 - testing - chrome book
- 参考
  - [Developer Information for Chrome OS Devices](https://www.chromium.org/chromium-os/developer-information-for-chrome-os-devices)

## 虚拟机安装

- efi
  - boot 分区 512M
  - 使用 grub
  - ESP -> EFI (Extensible Firmware Interface) system partition

```bash
curl -O http://mirrors.sjtug.sjtu.edu.cn/alpine/v3.13/releases/x86_64/alpine-extended-3.13.5-x86_64.iso
qemu-system-x86_64 -smp 2 -m 4G -accel hvf -cdrom alpine-extended-3.13.5-x86_64.iso -boot b -hda efi.raw -net nic -net user,hostfwd=tcp::2222-:22

# UEFI 启动
# -accel hvf 启动会失败
qemu-system-x86_64 -m 4G -smp 2  -net nic -nic user,hostfwd=tcp::2222-:22 -drive file=efi.raw,if=virtio -display cocoa -bios bios.bin
```

## setup-disk

- [setup-disk](https://github.com/alpinelinux/alpine-conf/blob/master/setup-disk.in) 会添加一些基础的
  - sfdisk acct alpine-base
  - linux-flavor
  - bootloader
    - syslinux
  - 如果没指定 apkvol 则会使用 `lbu package` - 包含当前所有的安装包
  - 设置 `ERASE_DISKS` 为安装盘则不会询问是否擦除

---

- sys -> native_disk_install/lvm
- data -> data_only_disk_install/lvm
- native_disk_install - 本地安装
  - select_bootloader_pkg
    - grub -> grub-bios
    - grub+efi -> grub-efi
    - syslinux
  - init_progs - 安装依赖
    - sfdisk dosfstools e2fsprogs btrfs-progs xfsprogs
  - setup_partitions - boot, swap, root
    - efi 的 boot 默认 512M 其他 100M
  - setup_boot_dev - mkfs
  - setup_swap_dev
  - setup_root
- setup_root - 核心安装逻辑
  - mkfs root, mount root 到 SYSROOT=/mnt
  - mount boot -> /mnt/boot
  - mount boot -> /mnt/boot/efi - boot 和 efi 在同一个分区
  - install_mounted_root - 在 mount 的 root 进行安装
    - 如果不提供 APKOVL 会基于当前系统进行 lbu 构建 APKOVL
    - mkinitfs
    - setup_grub/setup_syslinux/setup_raspberrypi_bootloader/setup_zipl
    - init_chroot_mounts
    - apk add
    - cleanup_chroot_mounts
  - unmount_partitions

## 基础依赖

- [alpine-base](https://pkgs.alpinelinux.org/package/v3.12/main/x86_64/alpine-base)
  - alpine-baselayout
    - busybox musl
  - alpine-conf
    - busybox musl openrc
  - alpine-keys
  - apk-tools
    - libcrypto1.1 libssl1.1 musl zlib
  - busybox
    - musl
  - busybox-initscripts
    - busybox openrc
  - busybox-suid
    - busybox musl
  - libc-utils
    - musl-utils
      - musl scanelf
  - openrc
    - busybox musl

### /etc/apk/world/

**minirootfs**

```
alpine-baselayout
alpine-keys
apk-tools
busybox
libc-utils
```

**virt.iso**

```
alpine-base
openssl
```
