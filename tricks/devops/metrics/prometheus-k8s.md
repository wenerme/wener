---
id: prometheus-k8s
title: Prometheus K8S
---

# Prometheus K8S
## Tips
* [metrics-server](https://github.com/kubernetes-sigs/metrics-server)
  * https://github.com/kubernetes-sigs/metrics-server/issues/7
  * 不是用来对外提供指标的服务
  * 为内部 HPA VPA 服务提供 Pod 资源指标
  * 使用极少的资源 -  0.5m CPU, 4 MB 每节点
* [kubernetes-monitoring/kubernetes-mixin](https://github.com/kubernetes-monitoring/kubernetes-mixin)
  * Grafana dashboards and Prometheus alerts for Kubernetes.
* [kubernetes/kube-state-metrics](https://github.com/kubernetes/kube-state-metrics)
  * Add-on agent to generate and expose cluster-level metrics.

## kubernetes_sd_config
* [kubernetes_sd_config](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#kubernetes_sd_config)
* 示例配置 [prometheus-kubernetes.yml](https://github.com/prometheus/prometheus/blob/master/documentation/examples/prometheus-kubernetes.yml)
* 支持
  * node
  * service
  * pod
  * endpoints
  * ingres

## prometheus-operator
* [prometheus-operator/prometheus-operator](https://github.com/prometheus-operator/prometheus-operator)
* 功能
  * 通过 CRD 来部署管理 Prometheus，Alertmanager 等组件
  * 简化配置 - versions, persistence, retention policies, replicas 
  * Prometheus Target 配置 - 自动监控目标配置 - 通过 annotation 发现
* 之前是 coreos/prometheus-operator，自 0.41 开始去 coreos，移到独立组织 prometheus-operator 下

## kube-prometheus
* 通过 jsonet 定制化和安装
* [prometheus-operator/kube-prometheus](https://github.com/prometheus-operator/kube-prometheus)
  * 组件
    * Prometheus Operator
    * HA Prometheus
    * HA Alertmanager
    * node-exporter
    * Kubernetes Metrics APIs Prometheus Adapter
    * kube-state-metrics
    * Grafana

## stable/prometheus-operator
* helm [stable/prometheus-operator](https://github.com/helm/charts/tree/master/stable/prometheus-operator)
* 类似于 kube-prometheus，但通过 helm 安装
* 更新维护较慢
  * 目前还是基于 coreos/prometheus-operator 0.38
* 内容
  * stable/kube-state-metrics
  * stable/prometheus-node-exporter
  * stable/grafana
  * prometheus-operator
  * prometheus
  * alertmanager
  * node-exporter
  * kube-state-metrics
  * service monitors
    * 监控 kube 组件
    * kube-apiserver、kube-scheduler、kube-controller-manager、etcd、kube-dns/coredns、kube-proxy
  * 会配置 dashboards 和 alters
* 默认导入 [kubernetes-monitoring/kubernetes-mixin](https://github.com/kubernetes-monitoring/kubernetes-mixin) 图表
* 与 stable/prometheus 相比
  * 多了 grafana
    * 面板配置
  * 多了 kube 组件监控
  * 多了 operator 用于部署
    * Prometheus
    * Alertmanager
    * ThanosRuler
    * ServiceMonitor
    * PodMonitor
    * Probe
    * PrometheusRule

## stable/prometheus
* 单纯部署 prometheus
* 包含
  * alertmanager
  * node-exporter
  * pushgateway
  * configmap-reload - https://github.com/jimmidyson/configmap-reload
  * kube-state-metrics
* Pod 注解
  * prometheus.io/scrape: "true"
  * prometheus.io/path: /metrics
  * prometheus.io/port: "8080"
* prometheus 默认 `--storage.tsdb.retention.time` 15d

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
* https://github.com/bitnami/charts/tree/master/bitnami/kube-prometheus
* 包含
  * Prometheus Operator
  * Prometheus
    * 会通过 Operator 部署
  * Alertmanager
* 默认 scrapeInterval: 30s

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install kube-prometheus -n monitoring bitnami/kube-prometheus

kubectl -n monitoring describe svc/kube-prometheus-prometheus

# http://127.0.0.1:9090
kubectl -n monitoring port-forward svc/kube-prometheus-prometheus 9090
```
