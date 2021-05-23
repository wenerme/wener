---
title: Pulumi
---

# Pulumi

- [pulumi/pulumi](https://github.com/pulumi/pulumi) 是什么？
  - IaC
  - 相比 Terraform 支持提供语言定义 - declarative vs imperative
    - [terraform-cdk](https://github.com/hashicorp/terraform-cdk) 对应 pulumi 场景
  - 语言支持 JS, TS, Go, Python, .NET - TS 为主要买点
  - 平台支持 Kubernetes, AWS, GCP, Azure, vmware, openstack, DO

:::tip 💡 建议使用 terraform

- pulumi 的状态是 SaaS first - 意味着状态管理多少都会遇到自己管理的情况
- terraform 更成熟
- terraform 生态圈更大 - 大公司更倾向于 terraform - 因为更少 vendor lock
- terraform-cdk 对应 pulumi - 还处于开发阶段 - 但至少对此做出了回应

:::

:::caution

- 默认状态管理依赖 pulumi 服务

:::

```bash
brew install pulumi

# pulumi new kubernetes-go
pulumi new kubernetes-typescript
# 应用变化
pulumi up
```

## 状态后端

- Pulumi Self Host - 企业版
- 本地文件
- S3, Azure Blob Storage, Google Cloud Storage
