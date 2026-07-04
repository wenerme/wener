---
title: Observability FAQ
tags:
  - FAQ
---

# Observability FAQ

- 基础设施 - Operational
- 数据源
- 业务

## 概念

- 时间分桶聚合 / time bucketing / time-bin aggregation
  - `histogram(cast(__TIMESTAMP__...), interval ...) GROUP BY time`
- rate normalization / 按桶宽归一化
  - `count(*) / bucket_minutes`
- gap
  - gap filling：时间序列补洞 / 补桶
  - fill mode：填充模式
  - missing data handling：缺失点处理
  - NULL：缺失 bucket 保持空洞；适合 latency percentile、错误率这类不想伪造数据的面板。
  - 0：缺失 bucket 补 0；适合 request count / RPM / error count，但会掩盖数据源断采。
  - previous：用上一个值补；适合 gauge/state，比如 circuit breaker state、pod count、配置状态，不适合 RPM/error count。
  - 不填：通常等价于不做 gap fill，由 datasource/Grafana 默认处理。
  - previous -> forward fill / LOCF（Last Observation Carried Forward，沿用上一个值）
- null-unsafe optional dimension filter
  - 筛选的时候需要考虑空值、ALL

## 数据规模

| 规模   | 量级          |
| ------ | ------------- |
| 小规模 | < GB/天       |
| 中规模 | GB/天 < TB/天 |
| 大规模 | TB/天, PB/天  |

## 长期存储

- 30 天 - 常规，符合一些政策合规
- 90 天 - 中长期分析、计量、对账
- 180 天 - 长期趋势分析
  - 建议下采样
- 通常做下采样

## 采集间隔

| interval | for                                                        |
| -------- | ---------------------------------------------------------- |
| 1s ~ 5s  | 高频调试、压测、短期 profiling；成本高，不适合作为全局默认 |
| 10s      | 较敏感的服务级 SLI / SLO、核心网关、低延迟告警             |
| 15s      | Prometheus 常见默认/标准间隔，适合大多数服务指标           |
| 30s      | 普通业务服务、成本和精度折中                               |
| 60s      | 基础设施、低频变化指标、成本敏感场景                       |
| 5m       | 云账单、容量、资产、配额等慢变化指标                       |
| 15m+     | 成本、用量、报表类离线指标                                 |

- `scrape_interval`：采集目标指标的间隔，越短时序点越多，存储和查询成本越高。
- `evaluation_interval`：Prometheus rule / alert 评估间隔，通常等于或略大于 `scrape_interval`。
- Dashboard 查询的 `step` 通常不应小于采集间隔；长时间范围应自动放大 step 或使用 recording rule / downsample。
- 告警窗口应至少覆盖多个采样点，例如 `rate(x[5m])` 配合 `15s` 或 `30s` 采集更稳定。

## fluent vs filebeat

