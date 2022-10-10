---
title: perf
---

# Perf

- CPU
  - top
  - htop
- 网络 IO
  - iftop
- 存储 IO
  - iotop
  - iostat
- [Linux kernel profiling with perf](https://perf.wiki.kernel.org/index.php/Tutorial)
- [simplest tool to measure C program cache hit/miss and cpu time](https://stackoverflow.com/q/10082517/1870054)

## perf

```bash
perf record -g -a sleep 10
perf report

perf stat -B dd if=/dev/zero of=/dev/null count=1000000
```
