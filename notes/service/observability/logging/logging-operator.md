---
title: logging-operator
tags:
  - Kubernetes
  - Operator
---

# logging-operator

- [banzaicloud/logging-operator](https://github.com/banzaicloud/logging-operator)
  - Fluentd and Fluentbit
  - Kafka, Loki, Elasticsearch
- 参考
  - [CRDs]https://banzaicloud.com/docs/one-eye/logging-operator/configuration/crds/v1beta1/()

```yaml
apiVersion: logging.banzaicloud.io/v1beta1
kind: Logging
metadata:
  name: default-logging-simple
spec:
  fluentd: {}
  fluentbit: {}
  controlNamespace: logging
  #watchNamespaces: ["prod", "test"]
---
apiVersion: logging.banzaicloud.io/v1beta1
kind: Output
metadata:
  name: es-output
spec:
  # ES
  elasticsearch:
    host: quickstart-es-http.logging.svc.cluster.local
    port: 9200
    scheme: https
    ssl_verify: false
    ssl_version: TLSv1_2
    user: elastic
    password:
      valueFrom:
        secretKeyRef:
          name: quickstart-es-elastic-user
          key: elastic
    buffer:
      timekey: 1m
      timekey_wait: 30s
      timekey_use_utc: true
  # Loki
  loki:
    url: http://loki:3100
    configure_kubernetes_labels: true
    buffer:
      timekey: 1m
      timekey_wait: 30s
      timekey_use_utc: true
---
apiVersion: logging.banzaicloud.io/v1beta1
kind: Flow
metadata:
  name: es-flow
spec:
  filters:
    - tag_normaliser: {}
    - parser:
        remove_key_name_field: true
        reserve_data: true
        parse:
          type: nginx
  match:
    - select:
        labels:
          app.kubernetes.io/name: log-generator
  localOutputRefs:
    - es-output
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: log-generator
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: log-generator
  replicas: 1
  template:
    metadata:
      labels:
        app.kubernetes.io/name: log-generator
    spec:
      containers:
        - name: nginx
          image: banzaicloud/log-generator:0.3.2
```

## Notes

- Logging
  - Fluentd + Fluent-bit
- Output
- Flow
  - filters + outputs
- clusteroutput
  - 不限定 Namespace 的 Output
- clusterflow
  - 不限定 Namespace 的 Flow
