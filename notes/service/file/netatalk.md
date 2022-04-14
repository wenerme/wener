---
title: netatalk
---

# netatalk

- [netatalk](http://netatalk.sourceforge.net)
  - 提供 afp 共享
  - 提供 timemachine 备份
- 参考
  - wikipedia [Netatalk](https://en.wikipedia.org/wiki/Netatalk)
  - wikipedia [APF](https://en.wikipedia.org/wiki/Apple_Filing_Protocol) - Apple Filing Protocol
    - CNID - Catalog Node ID
    - 使用 ID 引用, 而非路径
- http://netatalk.sourceforge.net/3.1/htmldocs/configuration.html

```ini
[Global]
mimic model = PowerMac
log level = default:warn
log file = /var/log/afpd.log
hosts allow = 192.168.1.0/24
uam list = uams_guest.so,uams_dhx.so,uams.dhx2.so
# uams_guest.so 允许匿名访问
guest account = www-data

[Homes]
basedir regex = /home

[Media]
path = /data/afp/Media
validusers = wener

[Time Machine]
path = /data/afp/TimeMachine
validusers = wener
time machine = yes

[Public]
path = /data/public

file perm = 0664
directory perm = 0775
```

# FAQ

## 版本不匹配

当有 `uam list` 配置时会出现

- https://github.com/Netatalk/Netatalk/issues/121
