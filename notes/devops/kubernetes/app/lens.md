---
title: Lens
---

# Lens

- [lensapp/lens](https://github.com/lensapp/lens)
  - 2024-01-23 闭源 https://github.com/lensapp/lens/commit/e1fc8869a9e0033fb22665a990e07a6b72756630
    - 替代
      - k9s
      - kdash
      - [headlamp](https://github.com/headlamp-k8s/headlamp)
      - seabird
      - [kubenav/kubenav](https://github.com/kubenav/kubenav)
  - Lens - The Kubernetes IDE
  - by Mirantis
- [MuhammedKalkan/OpenLens](https://github.com/MuhammedKalkan/OpenLens)
  - 不要求登陆 - 从 lens 移除相关逻辑
- [extensions/metrics-cluster-feature](https://github.com/lensapp/lens/tree/master/extensions/metrics-cluster-feature)
- src/features/user-mode
  - ClusterRole lens-user
    - LIST namespace
    - system:authenticated
  - 允许非管理员能访问有权限访问的空间

:::caution

- 无法使用外部 prometheus - [#909](https://github.com/lensapp/lens/issues/909)
  - 可以用 promxy 代理现有的外部 prometheus - 在内部使用

:::

## extensions/metrics-cluster-feature

- Namespace lens-metrics
  - StatefulSet prometheus
    - prometheus
      - `--storage.tsdb.retention.time=2d`
      - `--storage.tsdb.retention.size=5GB`
    - ServiceAccount prometheus
    - Service prometheus
      - 80 -> 9090
      - prometheus.io/scrape: 'true'
    - ConfigMap prometheus-config
      - prometheus.yaml
    - ConfigMap prometheus-rules
      - alertmanager.rules.yaml
      - etcd3.rules.yaml
      - general.rules.yaml
      - kube-state-metrics.rules.yaml
      - kubelet.rules.yaml
      - kubernetes.rules.yaml
      - node.rules.yaml
      - prometheus.rules.yaml
  - ClusterRole - lens-prometheus
    - ServiceAccount prometheus
  - DaemonSet - node-exporter
    - Service 80 -> 9100
  - Deployment - kube-state-metrics
- [Using Custom Prometheus](https://github.com/lensapp/lens/blob/master/troubleshooting/custom-prometheus.md)

```bash
# 可以使用 HELM 安装的 - 需要抓取时间小于 1 分钟
helm upgrade --set server.global.scrape_interval=30s prometheus stable/prometheus
```

### kube-prometheus

- 支持需要 [relabel](https://github.com/lensapp/lens/blob/master/troubleshooting/custom-prometheus.md#kube-prometheus)
  - 该说明有问题
- 选择 helm 安装，指定 `monitoring/kube-prometheus-prometheus:9090`

:::tip

- [#180](https://github.com/lensapp/lens/issues/180) - Documentation is incorrect for Prometheus troubleshooting
- [#656](https://github.com/lensapp/lens/issues/656) - What are the requirements to make my prometheus deployment compatible with Lens?

:::

```yaml title="bitnam/kube-prometheus/values.yaml"
# Lens
# ====
node-exporter:
  serviceMonitor:
    # interval: 10s
    relabelings:
      - action: replace
        regex: (.*)
        replacement: $1
        sourceLabels:
          - __meta_kubernetes_pod_node_name
        targetLabel: kubernetes_node

kubelet:
  serviceMonitor:
    # interval: 15s
    metricRelabelings:
      - action: replace
        sourceLabels:
          - node
        targetLabel: instance

# limit & request works
kube-state-metrics:
  serviceMonitor:
    honorLabels: true
```

## features/user-mode

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: lens-user
rules:
  - verbs:
      - list
    apiGroups:
      - ''
    resources:
      - namespaces
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: lens-user
subjects:
  - kind: Group
    apiGroup: rbac.authorization.k8s.io
    name: 'system:authenticated'
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: lens-user
```
