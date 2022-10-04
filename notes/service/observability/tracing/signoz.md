---
title: Signoz
---

# Signoz

- [SigNoz/signoz](https://github.com/SigNoz/signoz)
  - MIT, Golang
  - APM, ClickHouse
  - 应用信息存储在 SQLite [#941](https://github.com/SigNoz/signoz/issues/941)
    - dashboards layout, alert config
- signoz/alertmanager
- signoz/query-service
- signoz/frontend
- signoz/signoz-otel-collector
- [export K8s metrics](https://signoz.io/docs/tutorial/kubernetes-infra-metrics)


| port  | for                                     |
| ----- | --------------------------------------- |
| 1777  | pprof extension                         |
| 4317  | OTLP gRPC receiver                      |
| 4318  | OTLP HTTP receiver                      |
| 8888  | OtelCollector internal metrics          |
| 8889  | signoz spanmetrics exposed by the agent |
| 9411  | Zipkin port                             |
| 13133 | health check extension                  |
| 14250 | Jaeger gRPC                             |
| 14268 | Jaeger thrift HTTP                      |
| 55678 | OpenCensus receiver                     |
| 55679 | zPages extension                        |

:::note

- OpenID Connect/OAuth2 support [#1188](https://github.com/SigNoz/signoz/issues/1188)
  - 不打算支持 SSO
- LDAP [#1162](https://github.com/SigNoz/signoz/issues/1162)

:::

- https://charts.signoz.io
- https://signoz.io/docs/install/kubernetes/others/
- Docker Compose
  https://github.com/SigNoz/signoz/blob/develop/deploy/docker/clickhouse-setup/docker-compose.yaml

## Notes

- 默认库
  - signoz_traces
  - signoz_metrics


```bash
```
