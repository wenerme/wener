---
title: ArgoCD 版本
---

# ArgoCD 版本

- 镜像 argoproj/argocd:v1.8.4
  - 可以考虑提前拉好
- 2.0 镜像 quay.io/argoproj/argocd

```bash
# 安装和升级是一样的 - 仓库的 stable tag 总是指向最新 stable 版本
# 升级注意处理好 argocd-cm
# 普通
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
# HA
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/ha/install.yaml
```

## 2.1

- 拆分 Argo CD Core
  - 不集成 RBAC 和权限
- 增加 Repo 缓存确保一个 revision 只请求一次 git - 提高性能和速度
- argocd-cm 支持引用 secret 进行配置
  - [argocd-cmd-params-cm.yaml](https://argoproj.github.io/argo-cd/operator-manual/argocd-cmd-params-cm.yaml)
- 对比忽略支持 jq 路径

```yaml
# 单个应用
spec:
  ignoreDifferences:
    - group: apps
      kind: Deployment
      jqPathExpressions:
        - .spec.template.spec.initContainers[] | select(.name == "injected-init-container")
# 全局配置
data:
  resource.customizations.ignoreDifferences.admissionregistration.k8s.io_MutatingWebhookConfiguration: |
    jqPathExpressions:
    - '.webhooks[]?.clientConfig.caBundle'
```

- 支持 Secret Repositor - 不再需要修改 argocd-cm

```yaml
apiVersion: v1
kind: Secret
metadata:
  annotations:
    managed-by: argocd.argoproj.io
  labels:
    argocd.argoproj.io/secret-type: repository
  name: my-repo-secret
stringData:
  username: my-username
  password: my-password
  type: git
  url: https://github.com/argoproj/argocd-example-apps
```

## 2.0

- Pods View
  - 新增 Pod 视图 - 可查看 Pod 分布情况
  - Pod 非常多的时候很有用
- Logs Viewer
  - 支持分页、过滤、Dark 模式
  - 支持聚合多个 Pod 日志 - Deployment、ReplicaSet、STS
  - 命令行 `rgocd app logs`
- 新增 Banner
  - ui.bannercontent
  - ui.bannerurl
- PrunePropagationPolicy=background
  - 同步时后台清除自愿 - 现在的逻辑可能导致 delet 卡死
  - Foreground - k8s 必须删除所有 child 资源才能删除资源本身
- finalizer resources-finalizer.argocd.argoproj.io:background
  - 删除应用时后台处理
- ApplyOutOfSyncOnly=true
  - 只同步不同步资源
  - 默认是 kubectl apply 所有 - 慢
- PruneLast=true
  - 在同步最后清除资源
  - 例如 最后删除配置，先清理 Pod 等资源
  - 支持独立资源配置 - argocd.argoproj.io/sync-options
- 健康检查支持
  - sealed-secrets - 之前如果 secret 错误无法发现
  - kubernetes-external-secrets
  - strimzi
- [v2.0.0](https://github.com/argoproj/argo-cd/releases/tag/v2.0.0)

## 1.8

- mono-repository 处理效率增强
  - 相同 commit 并行处理 - 之前是每个都要处理一遍
- `argocd.argoproj.io/manifest-generate-paths`
- argocd-application-controller 组件支持水平扩容
  - 更好管理多集群
  - ⚠️ depolyment -> statuefulset
    - 升级后需要手动删除 `kubectl -n argocd delete deploy argocd-application-controller`
- 子应用健康状态不影响父应用
- 全局 Project
- [v1.7 to 1.8](https://argoproj.github.io/argo-cd/operator-manual/upgrading/1.7-1.8/)
