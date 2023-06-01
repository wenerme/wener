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
| Column stores        | 列存储         |
| Multivalue DBMS      | 多值数据库     |
| Native XML DBMS      | XML 数据库     |
| Spatial DBMS         | 空间数据库     |
| Event Stores         | 事件存储       |
| Content stores       | 内容存储       |
| Navigational DBMS    | 导航数据库     |

- https://db-engines.com/en/ranking
- https://db-benchmarks.com/

## 理论

- Sargable - Search ARGument ABLE
  - wikipedia [Sargable](https://en.wikipedia.org/wiki/Sargable)
  - 定义查询可利用索引的场景

## 分布式

- [rqlite/rqlite](https://github.com/rqlite/rqlite)
  - SQLite + Raft
- PostgreSQL
  - [citusdata/citus](./relational/postgresql/citus.md)
    - PostgreSQL Sharding
  - [cdb](./newsql/cockroachdb.md)
  - [yugabyte/yugabyte-db](./newsql/yugabytedb.md)
  - [ydb-platform/ydb](https://github.com/ydb-platform/ydb)
- MySQL
  - Viteness
  - TiDB

## 时序数据库 {#time-series}

> 1. 可观察性 - 日志、指标、追踪
> 1. IoT

- [timescale](./relational/postgresql/timescale.md)
- [CeresDB/ceresdb](https://github.com/CeresDB/ceresdb)
- [GreptimeTeam/greptimedb](https://github.com/GreptimeTeam/greptimedb)
- [questdb/questdb](https://github.com/questdb/questdb)
  - Java, Apache 2.0
  - PostgreSQL 兼容协议
- [m3db/m3](https://github.com/m3db/m3)
  - from Uber
  - Distributed TSDB, Aggregator and Query Engine, Prometheus Sidecar, Graphite Compatible, Metrics Platform
- [taosdata/TDengine](https://github.com/taosdata/TDengine)

## 实时数据库

- [MaterializeInc/materialize](https://github.com/MaterializeInc/materialize)
  - 基于 PostgreSQL
  - 实时的 `MATERIALIZED VIEW`
  - [CREATE SOURCE](https://materialize.com/docs/sql/create-source/)
    - 支持 Kafka, S3
- [supabase/supabase](https://github.com/supabase/supabase)
  - 基于 PostgreSQL
  - 类比 Firebase

## OLAP

Cube 计算

- [duckdb/duckdb](https://github.com/duckdb/duckdb)
  - SQLite for OLAP, C++, MIT
- Apache Druid
- Apache Kylin
- Apache Pinot
- ClickHouse
- [Comparison of OLAP servers](https://en.wikipedia.org/wiki/Comparison_of_OLAP_servers)

## OLTP

- [stoneatom/stonedb](https://github.com/stoneatom/stonedb)
  - GPLv2, C++
  - MySQL HTAP and MySQL-native database for oltp, real-time analytics

## Column Store

- 面向分析
- [Clickhouse](./column/clickhouse.md)
- [DuckDB](./column/duckdb.md)
- Apache Druid
- Apache Pinot
- InfluxDB
- PostgreSQL cstore_fdw, vops
  - ORC
- [greenplum-db/gpdb](https://github.com/greenplum-db/gpdb)
- format
  - orc
  - parquet
- [List of column-oriented DBMSes](https://en.wikipedia.org/wiki/List_of_column-oriented_DBMSes)

## Wide-Column

- 宽列 - 二维 KV
  - 并非标准列存储
- [Scylla](./column/scylladb.md)
- [Apache Cassandra](./column/cassandra.md)
- Apache Accumulo
- Apache HBase
- Hypertable
- 商业
  - Bigtable
  - DataStax Enterprise
  - DataStax Astra DB
  - Azure Tables

## 图

- [JanusGraph/janusgraph](https://github.com/JanusGraph/janusgraph)

## Stream

- airbyte
- nifi
- [benthosdev/benthos](https://github.com/benthosdev/benthos)

## 消息队列

- [Comparison of messaging patterns](https://github.com/obsidiandynamics/goharvest/wiki/Comparison-of-messaging-patterns)

## Data versioning

- [dolthub/dolt](https://github.com/dolthub/dolt)
  - Apache-2.0, Go
  - Git for Data
- [treeverse/lakeFS](https://github.com/treeverse/lakeFS)
  - Apache-2.0, Go
  - Data version control for your data lake
  - https://lakefs.io/blog/dvc-vs-git-vs-dolt-vs-lakefs/
- Git LFS
- DVS

## 有趣

- [wiredtiger/wiredtiger](https://github.com/wiredtiger/wiredtiger)
  - MongoDB
- [tantaman/aphrodite](https://github.com/tantaman/aphrodite)
- [facebookincubator/LogDevice](https://github.com/facebookincubator/LogDevice)
  - Distributed storage for sequential data
- [FerretDB/FerretDB](https://github.com/FerretDB/FerretDB)
  - Apache-2.0, Go
  - mongodb wire protocol to PostgreSQL
- [fcoury/oxide](https://github.com/fcoury/oxide)
  - Apache-2.0, Rust
  - mongodb wire protocol to PostgreSQL
- [alash3al/redix](https://github.com/alash3al/redix)
  - Apache-2.0, Go
  - redis wire protocol to PostgreSQL
- [TAO: Facebook’s Distributed Data Store for the Social Graph](https://www.micahlerner.com/2021/10/13/tao-facebooks-distributed-data-store-for-the-social-graph.html)
  - TAO - The Associations and Objects
  - [HN](https://news.ycombinator.com/item?id=29045443)
- [EvgSkv/logica](https://github.com/EvgSkv/logica)
  - 逻辑编程转 SQL
- [ApsaraDB](https://github.com/ApsaraDB)
  - by Alibaba
- [xtdb/xtdb](https://github.com/xtdb/xtdb)
  - MIT, Clojure
- [codenotary/immudb](https://github.com/codenotary/immudb)
  - immutable database
- [maxmunzel/kvass](https://github.com/maxmunzel/kvass)
  - MIT, Go
  - personal key-value store
- [debezium/debezium](https://github.com/debezium/debezium)
  - Apache-2.0, Java
  - CDC - Change data capture
- [nhost/nhost](https://github.com/nhost/nhost)
  - MIT, TS
  - Hasura+S3
  - Firebase Alternative with GraphQL
- [surrealdb/surrealdb](https://github.com/surrealdb/surrealdb)
  - 服务端 Rust, BSL
  - 概念 NAMESPACE, DATABASE
  - 本地存储: RocksDB
  - 分布式存储: tikv

```bash
docker run --rm -p 8000:8000 surrealdb/surrealdb:latest start --log debug --user root --pass root

curl --request POST \
  --header "Accept: application/json" \
  --user "root:root" \
  --data "INFO FOR DB;" \
  http://localhost:8000/sql
```

## SQLite Awesome

- [benbjohnson/litestream](./relational/litestream.md)
  - Apache-2.0, Go
  - Streaming replication for SQLite
  - 外部进程
  - 将一个 sqlite 同步到另外的 sqlite - 依赖中间存储
- [superfly/litefs](./relational/litefs.md)
  - 基于 fuse 的 litestream - 批量同步
- [maxpert/marmot](https://github.com/maxpert/marmot)
  - 基于 NATS 同步 sqlite
- [proofrock/ws4sqlite](https://github.com/proofrock/ws4sqlite)
  - Query sqlite via http
  - [HN](https://news.ycombinator.com/item?id=30636796)
- [Hosting SQLite on Github Pages](https://phiresky.github.io/blog/2021/hosting-sqlite-databases-on-github-pages/)
- [subzerocloud/blue-steel](https://github.com/subzerocloud/blue-steel)
  - RUST
  - REST api for SQLite & PostgreSQL
- https://lumosql.org/
  - SQLite+LMDB
- [tantaman/conflict-free-sqlite](https://github.com/tantaman/conflict-free-sqlite)
- [pocketbase/pocketbase](https://github.com/pocketbase/pocketbase)
  - MIT, Go
  - realtime backend in 1 file
- 分布式
  - [dqlite](https://github.com/canonical/dqlite)
    - GPLv3, C
  - [rqlite](https://github.com/rqlite/rqlite)
    - MIT, Golang
    - HTTPS API
    - node-discovery & automatic clustering - Kubernetes, Consul, etcd, DNS
    - [hashicorp/raft](https://github.com/hashicorp/raft)
    - https://github.com/rqlite/rqlite/blob/master/DOC/PERFORMANCE.md
    - In-memory DB < 2GB
    - 只能用 deterministic SQL - 因为 raft 复制，幂等
  - [losfair/mvsqlite](https://github.com/losfair/mvsqlite)
    - Apache-2.0, Rust
    - MVCC SQLite that runs on FoundationDB
  - [bloomberg/comdb2](https://github.com/bloomberg/comdb2)
    - Apache-2.0, C
- [LumoSQL/LumoSQL](https://github.com/LumoSQL/LumoSQL)

## ID

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
- [niieani/hashids.js](https://github.com/niieani/hashids.js)
  - YouTube-like ids
- [Sharding & IDs at Instagram](https://instagram-engineering.com/1cf5a71e5a5c)

## Big Data

- [Practical SQL for Data Analysis](https://hakibenita.com/sql-for-data-analysis)

## Vector

面向向量的多用于 **搜索** 和 **机器学习**。

> Vector -> `number[]`

:::tip

- [ClickHouse#35101](https://github.com/ClickHouse/ClickHouse/issues/35101)
  Indexed Vector Similarity and kNN Search

:::

- pg_vector
- [qdrant/qdrant](https://github.com/qdrant/qdrant)
  - Apache-2.0, Rust
- [milvus-io/milvus](https://github.com/milvus-io/milvus)
  - Apache-2.0, Go
  - Vector database for scalable similarity search and AI applications.
- [weaviate/weaviate](https://github.com/weaviate/weaviate)
  - BSD-3, Golang
  - cloud-native, modular, real-time vector search engine
- [facebookincubator/velox](https://github.com/facebookincubator/velox)
  - Apache-2.0, C++
  - C++ vectorized database acceleration library
- [erikbern/ann-benchmarks](https://github.com/erikbern/ann-benchmarks)
  - Benchmarks of approximate nearest neighbor
- [eto-ai/lance](https://github.com/eto-ai/lance)
  - Apache-2.0, Rust
  - columnar format
- [lancedb/lancedb](https://github.com/lancedb/lancedb)
  - Apache-2.0, Rust
- [Not All Vector Databases Are Made Equal](https://towardsdatascience.com/9c65a3bd0696)
- https://gpt-index.readthedocs.io/en/latest/examples/vector_stores/LanceDBIndexDemo.html
- [jerryjliu/llama_index](https://github.com/jerryjliu/llama_index)
- Lib
  - [nmslib/hnswlib](https://github.com/nmslib/hnswlib)
  - [facebookresearch/faiss](https://github.com/facebookresearch/faiss)
    - MIT, C++
    - efficient similarity search and clustering of dense vectors

## Geo

- https://s2geometry.io/
- [uber/h3](https://github.com/uber/h3)
  - Apache-2.0, C
  - Hexagonal hierarchical geospatial indexing system

## Tools

- [Netflix/ndbench](https://github.com/Netflix/ndbench)
  - Data Store Benchmark

## Interactive

- [pocketbase/pocketbase](https://github.com/pocketbase/pocketbase)
  - MIT, Go, SQLite
- [sqlpad/sqlpad](https://github.com/sqlpad/sqlpad)
  - Web-based SQL editor and visualizing
- [pinterest/querybook](https://github.com/pinterest/querybook)
- [chartbrew/chartbrew](https://github.com/chartbrew/chartbrew)
  - MIT, Node.js
  - Data visualization tool for SQL databases

## Library

- Parser/SQL
  - [prql/prql](https://github.com/prql/prql)
    - Apache-2.0, Rust
    - Pipelined Relational Query Language
  - [Open Source SQL Parsers](https://tokern.io/blog/open-source-sql-parsers/)
    - [HN](https://news.ycombinator.com/item?id=31107231)
    - https://stripe.com/en-gb/sigma

## 迁移/升级/Schema 变更/Migration {#migration}

> 不需要重复部署的环境可以不用考虑

:::info 常见模式迁移

1. DSL - XML, YAML, HCL

- 支持 diff
- 多一层学习成本
- 支持多种数据库
- 还支持除了 table 以外的对象
- 必须先写 DSL - SSOT

2. SQL

- 概念简单
- 能利用所有 SQL 能力
- 支持很多场景
- 版本管理为主

3. ORM -> SQL

- 类似 DSL
- 减少额外定义 DSL
- 生成 SQL 不透明
- 功能局限
- 一般 diff 不会做移除列操作
- 局限于 table

:::

:::info 版本目录模式

- `[version]-[title].sql`
  - 通过 注释 分割 up/down
  - `--- up`
  - `--- down`
- `[version]-[title].<up|down>.sql`
- `[version]-[title]/` - 目录区分版本
  - `up.sql`
  - `down.sql`

:::


- Java
  - flywaydb
    - Apache-2.0, SQL
    - `db/migration/<Prefix><Version>__<Description>.sql`
    - `mvn clean flyway:migrate -Dflyway.configFiles=myFlywayConfig.conf`
    - IDEA JPA Budy 有 Flyway 集成
  - liquibase
    - XML
- Golang
  - [ariga/atlas](https://github.com/ariga/atlas)
    - DSL, Go
  - [golang-migrate/migrate](../languages/go/lib/migrate.md)
    - MIT, Go
    - `VER_DESC.<up|down>.sql`
    - `migrate create -ext sql -dir db/migrations -seq create_users_table`
  - [amacneil/dbmate](https://github.com/amacneil/dbmate)
    - SQL, Go
    - framework-agnostic database migration tool
    - 注释分割 `-- migrate:up`
  - [pressly/goose](https://github.com/pressly/goose)
    - MIT, SQL/Go
- NodeJS
  - [sequelize/umzug](https://github.com/sequelize/umzug)
    - MIT, SQL/DSL
    - sequelize
    - mikro-orm https://mikro-orm.io/docs/migrations
  - [salsita/node-pg-migrate](https://github.com/salsita/node-pg-migrate)
    - MIT, DSL
  - [graphile/migrate](https://github.com/graphile/migrate)
    - MIT, SQL
    - 支持 current 概念
  - [tj/node-migrate](https://github.com/tj/node-migrate)
    - MIT, Code
- 平台/服务/工具
  - [bytebase/bytebase](https://github.com/bytebase/bytebase)
    - MIT, Go, Vue
    - Safe database schema change and version control for DevOps teams.
- [djrobstep/migra](https://github.com/djrobstep/migra)
  - PG Schema Diff
- [fabianlindfors/reshape](https://github.com/fabianlindfors/reshape)
  - zero-downtime schema migration tool for Postgres
- [sqitchers/sqitch](https://github.com/sqitchers/sqitch)
  - MIT, Perl
- [skeema](https://github.com/skeema/skeema)
  - MySQL & MariaDB
- sqlite [user_version](https://sqlite.org/pragma.html#pragma_user_version)
- [rickbergfalk/postgrator](https://github.com/rickbergfalk/postgrator)
- Hasura - https://hasura.io/docs/latest/migrations-metadata-seeds/manage-migrations/
  - `VER_DESC/<up|down>.sql`

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

## Read

- [How and why the Relational Model works for databases](https://blog.the-pans.com/relational/)
- Youtube [Database Fundamentals: Memory, Storage and ACID Guarantees](https://youtu.be/JOrXRsES3mk)
