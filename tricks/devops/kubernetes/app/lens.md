
# Lens
## Tips
* [lensapp/lens](https://github.com/lensapp/lens) - Lens - The Kubernetes IDE
* [src/features/metrics](https://github.com/lensapp/lens/tree/master/src/features/metrics)
* [src/features/user-mode](https://github.com/lensapp/lens/tree/master/src/features/user-mode)
  * ClusterRole lens-user
    * LIST namespace
    * system:authenticated
  * 允许非管理员能访问有权限访问的空间

## features/metrics
* Namespace lens-metrics
  * StatefulSet prometheus
    * prometheus
      * `--storage.tsdb.retention.time=2d`
      * `--storage.tsdb.retention.size=5GB`
    * ServiceAccount prometheus
    * Service prometheus
      * 80 -> 9090
      * prometheus.io/scrape: 'true'
    * ConfigMap prometheus-config
      * prometheus.yaml
    * ConfigMap prometheus-rules
      * alertmanager.rules.yaml
      * etcd3.rules.yaml
      * general.rules.yaml
      * kube-state-metrics.rules.yaml
      * kubelet.rules.yaml
      * kubernetes.rules.yaml
      * node.rules.yaml
      * prometheus.rules.yaml
  * ClusterRole - lens-prometheus
    * ServiceAccount prometheus
  * DaemonSet - node-exporter
    * Service 80 -> 9100
  * Deployment - kube-state-metrics
* [Using Custom Prometheus](https://github.com/lensapp/lens/blob/master/troubleshooting/custom-prometheus.md)

```bash
# 可以使用 HELM 安装的 - 需要抓取时间小于 1 分钟
helm upgrade --set server.global.scrape_interval=30s prometheus stable/prometheus
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
