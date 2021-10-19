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

:::tip

- 不建议内嵌 Cube.js 到现有 Express 应用，建议通过 包 扩展

:::

```bash
# http://localhost:4000
docker run -p 4000:4000 \
  -v ${PWD}:/cube/conf \
  -e CUBEJS_DEV_MODE=true \
  cubejs/cube
```

## 配置

- https://cube.dev/docs/config

## Notes

- @cubejs-backend/server
  - 独立服务，包含所有 driver
- @cubejs-backend/server-core
  - 核心包，用于自定义扩展
