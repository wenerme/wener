---
title: memtest
---

# memtest

- [memtester](https://pyropus.ca./software/memtester/)
- [memtest86+](http://www.memtest.org/)
  - 16-bit, 不支持 UEFI
- [memtest86.com](https://www.memtest86.com/)
  - 商业, 有 free 版本
  - 支持 UEFI

## memtest

```bash
curl -LO http://www.memtest.org/download/5.31b/memtest86+-5.31b.iso.zip
unzip memtest86+-5.31b.iso.zip

sudo dd bs=4M if=mt531b.iso of=/dev/sdb conv=fdatasync
sudo dd bs=4M if=memtest86+-5.31b.bin of=/dev/sdb conv=fdatasync
```

```bash
# 检查部分内存
memtester -p 0xfce20000 64k 128
```

# memtester

- [memtester](https://pyropus.ca./software/memtester/)
- [jnavila/memtester](https://github.com/jnavila/memtester)

```bash
apk add memtester
# size iteratio
memtester 30G 1
```

## trying mlock ...too many pages, reducing

用 root 账号
