---
title: fstab (File System Table)
tags:
  - DevOps
  - Storage
  - FileSystem
  - Linux
  - Admin
---

# fstab (File System Table)

The `fstab` file is used to define how disk partitions, various other block devices, or remote filesystems should be mounted into the filesystem.

## Documentation

- [ArchWiki - fstab](https://wiki.archlinux.org/index.php/fstab)
- [Ubuntu Documentation - Fstab](https://help.ubuntu.com/community/Fstab)

## Examples

### Common fstab Entries

```fstab
# Alpine Default Examples
UUID=00000000-5e02-442f-a61b-b9152c0317f7       /       ext4    rw,relatime,data=ordered 0 1
UUID=00000000-f3c9-4c46-afd7-dcf0bd9b3183       /boot   ext4    rw,relatime,data=ordered 0 2
UUID=00000000-7497-4dfb-938d-a321b2fd9c9c       swap    swap    defaults        0 0

# Removable Devices
/dev/cdrom      /media/cdrom    iso9660 noauto,ro 0 0
/dev/usbdisk    /media/usb      vfat    noauto  0 0

# Generic Syntax
# <device>             <dir>         <type>    <options>             <dump> <fsck>
/dev/sda1              /data         ext4      defaults,noatime      0      1
```

### Bind Mount

```fstab
# bind mount
/data/a /data/b none bind 0 0
```

## Maintenance

### Check Syntax

To check for errors without actually mounting everything (fake mount):

```bash
# -f --fake
mount -fav
```
