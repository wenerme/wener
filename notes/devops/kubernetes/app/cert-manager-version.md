---
title: cert-manager version
tags:
  - Version
---

# cert-manager version

## 1.5

- 支持 kubernetes 1.22 - 该版本移除了 kube 移除的资源
  - ingress 默认使用 v1, 失败则尝试 v1beta1
- 废弃版本 v1alpha2, v1alpha3, v1beta1 - 1.6 移除
- cert-manager.io/v1
  - secretTemplate
    - 可为 secret 添加 annotation,labels - 方便与 kubed 配合使用
    - 移除 secretTemplate 并不会移除实际 kubed 同步出来的 secret - 由 argocd 这样的服务处理
    - 默认忽略 annotations - 可强制修改规则 `--copied-annotations=*`
      - kubectl.kubernetes.io
      - fluxcd.io
      - argocd.argoproj.io
- 实验特性
  - Gateway API
    - 使用 HTTPRoute 替代 Ingress
    - gateway-shim controller
      - 支持通过注解 Gateways 来自动获取 cert
  - CertificateSigningRequest 支持所有 issuser

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
spec:
  secretTemplate:
    annotations:
      my-secret-annotation: 'foo'
    labels:
      my-secret-label: bar
```

## 1.4

- 实验特性
  - CertificateSigningRequests
    - 目前只支持 CA Issuer
