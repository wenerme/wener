---
title: Terraform K8S
---

# Terraform K8S

## Tips
* [#509](https://github.com/hashicorp/terraform-provider-helm/issues/509)
  * 模块名字不能与 helm 发布的名字一样
* [hashicorp/terraform-provider-kubernetes-alpha#58](https://github.com/hashicorp/terraform-provider-kubernetes-alpha/issues/58)
  * 该 provider 支持 crd
  * 但还没发布到 registry
* 参考
  * [jrhouston/tfk8s](https://github.com/jrhouston/tfk8s)
    * k8s yaml 转 tf 定义

```bash
# YAML 转 HCL
echo 'yamldecode(file("test.yaml"))' | terraform console
```
