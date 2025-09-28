---
title: Observability Awesome
tags:
  - Awesome
---

# Observability Awesome

:::tip What dose Observability mean?

- logs - 日志
- metrics - 指标
- session replays - 会话重放
- traces - 跟踪
- errors - 错误

:::

:::tip

- 目前业内共识 OTEL
- 大多场景直接选择 OpenTelemetry 即可

:::

- o11y - Observability
- [getsentry/sentry](./tracing/sentry.md)
- Uptime
  - [louislam/uptime-kuma](https://github.com/louislam/uptime-kuma)
    - MIT, JS, Vue
    - 监控网站 uptime
    - https://demo.uptime.kuma.pet/
    - [uptime-kuma](./uptime-kuma.md)
  - [upptime/upptime](https://github.com/upptime/upptime)
- Alerting
  - [ccfos/nightingale](https://github.com/ccfos/nightingale)
    - Apache-2.0, Go
  - [prometheus/alertmanager](https://github.com/prometheus/alertmanager)
- [openobserve](./openobserve.md)
  - zincobserve -> openobserve
  - Apache-2.0, Rust
  - 从 ZincSearch 演化而来
  - Log & Trace & Metrics
- [通用时间序列数据库/time-series](../../db/db-awesome.md#time-series)
- https://opentelemetry.io/ecosystem/vendors/
- [observIQ/bindplane-op](https://github.com/observIQ/bindplane-op)
- [hyperdxio/hyperdx](https://github.com/hyperdxio/hyperdx)
  - MIT, TS
  - Clickhouse 存储
  - session replays, logs, metrics, traces, errors
- [clickvisual/clickvisual](https://github.com/clickvisual/clickvisual)
  - UI for Clickhouse
- [highlight/highlight](https://github.com/highlight/highlight)
- [keephq/keep](https://github.com/keephq/keep)
  - MIT+EE, Python, Typescript
  - AIOps and alert management platform
- [prymitive/karma](https://github.com/prymitive/karma)
  - Apache-2.0, Go, Typescript
  - Alert dashboard for Prometheus Alertmanager
- [google/mtail](https://github.com/google/mtail)
  - Apache-2.0, Go
  - 从应用程序日志中提取监控指标

## Tracing

- [teletrace/teletrace](https://github.com/teletrace/teletrace)
  - Apache-2.0, Go
- [hypertrace/hypertrace](https://github.com/hypertrace/hypertrace)

## Metrics

- Prometheus
- InfluxDB
- [victoria-metrics](./metrics/victoria-metrics/README.md)
  - 最好，最推荐
- [m3db/m3](./metrics/m3.md)
  - Apache-2.0, Go
  - Distributed TSDB, Aggregator and Query Engine, Prometheus Sidecar, Graphite Compatible, Metrics Platform
- 基于/fork Prometheus 的服务
  - [promxy](./metrics/promxy.md)
  - [cortex](./metrics/cortex.md)
  - [thanos](./metrics/thanos.md)
- [jacksontj/promxy](./metrics/promxy.md)
  - 聚合多个 prometheus 进行查询
  - [config.yaml](https://github.com/jacksontj/promxy/blob/master/cmd/promxy/config.yaml)
    - nocache=1 for VictoriaMetrics [QueryParams](https://github.com/jacksontj/promxy/blob/d4609ebcfd2a50d58f2115c1f079bf4779fc5515/pkg/servergroup/config.go#L96-L99)
- [prom-migrator](https://github.com/timescale/promscale/tree/master/cmd/prom-migrator)
- [grafana/mimir](https://github.com/grafana/mimir)
  - AGPLv3, Go
  - 长期存储，使用 S3 存储
- 商业
  - Datadog - APM 和监控平台
  - New Relic - 应用性能监控
  - AWS CloudWatch - 云指标
- [spinnaker/kayenta](https://github.com/spinnaker/kayenta)
  - Automated Canary Service
  - part of Spinnaker
- [argoproj/argo-rollouts](https://github.com/argoproj/argo-rollouts)
  - 利用 Kubernetes 生态，声明式地管理发布过程
  - 渐进式交付（Progressive Delivery）

## APM

:::tip

- APM -> Application Performance Management
- APM = Metrcis + Trace = Prometheus + Jaeger
- APM 内置集成 - 而不是简单的组合两个场景 - 例如: Grafana 同时显示 Prometheus + Jaeger
- 多用于 Java 环境 - 更容易 instrument
- 非 Java 环境使用 OpenTelemetry
- 围绕 业务/应用/Application

:::

- [uptrace/uptrace](https://github.com/uptrace/uptrace)
  - BSL, Golang
  - 存储使用 ClickHouse
- [SigNoz/signoz](https://github.com/SigNoz/signoz)
  - MIT, Golang
  - OpenTelemetry Collector, ClickHouse
  - https://signoz.io/docs/architecture/
- [opensearch-project/observability](https://github.com/opensearch-project/observability)
- Graphite
- Javamelody
- Stagemonitor
- Scouter
- Elastic APM
- App Metrics
- Glowroot
- [erda-project/erda](https://github.com/erda-project/erda)
  - Apache-2.0, Go

**国人开发维护**

- [sunface/datav](https://github.com/sunface/datav)
  - Apache-2.0, TS+Go
- [dianping/cat](https://github.com/dianping/cat)
  - Apache-2.0, Java
  - by 美团点评
- [pinpoint-apm/pinpoint](https://github.com/pinpoint-apm/pinpoint)
  - Apache-2.0, Java
  - HBase
- [apache/skywalking](https://github.com/apache/skywalking)
  - Apache-2.0, Java
  - ES, H2, MySQL, PostgreSQL
- [deepflowio/deepflow](https://github.com/deepflowio/deepflow)
  - Apache-2.0, Go, Rust

## Profiling

> 1. 更加细致的指标监控 - 方法，进程级别
> 2. 更加细粒度 - 毫秒级
> 3. 主要用于程序优化

- [grafana/pyroscope](https://github.com/grafana/pyroscope)
  - AGPLv3, Go
- [parca-dev/parca](https://github.com/parca-dev/parca)
  - Apache-2.0, Go
  - Continuous profiling for analysis of CPU and memory usage
- [andrewrk/poop](https://github.com/andrewrk/poop)
  - MIT, Zig
  - Performance Optimizer Observation Platform
  - linux perf_event_open
- [plasma-umass/coz](https://github.com/plasma-umass/coz)
  - BSD 2-Clause, C
  - Causal Profiling
- https://github.com/ZaMaZaN4iK/awesome-pgo
