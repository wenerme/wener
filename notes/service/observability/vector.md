---
title: vector
---

# vector

- [vectordotdev/vector](https://github.com/vectordotdev/vector)
  - MPL-2.0, Rust
  - observability data **pipeline**
  - logs, metrics, traces(WIP)
- Sources
  - Prometheus RemoteWrite/Scrap, Kafka, K8S log, Nats, Syslog
- Transforms
- Sinks
  - S3, ClickHouse, Elastic, Loki, Kafka, Nats
- 角色
  - agent
  - aggregator
  - sidecar
- watch
  - [#939](https://github.com/vectordotdev/vector/issues/939) timescale/postgres sink
  - [#6556](https://github.com/vectordotdev/vector/issues/6556) PostgreSQL/MySQL sink
  - [#1444](https://github.com/vectordotdev/vector/issues/1444) opentelemetry source & sink
  - [#988](https://github.com/vectordotdev/vector/issues/988) sonic
  - [#573](https://github.com/vectordotdev/vector/issues/573) grpc source
  - [#2302](https://github.com/vectordotdev/vector/issues/2302) zstd compress

```bash
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
