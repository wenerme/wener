---
title: FoundationDB
---

# FoundationDB

- [FoundationDB](https://github.com/apple/foundationdb)
  - Apache-2.0, C++
  - by Apple
    - Cassandra -> FDB
  - 分布式、事务、KV
  - 作为 DynamoDB, Cassandra, HBase 的替代
  - 可以作为别的服务的存储底层: 上层实现 SQL、Document
- 参考
  - https://apple.github.io/foundationdb/
    - https://apple.github.io/foundationdb/architecture.html
  - [FoundationDB/awesome-foundationdb](https://github.com/FoundationDB/awesome-foundationdb)
  - [FoundationDB/fdb-kubernetes-operator](https://github.com/FoundationDB/fdb-kubernetes-operator)
  - [FoundationDB/fdb-document-layer](https://github.com/FoundationDB/fdb-document-layer)
    - MongoDB® wire protocol
  - [FoundationDB: A Distributed Unbundled Transactional Key Value Store](https://www.micahlerner.com/2021/06/12/foundationdb-a-distributed-unbundled-transactional-key-value-store.html)
    - [HN](https://news.ycombinator.com/item?id=28740497)
  - CouchDB 4 底层可能会迁移到 FoundationDB
  - [FoundationDB Record Layer: A Multi-Tenant Structured Datastore](https://www.foundationdb.org/files/record-layer-paper.pdf)
  - [QuiCK: A Queuing System in CloudKit](https://www.foundationdb.org/files/QuiCK.pdf)
  - [How FoundationDB works and why it works](https://blog.the-pans.com/notes-on-the-foundationdb-paper/)
  - https://news.ycombinator.com/item?id=16877395

:::caution

- 事务不能超过 10M 影响数据
  - 写的数据、不包含读
  - 推荐先更新数据，最好再事务更新指针
- 事务不能超过 5s
- 目前部署运维并不容易

:::

:::tip

- conflict detection is lock-free - Sequencer is not lock-free

:::

- 更严格的限制 换取更 简单的设计实现
