---
title: OpenObserve
---

# OpenObserve

- [zinclabs/openobserve](https://github.com/zinclabs/openobserve)
  - Apache-2.0, Rust
  - 原 ZincObserve
  - 从 ZincSearch 演化而来
  - Log & Trace & Metrics
  - 存储 Parquet + Datafusion
- HA
  - Etcd + 对象存储
  - 组件 Ingester、Querier、Compactor、AlterManager

:::caution

- 还处于相当早期阶段
  - 日志功能相对完善
  - 其他基本可用
- CE 功能限制
  - 无 Elastic 兼容接口
  - Cloud 在 CE 基础上加 Proxy 做了额外的权限功能和 UI
  - 无 Grafana 插件

:::

```bash
ZO_ROOT_USER_PASSWORD=$(uuidgen)
docker run --rm -it \
  -v $PWD/data:/data \
  -e ZO_TELEMETRY=false \
  -e ZO_DATA_DIR=/data \
  -e ZO_ROOT_USER_EMAIL=wener@wener.me \
  -e ZO_ROOT_USER_PASSWORD=$ZO_ROOT_USER_PASSWORD \
  -e ZO_COMPACT_DATA_RETENTION_DAYS=30 \
  -p 5080:5080 \
  --name openobserve zinclabs/openobserve:latest
```

| env                            | default                    | note               |
| ------------------------------ | -------------------------- | ------------------ |
| ZO_LOCAL_MODE                  | true                       |
| ZO_LOCAL_MODE_STORAGE          | disk                       | s3                 |
| ZO_NODE_ROLE                   | all                        |
| ZO_INSTANCE_NAME               |
| ZO_HTTP_PORT                   | 5080                       |
| ZO_GRPC_PORT                   | 5081                       |
| ZO_GRPC_TIMEOUT                | 600                        |
| ZO_ROUTE_TIMEOUT               | 600                        |
| ZO_GRPC_ORG_HEADER_KEY         | zinc-org-id                |
| ZO_BASE_URI                    |
| ZO_DATA_DIR                    | ./data/zincobserve/        |
| ZO_DATA_WAL_DIR                | ./data/zincobserve/wal/    |
| ZO_DATA_STREAM_DIR             | ./data/zincobserve/stream/ |
| ZO_TIME_STAMP_COL              | \_timestamp                |
| ZO_UI_ENABLED                  | true                       |
| ZO_TRACING_ENABLED             | false                      | 发送               |
| OTEL_OTLP_HTTP_ENDPOINT        |
| ZO_JSON_LIMIT                  | 209715200                  | 200M               |
| ZO_PAYLOAD_LIMIT               | 209715200                  | 200M               |
| ZO_MAX_FILE_SIZE_ON_DISK       | 10                         | 10mb               |
| ZO_MAX_FILE_RETENTION_TIME     | 600                        | 600s               |
| ZO_FILE_PUSH_INTERVAL          | 10                         | 10s                |
| ZO_COMPACT_ENABLED             | true                       |
| ZO_MEMORY_CACHE_ENABLED        | true                       |
| ZO_TELEMETRY                   | true                       |
| ZO_PROMETHEUS_ENABLED          | false                      | /metrics           |
| RUST_LOG                       | info                       |
| ZO_SLED_DATA_DIR               | ./data/zincobserve/sled/   |
| ZO_SLED_PREFIX                 | /zinc/oxide/               |
| ZO_INGEST_ALLOWED_UPTO         | 5                          | 允许插入 5h 前数据 |
| ZO_COMPACT_ENABLED             | true                       |
| ZO_COMPACT_INTERVAL            | 60                         |
| ZO_COMPACT_DATA_RETENTION_DAYS |                            | 保留多少天         |
| ZO_COMPACT_MAX_FILE_SIZE       | 256                        | 多少 MB 时 compact |

```bash
docker run --rm -it \
  -v $PWD/data:/data \
  -e ZO_DATA_DIR="/data" \
  -e ZO_ROOT_USER_EMAIL=root@example.com -e ZO_ROOT_USER_PASSWORD=PASSWORD \
  -e ZO_TELEMETRY=false \
  -p 5080:5080 \
  --name openobserve zinclabs/openobserve:latest
```

```http
POST /api/{organization}/{stream}/_json

[{}]
```

- organization
  - default
  - 如果不存在会自动创建
- stream
  - default
  - 如果不存在会自动创建

```bash
# 测试
curl -X POST zincobserve:5080/api/default/default/_json --user $ZO_USER --password $ZO_PASSWORD -d '[]'
```

- $DATA/stream/files/ORG/{logs|metrics}/NAME/YRAR/MONTH/DAY/HOUR/ID.parquet
- $DTAT/db
- $DTAT/wal

## 配置

- https://openobserve.ai/docs/environment-variables/

## API

- http://zincobserve.monitoring-system:5080/api/default/prometheus/api/v1/
- Grafana
  - /api/default/prometheus

## 采集数据大小

- 采集数据大小 - JSON
- 实际数据大小 - parquet

## \_timestamp

- 会自动添加 `_timestamp=NOW`
- 可以被覆盖
  - `_timestamp`
  - `@timestamp`
- 支持格式
  - unix ms
  - RFC 3339, ISO 8601 - `1996-12-19T16:39:57-08:00`
  - RFC 2822 - `Tue, 1 Jul 2003 10:52:37 +0200`
- https://openobserve.ai/docs/api/ingestion/json/#timestamp
