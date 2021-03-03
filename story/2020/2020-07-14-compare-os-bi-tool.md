---
slug: compare-os-bi-tool
title: 开源 BI 产品比较
tags:
- BI
- 大数据
---

# 开源 BI 产品比较

比较 Metabase、Redash、Superset 这几款开源的 BI 产品。


| Name     | License | Stars | Languages | Deps          | Github                                                                    |
| -------- | ------- | ----- | --------- | ------------- | ------------------------------------------------------------------------- |
| Metabase | AGPL    | 21k   | Clojure   | H2/PostgreSQL | [metabase/metabase](https://github.com/metabase/metabase)                 |
| Redash   | BSD     | 16k   | JS        | Redis+DB      | [getredash/redash](https://github.com/getredash/redash)                   |
| Superset | Apache  | 29k   | Python    | Cache+DB      | [apache/incubator-superset](https://github.com/apache/incubator-superset) |

<!-- more -->

- metabase
  - 界面操作友好
  - 偏向于产品
  - 图表类型少
  - AGPL
  - 嵌入去 Logo 收费 - 300$/月 3000$/年
  - 商业版 - 10000+ \$/年
    - 嵌入无 Logo
    - SSO - SAML
    - 行级权限
    - 审计工具
  - 可单个 Docker 直接启动 - 使用 H2 嵌入式数据库
  - 界面好看 - 本地化很好、分享友好
- redash
  - 纯 SQL
  - 图表使用 PlotlyJS
    - 可以理解为 Redash 只负责处理数据
  - 支持最多的数据源
  - 没有本地化
- superset
  - 支持最多的图表
  - 既可以 SQL 又可以 UI
  - 功能最强
  - 扩容性最好 - 支持大规模分析场景
  - 界面偏运维 - 部分本地化
  - 能自定义 CSS
  - 默认 **不能** 公共分享

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
  - Python + Flask + gunicorn + celery
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

### 启动配置

- [环境变量配置](https://redash.io/help/open-source/admin-guide/env-vars-settings)
- 初始化使用 python [脚本](https://github.com/getredash/redash/blob/master/redash/settings/__init__.py)
- [升级](https://redash.io/help/open-source/admin-guide/how-to-upgrade)

```bash
# compose 中使用的该目录
mkdir /opt/redash
cd /opt/redash

curl -LO https://raw.githubusercontent.com/getredash/setup/master/data/docker-compose.yml
touch env

docker-compose -f docker-compose.yml up
```

### ERROR: relation "queries" does not exist

- 脚本位于 `./setup/docker/create_database.sh`

```bash
docker-compose run --rm server manage database create_tables
docker-compose run --rm server manage db upgrad
```

## superset

- 语言
  - Python - Flask + Celery
  - Typescript
- 机构依赖
  - 元数据存储 MySQL, Postgres, MariaDB, SQLite
  - 消息队列 Redis, RabbitMQ, SQS
  - 结果存储 S3, Redis, Memcached
  - 缓存 Memcached, Redis
  - WebServer 和 Celery 是无状态的 - 易于扩容
- 注意
  - 默认不允许公共访问，需要 [配置](https://superset.incubator.apache.org/security.html?highlight=public#public)
- 参考
  - [安装文档](https://superset.incubator.apache.org/installation.html)
  - [docker-compose.yml](https://github.com/apache/incubator-superset/blob/master/docker-compose.yml)
    - 需要先 Build 在启动
    - redis
    - db - postgres
    - superset
    - superset-init - 构建
    - superset-node - 前端
    - superset-worker
    - superset-tests-worker
  - [amancevice/docker-superset](https://github.com/amancevice/docker-superset) - 单 docker 启动 superset
    - [启动示例](https://github.com/amancevice/docker-superset/tree/main/examples)
  - [如何新增插件](https://preset.io/blog/2020-07-02-hello-world/)
  - K8S Helm 部署 [stable/superset](https://github.com/helm/charts/blob/master/stable/superset)

```bash
mkdir /opt/superset
cd /opt/superset

# SQLite
# ==========
curl -LO https://raw.githubusercontent.com/amancevice/docker-superset/main/examples/sqlite/superset_config.py
curl -LO https://raw.githubusercontent.com/amancevice/docker-superset/main/examples/sqlite/docker-compose.yml

# 会使用 local volume 挂载数据
docker-compose up -d
sleep 30
# 初始化 - 创建账号密码、初始数据库
docker-compose exec superset superset-demo

# 已有 PostgreSQL
# ==========
cat <<YAML > docker-compose.yml
version: '3'
services:
  redis:
    image: redis
    restart: always
    volumes:
      - redis:/data
  superset:
    image: amancevice/superset
    restart: always
    depends_on:
      - redis
    environment:
      MAPBOX_API_KEY: ${MAPBOX_API_KEY}
    ports:
      - "8088:8088"
    volumes:
      - ./superset_config.py:/etc/superset/superset_config.py
volumes:
  redis:
YAML
# 数据库链接
# postgresql+psycopg2://superset:superset@postgres:5432/superset
DATABASE_URL=
SECRET_KEY=$(cat /dev/urandom | env LC_CTYPE=C tr -dc 'a-zA-Z0-9' | head -c 32)

cat <<PY > superset_config.py
import os

MAPBOX_API_KEY = os.getenv('MAPBOX_API_KEY', '')
CACHE_CONFIG = {
    'CACHE_TYPE': 'redis',
    'CACHE_DEFAULT_TIMEOUT': 300,
    'CACHE_KEY_PREFIX': 'superset_',
    'CACHE_REDIS_HOST': 'redis',
    'CACHE_REDIS_PORT': 6379,
    'CACHE_REDIS_DB': 1,
    'CACHE_REDIS_URL': 'redis://redis:6379/1'}
SQLALCHEMY_DATABASE_URI = '${DATABASE_URL}'
SQLALCHEMY_TRACK_MODIFICATIONS = True
SECRET_KEY = '${SECRET_KEY}'
PY
```

### UserWarning: Flask-Caching: CACHE_TYPE is set to null, caching is effectively disabled.
