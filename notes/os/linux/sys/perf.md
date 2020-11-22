# Perf
* CPU
  * top
  * htop
* 网络 IO
  * iftop
* 存储 IO
  * iotop
  * iostat

## perf

```bash
perf record -g -a sleep 10
perf report
```
