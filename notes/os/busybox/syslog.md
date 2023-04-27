---
title: syslog
---

# syslog

- syslog
  - /dev/log
- klogd
- logger - log 到 syslog
- logread - 从共享内存读取 log
- 参考
  - [sysklogd/syslogd.c](https://sourcegraph.com/github.com/mirror/busybox/-/blob/sysklogd/syslogd.c)
  - [Busybox 的 syslogd 认识与使用](https://www.cnblogs.com/arnoldlu/p/10583233.html)

<!--
kernel -> klogd: printk, syslog.2, /proc/kmsg
klogd -> syslogd: syslog.3
user_process -> /dev/log -> syslogd: syslog.3
remote -> syslogd: TCP/IP :514
syslog.conf -> syslogd
 -->

```bash
syslogd -n -O -

# -s 同时 log 到 stderr
# -t TAG 默认为用户名
# -p PRIO 数字或 FACILITY.LEVEL
logger Log Works

sudo killall -HUP syslogd
```

## conf

- /etc/syslog.conf
- selector
  - facility.level
  - 数字
  - err/warn 任意一个
  - `*` 任意
  - = 匹配
  - ! 排除
  - none 不存储
- action
  - 常规文件 - /var/log/xxx.log
  - 管道文件 - |filename
  - 远程转发 - @hostname

| facility |
| -------- | ----- |
| kern     | 0<<3  |
| user     | 1<<3  |
| mail     | 2<<3  |
| daemon   | 3<<3  |
| auth     | 4<<3  |
| syslog   | 5<<3  |
| lpr      | 6<<3  |
| news     | 7<<3  |
| uucp     | 8<<3  |
| cron     | 9<<3  |
| authpriv | 10<<3 |
| ftp      | 11<<3 |
| local0   | 16<<3 |
| local1   | 17<<3 |
| local2   | 18<<3 |
| local3   | 19<<3 |
| local4   | 20<<3 |
| local5   | 21<<3 |
| local6   | 22<<3 |
| local7   | 23<<3 |

- security -> auth

| level   | n
| ------- | --- |
| emerg   | 0   |
| alert   | 1   |
| crit    | 2   |
| err     | 3   |
| warning | 4   |
| notice  | 5   |
| info    | 6   |
| debug   | 7   |

- error -> err
- panic -> emerg
- warn -> wanring

```
# selector                                  action
local2.*                                    /var/log/haproxy.log

kern,user.*                                 /var/log/messages
kern.!err                                   /var/log/critical
*.*;auth,authpriv.none                      /var/log/noauth
kern,user.*;kern.!=notice;*.err;syslog.none /var/log/OMG
*.*                                         /dev/null
```

- API
  - openlog
  - syslog
  - stelogmask
  - closelog
