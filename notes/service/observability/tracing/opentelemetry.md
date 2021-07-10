---
title: OpenTelemetry
---

# OpenTelemetry

- OpenTelemetry 是什么？
  - 定义 spec
  - OpenTracing 和 OpenCensus 合并后的项目
  - API -> SDK -> Processing -> Exporter -out of app-> Collector -> Backend
- 参考
  - [open-telemetry/opentelemetry-operator](https://github.com/open-telemetry/opentelemetry-operator)

```bash
docker run --rm -it \
  --name opentelemetry-collector otel/opentelemetry-collector
```

## collector

- [open-telemetry/opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector)
  - vendor-agnostic implementation
  - 实现多套协议
  - 运行模式
    - agent - sidecar,采集器
    - gateway - 网关集群,独立服务
  - core 版 - Jaeger, Prometheus, Fluent Bit
  - contrib 版 - 包含所有 contrib 组件
- [open-telemetry/opentelemetry-collector-contrib/exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter)
  不同后端的 exporter
- 组件
  - receivers
  - processors
  - exporters

```yaml
# 数据源定义 - 在 pipeline/service 中使用
# push or pull
receivers:
  otlp:
    protocols:
      grpc:
      http:

processors:
  batch:

exporters:
  otlp:
    endpoint: otelcol:55680

extensions:
  health_check:
  pprof:
  zpages:

service:
  extensions: [health_check, pprof, zpages]
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp]
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp]
    logs:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp]
```
