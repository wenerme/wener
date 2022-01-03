---
id: flux
title: FluxCD
---

# Flux

- [fluxcd/flux2](https://github.com/fluxcd/flux2)
  - Flux v1 已经进入维护模式，v2 调整为了工具集模式
- 场景
  - 集群运维人员
    - 自动配置
  - 平台工程师
    - CD
  - 应用开发者
    - CD
- 特性
  - 支持 Git、Helm、S3 作为仓库
  - 支持 Kustomize、Helm
  - 时间驱动，周期触发
  - K8S RBAC 集成
  - 集群健康状态评估
  - 依赖管理 - 基础设施和工作负载
  - Webhook 外部告警
  - Webhook 外部事件处理
  - 自动更新
  - 策略驱动验证 - OPA, admission controllers
  - Git 集成 - GitHub, GitLab, Bitbucket
  - Workflow 交互 - GitHub Actions, Tekton, Argo
  - 集群接口交互 - CAPI

## Toolkits

- Source Controller
  - GitRepository CRD
  - HelmRepository CRD
  - HelmChart CRD
  - Bucket CRD
- Kustomize Controller
  - Kustomization CRD
- Helm Controller
  - HelmRelease CRD
- Notification Controller
  - Provider CRD
  - Alert CRD
  - Receiver CRD

# FAQ

## Flux vs ArgoCD

- https://thenewstack.io/gitops-on-kubernetes-deciding-between-argo-cd-and-flux/
