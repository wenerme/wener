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
- otlp

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

## NodeJS

```bash
npm add @opentelemetry/api @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node

# @opentelemetry/sdk-trace-web
# @opentelemetry/sdk-metrics
npm add @opentelemetry/sdk-trace-node @opentelemetry/exporter-trace-otlp-proto
```

```ts title="tracing.ts"
'use strict';

import process from 'node:process';

const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

// configure the SDK to export telemetry data to the console
// enable all auto-instrumentations from the meta package
const traceExporter = new ConsoleSpanExporter();
const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'my-service',
  }),
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk.start();

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});
```
