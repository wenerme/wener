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

## Connect String / DSN

### PostgreSQL

- [libpq connect](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)
- host, hostaddr, port, dbname, user, password, passfile
- channel_binding, connect_timeout, client_encoding
- options
- application_name, fallback_application_name
- keepalives, keepalives_idle, keepalives_interval, keepalives_count
- tcp_user_timeout, tty
- replication
- gssencmode, krbsrvname, gsslib
- sslmode - prefer,disable,allow,require,verify-ca,verify-full
- requiressl, sslcompression, sslcert, sslkey, sslpassword, sslrootcert, sslcrl
- ssl_min_protocol_version, ssl_max_protocol_version
- requirepeer
- service
- target_session_attrs

```ini
# postgres
host=localhost port=5432 dbname=mydb connect_timeout=10
# postgresql://[user[:password]@][host][:port][,...][/dbname][?param1=value1&...]
postgresql://
postgres://

postgresql://other@localhost/otherdb?connect_timeout=10&application_name=myapp
postgresql://host1:123,host2:456/somedb?target_session_attrs=any&application_name=myapp

postgresql:///dbname?host=/var/lib/postgresql

# golang 支持 search path
# https://github.com/jackc/pgx
postgresql://example.com/mydatabase?search_path=myschema
host=192.168.1.1 database=apps user=apps password=apps search_path=apps,public
```

不支持设置 schema，可服务端控制

```sql
-- 针对用户修改
ALTER ROLE username SET search_path TO a,b,c;
-- 针对 db 修改
ALTER DATABASE database_name SET search_path TO schema1,schema2;
-- 全部只允许访问自己 schema
ALTER ROLE ALL SET search_path = "$user";

SELECT pg_catalog.set_config('search_path', '', false);
```

### SQLite

- cache
  - shared
  - private
- mode=ro|rw|rwc|memory
- immutable=1
- modeof=_filename_ - 生成的 db 匹配指定文件的 mode

---

- https://www.sqlite.org/uri.html
- https://www.sqlite.org/c3ref/open.html

## JDBC

- org.postgresql.Driver
- org.sqlite.JDBC
- org.mariadb.jdbc.JDBC
- com.mysql.jdbc.Driver - MySQL 5.1
- com.mysql.cj.jdbc.Driver
- org.h2.Driver

```pre title="DataGrid URL Template"
jdbc:postgresql://[{host::localhost}[:{port::5432}]][/{database:database/[^?]+:postgres}?][\?<&,user={user:param},password={password:param},{:identifier}={:param}>]
jdbc:postgresql://\[{host:ipv6:\:\:1}\][:{port::5432}][/{database:database/[^?]+:postgres}?][\?<&,user={user:param},password={password:param},{:identifier}={:param}>]
jdbc:postgresql:{database:database/(?!//)[^?]+:postgres}[\?<&,user={user:param},password={password:param},{:identifier}={:param}>]

jdbc:sqlite:!(:memory:){file::identifier.sqlite}?
jdbc:sqlite::memory:

jdbc:mysql://{host::localhost}?[:{port::3306}][/{database}?][\?<&,user={user},password={password},{:identifier}={:param}>]
jdbc:mysql://address=\(protocol=tcp\)\(<\)\(,host={host:host_ipv6:localhost},port={port::3306},user={user},password={password},{:identifier}={:param}>\)[/{database}][\?<&,{:identifier}={:param}>]
jdbc:mysql:///{database}?[\?<&,user={user},password={password},junixsocket.file={mysql.socket::/tmp/mysqld.sock},socketFactory={socketFactory:#param:org.newsclub.net.mysql.AFUNIXDatabaseSocketFactoryCJ},{:identifier}={:param}>]

jdbc:h2:tcp://{host::localhost}[:{port::9092}]/{database::default}[;<;,user={user:param},password={password:param},{:identifier}={:param}>]
jdbc:h2:mem:{database::default}?[;<;,{:identifier}={:param}>]
jdbc:h2:!(mem:)!(tcp://)[file:]{path:h2_db_file}[;<;,user={user:param},password={password:param},MV_STORE={MV_STORE:#param},{:identifier}={:param}>]
```

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
