---
title: cubestore
---

# cubestore

- @cubejs-backend/cubestore [cube-js/cube.js/rust](https://github.com/cube-js/cube.js/tree/master/rust)
  - Apache-2.0, Rust
- router
  - 单个
  - 处理客户端请求，管理数据库元数据，提供简单查询
- worker
  - 多个
  - 执行 SQL
- 本地存储为 Parquet 格式

:::caution

- 会从 github 下载 binary
  - npm config get https-proxy
  - npm config get proxy

:::

```bash
docker run -p 3030:3030 -v $PWD/.cubestore:/cube/data cubejs/cubestore

# 使用 cubestore
# CUBEJS_EXT_DB_TYPE=cubestore
# CUBEJS_EXT_DB_HOST=127.0.0.1
docker run -p 4000:4000 \
  -e CUBEJS_CUBESTORE_HOST=localhost \
  -v ${PWD}:/cube/conf \
  cubejs/cube
```

| env                   | router | worker |
| --------------------- | ------ | ------ |
| CUBESTORE_SERVER_NAME | Yes    | Yes    |
| CUBESTORE_META_PORT   | Yes    | -      |
| CUBESTORE_WORKERS     | Yes    | Yes    |
| CUBESTORE_WORKER_PORT | -      | Yes    |
| CUBESTORE_META_ADDR   | -      | Yes    |

```ini title="router,env"
CUBESTORE_SERVER_NAME=cubestore_router:9999
CUBESTORE_META_PORT=9999
CUBESTORE_WORKERS=cubestore_worker_1:9001,cubestore_worker_2:9001
CUBESTORE_REMOTE_DIR=/cube/data
```

```ini title="worker.env"
CUBESTORE_SERVER_NAME=cubestore_worker_1:9001
CUBESTORE_WORKER_PORT=9001
CUBESTORE_META_ADDR=cubestore_router:9999
CUBESTORE_WORKERS=cubestore_worker_1:9001,cubestore_worker_2:9001
CUBESTORE_REMOTE_DIR=/cube/data
```
