---
title: FAQ
---

# 文件系统常见问题

## 文件系统限制

- [What are the file and file system size limitations for Red Hat Enterprise Linux?](https://access.redhat.com/solutions/1532)

## MBR vs GPT

- MBR - Master Boot Record
  - 也叫 DOS 分区 - 最早于 IBM PC DOS 2.0
- GPT - GUID Partition Table
  - 因为 UEFI 而诞生
- 4096 disk sector - AFD - Advanced Format - 4Kn
  - 自 2010 年开始，厂商大多采用 4k sector
  - 使用 512 实际是使用模拟后的地址 - 512e

| -            | mbr                        | gpt                            |
| ------------ | -------------------------- | ------------------------------ |
| since        | 1983                       | 2005 - UEFI                    |
| interface    | BIOS                       | UEFI                           |
| 512b sector  | 2TiB = 2^32 × 512          | 8 ZiB = 2^64 × 512             |
| 4096b sector | -                          | 64 ZiB = 2^64 × 4096           |
| address      | CHS - Cylinder-head-sector | LBA - Logical Block Addressing |
| bits         | 32                         | 64                             |

> The size of this disk is 2 TiB (2199023255552 bytes). DOS partition table format cannot be used on drives for volumes larger than 2199023255040 bytes for 512-byte sectors. Use GUID partition table format (GPT).

## 重新挂载为可读写

```bash
mount -o rw,remount /
```

## Do you want to remove the signature?

如果不希望删除 fs 则选择 No

- [What is a vfat signature?](https://unix.stackexchange.com/a/478001/47774)
