---
title: CDR
---

# CDR

```yaml
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: default
  namespace: argocd
spec:
  clusterResourceWhitelist:
    - group: '*'
      kind: '*'
  destinations:
    - namespace: '*'
      server: '*'
  sourceRepos:
    - '*'
  syncWindows:
    - applications:
        - '*'
      clusters:
        - '*'
      duration: 1h
      kind: allow
      manualSync: true
      namespaces:
        - '*'
      schedule: 0 0 * * *
      timeZone: Asia/Shanghai
```
