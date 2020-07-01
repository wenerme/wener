
## 模板渲染触发命令

```hcl
# 渲染模板
data "template_file" "cluster-manifesto" {
  template = "${file("${path.module}/cluster.yaml.tpl")}"
  vars {
    ....
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
