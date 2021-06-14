---
title: Redis Version
---

# Redis Version

| ver | date       |
| --- | ---------- |
| 6.0 | 2020-04-30 |

## 6.0
- SSL
- ACLs
- RESP3
- Client side caching
- Threaded I/O
- Diskless replication on replicas
- Cluster support in Redis-benchmark
- improved redis-cli cluster support

## 5.0

- 新增 stream 类型

## 4.0

- 变更
  1. 模块
  2. 新的同步方式
  - A -> B -> C -> D
  3. 失效机制
  - LFU
  4. 非阻塞 DEL 和 FLUSHALL/FLUSHDB.
  5. RDB-AOF 混合持久模式
  6. 新的 MEMORY 语句
  7. Redis Cluster 现在兼容 NAT/Docker
- 参考
  - [The first release candidate of Redis 4.0 is out](http://www.antirez.com/news/110)
  - [RELEASENOTES](https://raw.githubusercontent.com/antirez/redis/4.0/00-RELEASENOTES)

## 3.2.0

- [GEO](http://redis.io/commands/#geo) API
- [BITFIELD](http://redis.io/commands/bitfield) command
- script effects replication
  集群下只同步被脚本修改的内容,而不是分发脚本到所有节点执行
- Lua scripts debugger
  VIDEO: [New Redis Lua scripts debugger: a short intro](https://www.youtube.com/watch?v=IMvRfStaoyM)
- slaves and masters are in agreement about what keys are expired during read operations.
- SPOP now accepts an optional count argument
- RDB AUX fields
- Sentinel can now scale monitoring many masters
- 参考
  - [Redis 3.2.0 is out!](http://antirez.com/news/104)
