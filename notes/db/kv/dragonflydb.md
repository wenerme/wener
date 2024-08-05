---
title: dragonflydb
---

# dragonflydb

- [dragonflydb/dragonfly](https://github.com/dragonflydb/dragonfly)
  - BSL 1.1, C++, C
  - 兼容 Redis, Memcached 接口
  - 多线程
- 6379
  - http://127.0.0.1:6379
  - `:6379/metrics`
- 参考
  - [Dragonfly API Compatibility](https://www.dragonflydb.io/docs/command-reference/compatibility)

:::caution

- Redis v7 RDB [#1403](https://github.com/dragonflydb/dragonfly/issues/1403)
- 兼容问题 - 大多已经修复，但如果遇到问题可以参考
  - BullMQ [#1398](https://github.com/dragonflydb/dragonfly/issues/1398)
  - nest/bull,nextcloud [#782](https://github.com/dragonflydb/dragonfly/issues/782)
- 多租户支持讨论 [#1466](https://github.com/dragonflydb/dragonfly/discussions/1466)

:::


```bash
# http://127.0.0.1:6379
docker run -it --rm \
  -p 6379:6379 \
  --ulimit memlock=-1 \
  --name dragonfly docker.dragonflydb.io/dragonflydb/dragonfly

redis-cli PING
```
