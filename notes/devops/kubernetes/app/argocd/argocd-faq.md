---
tags:
  - FAQ
---

# ArgoCD FAQ

## WebHook

- /api/webhook
- https://argo-cd.readthedocs.io/en/stable/operator-manual/webhook/

## the server could not find the requested resource

- CDR 还不存在, 针对资源配置 SkipDryRunOnMissingResource

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt
  annotations:
    argocd.argoproj.io/sync-options: SkipDryRunOnMissingResource=true
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-account
    solvers:
      - http01:
          ingress: {}
```


## ignoreDifferences

```yaml
# https://github.com/argoproj/argo-cd/issues/3889
# APISIX CRD priority: 0
- group: apiextensions.k8s.io
  kind: CustomResourceDefinition
  jqPathExpressions:
  - ..|.priority?

# resources: {}

# 如果使用 argocd 部署 argocd
# 忽略 argocd-cm 部分
- group: core
  kind: ConfigMap
  name: argocd-cm
  jsonPointers:
    - /data

# 忽略部署的 repilca 数量 - 有时候希望运维调整
- group: apps
  kind: Deployment
  jsonPointers:
    - /spec/replicas

# longhorn Volume 忽略部分会变字段
- group: longhorn.io
  kind: Volume
  jsonPointers:
    - /spec/nodeID
    - /spec/lastAttachedBy

# 忽略指定 Secret 数据
- group: core
  kind: Secret
  name: default-cert
  jsonPointers:
    - /data
```

- `STAKATER_CONFIGMAP`
  - [stakater/Reloader](https://github.com/stakater/Reloader)
