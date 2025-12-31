---
title: FAT & ExFAT Filesystems
tags:
  - DevOps
  - Storage
  - FileSystem
  - FAT
  - ExFAT
---

# FAT & ExFAT Filesystems

## ExFAT

### Installation (Alpine)

```bash
apk add fuse-exfat fuse-exfat-utils dosfstools
```

### Commands

```bash
# Format
mkfs.exfat /dev/sdb1

# Label
exfatlabel /dev/sdb1 MainData

# Check
fsck.exfat /dev/sdb1

# Dump info
dumpexfat /dev/sdb1
```

## FAT32 & LBA

- **FAT32** (Type `0x0B`)
- **LBA FAT32** (Type `0x0C`)
- [Logical Block Addressing (Wikipedia)](http://en.wikipedia.org/wiki/Logical_block_addressing)
- [LBA Modes](http://www.pcguide.com/ref/hdd/bios/modesLBA-c.html)

## Raspberry Pi Notes

Why is the `/boot` partition a FAT filesystem?

- [StackExchange - Why the FAT partition](https://raspberrypi.stackexchange.com/questions/44074/raspberry-pi-3-why-the-fat-partition)
- [Raspberry Pi Forums Discussion](https://www.raspberrypi.org/forums/viewtopic.php?t=58502)
