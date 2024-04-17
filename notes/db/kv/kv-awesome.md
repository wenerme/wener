---
title: KV DB Awesome
---

# KV DB Awesome

:::tip 使用场景

- 缓存
- 数据引擎
  - NoSQL 底层
  - SQL 底层

:::

- KV 最容易实现分布式
- 数据库都是某种形式上的 KV

## 服务

- [valkey](./valkey.md)
  - supported by Linux Foundation
  - Redis 最后的 BSD fork
- Protocol
  - [sabledb-io/sabledb](https://github.com/sabledb-io/sabledb)
    - BSD-3, Rust
    - RocksDB
  - [apache/kvrocks](https://github.com/apache/kvrocks)
    - Apache-2.0, C++, Go, RocksDB
    - distributed KV
    - https://kvrocks.apache.org/users/
  - ~~[ideawu/ssdb](https://github.com/ideawu/ssdb)~~
    - BSD-3, C++
  - [nalgeon/redka](https://github.com/nalgeon/redka)
    - BSD-3, Go, SQLite
- [Redis](./redis/README.md)
- [FoundationDB](https://github.com/apple/foundationdb)
  - [FoundationDB/awesome-foundationdb](https://github.com/FoundationDB/awesome-foundationdb)
- [microsoft/FASTER](https://github.com/microsoft/FASTER)
  - MIT C++,C#
  - recoverable log, key-value store + cache
  - [Asynchronous Prefix Recoverability for Fast Distributed Stores](https://tli2.github.io/assets/pdf/dpr-sigmod2021.pdf)
- Memcache
- [TiKV](./tikv.md)
- Ehcache
- Infinispan
- Geode
- [flower-corp/rosedb](https://github.com/flower-corp/rosedb)
  - Apache-2.0, Go
  - 类似于 Redis 但存储在文件
- distributed, consistent key-value store
  - [etcd](./etcd.md)
  - zookeeper
  - consul
    - 服务、Node 为 first class
  - 使用场景
    - 配置共享
    - 服务发现
    - scheduler coordination
- consistent
  - raft
  - paxios

## Redis

- [KeyDB](./keydb.md)
  - BSD-3, C++,C
  - 被 Snapchat 收购 - 2022-05-11 - 开源之前的 Pro 特性
  - 多线程 Redis - IO 多线程，事务单线程
  - **完整 Redis 兼容** - 持续使用 Redis 代码
  - ModJS - 可以通过 V8 扩展
  - HASH KEY 支持 TTL
  - WIP
    - JSON
  - [Migrating from Redis or KeyDB](https://docs.keydb.dev/docs/migration)
- [dragonflydb/dragonfly](./dragonflydb.md)
  - BSL 1.1, C++,C
  - 兼容 Redis 接口 - 不完整
  - 兼容 Memcached 接口
  - 多线程
  - 类似 KeyDB
    - 不完全使用 Redis
    - 完整多线程 - 事务也多线程
    - io_uring - 要求 linux 5.1+ 内核
    - 性能优于 KeyDB - 不同的 trade off
- [skytable/skytable](https://github.com/skytable/skytable)
  - AGPL-3.0, Rust
  - 不完全兼容 https://docs.skytable.io/all-actions/
- [doyoubi/undermoon](https://github.com/doyoubi/undermoon)
  - Mordern Redis Cluster solution
- [Tencent/Tendis](https://github.com/Tencent/Tendis)
  - 腾讯
- redis module
  - [RedisJSON](https://github.com/RedisJSON/RedisJSON)
  - [alibaba/TairHash](https://github.com/alibaba/TairHash)
    - Apache-2.0, C
    - HASH KEY 支持 TTL
    - by 阿里

## 文件

- LMDB
- LevelDB
- RocksDB
- BoltDB
- Badger

# FAQ

## redis vs memcache

- https://news.ycombinator.com/item?id=28830007
