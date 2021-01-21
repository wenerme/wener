---
title: ArgoCD
---

# ArgoCD
* 是什么？
  * 声明式 K8S 持续集成/CD 服务/控制器
  * GitOps
  * 有 __直观的__ WebUI 可供管理和问题排查
  * 支持多集群、统一登录、权限管理
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
  * A directory of YAML/JSON/Jsonnet manifests, including Jsonnet
  * 自定义配置管理工具
  * ~~Ksonnet~~

:::caution

* 应用名字要求全局唯一
  * 应用就是 helm 的 release 名字 - helm 不要求全局唯一，因此迁移过程可能冲突
* Kustomize 不可以后处理 Helm
  * 如果一定需要，可以考虑[插件](https://dev.to/camptocamp-ops/use-kustomize-to-post-render-helm-charts-in-argocd-2ml6)
  * 或者预先生成好
* 使用稳定的 Git 服务
  * 避免使用 Gitlab, Github - 因为访问不稳定会导致 argocd 很慢或者同步状态不可知
  * 可以考虑集群内部署 gitea 然后镜像外部仓库 - 配置好 Webhook 触发可实现秒级同步

:::

```bash
# 安装
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
# HA
# kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/ha/install.yaml

# 转发到本地直接访问
# https://localhost:8080
kubectl port-forward svc/argocd-server -n argocd 8443:443
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
* 问题根源
  * 因为 GitOps 要求所有内容都在仓库，因此密钥也需要存储在仓库
  * 出于安全考虑不能直接放明文的 Secret，因此需要曲线提供 Secret
  * 部分要求在 helm values.yaml 提供密钥的还需要先生成 chart 然后修改为另外的方式提供密钥
* 方案
  * [bitnami-labs/sealed-secrets](https://github.com/bitnami-labs/sealed-secrets)
    * 生成不可逆的密钥存储在仓库，控制器生成对应 Secret - 非对称加密
    * 最简单实用
* 参考
  * [Secret Management](https://argoproj.github.io/argo-cd/operator-manual/secret-management/)

## 命令行
* https://argoproj.github.io/argo-cd/user-guide/commands/argocd/
* `~/.argocd/config`

# 版本

## 1.8
* mono-repository 处理效率增强
  * 相同 commit 并行处理 - 之前是每个都要处理一遍
* `argocd.argoproj.io/manifest-generate-paths`
* argocd-application-controller 组件支持水平扩容
  * 更好管理多集群
  * depolyment -> statuefulset
* 子应用健康状态不影响父应用
* 全局 Project
* [v1.7 to 1.8](https://argoproj.github.io/argo-cd/operator-manual/upgrading/1.7-1.8/)
