---
title: netdata
---

# netdata

- [netdata/netdata](https://github.com/netdata/netdata) 是什么？
  - GPL-3.0, C
  - 美观简单的单机实时监控可视化服务
- 默认精度 1s, 保存 1h

```bash
# docker 启动缺少部分主机信息
docker run -d \
  -p 19999:19999 \
  -v netdataconfig:/etc/netdata \
  -v netdatalib:/var/lib/netdata \
  -v netdatacache:/var/cache/netdata \
  -v /etc/passwd:/host/etc/passwd:ro \
  -v /etc/group:/host/etc/group:ro \
  -v /proc:/host/proc:ro \
  -v /sys:/host/sys:ro \
  -v /etc/os-release:/host/etc/os-release:ro \
  -e DO_NOT_TRACK=1 \
  --restart unless-stopped \
  --cap-add SYS_PTRACE \
  --security-opt apparmor=unconfined \
  --name=netdata netdata/netdata

# AlpineLinux 启动
# < 3.13 -X https://mirrors.aliyun.com/alpine/edge/community/
apk add netdata
touch /etc/netdata/.opt-out-from-anonymous-statistics
service netdata start

# 启动后可保存完整配置
curl -o /etc/netdata/netdata.conf http://localhost:19999/netdata.conf
```

## conf

- /etc/netdata/netdata.conf
- /var/lib/netdata/
- /var/cache/netdata/netdata-meta.db
- [Daemon configuration](https://learn.netdata.cloud/docs/agent/daemon/config)

```conf
[global]
  # dbengine 默认 - 通过 page cache size 和 dbengine disk space 进一步控制
  # save 退出保存，启动加载
  # map 实时更新缓存
  # ram 内存
  # none 禁用监控
  # alloc 类似 ram，使用 calloc，不支持 ksm
  memory mode = dbengine
  page cache size = 32
  dbengine disk space = 256
  dbengine multihost disk space = 256

[web]
# https://learn.netdata.cloud/docs/agent/web/server/#other-netdataconf-web-section-options
respect do not track policy=yes
```

```conf
[global]
  # save 模式不那么损耗磁盘
  memory mode = save
  # 默认 1h - 修改为 6h
  history = 21600
```

**/var/lib/netdata/cloud.d/cloud.conf**

```ini
[global]
enabled = false
```

## registry

- https://learn.netdata.cloud/docs/agent/registry/#run-your-own-registry
- 每个 Netdata 都是 registry
- `/var/lib/netdata/registry/*.db`

```ini
[registry]
enabled = yes # server 启用, 其他禁用
registry to announce = http://your.registry:19999
registry hostname = Group1 - Master DB
```

```ini
[registry]
allow from = *
# allow by dns = heuristic
# registry save db every new entries
# enable cookies SameSite and Secure = no
```

# FAQ

## Preventing more logs from process 'netdata' for 1199 seconds

```
errors flood protection period = 0
```

## This agent doesn't have ACLK. (errno 22, Invalid argument)

## system.clock_sync_state

- 状态基于 [adjtimex](https://man7.org/linux/man-pages/man2/adjtimex.2.html)
- added https://github.com/netdata/netdata/pull/11177
- https://learn.netdata.cloud/docs/agent/collectors/timex.plugin
- http://www.ntp.org/ntpfaq/NTP-s-algo-kernel.htm
- Busybox ntpd
  - [What's the easiest way to make Busybox keep correct time?](http://lists.busybox.net/pipermail/busybox/2014-September/081667.html)

```bash
# adjtimex --print
adjtimex
```

```
    mode:         0
-o  offset:       19895 us
-f  freq.adjust:  -1718067 (65536 = 1ppm)
    maxerror:     16000000
    esterror:     16000000
    status:       16449 (PLL | UNSYNC)
-p  timeconstant: 10
    precision:    1 us
    tolerance:    32768000
-t  tick:         10000 us
    time.tv_sec:  1642947197
    time.tv_usec: 741874
    return value: 5 (clock not synchronized)
```

## setup

```ini
[global]
run as user = netdata

page cache size = 256
dbengine disk space = 256
dbengine multihost disk space = 256

[db]
mode=dbengine

[directories]
cache=/data/var/netdata/cache

[web]
respect do not track policy=yes
```
