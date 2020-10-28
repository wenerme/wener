---
slug: rancher-vs-kubesphere
title: Rancher vs. Kubesphere
hide_title: true
---

# Rancher vs. Kubesphere

| info.                 | Rancher                                               | Kubesphere                                                        |
| --------------------- | ----------------------------------------------------- | ----------------------------------------------------------------- |
| 开发者                | Rancher/SUSE                                          | 青云开源                                                          |
| 源码                  | [rancher/rancher](https://github.com/rancher/rancher) | [kubesphere/kubesphere](https://github.com/kubesphere/kubesphere) |
| Stars                 | 15.5k                                                 | 4.4k                                                              |
| 安装                  | Helm                                                  | ks-installer(Ansible)+CDR                                         |
| 部署 K8S              | rke/rancher                                           | kubekey                                                           |
| 版本                  | v2.5                                                  | v3.0                                                              |
| 监控                  | Grafana+Prometheus                                    | Prometheus+前段集成                                               |
| 告警                  | Grafana/Altermanager                                  | 邮件、企业微信、Slack                                             |
| 日志                  | Banzi Operator                                        | Elasticseach, fluentbit                                           |
| ServiceMesh           | Istio                                                 | Istio                                                             |
| DevOps                | rancher-pipeline/Jinkins/docker-registry/minio        | Jinkins                                                           |
| 应用商店              | Helm Repo                                             | [openpitrix/openpitrix](https://github.com/openpitrix/openpitrix) |
| 角色权限管理          | ✅                                                    | ✅                                                                |
| 配置方式              | Web UI                                                | 编辑 CDR/yaml                                                     |
| 应用                  | Helm                                                  | Helm/[CDR](https://github.com/kubernetes-sigs/application)        |
| 实现依赖              | -                                                     | etcd+redis+minio+openldap+mysql                                   |
| 实现服务              | rancher+fleet                                         | ks-controller-manager+ks-apiserver+ks-console                     |
| 多集群                | ⭐️⭐️⭐️                                             | ⭐️                                                               |
| UI 美观               | ⭐️⭐️                                                | ⭐️⭐️⭐️                                                         |
| UI 功能               | ⭐️⭐️⭐️                                             | ⭐️⭐️                                                            |
| 云平台集成            | ⭐️⭐️⭐️                                             | ❌                                                                |
| 文档                  | ⭐️⭐️                                                | ⭐️                                                               |
| 开发友好              | ⭐️                                                   | ⭐️⭐️⭐️                                                         |
| 运维友好              | ⭐️⭐️⭐️                                             | ⭐️                                                               |
| 使用者对 K8S 掌握程度 | 高                                                    | 低                                                                |
| 核心体验              | 多集群运维部署管理                                    | 友好的一体化开发管理                                              |

<!-- more -->

:::tips

- 选择 Kubesphere
  - 如果犹豫 - 因为使用简单
  - 如果追求界面美观
  - 如果工作以开发为主
  - 如果希望定制化产出自己平台管理
- 选择 Rancher
  - 如果对 Kubernetes 掌握透彻
  - 如果需要管理多集群
  - 如果工作以运维部署为主
  - 如果需要整合云平台资源

:::


综合使用下来后觉得 Kubesphere 与 Rancher 应用场景并不特别重复，按自己的需求选择即可，实际情况可能是两个都用。Ranher 用于管理和开通集群，Kubesphere 用于给开发者操作单个集群。

## Rancher

### 优点

- 更大的开发团队
- 更好的 K3S 支持
- 更好的云平台支持
- 更好的多集群管理
- 默认 HTTPS
- 为什么更好？
  - 2.5 的 Exploere
  - WebShell 会显示 Helm 安装过程
  - 内置 Helm 仓库包含 Rancher 集成应用
  - Helm Values 能被映射为 Form 表单
  - 集群备份恢复
  - Fleet GitOps

### 缺点
- 要求使用人员对 Kubernetes 有一定认识和运维能力
- 2.5 还在 latest 阶段，尚未进入 stable - 应该快了
- 2.5 的 Exploere 还没有中文，不过已有多语言支持
- WebUI 使用起来总有种卡顿的感觉
- 2.5 的新 UI 目前加载总会闪烁 - Loadding

## Kubesphere

### 优势

- 界面友好美观
- 集成监控
- 集成日志
- 集成DevOps
- 集成应用一体化体验 - 不需要去 Grafana 看监控，不需要去 Kibana 看日志
- 面向内部的应用商店比 Helm Repo 在实际开发时更有实际意义

### 缺陷

- **不支持 k8s v1.19** - 在 v1.19 已经发布两个月后
  - csr v1
- 通过编辑 CDR 启动功能
  - 不知道状态和错误 - 只能看日志
- Ansible 控制功能
  - 开启容易，关闭难
  - Ansible 本身无状态，没有 Helm 的卸载概念
- 列表不能设置每页数量
- 翻页不便操作
- 包含青云集成功能

## More Than Kubernetes Dashboard/Lens

Kubernetes Dashboard 和 Lens 都是非常简介明了的集群管理工具，Lens 甚至也能支持多集群。Kubernetes Dashboard 占用异常少的资源提供集群资源的 CRUD，资源可视化。

之所以选择其他的管理平台，是因为集群管理中必须的一些功能不在 Kubernetes Dashboard 和 Lens 的领域范畴。

1. 角色权限管理
1. 应用生命周期管理 - Helm 应用
1. 资源集成管理 - 使用 UI 而非 Yaml 的方式编辑资源

Rancher 和 Kubesphere 都很好的完成了这些目标。

但遗憾的是 Kubesphere 最基础的资源管理功能还没有 Lens/Kubernetes Dashboard 直观，因为追求了界面集成和美观，所以对于有 Kubernetes 的使用者来说反而觉得繁琐。

Rancher 2.5 的 集群资源浏览器 算是追赶上了 Lens/Kubernetes Dashboard 所提供的功能，但依然没有 Lens 直观。

Rancher 和 Kubesphere 都没有很好的集成 metric-server，导致没有安装特定的监控应用时无法查看资源使用情况。而监控的安装又因为平台集成方式不同，安装方式不同，即便已经存在也可能看不到监控，这一点还没有 Kubernetes Dashboard 的资源使用情况来的直观。

Rancher 和 Kubesphere 从管理上超越了 Kubernetes Dashboard/Lens，但实际体验和使用上却仍有不足。

## 开发能力集成
平台、CI/CD、代码，我认为开发相关的能力应该与代码更接近而非平台，因此对于早起 Rancher Pipeline 和现在 Kubesphere 集成的 Jinkins 的做法都不太认可。

Rancher 现在转向了 fleet，是专门用于集群资源管理的 GitOps，这是远比 Pipeline 更适合 Rancher 的方向。
看似都是资源部署，但 Kubesphere 的 DevOps 着重于从代码到镜像到应用的整个过程，而非最终的应用映射为 K8S 资源部署的过程。开发的 CI/CD 无论怎么做我相信都无法比过代码仓库直接集成。

因此 CI/CD 我会选择：

- GitHub Action
- 公有 Gitlab CI/CD
- 私有 Gitlab CI/CD
- 公有 Gitlab + Runner

且 Gitlab 本来就有 Kubernetes 集成。代码仓库集成运行时，这才是应用管理正确的方向。

# 总结
选择 Rancher 和 Kubesphere 并不冲突，两者发展方向也不尽相同。因此根据实际情况和项目需要选择即可。

# 参考
- [rancher/rancher](https://github.com/rancher/rancher)
- [kubesphere/kubesphere](https://github.com/kubesphere/kubesphere)
- [A Buyer’s Guide to Enterprise Kubernetes Management Platforms](https://info.rancher.com/hubfs/eBooks,%20reports,%20and%20whitepapers/%5BBuyers%20Guide%5D%20Rancher,%20Openshift,%20Tanzu,%20Anthos%2020200911.pdf)
  - Rancher 对自己的定位不同于 Kubesphere
