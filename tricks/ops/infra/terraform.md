---
id: terraform
title: Terraform
---

# Terraform
* [functions](https://www.terraform.io/docs/configuration/functions.html)
* 模板语法 [string-templates](https://www.terraform.io/docs/configuration/expressions.html#string-templates)
* [Provisioners](https://www.terraform.io/docs/provisioners/index.html)
  * 本地或远程服务器执行特定动作
  * 用于准备服务或其他基础设施对象
  * 不建议使用，作为最后的方式

## 配置

```hcl
terraform {
  backend "local" {}

  # experiments = [example]
  
  required_providers {
    # aws = ">= 2.7.0"

    aws = {
      version = ">= 2.7.0"
    }
  }
}
```


## 变量
* 输入变量
  * __使用变量必须先定义变量__
  * 读取顺序
    * 环境变量
    * 变量文件 `terraform.tfvars` `terraform.tfvars.json`
      * HCL 或 JSON
    * 变量文件 `*.auto.tfvars` `*.auto.tfvars.json`
    * 参数 `-var`, `-var-file`
  * 会检测环境变量，例如 `name` 则会使用 `TF_VAR_name`
* 本地变量
  * 直接写在文件里的变量
  * 可重复使用
* 输出变量
  * 类似于一个模块的返回值
  * 子模块可通过输出变量暴露信息给上级
  * root 模块可输出到命令行
  * 当使用远程状态时，root模块输出变量能够被其他配置访问到， `terraform_remote_state`


```hcl
terraform {
  # 开启变量校验
  experiments = [variable_validation]
}

variable "gitlab_token" {
  # 简单类型
  # string number bool
  # 复杂类型
  # list(<TYPE>) set(<TYPE>) map(<TYPE>) object({<ATTR NAME> = <TYPE>, ... }) tuple([<TYPE>, ...])
  type = string
  # default = ''
  description = "token for gitlab access"

  validation {
    condition     = length(var.gitlab_token) > 0 && substr(var.gitlab_token, 0, 4) == "ami-"
    # condition     = can(regex("^ami-", var.image_id))
    error_message = "Invalid token"
  }
}
provider "gitlab" {
  token = var.gitlab_token
}

# 本地变量
locals {
  service_name = "forum"
  owner        = "Community Team"

  instance_ids = concat(aws_instance.blue.*.id, aws_instance.green.*.id)

  # 通过 local.common_tags 方式引用
  common_tags = {
    Service = local.service_name
    Owner   = local.owner
  }
}

# 输出变量
output "instance_ip_addr" {
  value = aws_instance.server.private_ip
}

output "db_password" {
  value       = aws_db_instance.db.password
  description = "The password for logging in to the database."
  sensitive   = true
}

output "instance_ip_addr" {
  value       = aws_instance.server.private_ip
  description = "The private IP address of the main server instance."

  depends_on = [
    # Security group rule must be created before this IP address could
    # actually be used, otherwise the services will be unreachable.
    aws_security_group_rule.local_access,
  ]
}
```
