---
id: dev
title: Kubernetes 开发
---

# Kubernetes 开发

- 开发类型
  - 通过 CDR 管理自定义资源
  - 对接 API 进行展示和资源管理
  - 实现 Operator
  - 实现自定义组件
- 参考
  - [kubernetes-sigs/kubebuilder](https://github.com/kubernetes-sigs/kubebuilder)
  - [client-libraries](https://kubernetes.io/docs/reference/using-api/client-libraries)
- 在 Kubernetes 上开发
  - skaffold - Generic Source to Kubernetes
  - [google/ko](https://github.com/google/ko) - For Golang
    - source to image
    - 适用于无系统依赖无 cgo 场景
