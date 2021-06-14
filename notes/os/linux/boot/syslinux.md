---
title: Syslinux
---

# Syslinux

- 只支持 X86
- 分为 extlinux、isolinux
- 支持 mbr、efi、gpt
- 参考
  - [How to install extlinux (syslinux) as a bootloader](https://shallowsky.com/linux/extlinux.html)

## config

- [Config](https://wiki.syslinux.org/wiki/index.php?title=Config)

## extlinux

- [EXTLINUX](https://wiki.syslinux.org/wiki/index.php?title=EXTLINUX)

## MBR

- [MBR](https://wiki.syslinux.org/wiki/index.php?title=Mbr)
- mbr - dos 分区
- altmbr.bin - 指定分区，忽略 boot
- gptmbr.bin - gtp 分区
- isohdppx.bin - ISO HDD PPX
- isohdpfx.bin - ISO HDD PFX
- isolinux.bin - ISO Linux
- 风格
  - `_c` - 启动按住 Ctrl，code boots from BIOS drive 0x80
  - `_f` - 总是 boots from BIOS drive 0x80.

```bash
# 修复 mbr 分区
dd bs=440 conv=notrunc count=1 if=/usr/share/syslinux/mbr.bin of=$dev
```

# FAQ

## extlinux: no previous syslinux boot sector found
