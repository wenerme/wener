---
title: NTFS
---

# NTFS

- Linux 5.15+ RW
- [NTFS filesystem driver](https://docs.kernel.org/6.6/filesystems/ntfs.html)
- 是否需要 NTFS ?
  - 只是 PC 使用 -> 建议 NTFS
  - 否则 exFAT
    - 性能甚至可能比 NTFS 更好, 并且所有平台都支持

```bash
modprobe ntfs
cat /proc/filesystems | grep ntfs
```

## ntfs-3g

- ntfs-3g 在 OSX 或 Linux 上都有

```bash
# Manual http://www.tuxera.com/community/open-source-ntfs-3g/#tab-1414502373-2-22
# http://www.tuxera.com/community/ntfs-3g-manual/
apk add ntfs-3g ntfs-3g-progs

# 挂载
mount -t ntfs-3g /dev/sda1 /mnt/windows
# 或者
ntfs-3g /dev/disk2 mnt/file

# fstab 方式
echo '/dev/sda1 /mnt/windows ntfs-3g defaults 0 0' > /etc/fstab
mount -a
```
