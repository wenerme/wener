---
title: external-secrets
---

# external-secrets

- [external-secrets/external-secrets](https://github.com/external-secrets/external-secrets) 是什么？
  - ExternalSecrets CRD
  - 支持 外部 获取信息生成实际 Secret
  - 支持
    - HashiCorp Vault
    - Kubernetes - 本地或远程 Cluster
    - Alibaba Cloud
    - GitLab Variables
    - Webhook
- KMS - Key Management Service

```bash
helm repo add external-secrets https://charts.external-secrets.io

helm install external-secrets \
   external-secrets/external-secrets \
    -n external-secrets \
    --create-namespace \
  # --set installCRDs=false
```

## 阿里云

- RRSA
- https://external-secrets.io/main/provider/alibaba/
