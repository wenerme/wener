# Bench

## Tips

* https://wiki.archlinux.org/index.php/benchmarking
* http://www.jens-hartmann.at/Fritzmarks/
* https://openbenchmarking.org/
* http://www.phoronix-test-suite.com/
* https://github.com/phoronix-test-suite/phoronix-test-suite

## Disk
IO
顺序读写 （吞吐量，常用单位为MB/s）：文件在硬盘上存储位置是连续的。
适用场景：大文件拷贝（比如视频音乐）。速度即使很高，对数据库性能也没有参考价值。
4K随机读写 （IOPS，常用单位为次）：在硬盘上随机位置读写数据，每次4KB。
适用场景：操作系统运行、软件运行、数据库。


## Network

```bash
# 速度检测
# 服务端
nc -v -v -l -n -p 8000 | pv > /dev/null
# 客户端
time yes | pv |nc -v -v -n 192.168.1.1 8000 >/dev/null
```

## sysbench
* [akopytov/sysbench](https://github.com/akopytov/sysbench)
* 內建测试
  * fileio: a filesystem-level benchmark
  * cpu: a simple CPU benchmark
  * memory: a memory access benchmark
  * threads: a thread-based scheduler benchmark
  * mutex: a POSIX mutex benchmark


```bash
# mac
brew install sysbench --without-mysql

# build from source
git clone --depth=1 https://github.com/akopytov/sysbench
cd sysbench
./autogen.sh
./configure --without-mysql --prefix $PWD/dist
make -j 8
make install

# 默认 --threads=1 --time=10 --warmup-time=0
sysbench cpu run
sysbench cpu run --threads=$(nproc) --warmup-time=10 --time=20
# 查看测试相关帮助
sysbench memory help
# 默认 --memory-block-size=1K --memory-total-size=100G --memory-oper=write --memory-access-mode=seq
sysbench memory run
sysbench memory run --memory-oper=read --memory-access-mode=rnd 
# 默认 --file-num=128 --file-block-size=16384 --file-total-size=2G --file-io-mode=sync --file-rw-ratio=1.5
# --file-test-mode seqwr, seqrewr, seqrd, rndrd, rndwr, rndrw
# --file-io-mode sync,async,mmap
sysbench fileio prepare
sysbench fileio run --file-test-mode=rndwr --threads=$(nproc) --warmup-time=10 --time=20
```

## fio
* fio - I/O benchmark and stress test
* http://git.kernel.dk/cgit/fio/
* https://github.com/axboe/fio
* http://www.storagereview.com/fio_flexible_i_o_tester_synthetic_benchmark
* https://wsgzao.github.io/post/fio/
* http://fio.readthedocs.io/en/latest/
* https://linux.die.net/man/1/fio


```bash
git clone --depth=1 https://github.com/axboe/fio
apk add linux-headers zlib-dev
./configure --prefix=$PWD/dist
make -j 4

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
```
