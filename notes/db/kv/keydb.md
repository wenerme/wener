---
title: KeyDB
---

# KeyDB

- [KeyDB](https://github.com/EQ-Alpha/KeyDB)
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
- 参考
  - [EQ-Alpha/ModJS](https://github.com/EQ-Alpha/ModJS)
    - 基于 V8

:::tip

- Multi-Tenancy Support [#286](https://github.com/EQ-Alpha/KeyDB/issues/286)
- WIP JSON

:::

```bash
docker run -it --rm \
  -p 6379:6379 -v $PWD/data:/data \
  --name keydb eqalpha/keydb keydb-server /etc/keydb/keydb.conf \
  --appendonly yes \
  --server-threads 4 --requirepass password
```

## vs Redis

- https://docs.keydb.dev/docs/migration/
- https://docs.keydb.dev/docs/faq#how-is-keydb-different-than-redis
