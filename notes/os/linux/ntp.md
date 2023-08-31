---
title: NTP
---

# NTP

- 推荐使用 [chrony](./chrony.md)
- busybox 的 ntpd 能用
- pools
  - https://www.pool.ntp.org/zone/hk
  - pool.ntp.org
  - time.nist.gov

## adjtimex

- ppm - parts per million
  - 1ppm - system’s clock thinks it has advanced 1 second, it has actually advanced by 1.000001 seconds relative to true time
    - 0.1ppm
- [adjtime.3](https://man7.org/linux/man-pages/man3/adjtime.3.html)

```bash
adjtimex # 系统同步状态
```

```
    mode:         0
-o  offset:       0 us
-f  freq.adjust:  515115 (65536 = 1ppm)
    maxerror:     88986
    esterror:     323
    status:       0 ()
-p  timeconstant: 2
    precision:    1 us
    tolerance:    32768000
-t  tick:         10000 us
    time.tv_sec:  1656320448
    time.tv_usec: 568452
    return value: 0 (clock synchronized)
```
