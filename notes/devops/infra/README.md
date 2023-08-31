---
id: infra
title: 基础设施
---

# 基础设施

- 场景领域
  - 安装部署
  - 配置管理
  - 系统状态管理
  - 云平台基础设施资源管理 - Terraform
- 定义式
  - 定义期望状态
  - Agent 负责维护状态
  - 通过 diff 状态来决定要做什么操作
- 过程式
  - 执行命令，推送脚本，拉取脚本
- 参考
  - [Infrastructure as code 工具](https://en.wikipedia.org/wiki/Infrastructure_as_code#Tools)
  - [Comparison of open-source configuration management software](https://en.wikipedia.org/wiki/Comparison_of_open-source_configuration_management_software)
- 配置 - 幂等
  - 需要更新
- 开通服务 - Provisioning - 通常是一次性操作
