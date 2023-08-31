---
title: Pulumi
---

# Pulumi


- [pulumi/pulumi](https://github.com/pulumi/pulumi) 是什么？
  - Apache-2.0, Go
  - IaC
  - 相比 Terraform 支持提供语言定义 - declarative vs imperative
    - [terraform-cdk](https://github.com/hashicorp/terraform-cdk) 对应 pulumi 场景
  - 语言支持 JS, TS, Go, Python, .NET, Java, YAML
  - 平台支持 Kubernetes, AWS, GCP, Azure, vmware, openstack, DO

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
