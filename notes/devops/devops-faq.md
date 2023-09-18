---
title: DevOps 常见问题
tags:
  - FAQ
---

# DevOps 常见问题


## DevOps vs OPS

| -    | DevOps                           | OPS                        |
| ---- | -------------------------------- | -------------------------- |
| 范围 | 覆盖开发、测试、运维等全生命周期 | 负责系统运营与维护         |
| 目标 | 注重提升交付速度与质量           | 注重保持系统稳定可靠       |
| 方法 | 强调自动化、监控和协作           | 依赖以手工和经验为主的运维 |
| 团队 | 需要开发、测试、运维多方协作     | 侧重运维人员自身的技能     |
| 理念 | 属于一种新的理念和文化           | 是一项实践性较强的工作     |
|      | 交付新的功能和特性               | 维持稳定不变               |

- OPS - IT Operations
- DevOps - development and operations working together
- 参考
  - https://www.amazon.com/Phoenix-Project-DevOps-Helping-Business/dp/0988262592

## 版本老就意味着安全稳定？

- [Upgrade](./upgrade.md)

## Kubernetes vs Docker Swarm

> 结论: 选择 Kubernetes 或者 K3S

- Docker Swarm
  - 劣势
    - 开发维护不活跃
    - 网络模块弱
  - 基本被淘汰
  - 简单易用
- Kubernetes
  - 大规模部署使用
  - 功能完善各方面支持好
  - 较多发布版可选择
  - 劣势
    - 占用资源多 - 少于 50 节点建议选择 k3s 这种轻量的发布版
    - 需要学习更多知识 - 但值得
      - 对开发来发来说压力大
    - 部署维护复杂 - k3s 一定程度上减轻了复杂度

**2018 年**

就稳定性和功能的完善性上来说, Kubernetes 是完败 Docker Swarm 的.但易用性和用户的友好度来说, Docker Swarm 是完胜的.
因此从不同的角度个和个人的身份角色来说,对这两者的评判都有所不同.

从运维人员来说, Kubernetes 肯定是更好的,但是前提是团队中得有这样的运维人员对 Kubernetes 进行支撑和维护. Kubernetes 的搭建相对来说是比较困难的,但大的团队都会有致力于维护运营 Kubernetes 集群的能力,因此 Kubernetes 对于这样的团队或公司来说是更好的选择.

而从开发人员的角度来说, Docker Swarm 能够快速搭建并且使用,虽然问题较多但是对开发人员而言绕过或修正这些问题远比运维一个 Kubernetes 来的轻松.如果一个团队中没有专门的运维人员,且无法使用到像 Azure,AWS,GKE 这样的 IaaS 服务,那么 Docker Swarm 在这时是更好的选择.

## Cloud vs Primier

- Cloud
  - 成本高
  - 过度

---

- https://world.hey.com/dhh/why-we-re-leaving-the-cloud-654b47e0

## neofetch

```bash
curl -LO https://github.com/dylanaraps/neofetch/raw/master/neofetch
chmod +x neofetch
./neofetch
```


## OnBording

- ArgoCd
  - https://icloudnative.io/posts/getting-started-with-argocd/
  - https://kubeoperator.io/docs/user_manual/argocd/

## Terraform vs Ansible

- 都是 IaC - Infrastructure as code
- Ansible
  - 擅长部署 - 因为指令式，一次性执行，无状态
- Terraform
  - 擅长运维 - 定义状态进行维护，通过 GitOps 维护资源

---

- Terraform
  - 操作 **接口**
  - 只能是 Declarative - 定义式
  - 有状态 - 通过状态 diff 来决定要做什么
    - 移除一个定义会删除一个资源
  - 无法指定条件、过滤 - 达到全量状态
- Ansible
  - 通过 **主机** 执行
  - 可以是 Declarative 和 Imperative - 定义式或过程式 - 以 过程式 为主
  - 无状态 - 在执行时判断是否已经达到期望状态再决定是否执行
    - 移除一个定义，之前运行的内容会保持 - 需要专门做一次删除操作
  - 可以指定各种语义 - 脚本
  - 可以理解成是 Terraform 的超集，但在 Terraform 的领域还是 Terraform 做的更好
  - 可以操作 Terraform，最好配合使用
  - 可以用于生成 Terraform 脚本

## Immutable Infrastructure

- https://www.hashicorp.com/resources/what-is-mutable-vs-immutable-infrastructure
- https://www.digitalocean.com/community/tutorials/what-is-immutable-infrastructure

## CPU CATERR Processor CATERR CPU CATERR Fault - Asserted

- CATERR - CATastrophic ERRor - 灾难性错误

## System Event Timestamp Clock Synch - Asserted

时间同步失败

## Microcontroller / Coprocessor Transition to Running - Asserted

IPAM 报异常事件，拔插 内存 后恢复。

