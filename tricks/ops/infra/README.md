---
id: infra
title: 基础设施
---

# 基础设施

## Tips
* 场景领域
  * 安装部署
  * 配置管理
  * 系统状态管理
  * 云平台基础设施资源管理 - Terraform
* 定义式
  * 定义期望状态
  * Agent 负责维护状态
  * 通过 diff 状态来决定要做什么操作
* 过程式
  * 执行命令，推送脚本
* 参考
  * [Infrastructure as code 工具](https://en.wikipedia.org/wiki/Infrastructure_as_code#Tools)
  * [Comparison of open-source configuration management software](https://en.wikipedia.org/wiki/Comparison_of_open-source_configuration_management_software)


# FAQ
## Terraform vs Ansible

* 都是 IaC - Infrastructure as code

* Ansible
  * 擅长部署 - 因为指令式，一次性执行，无状态
* Terraform
  * 擅长运维 - 定义状态进行维护，通过 GitOps 维护资源

---

* Terraform
  * 操作 __接口__
  * 只能是 Declarative - 定义式
  * 有状态 - 通过状态 diff 来决定要做什么
  * 无法指定条件、过滤 - 达到全量状态
* Ansible
  * 通过 __主机__ 执行
  * 可以是 Declarative 和 Imperative - 定义式或过程式
  * 无状态，在执行时判断是否已经达到期望状态再决定是否执行
  * 可以指定各种语义 - 脚本
  * 可以理解成是 Terraform 的超集，但在 Terraform 的领域还是 Terraform 做的更好
  * 可以操作 Terraform，最好配合使用
  * 可以用于生成 Terraform 脚本
