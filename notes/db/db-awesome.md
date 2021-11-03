---
title: Database Awesome
tags:
  - Awesome
---

# Database Awesome

| name                 | stand for      |
| -------------------- | -------------- |
| Relational DBMS      | 关系型数据库   |
| Key-value stores     | KV 存储        |
| Document stores      | 文档存储       |
| Time Series DBMS     | 时序数据库     |
| Graph DBMS           | 图数据库       |
| Object oriented DBMS | 面向对象数据库 |
| Search engines       | 搜索引擎       |
| RDF stores           | RDF 存储       |
| Wide column stores   | 宽列存储       |
| Multivalue DBMS      | 多值数据库     |
| Native XML DBMS      | XML 数据库     |
| Spatial DBMS         | 空间数据库     |
| Event Stores         | 事件存储       |
| Content stores       | 内容存储       |
| Navigational DBMS    | 导航数据库     |

## 分布式

- [rqlite/rqlite](https://github.com/rqlite/rqlite)
  - SQLite + Raft
- [citusdata/citus](https://github.com/citusdata/citus)
  - PostgreSQL Sharding

## 实时数据库

- [MaterializeInc/materialize](https://github.com/MaterializeInc/materialize)
  - 基于 PostgreSQL
  - 实时的 `MATERIALIZED VIEW`
  - [CREATE SOURCE](https://materialize.com/docs/sql/create-source/)
    - 支持 Kafka, S3
- [supabase/supabase](https://github.com/supabase/supabase)
  - 基于 PostgreSQL
  - 类比 Firebase

## 时序

- [questdb/questdb](https://github.com/questdb/questdb)
  - Java, Apache 2.0
  - PostgreSQL 兼容协议
- [m3db/m3](https://github.com/m3db/m3)
  - from Uber
  - Distributed TSDB, Aggregator and Query Engine, Prometheus Sidecar, Graphite Compatible, Metrics Platform

## OLAP

- [duckdb/duckdb](https://github.com/duckdb/duckdb)
  - SQLite for OLAP, C++, MIT

## 图

- [JanusGraph/janusgraph](https://github.com/JanusGraph/janusgraph)

## 消息队列

- [Comparison of messaging patterns](https://github.com/obsidiandynamics/goharvest/wiki/Comparison-of-messaging-patterns)

## 有趣

- [TAO: Facebook’s Distributed Data Store for the Social Graph](https://www.micahlerner.com/2021/10/13/tao-facebooks-distributed-data-store-for-the-social-graph.html)
  - TAO - The Associations and Objects
  - [HN](https://news.ycombinator.com/item?id=29045443)
- [Hosting SQLite on Github Pages](https://phiresky.github.io/blog/2021/hosting-sqlite-databases-on-github-pages/)
- [EvgSkv/logica](https://github.com/EvgSkv/logica)
  - 逻辑编程转 SQL
- [ULID](https://github.com/ulid/spec)
  - [#41](https://github.com/ulid/spec/issues/41)
    PostgreSQL
  - extension
    - [edoceo/pg-ulid](https://github.com/edoceo/pg-ulid)
    - [iCyberon/pg_ulid](https://github.com/iCyberon/pg_ulid)
  - plpgsql
    - [geckoboard/pgulid](https://github.com/geckoboard/pgulid)
  - [UUIDv6](https://datatracker.ietf.org/doc/html/draft-peabody-dispatch-new-uuid-format-00)
    有点类似 ULID
- [Sharding & IDs at Instagram](https://instagram-engineering.com/1cf5a71e5a5c)
- [dolthub/dolt](https://github.com/dolthub/dolt)
  - Git for Data
- [ApsaraDB](https://github.com/ApsaraDB)

## Big Data

- [Practical SQL for Data Analysis](https://hakibenita.com/sql-for-data-analysis)

## Vector

- [erikbern/ann-benchmarks](https://github.com/erikbern/ann-benchmarks)
  - Benchmarks of approximate nearest neighbor
- [Not All Vector Databases Are Made Equal](https://towardsdatascience.com/9c65a3bd0696)

## Tools

- [sqlpad/sqlpad](https://github.com/sqlpad/sqlpad)
  - Web-based SQL editor and visualizing

## TBD

- [Database eLearning](https://db.grussell.org/index.html)
- [DB-Engines Ranking](https://db-engines.com/en/ranking)
- Aphyr [jepsen](https://aphyr.com/tags/jepsen)
- [EventQL](https://github.com/eventql/eventql)
  - [EventQL](http://eventql.io/) is a distributed, column-oriented database built for large-scale event collection and analytics. It runs super-fast SQL and MapReduce queries.
- [Carte](https://crate.io/)
  - SQL FOR THINGS DATA
  - Real-time SQL. Simple scaling. Millions of inserts per second.
  - CrateDB offers Standard-SQL, real-time queries and document support (JSON) in a simple, horizontal way to scale.
  - IoT & Sensors
    - Stream millions of data points per second into CrateDB and query them in real time to visualize, track, and predict.
  - Log & Event Analytics
    - Analyze logs from IT infrastructure to monitor security, compliance, usage, billing, and more.
  - Time Series, Geospatial, Machine Learning
    - Versatile SQL engine enables complex queries, text searches, and aggregations – in real time or against volumes of historic data.
- [caesar0301/awesome-public-datasets](https://github.com/caesar0301/awesome-public-datasets)
- https://dbmstools.com/
