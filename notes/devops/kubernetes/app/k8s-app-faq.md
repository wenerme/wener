---
tags:
  - FAQ
---

# Kubernetest Application FAQ

## ArgoCD vs Flux2

| vs.           | ArgoCD    | Flux2 |
| ------------- | --------- | ----- |
| helm          | ✅        | ✅    |
| kustomization | ✅        | ✅    |
| SSO           | ✅        | ❌    |
| Multi-tenancy | ✅        | ✅    |
| Image Upgrade | 🟡        | ✅    |
| WebUI         | ⭐️⭐️⭐️ | ⭐️   |
| Ecosystem     | ⭐️⭐️⭐️ | ⭐️   |
| Maturity      | ⭐️⭐️⭐️ | ⭐️   |

> 目前(2022)优先选择 ArgoCD

## kubed vs reflector



- [kubeops/config-syncer](https://github.com/kubeops/config-syncer)
  - 原 kubed
  - Go, Apache-2.0
- [reflector](https://github.com/emberstack/kubernetes-reflector)
  - C#, MIT
