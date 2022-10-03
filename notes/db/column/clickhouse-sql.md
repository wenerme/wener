---
tags:
  - SQL
---

# Clickhouse SQL

## REST API

```bash
echo 'SELECT version()' | curl 'http://localhost:8123/' --data-binary @-

curl 'http://192.168.66.61:8123?query=select%20version()'
curl --get http://192.168.66.61:8123 --data-urlencode 'query=select version()'
```

## Query

```sql
select version();

select currentDatabase();
select currentProfiles();
select currentUser();
select currentRoles();
```

- CREATE TABLE
  - ENGINE
  - 列
    - DEFAULT - 设置默认值
    - MATERIALIZED
    - ALIAS - 别名列 - 不包含在 `*`
    - EPHEMERAL - 不会存储，不能被 SELECT 在 CREATE 可以被引用
    - compression_codec
      - 默认 lz4
      - NONE, LZ4
      - `LZ4HC(9)` - 1-12, 推荐 4-9
      - `ZSTD(1)` - 1-22
      - DEFLATE_QPL
      - 特殊编码
        - `Delta(delta_bytes)`
        - DoubleDelta
        - Gorilla - XOR - Gorilla TSDB
        - FPC
        - T64
      - 加密编码
        - AES_128_GCM_SIV
        - AES-256-GCM-SIV
    - TTL
- REPLACE TABLE
  - 只有 Atomic 引擎可以
- Dictionaries - `key -> attributes`
  - [外部](https://clickhouse.com/docs/en/sql-reference/dictionaries/external-dictionaries/external-dicts-dict-sources)
    - Local file
    - Executable File
    - Executable Pool
    - HTTP(s)
    - DBMS
      - ODBC
      - MySQL
      - ClickHouse
      - MongoDB
      - Redis
      - Cassandra
      - PostgreSQL

## JSON

- JSON -> `Object('json')`
- 目前还有很多问题

```sql
SET allow_experimental_object_type=1;
```

- [JSON Functions](https://clickhouse.com/docs/en/sql-reference/functions/json-functions/)
- [Working with JSON](https://clickhouse.com/docs/en/guides/developer/working-with-json)

### Alter Table JSON NO_SUCH_COLUMN_IN_TABLE

- https://github.com/ClickHouse/ClickHouse/issues/38517
- https://github.com/ClickHouse/ClickHouse/issues/37730

## Database Engines

- Atomic
- MySQL
- MaterializedMySQL
- Lazy
- PostgreSQL
- MaterializedPostgreSQL
- Replicated
- SQLite

```sql
CREATE DATABASE sqlite_database
ENGINE = SQLite('db_path');
```

## Table Engine

| MergeTree Family             | Log Family | Integrations    | Special          |
| ---------------------------- | ---------- | --------------- | ---------------- |
| MergeTree                    | StripeLog  | ODBC            | Distributed      |
| ReplacingMergeTree           | Log        | JDBC            | MaterializedView |
| SummingMergeTree             | TinyLog    | MySQL           | Dictionary       |
| AggregatingMergeTree         |            | MongoDB         | Merge            |
| CollapsingMergeTree          |            | HDFS            | File             |
| VersionedCollapsingMergeTree |            | S3              | Null             |
| GraphiteMergeTree            |            | Kafka           | Set              |
|                              |            | EmbeddedRocksDB | Join             |
|                              |            | RabbitMQ        | URL              |
|                              |            | PostgreSQL      | View             |
|                              |            |                 | Memory           |
|                              |            |                 | Buffer           |

- [Table Engines](https://clickhouse.com/docs/en/engines/table-engines/)

### MergeTree

- MergeTree
  - `ORDER BY tuple()` 表示不需要排序
  - 索引
    - annoy - 空间
- `Replicated*`
  - table 维度
  - 包含: INSERT, ALTER
  - 不包含: CREATE, DROP, ATTACH, DETACH, RENAME
    - RENAME - 可以让副本表名字不同
- [ReplacingMergeTree([ver])](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/replacingmergetree/)
  - 基于 sorting key 去重
  - 默认 保留最后插入
  - 如果给定了 ver 则会基于 ver 排序选择最终保留的
    - ver 类型为 `UInt*`, `Date`, `DateTime`, `DateTime64`
- SummingMergeTree
  - 合并相同 PK 到同一行，其他数据进行求和
- AggregatingMergeTree
  - 自定义合并聚合逻辑 - 类似 SummingMergeTree
- CollapsingMergeTree
  - 基于 Sign 删除重复 - 可以多个相同数据
  - Sign = 1 - state
  - Sign = -1 - cancel
- VersionedCollapsingMergeTree
  - 在 CollapsingMergeTree 之上添加版本信息

## Mutation

```sql
-- 0 async, 1 sync
set mutations_sync=0;

select * from system.mutations;
```

# FAQ

## SELECT \*

- 不包含 MATERIALIZED 和 ALIAS
- 大数据量时很少使用

## Cannot iterate over non-finalized ColumnObject

JSON 列有问题

## Memory limit (for query) exceeded


# Snippets

```bash
SET describe_extend_object_types=1
DESCRIBE tab
```

**TableSize**

```sql
SELECT table,
       formatReadableSize(sum(bytes_on_disk))           as disk_size,
       formatReadableSize(sum(data_compressed_bytes))   as compressed_size,
       formatReadableSize(sum(data_uncompressed_bytes)) as uncompressed_size,
       min(min_date)                                    as min_date,
       max(max_date)                                    as max_date
FROM system.parts
WHERE active
GROUP BY table
ORDER BY sum(bytes_on_disk) DESC;
```

## SQLite database file path must be inside 'user_files' directory. (PATH_ACCESS_DENIED)

- 默认 /var/lib/clickhouse/user_files/
- https://clickhouse.com/docs/en/operations/server-configuration-parameters/settings/#server_configuration_parameters-user_files_path

## FINAL

```sql
-- force collapsing, dedup, operation
SELECT * FROM events FINAL;
```
