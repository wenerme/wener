---
title: Dual System Boot
tags:
  - OS
  - Boot
  - UEFI
  - Windows
  - Linux
---

# Dual System Boot

## UEFI QEMU

- [Using UEFI with QEMU](https://fedoraproject.org/wiki/Using_UEFI_with_QEMU)
- [How to boot EFI kernel using QEMU ?](https://unix.stackexchange.com/a/57221/47774)
- [OVMF Whitepaper](http://www.linux-kvm.org/downloads/lersek/ovmf-whitepaper-c770f8c.txt)
- [How to run OVMF](https://github.com/tianocore/tianocore.github.io/wiki/How-to-run-OVMF)
- [EDK II](https://github.com/tianocore/tianocore.github.io/wiki/EDK-II)
- [tianocore/edk2](https://github.com/tianocore/edk2)

> EDK II is a modern, feature-rich, cross-platform firmware development environment for the UEFI and PI specifications. EDK II is open source, using a BSD license.

## Windows Boot Manager

```bash
bcdedit /set {ID} device partition=c:
bcdedit /set {ID} path \linux.bin
bcdedit /displayorder {ID} /addlast
bcdedit /timeout 30
```

## SSD Optimization

- [SSD固态硬盘优化设置图文教程](http://bbs.zol.com.cn/diybbs/d34028_544.html)
- [如何在Win10下开启SSD固态硬盘TRIM](https://www.ithome.com/html/win10/206428.htm)

## UEFI + GPT

- [UEFI SecureBoot ESP MSR 等相关名词解释](http://wangpai.2345.cn/thread.php?fid=12&pid=2964106)

### ESP (EFI System Partition)

- [win8.1与archlinux(UEFI+GPT)双系统共存—窗口环境配置](https://bbs.archlinuxcn.org/viewtopic.php?id=3474)
- [Dual boot with Windows](https://wiki.archlinux.org/index.php/Dual_boot_with_Windows)
- [GRUB/Tips and tricks](https://wiki.archlinux.org/index.php/GRUB/Tips_and_tricks)
- [GRUB/EFI examples](https://wiki.archlinux.org/index.php/GRUB/EFI_examples)
- [EFI System Partition](https://wiki.archlinux.org/index.php/EFI_System_Partition)
- [安装win10_arch双系统过程](http://tech.memoryimprintstudio.com/dual-boot-installation-of-arch-linux-with-preinstalled-windows-10-with-encryption/)

ESP分区是FAT32格式的，主要用来放Windows的引导文件。UEFI不支持从NTFS格式的分区启动。

### MSR (Microsoft Reserved Partition)

- MSR分区即 Microsoft Retain 微软保留分区。
- 小于 16 GB 的磁盘，MSR 分区为 32 MB。
- 大于 16 GB 的磁盘，MSR 分区为 128 MB。
- 没有MSR分区Windows还是可以启动。

### Windows Boot Files

- `Windows Boot Manager`: 启动选项
- `bootmgfw.efi`: 引导Windows的引导文件。
- `Bootx64.efi`: UEFI的必需引导文件！
- `CS-M`: Compatibility Support Module，兼容性支持模块。

### Recovery

恢复引导项：在pe中运行cmd后输入 `bcdboot c:\windows /f all /s f: /l zh-cn`

## GRUB

```bash
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=grub
```

### Add Windows 8.1 Entry

```cfg
# /boot/grub/grub.cfg

menuentry 'windows8' {
    insmod part_gpt
    insmod chain
    set root='(hd0,gpt2)'
    chainloader /EFI/microsoft/Boot/bootmgfw.efi
}

if [ "${grub_platform}" == "efi" ]; then
    menuentry "Microsoft Windows Vista/7/8/10 UEFI-GPT" {
        insmod part_gpt
        insmod fat
        insmod search_fs_uuid
        insmod chain
        search --fs-uuid --set=root $hints_string $fs_uuid
        chainloader /EFI/Microsoft/Boot/bootmgfw.efi
    }
fi

# BIOS+MBR
menuentry 'Windows ' {
    insmod ntfs
    set root='(hd0,msdos3)'
    search --no-floppy --fs-uuid --set=root 你的硬盘UUID
    chainloader +1
}
```

## Tools

- `ms-sys`: Write MBRs
- `efibootmgr`: Manage EFI boot entries
- [Etcher](https://etcher.io/)

```bash
ms-sys --partition /dev/sda1
```

## Systemd EFISTUB Update

Monitor kernel updates to copy EFISTUB kernel to ESP.

`/etc/systemd/system/efistub-update.path`:

```ini
[Unit]
Description=Copy EFISTUB Kernel to EFI System Partition

[Path]
PathChanged=/boot/initramfs-linux-fallback.img

[Install]
WantedBy=multi-user.target
WantedBy=system-update.target
```

`/etc/systemd/system/efistub-update.service`:

```ini
[Unit]
Description=Copy EFISTUB Kernel to EFI System Partition

[Service]
Type=oneshot
ExecStart=/usr/bin/cp -af /boot/vmlinuz-linux esp/EFI/arch/
ExecStart=/usr/bin/cp -af /boot/initramfs-linux.img esp/EFI/arch/
ExecStart=/usr/bin/cp -af /boot/initramfs-linux-fallback.img esp/EFI/arch/
```

- [UEFI dual boot Archlinux](https://blog.icehoney.me/posts/2015-10-28-UEFI-dual-boot-Archlinux)
