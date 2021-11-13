---
title: fio 结果
---

# fio 结果

| product             | model           | profile   |     write | write iops | read     | read iops |
| ------------------- | --------------- | --------- | --------: | ---------- | -------- | --------- |
| SanDisk Ultra Flair | [CZ73]          | sync-4k   |  1.8 MB/s | 452        | 4.2 MB/s | 1074      |
| SanDisk Ultra Flair | CZ73            | sync-512k | 15.9 MB/s | 30         | 108 MB/s | 205       |
| SanDisk Ultra Fit   | [CZ430]         | sync-4k   |  1.4 MB/s | 339        | 5.4 MB/s | 1312      |
| SanDisk Ultra Fit   | CZ430           | sync-512k |  30.5MB/s | 58         | 112MB/s  | 212       |
| Intel SSD 660P      | [SSDPEKNW512G8] | sync-4k   |  288MiB/s | 73.6k      | 63.2MB/s | 15.4k     |
| Intel SSD 660P      | SSDPEKNW512G8   | sync-512k |   929MB/s | 1771       | 1047MB/s | 1996      |

[cz73]: https://www.westerndigital.com/products/usb-flash-drives/sandisk-ultra-flair-usb-3-0
[cz430]: https://www.westerndigital.com/products/usb-flash-drives/sandisk-ultra-fit-usb-3-1
[ssdpeknw512g8]: https://www.intel.com/content/www/us/en/products/sku/149405/intel-ssd-660p-series-512gb-m-2-80mm-pcie-3-0-x4-3d2-qlc/specifications.html

- SanDisk 是 WD 旗下品牌

```bash
echo sync-512k-w sync-512k-r | tr ' ' '\n'  | xargs -I {} fio fio.conf --section {} --output {}.out
egrep '^.*?: \(groupid'  *.out -A 1
```

```ini title="fio.conf"
[global]
direct=1
ioengine=sync
numjobs=1
runtime=60
size=2g
time_based
filename=fio-file

[sync-4k-w]
bs=4k
rw=randwrite
[sync-4k-r]
bs=4k
rw=randread

[sync-512k-w]
bs=512k
rw=randwrite
[sync-512k-r]
bs=512k
rw=randread
```

- 根据情况修改 size
  - usb 的时候小点 - 准备时间很长
  - ssd 的时候大点

## SanDisk Ultra Fit - CZ430

### sync-4k-w

```
sync-4k-w: (groupid=0, jobs=1): err= 0: pid=23737: Sat Nov 13 13:15:13 2021
  write: IOPS=339, BW=1359KiB/s (1391kB/s)(79.6MiB/60002msec); 0 zone resets
    clat (usec): min=1682, max=1658.5k, avg=2932.47, stdev=21959.95
     lat (usec): min=1682, max=1658.5k, avg=2933.50, stdev=21959.95
    clat percentiles (usec):
     |  1.00th=[   1762],  5.00th=[   1795], 10.00th=[   1811],
     | 20.00th=[   1827], 30.00th=[   1844], 40.00th=[   1860],
     | 50.00th=[   1876], 60.00th=[   1893], 70.00th=[   1909],
     | 80.00th=[   1926], 90.00th=[   2212], 95.00th=[   7046],
     | 99.00th=[   7373], 99.50th=[   7504], 99.90th=[ 106431],
     | 99.95th=[ 346031], 99.99th=[1035994]
   bw (  KiB/s): min=    8, max= 1768, per=100.00%, avg=1444.50, stdev=567.37, samples=112
   iops        : min=    2, max=  442, avg=361.12, stdev=141.84, samples=112
  lat (msec)   : 2=87.52%, 4=2.79%, 10=9.41%, 20=0.11%, 50=0.04%
  lat (msec)   : 100=0.02%, 250=0.04%, 500=0.04%, 750=0.01%, 1000=0.01%
  lat (msec)   : 2000=0.01%
  cpu          : usr=0.77%, sys=1.68%, ctx=20391, majf=0, minf=11
  IO depths    : 1=100.0%, 2=0.0%, 4=0.0%, 8=0.0%, 16=0.0%, 32=0.0%, >=64=0.0%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     issued rwts: total=0,20380,0,0 short=0,0,0,0 dropped=0,0,0,0
     latency   : target=0, window=0, percentile=100.00%, depth=1

Run status group 0 (all jobs):
  WRITE: bw=1359KiB/s (1391kB/s), 1359KiB/s-1359KiB/s (1391kB/s-1391kB/s), io=79.6MiB (83.5MB), run=60002-60002msec
```

### sync-4k-r

