---
title: PostgreSQL Awesome
---

# PostgreSQL Awesome

- [MaterializeInc/materialize](https://github.com/MaterializeInc/materialize)
  - 实时增量固化查询
- PipelineDB
- Superbase

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
