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
  - Request JSON Object + Schema => SQL
  - 支持 JWT
  - 依赖 Redis 缓存

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

## 配置

- 环境变量配置
  - CUBEJS_DEV_MODE=true - 开发模式
  - CUBEJS_APP - APP ID
  - [Environment Variables](https://cube.dev/docs/reference/environment-variables)
- cube.js 配置
  - https://cube.dev/docs/config
- dev mode
  - 无 auth
  - 单节点 cubestore
  - background refresh for in-memory cache, cheduled pre-aggregations
  - log level trace
  - playground http://localhost:4000
  - memory as the default cache/queue engine
  - log incorrect/invalid configuration for for externalRefresh /waitForRenew instead of throwing errors
- Multitenancy vs Multiple Data Sources
  - Multitenancy
    - different datasets for multiple users
  - Multiple Data Sources
    - same data but different databases
- Security Context vs Multitenant Compile Context
  - Security Context
    - row-level security within the same database for different users
  - Multitenant Compile Context
    - access different databases
- Security Context vs queryRewrite
  - Security Context
    - explicit control

```js title="cube.js"
module.exports = {
  logger: (msg, params) => {
    console.log(`${msg}: ${JSON.stringify(params)}`);
  },
};
```

## Notes

- @cubejs-backend/server
  - 独立服务，包含所有 driver
- @cubejs-backend/server-core
  - 核心包，用于自定义扩展
- 缓存 redis, memory

## cubestore

- Apache 2.0, Rust
- 预聚合
- distributed
- WIP: 外部存储 MySQL & Postgres
- mysql+http 协议
- RocksDB, Apache Parquet, Apache Arrow, datafusion
- https://github.com/apache/arrow-datafusion
- https://github.com/cube-js/cube.js/tree/master/rust
- https://cube.dev/blog/introducing-cubestore/
