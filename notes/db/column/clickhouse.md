---
title: ClickHouse
---

# ClickHouse

:::tip When to use ClickHouse

- insert > select𐄂10000 > delete𐄂100 > update𐄂10
- 数据不变
- 数据有时间属性
- 归档数据
- 事件、日志、监控、指标
- 需要聚合非常多的数据源 - OLAP

:::

- [yandex/ClickHouse](https://github.com/yandex/ClickHouse)
  - Apache-2.0, C++
  - OLAP, 列存储
    - 每列存一个文件
  - 支持 Key 访问
- 默认库 default
- DataGrip 可以使用 JDBC 连接
- 适用场景
  - 应用、系统日志
  - timeseries-oriented
- 端口
  - 8123 HTTP
  - 9000 native client
- 参考
  - [单页文档](https://clickhouse.yandex/docs/en/single/)
  - [wiki/ClickHouse](https://en.wikipedia.org/wiki/ClickHouse)
  - [clickhouse.yandex](https://clickhouse.yandex/)
  - https://clickhouse.yandex/docs/en/development/architecture/
  - [Altinity/clickhouse-operator](https://github.com/Altinity/clickhouse-operator)
  - [Usage Recommendations](https://clickhouse.com/docs/en/operations/tips/)
  - [Requirements](https://clickhouse.com/docs/en/operations/requirements/)
  - Why
    - [Fast and Reliable Schema-Agnostic Log Analytics Platform](https://eng.uber.com/logging/)
      - Uber, ES -> ClickHouse
    - [Our Online Analytical Processing Journey with ClickHouse on Kubernetes](https://tech.ebayinc.com/engineering/ou-online-analytical-processing/)
      - ebay, Druid -> ClickHouse
    - [HTTP Analytics for 6M requests per second using ClickHouse](https://blog.cloudflare.com/http-analytics-for-6m-requests-per-second-using-clickhouse/)
      - cloudflare, PostgreSQL+Citus -> ClickHouse
    - https://www.nedmcclain.com/why-devops-love-clickhouse/amp/
      - 推荐 ext4 而非 zfs
    - ClickHouse as an alternative to Elasticsearch for log storage and analysis [HN](https://news.ycombinator.com/item?id=26316401)
    - [A Practical Introduction to Handling Log Data in ClickHouse](https://www.youtube.com/watch?v=pZkKsfr8n3M)

:::tip

- immutable data
- 暂不支持 UDF
- 当数据量较少(< 1TB)时不建议使用
- 插入操作非常快 - 因为是异步的，后台会处理
- keep non-timeseries data out of clickhouse
- dynamic subcolumns - JSON
- OLAP
  - 不适合 KV
  - 不适合小数据精确查询

:::

:::caution

- 不支持 UDF [#11](https://github.com/ClickHouse/ClickHouse/issues/11)
- 不支持 UPDATE, DELETE, REPLACE, MERGE, UPSERT, INSERT UPDATE
  - 可以 DROP PARTITION 实现部分数据删除
  - 支持 mutation `ALTER TABLE name UPDATE/DELETE column=exp WHERE filter`
    - 后台异步执行，全部数据重写，非原子操作，非常慢
    - 满足 GDPR 要求
- 不支持读写分离 [#18452](https://github.com/ClickHouse/ClickHouse/issues/18452)

:::

```bash
# https://hub.docker.com/r/yandex/clickhouse-server/
# /etc/clickhouse-server/config.xml
docker run --rm -it \
  -v $PWD/data:/var/lib/clickhouse \
  -p 8123:8123 -p 9000:9000 \
  --ulimit nofile=262144:262144 \
  --name ch-server yandex/clickhouse-server

# Client
docker run -it --rm --link ch-server yandex/clickhouse-client --host ch-server

# 启动
clickhouse-server --config-file=/etc/clickhouse-server/config.xml
clickhouse-client --host=example.com

# 导入 CSV
cat my.csv | clickhouse-client --host=example-perftest01j --query="INSERT INTO rankings_tiny FORMAT CSV"
# 导入 TSV, 并计算时间
time clickhouse-client --query="INSERT INTO trips FORMAT TabSeparated" < trips.tsv

curl 'http://localhost:8123/?query=SELECT%20NOW()'
```

```sql
COPY(
  SELECT
    t.id,
    t.name
  FROM
    t
) TO '/opt/data/export.tsv';

-- 从 PostgreSQL 导入
COPY...TO PROGRAM
```

## Note

- 列 DEFAULT materializes on merge, MATERIALIZED materializes on INSERT, OPTIMIZE TABLE
- ENGINE = Null - ETL 表, trigger materialized view
- index_granularity
  - how many rows reps index key and pk
  - lower, point query 更快
  - 例如 8196

## 安装

```bash
# 要求 SSE 4.2
grep -q sse4_2 /proc/cpuinfo && echo "SSE 4.2 supported" || echo "SSE 4.2 not supported"

# Docker
# https://hub.docker.com/r/clickhouse/clickhouse-server/
# /etc/clickhouse-server/config.xml
docker run -it --rm \
  --ulimit nofile=262144:262144 \
  -v=$HOME/data:/var/lib/clickhouse \
  --name clickhouse-server clickhouse/clickhouse-server
```

## Notes

- primary keys
  - 并不要求唯一
  - 印象磁盘上数据排序
- index granularity
  - 8,192 rows or 10MB of data
- sparse index

## 数据类型

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

## Table Engine

- PostgreSQL
- Kafka
- MySQL
- S3
  - Function+Engine

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

## MergeTree

> MergeTree 本身比较重，建议用于较大的数据集。

- 主要特性
  - 列存储
  - 自定义分片
  - sparse primary index
  - secondary data-skipping indexes

**MergeTree Engine Family**

- MergeTree - 建议用于单节点
  - 基于 PK 排序
  - 支持副本
  - 支持采样
- ReplacingMergeTree - 建议用于生产分布式高可用
  - 支持数据去重
- SummingMergeTree
- AggregatingMergeTree
- CollapsingMergeTree
- VersionedCollapsingMergeTree
- GraphiteMergeTree
- `tuple(T1, T2, ...)`
- 特殊类型
  - 表达式
  - Set
  - Nothing
  - Interval
- 域类型
  - IPv4, IPv6
- Geo 类型
  - Point, Ring, Polygon, MultiPolygon
- Map(key, value)
- `SimpleAggregateFunction(name, types_of_arguments…)`

## Log

- TinyLog
- StripeLog
- Log

### 集成引擎

- ODBC,JDBC,MySQL,MongoDB, HDFS, S3, Kafka, RocksDB, RabbitMQ
- PostgreSQL
  - 通过 `COPY (SELECT ...) TO STDOUT` 实现
  - 支持 Materialized - 初次同步后后续通过 WAL 更新

### 特殊引擎

- Distributed
- MaterializedView
- Dictionary
- Merge
- File
- Null
- Set
- Join
- URL
- View
- Memory
- Buffer

## 运维

- 推荐 ext4 noatime, nobarrier

```bash
# CPU 使用性能模式
echo 'performance' | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
# 不要禁用 overcommit
echo 0 | sudo tee /proc/sys/vm/overcommit_memory

# 旧 Linux Kernel
echo 'madvise' | sudo tee /sys/kernel/mm/transparent_hugepage/enabled
```

### Auth

- Kerberos
- LDAP

## Stats

```sql
SELECT
  tabe,
  name,
  sub(data_compressed_bytes) AS compressed,
  sub(data_uncompressed_bytes) AS uncompressed,
  floor((compressed / uncompressed) * 100, 4) as percent
FROM
  system.columns
WHERE
  database = currentDatabase()
GROUP BY
  table,
  name
ORDER BY
  table ASC,
  name ASC;
```

## formats

- https://clickhouse.com/docs/en/interfaces/formats/

## config.xml

- https://clickhouse.com/docs/en/operations/configuration-files/

## 删除

1. TTL
1. DELETE FROM
1. ALTER DELETE
1. DROP PARTITION
1. TRUNCATE

```sql
-- DELETE FROM
SET allow_experimental_lightweight_delete = true;
```

## 导出数据

```sql
SELECT * FROM table INTO OUTFILE 'file' FORMAT CSV
```

```bash
$ clickhouse-client --query "SELECT * from table" --format FormatName > result.txt
```

## 导入数据

```bash
# HTTP API
echo '{"foo":"bar"}' | curl 'http://localhost:8123/?query=INSERT%20INTO%20test%20FORMAT%20JSONEachRow' --data-binary @-
# CLI
echo '{"foo":"bar"}' | clickhouse-client --query="INSERT INTO test FORMAT JSONEachRow"
```
