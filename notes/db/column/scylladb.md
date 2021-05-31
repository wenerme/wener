---
title: ScyllaDB
---

# ScyllaDB

## Tips

- [scylladb/scylla](https://github.com/scylladb/scylla)
  - AGPL, C++
  - 使用 C++ 实现的 Cassandra
  - 不依赖 Zookeeper
  - 轻量级事务 Lightweight Transactions / LWT
  - Amazon DynamoDB 兼容接口
  - 支持 CDC/Change Data Capture
  - 基于 [seastar](https://github.com/scylladb/seastar) 框架
- [Apache Cassandra Compatibility](https://docs.scylladb.com/using-scylla/cassandra-compatibility/)
  - Apache Cassandra 3.11
- [要求](https://docs.scylladb.com/getting-started/system-requirements)
  - 最小 4核, 2G, SSD
  - 生产 20核, 128G, RAID0 4 SSD 1-5TB
  - 分析 28核, 256G, NVMe 10TB
- [Scylla Manager](https://manager.docs.scylladb.com/stable/)
  - scylladb 管理平台
  - 例如 备份、恢复、集群状态
  - 不超过 5 个节点免费
- [Scylla Monitor](https://monitoring.docs.scylladb.com/stable/)
  - scylladb 监控平台
  - Prometheus + Grafana
- [scylladb/scylla-operator](https://github.com/scylladb/scylla-operator)