```
sync-4k-r: (groupid=0, jobs=1): err= 0: pid=25084: Sat Nov 13 13:17:41 2021
  read: IOPS=1312, BW=5250KiB/s (5376kB/s)(308MiB/60001msec)
    clat (usec): min=529, max=8784, avg=754.96, stdev=130.10
     lat (usec): min=529, max=8785, avg=755.43, stdev=130.14
    clat percentiles (usec):
     |  1.00th=[  586],  5.00th=[  627], 10.00th=[  676], 20.00th=[  693],
     | 30.00th=[  709], 40.00th=[  717], 50.00th=[  734], 60.00th=[  742],
     | 70.00th=[  758], 80.00th=[  783], 90.00th=[  857], 95.00th=[ 1012],
     | 99.00th=[ 1172], 99.50th=[ 1205], 99.90th=[ 1532], 99.95th=[ 2311],
     | 99.99th=[ 4146]
   bw (  KiB/s): min= 5072, max= 6176, per=100.00%, avg=5253.11, stdev=250.85, samples=119
   iops        : min= 1268, max= 1544, avg=1313.28, stdev=62.71, samples=119
  lat (usec)   : 750=65.60%, 1000=28.79%
  lat (msec)   : 2=5.54%, 4=0.05%, 10=0.01%
  cpu          : usr=1.37%, sys=4.08%, ctx=78760, majf=0, minf=11
  IO depths    : 1=100.0%, 2=0.0%, 4=0.0%, 8=0.0%, 16=0.0%, 32=0.0%, >=64=0.0%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     issued rwts: total=78749,0,0,0 short=0,0,0,0 dropped=0,0,0,0
     latency   : target=0, window=0, percentile=100.00%, depth=1

Run status group 0 (all jobs):
   READ: bw=5250KiB/s (5376kB/s), 5250KiB/s-5250KiB/s (5376kB/s-5376kB/s), io=308MiB (323MB), run=60001-60001msec
```

### sync-512k-w

```
sync-512k-w: (groupid=0, jobs=1): err= 0: pid=32576: Sat Nov 13 13:31:24 2021
  write: IOPS=58, BW=29.0MiB/s (30.5MB/s)(1744MiB/60036msec); 0 zone resets
    clat (msec): min=6, max=760, avg=17.17, stdev=35.11
     lat (msec): min=6, max=760, avg=17.20, stdev=35.11
    clat percentiles (msec):
     |  1.00th=[    7],  5.00th=[    7], 10.00th=[    7], 20.00th=[    7],
     | 30.00th=[    7], 40.00th=[    7], 50.00th=[    7], 60.00th=[    7],
     | 70.00th=[    7], 80.00th=[    8], 90.00th=[   61], 95.00th=[   83],
     | 99.00th=[  169], 99.50th=[  201], 99.90th=[  236], 99.95th=[  368],
     | 99.99th=[  760]
   bw (  KiB/s): min= 1024, max=66560, per=100.00%, avg=29979.97, stdev=24573.08, samples=119
   iops        : min=    2, max=  130, avg=58.55, stdev=47.99, samples=119
  lat (msec)   : 10=82.56%, 20=6.62%, 50=0.54%, 100=5.71%, 250=4.47%
  lat (msec)   : 500=0.06%, 1000=0.03%
  cpu          : usr=0.36%, sys=0.47%, ctx=3500, majf=0, minf=10
  IO depths    : 1=100.0%, 2=0.0%, 4=0.0%, 8=0.0%, 16=0.0%, 32=0.0%, >=64=0.0%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     issued rwts: total=0,3487,0,0 short=0,0,0,0 dropped=0,0,0,0
     latency   : target=0, window=0, percentile=100.00%, depth=1

Run status group 0 (all jobs):
  WRITE: bw=29.0MiB/s (30.5MB/s), 29.0MiB/s-29.0MiB/s (30.5MB/s-30.5MB/s), io=1744MiB (1828MB), run=60036-60036msec
```

### sync-512k-r

