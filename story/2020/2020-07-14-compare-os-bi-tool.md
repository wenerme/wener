---
id: compare-os-bi-tool
title: 比较开源 BI 产品
---

# 开源 BI 产品比较

比较 Metabase、Redash、Superset 这几款开源的 BI 产品。

<!-- more -->

| Name     | License | Stars | Languages | Deps             | Github                                                                    |
| -------- | ------- | ----- | --------- | ---------------- | ------------------------------------------------------------------------- |
| metabase | AGPL    | 21k   | Clojure   | H2/PostgreSQL    | [metabase/metabase](https://github.com/metabase/metabase)                 |
| redash   | BSD     | 16k   | JS        | Redis+PostgreSQL | [getredash/redash](https://github.com/getredash/redash)                   |
| superset | Apache  | 29k   | Python    | Redis+PostgreSQL | [apache/incubator-superset](https://github.com/apache/incubator-superset) |

- metabase
  - 界面操作友好
  - 偏向于产品
  - 图表类型少
- redash
  - 既可以 SQL 又可以 UI
  - 支持最多的数据源
- superset
  - 支持最多的图表
  - 以 SQL 为主

## 数据源类型

- Redash [Supported Data Sources](https://redash.io/help/data-sources/supported-data-sources)
- Superset [supported database](https://superset.incubator.apache.org/#databases)
  - DB-API
  - SQLAlchemy

| Data Source                              | Redash | Metabase | Superset |
| ---------------------------------------- | ------ | -------- | -------- |
| Amazon Athena                            | ✅     |          | ✅       |
| Amazon DynamoDB                          | ✅     |
| Amazon Redshift                          | ✅     | ✅       | ✅       |
| Apache Drill                             |        |          | ✅       |
| Apache Hive                              | ✅     |          | ✅       |
| Apache Impala                            | ✅     |          | ✅       |
| Apache Kylin                             | ✅     |          | ✅       |
| Apache Pinot                             |        |          | ✅       |
| Apache SparkSQL                          |        | ✅       | ✅       |
| Axibase Time Series Database             | ✅     |
| CSV                                      | ✅     |
| Cassandra                                | ✅     |
| ClickHouse                               | ✅     |          | ✅       |
| CockroachDB                              | ✅     |          | ✅       |
| DB2 by IBM                               | ✅     |          | ✅       |
| Databricks (Apache Spark)                | ✅     |
| Dremio                                   |        |          | ✅       |
| Druid                                    | ✅     | ✅       | ✅       |
| Elasticsearch                            | ✅     |          | ✅       |
| Exasol                                   |        |          | ✅       |
| Google Analytics                         | ✅     |
| Google BigQuery                          | ✅     | ✅       | ✅       |
| Google Spreadsheets                      | ✅     |          | ✅       |
| Graphite                                 | ✅     |          | ✅       |
| Greenplum                                | ✅     |          | ✅       |
| H2                                       |        | ✅       |
| Hana                                     |        |          | ✅       |
| InfluxDB                                 | ✅     |
| JIRA                                     | ✅     |
| JSON                                     | ✅     |
| MemSQL                                   | ✅     |
| Microsoft Azure Data Warehouse / Synapse | ✅     |
| Microsoft Azure SQL Database             | ✅     |
| Microsoft SQL Server                     | ✅     | ✅       | ✅       |
| MongoDB                                  | ✅     | ✅       |
| MySQL                                    | ✅     | ✅       | ✅       |
| OmniSciDB (Formerly MapD)                | ✅     |
| Oracle                                   | ✅     | ✅       | ✅       |
| PostgreSQL                               | ✅     | ✅       | ✅       |
| Presto                                   | ✅     | ✅       | ✅       |
| Prometheus                               | ✅     |
| Python                                   | ✅     |
| Qubole                                   | ✅     |
| Rockset                                  | ✅     |
| SQLite                                   | ✅     | ✅       | ✅       |
| Salesforce                               | ✅     |
| ScyllaDB                                 | ✅     |
| Shell Scripts                            | ✅     |
| Snowflake                                | ✅     | ✅       | ✅       |
| TreasureData                             | ✅     |
| Vertica                                  | ✅     | ✅       | ✅       |
| Yandex AppMetrrica                       | ✅     |
| Yandex Metrica                           | ✅     |

## metabase

- 语言
  - Clojure
  - React
- 参考
  - [安装文档](https://www.metabase.com/docs/latest/operations-guide/running-metabase-on-docker.html)

```bash
# H2
docker run -d -p 3000:3000 \
  -v $PWD/metabase-data:/metabase-data \
  -e "JAVA_TIMEZONE=Asia/Shanghai" \
  -e "MB_DB_FILE=/metabase-data/metabase.db" \
  --name metabase metabase/metabase

# PG
docker run -d -p 3000:3000 \
 -e "MB_DB_TYPE=postgres" \
 -e "MB_DB_DBNAME=metabase" \
 -e "MB_DB_PORT=5432" \
 -e "MB_DB_USER=<username>" \
 -e "MB_DB_PASS=<password>" \
 -e "MB_DB_HOST=my-database-host" \
 --name metabase metabase/metabase
```

## redash

- 语言
  - NodeJS
- 依赖
  - PostgreSQL
  - Redis
- 参考
  - [安装文档](https://redash.io/help/open-source/setup)
  - [docker-compose.yml](https://github.com/getredash/setup/blob/master/data/docker-compose.yml)
    - server - redash/redash
    - scheduler
    - scheduled_worker
    - adhoc_worker
    - redis
    - postgres
    - nginx
  - [Worker architecture question](https://discuss.redash.io/t/worker-architecture-question/5025)
- 架构
  - 热查询（adhoc query - 用户发起）使用 查询 Celery 队列
  - 周期查询（scheduled_queries - scheduler 发起）使用 scheduled 队列
  - Celery 支持设置队列的 worker 数，默认启动会分离 adhoc 和 scheduled 队列
  - 会切换到 RQ - Redis Queue

```bash
# compose 中使用的该目录
mkdir /opt/redash
cd /opt/redash

curl -LO https://raw.githubusercontent.com/getredash/setup/master/data/docker-compose.yml
touch env

docker-compose -f docker-compose.yml up
```

## superset

- 语言
  - Python - Flask
  - Typescript
- 依赖
  - PostgreSQL
  - Redis
  - [安装文档](https://superset.incubator.apache.org/installation.html)
  - [docker-compose.yml](https://github.com/apache/incubator-superset/blob/master/docker-compose.yml)
    - redis
    - db - postgres
    - superset
    - superset-init - 构建
    - superset-node - 前端
    - superset-worker
    - superset-tests-worker

```bash

```
