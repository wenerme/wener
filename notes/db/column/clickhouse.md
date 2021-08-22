---
title: ClickHouse
---

# ClickHouse

- [yandex/ClickHouse](https://github.com/yandex/ClickHouse)
  - Apache-2.0, C++
  - 主要通过 Key 访问
- 默认库 default
- DataGrip 可以使用 JDBC 连接
- 端口
  - 8123 HTTP
  - 9000 native client
- 参考
  - [单页文档](https://clickhouse.yandex/docs/en/single/)
  - [wiki/ClickHouse](https://en.wikipedia.org/wiki/ClickHouse)
  - [clickhouse.yandex](https://clickhouse.yandex/)
  - https://clickhouse.yandex/docs/en/development/architecture/

:::tip

- 暂不支持 UDF
- 当数据量较少(< 1TB)时不建议使用
- 插入操作非常快 - 因为是异步的，后台会处理

:::

:::caution

- 不支持 UDF [#11](https://github.com/ClickHouse/ClickHouse/issues/11)
- 不支持 UPDATE, DELETE, REPLACE, MERGE, UPSERT, INSERT UPDATE
  - 可以 DROP PARTITION 实现部分数据删除
  - 支持 mutation `ALTER TABLE name UPDATE/DELETE column=exp WHERE filter`
    - 后台异步执行，全部数据重写，非原子操作

:::

```bash
# https://hub.docker.com/r/yandex/clickhouse-server/
docker run -d --name some-clickhouse-server --ulimit nofile=262144:262144 yandex/clickhouse-server

docker run --rm -it -p 8123:8123 -p 9000:9000 --name ch-server --ulimit nofile=262144:262144 -v $PWD/data:/var/lib/clickhouse yandex/clickhouse-server

# 镜像拉取
# docker pull dockerhub.azk8s.cn/library/yandex/clickhouse-server
# docker pull docker.mirrors.ustc.edu.cn/yandex/clickhouse-server

docker run -d --name some-clickhouse-server --ulimit nofile=262144:262144 -v /path/to/your/config.xml:/etc/clickhouse-server/config.xml yandex/clickhouse-server

# Build from source
git clone -b stable --depth 1 --recursive https://github.com/yandex/ClickHouse.git
cd ClickHouse

mkdir build
cd build
apk add libressl-dev
cmake ..
make -j $(nproc)
cd ..

# 启动
clickhouse-server --config-file=/etc/clickhouse-server/config.xml
clickhouse-client --host=example.com

# 导入 CSV
cat my.csv | clickhouse-client --host=example-perftest01j --query="INSERT INTO rankings_tiny FORMAT CSV"
# 导入 TSV, 并计算时间
time clickhouse-client --query="INSERT INTO trips FORMAT TabSeparated" < trips.tsv
```

```sql
COPY(
  SELECT t.id,t.name FROM t
) TO '/opt/data/export.tsv';

-- 从 PostgreSQL 导入
COPY ... TO PROGRAM
```

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
