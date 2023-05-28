---
slug: recover-synology
title: 恢复群晖数据盘
tags:
  - AlpineLinux
  - 运维
---

## Recover Synology

- Recover Synology from AlpineLinux
- btrfs report I/O Error

## 问题

群晖的盘搞的很复杂

- mdraid -> lvm -> btrfs

只看到 btrfs 报错（I/O Error），无法使用，没看到具体的磁盘错误，只能逐级排查。

主要目的是挂载 btrfs 恢复数据。

## 操作

```bash
file -s /dev/sda1 # linux_raid_member
file -s /dev/sda2 # swap
file -s /dev/sda3 # 发现是用的 mdadm RAID 6
# /dev/sda3: Linux Software RAID version 1.2 (1) UUID= name=DF:2 level=6 disks=4

apk add mdadm

mdadm --examine --scan  # 扫描
mdadm --assemble --scan # 添加
cat /proc/mdstat        # 状态

file -s /dev/md127 # 发现是 LVM
# /dev/md127: LVM2 PV (Linux Logical Volume Manager), UUID: , size: 11980386729984
```

**挂载 LVM**

```bash
apk add lvm2

pvscan
# PV /dev/md127   VG vg1             lvm2 [<10.90 TiB / 604.00 MiB free]
vgscan
# Found volume group "vg1" using metadata type lvm2

lvdisplay
lvs
# /dev/vg1/syno_vg_reserved_area
# /dev/vg1/volume_1

vgchange -ay vg1 # 激活 vg1

file -s /dev/vg1/volume_1 # -> /dev/mapper/vg1-volume_1
file -s /dev/mapper/vg1-volume_1
# /dev/mapper/vg1-volume_1: BTRFS Filesystem label "2022.12.04-17:42:08 v42661", sectorsize 4096, nodesize 16384, leafsize 16384, UUID=, 151894196224/11979737530368 bytes used, 1 devices
```

**挂载 btrfs**

```bash
apk add btrfs-progs btrfs-progs-extra
modprobe btrfs

btrfs device scan
btrfs filesystem show

btrfs check /dev/mapper/vg1-volume_1 # 尝试检测
```

```
ERROR: errors found in fs roots
found 151884984320 bytes used, error(s) found
total csum bytes: 2896392
total tree bytes: 127860736
total fs tree bytes: 99958784
total extent tree bytes: 15761408
btree space waste bytes: 25632487
file data blocks allocated: 103613448192
 referenced 103061467136
```

- 发现不少问题

```bash
mount /dev/mapper/vg1-volume_1 /mnt # 尝试挂载
# wrong fs type, bad option, bad superblock on /dev/mapper/vg1-volume_1

dmesg # 内核日志找原因
# BTRFS critical (device dm-1): corrupt leaf

mount -t btrfs -o recovery,ro /dev/mapper/vg1-volume_1 /mnt

btrfs check /dev/mapper/vg1-volume_1 --repair # 尝试修复，但是失败
# ERROR: failed to repair root items: I/O error

btrfs scrub start -Bf /dev/mapper/vg1-volume_1
# btrfs rescue zero-log /dev/<device_name>
```

- smartctl 尝试检测硬盘问题
- mdadm 尝试 resync

> 无解, TODO

## wrong fs type, bad option, bad superblock on /dev/mapper/vg1-volume_1

```bash
mount -t btrfs /dev/mapper/vg1-volume_1 /mnt
```

```txt
BTRFS: device label 2022.12.04-17:42:08 v42661 devid 1 transid 449145 /dev/mapper/vg1-volume_1 scanned by mount (4067)
BTRFS info (device dm-1): using crc32c (crc32c-intel) checksum algorithm
BTRFS info (device dm-1): using free space tree
BTRFS critical (device dm-1): corrupt leaf: root=1 block=668844032 slot=1, invalid root flags, have 0x400000000 expect mask 0x1000000000001
BTRFS error (device dm-1): read time tree block corruption detected on logical 668844032 mirror 1
BTRFS critical (device dm-1): corrupt leaf: root=1 block=668844032 slot=1, invalid root flags, have 0x400000000 expect mask 0x1000000000001
BTRFS error (device dm-1): read time tree block corruption detected on logical 668844032 mirror 2
BTRFS error (device dm-1): open_ctree failed
```

```bash
btrfs check /dev/mapper/vg1-volume_1 --repair
```

```bash
ERROR: failed to repair root items: I/O error
```

## S.M.A.T Check

```bash
apk add smartmontools

smartctl -t long /dev/sda
smartctl -t long /dev/sdb
smartctl -t long /dev/sdc
smartctl -t long /dev/sdd

# 很慢
smartctl -l selftest /dev/sda
smartctl -l selftest /dev/sdb
smartctl -l selftest /dev/sdc
smartctl -l selftest /dev/sdd

smartctl -a /dev/sda
```

