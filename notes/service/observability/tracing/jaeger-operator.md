---
title: Jaeger Operator
tags:
  - Kubernetes
  - Operator
---

# jaeger-operator

- [jaegertracing/jaeger-operator](https://github.com/jaegertracing/jaeger-operator)
- API
  - Jaeger
- namespace/deployment annotation sidecar.jaegertracing.io/inject

```yaml
apiVersion: jaegertracing.io/v1
kind: Jaeger
metadata:
  name: my-jaeger
spec:
  # allInOne - 默认，测试、演示
  # production - 组件独立部署，collector
  # streaming - 在 production 之上增加流处理 - Ingester - Kafka
  strategy: allInOne
  allInOne:
    image: jaegertracing/all-in-one:latest
    options:
      log-level: debug
  storage:
    # memory, allInOne, elasticsearch
    type: memory
    # ES_PASSWORD, ES_USERNAME
    secretName: jaeger-secret
    options:
      memory:
        max-traces: 100000
      cassandra:
        servers: cassandra
        keyspace: jaeger_v1_datacenter3
      es:
        server-urls: https://quickstart-es-http.default.svc:9200
        index-prefix: my-prefix
    cassandraCreateSchema:
      enabled: false
  ingress:
    enabled: false
  agent:
    # 默认作为 sidecar inject
    strategy: DaemonSet
  annotations:
    scheduler.alpha.kubernetes.io/critical-pod: ''
```
