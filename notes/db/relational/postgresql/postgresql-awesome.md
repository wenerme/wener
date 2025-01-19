---
title: PostgreSQL Awesome
tags:
  - Awesome
---

# PostgreSQL Awesome

**扩展插件功能**

1. 数据功能 - 数据类型、操作类型、索引类型
1. 服务功能 - 集群、cron、存储引擎
1. 查询能力 - 图、流、GIS
1. 集成功能 - Redis、ES
1. 语言功能 - JS、Lua、Java

---

- [neondatabase/neon](https://github.com/neondatabase/neon)
  - Apache-2.0, Rust
  - Serverless Postgres
- [orioledb/orioledb](./orioledb.md)
  - storage engine
  - [slide](https://www.slideshare.net/AlexanderKorotkov/solving-postgresql-wicked-problems)
  - [HN](https://news.ycombinator.com/item?id=30462695)
    author [akorotkov](https://news.ycombinator.com/threads?id=akorotkov)
- [Vonng/pigsty](https://github.com/Vonng/pigsty)
  - Apache-2.0
  - 国产
  - Battery-Included Distribution for PostgreSQL
- [MaterializeInc/materialize](https://github.com/MaterializeInc/materialize)
  - 实时增量固化查询
- Superbase
- [PostgresApp/PostgresApp](https://github.com/PostgresApp/PostgresApp)
  - macOS 应用
- PipelineDB - 停止
- DB to API
  - [Postgrest](https://github.com/begriffs/postgrest)
    - REST API for any Postgres database
  - [pRest](https://github.com/prest/prest)
    - Golang
    - GET
      - query
        - \_page, \_page_size, \_select=FIELD, \_count=FIELD_NAME, \_count_first=true, \_renderer=xml, \_distinct=true, \_order=-FIELD, \_groupby=FIELD, \_FIELD=VALUE
        - \_join
      - aggregation - SUM, AVG, MAX, MIN, STDDEV, VARIANCE
        - sum:FIELD
      - op - `$eq`
        - gt,gte,lt,lte,ne,in,nin,null,notnull,true,nottrue,false,notfalse,like,ilike,nilike,ltreelanc, ltreerdesc,ltreematch,ltreematchtxt
  - supabase
  - Hasura

## Extension

- TimescaleDB
- [Mooncake-Labs/pg_mooncake](https://github.com/Mooncake-Labs/pg_mooncake)
  - MIT, C++
  - columnar storage, vectorized execution (DuckDB)
  - Columnstore tables are stored as Iceberg or Delta Lake
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
- [supabase/supa_audit](https://github.com/supabase/supa_audit)
  - Generic Table Auditing
  - 纯 SQL
  - [Postgres Auditing in 150 lines of SQL](https://supabase.com/blog/2022/03/08/audit)
- [wasmerio/wasmer-postgres](https://github.com/wasmerio/wasmer-postgres)
- [pgq/pgq](https://github.com/pgq/pgq)
  - Queue for PostgreSQL
- [knizhnik/imcs](https://github.com/knizhnik/imcs)
  - In-Memory Columnar Store
  - OLAP
- [heterodb/pg-strom](https://github.com/heterodb/pg-strom)
  - accelerate mostly batch and analytics workloads with utilization of GPU and NVME-SSD
- [tembo-io/pgmq](https://github.com/tembo-io/pgmq)
  - PostgreSQL, Rust
  - lightweight message queue

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

## Internal

- https://postgrespro.com/community/books/internals
  - https://news.ycombinator.com/item?id=32088316
- http://www.interdb.jp/pg/index.html
- https://github.com/vishesh92/pg-primer

## 工具

- https://pgmodeler.io/
- ankane
  - [ankane/pghero](https://github.com/ankane/pghero)
  - [ankane/dexter](https://github.com/ankane/dexter)
    - automatic indexer
  - [ankane/pgslice](https://github.com/ankane/pgslice)
- [keithf4/pg_bloat_check](https://github.com/keithf4/pg_bloat_check)
- WAL
  - [wal-g/wal-g](https://github.com/wal-g/wal-g)
    - Apache-2.0, Golang
    - vs wal-e
      - LZ4, LZMA, Brotli
      - 多核处理
    - [Introducing WAL-G by Citus: Faster Disaster Recovery for Postgres](https://www.citusdata.com/blog/2017/08/18/introducing-wal-g-faster-restores-for-postgres/)
  - [wal-e/wal-e](https://github.com/wal-e/wal-e)
    - BSD-3, Python
    - 不再维护
- Web
  - https://github.com/commandprompt/pgmanage

## Scale

- [yandex/odyssey](https://github.com/yandex/odyssey)
- pgbouncer
- [postgresml/pgcat](https://github.com/postgresml/pgcat)
  - MIT, Rust
  - sharding, load balancing, failover
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
- retool [How we upgraded our 4TB Postgres database](https://retool.com/blog/how-we-upgraded-postgresql-database/)
  - [HN](https://news.ycombinator.com/item?id=31084147)
- [The growing pains of database architecture](https://www.figma.com/blog/how-figma-scaled-to-multiple-databases/)
  - AWS 最大实例 r5.24xlarge
  - 96C 768GiB 25Gbps
  - 加了 PgBouncer
  - 水平扩容

## FDW

- [tembo-io/prometheus_fdw](https://github.com/tembo-io/prometheus_fdw)

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
