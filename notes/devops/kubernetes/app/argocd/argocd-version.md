---
title: Argo CD 版本
tags:
  - Version
---

# Argo CD 版本

- [argoproj/argo-cd](https://github.com/argoproj/argo-cd)
  - Apache-2.0, Go, Kubernetes, GitOps, CD
  - Declarative Continuous Deployment for Kubernetes.
- Release cadence
  - minor release 每年约 4 次：2 月、5 月、8 月、11 月。
  - 只有最近 3 个 minor series 继续获得 patch release；更旧版本 EOL，不再接收 bug fix/security update。
  - 截至 2026-06，当前支持线为 `v3.4`、`v3.3`、`v3.2`；`v3.1` 已 EOL。
- 镜像
  - 1.x 常见 `argoproj/argocd:v1.8.4`
  - 2.x+ 常见 `quay.io/argoproj/argocd:<version>`
  - 建议生产使用明确 patch tag，不要直接依赖 `stable`。
- 参考
  - [Releases](https://github.com/argoproj/argo-cd/releases)
  - [Release Process And Cadence](https://argo-cd.readthedocs.io/en/latest/developer-guide/release-process-and-cadence/)
  - [Upgrading](https://argo-cd.readthedocs.io/en/stable/operator-manual/upgrading/overview/)

```bash
# 安装和升级类似；stable tag 总是指向最新 stable 版本
# 升级前先阅读对应 upgrading 文档，特别是 argocd-cm / argocd-rbac-cm / CRD / Helm / Kustomize 变化

# 普通安装
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# HA 安装
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/ha/install.yaml

# 推荐生产升级时 pin 到明确版本
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/v3.4.3/manifests/install.yaml
```

## 版本表

| version | GA date | latest patch | status | notes |
| ------- | ------- | ------------ | ------ | ----- |
| [Argo CD 3.4](#argo-cd-34) | 2026-05-05 | v3.4.3 | Supported | Teams Workflows、Application filters、Hydrator UI |
| [Argo CD 3.3](#argo-cd-33) | 2026-02-02 | v3.3.11 | Supported | Source Hydrator Git Notes、AppSet CRD SSA 注意 |
| [Argo CD 3.2](#argo-cd-32) | 2025-11-03 | v3.2.12 | Supported | Hydrator non-root path、Kustomize version in source |
| [Argo CD 3.1](#argo-cd-31) | 2025-08-04 | v3.1.16 | EOL | OCI support、SSA stabilization |
| [Argo CD 3.0](#argo-cd-30) | 2025-05-06 | v3.0.23 | EOL | v3 major；RBAC/metrics/repo config/tracking 变化 |
| [Argo CD 2.14](#argo-cd-214) | 2025-02-03 | v2.14.21 | EOL | 最后 2.x minor；Global Sync Timeout、Deletion Protection |
| [Argo CD 2.13](#argo-cd-213) | 2024-11-04 | v2.13.9 | EOL | Multi-source GA、ApplicationSet preview |
| [Argo CD 2.12](#argo-cd-212) | 2024-08-05 | v2.12.13 | EOL | Multi-source 增强 |
| [Argo CD 2.11](#argo-cd-211) | 2024-05-06 | v2.11.14 | EOL | manifest-generate-paths |
| [Argo CD 2.10](#argo-cd-210) | 2024-02-05 | v2.10.20 | EOL | Apps in Any Namespace、PKCE、OIDC |
| [Argo CD 2.9](#argo-cd-29) | 2023-11-06 | v2.9.22 | EOL | 新增扩展能力与 UI/CLI 改进 |
| [Argo CD 2.8](#argo-cd-28) | 2023-08-07 | v2.8.21 | EOL | 多源应用进入 Beta、ApplicationSet 改进 |
| [Argo CD 2.7](#argo-cd-27) | 2023-05-01 | v2.7.18 | EOL | UI/SSO/notifications 改进 |
| [Argo CD 2.6](#argo-cd-26) | 2023-02-06 | v2.6.15 | EOL | 多源应用 Alpha、插件 sidecar |
| [Argo CD 2.5](#argo-cd-25) | 2022-10-25 | v2.5.22 | EOL | Applications in any namespace Alpha |
| [Argo CD 2.4](#argo-cd-24) | 2022-06-10 | v2.4.28 | EOL | ApplicationSet 进入核心安装 |
| [Argo CD 2.3](#argo-cd-23) | 2022-03-06 | v2.3.17 | EOL | cli/appset/notifications 改进 |
| [Argo CD 2.2](#argo-cd-22) | 2021-12-14 | v2.2.16 | EOL | Applicationset、Kustomize、Helm 改进 |
| [Argo CD 2.1](#argo-cd-21) | 2021-08-20 | v2.1.16 | EOL | Project scoped repo/cluster、GnuPG |
| [Argo CD 2.0](#argo-cd-20) | 2021-04-07 | v2.0.5 | EOL | UI redesign、Lua health checks |
| [Argo CD 1.8](#argo-cd-18) | 2020-12-09 | v1.8.7 | EOL | Helm 3、Git LFS、Kustomize 3.8 |

## 维护策略

- Minor release
  - 每季度一次。
  - RC1 大约在 GA 前 7 周发布，也意味着 feature freeze。
- Patch release
  - 按需发布。
  - 只支持最近 3 个 minor series。
- Security
  - Argo CD 自身 CVE 会在支持版本中修复。
  - 依赖 CVE 通常按高危/严重且适用性评估后回补到支持版本。
- Upgrade
  - Argo CD 每个 minor 都可能升级 Helm、Kustomize、Dex、Go、Kubernetes library。
  - 升级前先检查对应 `operator-manual/upgrading/<from>-<to>/`。
  - 注意 CRD 大小、SSA/client-side apply、RBAC、repo secret、tracking method、metric rename/removal。

## Argo CD 3.4

- GA: 2026-05-05
- Latest: v3.4.3
- Support: Supported
- Highlights
  - 支持 Microsoft Teams Workflows，替代逐步退役的 Office 365 Connectors。
  - Applications list filter 改进：annotation-based filtering、operation status filter、Clear all。
  - Source Hydrator UI 改进：summary tab 展示 hydrator properties，app create panel 支持 Hydrator。
  - ApplicationSet UI/API 增强：list/filter、tree view、watch/listResourceEvents API、status health field。
  - 新增 `Prune`、`Delete` application-level sync option、`argocd account session-token`。
  - OpenTelemetry instrumentation 覆盖 authentication/handlers。
- Upgrade notes
  - Helm 3.19 改变 Kubernetes cluster version 解释方式，Argo CD 调整 cluster version format；使用 cluster generator 过滤版本时需检查表达式。
  - 默认关闭 gRPC service config DNS TXT lookup。
  - Helm、Kustomize、Dex、go-oidc、OpenTelemetry 均有升级。

## Argo CD 3.3

- GA: 2026-02-02
- Latest: v3.3.11
- Support: Supported
- Highlights
  - Source Hydrator 使用 Git Notes 跟踪 hydration state。
  - ApplicationSet CRD 体积超过 client-side apply 限制，升级自管理 Argo CD 时需要先正确应用 CRD。
  - Hydration 不再清理 Application path，避免误删生成路径以外内容。
  - 新增 Kubernetes API server-side timeout 环境变量。
  - `--self-heal-backoff-cooldown-seconds` deprecated。
  - Helm 升级到 3.19.2，Kustomize 升级到 5.8.0。
- Upgrade notes
  - 自管理 Argo CD 或手工用 Kustomize/plain manifests/Helm 升级时，先按官方升级文档处理 CRD SSA。
  - Anonymous settings API 返回字段减少。

## Argo CD 3.2

- GA: 2025-11-03
- Latest: v3.2.12
- Support: Supported
- Highlights
  - Source Hydrator 继续成熟，hydration path 必须是 non-root。
  - Argo CD 会尊重 `.argocd-source.yaml` 里的 Kustomize version。
  - 新增或改进 Server-Side Diff CLI、`get-resource` CLI、ApplicationSet pprof、Progressive Sync deletion order。
  - CronJob health 判定变化，新增多类 health checks。
  - ApplicationSet `status.resources` 限制到 5000 条，避免状态过大。
- Upgrade notes
  - 大 monorepo 需要关注 repo-server lock contention；早期 patch 版本曾提示可能需要重启 repo-server pod。
  - repo-server gRPC service 里部分字段 deprecated。

## Argo CD 3.1

- GA: 2025-08-04
- Latest: v3.1.16
- Support: EOL
- Highlights
  - OCI support：支持从 OCI registry 使用配置/manifest source。
  - Source Hydrator 支持将 dry commit SHA 与 hydrated commit SHA 关联。
  - Server-Side Apply stabilization。
  - UI parameterized action。
  - 可显式设置 Application auto-sync；`SkipDryRunOnMissingResource` 可作为 sync option。
  - Helm 升级到 3.18.4，Kustomize 升级到 5.7.0。
- Upgrade notes
  - API `--staticassets` 目录增加 symlink protection。
  - v1 Actions API deprecated。
  - OIDC authorization code flow with PKCE 由 server 处理；自定义 OIDC/CLI flow 需检查。
  - Project API response sanitization。

## Argo CD 3.0

- GA: 2025-05-06
- Latest: v3.0.23
- Support: EOL
- Highlights
  - v3 major；官方定位为 low-risk major upgrade，但包含若干安全/一致性 breaking changes。
  - 3.0 发布后不再发布新的 2.x minor，只继续给最近两个/三个 2.x minor 切 patch，直到支持窗口结束。
- Breaking / upgrade notes
  - Fine-grained RBAC：`applications update/delete` 不再自动覆盖 sub-resources；需要显式授权 `update/*`、`delete/*`。
  - Logs RBAC 成为一等 RBAC 资源；默认强制 `logs, get` 权限。
  - 默认 `resource.exclusions` 包含高频高 churn 资源，降低 API server 压力。
  - 移除旧 metrics：`argocd_app_sync_status`、`argocd_app_health_status`、`argocd_app_created_time`；改用 `argocd_app_info` label。
  - Dex SSO RBAC subject 从 Dex `sub` 调整到 `federated_claims.user_id`。
  - 移除 `argocd-cm` legacy repo config；repository/credential 应迁移到 Secret。
  - ApplicationSet `applyNestedSelectors` 被忽略，行为等价于始终启用 nested selector。
  - Helm 升级到 3.17.1；`values.yaml` 中 `null` object 行为可能变化。
  - 默认 resource tracking 从 label-based 改为 annotation-based；使用 `ApplyOutOfSyncOnly=true` 时需额外 sync 避免 orphan resource。
  - Helm OCI tag 从 `+` 改为 `_`。
  - Kaniko health check removed。

## Argo CD 2.14

- GA: 2025-02-03
- Latest: v2.14.21
- Support: EOL
- Highlights
  - 最后一个 2.x minor。
  - Global Sync Timeout for Applications。
  - Helm 升级到 3.16.2，并支持 `skipSchemaValidation` / `--skip-schema-validation`。
  - Application resource deletion protection。
  - 可对单个 resource 禁用 Server-Side Apply。
  - 可禁用写 Kubernetes Events。
  - Faster Application Refreshes。
- Upgrade notes
  - 避免使用 v2.14.0 manifests，官方升级文档建议使用 v2.14.1+。
  - 升级到 3.0 前，先在 2.14 上完成 repo secret、RBAC、resource tracking、metrics 等兼容性清理。

## Argo CD 2.13

- GA: 2024-11-04
- Latest: v2.13.9
- Support: EOL
- Highlights
  - ApplicationSet troubleshooting：CLI/服务端可预览渲染后的 Application manifests。
  - 改进 monorepo 工作流。
  - Multi-source applications out of beta。
  - Applications in any namespace 增加 regex support。
  - 大应用 reconciliation performance 改进。
  - 新增 ApplicationSet metrics，减少 resource tree 更新带来的 Redis traffic。
- Upgrade notes
  - Helm 升级；检查 chart/template 行为差异。
  - 注意从 2.12 升级时 Helm、Kustomize、Dex 等依赖变更。

## Argo CD 2.12

- GA: 2024-08-05
- Latest: v2.12.13
- Support: EOL
- Highlights
  - Multi-source applications 继续增强。
  - ApplicationSet、notifications、UI/CLI、performance 等常规改进。
- Upgrade notes
  - Helm 升级；使用 OCI/Helm repo/插件的环境需要重点验证。
  - 检查 `argocd-repo-server` plugin sidecar、Kustomize、resource tracking 相关配置。

## Argo CD 2.11

- GA: 2024-05-06
- Latest: v2.11.14
- Support: EOL
- Highlights
  - manifest-generate-paths 改进，适合 monorepo 减少不必要刷新。
  - ApplicationSet、notifications、repo-server、UI/CLI 常规增强。

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: guestbook
  namespace: argocd
  annotations:
    # resolves to the 'guestbook' directory
    # 支持相对目录、绝对目录、glob；多个路径用 ; 分隔
    argocd.argoproj.io/manifest-generate-paths: .
spec:
  source:
    repoURL: https://github.com/argoproj/argocd-example-apps.git
    targetRevision: HEAD
    path: guestbook
```

## Argo CD 2.10

- GA: 2024-02-05
- Latest: v2.10.20
- Support: EOL
- Highlights
  - ApplicationSet Templates。
  - Applications in any namespace 继续成熟：`--application-namespaces`、`argocd-cm` `application.namespaces`。
  - PKCE / OIDC / auth 相关增强。
  - Server-Side Diff 基于 Kubernetes structured-merge-diff；适合配合 Server-Side Apply 验证差异。
  - CLI、UI、ApplicationSet、diff/sync 体验改进。

## Argo CD 2.9

- GA: 2023-11-06
- Latest: v2.9.22
- Support: EOL
- Highlights
  - 扩展和 UI 能力增强。
  - ApplicationSet、notifications、diff/sync 常规增强。

## Argo CD 2.8

- GA: 2023-08-07
- Latest: v2.8.21
- Support: EOL
- Highlights
  - Multi-source applications 进入 Beta。
  - ApplicationSet、notifications、UI、SSO 相关增强。

## Argo CD 2.7

- GA: 2023-05-01
- Latest: v2.7.18
- Support: EOL
- Highlights
  - UI、SSO、notifications、ApplicationSet 常规增强。
  - 继续完善 sync/diff 和 repo-server 行为。

## Argo CD 2.6

- GA: 2023-02-06
- Latest: v2.6.15
- Support: EOL
- Highlights
  - Multi-source applications Alpha。
  - Plugin sidecar 更安全地运行 config management plugin。
  - `managedNamespaceMetadata` 可在 Argo CD 创建 namespace 时写入 labels/annotations。
  - ApplicationSet、notifications、repo-server、UI 改进。
- Notes
  - 早期 2.6.0 发布后很快有 patch release，生产应使用后续 patch。

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  namespace: test
spec:
  # 多源 - Argo CD 会合并多个 source 的渲染结果
  sources:
    - chart: elasticsearch
      repoURL: https://helm.elastic.co
      targetRevision: 7.6.0
    - repoURL: https://github.com/argoproj/argocd-example-apps.git
      path: guestbook
      targetRevision: HEAD
  syncPolicy:
    managedNamespaceMetadata:
      labels:
        any: label
        you: like
      annotations:
        the: same
        applies: for
        annotations: on-the-namespace
    syncOptions:
      - CreateNamespace=true
```

## Argo CD 2.5

- GA: 2022-10-25
- Latest: v2.5.22
- Support: EOL
- Highlights
  - Applications in any namespace Alpha。
  - UI/CLI、notifications、ApplicationSet 改进。

## Argo CD 2.4

- GA: 2022-06-10
- Latest: v2.4.28
- Support: EOL
- Highlights
  - ApplicationSet Controller 被集成到 Argo CD 核心安装中。
  - Notifications Controller 也逐步成为核心能力。
  - 新增 logs RBAC 相关配置，为 3.0 默认强制做铺垫。

## Argo CD 2.3

- GA: 2022-03-06
- Latest: v2.3.17
- Support: EOL
- Highlights
  - 内置 ApplicationSet & Notifications。
  - `RespectIgnoreDifferences=true`：同步时不修改 ignoreDifferences 指定字段。
  - `argocd admin dashboard`，本地调试 UI 更方便。
  - appset controller 支持更多 generator/template 能力。
  - notifications、sync window、repo credentials、UI 体验改进。

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: example
spec:
  ignoreDifferences:
    - group: apps
      kind: Deployment
      jsonPointers:
        - /spec/replicas
    - group: '*'
      kind: '*'
      # 可以通过 managedFieldsManagers 告诉 Argo CD 需要忽略的字段管理者
      managedFieldsManagers:
        - rollouts-controller
  syncPolicy:
    syncOptions:
      - RespectIgnoreDifferences=true
```

## Argo CD 2.2

- GA: 2021-12-14
- Latest: v2.2.16
- Support: EOL
- Highlights
  - Project scoped repositories / clusters：仓库和集群可限定到 AppProject。
  - Config Management Plugins V2：`argocd-cmp-server` 作为 repo-server sidecar 管理插件。
  - 支持使用 annotation `argocd.argoproj.io/tracking-id` 跟踪资源，减少 label `app.kubernetes.io/instance` 冲突。
  - Helm v3.7.1：pass credentials、OCI。
  - ApplicationSet、Kustomize、Helm、Jsonnet、OIDC / SSO / RBAC 改进。

```yaml
apiVersion: v1
kind: ConfigMap
data:
  # 默认 label；可设置 annotation+label 或 annotation
  application.resourceTrackingMethod: annotation
---
apiVersion: v1
kind: Secret
metadata:
  name: kube-stub-cluster-repo
  labels:
    argocd.argoproj.io/secret-type: repository
type: Opaque
stringData:
  # 限定 Project
  project: my-project1
  name: kube-stub-cluster
  url: https://github.com/wenerme/kube-stub-cluster.git
  username: ''
  password: ''
```

## Argo CD 2.1

- GA: 2021-08-20
- Latest: v2.1.16
- Support: EOL
- Highlights
  - Project scoped repositories / clusters。
  - GnuPG signature verification。
  - Application controller、repo-server、UI/CLI 改进。

## Argo CD 2.0

- GA: 2021-04-07
- Latest: v2.0.5
- Support: EOL
- Highlights
  - UI redesign。
  - Lua custom health checks。
  - Resource tracking、diff/sync、SSO 体验增强。

## Argo CD 1.8

- GA: 2020-12-09
- Latest: v1.8.7
- Support: EOL
- Highlights
  - Helm 3 支持成熟。
  - Git LFS 支持。
  - Kustomize 3.8。

## Upgrade Checklist

- 先升级到当前 minor 的最新 patch，再跨 minor。
- 先备份：`argocd-cm`、`argocd-rbac-cm`、repository Secret、cluster Secret、AppProject、Application、ApplicationSet。
- 对自管理 Argo CD，先单独 apply 新 CRD，再升级 controller/server/repo-server。
- 检查 Helm/Kustomize 升级带来的模板结果差异。
- 检查 RBAC：尤其是 3.0+ 的 `logs`、`update/*`、`delete/*`。
- 检查 metrics dashboard/alert：特别是 3.0 移除的 legacy app status metrics。
- 如果从 2.x 升到 3.x，优先完成 legacy repo config 到 Secret 的迁移。
- 如果仍使用 label-based resource tracking，评估切换 annotation tracking 后的 orphan resource 风险。

## FAQ

### 生产应该选择哪个版本？

选择最新 supported minor 的最新 patch。需要更保守时选择 supported 中较旧的一条 patch 线，例如当前可在 `v3.4.x`、`v3.3.x`、`v3.2.x` 之间取舍。

### 可以直接从 2.x 升级到 3.x 吗？

不建议跨太多 minor 直接升级。至少先升级到 2.14 最新 patch，修复配置兼容性问题，再按官方 2.14 -> 3.0 文档升级。

### 为什么旧版本仍有很新的 patch date？

Argo CD 在某些窗口内会为旧 minor backport patch/security fix，但 release policy 只保证最近 3 个 minor。查看版本时应同时看 support policy 和实际 latest patch。

### v2.14.0 可以用吗？

不建议。官方升级文档明确提示避免 v2.14.0 manifests，使用 v2.14.1 或更新 patch。
