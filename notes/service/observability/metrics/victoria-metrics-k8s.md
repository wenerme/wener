---
title: VictoriaMetrics K8S
---

# VictoriaMetrics K8S

- [VictoriaMetrics/operator](https://github.com/VictoriaMetrics/operator)
  - 管理监控配置
  - 服务部署
- [VictoriaMetrics/helm-charts](https://github.com/VictoriaMetrics/helm-charts)

## operator

**监控**

| prometheus     | vm               |
| -------------- | ---------------- |
| ServiceMonitor | VMServiceMonitor |
| PodMonitor     | VMPodMonitor     |
| PrometheusRule | VMRule           |
| Probe          | VMProbe          |

**应用**

- VMSingle
- VMCluster - 集群版 VM
- VMAgent
- VMAlert
- VMAlertmanager
- VMServiceScrape
- VMPodScrape
- VMStaticScrape
- VMAuth
  - VMUser
    - bearerToken
    - basicAuth

```yaml
---
# 部署 vmauth
apiVersion: operator.victoriametrics.com/v1beta1
kind: VMAuth
metadata:
  name: example
  namespace: default
spec:
  ingress: {}
  selectAllByDefault: true
```
