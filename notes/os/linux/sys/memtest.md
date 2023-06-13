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
- https://github.com/jnavila/memtester/blob/master/memtester.8
- MEMTESTER_TEST_MASK
- test_stuck_address
- test_random_value
- test_xor_comparison
- test_sub_comparison
- test_mul_comparison
- test_div_comparison
- test_or_comparison
- test_and_comparison
- test_solidbits_comparison
- test_checkerboard_comparison
- test_blockseq_comparison
- test_walkbits0_comparison
- test_walkbits1_comparison
- test_bitspread_comparison
- test_bitflip_comparison
- test_8bit_wide_random
- test_16bit_wide_random

```bash
apk add memtester
# size iteratio
memtester 30G 1
```

## trying mlock ...too many pages, reducing

用 root 账号
