---
title: promxy
---

# promxy

- [jacksontj/promxy](https://github.com/jacksontj/promxy)
  - 聚合多个 prometheus 进行查询
  - [config.yaml](https://github.com/jacksontj/promxy/blob/master/cmd/promxy/config.yaml)
    - nocache=1 for VictoriaMetrics [QueryParams](https://github.com/jacksontj/promxy/blob/d4609ebcfd2a50d58f2115c1f079bf4779fc5515/pkg/servergroup/config.go#L96-L99)

```bash
# http://127.0.0.1:8082
promxy --config config.yaml

# https://hub.docker.com/r/jacksontj/promxy
# docker run -p 8082:8082 -v $(pwd)/config.yaml:/config.yaml jacksontj/promxy --config /config.yaml
docker run -p 8082:8082 -v $(pwd)/config.yaml:/config.yaml jacksontj/promxy --config.file=/config.yaml

promxy --config.file=config.yaml

# 访问Promxy的Web界面
curl "http://localhost:8082/graph"

# API查询
curl "http://localhost:8082/api/v1/query?query=up"
```

**VictoriaMetrics优化**:

- 添加 `nocache=1` 查询参数避免缓存问题
- 配置 `query_params` 部分在server_groups中

## 配置示例

### 基本HA配置

```yaml
global:
  external_labels:
    proxy: 'true'

prometheus:
  global:
    scrape_interval: 15s
    evaluation_interval: 15s

# Server groups for HA
server_groups:
  - static_configs:
      - targets:
          - prometheus-1:9090
          - prometheus-2:9090
          - prometheus-3:9090
    labels:
      cluster: 'prod'
      replica: '1'
```

### 完整配置示例

```yaml
global:
  external_labels:
    proxy: 'true'
  # Query timeout
  timeout: 5m

prometheus:
  global:
    scrape_interval: 15s
    evaluation_interval: 15s
    # External labels to add to metrics
    external_labels:
      region: 'us-west'

  # Alerting configuration
  alerting:
    alertmanagers:
      - static_configs:
          - targets:
              - alertmanager:9093

  # Rule files
  rule_files:
    - 'rules.yml'

# Server groups define how to connect to Prometheus servers
server_groups:
  # Production cluster
  - static_configs:
      - targets:
          - prometheus-prod-1:9090
          - prometheus-prod-2:9090
          - prometheus-prod-3:9090
    labels:
      cluster: 'prod'
      environment: 'production'
    # Anti-affinity for load balancing
    anti_affinity: 30s
    # Remote read configuration
    remote_read: true
    # Query parameters to pass through
    query_params:
      nocache: '1'

  # Staging cluster
  - static_configs:
      - targets:
          - prometheus-staging:9090
    labels:
      cluster: 'staging'
      environment: 'staging'

# Server configuration
server:
  # Listen address
  listen_addr: '0.0.0.0:8082'
  # Enable profiling
  enable_profiling: true
  # Metrics path
  metrics_path: '/metrics'

# Logging configuration
logging:
  level: 'info'
  format: 'json'
```
