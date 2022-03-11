---
title: memtest
---

# memtest

- [memtest](http://www.memtest.org/)

```bash
curl -LO http://www.memtest.org/download/5.31b/memtest86+-5.31b.iso.zip
unzip memtest86+-5.31b.iso.zip
# macOS
sudo dd bs=4M if=mt531b.iso of=/dev/sdb conv=fdatasync
```


```bash
# 检查部分内存
memtester -p 0xfce20000 64k 128
```
