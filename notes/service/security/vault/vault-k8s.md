---
title: Vault on Kubernetes
sidebar_title: Vault on K8S
---

# Vault on Kubernetes

- [Vault on Kubernetes](https://www.vaultproject.io/docs/platform/k8s)
  - HA Vault 服务
  - 读写 Secret
  - Encryption as a Service
  - Audit Logs for Vault
- [Boostport/kubernetes-vault](https://github.com/Boostport/kubernetes-vault)
  - allows pods to automatically receive a Vault token using Vault's AppRole auth backend.

## Best practices

- [Best practices for running Kubernetes-Vault in production](https://github.com/Boostport/kubernetes-vault/blob/master/best-practices.md)
- Vault 配置为使用 HTTPS
- Kubernetes-Vault 不应该使用 root token，使用一个周期性的 token
  - 支持自动 renew - 不需要更换 token
- 使用 AppRole，secret_id 只会有一次使用，每个 pod 有自己的 secret_id
  - AppRole 应该生成周期性的 token
- 限定 AppRole 访问有权限访问的密钥 - 权限可按需修改
- metrics 应该使用 httls 且尽量启用 TLS Client Authentication
- 运行多个 Kubernetes-Vault 实例
