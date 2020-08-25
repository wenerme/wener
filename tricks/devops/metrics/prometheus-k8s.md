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
