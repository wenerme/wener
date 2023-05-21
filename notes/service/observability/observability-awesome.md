---
title: Observability Awesome
tags:
  - Awesome
---

# Observability Awesome

- [getsentry/sentry](./tracing/sentry.md)
- [louislam/uptime-kuma](https://github.com/louislam/uptime-kuma)
  - MIT, JS, Vue
  - 监控网站 uptime
  - https://demo.uptime.kuma.pet/
- [parca-dev/parca](https://github.com/parca-dev/parca)
  - Apache-2.0, Go
  - Continuous profiling for analysis of CPU and memory usage
- [zinclabs/zincobserve](https://github.com/zinclabs/zincobserve)
  - Apache-2.0, Rust
  - 从 ZincSearch 演化而来
  - Log & Trace

## Tracing

- [hypertrace/hypertrace](https://github.com/hypertrace/hypertrace)

## Metrics

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

## APM

:::tip

- APM = Metrcis + Trace = Prometheus + Jaeger
- APM 内置集成 - 而不是简单的组合两个场景 - 例如: Grafana 同时显示 Prometheus + Jaeger
- 多用于 Java 环境 - 更容易 instrument
- 非 Java 环境使用 OpenTelemetry

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

**国人开发维护**

- [sunface/datav](https://github.com/sunface/datav)
  - Apache-2.0, TS+Go
- [dianping/cat](https://github.com/dianping/cat)
  - Apache-2.0, Java
  - 美团点评
- [pinpoint-apm/pinpoint](https://github.com/pinpoint-apm/pinpoint)
  - Apache-2.0, Java
  - HBase
- [apache/skywalking](https://github.com/apache/skywalking)
  - Apache-2.0, Java
  - ES, H2, MySQL,TiDb, sharding-sphere

## Profiling

- [grafana/pyroscope](https://github.com/grafana/pyroscope)
