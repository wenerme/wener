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