```
sync-512k-r: (groupid=0, jobs=1): err= 0: pid=837: Sat Nov 13 13:32:44 2021
  read: IOPS=212, BW=106MiB/s (112MB/s)(6390MiB/60003msec)
    clat (usec): min=3541, max=8988, avg=4682.12, stdev=454.04
     lat (usec): min=3542, max=8989, avg=4683.05, stdev=454.08
    clat percentiles (usec):
     |  1.00th=[ 4146],  5.00th=[ 4178], 10.00th=[ 4228], 20.00th=[ 4228],
     | 30.00th=[ 4293], 40.00th=[ 4293], 50.00th=[ 4490], 60.00th=[ 5014],
     | 70.00th=[ 5080], 80.00th=[ 5145], 90.00th=[ 5211], 95.00th=[ 5276],
     | 99.00th=[ 5604], 99.50th=[ 5800], 99.90th=[ 6259], 99.95th=[ 6718],
     | 99.99th=[ 8029]
   bw (  KiB/s): min=98304, max=120832, per=100.00%, avg=109215.19, stdev=9848.46, samples=119
   iops        : min=  192, max=  236, avg=213.31, stdev=19.24, samples=119
  lat (msec)   : 4=0.25%, 10=99.75%
  cpu          : usr=0.43%, sys=1.77%, ctx=12785, majf=0, minf=137
  IO depths    : 1=100.0%, 2=0.0%, 4=0.0%, 8=0.0%, 16=0.0%, 32=0.0%, >=64=0.0%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     issued rwts: total=12779,0,0,0 short=0,0,0,0 dropped=0,0,0,0
     latency   : target=0, window=0, percentile=100.00%, depth=1

Run status group 0 (all jobs):
   READ: bw=106MiB/s (112MB/s), 106MiB/s-106MiB/s (112MB/s-112MB/s), io=6390MiB (6700MB), run=60003-60003msec
```

## SanDisk Ultra Flair - CZ73

### sync-4k-w

```
sync-4k-w: (groupid=0, jobs=1): err= 0: pid=13652: Sat Nov 13 12:56:52 2021
  write: IOPS=452, BW=1809KiB/s (1852kB/s)(106MiB/60001msec); 0 zone resets
    clat (usec): min=1025, max=82479, avg=2200.08, stdev=2049.36
     lat (usec): min=1025, max=82480, avg=2201.05, stdev=2049.38
    clat percentiles (usec):
     |  1.00th=[ 1074],  5.00th=[ 1106], 10.00th=[ 1156], 20.00th=[ 1205],
     | 30.00th=[ 1876], 40.00th=[ 1893], 50.00th=[ 1926], 60.00th=[ 1942],
     | 70.00th=[ 1958], 80.00th=[ 1975], 90.00th=[ 2089], 95.00th=[ 7242],
     | 99.00th=[ 7635], 99.50th=[ 7701], 99.90th=[10421], 99.95th=[30540],
     | 99.99th=[82314]
   bw (  KiB/s): min=  816, max= 2856, per=100.00%, avg=1811.46, stdev=427.49, samples=119
   iops        : min=  204, max=  714, avg=452.87, stdev=106.87, samples=119
  lat (msec)   : 2=84.49%, 4=6.54%, 10=8.86%, 20=0.04%, 50=0.03%
  lat (msec)   : 100=0.04%
  cpu          : usr=1.02%, sys=1.99%, ctx=27148, majf=0, minf=12
  IO depths    : 1=100.0%, 2=0.0%, 4=0.0%, 8=0.0%, 16=0.0%, 32=0.0%, >=64=0.0%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     issued rwts: total=0,27136,0,0 short=0,0,0,0 dropped=0,0,0,0
     latency   : target=0, window=0, percentile=100.00%, depth=1

Run status group 0 (all jobs):
  WRITE: bw=1809KiB/s (1852kB/s), 1809KiB/s-1809KiB/s (1852kB/s-1852kB/s), io=106MiB (111MB), run=60001-60001msec
```

### sync-4k-r

```
sync-4k-r: (groupid=0, jobs=1): err= 0: pid=14214: Sat Nov 13 12:57:52 2021
  read: IOPS=1074, BW=4299KiB/s (4402kB/s)(252MiB/60001msec)
    clat (usec): min=473, max=12700, avg=923.04, stdev=229.38
     lat (usec): min=473, max=12701, avg=923.57, stdev=229.42
    clat percentiles (usec):
     |  1.00th=[  519],  5.00th=[  553], 10.00th=[  791], 20.00th=[  840],
     | 30.00th=[  857], 40.00th=[  873], 50.00th=[  881], 60.00th=[  898],
     | 70.00th=[  914], 80.00th=[  955], 90.00th=[ 1254], 95.00th=[ 1369],
     | 99.00th=[ 1549], 99.50th=[ 1582], 99.90th=[ 1844], 99.95th=[ 2802],
     | 99.99th=[ 5538]
   bw (  KiB/s): min= 4048, max= 6744, per=100.00%, avg=4302.79, stdev=615.16, samples=119
   iops        : min= 1012, max= 1686, avg=1075.70, stdev=153.79, samples=119
  lat (usec)   : 500=0.12%, 750=9.28%, 1000=73.54%
  lat (msec)   : 2=16.97%, 4=0.07%, 10=0.02%, 20=0.01%
  cpu          : usr=1.35%, sys=3.48%, ctx=64490, majf=0, minf=11
  IO depths    : 1=100.0%, 2=0.0%, 4=0.0%, 8=0.0%, 16=0.0%, 32=0.0%, >=64=0.0%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     issued rwts: total=64481,0,0,0 short=0,0,0,0 dropped=0,0,0,0
     latency   : target=0, window=0, percentile=100.00%, depth=1

Run status group 0 (all jobs):
   READ: bw=4299KiB/s (4402kB/s), 4299KiB/s-4299KiB/s (4402kB/s-4402kB/s), io=252MiB (264MB), run=60001-60001msec
```

