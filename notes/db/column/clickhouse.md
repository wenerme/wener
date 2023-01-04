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
  - 依赖 zookeeper 进行集群调度 - 可使用 [clickhouse-keeper](https://clickhouse.com/docs/en/operations/clickhouse-keeper/) 替代
- 默认库 default
- DataGrip 可以使用 JDBC 连接
- 适用场景
  - 日志、监控 - signoz, uptrace
  - 统计分析
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
  - [Quickwit](https://github.com/quickwit-oss/quickwit)
    - AGPLv3, Rust
    - 提供搜索能力
    - cloud-native search engine for log management & analytics
    - 提供 URL 请求 Quickwit 进行 [全文搜索](https://clickhouse.com/docs/en/guides/developer/full-text-search)
    - Quickwit 支持输出为 clickHouseRowBinary
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
  - 商业产品服务
    - https://www.graphjson.com/

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
- 一次 INSERT 的数据要求能全部加载到内存
  - 因为需要基于 PK 排序

:::

| Port  | for                                                |
| ----- | -------------------------------------------------- |
| 2181  | Zookeeper                                          |
| 9181  | ClickHouse Keeper                                  |
| 8123  | HTTP API - JDBC, ODBC, WebUI                       |
| 8443  | HTTP SSL/TLS                                       |
| 9000  | Native Protocol/ClickHouse TCP - inter-server comm |
| 9004  | MySQL emulation                                    |
| 9005  | PostgreSQL emulation                               |
| 9009  | inter server comm - data exchange, replication     |
| 9010  | SSL/TLS inter server comm                          |
| 9011  | Native protocol PROXYv1                            |
| 9019  | JDBC Bridge                                        |
| 9100  | gRPC                                               |
| 9234  | ClickHouse Keeper Raft                             |
| 9363  | Prometheus metrics                                 |
| 9281  | SSL ClickHouse Keeper                              |
| 9440  | SSL/TLS Native protocol                            |
| 42000 | Graphite                                           |

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

## Notes

- 列 DEFAULT materializes on merge, MATERIALIZED materializes on INSERT, OPTIMIZE TABLE
- ENGINE = Null - ETL 表, trigger materialized view
- index_granularity - 索引精度
  - how many rows reps index key and pk
  - lower, point query 更快
  - 8192 rows or 10MB of data
  - 每 8192 行一个 索引记录/mark
  - 稀疏索引 - 不同于 BTree
  - 并行处理单位
- index_granularity_bytes - 默认 10MB
- primary key
  - **不要求唯一**
  - 影响磁盘上数据排序 - sk=pk
  - 会加载到内存
  - 过滤 **最左边** 列因为有序，所以可以二分搜索
  - 过滤 不包含最左边 列，则会全局搜索
  - 如果之后的 PK 是低纬度的数据，则可以通过 skipping index 优化
  - 可创建二级索引 记录额外 minmax 来优化访问
  - 高纬度数据只能创建 额外的表 或 额外的视图 或 PROJECTION 使用不同的顺序来解决
    - PROJECTION 为隐藏表，类似于传统 DB 的索引 - 保留了关系
    - 会自动选择 PROJECTION
  - 选择顺序
    - 低纬度 数据在左边
      - 精确查询会处理更多数据
      - 但压缩比更高 - 磁盘上数据少，意味着 IO 快
    - 高纬度 数据在左边
      - 精确查询处理更少数据
      - 压缩比低
  - [Locality-sensitive hashing](https://en.wikipedia.org/wiki/Locality-sensitive_hashing)
    - 可用于对长内容进行 fingerprint, 然后放在最左边排序, 这样会大大增加压缩比
    - 但查询需要额外带一个条件
- sorting key
  - 设置了 sorting key 未设置 pk 则 pk=sk
  - 可在 pk 之外再添加 sk
- sparse index
- 对象/Object
  - Table
  - Routine
  - User

```sql
show processlist;
```

## Awesome

- [tabixio/tabix](https://github.com/tabixio/tabix)
  - Apache-2.0, TS, React
  - WebUI
- [ildus/clickhouse_fdw](https://github.com/ildus/clickhouse_fdw)
- [signoz](../../service/observability/tracing/signoz.md)
- [uptrace](https://github.com/uptrace/uptrace)
- [EdurtIO/dbm](https://github.com/EdurtIO/dbm)
- [sqlpad/sqlpad](https://github.com/sqlpad/sqlpad)
- [clickvisual/clickvisual](https://github.com/clickvisual/clickvisual)
  - light weight log and data visual analytic platform for clickhouse
- [korchasa/awesome-clickhouse](https://github.com/korchasa/awesome-clickhouse)

## Auth

- LDAP
  - https://clickhouse.com/docs/en/guides/sre/configuring-ldap

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
SELECT table,
       name,
       sum(data_compressed_bytes)                  AS compressed,
       sum(data_uncompressed_bytes)                AS uncompressed,
       floor((compressed / uncompressed) * 100, 4) as percent
FROM system.columns
WHERE database = currentDatabase()
GROUP BY table,
         name
ORDER BY table ASC,
         name ASC;
```

## Turnning

- https://clickhouse.com/docs/en/guides/improving-query-performance/sparse-primary-indexes/sparse-primary-indexes-intro

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

## 查看表信息

```sql
SELECT
    part_type,
    path,
    formatReadableQuantity(rows) AS rows,
    formatReadableSize(data_uncompressed_bytes) AS data_uncompressed_bytes,
    formatReadableSize(data_compressed_bytes) AS data_compressed_bytes,
    formatReadableSize(primary_key_bytes_in_memory) AS primary_key_bytes_in_memory,
    marks,
    formatReadableSize(bytes_on_disk) AS bytes_on_disk
FROM system.parts
WHERE (table = 'hits_UserID_URL') AND (active = 1)
FORMAT Vertical;
```

## Perm

1. Read data - SELECT, SHOW, DESCRIBE, EXISTS
1. Write data - INSERT, OPTIMIZE
1. Change settings - SET, USE
1. DDL - CREATE, ALTER, RENAME, ATTACH, DETACH, DROP TRUNCATE
1. `KILL QUERY`


---
- readonly=0|1|2
  - 2 可以修改设置
- allow_ddl=0|1
