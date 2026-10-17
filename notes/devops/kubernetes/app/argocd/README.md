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

- [Sync Options](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/)
- 应用级：配置在 `Application.spec.syncPolicy.syncOptions`，作为该应用同步策略。
- 资源级：配置在目标资源的 `metadata.annotations`，仅影响这个资源；支持的选项见下表，不是所有应用级选项都支持 annotation。
  - 多个选项用逗号分隔，首尾空白会被去除。
  - 写在 Application 自身的 annotation 上，控制的是父应用如何同步这个 Application 对象；控制其子资源应使用 `spec.syncPolicy.syncOptions`。

```yaml
# 目标资源，例如 Deployment、CustomResourceDefinition
metadata:
  annotations:
    argocd.argoproj.io/sync-options: ServerSideApply=true,Prune=false
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
    - RespectIgnoreDifferences=true
```

以下按官方 stable 文档整理；部署时应对照所用 Argo CD 版本的文档，尤其是 client-side apply migration。

| option | 配置位置 | 含义 |
| --- | --- | --- |
| `ServerSideApply=true` | 应用 / 资源 | 使用 Server-Side Apply；资源级 `false` 可关闭应用级 SSA |
| `Replace=true` | 应用 / 资源 | 使用 `kubectl replace/create`；优先于 SSA |
| `Force=true,Replace=true` | 资源 | 删除后重新创建，例如需要重新执行的 Job |
| `Validate=false` | 应用 / 资源 | 跳过 kubectl schema validation；不跳过 API Server 的准入和约束 |
| `SkipDryRunOnMissingResource=true` | 应用 / 资源 | 资源类型尚不存在时跳过 dry-run；已有类型仍执行 dry-run |
| `ApplyOutOfSyncOnly=true` | 应用 | 只 apply OutOfSync 资源，减少 API Server 压力 |
| `Prune=false` | 应用 / 资源 | 同步时保留已从 Git 移除的资源；可能继续显示 OutOfSync |
| `Prune=confirm` | 应用 / 资源 | prune 前要求人工确认 |
| `PruneLast=true` | 应用 / 资源 | 在其他 wave 成功且资源健康后，最后执行 prune |
| `PrunePropagationPolicy=foreground` | 应用 | prune 的级联删除策略；默认 `foreground`，也支持 `background`、`orphan` |
| `Delete=false` | 应用 / 资源 | 删除 Application 时保留资源，例如 PVC |
| `Delete=confirm` | 应用 / 资源 | 删除 Application 清理资源时要求人工确认 |
| `FailOnSharedResource=true` | 应用 | 发现资源已经由其他 Application 管理时同步失败 |
| `RespectIgnoreDifferences=true` | 应用 | 同步时也尊重 `spec.ignoreDifferences`，仅对已有 live 资源生效 |
| `CreateNamespace=true` | 应用 | 自动创建 `spec.destination.namespace` 指定的命名空间 |
| `ClientSideApplyMigration=false` | 应用；stable 文档 | 关闭默认启用的 client-side apply 字段所有权迁移 |
| `DisableClientSideApplyMigration=true` | 应用；3.2 文档 | 3.2 文档中关闭上述迁移的写法；按实际版本确认 |

- `Prune` 控制同步时清理 Git 已移除的资源；`Delete` 控制删除 Application 时清理资源。
  - 资源级 `Prune`、`Delete` 覆盖对应应用级默认值。
  - `confirm` 可通过 UI、CLI 或 Application 的 `argocd.argoproj.io/deletion-approved` annotation 批准，值为 ISO 格式时间戳。
- `SkipDryRunOnMissingResource=true` 不会创建 CRD；如果 CRD 已包含在同次同步中，Argo CD 会自动跳过对应 CR 的 dry-run。
- `CreateNamespace=true` 只创建目标 namespace，不会自动创建清单中出现的所有 namespace。
  - `spec.syncPolicy.managedNamespaceMetadata` 可配置目标 namespace 的 labels / annotations，需要配合 `CreateNamespace=true`。
  - 清单中显式声明的同名 Namespace 优先于 `managedNamespaceMetadata`。
- `ignoreDifferences` 默认只影响 diff；需要 `RespectIgnoreDifferences=true` 才在同步时也保留被忽略的 live 字段。

### ServerSideApply

```yaml
# 单个资源启用 SSA
metadata:
  annotations:
    argocd.argoproj.io/sync-options: ServerSideApply=true
```

```yaml
# Application 的所有资源默认启用 SSA
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: example
  namespace: argocd
spec:
  # source、destination、project 等按应用填写
  syncPolicy:
    syncOptions:
      - ServerSideApply=true
```

- 默认 Client-Side Apply 在客户端计算变更，使用 `kubectl.kubernetes.io/last-applied-configuration` 保存上次提交的配置。
- Server-Side Apply 由 Kubernetes API Server 合并声明式字段，以 `metadata.managedFields` 记录 field manager 和字段所有权。
  - 常见用途：较大的 CRD、annotation 总大小超过 262144 bytes、只声明已有对象的一部分字段。
  - SSA 不依赖 last-applied annotation；对象大小、schema、不可变字段和准入约束仍然有效。
  - 使用不满足完整 schema 的部分清单时，官方示例配合 `Validate=false`；目标对象应已存在。
- 当前 stable 文档描述的同步命令为 `kubectl apply --server-side --force-conflicts`。
  - 冲突字段可被 Argo CD 接管；与 operator、HPA 等共同管理对象时，应明确字段边界，必要时配置 `ignoreDifferences` 和 `RespectIgnoreDifferences=true`。
  - `--force-conflicts` 处理字段所有权冲突；`Force=true,Replace=true` 执行删除重建，二者含义不同。
- 应用级启用后，单个资源可以用 `ServerSideApply=false` 退出。
- Client-side apply migration 默认开启；关闭选项的名称及迁移过程按版本确认。
  - 可用 Application annotation `argocd.argoproj.io/client-side-apply-migration-manager` 指定迁移来源的 field manager。
  - [Argo CD 3.2 Sync Options](https://argo-cd.readthedocs.io/en/release-3.2/user-guide/sync-options/#client-side-apply-migration)
- [Kubernetes Server-Side Apply](https://kubernetes.io/docs/reference/using-api/server-side-apply/)

:::caution

`Replace=true` 优先于 `ServerSideApply=true`。Replace 可能导致资源重建；`Force=true,Replace=true` 明确删除后重建，可能引起服务中断。

:::

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
  config: '' # JSON
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