### sync-512k-w

```
sync-512k-w: (groupid=0, jobs=1): err= 0: pid=11102: Sat Nov 13 12:52:09 2021
  write: IOPS=30, BW=15.1MiB/s (15.9MB/s)(910MiB/60035msec); 0 zone resets
    clat (msec): min=6, max=1716, avg=32.96, stdev=97.56
     lat (msec): min=6, max=1716, avg=32.99, stdev=97.56
    clat percentiles (msec):
     |  1.00th=[    7],  5.00th=[    7], 10.00th=[    7], 20.00th=[    7],
     | 30.00th=[    7], 40.00th=[    7], 50.00th=[    7], 60.00th=[    8],
     | 70.00th=[    8], 80.00th=[   13], 90.00th=[   74], 95.00th=[  146],
     | 99.00th=[  456], 99.50th=[  709], 99.90th=[ 1502], 99.95th=[ 1720],
     | 99.99th=[ 1720]
   bw (  KiB/s): min= 1024, max=61440, per=100.00%, avg=17051.01, stdev=21374.65, samples=109
   iops        : min=    2, max=  120, avg=33.30, stdev=41.75, samples=109
  lat (msec)   : 10=77.41%, 20=5.83%, 50=0.77%, 100=7.48%, 250=6.65%
  lat (msec)   : 500=0.99%, 750=0.44%, 1000=0.27%, 2000=0.16%
  cpu          : usr=0.17%, sys=0.23%, ctx=1830, majf=0, minf=10
  IO depths    : 1=100.0%, 2=0.0%, 4=0.0%, 8=0.0%, 16=0.0%, 32=0.0%, >=64=0.0%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     issued rwts: total=0,1819,0,0 short=0,0,0,0 dropped=0,0,0,0
     latency   : target=0, window=0, percentile=100.00%, depth=1

Run status group 0 (all jobs):
  WRITE: bw=15.1MiB/s (15.9MB/s), 15.1MiB/s-15.1MiB/s (15.9MB/s-15.9MB/s), io=910MiB (954MB), run=60035-60035msec
```

### sync-512k-r

```
sync-512k-r: (groupid=0, jobs=1): err= 0: pid=12204: Sat Nov 13 12:54:11 2021
  read: IOPS=205, BW=103MiB/s (108MB/s)(6161MiB/60004msec)
    clat (usec): min=3394, max=9811, avg=4857.53, stdev=1232.78
     lat (usec): min=3394, max=9813, avg=4858.40, stdev=1232.80
    clat percentiles (usec):
     |  1.00th=[ 3654],  5.00th=[ 3654], 10.00th=[ 3687], 20.00th=[ 3752],
     | 30.00th=[ 3752], 40.00th=[ 3818], 50.00th=[ 3916], 60.00th=[ 6128],
     | 70.00th=[ 6194], 80.00th=[ 6194], 90.00th=[ 6259], 95.00th=[ 6390],
     | 99.00th=[ 6783], 99.50th=[ 7046], 99.90th=[ 7308], 99.95th=[ 8160],
     | 99.99th=[ 9634]
   bw (  KiB/s): min=79872, max=137216, per=100.00%, avg=105385.95, stdev=26333.90, samples=119
   iops        : min=  156, max=  268, avg=205.83, stdev=51.43, samples=119
  lat (msec)   : 4=52.59%, 10=47.41%
  cpu          : usr=0.41%, sys=1.61%, ctx=12330, majf=0, minf=138
  IO depths    : 1=100.0%, 2=0.0%, 4=0.0%, 8=0.0%, 16=0.0%, 32=0.0%, >=64=0.0%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     issued rwts: total=12321,0,0,0 short=0,0,0,0 dropped=0,0,0,0
     latency   : target=0, window=0, percentile=100.00%, depth=1

Run status group 0 (all jobs):
   READ: bw=103MiB/s (108MB/s), 103MiB/s-103MiB/s (108MB/s-108MB/s), io=6161MiB (6460MB), run=60004-60004msec
```
