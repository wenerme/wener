---
id: kv
title: Key Value
---

# Key Value

## Tips

- 参考
  - [Benchmarking LevelDB vs. RocksDB vs. HyperLevelDB vs. LMDB Performance for InfluxDB](https://www.influxdata.com/blog/benchmarking-leveldb-vs-rocksdb-vs-hyperleveldb-vs-lmdb-performance-for-influxdb/) - 2014-06-04
    - 大部场景 LevelDB 和 RocksDB 是更好的选择
    - LevelDB 有更好的磁盘利用率，RocksDB 的读写性能更加优异
    - 硬盘和存储配置对性能影响非常明显
- [EQ-Alpha/KeyDB](https://github.com/EQ-Alpha/KeyDB)
  - BSD
  - redis 协议
  - 多线程

## FAQ

### RocksDB vs LevelDB

- RocksDB
  - 于 2012 Fork LevelDB - 提升在服务端的性能
  - 一般作为其他数据的引擎，功能较多且复杂
  - 使用：ArangoDB、TiDB、Apache Flink、CockroachDB
- LevelDB
  - 基础概念来源于 Google Bigtable 实现
  - 支持全平台 - 浏览器、移动设备、嵌入式设备
  - 功能简单，一般直接使用
  - 使用：IndexedDB、Bitcoin Core、go-ethereum
- 参考
  - [RocksDB Features that are not in LevelDB](https://github.com/facebook/rocksdb/wiki/Features-Not-in-LevelDB)
    - 列簇
    - 事务
  - [LevelDB vs. RocksDB](https://db-engines.com/en/system/LevelDB%3BRocksDB) - DB Engines