- https://www.intel.com/content/dam/www/public/us/en/documents/product-briefs/platform-event-trap.pdf
- https://www.cisco.com/cisco/web/support/CN/113/1136/1136988_119038-technote-cseries-00.pdf

## 去 IOE

2008 年在阿里巴巴的 IT 架构中，去掉 IBM 的小型机、Oracle 数据库、EMC 存储设备，代之以自己在开源软件基础上开发的系统。

## Tech Stack Why

- 所有 OS 为 AlpineLinux
  - 因为 安全、小、简单
  - 因为 唯手熟尔 - 所有问题都能解决
  - 我个人是 AlpineLinux 的部分包维护者
  - 与 AlpineLiniux 官方人员也很容易沟通
  - 现有的自动化脚本是基于 Alpine 写的
  - 制作 apk 简单
- K8S 使用了 K3S
  - 目前来说 < 100 节点以前都不考虑 kubeadm
  - 因为 熟悉，能解决问题
    - K3S 里也有我提交的一点代码
  - 因为 简单、小、易于维护升级
  - K3S 使用 Embed 的 ETCD，使用 flannel 网络
  - https://wener.me/story/k3s-vs-k0s
- 节点 VPN - tinc
  - 易于运维管理 - 穿透，IP 固定
  - 更安全 - 不暴露外部端口
  - ops - tinc 的 router 模式
    - 目前主要在用
  - infra - tinc 的 switch 模式
    - 可用于桥接
    - 可用于 metallb
- SSH 所有使用 Key 登录，关闭密码登录
- OS 部署使用 Ansible
  - 确保幂等
  - 确保复现
  - 确保过程记录
  - 基础 setup 逻辑位于 https://github.com/wenerme/ansible-collection-wenerme-alpine
  - 后续 setup 同步逻辑在 ops 仓库
- CD - 部署到 K8S
  - GitOps 易于跟踪维护
  - ArgoCD
    - 使用非常友好
    - 界面功能完善
  - 目录结构参考 https://github.com/wenerme/kube-stub-cluster
- CI
  - 推荐 Gitea Actions
    - Gitea 功能完善
    - Selfhost
  - 推荐 Gitlab Runner
    - 如果已经在使用 Gitlab
  - Coding 的 Jenkins Worker
    - 好处
      - 开发人员方便看
    - 坏处
      - 每次重启需要调整 Worker 并发数量
      - 启动慢 - 因为只能在线下载安装
      - 资源占用更多 - 因为 Jenkins
  - 不推荐 Jenkins
  - 不推荐 Drone
  - 可以尝试 Woodpecker 1.0 - Drone 开源分支
- 日志存储 - OpenObserve
  - 因为简单易于维护
  - 满足需求
- 日志采集
  - 推荐 vector
  - 可以考虑 fluentbit - 插件依赖 Golang Plugin 对 musl 不友好
- 指标存储
  - 集群内 Prometheus - 存储 2-4 周
    - 如果不考虑集群内存储 Prometheus 可开启 agent 模式
  - 长期存储 VictoriaMetrics
- 指标采集 - PrometheusOperator
- 主网关为 HAProxy
  - 性能比 Nginx 更好，功能比 Nginx 更少
- 应用网关为 Apisix/Nginx
  - 简单易用
  - 运维预案控制
  - 日志采集

---

**开发**

- 主业务数据库 - PostgreSQL
  - 分布式、分片 - citus
- 缓存 - Redis
  - +性能 - keydb
- 列存 - Clickhouse
- 高性能分布式 KV - ScyllaDB

## K8S Stack Why

- GitOps
  - 有跟踪、有记录
  - 可协作
  - 复现 - 重复部署
- [argocd](../devops/kubernetes/app/argocd/README.md) GitOps
  - 界面友好
  - 功能完善
- argocd-image-updater
  - 自动更新镜像
  - 基于 git branch 自动发布
- [sealed-secret](../devops/kubernetes/app/sealed-secrets.md)
  - GitOps 提交 secret 到仓库
- [kubed](../devops/kubernetes/app/kubed.md)
  - 同步 secret/configmap 资源到不同 namespace
  - DRY
- [reloader](../devops/kubernetes/app/reloader.md)
  - 修改 secret/configmap 后 restart pod
  - 减少手动操作
  - 避免遗忘重启导致配置不生效
  - GitOps 可以直接修改 secret/configmap 线上服务也能生效
- cert-manager
  - ACME
  - 证书管理
- haproxy-ingress
  - 作为主要 Ingress
  - 性能好、资源占用低
  - L7 功能少
- apisix
  - L7 网关
  - 基于 Nginx
  - 功能多、有简单界面
- vector
  - 日志采集
  - 功能完善、DSL 强大
- kube-prometheus
  - 指标采集存储
