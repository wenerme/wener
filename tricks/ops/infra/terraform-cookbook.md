---
id: terraform-cookbook
title: Terraform 常用脚本
---

# Terraform 常用脚本

## acme dns challenge

```hcl
variable "alicloud_access_key"{type=string}
variable "alicloud_secret_key"{type=string}

provider "acme" {
  server_url = "https://acme-v02.api.letsencrypt.org/directory"
}

resource "tls_private_key" "any_wener_me_private_key" {
  algorithm = "RSA"
}

resource "acme_registration" "any_wener_me_reg" {
  account_key_pem = "${tls_private_key.any_wener_me_private_key.private_key_pem}"
  email_address   = "admin@wener.me"
}

resource "acme_certificate" "any_wener_me" {
  account_key_pem           = "${acme_registration.any_wener_me_reg.account_key_pem}"
  common_name               = "wener.me"
  subject_alternative_names = ["*.wener.me"]

  dns_challenge {
    provider = "alidns"

    config = {
      ALICLOUD_ACCESS_KEY    = var.alicloud_access_key
      ALICLOUD_SECRET_KEY    = var.alicloud_secret_key
    }

    # pdns
    # PDNS_API_KEY
    # PDNS_API_URL

    # rfc2136
    # RFC2136_NAMESERVER - "host" or "host:port".
    # RFC2136_TSIG_ALGORITHM - 支持算法 https://github.com/miekg/dns/blob/master/tsig.go#L18 - 不设置 TSIG 相关变量则禁用
    # RFC2136_TSIG_KEY
    # RFC2136_TSIG_SECRET
  }
}

# write cert and key
resource "local_file" "any_wener_me_crt" {
    sensitive_content     = acme_certificate.any_wener_me.certificate_pem
    filename = "${path.module}/wener.me.crt"
    file_permission = 0600
}
resource "local_file" "any_wener_me_key" {
    sensitive_content     = acme_certificate.any_wener_me.private_key_pem
    filename = "${path.module}/wener.me.key"
    file_permission = 0600
}
```

## 模板渲染触发命令

```hcl
# 渲染模板
data "template_file" "cluster-manifesto" {
  template = "${file("${path.module}/cluster.yaml.tpl")}"
  vars {
    # ....
  }
}

# 写入文件
resource "local_file" "saved-cluster-manifesto" {
  content = "${data.template_file.cluster-manifesto.rendered}"
  filename = "${local.cluster_manifesto_path}"
}

# 使用文件进行操作
resource "null_resource" "cluster-upload" {
  triggers {
    file = "${data.template_file.cluster-manifesto.rendered}"
  }

  provisioner "local-exec" {
    command = "kops -v 10 replace -f ${local.cluster_manifesto_path}
  }
}
```
