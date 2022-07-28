---
title: KeyDB
---

# KeyDB

- [KeyDB](https://github.com/Snapchat/KeyDB)
  - BSD-3, C++,C
  - 多线程 Redis - IO 多线程，事务单线程
  - ModJS - 可以通过 V8 扩展
  - 同步 redis 源码 - 版本匹配
  - active-replication, multi-master, flash, s3 backup
  - 被 Snapchat 收购 - 2022-05-11
    - 开源企业版功能 v6.3.0
      - Active Replication PSYNC
      - Async Commands - GET, MGET
      - Async Rehash
      - In Process Background Saving - fork -> snapshot - 可控制最大内存使用量
      - IStorage Interface - 未包含 FLASH 存储实现
      - https://docs.keydb.dev/docs/coming-soon/
        - Namespaces
        - JSON
        - RAFT
    - FLASH 功能大约在 2022-09 发布
- 参考
  - [EQ-Alpha/ModJS](https://github.com/EQ-Alpha/ModJS)
    - 基于 V8

:::tip

- Multi-Tenancy Support [#286](https://github.com/EQ-Alpha/KeyDB/issues/286)
- SET 成员, HASH KEY 支持 TTL
  - `EXPIREMEMBER <key> <subkey> <timeout-in-seconds> <OPTIONAL:unit-time-format>`
  - `EXPIREMEMBERAT <key> <subkey> <expiration-timestamp>`
  - PEXPIREMEMBERAT
  - 检查 TTL `PTTL/TTL <key> <subkey>`
  - 不会产生 expired 事件 - [#85](https://github.com/Snapchat/KeyDB/issues/85)
- 扩展命令
  - `KEYDB.CRON name [single/repeat] [optional: start] delay script numkeys [key N] [arg N]`
    - 周期运行 lua 脚本
  - `KEYDB.HRENAME key [src hash key] [dst hash key]`
  - `KEYDB.MEXISTS key [key ...]`
  - KEYDB.MVCCRESTORE
  - keydb.nhset,keydb.nhget
  - stralgo
  - lfence,failover,reset,
- 2022 Q3 - Redis 7 [#420](https://github.com/Snapchat/KeyDB/issues/420)
- WIP JSON - [coming-soon](https://docs.keydb.dev/docs/coming-soon/)

:::

```bash
docker run -it --rm \
  -p 6379:6379 -v $PWD/data:/data \
  --name keydb eqalpha/keydb:alpine_x86_64_v6.3.1 keydb-server /etc/keydb/keydb.conf \
  --appendonly yes \
  --server-threads 2 --requirepass password
```

## Active Replica

- active-replica yes
  - 多副本，同时可读写
  - 单个 replicaof
- multi-master yes
  - 在副本基础上同时支持同步多个 master 的数据
  - 配置多个 replicaof
- cluster
  - 用于数据分片 - 每个节点的数据不对等

```
# keydb-1 上执行
replicaof keydb-0:6379
# keydb-0 上执行
replicaof keydb-1:6379
```

## KeyDB vs Redis

- Redis
  - IO 多线程
- KeyDB - 定期 Merge Redis 上游
  - IO 多线程
  - 兼容 Redis 扩展 - 但只能单线程执行
  - 部分操作支持并行 - MVCC
  - 额外功能 - HASH Key 支持 TTL
  - Active Replica
  - Multi Master

---

- https://docs.keydb.dev/docs/migration/
- https://docs.keydb.dev/docs/faq#how-is-keydb-different-than-redis

## 配置

- https://docs.keydb.dev/docs/config-file

```ini
# scratch-file-path /tmp/

# yes - replica 还没准备好时也接受客户端请求
# no - 返回错误信息
replica-serve-stale-data yes

# 处理请求的 worker 线程
# 取决于网络而不是 CPU 核心数
# 建议 最大不超过 16，最好少于 8，一般 1 或 2 就可以了
server-threads 1

server-thread-affinity false

active-replica no
```
