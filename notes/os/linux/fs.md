---
title: 分区类型代码 (Partition Type Codes)
tags:
  - Linux
  - Filesystem
  - Partition
  - GPT
  - gdisk
---

# 分区类型代码 (Partition Type Codes) {#partition-type-codes}

- [List of file systems - Wikipedia](https://en.wikipedia.org/wiki/List_of_file_systems)

## gdisk Partition Codes

See `gdisk` internal list (`L` command).

| Code | Description                    |
| :--- | :----------------------------- |
| 0700 | Microsoft basic data           |
| 0c01 | Microsoft reserved             |
| 2700 | Windows RE                     |
| 3000 | ONIE boot                      |
| 3001 | ONIE config                    |
| 3900 | Plan 9                         |
| 4100 | PowerPC PReP boot              |
| 4200 | Windows LDM data               |
| 4201 | Windows LDM metadata           |
| 4202 | Windows Storage Spaces         |
| 7501 | IBM GPFS                       |
| 7f00 | ChromeOS kernel                |
| 7f01 | ChromeOS root                  |
| 7f02 | ChromeOS reserved              |
| 8200 | Linux swap                     |
| 8300 | Linux filesystem               |
| 8301 | Linux reserved                 |
| 8302 | Linux /home                    |
| 8303 | Linux x86 root (/)             |
| 8304 | Linux x86-64 root (/)          |
| 8305 | Linux ARM64 root (/)           |
| 8306 | Linux /srv                     |
| 8307 | Linux ARM32 root (/)           |
| 8400 | Intel Rapid Start              |
| 8e00 | Linux LVM                      |
| a000 | Android bootloader             |
| a001 | Android bootloader 2           |
| a002 | Android boot                   |
| a003 | Android recovery               |
| a004 | Android misc                   |
| a005 | Android metadata               |
| a006 | Android system                 |
| a007 | Android cache                  |
| a008 | Android data                   |
| a009 | Android persistent             |
| a00a | Android factory                |
| a00b | Android fastboot/ter           |
| a00c | Android OEM                    |
| a500 | FreeBSD disklabel              |
| a501 | FreeBSD boot                   |
| a502 | FreeBSD swap                   |
| a503 | FreeBSD UFS                    |
| a504 | FreeBSD ZFS                    |
| a505 | FreeBSD Vinum/RAID             |
| a580 | Midnight BSD data              |
| a581 | Midnight BSD boot              |
| a582 | Midnight BSD swap              |
| a583 | Midnight BSD UFS               |
| a584 | Midnight BSD ZFS               |
| a585 | Midnight BSD Vinum             |
| a600 | OpenBSD disklabel              |
| a800 | Apple UFS                      |
| a901 | NetBSD swap                    |
| a902 | NetBSD FFS                     |
| a903 | NetBSD LFS                     |
| a904 | NetBSD concatenated            |
| a905 | NetBSD encrypted               |
| a906 | NetBSD RAID                    |
| ab00 | Recovery HD                    |
| af00 | Apple HFS/HFS+                 |
| af01 | Apple RAID                     |
| af02 | Apple RAID offline             |
| af03 | Apple label                    |
| af04 | AppleTV recovery               |
| af05 | Apple Core Storage             |
| af06 | Apple SoftRAID Status          |
| af07 | Apple SoftRAID Scratch         |
| af08 | Apple SoftRAID Volume          |
| af09 | Apple SoftRAID Cache           |
| b300 | QNX6 Power-Safe                |
| bc00 | Acronis Secure Zone            |
| be00 | Solaris boot                   |
| bf00 | Solaris root                   |
| bf01 | Solaris /usr & Mac ZFS         |
| bf02 | Solaris swap                   |
| bf03 | Solaris backup                 |
| bf04 | Solaris /var                   |
| bf05 | Solaris /home                  |
| bf06 | Solaris alternate sector       |
| bf07 | Solaris Reserved 1             |
| bf08 | Solaris Reserved 2             |
| bf09 | Solaris Reserved 3             |
| bf0a | Solaris Reserved 4             |
| bf0b | Solaris Reserved 5             |
| c001 | HP-UX data                     |
| c002 | HP-UX service                  |
| e100 | ONIE boot                      |
| e101 | ONIE config                    |
| ea00 | Freedesktop $BOOT              |
| eb00 | Haiku BFS                      |
| ed00 | Sony system partition          |
| ed01 | Lenovo system partition        |
| ef00 | EFI System                     |
| ef01 | MBR partition scheme           |
| ef02 | BIOS boot partition            |
| f800 | Ceph OSD                       |
| f801 | Ceph dm-crypt OSD              |
| f802 | Ceph journal                   |
| f803 | Ceph dm-crypt journal          |
| f804 | Ceph disk in creation          |
| f805 | Ceph dm-crypt disk in creation |
| fb00 | VMWare VMFS                    |
| fb01 | VMWare reserved                |
| fc00 | VMWare kcore crash partition   |
| fd00 | Linux RAID                     |
