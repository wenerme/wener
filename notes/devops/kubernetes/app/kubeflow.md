---
title: Kubeflow
tags:
  - DevOps
  - Kubernetes
  - MachineLearning
  - Kubeflow
---

# Kubeflow

- [kubeflow/kubeflow](https://github.com/kubeflow/kubeflow)
  - Apache-2.0, Go, TypeScript, Python, Kubernetes, MLOps
  - Kubernetes-native AI/ML platform toolkit；不是单个产品，而是一组可组合项目。
- [kubeflow/manifests](https://github.com/kubeflow/manifests)
  - Apache-2.0, YAML, Kustomize
  - Kubeflow AI Reference Platform 的社区维护部署清单。
- 参考
  - [Introduction](https://www.kubeflow.org/docs/started/introduction/)
  - [Architecture](https://www.kubeflow.org/docs/started/architecture/)
  - [Kubeflow Projects](https://www.kubeflow.org/docs/components/)
  - [Installing Kubeflow](https://www.kubeflow.org/docs/started/installing-kubeflow/)

## TL;DR

- Kubeflow = 在 Kubernetes 上构建 AI Platform 的基础工具集合。
- 两种使用方式：
  - 只安装需要的 project：Pipelines、Katib、Trainer、Notebooks、KServe 等。
  - 安装完整 Kubeflow AI Reference Platform：Central Dashboard + 多个 Kubeflow projects + common services。
- 更适合平台团队搭建内部 ML/AI 平台；如果只需要 experiment tracking/model registry，可能 MLflow 更轻。
- 生产不要直接使用默认 Dex 用户密码；不要把 `manifests/master` 当稳定部署基线。

## AI Lifecycle

| Stage | Kubeflow Project | 用途 |
| ----- | ---------------- | ---- |
| Data Preparation | Spark Operator | Spark 数据处理、feature engineering |
| Model Development | Notebooks | Jupyter/VS Code 等交互式开发环境 |
| Model Training | Trainer | 分布式训练、LLM fine-tuning、TrainJob |
| Model Optimization | Katib | HPO / AutoML / NAS / model compression |
| Metadata / Registry | Hub | 原 Model Registry；管理 model metadata/artifact/lifecycle |
| Workflow | Pipelines | 容器化 ML workflow、pipeline DAG、artifact/metadata |
| Serving | KServe | Kubernetes 上的 serverless/model serving |
| Portal | Dashboard | Central Dashboard，聚合各组件 UI |

## Architecture

- Kubernetes 是底座：调度、隔离、扩缩容、CRD/controller、Secret、PVC、NetworkPolicy。
- Kubeflow Projects 通过 CRD + controller 暴露能力。
- AI Reference Platform 通常包含：
  - common services：Istio、cert-manager、Dex、oauth2-proxy、Knative、NetworkPolicy 等。
  - Kubeflow apps：Pipelines、Katib、Trainer、Notebooks、KServe、Dashboard、Profiles/KFAM 等。
- Central Dashboard 只是入口，不是控制平面本身。
- 每个 project 可独立演进；完整平台更像参考发行版。

## Install

```bash
# 推荐使用 stable release tag/branch，而不是 master
# 以官方 manifests 为基础部署完整 AI Reference Platform

git clone https://github.com/kubeflow/manifests.git
cd manifests
git checkout v1.11.0

# 需要默认 StorageClass、kubectl、kustomize；完整安装建议 16GiB RAM / 8 CPU
# apply 可能因 CRD 尚未 ready 第一次失败，官方建议重试
while ! kustomize build example | kubectl apply --server-side --force-conflicts -f -; do
  echo 'Retrying to apply resources'
  sleep 20
done

# 本地访问 Central Dashboard
kubectl port-forward svc/istio-ingressgateway -n istio-system 8080:80
```

默认示例安装常见登录：`user@example.com` / `12341234`，生产必须修改。

## 选型判断

- 适合
  - 已经有 Kubernetes/GPU/Storage/IAM 基础设施。
  - 需要把 Notebook、训练、调参、Pipeline、Serving 统一到一个平台。
  - 平台团队愿意维护 Istio/Dex/Kustomize/多组件升级。
- 不适合
  - 只想快速训练一个模型或跑几个 notebook。
  - 团队没有 Kubernetes 运维能力。
  - 只需要 model registry / experiment tracking，此时 MLflow、Weights & Biases、ClearML 可能更轻。

## 注意事项

- 资源需求高：完整 Reference Platform 组件多，测试集群也需要较多 CPU/内存。
- 安装复杂：CRD/controller/webhook/mesh/auth 依赖多，apply 顺序和 readiness 会影响结果。
- 认证默认值危险：Dex 默认用户密码仅适合本地试用。
- Storage 是关键：Pipelines artifact、Notebook PVC、model artifact 都依赖稳定存储。
- 多租户要同时考虑：Profile、namespace、RBAC、NetworkPolicy、Istio AuthorizationPolicy、object storage 权限。
- 升级应以 release notes + manifests release 为准；组件版本和 Kubernetes 版本要求会变化。

## FAQ

### Kubeflow 是不是必须整套安装？

不是。官方也强调 projects 可独立安装。完整 AI Reference Platform 适合试用端到端能力或作为发行版基础。

### Kubeflow 和 KServe 什么关系？

KServe 是 Kubeflow project，负责 model serving；也可以脱离完整 Kubeflow 独立部署。

### Kubeflow 和 MLflow 怎么选？

- Kubeflow 偏 Kubernetes-native AI platform，覆盖训练、调参、Pipeline、Serving、Dashboard。
- MLflow 偏实验追踪、模型管理和轻量 workflow，部署和使用成本更低。
- 两者也可以组合：Kubeflow 跑平台和计算，MLflow 做 tracking/registry。
