---
title: Postgresql Scale
---

# Postgresql Scale

- scale up
  - 堆硬件
- scale out replicas
  - 读写分离
  - pub/sub
- scale out sharding
  - 分片 - 多节点
  - 应用分片 - 逻辑映射
    - 可控性高、特殊场景
  - 服务分片 - cdb、citus
    - 使用简单、要求使用 patten 符合

:::tip

PostgreSQL 并不是 OLAP 数据库，能力有上限，当发现有更多的时间和资源投入 数据仓库 时，可以考虑选择一个真正的数仓数据库。

:::

- backup
  - [pgbackrest](https://github.com/pgbackrest/pgbackrest)
    - MIT, perl & C
    - by Crunchy Data
  - [wal-g](./wal-g.md)
    - by Citus Data, Apache-2.0, Go
  - Barman
    - 2ndQuadrant, GPL v 3.0, python
    - basebackup & rsync
  - pg_probackup
    - by Postgres Professional, PostgreSQL License, C
  - BART
- [Advanced PostgreSQL backup & recovery methods](https://www.postgresql.eu/events/pgconfeu2018/sessions/session/2098/slides/123/Advanced%20backup%20methods.pdf)

## Story

- Gitlab 因为 License 问题放弃 Citus [Sharding GitLab with CitusDB](https://about.gitlab.com/handbook/engineering/development/enablement/data_stores/database/doc/citus.html)
- Gitlab PostgreSQL Partitioning with FDW
  - [PostgreSQL 11 sharding with foreign data wrappers and partitioning](https://about.gitlab.com/handbook/engineering/development/enablement/data_stores/database/doc/fdw-sharding.html)
    - 问题
      - 需要为 foreign server 连接信息
      - 不好维护 schema
      - 只支持本地 foreign key
      - 可能不会 push down 问题
      - 性能降低
      - 执行和计划时间增加
      - 每个分片都需要 HA 集群
      - 没有 parallel scan
      - 更新性能问题
      - 没有全局事务

## Logical Replication

:::caution

- 不会复制 schema

:::
