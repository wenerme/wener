---
title: Linux 引导加载程序与分区 (Bootloader & Partitioning)
tags:
  - Linux
  - Boot
  - Bootloader
  - Partition
  - UEFI
  - GRUB
---

# Linux 引导加载程序与分区 (Bootloader & Partitioning) {#bootloader-partitioning}

- [Comparison of boot loaders - Wikipedia](https://en.wikipedia.org/wiki/Comparison_of_boot_loaders)
- [How To Boot A Linux Live USB Stick On Your Mac](https://www.makeuseof.com/tag/how-to-boot-a-linux-live-usb-stick-on-your-mac/)
- Mac OS X 需要 GUID 或 Apple File System 分区。
- [Startup key combinations for Mac](https://support.apple.com/kb/PH6382)
- MBR vs EFI vs UEFI
- MBR vs GPT

- [SYSLINUX Install](https://www.syslinux.org/wiki/index.php?title=Install)

```bash
cat /proc/partitions
cat /proc/version
lsusb -t
```

## ESP (EFI System Partition) {#esp}

- ESP - EFI SYSTEM PARTITION - 一般为 FAT32 或 FAT 变种
- [EFI system partition - Wikipedia](https://en.wikipedia.org/wiki/EFI_system_partition)
- [BIOS boot partition - Wikipedia](https://en.wikipedia.org/wiki/BIOS_boot_partition)

## Alpine Linux LVM & UEFI {#alpine-lvm-uefi}

- [Setting up LVM on GPT-labeled disks - AlpineWiki](https://wiki.alpinelinux.org/wiki/Setting_up_LVM_on_GPT-labeled_disks)
- [Installing on GPT LVM - AlpineWiki](https://wiki.alpinelinux.org/wiki/Installing_on_GPT_LVM)

```bash
dd bs=440 conv=notrunc count=1 if=/usr/share/syslinux/gptmbr.bin of=/dev/sda
```

## 创建 UEFI 启动 USB (Create UEFI Boot USB) {#create-uefi-usb}

- [Create UEFI boot USB - AlpineWiki](https://wiki.alpinelinux.org/wiki/Create_UEFI_boot_USB)

```bash
DEVICE=/dev/sdb
parted --script $DEVICE mklabel gpt
parted --script --align=optimal $DEVICE mkpart ESP fat32 1MiB 200MiB
parted --script $DEVICE set 1 boot on

gdisk -l /dev/sdb

# mkfs.fat: warning - lowercase labels might not work properly with DOS or Windows
mkfs.vfat -n Alpine ${DEVICE}1
mount -t vfat ${DEVICE}1 /mnt

wget https://mirrors.tuna.tsinghua.edu.cn/alpine/v3.8/releases/x86_64/alpine-standard-3.8.0-x86_64.iso
cd /mnt && uniso < ~/alpine-standard-3.8.0-x86_64.iso

mkdir -p loader/entries

cat << CONF > loader/loader.conf
default alpine
timeout 4
CONF

# boot/syslinux/syslinux.cfg
cat << CONF > loader/entries/alpine.conf
title    AlpineLinux-Vanilla
linux    /boot/vmlinuz-vanilla
initrd   /boot/initramfs-vanilla
options  modules=loop,squashfs,sd-mod,usb-storage quiet nomodeset
CONF

cd ~ && umount /mnt
```

### Partitioning Status

- MBR: protective
- BSD: not present
- APM: not present
- GPT: present

## OVMF & QEMU {#ovmf-qemu}

- OVMF "is a project to enable UEFI support for Virtual Machines".
- [OVMF - KVM](http://www.linux-kvm.org/page/OVMF)
- [Using UEFI with QEMU - Fedora](https://fedoraproject.org/wiki/Using_UEFI_with_QEMU)
- [AArch64/Install with QEMU - Fedora](https://fedoraproject.org/wiki/Architectures/AArch64/Install_with_QEMU)
- [UEFI/OVMF - Ubuntu Wiki](https://wiki.ubuntu.com/UEFI/OVMF)
- [tianocore/edk2](https://github.com/tianocore/edk2)

QEMU:

- `-L path`: set the directory for the BIOS, VGA BIOS and keymaps

## Parted & GPT {#parted-gpt}

- [Unrecognised disc label when using parted with qemu images](https://serverfault.com/questions/104923/unrecognised-disc-label-when-using-parted-with-qemu-images)

Parted commands:

```bash
mklabel msdos

unit MiB
mklabel gpt
mkpart 1 1 256
name 1 boot
set 1 legacy_boot on
mkpart 2 256 100%
set 2 lvm on

partprobe
```

Use `sgdisk` and `parted`:

```bash
# 转换为 GPT
parted -s /dev/sdb 'mklabel gpt'
# 编辑 GPT 分区
gdisk /dev/sdb
# 脚本操作 http://www.rodsbooks.com/gdisk/sgdisk-walkthrough.html
# -p 查看分区 -o 清除分区表 -g 转换 MBR 为 GPT -n 删除分区 -n 添加分区 -c 更改分区名
# -t 分区类型 -v 校验 -Z 清除分区数据,当需要从新分区的时候使用
sgdisk -og /dev/sdb
```

## 参考资料 (References) {#references}

- [Unified Extensible Firmware Interface - Wikipedia](https://en.wikipedia.org/wiki/Unified_Extensible_Firmware_Interface)
- [EFI system partition: Linux - Wikipedia](https://en.wikipedia.org/wiki/EFI_system_partition#Linux)
- [Windows To Go - Wikipedia](https://en.wikipedia.org/wiki/Windows_To_Go)
- [syslinux: UEFI Systems - ArchWiki](https://wiki.archlinux.org/index.php/syslinux#UEFI_Systems)
- [What is the difference between GRUB and Syslinux? - Ask Ubuntu](https://askubuntu.com/questions/651902/what-is-the-difference-between-grub-and-syslinux)
- [Unified Extensible Firmware Interface - ArchWiki](https://wiki.archlinux.org/index.php/Unified_Extensible_Firmware_Interface)
- [Das U-Boot - Wikipedia](https://en.wikipedia.org/wiki/Das_U-Boot)

### Bootloader Features

| Feature         | SYSLINUX                                 | Das U-Boot                       | GRUB 2                                        |
| :-------------- | :--------------------------------------- | :------------------------------- | :-------------------------------------------- |
| **Platforms**   | x86 (PC)                                 | PPC, ARM, MIPS, x86, etc.        | x86, ARM, PowerPC, MIPS, SPARC                |
| **Filesystems** | ext2/3/4, btrfs, FAT16/32, NTFS, iso9660 | FAT, ext2/3/4, jffs2, ubifs, nfs | ext2/3/4, btrfs, zfs, xfs, FAT, NTFS, iso9660 |
| **OS Support**  | GNU/Linux                                | Linux, BSD, RTOS, Solaris, etc.  | Linux, BSD, Solaris, Multiboot                |
| **Network**     | TFTP                                     | TFTP, NFS                        | ?                                             |
