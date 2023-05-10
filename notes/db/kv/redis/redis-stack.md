---
title: Redis Stack
---

# Redis Stack


- [RedisInsight](https://github.com/RedisInsight/RedisInsight)
  - SSPLv1
  - Electron, Monaco Editor, NodeJS
- [RedisJSON](https://github.com/RedisJSON/RedisJSON)
- [RedisGraph](https://github.com/RedisGraph/RedisGraph)
- [RedisTimeSeries](https://github.com/RedisTimeSeries/RedisTimeSeries)
- [RedisSearch](https://github.com/RediSearch/RediSearch)
  - 中文分词使用 [lionsoul2014/friso](https://github.com/lionsoul2014/friso)
- [RedisBloom](https://github.com/RedisBloom/RedisBloom) - PDS - probabilistic data structures
  - Bloom filter
  - Cuckoo filter
  - Count-Min Sketch
  - Top-K
- https://redis.io/docs/stack/license/
  - RSALv2, SSPLv1

```bash
# https://hub.docker.com/r/redis/redis-stack
# 8001 RedisInsight
# http://localhost:8001
# /redis-stack.conf
docker run --rm -it \
  -v $PWD/data:/data \
  -v $PWD/redis-stack.conf:/redis-stack.conf \
  -p 6379:6379 -p 8001:8001 \
  --name redis-stack redis/redis-stack:latest

# redis/redis-stack-server 无 RedisInsight
docker run --rm -it \
  -p 6379:6379 \
  --name redis-stack redis/redis-stack-server:latest
```

- REDIS_ARGS
- REDISEARCH_ARGS
- REDISJSON_ARGS
- REDISGRAPH_ARGS
- REDISTIMESERIES_ARGS
  - RETENTION_POLICY
- REDISBLOOM_ARGS

```bash
# http://localhost:8001
# http://localhost:8001/healthcheck/
# chown -R 1001 redisinsight
docker run --rm -it -v $PWD/redisinsight/db:/db -p 8001:8001 redislabs/redisinsight:latest
```
