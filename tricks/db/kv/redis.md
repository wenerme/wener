---
id: redis
title: Redis
---

# Redis

## Tips

* [redis.conf](http://download.redis.io/redis-stable/redis.conf)
* 参考
  * [5 Key Takeaways for Developing with Redis](https://redislabs.com/blog/5-key-takeaways-for-developing-with-redis)
    1. Keep Track of Your Keys
    2. Keep Track of the Length of Your Key Names
    3. Use the Right Data Structures
    4. Use SCAN, Never Use KEYS
    5. Use Server-Side Lua Scripts
  * [Redis configuration for production](https://scaleyourcode.com/blog/article/15)
    * [YouTube](https://www.youtube.com/watch?v=X01gn5a2WQ0)
* [RedisGraph](https://github.com/RedisLabsModules/redis-graph/)
  * A graph database as a Redis module

```bash
# 使用配置文件启动
wget http://download.redis.io/redis-stable/redis.conf
redis-server redis.conf
# macOS 安装
brew install redis
# 通过 docker 启动
# 数据存储于 ~/data/redis
docker run --rm -it -v ~/data/redis:/data -p 6379:6379 --name my-redis redis redis-server --appendonly ye
```

## Stream
* redis [api](https://gist.github.com/antirez/4e7049ce4fce4aa61bf0cfbc3672e64d)
* 参考
  * [Redis Streams: consumer groups v2 specification document](https://gist.github.com/antirez/68e67f3251d10f026861be2d0fe0d2f4)
  * [An update on Redis Streams development](http://antirez.com/news/116)

## Module
* [写 Redis 模块的教程](https://redislabs.com/blog/writing-redis-modules)
* [Redis 模块仓库](http://redismodules.com/)
* [Antirez 关于 Redis 模块的博客](http://antirez.com/news/106)
* [wenerme/go-rm](https://github.com/wenerme/go-rm)
  * 使用 Golang 写 Redis 模块

## CHANGELOG

### 5.0
* 新增 stream 类型

### 4.0
* 变更
  1. 模块
  2. 新的同步方式
    * A -> B -> C -> D
  3. 失效机制
    * LFU
  4. 非阻塞 DEL 和 FLUSHALL/FLUSHDB.
  5. RDB-AOF 混合持久模式
  6. 新的 MEMORY 语句
  7. Redis Cluster 现在兼容 NAT/Docker
* 参考
  * [The first release candidate of Redis 4.0 is out](http://www.antirez.com/news/110)
  * [RELEASENOTES](https://raw.githubusercontent.com/antirez/redis/4.0/00-RELEASENOTES)

### 3.2.0

* 参考
  * [Redis 3.2.0 is out!](http://antirez.com/news/104)

* [GEO](http://redis.io/commands/#geo) API
* [BITFIELD](http://redis.io/commands/bitfield) command
* script effects replication
  集群下只同步被脚本修改的内容,而不是分发脚本到所有节点执行
* Lua scripts debugger
  VIDEO: [New Redis Lua scripts debugger: a short intro](https://www.youtube.com/watch?v=IMvRfStaoyM)
* slaves and masters are in agreement about what keys are expired during read operations.
* SPOP now accepts an optional count argument
* RDB AUX fields
* Sentinel can now scale monitoring many masters

## FAQ

### MISCONF Redis is configured to save RDB snapshots, but is currently not able to persist on disk. Commands that may modify the data set are disabled.
* https://gist.github.com/kapkaev/4619127

```bash
redis-cli
# config set stop-writes-on-bgsave-error no
```

### RESP3
https://gist.github.com/antirez/2bc68a9e9e45395e297d288453d5d54c

目前的 RESP 是 QA 模式，性能和处理能力上有限
