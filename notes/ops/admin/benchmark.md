---
title: Benchmark
---

# Benchmark

- https://wiki.archlinux.org/index.php/benchmarking
- http://www.jens-hartmann.at/Fritzmarks/
- https://openbenchmarking.org/
- http://www.phoronix-test-suite.com/
- https://github.com/phoronix-test-suite/phoronix-test-suite
- https://browser.geekbench.com/

## Disk

- 场景
  - 顺序读写 （吞吐量，常用单位为 MB/s）：文件在硬盘上存储位置是连续的。
    - 适用场景：大文件拷贝（比如视频音乐）。速度即使很高，对数据库性能也没有参考价值。
  - 4K 随机读写 （IOPS，常用单位为次）：在硬盘上随机位置读写数据，每次 4KB。
    - 适用场景：操作系统运行、软件运行、数据库。
- 复杂压测考虑使用 [fio](#fio)

```bash
apk add hdparm

# 简单的文件写入性能
# 因为写入的 0 需要注意底层系统是否会进行压缩
dd if=/dev/zero of=test conv=fdatasync bs=384k count=1k status=progress
rm -f test

hdparm -I /dev/sda  # 磁盘信息
hdparm -Tt /dev/sda # 磁盘性能

cd "/usr/local/share/ca-certificates" && curl "https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem" | csplit -f "rds-" - '/-----BEGIN CERTIFICATE-----/' '{*}'
```

- Tools
  - https://www.coker.com.au/bonnie++/
    - hard drive and file system performance
  - https://github.com/benschweizer/iops
- block
  - http://www.iometer.org/
- by dd
  - https://romanrm.net/dd-benchmark
- pm-utils
  - pm-suspend

## http

ab
https://github.com/rakyll/hey
https://github.com/JoeDog/siege

## Network

```bash
# 速度检测
# 服务端
nc -v -v -l -n -p 8000 | pv > /dev/null
# 客户端
time yes | pv | nc -v -v -n 192.168.1.1 8000 > /dev/null

# 简单的 TCP/IP 延时测试
# 服务端
nc -v -v -n -k -l 8000 | pv > /dev/null
# 客户端
# 计算接收和发送时间
nmap --packet-trace -p 8000 192.168.1.2

# qperf
# ==========
apk add --no-cache -X http://mirrors.aliyun.com/alpine/edge/testing qperf
# 服务端
qperf
# 客户端
# _bw 带宽, _lat 延迟, 协议支持 rds, sctp, sdp, tcp, udp
qperf 192.168.2.2 tcp_bw tcp_lat
# 万兆 tcp_bw: 1.12 GB/sec tcp_lat: 23.9 us
# 千兆 tcp_bw: 117 MB/sec tcp_lat: 41.6 us

# iperf
# ==========
# https://iperf.fr/
apk add iperf3
iperf3 -s
iperf3 -c 192.168.1.2
```

## sysbench

- [akopytov/sysbench](https://github.com/akopytov/sysbench)
- 內建测试
  - fileio: a filesystem-level benchmark
  - cpu: a simple CPU benchmark
  - memory: a memory access benchmark
  - threads: a thread-based scheduler benchmark
  - mutex: a POSIX mutex benchmark

```bash
# macOS
brew install sysbench --without-mysql
# AlpineLinux
apk add sysbench

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

## cryptsetup benchmark

```bash
apk add cryptsetup
cryptsetup benchmark
```

### Intel Xeon E5-2660 v2 (20) @ 3.000GHz

```
PBKDF2-sha1       431868 iterations per second for 256-bit key
PBKDF2-sha256     652911 iterations per second for 256-bit key
PBKDF2-sha512     451972 iterations per second for 256-bit key
PBKDF2-ripemd160  309497 iterations per second for 256-bit key
PBKDF2-whirlpool  173146 iterations per second for 256-bit key
argon2i       5 iterations, 1048576 memory, 4 parallel threads (CPUs) for 256-bit key (requested 2000 ms time)
argon2id      5 iterations, 1048576 memory, 4 parallel threads (CPUs) for 256-bit key (requested 2000 ms time)
#     Algorithm |       Key |      Encryption |      Decryption
        aes-cbc        128b       360.1 MiB/s      1103.8 MiB/s
    serpent-cbc        128b        44.6 MiB/s       177.5 MiB/s
    twofish-cbc        128b       108.6 MiB/s       206.2 MiB/s
        aes-cbc        256b       262.2 MiB/s       859.0 MiB/s
    serpent-cbc        256b        51.6 MiB/s       177.1 MiB/s
    twofish-cbc        256b       113.7 MiB/s       202.7 MiB/s
        aes-xts        256b       972.3 MiB/s       967.8 MiB/s
    serpent-xts        256b       165.3 MiB/s       169.1 MiB/s
    twofish-xts        256b       187.9 MiB/s       193.4 MiB/s
        aes-xts        512b       782.2 MiB/s       778.0 MiB/s
    serpent-xts        512b       177.1 MiB/s       168.4 MiB/s
    twofish-xts        512b       190.9 MiB/s       187.9 MiB/s
```

### Intel Xeon E5-2666 v3 (40) @ 3.500GHz

```
PBKDF2-sha1      1046483 iterations per second for 256-bit key
PBKDF2-sha256    1495828 iterations per second for 256-bit key
PBKDF2-sha512    1201117 iterations per second for 256-bit key
PBKDF2-ripemd160  659481 iterations per second for 256-bit key
PBKDF2-whirlpool  450419 iterations per second for 256-bit key
argon2i       4 iterations, 1048576 memory, 4 parallel threads (CPUs) for 256-bit key (requested 2000 ms time)
argon2id      4 iterations, 1048576 memory, 4 parallel threads (CPUs) for 256-bit key (requested 2000 ms time)
#     Algorithm |       Key |      Encryption |      Decryption
        aes-cbc        128b       511.0 MiB/s      2380.8 MiB/s
    serpent-cbc        128b        78.9 MiB/s       532.0 MiB/s
    twofish-cbc        128b       147.6 MiB/s       339.5 MiB/s
        aes-cbc        256b       428.3 MiB/s      1758.8 MiB/s
    serpent-cbc        256b        82.6 MiB/s       513.0 MiB/s
    twofish-cbc        256b       172.7 MiB/s       330.4 MiB/s
        aes-xts        256b      1845.8 MiB/s      2082.5 MiB/s
    serpent-xts        256b       486.0 MiB/s       452.9 MiB/s
    twofish-xts        256b       311.6 MiB/s       312.9 MiB/s
        aes-xts        512b      1670.7 MiB/s      1651.7 MiB/s
    serpent-xts        512b       481.1 MiB/s       459.3 MiB/s
    twofish-xts        512b       311.0 MiB/s       303.7 MiB/s
```

#### stress-ng

```
stress-ng --metrics-brief --cpu $(nproc) -t 1m
```

```
setting to a 60 second run per stressor
dispatching hogs: 40 cpu
stressor       bogo ops real time  usr time  sys time   bogo ops/s     bogo ops/s
                          (secs)    (secs)    (secs)   (real time) (usr+sys time)
cpu             2096887     60.00   2212.41      0.35     34947.11         947.63
successful run completed in 60.01s (1 min, 0.01 secs)
```

### AMD EPYC 7601 (128) @ 2.200GHz

```
PBKDF2-sha1       752206 iterations per second for 256-bit key
PBKDF2-sha256    1353001 iterations per second for 256-bit key
PBKDF2-sha512     644088 iterations per second for 256-bit key
PBKDF2-ripemd160  442064 iterations per second for 256-bit key
PBKDF2-whirlpool  378820 iterations per second for 256-bit key
argon2i       4 iterations, 1048576 memory, 4 parallel threads (CPUs) for 256-bit key (requested 2000 ms time)
argon2id      4 iterations, 1048576 memory, 4 parallel threads (CPUs) for 256-bit key (requested 2000 ms time)
#     Algorithm |       Key |      Encryption |      Decryption
        aes-cbc        128b       872.1 MiB/s      2663.1 MiB/s
    serpent-cbc        128b        80.5 MiB/s       316.1 MiB/s
    twofish-cbc        128b       174.3 MiB/s       320.9 MiB/s
        aes-cbc        256b       697.7 MiB/s      2286.4 MiB/s
    serpent-cbc        256b        88.4 MiB/s       316.0 MiB/s
    twofish-cbc        256b       182.1 MiB/s       320.9 MiB/s
        aes-xts        256b      2222.5 MiB/s      2224.5 MiB/s
    serpent-xts        256b       287.5 MiB/s       290.9 MiB/s
    twofish-xts        256b       293.0 MiB/s       296.7 MiB/s
        aes-xts        512b      1905.1 MiB/s      1897.8 MiB/s
    serpent-xts        512b       294.1 MiB/s       291.3 MiB/s
    twofish-xts        512b       296.6 MiB/s       295.8 MiB/s
```

#### sysbench

```
sysbench cpu run --threads=$(nproc) --cpu-max-prime=20000
sysbench 1.0.20 (using bundled LuaJIT 2.1.0-beta2)

Running the test with following options:
Number of threads: 128
Initializing random number generator from current time


Prime numbers limit: 20000

Initializing worker threads...

Threads started!

CPU speed:
    events per second: 30864.15

General statistics:
    total time:                          10.0046s
    total number of events:              308833

Latency (ms):
         min:                                    1.78
         avg:                                    4.06
         max:                                  114.08
         95th percentile:                        4.10
         sum:                              1253151.81

Threads fairness:
    events (avg/stddev):           2412.7578/60.50
    execution time (avg/stddev):   9.7902/0.15
```

#### stress-ng

```
stress-ng --metrics-brief --cpu $(nproc) -t 1m
```

```
setting to a 60 second run per stressor
dispatching hogs: 128 cpu
stressor       bogo ops real time  usr time  sys time   bogo ops/s     bogo ops/s
                          (secs)    (secs)    (secs)   (real time) (usr+sys time)
cpu             6770087     60.00   7654.65      0.01    112830.66         884.44
successful run completed in 60.03s (1 min, 0.03 secs)
```
