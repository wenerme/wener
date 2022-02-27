---
title: PostgreSQL Awesome
tags:
  - Awesome
---

# PostgreSQL Awesome

- [orioledb/orioledb](https://github.com/orioledb/orioledb)
  - storage engine
  - [slide](https://www.slideshare.net/AlexanderKorotkov/solving-postgresql-wicked-problems)
  - [HN](https://news.ycombinator.com/item?id=30462695)
    author [akorotkov](https://news.ycombinator.com/threads?id=akorotkov)

| pg                          | oriole                                               |
| --------------------------- | ---------------------------------------------------- |
| Block-level WAL             | Row-level WAL                                        |
| Buffer mapping              | Direct page links                                    |
| Buffer locking              | Lock-less access                                     |
| Bloat-prone MVCC            | Undo log                                             |
| Block-level WAL replication | Raft-based multimaster replication of row-level WAL |

- [MaterializeInc/materialize](https://github.com/MaterializeInc/materialize)
  - 实时增量固化查询
- Superbase
- [PostgresApp/PostgresApp](https://github.com/PostgresApp/PostgresApp)
  - macOS 应用
- PipelineDB - 停止

## Extension

- TimescaleDB
- [apache/incubator-age](https://github.com/apache/incubator-age)
  - Graph + Realtime
  - openCypher
  - 受 AgensGraph 启发
- [arkhipov/temporal_tables](https://github.com/arkhipov/temporal_tables)
  - Temporal - 记录数据变化
  - 将数据修改归档到历史表
  - 暂不支持 PG13
- [zombodb/zombodb](https://github.com/zombodb/zombodb)
  - 集成 ES 搜索和分析能力
- [ankane/pgvector](https://github.com/ankane/pgvector)
  - 向量搜索
- [pgaudit/pgaudit](https://github.com/pgaudit/pgaudit)
- [wasmerio/wasmer-postgres](https://github.com/wasmerio/wasmer-postgres)
- [pgq/pgq](https://github.com/pgq/pgq)
  - Queue for PostgreSQL
- [knizhnik/imcs](https://github.com/knizhnik/imcs)
  - In-Memory Columnar Store
  - OLAP

## PL

- [plv8/plv8](https://github.com/plv8/plv8)
- [pllua/pllua](https://github.com/pllua/pllua)
- [tada/pljava](https://github.com/tada/pljava)

## 参考

- [Implementing Incremental View Maintenance for PostgreSQL](https://yugonagata-pgsql.blogspot.com/2021/06/implementing-incremental-view.html?m=1)
- [HN](https://news.ycombinator.com/item?id=28425379)
- [Waiting for PostgreSQL 14 – Improvements for handling large number of connections](https://www.depesz.com/2020/08/25/waiting-for-postgresql-14-improvements-for-handling-large-number-of-connections/)
- Audit
  - https://eager.io/blog/audit-postgres/
  - [How Postgres Audit Tables Saved Us From Taking Down Production](https://heap.io/blog/how-postgres-audit-tables-saved-us-from-taking-down-production)

## 工具

- https://pgmodeler.io/
- [ankane/pghero](https://github.com/ankane/pghero)
- [ankane/dexter](https://github.com/ankane/dexter)
- [ankane/pgslice](https://github.com/ankane/pgslice)
- [keithf4/pg_bloat_check](https://github.com/keithf4/pg_bloat_check)

## Scale

- [yandex/odyssey](https://github.com/yandex/odyssey)
- pgbouncer
- [pg-sharding/spqr](https://github.com/pg-sharding/spqr)
  - Stateless Postgres Query Router
- [awslabs/pgbouncer-rr-patch](https://github.com/awslabs/pgbouncer-rr-patch)
- [agroal/pgagroal](https://github.com/agroal/pgagroal)
  - connection pool
- [Replication, Clustering, and Connection Pooling](https://wiki.postgresql.org/wiki/Replication%2C_Clustering%2C_and_Connection_Pooling)

## Sync

- [ankane/pgsync](https://github.com/ankane/pgsync)
  - Ruby
  - sync table
- [toluaina/pgsync](https://github.com/toluaina/pgsync)
  - to elasticsearch
- [eulerto/wal2json](https://github.com/eulerto/wal2json)
- [jackc/pglogrepl](https://github.com/jackc/pglogrepl)
  - PostgreSQL logical replication library for Go

## Scale Stories

- [Herding elephants: Lessons learned from sharding Postgres at Notion](https://www.notion.so/blog/sharding-postgres-at-notion)
  - [HN](https://news.ycombinator.com/item?id=28776786)
  - [The data model behind Notion's flexibility](https://www.notion.so/blog/data-model-behind-notion)
- [Database “sharding” came from UO?](https://www.raphkoster.com/2009/01/08/database-sharding-came-from-uo/)
- [PostgreSQL at Scale: Database Schema Changes Without Downtime](https://medium.com/paypal-tech/20d3749ed680)
- [Why you don’t want to shard.](https://www.percona.com/blog/2009/08/06/why-you-dont-want-to-shard/)
- [Transaction ID Wraparound in Postgres](https://blog.sentry.io/2015/07/23/transaction-id-wraparound-in-postgres)
- [Re-architecting Slack’s Workspace Preferences: How to Move to an EAV Model to Support Scalability](https://slack.engineering/re-architecting-slacks-workspace-preferences-how-to-move-to-an-eav-model-to-support-scalability/)
- [PostgreSQL at Scale: Database Schema Changes Without Downtime](https://medium.com/p/20d3749ed680)
  - [HN](https://news.ycombinator.com/item?id=30458580)

# FAQ

## HA vs Horizontal Scale

- HA
  - 可以是 master-master 方式
  - 可以是 master-slave 方式
  - 但每个节点是完整数据
  - 强调可用
- HS
  - 每个节点数据不是完整的 - sharding
  - 目前只有 citus 提供这样的能力
  - 强调 partation
  - 增加节点
