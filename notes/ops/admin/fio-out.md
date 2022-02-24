---
title: fio 结果
tags:
  - Benchmark
---

# fio 结果

| product             | model              | volumn |      profile |         read | read iops |      write | write iops | note  |
| ------------------- | ------------------ | -----: | -----------: | -----------: | --------- | ---------: | ---------- | ----- |
| SanDisk Ultra Flair | [CZ73]             |        |    rnd4kq1t1 |     4.2 MB/s | 1074      |   1.8 MB/s | 452        |
| ^                   | ^                  |        |  seq512kq1t1 |     108 MB/s | 205       |  15.9 MB/s | 30         |
| SanDisk Ultra Fit   | [CZ430]            |        |    rnd4kq1t1 |     5.4 MB/s | 1312      |   1.4 MB/s | 339        |
| ^                   | ^                  |        |  seq512kq1t1 |     112 MB/s | 212       |  30.5 MB/s | 58         |
| SanDisk Extreme     | [CZ810]            |        |    rnd4kq1t1 |    10.0 MB/s | 2451      | **5 KB/s** | 1          |
| ^                   | ^                  |        |  seq512kq1t1 | **360 MB/s** | 686       |  83.3 MB/s | 158        |
| Intel SSD 660P      | [SSDPEKNW512G8]    |   512G |    rnd4kq1t1 |    63.2 MB/s | 15.4k     |   288 MB/s | 73.6k      |
| ^                   | ^                  |        |  seq512kq1t1 |    1047 MB/s | 1996      |   929 MB/s | 1771       |
| KIOXIA              | [EXCERIA SATA SSD] |   240G |    rnd4kq1t1 |     34.9MB/s | 8525      |   29.8MB/s | 7275       |
| ^                   | ^                  |        |   rnd4kq32t4 |      238MB/s | 58.2k     |   52.5MB/s | 12.8k      |
| ^                   | ^                  |        |    seq1mq1t1 |      296MB/s | 282       |   25.9MB/s | 24         |
| Lexar               | [LJDS47]           |    64G |    rnd4kq1t1 |      17 MB/s | 4153      |   8.5 MB/s | 2131       |
| ^                   | ^                  |        |  rnd128kq1t1 |    98.3 MB/s | 749       |   17.6MB/s | 134        |
| ^                   | ^                  |        |    seq1mq1t1 |     178 MB/s | 169       |  26.6 MB/s | 25         |
| ^                   | ^                  |        |  seq128kq1t1 |     240 MB/s | 1829      |  25.8 MB/s | 196        | exfat |
| ^                   | ^                  |        |    seq1mq1t1 |     247 MB/s | 235       |   26.5MB/s | 25         | exfat |
| Lexar               | [LJDM45]           |    64G |    rnd4kq1t1 |     13.4MB/s | 3277      |   8709kB/s | 2126       | exfat |
|                     |                    |        |  rnd128kq1t1 |     62.4MB/s | 476       |   17.7MB/s | 135        | exfat |
|                     |                    |        |    seq1mq1t1 |      177MB/s | 168       |   25.3MB/s | 24         | exfat |
|                     |                    |        | seq128kq32t4 |      185MB/s | 1412      |   26.2MB/s | 199        | exfat |
|                     |                    |        |   seq1mq32t1 |      185MB/s | 176       |   25.5MB/s | 24         | exfat |

:::tip

- IOPS=BandWidth/BlockSize
  - 例如 4MB/s ÷ 4KB = 1000 io/s
- 随机关心 IOPS，顺序关心 带宽
  - IOPS - IO/s - 随机、小块 4-8k
  - 带宽/吞吐 - MB/s - 顺序、大块 >= 64k
- 测试默认 ext4 - 测试 raw disk 速率意义不大
  - 因此测试结果与官方有一定偏差
  - ext4 一般默认 blocksize 为 4k
- 闪存盘一般 物理 blocksize 为 128KB - block 内 page 2KB, 不支持随机写
  - 因此 4k 随机/顺序 都会慢
  - extfat 顺序能测出逻辑最大性能 - blocksize 默认 128 KB
- 测试的 BW 和 IOPS 只能作为 **基本参考**
  - 影响因素还包括
    - 更长的持续 IO 时间
    - latency
    - latency 分布
    - 温度

:::

