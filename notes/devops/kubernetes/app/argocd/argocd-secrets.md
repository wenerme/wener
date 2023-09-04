---
title: Secrets
---

# Secrets

:::tip

- [Sealed Secrets](../sealed-secrets.md) 最简单，但有时候用不了
  - 例如 secret 写在 value.yaml 的时候
- 建议配合 [age](../../../../security/age.md), [SOPS](../../../../security/sops.md)

:::

- [Bitnami Sealed Secrets](../sealed-secrets.md)
- [External Secrets Operator](https://github.com/external-secrets/external-secrets)
- 中心
  - [Hashicorp Vault](https://www.vaultproject.io)
  - [lyft/confidant](https://github.com/lyft/confidant)
    - DynamoDB 存储
- [Banzai Cloud Bank-Vaults](https://github.com/banzaicloud/bank-vaults)
- [Helm Secrets](https://github.com/jkroepke/helm-secrets)
  - https://github.com/jkroepke/helm-secrets/wiki/ArgoCD-Integration
- [Kustomize secret generator plugins](https://github.com/kubernetes-sigs/kustomize/blob/fd7a353df6cece4629b8e8ad56b71e30636f38fc/examples/kvSourceGoPlugin.md#secret-values-from-anywhere)
- [isindir/sops-secrets-operator](https://github.com/isindir/sops-secrets-operator/)
- [aws-secret-operator](https://github.com/mumoshu/aws-secret-operator)
- [KSOPS](https://github.com/viaduct-ai/kustomize-sops#argo-cd-integration)
- [argocd-vault-plugin](./argocd-vault-plugin.md)
- [Kubernetes Secrets Store CSI Driver](https://github.com/kubernetes-sigs/secrets-store-csi-driver)
- 参考
  - [#1364](https://github.com/argoproj/argo-cd/issues/1364)
  - https://argo-cd.readthedocs.io/en/stable/operator-manual/secret-management/
