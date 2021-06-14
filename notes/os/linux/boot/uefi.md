---
title: UEFI
---

# UEFI

- 参考
  - [Understanding UEFI Secure Boot Chain](https://edk2-docs.gitbook.io/understanding-the-uefi-secure-boot-chain)
  - wikipedia [UEFI](https://en.wikipedia.org/wiki/Unified_Extensible_Firmware_Interface)
  - [Alpine and UEFI](https://wiki.alpinelinux.org/wiki/Alpine_and_UEFI)
  - debian [UEFI](https://wiki.debian.org/UEFI)
  - [EFIBootLoaders](https://wiki.ubuntu.com/EFIBootLoaders)
  - ubuntu [UEFI/OVMF](https://wiki.ubuntu.com/UEFI/OVMF)
  - [Howto: QEMU w/ Ubuntu Xenial host + UEFI guest](https://blog.system76.com/post/139138591598/howto-uefi-qemu-guest-on-ubuntu-xenial-host)
- .efi 存储在 ESP/EFI System Partition 分区
  - 分区标识 EF
  - 分区格式为 FAT 或 FAT32

:::tip

- 使用 UEFI 建议使用 GRUB Bootloader

:::

## OVMF

基于 EDK II 用于支持虚拟机 EFI 启动的固件

- OVMF/OVMF.fd - x86_64 实际运行的固件
- OVMF/OVMF_CODE.fd
- OVMF/OVMF_VARS.fd
  - “template” used to emulate persistent NVRAM storage
- OVMF/QEMU_EFI.fd - aarch64
- ovmf/bios.bin - 软连接指向 OVMF.fd 或 QEMU_EFI.fd

```bash
# -pflash path/to/OVMF.fd - emulated flash, fully support UEFI variables
# -bios bios.bin - variables will be partially emulated, and non-volatile, variables may lose their contents after a reboot
# -L . - 同 bios
# qemu-system-x86_64 -L .
```

# FAQ

## Why UEFI / UEFI vs BIOS

- 相同点
  - 固件接口
- BIOS
  - MBR/Master Boot Record 存储分区
- UEFI
  - GPT/GUID partition table 分区
  - 支持 2TB 存储设备
  - 支持超过 4 个主分区
  - 固件支持使系统启动更快
  - 支持安全启动 - 系统完整性检查
  - 支持网络
  - 支持图形界面
