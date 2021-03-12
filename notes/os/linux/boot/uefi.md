# UEFI

- 参考
  - wikipedia [UEFI](https://en.wikipedia.org/wiki/Unified_Extensible_Firmware_Interface)
  - [Alpine and UEFI](https://wiki.alpinelinux.org/wiki/Alpine_and_UEFI)
  - debian [UEFI](https://wiki.debian.org/UEFI)
  - [EFIBootLoaders](https://wiki.ubuntu.com/EFIBootLoaders)
- .efi 存储在 ESP/EFI System Partition 分区
  - 分区标识 EF
  - 分区格式为 FAT 或 FAT32

:::tip

* 使用 UEFI 建议使用 GRUB Bootloader

:::

# FAQ
## Why UEFI / UEFI vs BIOS
* 相同点
  * 固件接口
* BIOS
  * MBR/Master Boot Record 存储分区
* UEFI
  * GPT/GUID partition table 分区
  * 支持 2TB 存储设备
  * 支持超过 4 个主分区
  * 固件支持使系统启动更快
  * 支持安全启动 - 系统完整性检查
  * 支持网络
  * 支持图形界面
