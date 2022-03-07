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

- https://docs.victoriametrics.com/operator/api.html
- VMSingle
- VMCluster - 集群版 VM
- VMAgent
- VMAlert
- VMAlertmanager
- VMServiceScrape
- VMPodScrape
- VMStaticScrape
- VMAuth - 部署 vmauth - 通过限定 path 实现权限和租户限定
  - VMUser - 添加 vmauth 用户
    - bearerToken
    - basicAuth
  - 生成的配置位于 /opt/vmauth/config.yaml

```yaml
---
# 部署 vmauth
apiVersion: operator.victoriametrics.com/v1beta1
kind: VMAuth
metadata:
  name: example
  namespace: default
spec:
  ingress:
    class_name: nginx
    tlsHosts: []
    tlsSecretName:
    extraRules:
    extraTls:
  # false 则要求配置 userSelector, userNamespaceSelector
  selectAllByDefault: true
  # vmuser label 选择
  userSelector:
    matchLabels:
      vmauth.victoriametrics.com/instance: demo
  # ns label 选择
  userNamespaceSelector:

---
# 为 vmauth 配置 user
apiVersion: operator.victoriametrics.com/v1beta1
kind: VMUser
metadata:
  name: example
  labels:
    vmauth.victoriametrics.com/instance: demo
spec:
  username: simple-user
  password: simple-password
  passwordRef:
  generatePassword: false
  bearerToken:
  targetRefs:
  - crd:
      # VMAgent,VMAlert,VMAlertmanager,VMSingle,VMCluster/vmselect,VMCluster/vminsert,VMCluster/vmstorage
      kind: VMSingle
      name: example
      namespace: default
    paths: ["/.*"]
  - static:
      url: http://vmalert-example.default.svc:8080
    paths: ["/api/v1/groups","/api/v1/alerts"]
    target_path_suffix:
    headers:
    - X-Org-ID: xyz
```

