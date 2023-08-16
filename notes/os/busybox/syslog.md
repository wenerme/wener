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

| facility     |  code | n   | for         |
| ------------ | ----: | --- | ----------- |
| kern         |  0<<3 | 0   |
| user         |  1<<3 | 1   |
| mail         |  2<<3 | 2   |
| daemon       |  3<<3 | 3   |
| auth         |  4<<3 | 4   |
| syslog       |  5<<3 | 5   |
| lpr          |  6<<3 | 6   |
| news         |  7<<3 | 7   |
| uucp         |  8<<3 | 8   |
| cron         |  9<<3 | 9   |
| authpriv     | 10<<3 | 10  |
| ftp          | 11<<3 | 11  |
| ntp          | 12<<3 | 12  |
| security     | 13<<3 | 13  | audit, auth |
| console      | 14<<3 | 14  | alert       |
| solaris-cron | 15<<3 | 15  | scheduling  |
| local0       | 16<<3 |
| local1       | 17<<3 |
| local2       | 18<<3 |
| local3       | 19<<3 |
| local4       | 20<<3 |
| local5       | 21<<3 |
| local6       | 22<<3 |
| local7       | 23<<3 |

| level   | n   | note      |
| ------- | --- | --------- |
| emerg   | 0   | ~~panic~~ |
| alert   | 1   |
| crit    | 2   |
| err     | 3   | ~~error~~ |
| warning | 4   | ~~warn~~  |
| notice  | 5   |
| info    | 6   |
| debug   | 7   |


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

## klogd

- kernel log -> syslog

```bash
service klogd start
```

```txt
kern.*  /var/log/kern.log
*.*     /var/log/messages
```

# FAQ

```
sshd[27530]: Connection closed by authenticating user root 1.1.1.1port 39256 [preauth]
sshd[19855]: Connection closed by invalid user ubuntu 1.1.1.1port 48706 [preauth]
sshd[19855]: Invalid user ubuntu from 1.1.1.1port 48706
```

```
crond[23340]: USER root pid 17499 cmd run-parts /etc/periodic/15min
```

**authpriv.notice**

```
sudo: admin : TTY=pts/0 ; PWD=/root ; USER=root ; COMMAND=/bin/bash
```

**auth.info**

```
sshd[35516]: Accepted publickey for admin from 10.37.0.19 port 1563 ssh2: RSA SHA256:XXX
sshd[65609]: banner exchange: Connection from 10.37.0.15 port 42808: invalid format
```

**auth.err**

```
sshd[12372]: error: kex_exchange_identification: banner line contains invalid characters
```
