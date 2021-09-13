---
title: netdata
---

# netdata

- [netdata/netdata](https://github.com/netdata/netdata) 是什么？
  - 美观简单的单机实时监控可视化服务
- 默认精度 1s, 保存 1h

```bash
# 缺少部分主机信息
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

# < 3.13
apk add netdata -X https://mirrors.aliyun.com/alpine/edge/community/
touch /etc/netdata/.opt-out-from-anonymous-statistics

# 启动后可保存完整配置
curl -o /etc/netdata/netdata.conf http://localhost:19999/netdata.conf
```

## conf


```conf
[global]
  # memory mode
  memory mode = dbengine
```

## registry
- https://learn.netdata.cloud/docs/agent/registry/#run-your-own-registry
