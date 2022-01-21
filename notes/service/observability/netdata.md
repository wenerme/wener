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
```

```conf
[global]
  # save 模式不那么损耗磁盘
  memory mode = save
  # 默认 1h - 修改为 6h
  history = 21600
```

## registry

- https://learn.netdata.cloud/docs/agent/registry/#run-your-own-registry

# FAQ

## Preventing more logs from process 'netdata' for 1199 seconds

```
errors flood protection period = 0
```

## This agent doesn't have ACLK. (errno 22, Invalid argument)
