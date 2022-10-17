---
title: dd
---

# dd

| opt      | default | iflag | val     | for |
| -------- | ------- | ----- | ------- | --- |
| bs=BYTES | 512     |       |         | ibs,obs
| status   |         |       | process |
| seek=N   |
| skip=N   |

- https://man7.org/linux/man-pages/man1/dd.1.html

```bash
dd if=/dev/sda of=/dev/sdb bs=128k status=progress iflag=count_bytes count=600M

# skip 到分区
#dd if=/dev/sda of=/dev/sdb bs=128k status=progress iflag=count_bytes,skip_bytes,seek_bytes seek=9439232 skip=9439232 count=2G
# 直接使用分区 IO
dd if=/dev/sda3 of=/dev/sdb3 bs=128k status=progress
```
