---
title: PostgreSQL Awesome
---

# PostgreSQL Awesome

- [MaterializeInc/materialize](https://github.com/MaterializeInc/materialize)
  - 实时增量固化查询
- PipelineDB
- Superbase
- [PostgresApp/PostgresApp](https://github.com/PostgresApp/PostgresApp)
  - macOS 应用

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

## PL

- [plv8/plv8](https://github.com/plv8/plv8)
- [pllua/pllua](https://github.com/pllua/pllua)
- [tada/pljava](https://github.com/tada/pljava)

## Read

- [HN](https://news.ycombinator.com/item?id=28425379)

## Sync

- [ankane/pgsync](https://github.com/ankane/pgsync)
  - Ruby
  - sync table
- [toluaina/pgsync](https://github.com/toluaina/pgsync)
  - to elasticsearch

## Scale Stories

- [Herding elephants: Lessons learned from sharding Postgres at Notion](https://www.notion.so/blog/sharding-postgres-at-notion)
  - [HN](https://news.ycombinator.com/item?id=28776786)
  - [The data model behind Notion's flexibility](https://www.notion.so/blog/data-model-behind-notion)
- [Database “sharding” came from UO?](https://www.raphkoster.com/2009/01/08/database-sharding-came-from-uo/)
- [PostgreSQL at Scale: Database Schema Changes Without Downtime](https://medium.com/paypal-tech/20d3749ed680)
- [Why you don’t want to shard.](https://www.percona.com/blog/2009/08/06/why-you-dont-want-to-shard/)
- [Transaction ID Wraparound in Postgres](https://blog.sentry.io/2015/07/23/transaction-id-wraparound-in-postgres)
- [Re-architecting Slack’s Workspace Preferences: How to Move to an EAV Model to Support Scalability](https://slack.engineering/re-architecting-slacks-workspace-preferences-how-to-move-to-an-eav-model-to-support-scalability/)

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
