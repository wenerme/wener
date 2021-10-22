---
title: vector
---

# vector

- [vectordotdev/vector](https://github.com/vectordotdev/vector)
  - MPL-2.0, Rust
  - Datadog 开源
  - observability data **pipeline**
  - logs, metrics, traces(WIP) - observability 全家桶
- Sources
  - Prometheus RemoteWrite/Scrap
  - s3, fluent, logstash
  - Kubernetes_logs, docker_logs, nginx_metrics, postgresql_metrics, statsd
  - host_metrics, journald, exec, file, syslog, socket, stdin
  - nats
  - internal_logs, internal_metrics
  - vector
  - [dnstap](https://dnstap.info/)
- Transforms
- Sinks
  - S3, ClickHouse, Elastic, Loki, InfluxDB, Prometheus RW/Export, Statsd
  - Redis, Plusar, Nats, Kafka
  - Vector
- 角色
  - agent - 采集
  - aggregator - 聚合
  - sidecar - 应用

:::info issues

- [#1444](https://github.com/vectordotdev/vector/issues/1444) opentelemetry source & sink
  - 预计 2021 年底
- [#939](https://github.com/vectordotdev/vector/issues/939) timescale/postgres sink
- [#6556](https://github.com/vectordotdev/vector/issues/6556) PostgreSQL/MySQL sink
- [#988](https://github.com/vectordotdev/vector/issues/988) sonic
- [#573](https://github.com/vectordotdev/vector/issues/573) grpc source
- [#2302](https://github.com/vectordotdev/vector/issues/2302) zstd compress
- [#1206](https://github.com/vectordotdev/vector/issues/1206) windows_event_log source

:::

```bash
# macOS
brew tap vectordotdev/brew
brew install vector

# https://github.com/vectordotdev/vector/releases
```

## 配置

```ini
# data_dir = "/var/lib/vector"

[sources.dummy_logs]
type = "generator"
format = "syslog"
interval = 1

# ector Remap Language https://vector.dev/docs/reference/vrl/
[transforms.parse_logs]
type = "remap"
inputs = ["dummy_logs"]
source = '
. = parse_syslog!(string!(.message))
'

# Print parsed logs to stdout
[sinks.print]
type = "console"
inputs = ["parse_logs"]
encoding.codec = "json"

# GraphQL API http://localhost:8686
# vector top
[api]
enabled = true
address = "127.0.0.1:8686"
```

## 部署
- HELM https://vector.dev/docs/setup/installation/package-managers/helm/
- https://vector.dev/docs/setup/installation/platforms/kubernetes/
