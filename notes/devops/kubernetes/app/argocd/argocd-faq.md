---
tags:
  - FAQ
---

# ArgoCD FAQ

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