## LVM Check

```bash
vgck vg1 -v
pvck /dev/md127
```

## mdadm check

> 4\*10T SAS 需要跑 8h, iostat -> ~200MB/s

```bash
mdadm --detail /dev/md127
mdadm --action=check /dev/md127

# 查看有问题的块
watch cat /sys/block/md127/md/mismatch_cnt
# 查看进度
cat /proc/mdstat
cat /sys/block/md127/md/sync_action
```

```
md127: mismatch sector in range 713232-713240
```

```bash
echo idle > /sys/block/md127/md/sync_action # 停止 check
mdadm --action=repair /dev/md127            # 尝试修复 - repair=resync
iostat -h                                   # write 是有修复

# K/Sec
cat /proc/sys/dev/raid/speed_limit_max
sysctl dev.raid.speed_limit_max # 200000
sysctl dev.raid.speed_limit_max=2000000

# 不是平滑限速，而是平均 - 因此 resync 一会儿满速，一会儿 0
sysctl dev.raid.speed_limit_max=100000 # 如果觉得修复了问题，可以降低速度，然后尝试系统操作
```

- https://unix.stackexchange.com/a/531230/47774

<!--
mdadm /dev/md1 -r /dev/sdc2
mdadm /dev/md1 -a /dev/sdc2
mdadm --monitor --mail=root@localhost --delay=1800 /dev/md2

mdadm --stop /dev/md1
--action=
idle, frozen, check, repair

echo frozen > /sys/block/md0/md/sync_action
echo none > /sys/block/md0/md/resync_start
echo idle > /sys/block/md0/md/sync_action
-->

## BTRFS critical (device dm-1): corrupt leaf

```
BTRFS error (device dm-1): read time tree block corruption detected on logical 668844032 mirror 2
BTRFS critical (device dm-1): corrupt leaf: root=1 block=668844032 slot=1, invalid root flags, have 0x400000000 expect mask 0x1000000000001
BTRFS error (device dm-1): read time tree block corruption detected on logical 668844032 mirror 1
BTRFS critical (device dm-1): corrupt leaf: root=1 block=668844032 slot=1, invalid root flags, have 0x400000000 expect mask 0x1000000000001
BTRFS error (device dm-1): read time tree block corruption detected on logical 668844032 mirror 2
BTRFS error (device dm-1): open_ctree failed
```

```bash
btrfs check /dev/mapper/vg1-volume_1 --repair
```

```txt
[1/7] checking root items
checksum verify failed on 711114752 wanted 0xed010ef2 found 0xb32e10d9
checksum verify failed on 711114752 wanted 0xed010ef2 found 0x3a406fa5
checksum verify failed on 711114752 wanted 0xed010ef2 found 0xb32e10d9
Csum didn't match
ERROR: failed to repair root items: I/O error
```

---

```
BTRFS: device label 2022.12.04-17:42:08 v42661 devid 1 transid 449145 /dev/mapper/vg1-volume_1 scanned by btrfs (22854)
```

## btrfs backup

apk add partclone

```bash
#btrfstune -u /dev/mapper/vg1-volume_1
```

https://manpages.debian.org/jessie/partclone/partclone.btrfs.8

noerror: Instructs dd to continue operation, ignoring all read errors
sync: Instruct dd to fill input blocks with zeroes if there were any read errors

dd if=/dev/sda of=/dev/sdb1 bs=1MB conv=noerror,sync status=progress
| gzip -c > backup.img.gz
gunzip -c /PATH/TO/DRIVE/backup_image.img.gz | dd of=/dev/sda

## LV Status NOT available

是因为没有 active

```bash
vgchange -ay vg1
```

## WARNING: PV /dev/md127 in VG vg1 is using an old PV header, modify the VG to update.

不管

## File descriptor 63 (pipe: 111755) leaked on pvck invocation.

```bash
LVM_SUPPRESS_FD_WARNINGS=1 vgck vg1
```

## 参考

- [btrfs.8](https://man7.org/linux/man-pages/man8/btrfs.8.html)
- [btrfs-check.8](https://man7.org/linux/man-pages/man8/btrfs-check.8.html)
- [vgchange.8](https://man7.org/linux/man-pages/man8/vgchange.8.html)
- [vgck.8](https://man7.org/linux/man-pages/man8/vgck.8.html)
- [md.4](https://man7.org/linux/man-pages/man4/md.4.html)
- [mdadm.8](https://man7.org/linux/man-pages/man8/mdadm.8.html)
- BTRFS: failed to read log tree
  - `btrfs rescue zero-log /dev/<devicename>`
  - https://www.suse.com/support/kb/doc/?id=000018761
- https://www.cyberciti.biz/tips/linux-raid-increase-resync-rebuild-speed.html
