---
title: Jaeger
---

# Jaeger

- [jaegertracing/jaeger](https://github.com/jaegertracing/jaeger)
  - Apache-2.0, Golang
  - from Uber
- 存储
  - 默认内存存储
  - badger - 本地文件存储
  - cassandra - 兼容 scyllab
  - elasticsearch
  - kafka
  - [jaegertracing/jaeger-clickhouse](https://github.com/jaegertracing/jaeger-clickhouse)

```bash
# badger 持久存储
docker run -it --rm \
  -v $PWD/data:/badger \
  -e SPAN_STORAGE_TYPE=badger \
  -e BADGER_EPHEMERAL=false \
  -e BADGER_DIRECTORY_VALUE=/badger/data \
  -e BADGER_DIRECTORY_KEY=/badger/key \
  -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 \
  -p5775:5775/udp -p6831:6831/udp -p6832:6832/udp \
  -p5778:5778 -p16686:16686 -p14268:14268 -p9411:9411 \
  jaegertracing/all-in-one:latest
```

# 组件

- collector - span -> 存储
- ingester - kafka -> 存储
- agent - sidecar
- query - api, ui

## agent

- 不一定需要运行 - 但推荐
- sidecar 角色 - 负责与 其它组件交互

| port  | protocol | function                                     |
| ----- | -------- | -------------------------------------------- |
| 6831  | UDP      | jaeger.thrift compact                        |
| 6832  | UDP      | jaeger.thrift binary - Node.js Jaeger client |
| 5778  | HTTP     | serve configs, sampling strategies           |
| 5775  | UDP      | ~~zipkin.thrift compact~~ - 2016 早期 客户端 |
| 14271 | HTTP     | 管理 - 健康检查 / , 指标 /metrics            |

```bash
docker run --rm \
  -p6831:6831/udp \
  -p6832:6832/udp \
  -p5778:5778/tcp \
  -p5775:5775/udp \
  jaegertracing/jaeger-agent:1.25
```

## collector

- 无状态
- 与存储后端交互 - 写入到存储
- SPAN_STORAGE_TYPE
  - cassandra, elasticsearch, kafka, grpc-plugin, badger, memory
  - 支持多个 - 逗号分隔 - 查询只会用第一个
  - 大型生产推荐 es
    - 因为 es 支持搜索
    - 使用 cassandra 需要在 jeager
    - [What is the recommended storage backend?](https://www.jaegertracing.io/docs/1.25/faq/#what-is-the-recommended-storage-backend)
- 存储插件 - 基于 unix-socket [grpc](https://github.com/jaegertracing/jaeger/tree/master/plugin/storage/grpc)
  - [jaegertracing/jaeger-clickhouse](https://github.com/jaegertracing/jaeger-clickhouse)

| port  | protocol | function                                                  |
| ----- | -------- | --------------------------------------------------------- |
| 14250 | gRPC     | jaeger-agent send spans - model.proto                     |
| 14268 | HTTP     | spans in jaeger.thrift binary                             |
| 9411  | HTTP     | Zipkin spans in Thrift, JSON, Proto (disabled by default) |
| 14269 | HTTP     | 管理 - 健康检查 / , 指标 /metrics                         |

## ingester

- kafka -> 其他后端存储 - es 或 cassandra
- 管理端口 14270

## query

- UI

| Port  | Protocol | Function          |
| ----- | -------- | ----------------- |
| 16685 | gRPC     | gRPC QueryService |
| 16686 | HTTP     | `/api/*`, UI /    |
| 16687 | HTTP     | 管理端口          |
