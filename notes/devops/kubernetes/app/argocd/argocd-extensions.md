---
title: ArgoCD Extensions
---

# ArgoCD Extensions

- [argoproj-labs/argocd-extensions](https://github.com/argoproj-labs/argocd-extensions)
- ghcr.io/argoproj-labs/argocd-extensions:latest

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
# base Argo CD components
#- https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/ha/install.yaml
- https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

components:
# extensions controller component
- https://github.com/argoproj-labs/argocd-extensions/manifests
```

```bash
kustomize build customize -o install.yaml
```

## Sources has not been downloaded yet, redownloading
