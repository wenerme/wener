---
title: Prometheus K8S
tags:
  - Kubernetes
  - Operator
---

# Prometheus K8S

- [metrics-server](https://github.com/kubernetes-sigs/metrics-server)
  - https://github.com/kubernetes-sigs/metrics-server/issues/7
  - 不是用来对外提供指标的服务
  - 为内部 HPA VPA 服务提供 Pod 资源指标
  - 使用极少的资源 - 0.5m CPU, 4 MB 每节点
- [kubernetes-monitoring/kubernetes-mixin](https://github.com/kubernetes-monitoring/kubernetes-mixin)
  - Grafana dashboards and Prometheus alerts for Kubernetes.
- [kubernetes/kube-state-metrics](https://github.com/kubernetes/kube-state-metrics)
  - Add-on agent to generate and expose cluster-level metrics.
- cadvisor 提供了容器指标
  - https://github.com/google/cadvisor/blob/master/docs/storage/prometheus.md
- https://runbooks.prometheus-operator.dev/

## kubernetes_sd_config

- [kubernetes_sd_config](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#kubernetes_sd_config)
- 示例配置 [prometheus-kubernetes.yml](https://github.com/prometheus/prometheus/blob/master/documentation/examples/prometheus-kubernetes.yml)
- 支持
  - node
  - service
  - pod
  - endpoints
  - ingres

## prometheus-operator

- [prometheus-operator/prometheus-operator](https://github.com/prometheus-operator/prometheus-operator)
- 功能
  - 通过 CRD 来部署管理 Prometheus，Alertmanager 等组件
  - 简化配置 - versions, persistence, retention policies, replicas
  - Prometheus Target 配置 - 自动监控目标配置 - 通过 annotation 发现
- 之前是 coreos/prometheus-operator，自 0.41 开始去 coreos，移到独立组织 prometheus-operator 下
- CRD
  - Prometheus - 部署 Prometheus
  - Alertmanager - 部署 Alertmanager
  - ThanosRuler - 部署 thano rule
  - ServiceMonitor - 配置 service 监控
  - PodMonitor - 配置 pod 监控
  - Probe - 配置静态监控目标
    - blackbox_exporter
  - PrometheusRule - 配置 告警/记录 规则
- 监控外部可使用 Service/externalName + ServiceMonitor 或使用 additionalScrapeConfigs 静态配置
- 参考
  - [API](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/api.md)

```bash
kubectl api-resources --api-group monitoring.coreos.com
```

```yaml
---
# 定义部署 Prometheus
kind: Prometheus
apiVersion: monitoring.coreos.com/v1
metadata:
  name: kube-prometheus-prometheus
  namespace: monitoring
spec:
  # 额外的抓取配置
  additionalScrapeConfigs:
    name: additional-scrape-configs
    key: prometheus-additional.yaml
  affinity: {} # 节点亲和
  alerting:
    alertmanagers:
      - name: kube-prometheus-alertmanager
        namespace: monitoring
        pathPrefix: /
        port: http
  enableAdminAPI: false
  # 添加额外标签 - 多集群/租户 可用于标记
  externalLabels:
    cluster: wener
  externalUrl: 'http://kube-prometheus-prometheus.monitoring:9090/'
  image: 'docker.io/bitnami/prometheus:2.20.1-debian-10-r12'
  listenLocal: false
  logFormat: logfmt
  logLevel: info
  paused: false
  podMetadata:
    labels:
      app.kubernetes.io/component: prometheus
      app.kubernetes.io/instance: kube-prometheus
      app.kubernetes.io/name: kube-prometheus
  podMonitorNamespaceSelector: {}
  podMonitorSelector: {}
  probeNamespaceSelector: {}
  probeSelector: {}
  # 远程写 - 配置类似于 prometheus 的 remote_write
  remoteWrite:
    - name: my-remote
      remoteTimeout: 120s
      url: 'https://receive.example.com/api/v1/receive'
      # proxyUrl: ''
      # tlsConfig: {}
      # writeRelabelConfigs: {}

      # basic auth 的 secret
      basicAuth:
        password:
          key: password
          name: prometheus-basic-auth
          optional: false
        username:
          key: username
          name: prometheus-basic-auth
          optional: false
      # 队列配置 - 调优时使用
      queueConfig:
        # 默认 5s
        batchSendDeadline: 10s
        # 默认 500
        capacity: 2500

        # 目前 promethues 是没有实现的
        maxRetries: 0
        # 默认 100
        maxSamplesPerSend: 5000
        maxShards: 1000
        minShards: 1

        minBackoff: 30ms
        maxBackoff: 100ms
  remoteRead: []
  replicas: 1
  resources: {}
  retention: 10d
  retentionSize: 6GB
  routePrefix: /
  ruleNamespaceSelector: {}
  ruleSelector: {}
  securityContext:
    fsGroup: 1001
    runAsUser: 1001
  serviceAccountName: kube-prometheus-prometheus
  serviceMonitorNamespaceSelector: {}
  serviceMonitorSelector: {}
  # Prometheus 本地存储
  storage:
    volumeClaimTemplate:
      spec:
        accessModes:
          - ReadWriteOnce
        resources:
          requests:
            storage: 8Gi
        storageClassName: local-path
```

**additionalScrapeConfigs**

```yaml
- job_name: 'prometheus'
  static_configs:
    - targets: ['localhost:9090']
```

## kube-prometheus

- 通过 jsonet 定制化和安装
- [prometheus-operator/kube-prometheus](https://github.com/prometheus-operator/kube-prometheus)
  - 组件
    - Prometheus Operator
    - HA Prometheus
    - HA Alertmanager
    - node-exporter
    - Kubernetes Metrics APIs Prometheus Adapter
    - kube-state-metrics
    - Grafana

## stable/prometheus-operator

- helm [stable/prometheus-operator](https://github.com/helm/charts/tree/master/stable/prometheus-operator)
- 类似于 kube-prometheus，但通过 helm 安装
- 更新维护较慢
  - 目前还是基于 coreos/prometheus-operator 0.38
- 内容
  - stable/kube-state-metrics
  - stable/prometheus-node-exporter
  - stable/grafana
  - prometheus-operator
  - prometheus
  - alertmanager
  - node-exporter
  - kube-state-metrics
  - service monitors
    - 监控 kube 组件
    - kube-apiserver、kube-scheduler、kube-controller-manager、etcd、kube-dns/coredns、kube-proxy
  - 会配置 dashboards 和 alters
- 默认导入 [kubernetes-monitoring/kubernetes-mixin](https://github.com/kubernetes-monitoring/kubernetes-mixin) 图表
- 与 stable/prometheus 相比
  - 多了 grafana
    - 面板配置
  - 多了 kube 组件监控
  - 多了 operator 用于部署
    - Prometheus
    - Alertmanager
    - ThanosRuler
    - ServiceMonitor
    - PodMonitor
    - Probe
    - PrometheusRule

## stable/prometheus

- 单纯部署 prometheus
- 包含
  - alertmanager
  - node-exporter
  - pushgateway
  - configmap-reload - https://github.com/jimmidyson/configmap-reload
  - kube-state-metrics
- Pod 注解
  - prometheus.io/scrape: "true"
  - prometheus.io/path: /metrics
  - prometheus.io/port: "8080"
- prometheus 默认 `--storage.tsdb.retention.time` 15d

```yaml
server:
  persistentVolume:
    enabled: false
  global:
    scrape_interval: 10s

alertmanager:
  enabled: false
pushgateway:
  enabled: false
```

## bitnami/kube-prometheus

- https://github.com/bitnami/charts/tree/master/bitnami/kube-prometheus
- 包含
  - Prometheus Operator
  - Prometheus
    - 会通过 Operator 部署
  - Alertmanager
  - kube-state-metrics
  - node-exporter
- 默认 scrapeInterval: 30s

```bash
# 国内无法访问该 Repo，可使用 https://charts.wener.tech 或 https://wenerme.github.io/charts
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install kube-prometheus -n monitoring bitnami/kube-prometheus

kubectl -n monitoring describe svc/kube-prometheus-prometheus

# http://127.0.0.1:9090
kubectl -n monitoring port-forward svc/kube-prometheus-prometheus 9090
```

# FAQ

## "prometheuses.monitoring.coreos.com" is invalid: metadata.annotations: Too long
