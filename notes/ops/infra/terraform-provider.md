---
id: terraform-provider
title: Terraform Provider
---

# Terraform Provider
## Tips
* 官方 Provider 发布地址 [releases.hashicorp.com](https://releases.hashicorp.com/)
* 本地安装目录 `~/.terraform.d/plugins`
* 参考
  * [Writing Custom Providers](https://www.terraform.io/docs/extend/writing-custom-providers.html)

```bash
# 手动下载安装
os=darwin
arch=amd64
privder=gitlab
ver=2.10.0
curl -OLC- https://releases.hashicorp.com/terraform-provider-$provider/$ver/terraform-provider-${provider}_${ver}_${os}_${arch}.zip
unzip terraform-provider-${provider}-*
mv terraform-provider-${provider}_v* ~/.terraform.d/plugins/${os}_${arch}/terraform-provider-${provider}
```

## keycloak
* [mrparkers/terraform-provider-keycloak](https://github.com/mrparkers/terraform-provider-keycloak)

```bash

```

## null
* 特殊场景使用，“不做”任何事情

```hcl
resource "aws_instance" "cluster" {
  count = 3
}

resource "null_resource" "cluster" {
  # 触发 - 当发送变化，该资源会被 provisioner 替代
  triggers = {
    cluster_instance_ids = "${join(",", aws_instance.cluster.*.id)}"
  }

  # 链接远程
  connection {
    host = "${element(aws_instance.cluster.*.public_ip, 0)}"
  }

  # 执行本地命令
  provisioner "local-exec" {
    command = "bootstrap-cluster.sh ${join(" ", aws_instance.cluster.*.private_ip)}"
  }
}

# 收集中间值，以便于后面配置使用
data "null_data_source" "values" {
  inputs = {
    all_server_ids = "${concat(aws_instance.green.*.id, aws_instance.blue.*.id)}"
    all_server_ips = "${concat(aws_instance.green.*.private_ip, aws_instance.blue.*.private_ip)}"
  }

  # 测试使用 - 该资源会返回这个值
  has_computed_default = "default"
}

resource "aws_elb" "main" {
  instances = "${data.null_data_source.values.outputs["all_server_ids"]}"
}

output "all_server_ids" {
  value = "${data.null_data_source.values.outputs["all_server_ids"]}"
}

output "all_server_ips" {
  value = "${data.null_data_source.values.outputs["all_server_ips"]}"
}
```
