---
title: Database FAQ
tags:
  - FAQ
---

# Database FAQ

## How to choose database

:::tip

- 90% 场景选择 PostgreSQL
- 优先考虑 **垂直** 扩容
  - delay 问题

:::

1. 场景

- OLTP 关系型 - PostgreSQL, MySQL
- NoSQL 性能型 - KV, Memory Grid
- OLAP 分析型 - Column
- 特殊场景
  - Graph
  - Document - MongoDB, FerratDB
  - Search - OpenSearch, [solr](./search/solr.md), [manticoresearch](./search/manticoresearch.md)
  - Auth/Zanzibar - spicedb
  - MBaaS/Mobile - CouchDB, supabase, hasura, prisma, strapi
  - Secret/Security - Vault
  - Logging
  - Metrics
  - Treacing

1. 访问模式

- 精准访问 - KV, OLTP
- 批量访问 - OLAP
- 便利关系 - Graph
- 部分投射 - Column

1. 分布式 - 如果要优先考虑分布式

- Citus
- Clickhouse, Scylldb
- OpenSearch

1. 聚合分析 - 计算、缓存、分析

- cubejs, superset, trino

## Tradeoff OLTP vs OLAP vs NoSQL

- OLTP
  - ACID 必须
  - Latency
    - 90% < 100ms
    - 99% < 1s
  - 数据量
    - 90% < 1G
    - 99% < 1T
  - 大多查询命中索引
  - 大多查询为精准数据
- OLAP
  - Latency
    - 50% < 1s
    - 90% > 1m
  - 数据量
    - 90% > 1T
  - 大多查询访问大量数据
  - 一般 默认支持分布式
- NoSQL
  - 大多以命中内存为主
  - KV 方式查询为主
  - 满足特殊需求
  - 一般 默认支持分布式

---

案例: 8G 小文件数据, hash -> blob

- ClickHouse < 1m
- ScyllaDB - 触发 large data 警告, 触发写超时

## OLTP vs OLAP vs NoSQL vs NewSQL vs Data Warehouse vs Data Mart vs Data Lake

- OLTP
  - 面向交易场景
  - 强事务，强一致，较低 RT，低频度更新
  - 存储实时数据，数据量小
- OLAP
  - 面向分析报表统计，以读为主
  - 弱事务，弱一致性，对响应有一定要求
  - 存储明细数据，历史数据，数据量大
- NoSQL
  - 应付特殊场景
  - 例如：吞吐、延时、操作便携、数据量、实时、并发、搜索、外部集成、数据组织模式（图、空间、时序）
  - 接口形式各不相同，事务保障各部相同
- NewSQL
  - 接口是 SQL 标准的 NoSQL
  - 具有 OLTP 的属性，能横向扩容
  - 一般 SQL 引擎 + 分布式 KV 存储实现
  - 通常会实现 MySQL 或 PostgreSQL 的协议
