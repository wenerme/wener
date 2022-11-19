---
title: NTP
---

# NTP

- 推荐使用 chrony
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

## chrony

- 如果时间差距特别大 chrony 可能不会同步
  - 配置 `makestep 1 -1` 然后重启 - 强制接受同步源
  - 或者 maxdistance
- [chrony.tuxfamily.org](https://chrony.tuxfamily.org/)
  - GPLv2
  - [chrony.conf](https://chrony.tuxfamily.org/doc/3.4/chrony.conf.html)
- [Checking if chrony is Synchronized](https://docs.fedoraproject.org/en-US/Fedora/18/html/System_Administrators_Guide/sect-Checking_if_chrony_is_synchronized.html)

```bash
chronyc tracking    # 查看当前状态
chronyc sources     # 查看同步源
chronyc -a makestep # 主动同步
```

```conf
# 强制每 2^8=256 秒同步一次
server pool.ntp.org minpoll 8
```
