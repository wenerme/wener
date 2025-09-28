---
title: vector
---

# vector

- [vectordotdev/vector](https://github.com/vectordotdev/vector)
  - MPL-2.0, Rust
  - Datadog 开源
  - observability data **pipeline**
  - logs, metrics, traces(WIP) - observability 采集处理全家桶
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
- [Sinks](https://vector.dev/docs/reference/configuration/sinks/)
  - S3, ClickHouse, Elastic, Loki, InfluxDB, Prometheus RW/Export, Statsd
  - Redis, Plusar, Nats, Kafka
  - Vector
- 角色
  - agent - 采集
    - source -> sink
    - source 通常为 file, kubernetes_logs, host_metrics
  - aggregator - 聚合
    - source 通常为 vector, syslog, statsd, fluent
    - transform
  - sidecar - 应用

:::info issues

- timescale/postgres sink [#939](https://github.com/vectordotdev/vector/issues/939)
- PostgreSQL/MySQL sink [#6556](https://github.com/vectordotdev/vector/issues/6556)
- sonic sink [#988](https://github.com/vectordotdev/vector/issues/988)
- grpc source [#573](https://github.com/vectordotdev/vector/issues/573)
- zstd compress [#2302](https://github.com/vectordotdev/vector/issues/2302)
- windows_event_log source [#1206](https://github.com/vectordotdev/vector/issues/1206)
- VictoriaMetrics sink [#1343](https://github.com/vectordotdev/vector/issues/1343)
- `kubernetes_system_events` source [#1293](https://github.com/vectordotdev/vector/issues/1293)
  - [salesforce/sloop](https://github.com/salesforce/sloop)
    Kubernetes History Visualization

---

- stops watching logs from new pods [#8616](https://github.com/vectordotdev/vector/issues/8616)

---

- opentelemetry source & sink [#1444](https://github.com/vectordotdev/vector/issues/1444)

:::

```bash
# macOS
brew install vectordotdev/brew/vector

# https://github.com/vectordotdev/vector/releases
```

## Sources & Sinks

- kubernetes_logs
- host_metrics
- internal_metrics
- prometheus_scrape
  - 不支持自动发现
  - https://github.com/vectordotdev/vector/issues/2303
- Metrics
  - prometheus_exporter - Prometheus 的 /metrics
  - prometheus_remote_write
  - statsd
- console - 输出日志到 stdout - debug 用
- 通用
  - vector
  - file
  - socket
  - redis
  - websocket
  - nats
  - kafka
  - pulsar

## 配置

- API
  - /playground
    - GraphQL playground
  - /health
  - /graphql
  - https://vector.dev/docs/reference/api/

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

- /etc/vector/

## 部署

- [Install Vector using Helm](https://vector.dev/docs/setup/installation/package-managers/helm/)
  - https://helm.vector.dev
    - https://github.com/vectordotdev/helm-charts
      - 主要是 vector 包
  - kubectl https://github.com/vectordotdev/vector/tree/master/distribution/kubernetes/vector-agent
    - 使用 `helm template vector vector/vector` 生成
- [Kubernetes](https://vector.dev/docs/setup/installation/platforms/kubernetes/)
- 环境变量
  - VECTOR_SELF_NODE_NAME
  - VECTOR_SELF_POD_NAME
  - VECTOR_SELF_POD_NAMESPACE

| Port  | Name          |
| ----- | ------------- |
| 5044  | logstash      |
| 6000  | vector        |
| 8080  | splunk-hec    |
| 8125  | statsd        |
| 8282  | datadog-agent |
| 9000  | syslog        |
| 9090  | prom-exporter |
| 24224 | fluent        |

<!--
```toml
[transforms.add_k8s_node_name]
  type = "add_fields"
  inputs = ["kubernete_log"]
  fields.kubernetes_node_name = "${VECTOR_SELF_NODE_NAME}"
```
-->

### Agent

- 收集 host 主机上的 k8s 日志
- 收集 host metrics 暴露为 prometheus_exporter
- 作为 DaemonSet

| volume  | from host       | to path          |
| ------- | --------------- | ---------------- |
| data    | /var/lib/vector | /vector-data-dir |
| config  |                 | /etc/vector/     |
| var-log | /var/log        | /var/log/        |
| var-lib | /var/lib        | /var/lib/        |
| procfs  | /proc           | /host/proc       |
| sysfs   | /sys            | /host/sys        |

- /var/lib/vector
  - 用来存储状态
  - 例如 /var/lib/vector/kubernetes_logs/checkpoints.json

```yaml
data_dir: /vector-data-dir
api:
  enabled: true
  address: 127.0.0.1:8686
  playground: false
sources:
  kubernetes_logs:
    type: kubernetes_logs
  host_metrics:
    filesystem:
      devices:
        excludes: [binfmt_misc]
      filesystems:
        excludes: [binfmt_misc]
      mountPoints:
        excludes: ['*/proc/sys/fs/binfmt_misc']
    type: host_metrics
  internal_metrics:
    type: internal_metrics
sinks:
  prom_exporter:
    type: prometheus_exporter
    inputs: [host_metrics, internal_metrics]
    address: 0.0.0.0:9090
  stdout:
    type: console
    inputs: [kubernetes_logs]
    encoding:
      codec: json
```

## file

- https://vector.dev/docs/reference/configuration/sources/file/

## kubernetes_logs

- `/var/log/pods/**/*.log`
  - `/var/log/pods/<podUID>/<containerName>_<instance#>.log`
    - pod UUID -> metadata
- 不会采集
  - `/var/log/containers/*.log`
    - 弃用
    - `metrics-server-7f86dff975-bghf6_kube-system_metrics-server-cc0a1b325521c82f8b252e4f4e0ab118a4455376cf45c8ae1987841816325ba3.log`
    - Docker
    - 文件名包含更多元信息
    - k0s 用到了
    - 有些环境 /var/log/containers -> /var/log/pods
    - https://github.com/kubernetes/kubernetes/issues/53022
    - https://github.com/fabric8io/fluent-plugin-kubernetes_metadata_filter/issues/105

**排除采集**

```yaml
vector.dev/exclude: 'true'
```

- https://vector.dev/docs/reference/configuration/sources/kubernetes_logs/

## 多行

```yaml
out:
  type: reduce
  inputs:
    - log
  group_by:
    - kubernetes_container_id
  #- container_id
  merge_strategies:
    message: concat_newline
  starts_when: match(string!(.message), r'^[^\s]')
  #starts_when: match(string!(.message) , r'^[^}$]')
```

- https://vector.dev/docs/reference/configuration/transforms/reduce/

## More than one file has the same fingerprint

## syslog
