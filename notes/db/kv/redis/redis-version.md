---
title: Redis Version
tags:
  - Version
---

# Redis Version

- 1 年一个大版本，每 6 个月一个小版本

| version   | date       |
| --------- | ---------- |
| [Redis 7] | 2022-04-27 |
| [Redis 6] | 2020-04-30 |

[redis 7]: #redis-7
[redis 6]: #redis-6

## Redis 7.2

- RDB 11
  - 不兼容旧版本
- 命令
  - WAITAOF
  - `CLIENT SETINFO` - 设置 Client 名字和版本
  - `CLIENT NO-TOUCH` - 不影响 LRU/LFU
- 优化小数据 KV - listpack
  - list, set
- redis-cli 可以在 subscribe 时继续执行命令

## Redis 7

- Redis Functions
- ACLv2 - selector, key 读写限定, 限定子命令
- command introspection - 新增 COMMAND getkeysandflags|list|docs
- Cluster Sharded Pub/Sub
- 50 个新命令
  - ZMPOP, BZMPOP, LMPOP, BLMPOP, SINTERCARD, ZINTERCARD
  - shared pub/sub - SPUBLISH, SSUBSCRIBE, SUNSUBSCRIBE, PUBSUB SHARDCHANNELS/SHARDNUMSUB
  - EXPIRETIME, PEXPIRETIME
  - EXPIRE NX/XX/GT/LT
  - EVAL_RO, EVALSHA_RO
  - SORT_RO
  - SHUTDOWN NOW|FORCE|ABORT
  - FUNCTION, FCALL, FCALL_RO
  - 管理
    - COMMAND DOCS|LIST|INFO
    - LATENCY HISTOGRAM
    - CLUSTER LINKS|DELSLOTSRANGE|ADDSLOTSRANGE
    - CLIENT NO-EVICT
    - ACL DRYRUN

## Redis 6

- SSL
- ACLs
- RESP3
- Client side caching
- Threaded I/O - 部分多线程
- Diskless replication on replicas
- Cluster support in Redis-benchmark
- improved redis-cli cluster support

## Redis 5

- 新增 stream 类型

## Redis 4

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

## Redis 3.2.0

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
