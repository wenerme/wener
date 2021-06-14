---
title: Partition
---

# Partition

- [GPT](https://en.wikipedia.org/wiki/GUID_Partition_Table)
- [Convert an MBR disk into a GPT disk](https://docs.microsoft.com/en-us/windows-server/storage/disk-management/change-an-mbr-disk-into-a-gpt-disk)

| abbr | meaning              |
| ---- | -------------------- |
| MBR  | Master Boot Record   |
| EBR  | Extended Boot Record |
| GPT  | GUID Partition Table |
| RDB  | Rigid Disk Block     |
| CHS  | Cylinder-Head-Sector |

| tool      | desc                                          |
| --------- | --------------------------------------------- |
| fdisk     |
| sfdisk    | 支持脚本的 fdisk                              |
| cfdisk    | new versions; older do just DOS partitions    |
| gdisk     | interactive tool and GPT counterpart to fdisk |
| sgdisk    | 支持脚本的 gdisk                              |
| cgdisk    | menu-based tool and GPT counterpart to cfdisk |
| partx     |
| partprobe | 检测分区变化                                  |
| parted    |

## sfdisk

- [sfdisk](https://man7.org/linux/man-pages/man8/sfdisk.8.html)

> 2.26 开始支持 MBR (DOS), GPT, SUN, SGI 但不支持 CHS

```bash
# dump
sfdisk -d /dev/sda
```

## sgdisk

```bash
# Move backup GPT data structures to the end of the disk
sgdisk -e /dev/sda
```

## 分区类型

- [Partition type](https://en.wikipedia.org/wiki/Partition_type)
- 常用类型
  - 07h - NTFS/exFAT
  - 0Bh - FAT32 with CHS
  - 0Ch - FAT32 with LBA
  - AFh - HFS/HFS+
  - E8h - LUKS
  - EDh - 提议作为 GPT/MBR 混合分区
  - EEh - GPT 的保护 MBR 分区
  - EFh - EFI 系统分区, 一般为 FAT12, FAT16, FAT32

## 混合分区

- [Hybrid partition table](https://wiki.gentoo.org/wiki/Hybrid_partition_table)
- gdisk 恢复模式下有 MBR 混合操作工具，将需要放到 MBR 的分区按序指定即可

## MBR vs GPT

- GPT
  - 最初预留的分区表空间决定可以有多少个分区
  - LBA 0
    - 预留的兼容 MBR 的信息
    - 分区类型 0xEE 表示为 GPT 分区
    - MBR/GPT 混合分区表的硬盘该部分也会以 MBR 的形式存储前四个分区
- MBR
  - 引导程序会直接存储与 MBR 中
  - 早期 MBR 基于 CHS, 现在一般也基于 LBA

| VS     | MBR        | GPT                |
| ------ | ---------- | ------------------ |
| 名字   | 主引导记录 | 全局唯一标识分区表 |
| 分区数 | 4          | 128 / EFI 最小尺寸 |
| 最大卷 | 2 TB       | 18 EB              |

## LBA vs CHS

- [LBA]
  - 逻辑区块地址
  - 比较现代化的方式
  - 更符合 SSD, Flash 这样的块设备
  - 一般为 512 或 1024
  - ISO-9660 标准的 CD 为 2048
- [CHS](https://en.wikipedia.org/wiki/Cylinder-head-sector)
  - 柱面-磁头-扇区
  - 旧式的机械磁盘

```js
// H = heads per cylinder - 每个磁柱的磁头数
// S = sectors per track - 每磁道的扇区数
$lba = ($c * H + $h) * S + $s - 1;

$c = $lba / (S * H);
$h = ($lba / S) % H;
$s = ($lba % S) + 1;
```

# FAQ

## 扩展最后一个分区

```bash
# from cloud-guest-utils
growpart /dev/sda 3

#
parted /dev/sda resize 3 100%

# fidks 扩展最后一个分区
apk add util-linux
echo -e 'd\n\nn\n\n\n\n\n\np\nw\n' | fdisk /dev/sda

# GPT
sgdisk -e /dev/sda
sgdisk -d 3 /dev/sda
sgdisk -N 3 /dev/sda
partprobe /dev/sda
```

**扩展文件系统**

```bash
# ext4
apk add e2fsprogs-extra
resize2fs /dev/sda3

# luks - 扩展分区
cryptsetup open /dev/sdb2 root
cryptsetup resize root
# 扩展文件系统
resize2fs /dev/mapper/root
```
