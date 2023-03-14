---
title: hdparam
---

# hdparam

```bash
hdparm -I /dev/sda  # 磁盘信息
hdparm -Tt /dev/sda # 磁盘性能
```

| hdparm   | for                           |
| -------- | ----------------------------- |
| -t       | device reads test             |
| -T       | cache reads test              |
| -W       | toggle write cache            |
| -B 0-255 | Advanced Power Management     |
| -S 1-240 | standby (spindown) timeout    |
| -M       | Automatic Acoustic Management |

- https://man7.org/linux/man-pages/man8/hdparm.8.html
- https://wiki.archlinux.org/title/hdparm

# FAQ

## HDIO_GET_IDENTITY failed: Not a tty

## SG_IO: bad/missing sense data

```
SG_IO: bad/missing sense data, sb[]:  70 00 05 00 00 00 00 18 00 00 00 00 20 00 00 c0 00 00 00 00 f8 21 00 00 00 00 00 00 00 00 00 00
```

```bash
sg_decode_sense 70 00 05 00 00 00 00 18 00 00 00 00 20 00 00 c0 00 00 00 00 f8 21 00 00 00 00 00 00 00 00 00 00
```
