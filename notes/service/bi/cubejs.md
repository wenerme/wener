---
title: CubeJS
---

# CubeJS

- [cube-js/cube.js](https://github.com/cube-js/cube.js)
  - MIT+Apache-2.0,
  - Analytics API for Building Data Apps
  - 可以独立运行，也可以 Node 集成
  - 数据库支持: Postgres,MySQL,ClickHouse,PrestoDB,Druid,Elasticsearch,SQLite
  - 支持多租户
  - 支持生成前端组件
    - React UI 基于 AntD
  - 支持 JWT Auth
  - 支持 Redis 缓存
  - 提供 REST API
  - 提供 SQL API
    - 可以对接外部系统 - 例如 exporter 直接抓取作为 metrics
  - Request JSON Object + Schema => SQL

| port        | for                   |
| ----------- | --------------------- |
| 4000/http   | frontend              |
| 3031/http   | Serving status probes |
| 13306/mysql | cubestore             |
| 3030/http   | cubestore             |

:::tip

- 不建议内嵌 Cube.js 到现有 Express 应用，建议通过 包 扩展
- web 不支持配置 postgresql ssl

:::

:::caution

- Postgres can not work with table names that longer than 64 symbols
  - 使用 sqlAlias 解决 schema+table 名字过长的问题

:::

```bash
# http://localhost:4000
docker run -p 4000:4000 \
  -v ${PWD}:/cube/conf \
  -e CUBEJS_DEV_MODE=true \
  cubejs/cube:alpine
```

```ini title=".env"
CUBEJS_DB_TYPE=postgres
CUBEJS_DB_HOST=192.168.1.2
CUBEJS_DB_PORT=5432
CUBEJS_DB_NAME=demo
CUBEJS_DB_USER=demo
CUBEJS_DB_PASS=
CUBEJS_DB_SSL=false
```

## API

- Query 支持 JSON 也支持 SQL 查询 - MySQL 兼容协议

```http
### Load data
POST http://localhost:4000/cubejs-api/v1/load
Content-Type: application/json

{"query": {"measures":["Users.count"]}}

### SQL
GET http://localhost:4000/cubejs-api/v1/sql?query={"measures":["Users.count"]}

### Meta
GET http://localhost:4000/cubejs-api/v1/meta

### Trigger refresh
GET http://localhost:4000/cubejs-api/v1/run-scheduled-refresh?queryingOptions={"timezone":"UTC"}

### ready
GET http://localhost:4000/readyz

### live
GET http://localhost:4000/livez
```

```json title="query"
{
  "measures": ["Stories.count"],
  "dimensions": ["Stories.category"],
  "filters": [
    {
      // dimension or measure
      "member": "Stories.isDraft",
      // 支持的操作 - 类型也会影响
      // equals, notEquals, contains, notContains
      // gt, gte, lt, lte
      // set, notSet
      // inDateRange, notInDateRange, beforeDate, afterDate
      "operator": "equals",
      // date YYYY-MM-DD
      "values": ["No"]
    },
    // 逻辑
    {
      "or": [{ "and": [] }]
    }
  ],
  "timeDimensions": [
    {
      "dimension": "Stories.time",
      // 支持相对值
      // today, yesterday, tomorrow, last year, next month, last 6 months, last week
      // 支持特殊范围
      // from N days ago to now or from now to N days from now
      "dateRange": ["2015-01-01", "2015-12-31"],
      "granularity": "month",
      // 比较
      "compareDateRange": ["this week", ["2020-05-21", "2020-05-28"]]
    }
  ],
  "limit": 100,
  "offset": 50,
  // order: {"Stories.time": "asc"}
  "order": [
    ["Stories.time", "asc"],
    ["Stories.count", "asc"]
  ],
  "timezone": "Asia/Shanghai"
}
```

## Notes

- @cubejs-backend/server
  - 独立服务，包含所有 driver
- @cubejs-backend/server-core
  - 核心包，用于自定义扩展
- @cubejs-client/{core,react,ngx,vue,ws-transport}
  - react
    - dashboard 基于 antd
- [real-time-dashboard](https://github.com/cube-js/cube.js/tree/master/examples/real-time-dashboard)
- 缓存 redis, memory
- 扩展方式
  - 通过配置，动态 fetch schema
  - 基于 @cubejs-backend

```bash
# -d postgres, mysql, athena, mongobi, bigquery, redshift, mssql, clickhouse, snowflake, presto, druid
# -t docker, express, serverless, serverless-aws
npx -y cubejs-cli create demo-cube -d postgres
cd demo-cube
npx cubejs-cli server --debug

cubejs generate -t users,user_profiles
# Geneate JWT
# -e 1 day, 30 days
# -s CUBEJS_API_SECRET
# -u USER_CONTEXT
# CUBEJS_DEV_MODE
# token -e "30 days" -p appId=1 -p userId=2 -u tenantId=12
```

## cubestore

- Apache 2.0, Rust
- 预聚合
- distributed
- WIP: 外部存储 MySQL & Postgres
- RocksDB, Apache Parquet, Apache Arrow, datafusion
- https://github.com/apache/arrow-datafusion
- https://github.com/cube-js/cube.js/tree/master/rust
- https://cube.dev/blog/introducing-cubestore/

## Helm

- 社区维护，质量一般
- https://github.com/cube-js/cube.js/tree/master/examples/helm-charts

## container

- [packages/cubejs-docker](https://github.com/cube-js/cube.js/tree/master/packages/cubejs-docker)
- cubejs/cube:v0.28.59-alpine
  - 目前没有删除 yarn cache 比较大
- workdir /cube/conf
- 包含所有驱动+@cubejs-backend/server+typescript
- 默认执行 cubejs server

```bash
docker run --rm -it \
  -p 4000:4000 \
  -v $PWD:/cube/conf \
  cubejs/cube:v0.28.59-alpine
```

# FAQ

## 转译逻辑

```js
cube(`Users`, {
  measures: {
    count: {
      type: `count`,
    },
    // before
    ratio: {
      sql: `sum(${CUBE}.amount) / ${count}`,
      type: `number`,
    },
    // after
    // 因此也可以直接写函数
    ratio: {
      sql: (CUBE, count) => `sum(${CUBE}.amount) / ${count}`,
      type: `number`,
    },
  },
});
```
