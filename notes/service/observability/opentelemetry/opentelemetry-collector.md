---
title: OpenTelemetry Collector
---

# OpenTelemetry Collector

- [open-telemetry/opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector)
  - Apache-2.0, Go
  - by CNCF
  - vendor-agnostic 的遥测数据接收、处理和导出
  - 支持 traces, metrics, logs
- [opentelemetry.io](https://opentelemetry.io)
- [opentelemetry-collector-releases](https://github.com/open-telemetry/opentelemetry-collector-releases)
  - `otelcol-contrib` - 最常用的发行版
- **Vendor-agnostic** - 不绑定特定厂商
- **统一格式** - OTLP (OpenTelemetry Protocol)
- **可扩展** - 插件化架构
- **高性能** - Go 实现
- **CNCF 标准** - 云原生标准
- **Core Collector** - 核心组件
- **Contrib Collector** - 包含社区贡献的 receivers/processors/exporters

```
┌─────────────────────────────────────────────────┐
│          OpenTelemetry Collector                │
│                                                 │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐     │
│  │ Receivers│──>│Processors│──>│ Exporters│     │
│  └──────────┘   └──────────┘   └──────────┘     │
│       ^              │               │          │
│       │              │               v          │
│  ┌────┴─────┐   ┌───-┴───┐    ┌──────────┐      │
│  │Extensions│   │Pipeline│    │  Backend │      │
│  └──────────┘   └────────┘    └──────────┘      │
└─────────────────────────────────────────────────┘
```

```bash
# https://opentelemetry.io/docs/collector/installation/

OTEL_VERSION="0.137.0"

# Linux AMD64
curl -LO https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v${OTEL_VERSION}/otelcol-contrib_${OTEL_VERSION}_linux_amd64.tar.gz
tar -xzf otelcol-contrib_${OTEL_VERSION}_linux_amd64.tar.gz
sudo mv otelcol-contrib /usr/local/bin/

# macOS ARM64
curl -LO https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v${OTEL_VERSION}/otelcol-contrib_${OTEL_VERSION}_darwin_arm64.tar.gz
tar -xzf otelcol-contrib_${OTEL_VERSION}_darwin_arm64.tar.gz
mv otelcol-contrib ~/bin/

# Docker
# otel/opentelemetry-collector-contrib:0.137.0
# otel/opentelemetry-collector:1.43.0

otelcol-contrib --config otel.config.yaml validate
```

- OpenObserve Agent 默认推荐 OpenTelemetry Collector
  - https://github.com/openobserve/agents/
  - https://raw.githubusercontent.com/openobserve/agents/main/linux/install.sh

## 组件类型

### Receivers

接收遥测数据的组件

**Protocols**:

- `otlp` - OpenTelemetry Protocol (gRPC/HTTP)
- `jaeger` - Jaeger traces
- `zipkin` - Zipkin traces
- `prometheus` - Prometheus metrics

**System**:

- `hostmetrics` - 主机指标 (CPU, 内存, 磁盘, 网络)
- `filelog` - 文件日志
- `journald` - systemd journal
- `syslog` - Syslog 协议

**Application**:

- `kafka` - Kafka 消息
- `fluentforward` - Fluentd/Fluent Bit
- `statsd` - StatsD metrics

### Processors

处理和转换遥测数据

**Core Processors**:

- `batch` - 批量处理，减少请求数
- `memory_limiter` - 内存限制保护
- `resourcedetection` - 自动检测资源属性
- `attributes` - 添加/删除/更新属性
- `filter` - 过滤数据
- `transform` - 数据转换

**Advanced**:

- `tail_sampling` - 尾部采样
- `span` - Span 处理
- `metricstransform` - Metrics 转换
- `resource` - Resource 处理

### Exporters

发送遥测数据到后端系统

**OpenTelemetry**:

- `otlp` - OTLP gRPC
- `otlphttp` - OTLP HTTP

**Tracing**:

- `jaeger` - Jaeger
- `zipkin` - Zipkin
- `datadog` - Datadog APM

**Metrics**:

- `prometheus` - Prometheus
- `prometheusremotewrite` - Prometheus Remote Write
- `influxdb` - InfluxDB

**Logging**:

- `loki` - Grafana Loki
- `elasticsearch` - Elasticsearch
- `splunk_hec` - Splunk HEC

**Storage**:

- `kafka` - Kafka
- `file` - 文件系统

**Cloud**:

- `awsxray` - AWS X-Ray
- `awsemf` - AWS CloudWatch EMF
- `googlecloud` - Google Cloud
- `azuremonitor` - Azure Monitor

### Extensions

提供额外功能的组件

- `health_check` - 健康检查 `/health`
- `pprof` - Go profiling
- `zpages` - 调试页面
- `basicauth` - 基础认证
- `bearertokenauth` - Bearer Token 认证
