---
title: ArgoCD
---

# ArgoCD

- [argoproj/argo-cd](https://github.com/argoproj/argo-cd) 是什么？
  - 声明式 K8S 持续集成/CD 服务/控制器
  - GitOps
  - 有 **直观的** WebUI 可供管理和问题排查
  - 支持多集群、统一登录、权限管理
  - [DEMO](https://cd.apps.argoproj.io/)
- 特性
  - 自动化部署应用到指定环境
  - 支持多种配置 - Kustomize, Helm, Ksonnet, Jsonnet, plain-YAML
  - 多集群
    - 无需部署 Agent
  - SSO - OIDC, OAuth2, LDAP, SAML 2.0, GitHub, GitLab, Microsoft, LinkedIn
  - 多租户，RBAC
  - 回滚
  - 应用资源健康状态
  - 检测未同步情况
  - 自动或手动同步
  - Web UI 查看实时情况和应用活动
  - CLI 用于 CI 集成
  - Webhook - GitHub, BitBucket, GitLab
  - 用于自动化的 Access tokens
  - PreSync, Sync, PostSync 钩子支持复杂应用 - blue/green & canary upgrades
  - Audit trails for application events and API calls
  - Prometheus metrics
  - Parameter overrides for overriding ksonnet/helm parameters in Git
- 应用定义
  - Kustomize
  - Helm
  - A directory of YAML/JSON/Jsonnet manifests, including Jsonnet
  - 自定义配置管理工具
  - ~~Ksonnet~~
- 缺陷
  - App of Apps 支持不好
    - issues [label:applications-set](https://github.com/argoproj/argo-cd/labels/component%3Aapplications-set)
    - 尝试解决 [argoproj-labs/applicationset](https://github.com/argoproj-labs/applicationset)
  - 多集群支持较弱 - fleedcd 相对做的更好
    - 一个 App 只能指定一个集群 [#1673](https://github.com/argoproj/argo-cd/issues/1673)
    - 无 agent, 无 crd 定义 - app of apps 只能在 argocd 所在集群
      - 因为目标集群没有 argocd 因此设置 application 无效
    - 因为相同应用要放在同一个 argocd 空间，因此需要名字前缀，例如 `dev-cert-manager`
    - 因为加了名字前缀，要注意所有的 helm 最好指定固定的 releaseName, 例如 cert-manager
      - 复写 releaseName 会有[问题](https://argoproj.github.io/argo-cd/user-guide/helm/#helm-release-name)
        - ~~argocd 依赖 `app.kubernetes.io/instance` 匹配应用~~
        - 复写可能会修改该 label 导致无法匹配部分资源
        - 可以在 `argocd-cm.yaml` 修改配置 `application.instanceLabelKey`
    - 跨集群应用无法删除资源
- 参考
  - Kustomize 后处理 Helm - - [kustomized-helm](https://github.com/argoproj/argocd-example-apps/tree/master/plugins/kustomized-helm)
    - 官方明确不会内建支持，只能通过自定义实现
    - Helm 3.1+ 支持 `--post-renderer`
    - [#3882](https://github.com/argoproj/argo-cd/issues/3882), [#3698](https://github.com/argoproj/argo-cd/issues/3698)
    - 可能存在 argocd 环境无法访问 chart 问题
  - [ApplicationSet](./argocd-applicationset.md)
  - [Image Updater](./argocd-image-updater.md)
  - [Notification](./argocd-notifications.md)
  - [Vault Plugin](./argocd-vault-plugin.md)

:::tip

- 每 3 分钟 拉取一次 Git
- hlem chart 版本支持范围匹配 - 使用 Hard Refresh 刷新会触发新的版本部署
  - 默认刷新不会触发是因为有 repo 缓存 `--repo-cache-expiration`
  - 例如 `1.1.*`, `~0.1.57`

:::

:::caution

- 应用名字要求全局唯一
  - 应用就是 helm 的 release 名字 - helm 不要求全局唯一，因此迁移过程可能冲突
- 可以修改 `application.instanceLabelKey` 配置 - 这样 helm 自定义 releaseName 才不会冲突
  - 例如修改为 `app.kubernetes.io/argocd-instance`
  - 默认与 helm 常用冲突 `app.kubernetes.io/instance`
- Kustomize 不可以后处理 Helm
  - 如果一定需要，可以考虑[插件](https://dev.to/camptocamp-ops/use-kustomize-to-post-render-helm-charts-in-argocd-2ml6)
  - 或者预先生成好
- 使用稳定的 Git 服务
  - 避免使用 Gitlab, Github - 因为访问不稳定会导致 argocd 很慢或者同步状态不可知
  - 可以考虑集群内部署 gitea 然后镜像外部仓库 - 配置好 Webhook 触发可实现秒级同步
- 直接应用 manifest 升级可能导致配置丢失 [#3537](https://github.com/argoproj/argo-cd/issues/3537)
  - 可能会覆盖 argocd-cm

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
# 密码 旧的方式为 deploy 名字
# kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-server -o name | cut -d'/' -f 2
# 新的方式会保存初始密码
# 获取密码后 建议删除 argocd-initial-admin-secret
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
kubectl -n argocd delete secret argocd-initial-admin-secret

# 可通过修改 argocd-secret admin.password 来修改密码

# argocd 命令行工具
brew install argocd
# 登陆
argocd login localhost:8080

# 如果配置了 ingress 需要 grpc-web 访问
# 除非开启 ssl-paththrough - nginx 开启对性能影响很大
argocd login argocd.my.lan:443 --grpc-web
```

## 应用发现

- 目前不支持，使用 app-in-app 模式
- [Cluster Bootstrapping](https://argoproj.github.io/argo-cd/operator-manual/cluster-bootstrapping/)
- [#1766](https://github.com/argoproj/argo-cd/issues/1766) - Application auto-discovery
- [argoproj-labs/applicationset](https://github.com/argoproj-labs/applicationset)

## 组件

- argocd-server
  - ArgoCD API server
- argocd-application-controller
  - 持续健康运行的应用，对比状态
  - sts 可部署多个
- argocd-repo-server
  - 管理 Git 本地缓存，管理应用清单

## 密钥管理

- 问题根源
  - 因为 GitOps 要求所有内容都在仓库，因此密钥也需要存储在仓库
  - 出于安全考虑不能直接放明文的 Secret，因此需要曲线提供 Secret
  - 部分要求在 helm values.yaml 提供密钥的还需要先生成 chart 然后修改为另外的方式提供密钥
- 方案
  - [bitnami-labs/sealed-secrets](https://github.com/bitnami-labs/sealed-secrets)
    - 生成不可逆的密钥存储在仓库，控制器生成对应 Secret - 非对称加密
    - 最简单实用
- 参考
  - [Secret Management](https://argoproj.github.io/argo-cd/operator-manual/secret-management/)

## 命令行

- https://argoproj.github.io/argo-cd/user-guide/commands/argocd/
- `~/.argocd/config`

## 多集群

```bash
# kubeconfig 的 test 上下文
argocd cluster add test
argocd cluster list
# 部署应用后 connectionState 才会是成功 - 默认相当于无链接
argocd cluster get 'https://192.168.1.2:6443'
```

## 项目

应用逻辑分组

- what - 限定部署内容 - 仓库
- where - 限定集群和命名空间
- what kind - API Kind
- 角色 - RBAC

## 同步选项

```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-options: Prune=false
```

```yaml
syncPolicy:
  # 自动同步
  automated:
    # 是否删除资源
    prune: true
    # 是否允许空资源
    allowEmpty: false
    # selfheal 超时后再次执行同步 - 默认 5s
    # --self-heal-timeout-seconds
    selfHeal: false
  syncOptions:
    # 只同步 out of sync 资源 - 默认全部，会对服务端带来压力
    - ApplyOutOfSyncOnly=true
    - CreateNamespace=true
```

| options                          | desc                                     |
| -------------------------------- | ---------------------------------------- |
| Prune=false                      | 不删除资源                               |
| Validate=false                   | `kubectl --validate=false` - 不校验 YAML |
| SkipDryRunOnMissingResource=true | 新增 CRD 时避免 DryRun 失败              |

## 配置

- [argocd-cm.yaml](https://argoproj.github.io/argo-cd/operator-manual/argocd-cm.yaml)
  - 基础配置
- [argocd-secret.yaml](https://argoproj.github.io/argo-cd/operator-manual/argocd-secret.yaml)
  - Password, Certificates, Signing Key
- [argocd-rbac-cm.yaml](https://argoproj.github.io/argo-cd/operator-manual/argocd-rbac-cm.yaml)
- 参考
  - [Declarative Setup](https://argoproj.github.io/argo-cd/operator-manual/declarative-setup/)

### argocd-cm

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-cm
  namespace: argocd
  labels:
    app.kubernetes.io/name: argocd-cm
    app.kubernetes.io/part-of: argocd
data:
ga.trackingid: ''
repositories: |
  # 仓库列表

# 用来匹配 Application - 如果不修改会导致 helm 自定义 releaseName 有问题
# application.instanceLabelKey: app.kubernetes.io/instance
application.resourceTrackingMethod: annotation
# 建议修改
# application.instanceLabelKey: app.kubernetes.io/argocd-instance
```

**repositories**

```yaml
# 定义 Git 仓库账号密码
- passwordSecret:
    key: password
    name: repo-12345
  usernameSecret:
    key: username
    name: repo-12345
  type: git
  url: https://gitlab.com/wener/repo.git
# 定义 Git 仓库 SSH 密钥
- insecure: true
  insecureIgnoreHostKey: true
  sshPrivateKeySecret:
    key: sshPrivateKey
    name: repo-1234
  type: git
  url: git@gitea-ssh.gitea:dev/dev-cluster
```

## ArgoCD 管理 ArgoCD

- [Manage Argo CD Using Argo CD](https://argoproj.github.io/argo-cd/operator-manual/declarative-setup/#manage-argo-cd-using-argo-cd)
- https://github.com/argoproj/argoproj-deployments/tree/master/argocd

**kustomization.yaml**

```yaml
bases:
  - github.com/argoproj/argo-cd//manifests/cluster-install?ref=v1.0.1

# additional resources like ingress rules, cluster and repository secrets.
resources:
  - clusters-secrets.yaml
  - repos-secrets.yaml

# 修改配置
patchesStrategicMerge:
  - overlays/argo-cd-cm.yaml
```

## Resource Hook

- [Resource Hooks](https://argoproj.github.io/argo-cd/user-guide/resource_hooks)
  - 选择性同步时不会执行
- PreSync
- Sync
- PostSync
- SyncFail

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  generateName: schema-migrate-
  annotations:
    # 定义 Hook 类型
    argocd.argoproj.io/hook: PreSync
    # PostSync
    # 删除策略 HookSucceeded HookFailed BeforeHookCreation
    argocd.argoproj.io/hook-delete-policy: HookSucceeded
```

## Annotations

```yaml
# 比较选项
# ==========
# 忽略额外的 - 例如部分工具生成对象
# 似乎有点问题 https://github.com/argoproj/argo-cd/issues/4487
argocd.argoproj.io/compare-options: IgnoreExtraneous

# 同步选项
# ==========
# 不删除
argocd.argoproj.io/sync-options: Prune=false
# 不校验
argocd.argoproj.io/sync-options: Validate=false
# 不校验 CRD
argocd.argoproj.io/sync-options: SkipDryRunOnMissingResource=true

argocd.argoproj.io/sync-wave: "5"
# 添加外部链接 - 类似 Ingress
link.argocd.argoproj.io/external-link: http://my-grafana.com/pre-generated-link
```

```yaml
syncPolicy:
  syncOptions:
    # 只同步不同步资源 - 选择性同步
    # 当资源非常多时适用
    - ApplyOutOfSyncOnly=true
```

## 不同步部分字段

- 例如 cert-manager 预先生成 secret 包含 labels 和 annotations, 但内容不需要同步
- 可应用纬度配置或全局配置
- [Diffing Customization¶](https://argo-cd.readthedocs.io/en/stable/user-guide/diffing/)

```yaml
# 应用 spec 配置
spec:
  ignoreDifferences:
    - group: apps
      kind: Deployment
      name: guestbook
      namespace: default
      jsonPointers:
        - /spec/replicas
```

```yaml
# argocd-cm 配置 - 全局
data:
  resource.customizations: |
    admissionregistration.k8s.io/MutatingWebhookConfiguration:
      ignoreDifferences: |
        jsonPointers:
        - /webhooks/0/clientConfig/caBundle
```

### 常见忽略 Diff

```yaml
# 如果使用 argocd 部署 argocd
# 忽略 argocd-cm 部分
- group: core
  kind: ConfigMap
  name: argocd-cm
  jsonPointers:
    - /data

# 忽略部署的 repilca 数量 - 有时候希望运维调整
- group: apps
  kind: Deployment
  jsonPointers:
    - /spec/replicas

# longhorn Volume 忽略部分会变字段
- group: longhorn.io
  kind: Volume
  jsonPointers:
    - /spec/nodeID
    - /spec/lastAttachedBy

# 忽略指定 Secret 数据
- group: core
  kind: Secret
  name: default-cert
  jsonPointers:
    - /data
```

## Sync

- The phase
- The wave they are in (lower values first)
- By kind (e.g. namespaces first)
- By name

## Tricks

```yaml
bases:
  # latest
  - github.com/argoproj/argo-cd//manifests/cluster-install
  # tag
  - github.com/argoproj/argo-cd//manifests/cluster-install?ref=v0.11.1
```

构建环境

- ARGOCD_APP_NAME
- ARGOCD_APP_NAMESPACE
- ARGOCD_APP_REVISION
- ARGOCD_APP_SOURCE_PATH
- ARGOCD_APP_SOURCE_REPO_URL
- ARGOCD_APP_SOURCE_TARGET_REVISION | master
- KUBE_VERSION
- KUBE_API_VERSIONS

## Application spec

```yaml
spec:
  destination:
    # name: 集群名字
    namespace: demo-system
    server: 'https://kubernetes.default.svc'
  project: default
  revisionHistoryLimit: 10
  ignoreDifferences:
    - group:
      kind:
      name:
      namespace:
      jqPathExpressions: []
      jsonPointers: []
  info:
    - name:
      value:
  source:
    # Git 或 Helm repo
    repoURL: 'https://github.com/wenerme/kube-stub-cluster.git'
    # Git 目录
    path: postgres-operator-ui
    # Helm repo 的 chart 名
    # chart: chart-name
    # Git 或 Helm repo 版本
    targetRevision: HEAD
    helm:
      releaseName: postgres-operator-ui
      # version: 3
      fileParameters:
        - name: name
          path: file/path.txt
      parameters:
        - name: name
          value: value
          # 是否检测 value 类型为 number 或 boolean
          forceString: false
      valueFiles:
        # 相对路径
        - values.yaml
        # 多个 values 文件
        - ../same/repo/postgres-operator-ui-values.yaml
      values: |
        # values
    kustomize:
      commonAnnotations:
      commonLabels:
      forceCommonAnnotations: false
      forceCommonLabels: false
      # 覆盖 image
      images: []
      namePrefix:
      nameSuffix:
      version:
    ksonnet:
      environment: ''
      parameters:
        - name:
          value:
          component:
    jsonnet:
      extVars:
        - name:
          value:
          code: false
      libs: []
      tlas: # Top-level Arguments
        - name:
          value:
          code: false
```

## webhook

- `http://<argocd>/api/webhook`

# FAQ

## the server could not find the requested resource

- CRD 定义不存在
- Namespace 不存在

特殊情况可以考虑跳过

```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-options: SkipDryRunOnMissingResource=true
```

## the server has asked for the client to provide credentials

有可能是 k8s 集群发生了 cert 轮换

- 在 argocd 空间找到对应集群 secret，secret 有标签 `argocd.argoproj.io/secret-type=cluster`
- 修改 secret 里的 config 字段
  - 修改 certData
  - 修改 keyData
  - 保存即可

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: cluster-name
  namespace: argocd
stringData:
  config: "" # JSON
  name:
  url:
```

```json title="config"
{
  "tlsClientConfig": {
    "insecure": false,
    "certData": "", // 修改
    "keyData": "", // 修改
    "caData": "" // 保留
  }
}
```

---

- [argoproj/argo-cd#3941](https://github.com/argoproj/argo-cd/issues/3941)

## 升级应用时可能 CRD 有变化导致校验不通过

- 先同步 CRD

## kustomize build 异常

使用与 argocd 相同版本试试

```bash
docker run --rm -it -v $PWD:/tmp -w /tmp registry.cn-hongkong.aliyuncs.com/cmi/argoproj_argocd:v2.0.1 bash
```
