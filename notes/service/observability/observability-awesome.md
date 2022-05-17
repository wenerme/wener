---
title: Observability Awesome
tags:
  - Awesome
---

# Observability Awesome

- [m3db/m3](https://github.com/m3db/m3)
- [getsentry/sentry](https://github.com/getsentry/sentry)
- [dianping/cat](https://github.com/dianping/cat)
  - Apache-2.0, Java
  - 国产
  - 美团点评
- [louislam/uptime-kuma](https://github.com/louislam/uptime-kuma)
- [polarsignals/arcticdb](https://github.com/polarsignals/arcticdb)
  - Apache-2.0, Go
  - embeddable columnar database
- [parca-dev/parca](https://github.com/parca-dev/parca)
  - Apache-2.0, Go
  - Continuous profiling for analysis of CPU and memory usage

## Metrics

- 基于/fork Prometheus 的服务
  - promxy
  - cortex
  - thanos
- [jacksontj/promxy](https://github.com/jacksontj/promxy)
  - 聚合多个 prometheus 进行查询
  - [config.yaml](https://github.com/jacksontj/promxy/blob/master/cmd/promxy/config.yaml)
    - nocache=1 for VictoriaMetrics [QueryParams](https://github.com/jacksontj/promxy/blob/d4609ebcfd2a50d58f2115c1f079bf4779fc5515/pkg/servergroup/config.go#L96-L99)
- [prom-migrator](https://github.com/timescale/promscale/tree/master/cmd/prom-migrator)

## APM

:::tip

- APM = Metrcis + Trace = Prometheus + Jaeger
- APM 内置集成 - 而不是简单的组合两个场景 - 例如: Grafana 同时显示 Prometheus + Jaeger

:::

- [pinpoint-apm/pinpoint](https://github.com/pinpoint-apm/pinpoint)
  - Apache-2.0, Java
- [apache/skywalking](https://github.com/apache/skywalking)
  - Apache-2.0, Java
  - 国产
- [SigNoz/signoz](https://github.com/SigNoz/signoz)
  - MIT, Golang
  - OpenTelemetry Collector, ClickHouse
  - https://signoz.io/docs/architecture/
