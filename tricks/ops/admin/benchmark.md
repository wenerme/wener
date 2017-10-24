# Bench

## Tips

* https://wiki.archlinux.org/index.php/benchmarking
* http://www.jens-hartmann.at/Fritzmarks/
* https://openbenchmarking.org/
* http://www.phoronix-test-suite.com/
* https://github.com/phoronix-test-suite/phoronix-test-suite

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
./configure --without-mysql
make -j 8

# cheat sheet
sysbench cpu run
```

## fio
* fio - I/O benchmark and stress test
* http://git.kernel.dk/cgit/fio/
* https://github.com/axboe/fio

```bash
# 测试随机写IOPS
fio -direct=1 -iodepth=128 -rw=randwrite -ioengine=libaio -bs=4k -size=10G -numjobs=1 -runtime=1000 -group_reporting -name=/path/testfile
# 测试随机读IOPS
fio -direct=1 -iodepth=128 -rw=randread -ioengine=libaio -bs=4k -size=10G -numjobs=1 -runtime=1000 -group_reporting -name=/path/testfile
# 测试写吞吐量
fio -direct=1 -iodepth=64 -rw=randwrite -ioengine=libaio -bs=64k -size=10G -numjobs=1 -runtime=1000 -group_reporting -name=/path/testfile
# 测试读吞吐量
fio -direct=1 -iodepth=64 -rw=randread -ioengine=libaio -bs=64k -size=10G -numjobs=1 -runtime=1000 -group_reporting -name=/path/testfile
```
