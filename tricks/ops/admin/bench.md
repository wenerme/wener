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
