---
title: Terraform
tags:
  - FAQ
---

# Terraform FAQ

## This configuration or its associated state refers to the unqualified provider "local"

```bash
terraform state replace-provider "registry.terraform.io/-/local" "hashicorp/local"
terraform init -reconfigure
```
- https://discuss.hashicorp.com/t/unqualified-provider-aws/18554/18

## Could not retrieve the list of available versions for provider hashicorp/local

```bash
# 不会尝试下载新版
mv ~/.terraform.d/{plugins,_}
```

## helm_release: Error: rpc error: code = Unavailable desc = transport is closing

- 可能是由于 helm lint 失败导致
- 可以考虑添加 depends_on 解决
  - `depends_on = [ module.helm-metallb-system ]`
- [#486](https://github.com/hashicorp/terraform-provider-helm/issues/486)
