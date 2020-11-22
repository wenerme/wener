---
title: ArgoCD
---

# ArgoCD
* [argoproj/argo-cd](https://github.com/argoproj/argo-cd)
  * [DEMO](https://cd.apps.argoproj.io/)
* 特性
  * 自动化部署应用到指定环境
  * 支持多种配置 - Kustomize, Helm, Ksonnet, Jsonnet, plain-YAML
  * 多集群
  * SSO - OIDC, OAuth2, LDAP, SAML 2.0, GitHub, GitLab, Microsoft, LinkedIn
  * 多租户，RBAC
  * 回滚
  * 应用资源健康状态
  * 检测未同步情况
  * 自动或手动同步
  * Web UI 查看实时情况和应用活动
  * CLI 用于 CI 集成
  * Webhook - GitHub, BitBucket, GitLab
  * 用于自动化的 Access tokens
  * PreSync, Sync, PostSync 钩子支持复杂应用 - blue/green & canary upgrades
  * Audit trails for application events and API calls
  * Prometheus metrics
  * Parameter overrides for overriding ksonnet/helm parameters in Git
* 应用定义
  * Kustomize
  * Helm
  * ~~Ksonnet~~
  * A directory of YAML/JSON/Jsonnet manifests, including Jsonnet
  * 自定义配置管理工具

:::caution

* 应用名字要求全局唯一
  * 应用就是 helm 的 release 名字 - helm 不要求全局唯一，因此迁移过程可能冲突
* Kustomize 不可以后处理 Helm
  * 如果一定需要，可以考虑[插件](https://dev.to/camptocamp-ops/use-kustomize-to-post-render-helm-charts-in-argocd-2ml6)
  * 或者预先生成好

:::

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# forward to local
# https://localhost:8080
kubectl port-forward svc/argocd-server -n argocd 8080:443
# 账号 admin
# 密码
kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-server -o name | cut -d'/' -f 2

# argocd 命令行工具
brew install argocd
# 登陆
argocd login localhost:8080

# 如果配置了 ingress 需要 grpc-web 访问
# 除非开启 ssl-paththrough - nginx 开启对性能影响很大
argocd login argocd.my.lan:443 --grpc-web
```

## 应用发现
* 目前不支持，使用 app-in-app 模式
* [Cluster Bootstrapping](https://argoproj.github.io/argo-cd/operator-manual/cluster-bootstrapping/)
* [#1766](https://github.com/argoproj/argo-cd/issues/1766)
* [argoproj-labs/applicationset](https://github.com/argoproj-labs/applicationset)

## 组件
* argocd-server
  * ArgoCD API server
* argocd-application-controller
  * 持续健康运行的应用，对比状态
* argocd-repo-server
  * 管理 Git 本地缓存，管理应用清单

## 密钥管理
* [Secret Management](https://argoproj.github.io/argo-cd/operator-manual/secret-management/)

## 命令行
* https://argoproj.github.io/argo-cd/user-guide/commands/argocd/
* `~/.argocd/config`