[cz73]: https://www.westerndigital.com/products/usb-flash-drives/sandisk-ultra-flair-usb-3-0
[cz430]: https://www.westerndigital.com/products/usb-flash-drives/sandisk-ultra-fit-usb-3-1
[cz810]: https://www.westerndigital.com/products/usb-flash-drives/sandisk-extreme-go-usb-3-2
[cz880]: https://www.westerndigital.com/products/usb-flash-drives/sandisk-extreme-pro-usb-3-2
[ssdpeknw512g8]: https://www.intel.com/content/www/us/en/products/sku/149405/intel-ssd-660p-series-512gb-m-2-80mm-pcie-3-0-x4-3d2-qlc/specifications.html
[ljds47]: https://www.lexar.com/product/lexar-jumpdrive-s47-usb-3-1-flash-drive/
[ljdm45]: https://www.lexar.com/product/lexar-jumpdrive-m45-usb-3-1-flash-drive/
[exceria sata ssd]: https://personal.kioxia.com/en-emea/ssd/exceria-sata-ssd.html

- CZ73 - USB 3.0
- CZ430 - USB 3.1
- CZ810 - USB 3.2 Gen 1
  - 定位特殊，速率差距很大
- LJDM45
  - 标称速度 250MB - 同 LJDS47
  - 但速度压不上去
- SSDPEKNW512G8 - 3D2 QLC
- KIOXIA-EXCERIA SATA SSD
  - BiCS FLASH™ TLC
- SanDisk 是 WD 旗下品牌 - 2016 收购
- SSD 的 IOPS 和容量相关
- CrystalDiskMark 常见测试
  - RND4KQ1T1
  - RND4KQ32T4 - Random 4K Queue 32 Thread 4
  - SEQ1MQ1T1
  - SEQ1MQ8T1 - Sequential 1M
  - SEQ1MQ32T1 - SSD 测 BW 常用
  - RND4KQ32T8 - SSD 测 IOPS 常用

| product                      | interface |    TBW |
| ---------------------------- | --------- | -----: |
| KIOXIA EXCERIA SATA SSD      | SATA      | 240 TB |
| KIOXIA EXCERIA SSD           | NVMe      | 400 TB |
| KIOXIA EXCERIA PLUS SSD      | NVMe      | 800 TB |
| Intel SSD 660P SSDPEKNW512G8 | NVMe      | 100 TB |

```bash
# echo seq512k-w seq512k-r | tr ' ' '\n'  | xargs -I {} fio fio.conf --section {} --output {}.out
# egrep '^.*?: \(groupid'  *.out -A 1
fio fio.conf --output fio.out --section={rnd4k,rnd128k,seq1m}-{w,r}
egrep '^.*?: \(groupid' fio.out -A 1
```

```ini title="fio.conf"
[global]
direct=1
ioengine=sync
numjobs=1
runtime=60
size=1g
time_based
filename=fio-file
group_reporting
stonewall

[rnd4k-w]
bs=4k
rw=randwrite

[rnd4k-r]
bs=4k
rw=randread

[rnd128k-w]
bs=128k
rw=randwrite

[rnd128k-r]
bs=128k
rw=randread

[rnd4kq32t4-w]
bs=4k
rw=randwrite
ioengine=io_uring
iodepth=32
numjobs=4

[rnd4kq32t4-r]
bs=4k
rw=randread
ioengine=io_uring
iodepth=32
numjobs=4

[seq128k-w]
bs=128k
rw=write

[seq128k-r]
bs=128k
rw=read

[seq128kq32t4-w]
bs=128k
rw=write
ioengine=io_uring
iodepth=32
numjobs=4

[seq128kq32t4-r]
bs=128k
rw=read
ioengine=io_uring
iodepth=32
numjobs=4

[seq512k-w]
bs=512k
rw=write

[seq512k-r]
bs=512k
rw=read

[seq1m-w]
bs=1m
rw=write

[seq1m-r]
bs=1m
rw=read

[seq1m-w]
bs=1m
rw=write

[seq1mq32t1-r]
bs=1m
rw=read
ioengine=io_uring
iodepth=32
[seq1mq32t1-w]
bs=1m
rw=write
ioengine=io_uring
iodepth=32
```

- 根据情况修改 size
  - usb 的时候小点 - 200m-500m - 准备时间很长
  - ssd 的时候大点 - 2g-10g
