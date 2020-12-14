---
slug: rancher-vs-kubesphere
title: Rancher vs. Kubesphere
hide_title: true
---

# Rancher vs. Kubesphere

| info.                 | Rancher                                                 | Kubesphere                                                          |
| --------------------- | ------------------------------------------------------- | ------------------------------------------------------------------- |
| 开发者                | Rancher/SUSE                                            | 青云开源                                                            |
| 源码                  | [rancher/rancher](https://github.com/rancher/rancher)   | [kubesphere/kubesphere](https://github.com/kubesphere/kubesphere)   |
| Stars                 | 15.5k                                                   | 4.6k                                                                |
| 开源协议              | Apache-2.0                                              | 控制器 Apache-2.0 <br/> 前端 **AGPL-3.0** / 不允许商业闭源修改前端  |
| 安装                  | Helm                                                    | ks-installer(Ansible)+CRD                                           |
| 部署 K8S              | rke/rancher                                             | kubekey                                                             |
| 版本                  | v2.5                                                    | v3.0                                                                |
| 监控                  | Grafana+Prometheus                                      | Prometheus+前端集成                                                 |
| 告警                  | Grafana/Altermanager                                    | 邮件、企业微信、Slack                                               |
| 日志                  | Banzi Operator                                          | Elasticseach, fluentbit + 前端集成<br/>事件日志，审计日志           |
| ServiceMesh           | Istio                                                   | Istio                                                               |
| DevOps                | 2.5 之后 Fleet GitOps<br/>~~2.5 之前 Pipeline/Jenkins~~ | Jenkins                                                             |
| 应用商店              | Helm Repo                                               | [openpitrix/openpitrix](https://github.com/openpitrix/openpitrix)   |
| 角色权限管理          | ✅                                                      | ✅                                                                  |
| 配置方式              | Web UI/CRD                                              | 编辑 CRD/yaml                                                       |
| 应用                  | Helm                                                    | Helm/[CRD](https://github.com/kubernetes-sigs/application)          |
| 实现依赖              | -                                                       | etcd+redis+minio+openldap+mysql                                     |
| 实现服务              | rancher+fleet                                           | ks-controller-manager<br/>ks-apiserver+ks-console                   |
| 多集群                | ✅                                                      | ✅                                                                  |
| UI 美观               | ⭐️⭐️                                                  | ⭐️⭐️⭐️                                                           |
| UI 功能               | ⭐️⭐️⭐️                                               | ⭐️⭐️                                                              |
| 云平台集成            | ⭐️⭐️                                                  | ❌                                                                  |
| 文档                  | ⭐️⭐️                                                  | ⭐️                                                                 |
| 开发友好              | ⭐️                                                     | ⭐️⭐️⭐️                                                           |
| 运维友好              | ⭐️⭐️⭐️                                               | ⭐️                                                                 |
| 使用者对 K8S 掌握程度 | 高                                                      | 低                                                                  |
| 核心体验              | 多集群运维部署                                          | 友好的一体化开发<br/>友好=美观的界面<br/>一体化开发=Jenkins+Elastic |
| 核心竞争力            | 多集群<br/>资源管理运维<br/>核心应用集成                | 集成多功能的**美观界面** / AGPL-3.0                                 |

<!-- more -->

:::tip

- 选择 Kubesphere
  - 如果犹豫 - 因为使用简单
  - 如果追求界面美观
  - 如果工作以开发为主
  - 如果希望定制化产出自己平台管理
    - 界面 AGPL-3.0 ,定制后的闭源商业产品需付费
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

- 要求使用人员对 Kubernetes 有一定认知和运维能力
- WebUI 使用起来总有种卡顿的感觉
- 2.5 的新 UI 目前加载总会闪烁 - Loadding
- 资源分类有点混乱 - 没有 Lens 清晰
- ~2.5 还在 latest 阶段，尚未进入 stable~
- ~2.5 的 Exploere 还没有中文，不过已有多语言支持~

## Kubesphere

### 优点

- **界面友好美观**
- 集成监控
- 集成日志
- 集成 DevOps
- 集成应用一体化体验 - 不需要去 Grafana 看监控，不需要去 Kibana 看日志
- 面向内部的应用商店比 Helm Repo 在实际开发时更有实际意义

### 缺点

- **不兼容 k8s v1.19** - 在 v1.19 已经发布两个月后
  - csr v1 [#2928](https://github.com/kubesphere/kubesphere/issues/2928)
- 通过编辑 CRD 启动功能
  - 不知道状态和错误 - 只能看日志
- Ansible 控制功能
  - 开启容易，关闭难
  - Ansible 本身无状态，没有 Helm 的卸载概念
- 列表不能设置每页数量 - 默认 10 条目/页 - 对于 K8S 资源管理来说有点少了
- 翻页不便操作
- 包含青云集成功能

## 安装维度

### Rancher

Rancher 注重管理，v2.5 没有 Pipeline 和内建的监控集成，自身非常轻量，甚至目前在尝试单二进制启动，RancherD。
Rancher 的用户，项目，集群等配置均使用 CRD，因此不需要数据库存储，使用 CRD 相当于接口，利于自动化集成。

一般通过 Helm 安装 Rancher，方便升级、管理、配置。

```bash
# stable
helm repo add rancher https://releases.rancher.com/server-charts/stable
# 配置项 https://rancher.com/docs/rancher/v2.x/en/installation/resources/chart-options
cat <<YAML > rancher.values.yaml
hostname: rancher.my.corp
# 不使用 cert-manager 则需要开启 - 建议使用 cert-manager
# privateCA: true
# rancher 系统镜像
systemDefaultRegistry: registry.cn-hangzhou.aliyuncs.com
# 默认 3 副本
replicas: 1
YAML
# 安装或升级
helm upgrade -i rancher rancher/rancher -n cattle-system --create-namespace -f rancher.values.yaml
```

### Kubesphere

Kubesphere 默认有大量集成，有点类似于 v2.5 之前的 Rancher。
功能较多，且控制器通过数据库进行存储，部署 Kubesphere 时需要部署数据库，运维层面来说会变得麻烦，因为 K8S 上数据库涉及到存储问题，除了数据库，Kubesphere 还默认依赖了 etcd+redis+minio+openldap，可以算是比较复杂的一个系统了。

实际部署配置使用 Ansible，角色定义位于 [ks-installer/roles](https://github.com/kubesphere/ks-installer/tree/master/roles)。
该部署模式优缺点明显：

- 优点
  - Ansible 部署操作幂等
  - Ansible 擅长集成部署各种服务
- 缺点
  - 失去了 K8S 的 声明式 Yaml
    - Ansible 涉及大量的模版操作，还有大量的直接 kubectl
  - 即懂 Ansible 又懂 K8S 的人占少数 - 确保能用，但想要修改或深入了解有门槛
  - Ansible 无状态 - 基本等同于 **无法删除**

Kubesphere 体系复杂，也能理解选择 Ansible，但曾经使用过 Ansible 运维 K8S，复杂后真的会很难受。

```bash
# 部署安装器 - Operator
kubectl apply -f https://raw.githubusercontent.com/kubesphere/ks-installer/v3.0.0/deploy/kubesphere-installer.yaml
# 添加 CRD 资源 - 定义 ks 安装配置
kubectl apply -f https://raw.githubusercontent.com/kubesphere/ks-installer/v3.0.0/deploy/cluster-configuration.yaml

# 安装过程
kubectl logs -n kubesphere-system $(kubectl get pod -n kubesphere-system -l app=ks-install -o jsonpath='{.items[0].metadata.name}') -f
```

## 开发维度

开发主要分为 CI 和 CD 两部分，CI 偏向代码到产出物的过程，CD 偏向产出物到线上运行的过程。

两者的核心都是流程自动化处理，但面向的对象和场景却差别很大。

- CI - 代码到产出物的过程
  - 提交代码 - 触发 Hook - 选择执行器 - 执行定义的 Pipeline
  - 依赖: 代码仓库、产出物仓库、动态调度的执行节点
  - 亮点: **快**、灵活的流程定义、可视化的执行过程、与代码仓库的集成程度
  - 产品
    - Jenkins
    - DroneCI
    - Github Action
    - Gitlab CI/CD
- CD - 产出物部署到线上的过程 - 现在的主流做法是 GitOps
  - 提交部署定义 - 触发 Hook/定时扫描修改 - 应用 yaml
  - 亮点: 可视化、多集群、自动修复
  - 产品
    - ArgoCD - 可视化依赖、可视化日志、多集群(偏弱)、健康管理
    - rancher/fleet - rancher 集成管理、多集群、才出不久尚不完善
    - fluxcd - v1 废弃维护阶段，v2 变化较大变为工具集 - 选择 fluxcd 会有点尴尬

CD 逻辑体验相对简单，但 CI 的体验却可以区别很大。
我认为私有 CI 最好的体验是 Gitlab 自行部署 Runner，其次是 DroneCI，最后才是 Jenkins。

- Gitlab CI/CD
  - 靠近代码仓库 - 开发本能
  - 支持自行部署 Runner - Docker/Shell - **快**, 可以在私有环境
  - yaml 定义 ci 处理 - 功能强大
  - Gitlab 提供了 Docker 仓库，当然 Push 的时候也可以 Push 到其他仓库
  - Gitlab 提供了开发仓库 - 相当于节省一个 Nexus
- DroneCI
  - 大体上类似 Gitlab Runner
  - 但独立于代码仓库
- Jenkins
  - 太重
  - 界面不太友好

我理解 CI 与 CD 还有一个中间临界点，应用商店或 Helm Repo，开发好的应用可以很好呈现给需要的人，需要的人可以非常便捷的部署应用到集群。

### Rancher

2.5 之前的 Pipeline 便是 Jenkins 的封装，基本等同于 Kubesphere 的 DevOps。
2.5 之后 Rancher 废弃了 Pipeline 转而默认部署 Fleet。

[rancher/fleet](https://github.com/rancher/fleet) 是面向多集群的 GitOps，与 Pipeline 完全是两个方向。rancher 注重运维，fleet 使得 rancher 的运维能力步上新的台阶。

fleet 多集群比 argocd 强

- 默认支持一个应用部署到多个集群 - 集群选择器
- 不同集群支持不同 overlay 进行定制化
- fleet agent 安装简单
- 支持集群属性 - 打标、选择

但 fleet 还有很多弱项

- 必须要资源先不存在 - 无法迁移
- 可视化较弱 - 对比 ArgoCD

如果的确是需要多集群运维，那么 fleet 的确是不二之选，如果只要场景只有一个或少数集群，建议使用 ArgoCD。

### Kubesphere

Kubesphere 包含 DevOps 模块和 Elastic 日志采集集成。
集成功能都提供了美观的界面（**界面才是 KS 的核心竞争力**），使得体验的确非常好。

DevOps 基于 Jenkins、Harbor、Mino、SonarQube 等，因此所有相关组件的问题也会变成 KS 的问题，也会发现社区有非常多关于 Jenkins、Harbod 之类的问题，我认为 Rancher 放弃基于 Jenkins 的 Pipeline 是十分正确的选择。

至于 Elastic 日志集成，我认为，如果使用外部运维的 Elastic 结合 KS 的界面是值得的，因为要在 K8S 上运维好 Elastic 这种体量的应用还是不容易。

## 运维维度

我理解的运维包含了 K8S 资源可视化、资源编辑、指标可视化、多集群支持、用户权限体系、集成应用管理能力等。

### More Than Kubernetes Dashboard/Lens

Kubernetes Dashboard 和 Lens 都是非常简洁明了的集群管理工具，Lens 甚至也能支持多集群。Kubernetes Dashboard 占用异常少的资源提供集群资源的 CRUD，资源可视化。

之所以选择其他的管理平台，是因为集群管理中必须的一些功能不在 Kubernetes Dashboard 和 Lens 的领域范畴。

1. 角色权限管理 - 多用户
1. 应用生命周期管理 - Helm 应用
1. 资源集成管理 - 使用 UI 而非 Yaml 的方式编辑资源
1. 多集群

Rancher 和 Kubesphere 都很好的完成了这些目标。

但遗憾的是 Kubesphere 最基础的资源管理功能还没有 Lens/Kubernetes Dashboard 直观，因为追求了界面集成和美观，所以对于有 Kubernetes 经验的使用者来说反而觉得繁琐。

Rancher 2.5 的 集群资源浏览器 算是追赶上了 Lens/Kubernetes Dashboard 所提供的功能，但依然没有 Lens 直观。

Rancher 和 Kubesphere 都没有很好的集成 metric-server，导致没有安装特定的监控应用时无法查看资源使用情况。
而监控的安装又因为平台集成方式不同，安装方式不同，即便已经存在也可能看不到监控，这一点还没有 Kubernetes Dashboard 的资源使用情况来的直观。

Rancher 和 Kubesphere 从管理上超越了 Kubernetes Dashboard/Lens，但实际体验和使用上却仍有不足。

### 多集群

讨论多集群时，优先明确场景

1. 大量集群 - Rancher - 以运维为主

- 应用部署
- 资源管理
- Agent 易于安装，占用资源少

1. 少量集群 - Kubesphere - 开发体验

- DevOps

因为 Kubesphere 本身资源管理能力弱于 Rancher，因此当多集群资源过多的时候只能选择 Rancher。Rancher 的资源浏览器和 Fleet 都是针对这样的场景设计的。
Rancher agent 和 fleet agent 资源占用都较少，因此大量部署时负担也不会大。

如果需要 DevOps 则可以考虑单独集群安装 Kubesphere 或者选择 Argocd、Gitlab 等对应场景的应用产品。

# 总结

选择 Rancher 和 Kubesphere 并不冲突，两者发展方向也不尽相同。因此根据实际情况和项目需要选择即可。

# 参考

- [rancher/rancher](https://github.com/rancher/rancher)
- [kubesphere/kubesphere](https://github.com/kubesphere/kubesphere)
- [A Buyer’s Guide to Enterprise Kubernetes Management Platforms](https://info.rancher.com/hubfs/eBooks,%20reports,%20and%20whitepapers/%5BBuyers%20Guide%5D%20Rancher,%20Openshift,%20Tanzu,%20Anthos%2020200911.pdf)
  - Rancher 对自己的定位不同于 Kubesphere