- [fluent-filebeat-comparison.md](https://gist.github.com/StevenACoffman/4e267f0f60c8e7fcb3f77b9e504f3bd7)

## Grafana vs Kibana

- 参考
  - [Grafana vs. Kibana: The Key Differences to Know](https://logz.io/blog/grafana-vs-kibana/)

## 常用 label

### Prometheus scraper

| label        | for                                                      |
| ------------ | -------------------------------------------------------- |
| `job`        | 抓取任务名，通常对应 scrape config / ServiceMonitor 名称 |
| `instance`   | 抓取目标实例，通常是 `host:port`                         |
| `scrape_job` | 部分系统额外保留的抓取任务标签，避免和业务 `job` 冲突    |
| `__name__`   | 指标名称，PromQL 内部 label，例如 `http_requests_total`  |
| `endpoint`   | Kubernetes Service 端口名或 scrape endpoint              |
| `service`    | 服务名，常用于关联业务服务或 K8s Service                 |
| `namespace`  | Kubernetes namespace                                     |
| `pod`        | Kubernetes Pod 名称                                      |
| `container`  | 容器名称                                                 |

### Kubernetes

| label                   | for                                                 |
| ----------------------- | --------------------------------------------------- |
| `cluster`               | 集群名，多集群监控中常用                            |
| `namespace`             | 命名空间                                            |
| `node`                  | Kubernetes Node 名称                                |
| `pod`                   | Pod 名称                                            |
| `container`             | 容器名称                                            |
| `deployment`            | Deployment 名称                                     |
| `statefulset`           | StatefulSet 名称                                    |
| `daemonset`             | DaemonSet 名称                                      |
| `replicaset`            | ReplicaSet 名称                                     |
| `job_name`              | Kubernetes Job 名称；常避免和 Prometheus `job` 混淆 |
| `cronjob`               | CronJob 名称                                        |
| `service`               | Kubernetes Service 名称                             |
| `ingress`               | Ingress 名称                                        |
| `persistentvolumeclaim` | PVC 名称                                            |
| `resource`              | 资源类型，例如 `cpu`、`memory`、`ephemeral_storage` |
| `unit`                  | 单位，例如 `core`、`byte`                           |

### node_exporter

| label        | for                                               |
| ------------ | ------------------------------------------------- |
| `instance`   | 节点 exporter 地址，通常是 `node:9100`            |
| `job`        | node_exporter 抓取任务名                          |
| `device`     | 磁盘、网卡、块设备名称，例如 `sda`、`eth0`        |
| `mountpoint` | 文件系统挂载点，例如 `/`、`/data`                 |
| `fstype`     | 文件系统类型，例如 `ext4`、`xfs`、`tmpfs`         |
| `cpu`        | CPU 核编号                                        |
| `mode`       | CPU 模式，例如 `idle`、`user`、`system`、`iowait` |
| `interface`  | 网络接口名，部分指标使用 `device` 表示网卡        |
| `address`    | 网络地址或监听地址，取决于具体 collector          |

### HTTP / API

| label         | for                                                    |
| ------------- | ------------------------------------------------------ |
| `method`      | HTTP method，例如 `GET`、`POST`                        |
| `route`       | 低基数路由模板，例如 `/api/users/:id`；优先于原始 path |
| `path`        | 原始请求路径，可能高基数，metric 中慎用                |
| `status`      | HTTP 状态码，例如 `200`、`500`                         |
| `status_code` | HTTP 状态码，OpenTelemetry/部分 SDK 常用               |
| `handler`     | 处理器名称或框架路由 handler                           |
| `host`        | 请求 Host                                              |
| `scheme`      | `http` / `https`                                       |
| `protocol`    | 协议版本，例如 `HTTP/1.1`、`HTTP/2`、`grpc`            |

### RPC / gRPC

| label          | for                                   |
| -------------- | ------------------------------------- |
| `rpc_system`   | RPC 系统，例如 `grpc`、`connect_rpc`  |
| `rpc_service`  | RPC service 名称                      |
| `rpc_method`   | RPC method 名称                       |
| `grpc_code`    | gRPC 状态码，例如 `OK`、`Unavailable` |
| `peer_service` | 对端服务名，常用于依赖调用分析        |
| `client`       | 调用方服务或客户端标识                |
| `server`       | 被调用方服务或服务端标识              |

### OpenTelemetry resource

| label                    | for                                     |
| ------------------------ | --------------------------------------- |
| `service.name`           | 服务名，OTel 资源属性核心字段           |
| `service.namespace`      | 服务命名空间                            |
| `service.instance.id`    | 服务实例 ID；可能较高基数               |
| `service.version`        | 服务版本                                |
| `deployment.environment` | 部署环境，例如 `dev`、`staging`、`prod` |
| `telemetry.sdk.language` | SDK 语言，例如 `go`、`java`、`python`   |
| `telemetry.sdk.name`     | SDK 名称                                |
| `telemetry.sdk.version`  | SDK 版本                                |

### Trace / Log correlation

| label      | for                                         |
| ---------- | ------------------------------------------- |
| `trace_id` | Trace ID；日志里常用，metric label 中慎用   |
| `span_id`  | Span ID；日志里常用，metric label 中慎用    |
| `severity` | 日志级别，例如 `info`、`warn`、`error`      |
| `level`    | 日志级别，常见于日志系统                    |
| `logger`   | logger 名称                                 |
| `source`   | 日志来源，例如 `stdout`、`stderr`、文件路径 |
| `filename` | 源文件或日志文件名                          |

### Database / Queue

| label            | for                                             |
| ---------------- | ----------------------------------------------- |
| `db_system`      | 数据库类型，例如 `postgresql`、`mysql`、`redis` |
| `db_name`        | 数据库名                                        |
| `db_operation`   | 操作类型，例如 `SELECT`、`INSERT`、`GET`        |
| `db_table`       | 表名；分表场景可能高基数                        |
| `queue`          | 队列名                                          |
| `topic`          | 消息 topic                                      |
| `partition`      | 分区编号                                        |
| `consumer_group` | 消费组                                          |

### Cloud / Region

| label                     | for                                    |
| ------------------------- | -------------------------------------- |
| `cloud.provider`          | 云厂商，例如 `aws`、`gcp`、`azure`     |
| `cloud.region`            | 云区域，例如 `us-east-1`、`asia-east1` |
| `cloud.availability_zone` | 可用区                                 |
| `region`                  | 区域，非 OTel 系统常用简写             |
| `zone`                    | 可用区，非 OTel 系统常用简写           |
| `account_id`              | 云账号 ID；多账号成本/监控常用         |
| `project_id`              | GCP project 或内部项目 ID              |

### Alerting

| label           | for                                          |
| --------------- | -------------------------------------------- |
| `alertname`     | 告警规则名称                                 |
| `severity`      | 告警等级，例如 `critical`、`warning`、`info` |
| `team`          | 负责团队                                     |
| `owner`         | 负责人或 owner                               |
| `service`       | 影响服务                                     |
| `runbook_url`   | Runbook 链接，通常作为 annotation 更常见     |
| `dashboard_url` | Dashboard 链接，通常作为 annotation 更常见   |

:::tip
Prometheus label 是高基数字段时会显著增加时序数量；避免把 `user_id`、`request_id`、`trace_id`、原始 `path` 这类高基数字段作为 metric label。HTTP 指标优先使用路由模板 `route`，不要直接使用完整 URL。
:::
