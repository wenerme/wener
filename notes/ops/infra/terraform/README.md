---
title: Terraform
---

# Terraform

- [functions](https://www.terraform.io/docs/configuration/functions.html)
- 模板语法 [string-templates](https://www.terraform.io/docs/configuration/expressions.html#string-templates)
- [Provisioners](https://www.terraform.io/docs/provisioners/index.html)
  - 本地或远程服务器执行特定动作
  - 用于准备服务或其他基础设施对象
  - 不建议使用，作为最后的方式
- 注意
  - Provider configurations can be defined only in a root Terraform module.
  - 被调用模块不能定义 `provider`
  - 0.10 旧的模块不支持 `for_each`, `count`, `depends_on`
  - 移除 `provider` 之前确保所有资源删除
  - 模块会集成默认 provider - 没有别名的 provider
  - 如果发现网络不通，确保本地可以打开 https://registry.terraform.io/.well-known/terraform.json
- 转换函数
  - yamldecode
- 后端
  - local - 本地存储 terraform.tfstate
  - remote - Terraform Enterprise
  - artifactory - 无锁
  - consul
  - etcdv3
  - http - 可选锁 - REST 接口
  - kubernetes - secret 限制了最大 1MB - 不建议使用
  - 阿里云 oss、腾讯云 cos
  - pg
  - s3 - DynamoDB 支持锁

```bash
# 日志
TF_LOG=1 terraform apply
```

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

## terraformrc

- https://www.terraform.io/docs/commands/cli-config.html

```bash
cat <<HCL > ~/.terraformrc
plugin_cache_dir   = "$HOME/.terraform.d/plugin-cache"
disable_checkpoint = true

provider_installation {
  filesystem_mirror {
    path    = "$HOME/.terraform.d/plugins"
    include = ["terraform.wener.me/*/*","registry.terraform.io/*/*"]
  }
}
HCL

mkdir -p $HOME/.terraform.d/plugin-cache $HOME/.terraform.d/plugins

# 在 tf 项目下运行
terraform providers mirror ~/.terraform.d/plugins
```

## 变量

- 输入变量
  - **使用变量必须先定义变量**
  - 读取顺序
    - 环境变量
    - 变量文件 `terraform.tfvars` `terraform.tfvars.json`
      - HCL 或 JSON
    - 变量文件 `*.auto.tfvars` `*.auto.tfvars.json`
    - 参数 `-var`, `-var-file`
  - 会检测环境变量，例如 `name` 则会使用 `TF_VAR_name`
- 本地变量
  - 直接写在文件里的变量
  - 可重复使用
- 输出变量
  - 类似于一个模块的返回值
  - 子模块可通过输出变量暴露信息给上级
  - root 模块可输出到命令行
  - 当使用远程状态时，root 模块输出变量能够被其他配置访问到， `terraform_remote_state`

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

## 后端

- Enhanced - 可存储状态和执行操作
  - local, remote
- Standard - 远程存储，依赖 local 执行
  - consul, etcd, etcdv3
  - artifactory, pg, swift, http
  - azurerm, gcs, cos, oss, manta
  - s3
    - 通过 Dynamo DB 可支持 locking 和 一致性检查
    - 建议开启版本
  - kubernetes - 存储为 secret, 最多 1MB 限制
    - `tfstate-{workspace}-{secret_suffix}`
- 特性支持
  - [State Locking](https://www.terraform.io/docs/language/state/locking.html)
    - 避免并发操作
    - remote, sql, s3+dynamo, kubernetes

```hcl
terraform {
  backend "kubernetes" {
    # tfstate-{workspace}-state
    secret_suffix = "state"
    # ~/.kube/config
    load_config_file = true
    config_context = "demo"
    # 默认使用 context 关联 ns
    namespace = "demo"
  }

  # remote
  backend "http" {
  }
}
```

## GitLab Terraform State Backend

```bash
STATE_NAME=staging
PROJECT_ID=
USERNAME=
PTA=
terraform init \
    -backend-config="address=https://gitlab.com/api/v4/projects/$PROJECT_ID/terraform/state/$STATE_NAME" \
    -backend-config="lock_address=https://gitlab.com/api/v4/projects/$PROJECT_ID/terraform/state/$STATE_NAME/lock" \
    -backend-config="unlock_address=https://gitlab.com/api/v4/projects/$PROJECT_ID/terraform/state/$STATE_NAME/lock" \
    -backend-config="username=$USERNAME" \
    -backend-config="password=$PTA" \
    -backend-config="lock_method=POST" \
    -backend-config="unlock_method=DELETE" \
    -backend-config="retry_wait_min=5"
```

```yaml
image: registry.gitlab.com/gitlab-org/terraform-images/stable:latest

variables:
  TF_ROOT: ${CI_PROJECT_DIR}/environments/example/production
  TF_ADDRESS: ${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/terraform/state/example-production

cache:
  key: example-production
  paths:
    - ${TF_ROOT}/.terraform

before_script:
  - cd ${TF_ROOT}

stages:
  - prepare
  - validate
  - build
  - deploy

init:
  stage: prepare
  script:
    - gitlab-terraform init

validate:
  stage: validate
  script:
    - gitlab-terraform validate

plan:
  stage: build
  script:
    - gitlab-terraform plan
    - gitlab-terraform plan-json
  artifacts:
    name: plan
    paths:
      - ${TF_ROOT}/plan.cache
    reports:
      terraform: ${TF_ROOT}/plan.json

apply:
  stage: deploy
  environment:
    name: production
  script:
    - gitlab-terraform apply
  dependencies:
    - plan
  when: manual
  only:
    - master
```
