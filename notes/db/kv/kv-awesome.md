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

- Redis
- [FoundationDB](https://github.com/apple/foundationdb)
  - [FoundationDB/awesome-foundationdb](https://github.com/FoundationDB/awesome-foundationdb)
- [microsoft/FASTER](https://github.com/microsoft/FASTER)
  - MIT C++,C#
  - recoverable log, key-value store + cache
  - [Asynchronous Prefix Recoverability for Fast Distributed Stores](https://tli2.github.io/assets/pdf/dpr-sigmod2021.pdf)
- Memcache
- TiKV
- etcd
- Ehcache
- Infinispan
- Geode

## Redis

- [KeyDB](https://github.com/EQ-Alpha/KeyDB)
  - BSD3, C++,C
  - 多线程 Redis
  - ModJS - 可以通过 V8 扩展
  - WIP
    - JSON
- [doyoubi/undermoon](https://github.com/doyoubi/undermoon)
  - Mordern Redis Cluster solution
- [Tencent/Tendis](https://github.com/Tencent/Tendis)

## 文件

- LMDB
- LevelDB
- RocksDB
- BoltDB
- Badger

# FAQ

## redis vs memcache

- https://news.ycombinator.com/item?id=28830007
