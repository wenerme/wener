---
title: OpenTelemetry
---

# OpenTelemetry

**Log**

```json
{
  "_timestamp": 1757579545084764,
  "body": "Starting #0",
  "code_file_path": "/app/main.py",
  "code_function_name": "lifespan",
  "code_line_number": 67,
  "deployment_environment": "production",
  "dropped_attributes_count": 0,
  "instrumentation_library_name": "app.main",
  "service_name": "api",
  "service_namespace": "app",
  "service_version": "1.0.0",
  "severity": "INFO",
  "telemetry_sdk_language": "python",
  "telemetry_sdk_name": "opentelemetry",
  "telemetry_sdk_version": "1.36.0"
}
```

## 环境变量 {#env-vars}

- OTEL_EXPORTER_OTLP_ENDPOINT
  - gRPC http://localhost:4317
  - HTTP http://localhost:4318
- Python
  - OTEL_PYTHON_TRACER_PROVIDER
- https://opentelemetry.io/docs/specs/semconv/resource/deployment-environment/

| env                                                | demo                              | for                          |
| -------------------------------------------------- | --------------------------------- | ---------------------------- |
| OTEL_RESOURCE_ATTRIBUTES                           |
| OTEL_SERVICE_NAME                                  |                                   | service.name                 |
| OTEL_LOG_LEVEL                                     |
| OTEL_PROPAGATORS                                   |
| OTEL_TRACES_SAMPLER                                |
| OTEL_EXPORTER_OTLP_ENDPOINT                        | http://localhost:4318             |
| OTEL_EXPORTER_OTLP_TRACES_ENDPOINT                 | http://localhost:4318/v1/traces   |
| OTEL_EXPORTER_OTLP_METRICS_ENDPOINT                | http://my-api-endpoint/v1/metrics |
| OTEL_EXPORTER_OTLP_LOGS_ENDPOINT                   | http://my-api-endpoint/v1/logs    |
| OTEL_EXPORTER_OTLP_HEADERS                         |
| `OTEL_EXPORTER_OTLP_{TRACES,METRICS,LOGS}_HEADERS` |
| OTEL_EXPORTER_OTLP_TIMEOUT                         |
| `OTEL_EXPORTER_OTLP_{TRACES,METRICS,LOGS}_TIMEOUT` |
| OTEL_EXPORTER_OTLP_PROTOCOL                        | grpc                              | grpc,http/protobuf,http/json |
| `OTEL_EXPORTER_OTLP_*_PROTOCOL`                    |
| OTEL_SDK_DISABLED                                  |
| OTEL_TRACES_EXPORTER                               | otlp                              |
| OTEL_METRICS_EXPORTER                              | otlp                              |
| OTEL_LOGS_EXPORTER                                 | otlp                              |
| TRACEPARENT                                        |                                   | 一般用于 IPC                 |
| TRACESTATE                                         |                                   | 一般配合 TRACEPARENT         |

- OTEL_TRACES_EXPORTER - otlp, zipkin, console, logging, none
- OTEL_METRICS_EXPORTER - otlp, prometheus, console, none
- OTEL_LOGS_EXPORTER - otlp, console, logging, none
- `OTEL_{LANGUAGE}_{FEATURE}`

| OTEL_PROPAGATORS | Description                             |
| ---------------- | --------------------------------------- |
| tracecontext     | W3C Trace Context                       |
| baggage          | W3C Baggage                             |
| b3               | B3 Single                               |
| b3multi          | B3 Multi                                |
| jaeger           | Jaeger                                  |
| xray             | AWS X-Ray                               |
| ottrace          | OT Trace                                |
| none             | No automatically configured propagator. |

| OTEL_TRACES_SAMPLER       | Description                                  |
| ------------------------- | -------------------------------------------- |
| always_on                 | AlwaysOnSampler                              |
| always_off                | AlwaysOffSampler                             |
| traceidratio              | TraceIdRatioBased                            |
| parentbased_always_on     | ParentBased(root=AlwaysOnSampler)            |
| parentbased_always_off    | ParentBased(root=AlwaysOffSampler)           |
| parentbased_traceidratio  | ParentBased(root=TraceIdRatioBased)          |
| parentbased_jaeger_remote | ParentBased(root=JaegerRemoteSampler)        |
| jaeger_remote             | JaegerRemoteSampler                          |
| xray                      | AWS X-Ray Centralized Sampling (third party) |

- https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/
- https://opentelemetry.io/docs/languages/sdk-configuration/otlp-exporter/