- [Data Warehouse](https://en.wikipedia.org/wiki/Data_warehouse)
  - 数据仓库
  - 企业纬度的数据管控
  - 一套系统，体系化的解决企业内部数据存储、处理、分析问题
  - 数据量巨大，对响应要求低
  - 统一平台，由很多部分组成，有开发平台
  - 面向开发和 BI
  - 面向企业整体
  - 数据有一定结构
- [Data Mart](https://en.wikipedia.org/wiki/Data_mart)
  - 数据仓库的一种特殊形式，数据仓库的子集
  - 面向业务、组织部门、某一领域
  - 企业内一定数据共享，数据具有结构性
- Data Lake
  - 存储原始数据，保持低廉的存储成本
  - 规模和数据量比 DW 大，处理更慢，读取时定义数据结构
  - Hadoop 是 DL，而在这之上的 HBase 则是 DW
  - 一般数据不允许更新

## OLTP vs OLAP

- https://www.stitchdata.com/resources/oltp-vs-olap/

## page size

- sqlite - 4096 - 4k
- postgres - 8192 - 8k
- mysql innodb 16k
  - innodb_page_size

```sql
-- SQLite
PRAGMA page_size;
-- PostgreSQL
SELECT current_setting('block_size');
-- MySQL
SHOW TABLE STATUS;
```

## MySQL vs MariaDB

- MySQL
  - 8.2.0 不提供基于 debian 的 镜像 https://hub.docker.com/_/mysql
- MariaDB
- [Percona Server for MySQL](https://github.com/percona/percona-server)

---

- GUID 不同
- MariaDB 10.X 和 MySQL 8.X 不再兼容
- AlpineLinux 下 mysql 为 mariadb
- 参考
  - vitess 不支持 mariadb
    - RFC: Deprecate MariaDB Support in 2022 and Remove in 2023 [vitess#9518](https://github.com/vitessio/vitess/issues/9518)
  - https://blog.devart.com/mysql-vs-mariadb.html

## 为什么不要选择 MySQL

**为什么会选择 MySQL**

1. 开发人员经历大多还停留在 MySQL 5.7
1. 历史遗留项目
1. 曾经 MySQL 确实是不二的选择
1. 用了特殊的 MySQL fork
1. Master Slave 逻辑简单
1. MyISAM 性能好，虽然不 ACID

**为什么不要选择 MySQL**

1. 如果新项目需要选择 MySQL 8.0 那么不如考虑切换到 PostgreSQL
1. 考虑 MariaDB ？ 那么不如考虑 PostgreSQL
1. 协议更严格
1. 缺少很多 SQL 特性
  - 因为没有所以不知道
  - 非常影响项目开发和选项

- https://www.guru99.com/postgresql-vs-mysql-difference.html

## 软删除实现唯一索引

```sql
create temporary table if not exists test
(
    id         text        not null default public.gen_ulid() primary key,
    uid        uuid        not null default gen_random_uuid() unique,
    eid        text        null,
    created_at timestamptz not null default current_timestamp,
    updated_at timestamptz not null default current_timestamp,
    deleted_at timestamptz,

    username   text        not null
);
truncate table test;

-- 通常的唯一索引
create unique index test_username_key on test (username);

-- 插入数据
insert into test(username) values ('wener');

-- 软删除
update test
set deleted_at=current_timestamp
where username = 'wener';

-- 插入失败 - 已经删除的记录影响新数据
insert into test(username) values ('wener');
-- 移除索引
drop index test_username_key;

-- postgres 条件索引忽略针对未删除的唯一
-- postgres 15 之后支持针对 null 也算唯一，创建联合索引即可
-- mysql 可以使用联合索引，将 deleted_at 默认为 0
create unique index test_username_key on test (username) where deleted_at is null;

-- 成功 - 删除数据不影响
insert into test(username) values ('wener');
-- 失败 - 已经存在了
insert into test(username) values ('wener');
-- 删除 - 再次软删除
update test
set deleted_at=current_timestamp
where username = 'wener'
  and deleted_at is null;
-- 成功 - 再次插入
insert into test(username) values ('wener');

-- 三条记录
select *
from test;
```

## MongoDB vs PostgreSQL

- MongoDB
  - SSPL
  - 文档模型
  - BSON
  - 面向水平扩容设计
  - 面向简单查询
  - 单文档原子修改
- PostgreSQL
  - PostgreSQL License - 类似 MIT
  - 行模型
  - JSONB
  - 可以水平和垂直扩容
  - ACID
  - [FerretDB](./relational/postgresql/ferretdb.md) 提供兼容协议

## MySQL vs PostgreSQL

- MySQL CE
  - GPL
  - by Oracle
  - 大小写不敏感
  - 一个链接一个线程
  - GROUP BY 时支持 SELECT 非聚合列
- Postgres
  - PostgreSQL License - 类似 MIT
  - 大小写敏感
  - 一个链接一个进程
  - 生态更好
  - 支持 Schema
  - 支持 RLS
  - 支持更多 JSON 特性 - 操作、索引
  - 支持更多 CTE
  - 支持 扩展

---

- https://www.bytebase.com/blog/postgres-vs-mysql/
