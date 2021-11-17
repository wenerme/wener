---
title: fio
---

## fio

- fio - I/O benchmark and stress test
- 测试
  - IOPS - 一般 4k-64k 随机
  - 吞吐 - 一般 512k+ 顺序
- 参考
  - [HOWTO](https://github.com/axboe/fio/blob/master/HOWTO)
  - [文档](http://fio.readthedocs.io/en/latest/)
  - [IOPS](https://en.wikipedia.org/wiki/IOPS)
    - HDD IOPS 一般 55-180
    - SSD IOPS 一般 3,000 – 40,000
  - [Fio Output Explained](https://tobert.github.io/post/2014-04-17-fio-output-explained.html)
  - [IO Plumbing tests with FIO](https://blog.purestorage.com/io-plumbing-tests-with-fio/)

| opt             | mean                         |
| --------------- | ---------------------------- |
| filename        | 文件名                       |
| directory       | 文件目录                     |
| name            | Job 名字                     |
| direct          | true 无 io buffer            |
| engine          | 执行引擎                     |
| iodepth         |
| rw              | 读写模式                     |
| bs              | Block size - 默认 4k         |
| size            | Job 处理的文件大小           |
| numjobs         | Job/线程数                   |
| time_based      | 优先满足 runtime 而不是 size |
| runtime         | 运行时长                     |
| group_reporting | numjobs 时分组显示           |
| parse-only      | 只解析选项，不执行           |
| section         | 执行配置中的指定 section     |

- engine
  - sync - 同步，操作等待完成
  - io_uring
  - libaio - Linux AIO
  - http
  - mtd
  - nbd
  - libiscsi
  - nfs
- iodepth
  - 异步 ioengine 一批提交的单元数
  - =queue depth
  - 使用效果取决于 engine
- rw
  - read - 随机写
  - write
  - trim - Linux block devices & SCSI
  - randread - 随机读
  - randwrite
  - randtrim
  - rw,readwrite - 读写混合 - 默认 50/50
  - randrw
  - trimwrite - trim & write

:::caution

- numjobs 不要超过 nproc

:::

```bash
apk add fio

fio --name=sync-4k-w -direct=1 --bs=4k -ioengine sync --numjobs=1 --runtime=60 --size=100m -rw=randwrite
fio --name=sync-4k-r -direct=1 --bs=4k -ioengine sync --numjobs=1 --runtime=60 --size=100m -rw=randread

fio --name=sync-512k-w -direct=1 --bs=512k -ioengine sync --numjobs=1 --runtime=60 --size=100m -rw=randwrite --time_based
fio --name=sync-512k-r -direct=1 --bs=512k -ioengine sync --numjobs=1 --runtime=60 --size=100m -rw=randread --time_based

# 4k 100% Read or 100% Write 100% 4k
fio --filename=/data/test --direct=1 --rw=randrw --refill_buffers --norandommap --randrepeat=0 --bs=4k --size=2g --rwmixread=100 --iodepth=16 --numjobs=16 --runtime=60 --group_reporting --name=4ktest

# 8k 70/30 70% Read, 30% Write 100% 8k
fio --filename=/data/test --rw=randrw --refill_buffers --norandommap --randrepeat=0 --bs=8k --rwmixread=70 --size=2g --iodepth=16 --numjobs=16 --runtime=60 --group_reporting --name=8k7030test

# 测试随机写IOPS
fio -direct=1 -iodepth=128 -rw=randwrite -ioengine=libaio -bs=4k -size=10G -numjobs=1 -runtime=1000 -group_reporting -name=/path/testfile
# 测试随机读IOPS
fio -direct=1 -iodepth=128 -rw=randread -ioengine=libaio -bs=4k -size=10G -numjobs=1 -runtime=1000 -group_reporting -name=/path/testfile
# 测试写吞吐量
fio -direct=1 -iodepth=64 -rw=randwrite -ioengine=libaio -bs=64k -size=10G -numjobs=1 -runtime=1000 -group_reporting -name=/path/testfile
# 测试读吞吐量
fio -direct=1 -iodepth=64 -rw=randread -ioengine=libaio -bs=64k -size=10G -numjobs=1 -runtime=1000 -group_reporting -name=/path/testfile

# fio -iodepth=1 -numjobs=1 -direct=1 -rw=randwrite
fio --name=randwrite --ioengine=libaio --iodepth=1 --rw=randwrite --bs=4k --direct=0 --size=512M --numjobs=2 --runtime=240 --group_reporting

# Sequential Reads – Async mode – 8K block size – Direct IO – 100% Reads
fio --name=seqread --rw=read --direct=1 --ioengine=libaio --bs=8k --numjobs=8 --size=1G --runtime=600  --group_reporting
# Sequential Writes – Async mode – 32K block size – Direct IO – 100% Writes
fio --name=seqwrite --rw=write --direct=1 --ioengine=libaio --bs=32k --numjobs=4 --size=2G --runtime=600 --group_reporting
# Random Reads – Async mode – 8K block size – Direct IO – 100% Reads
fio --name=randread --rw=randread --direct=1 --ioengine=libaio --bs=8k --numjobs=16 --size=1G --runtime=600 --group_reporting
# Random Writes – Async mode – 64K block size – Direct IO – 100% Writes
fio --name=randwrite --rw=randwrite --direct=1 --ioengine=libaio --bs=64k --numjobs=8 --size=512m --runtime=600 --group_reporting
# Random Read/Writes – Async mode – 16K block size – Direct IO – 90% Reads/10% Writes
fio --name=randrw --rw=randrw --direct=1 --ioengine=libaio --bs=16k --numjobs=8 --rwmixread=90 --size=1G --runtime=600 --group_reporting
```

### iodepth vs numjobs

https://unix.stackexchange.com/a/459142/47774

A sequential job with iodepth=2 will submit two sequential IO requests at a time.
A sequential job with numjobs=2 will have two threads, each submitting sequential IO.
