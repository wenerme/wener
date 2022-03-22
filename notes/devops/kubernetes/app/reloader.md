---
title: Reloader
---

# Reloader

- [stakater/Reloader](https://github.com/stakater/Reloader)
  - ConfigMap, Secret -> DeploymentConfig, Deployment, Daemonset, Statefulset, Rollout

```yaml
kind: Deployment
metadata:
  name: foo
  annotations:
    # 匹配  foo-configmap, foo-secret
    reloader.stakater.com/auto: 'true'
    # 限定匹配目标
    reloader.stakater.com/search: 'true'
    # 自定义 选择
    configmap.reloader.stakater.com/reload: 'foo-configmap,bar-configmap'
    secret.reloader.stakater.com/reload: 'foo-secret'
---
kind: ConfigMap
metadata:
  annotations:
    # 对应 reloader.stakater.com/search: "true"
    reloader.stakater.com/match: 'true'
```
