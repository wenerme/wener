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

## Redis Compatible

:::tip

- kvrocks 是目前唯一支持 多租户/namespace 的 Redis 兼容数据库
  - 但只兼容到了 4.0, 部分客户端要求 5.0+
  - BullMQ 要求 Redis 5+

:::

- [Redis](./redis/README.md)
  - RSALv2, SSPLv1, C
- forks
  - [valkey](./valkey.md)
    - supported by Linux Foundation
    - Redis 最后的 BSD fork
  - ~~[KeyDB](./keydb.md)~~
    - BSD-3, C++,C
    - ⚠️ 开发缓慢
    - 被 Snapchat 收购 - 2022-05-11 - 开源之前的 Pro 特性
    - 多线程 Redis - IO 多线程，事务单线程
    - **完整 Redis 兼容** - 持续使用 Redis 代码
    - ModJS - 可以通过 V8 扩展
    - HASH KEY 支持 TTL
    - WIP
      - JSON
    - [Migrating from Redis or KeyDB](https://docs.keydb.dev/docs/migration)
- protocol compatible server
  - [apache/kvrocks](https://github.com/apache/kvrocks)
    - Apache-2.0, C++, Go, RocksDB
    - distributed KV
    - https://kvrocks.apache.org/users/
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
  - [sabledb-io/sabledb](https://github.com/sabledb-io/sabledb)
    - BSD-3, Rust
    - RocksDB
  - [OpenAtomFoundation/pika](https://github.com/OpenAtomFoundation/pika)
    - BSD-3, C++, Golang
    - by Qihu 360
    - RocksDB
    - [Redis 兼容命令](https://github.com/OpenAtomFoundation/pika/wiki/pika-%E6%94%AF%E6%8C%81%E7%9A%84redis%E6%8E%A5%E5%8F%A3%E5%8F%8A%E5%85%BC%E5%AE%B9%E6%83%85%E5%86%B5)
      - 兼容程度很低，需要做区别对待
  - [skytable/skytable](https://github.com/skytable/skytable)
    - AGPL-3.0, Rust
    - 不完全兼容 https://docs.skytable.io/all-actions/
  - ~~[doyoubi/undermoon](https://github.com/doyoubi/undermoon)~~
    - Apache-2.0, Rust
    - Mordern Redis Cluster solution
  - ~~[ideawu/ssdb](https://github.com/ideawu/ssdb)~~
    - BSD-3, C++
  - [nalgeon/redka](https://github.com/nalgeon/redka)
    - BSD-3, Go, SQLite
  - [Tencent/Tendis](https://github.com/Tencent/Tendis)
    - GPLv3, C++
    - by 腾讯
    - ⚠️ 开发不活跃
- proxy server
  - codis
  - tweemproxy
  - redis cluster
- redis module
  - [RedisJSON](https://github.com/RedisJSON/RedisJSON)
  - [alibaba/TairHash](https://github.com/alibaba/TairHash)
    - Apache-2.0, C
    - HASH KEY 支持 TTL
    - by 阿里

## Awesome

- [FoundationDB](./foundationdb.md)
  - 结构复杂，功能强大
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

## 存储引擎

- [LMDB](./lmdb.md)
  - BSD-3, C
  - from OpenLDAP
  - by Symas Corporation
  - 2011-11
  - hadow paging
  - http://www.lmdb.tech/bench/microbench/benchmark.html
- [LevelDB](./leveldb.md)
  - BSD-3, C++
  - by Google
  - 2011-10
  - inspired by Bigtable
  - adopted by
    - IndexedDB in Google Chrome
    - Riak
    - Bitcoin Core, go-ethereum
- [RocksDB](./rocksdb.md)
  - by Facebook
  - a fork of LevelDB
    - for **server workloads**
    - 支持 多核心
    - SSD 优化
    - IO 优化
    - Bloom filter, TTL, Statistics, GeoSpatial Indexcing, Column family, Backup, Compaction, Merge Operator
  - adopted by
    - MyRocks - RocksDB + MySQL
    - ArangoDB
    - Cassandra
    - MariaDB
    - Kafka Streams
    - TiDB
    - YugabyteDB
    - [KvRocks](./kvrocks.md)
  - 2012-05
- Badger
- BoltDB
- H2
- BDB - Berkeley DB
- features
  - Key Types
    - byte array in lexicographical order
  - Value Types
    - byte array
  - Iteration
    - lexicographical order
    - reverse order
    - seeking to a key
  - ACID
    - Atomicity
    - Consistency
    - Isolation
      - 同步
      - 多线程
      - COW/MVCC
    - Durability
- 参考
  - https://mozilla.github.io/firefox-browser-architecture/text/0017-lmdb-vs-leveldb.html

# FAQ

## redis vs memcache

- https://news.ycombinator.com/item?id=28830007
