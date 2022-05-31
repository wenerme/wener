---
title: dragonflydb
---

# dragonflydb

- [dragonflydb/dragonfly](https://github.com/dragonflydb/dragonfly)
  - BSL 1.1, C++,C
  - 兼容 Redis, Memcached 接口
  - 多线程

```bash
docker run -p 6379:6379 --ulimit memlock=-1 --it --rm \
  --name dragonfly docker.dragonflydb.io/dragonflydb/dragonfly

redis-cli PING
```
