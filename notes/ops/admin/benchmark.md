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

| hdparm   | for                           |
| -------- | ----------------------------- |
| -t       | device reads test             |
| -T       | cache reads test              |
| -W       | toggle write cache            |
| -B 0-255 | Advanced Power Management     |
| -S 1-240 | standby (spindown) timeout    |
| -M       | Automatic Acoustic Management |

- https://man7.org/linux/man-pages/man8/hdparm.8.html
- https://wiki.archlinux.org/title/hdparm
- Tools
  - https://www.coker.com.au/bonnie++/
    -  hard drive and file system performance
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

## cryptsetup benchmark

```
# alpine hvf
# ==========
# Tests are approximate using memory only (no storage IO).
PBKDF2-sha1       684449 iterations per second for 256-bit key
PBKDF2-sha256     981812 iterations per second for 256-bit key
PBKDF2-sha512     840205 iterations per second for 256-bit key
PBKDF2-ripemd160  476625 iterations per second for 256-bit key
PBKDF2-whirlpool  385505 iterations per second for 256-bit key
#     Algorithm | Key |  Encryption |  Decryption
        aes-cbc   128b   211.4 MiB/s   252.4 MiB/s
    serpent-cbc   128b    75.2 MiB/s   308.4 MiB/s
    twofish-cbc   128b   177.4 MiB/s   314.0 MiB/s
        aes-cbc   256b   162.9 MiB/s   180.3 MiB/s
    serpent-cbc   256b    76.0 MiB/s   300.5 MiB/s
    twofish-cbc   256b   169.1 MiB/s   264.9 MiB/s
        aes-xts   256b   228.3 MiB/s   235.1 MiB/s
    serpent-xts   256b   278.3 MiB/s   310.7 MiB/s
    twofish-xts   256b   315.6 MiB/s   308.0 MiB/s
        aes-xts   512b   179.5 MiB/s   186.7 MiB/s
    serpent-xts   512b   292.1 MiB/s   301.8 MiB/s
    twofish-xts   512b   310.6 MiB/s   305.4 MiB/s
```

## hdparam

### SG_IO: bad/missing sense data

```
SG_IO: bad/missing sense data, sb[]:  70 00 05 00 00 00 00 18 00 00 00 00 20 00 00 c0 00 00 00 00 f8 21 00 00 00 00 00 00 00 00 00 00
```

```bash
sg_decode_sense 70 00 05 00 00 00 00 18 00 00 00 00 20 00 00 c0 00 00 00 00 f8 21 00 00 00 00 00 00 00 00 00 00
```
