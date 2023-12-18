---
title: chrony
---

# chrony

:::caution

- 注意配置 minpoll - 否则可能导致系统时间不准

:::

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

```conf title=/etc/chrony/chrony.conf
# 强制每 2^8=256 秒同步一次
server pool.ntp.org minpoll 8
```

## chrony.conf

- `server hostname [option]`
  - minpoll=6
    - `-6 < 24`
    - 2^6=64 seconds
  - maxpoll=10
    - 2^10=1024 seconds
- `pool name [options]`
  - 类似 server，会解析为多个 server
  - 所有 server 参数都可以用于 pool
  - maxsources=4
    - 限制取的 source 数量

**默认**

```
pool pool.ntp.org iburst
initstepslew 10 pool.ntp.org
driftfile /var/lib/chrony/chrony.drift
rtcsync
cmdport 0
```
