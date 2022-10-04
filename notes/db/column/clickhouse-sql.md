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

## 数据类型 {#data-types}

> 支持范型的强类型 Schema

- UInt8, UInt16, UInt32, UInt64, UInt256, Int8, Int16, Int32, Int64, Int128, Int256
  - Int8 — TINYINT, BOOL, BOOLEAN, INT1.
  - Int16 — SMALLINT, INT2.
  - Int32 — INT, INT4, INTEGER.
  - Int64 — BIGINT
- Float32, Float64
  - FLOAT, DOUBLE
- Decimal(P, S), Decimal32(S), Decimal64(S), Decimal128(S), Decimal256(S)
  - P - precision - [ 1 : 76 ]
  - S - scale - [ 0 : P ]
  - P [ 1 : 9 ] - Decimal32(S)
  - P [ 10 : 18 ] - Decimal64(S)
  - P [ 19 : 38 ] - Decimal128(S)
  - P [ 39 : 76 ] - Decimal256(S)
- Boolean
  - UInt8 - 0,1
- String
  - 如果创建 VARCHAR(255) 会忽略长度
- FixedString(N) - N bytes
- UUID
- Date
  - 2byte, days since 1970-01-01
  - 最大 2148 年
- `DateTime([timezone])`
  - unix timestamp
  - 最大 2105 年
- `DateTime64(precision, [timezone])`
  - Int64, epoch
  - precision=3 则是毫秒级
- `Enum('k1'=1,'k2'=2)`
- LowCardinality(data_type)
  - change internal to dictionary-encoded
- array(T) - `[]`
- `AggregateFunction(name, types_of_arguments…)`
- Nested - 嵌套类型 - 类似定义一个 struct
- `tuple(T1, T2, ...)`
- 特殊类型
  - Set
  - Nothing
  - Interval
- 域类型
  - IPv4, IPv6
- Geo 类型
  - Point, Ring, Polygon, MultiPolygon
- Map(key, value)

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

- MergeTree - 建议用于单节点
  - 列存储
  - 基于 PK 排序
  - 支持副本
  - 支持采样
  - 自定义分片
  - sparse primary index
  - secondary data-skipping indexes
  - `ORDER BY tuple()` 表示不需要排序
  - 索引
    - annoy - 空间
- `Replicated*` - 副本 - 用于多节点
  - table 维度
  - 包含: INSERT, ALTER
  - 支持数据去重
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

### S3

```sql
-- PostgreSQL
-- =======================
-- connect table
-- insert, select
CREATE TABLE
  db_in_ch.table1 (id UInt64, column1 String) ENGINE = PostgreSQL(
    'postgres-host.domain.com:5432',
    'db_in_psg',
    'table1',
    'clickhouse_user',
    'ClickHouse_123'
  );

-- materialized
-- replica of the database
SET
  allow_experimental_database_materialized_postgresql = 1;

CREATE DATABASE db1_postgres ENGINE = MaterializedPostgreSQL(
  'postgres-host.domain.com:5432',
  'db1',
  'clickhouse_user',
  'ClickHouse_123'
) SETTINGS materialized_postgresql_tables_list = 'table1';

-- S3
-- =========================
-- 元信息 _path, _file
SELECT
  *
FROM
  s3(
    'https://datasets-documentation.s3.eu-west-3.amazonaws.com/nyc-taxi/trips_*.gz',
    'TabSeparatedWithNames'
  )
LIMIT
  10;

-- 写入
INSERT INTO
  FUNCTION s3(
    'https://datasets-documentation.s3.eu-west-3.amazonaws.com/csv/trips.csv.lz4',
    's3_key',
    's3_secret',
    'CSV'
  )
SELECT
  *
FROM
  trips
LIMIT
  10000;

-- 写入多个文件
INSERT INTO
  FUNCTION s3(
    'https://datasets-documentation.s3.eu-west-3.amazonaws.com/csv/trips_{_partition_id}.csv.lz4',
    's3_key',
    's3_secret',
    'CSV'
  ) PARTITION BY rand() % 10
SELECT
  *
FROM
  trips
LIMIT
  100000;

-- engine
CREATE TABLE
  trips_dest (
    `trip_id` UInt32,
    `pickup_date` Date,
    `pickup_datetime` DateTime,
    `dropoff_datetime` DateTime,
    `tip_amount` Float32,
    `total_amount` Float32
  ) ENGINE = S3('<bucket path>/trips.bin', 'Native');
```

### PostgreSQL

- 通过 `COPY (SELECT ...) TO STDOUT` 实现
- 支持 Materialized - 初次同步后后续通过 WAL 更新


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

<<<<<<< Updated upstream
=======
- max_memory_usage=10GB

```sql
-- 需要全部数据加载到内存基于 PK 排序
INSERT INTO table
SELECT x,y,z FROM source;

-- 排查
SHOW PROCESSLIST;
```

- `set max_block_size=512, max_threads=1, max_rows_to_read=512;`

## SQLite database file path must be inside 'user_files' directory. (PATH_ACCESS_DENIED)

- 默认 /var/lib/clickhouse/user_files/
- https://clickhouse.com/docs/en/operations/server-configuration-parameters/settings/#server_configuration_parameters-user_files_path

## FINAL

```sql
-- force collapsing, dedup, operation
SELECT * FROM events FINAL;
```

>>>>>>> Stashed changes
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
