---
title: 运维常见问题
tags:
  - FAQ
---

# 运维常见问题

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

## Why

- 所有 OS 为 AlpineLinux
  - 因为 安全、小、简单
  - 因为 唯手熟尔 - 所有问题都能解决
  - 我个人是 AlpineLinux 的部分包维护者
  - 与 AlpineLiniux 官方人员也很容易沟通
- K8S 使用了 K3S
  - 目前来说 < 100 节点以前都不考虑 kubeadm
  - 因为 熟悉，能解决问题
    - K3S 里也有我提交的一点代码
  - 因为 简单、小、易于维护升级
  - https://wener.me/story/k3s-vs-k0s
  - K3S 使用 Embed 的 ETCD，使用 flannel 网络
- 节点 VPN
  - 易于运维管理 - 穿透，IP 固定
  - 更安全 - 不暴露外部端口
  - ops - tinc 的 router 模式
    - 目前主要在用
  - infra - tinc 的 switch 模式
- SSH 所有使用 Key 登录，关闭密码登录
- OS 部署使用 Ansible
  - 确保幂等
  - 确保复现
  - 确保过程记录
  - 基础 setup 逻辑位于 https://github.com/wenerme/ansible-collection-wenerme-alpine
  - 后续 setup 同步逻辑在 ops 仓库
- CD - 使用 ArgoCD 部署 K8S 资源
  - GitOps 易于跟踪维护
  - ArgoCD 使用非常友好
  - 目录结构参考 https://github.com/wenerme/kube-stub-cluster
- CI
  - 目前使用 Coding 的 Jenkins Worker
    - 好处
      - 开发人员方便看
    - 坏处
      - 每次重启需要调整 Worker 并发数量
      - 启动慢 - 因为只能在线下载安装
      - 资源占用更多 - 因为 Jenkins
  - 可以考虑使用 Gitea Actions
    - 目前已有在使用 Gitea 作为镜像仓库，因为 Coding 的镜像仓库有兼容问题
    - 如果未来 Coding 的成本过高可以考虑迁移
- 日志采集 - OpenObserve
  - 因为简单易于维护
  - 满足需求
- 主网关为 HAProxy
  - 性能比 Nginx 更好，功能比 Nginx 更少
- 应用网关为 Apisix
  - 简单易用
  - 运维预案控制
  - 日志采集
