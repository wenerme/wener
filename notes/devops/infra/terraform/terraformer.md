---
title: terraformer
---

# terraformer

- [GoogleCloudPlatform/terraformer](https://github.com/GoogleCloudPlatform/terraformer)
- `{output}/{provider}/{service}/{resource}.tf`
```bash
brew install terraformer

brew install aliyun-cli
aliyun configure
cat ~/.aliyun/config.json

terraformer import alicloud --resources=dns --profile=default
terraformer import alicloud --resources=ecs --regions=cn-shanghai --profile=default

terraformer import alicloud --resources=ecs,sg,rds,vswitch --regions=cn-shanghai --profile=default -o . -p aliyun-
```

# FAQ

## You must complete the Terraform 0.13 upgrade process before upgrading to later versions.

```bash
terraform state replace-provider -auto-approve "registry.terraform.io/-/alicloud" "hashicorp/alicloud"
```
