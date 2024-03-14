---
title: libc
---

# libc

- 大部分功能是桥接系统和用户空间
  - [syscall](../sys/syscall.md)
- [musl](./musl/README.md)
- glibc
- [jart/cosmopolitan](https://github.com/jart/cosmopolitan)
  - ISC, C
  - build-once run-anywhere c library
- [Comparison of C/POSIX standard library implementations for Linux](http://www.etalabs.net/compare_libcs.html)
- Linux nolibc
  - https://github.com/torvalds/linux/blob/master/tools/include/nolibc/nolibc.h
  - https://lwn.net/Articles/920158/
    - https://news.ycombinator.com/item?id=34479284

## ld.so

- dynamic linker/loader
- ldd 可用于查看共享库依赖
- 主要功能
  - 加载共享库
  - 符号解析
  - 重定位
  - 处理依赖
  - 运行初始化代码
- LD_LIBRARY_PATH - 搜索路径
- LD_PRELOAD - 预加载共享库
- /etc/ld.so.conf
