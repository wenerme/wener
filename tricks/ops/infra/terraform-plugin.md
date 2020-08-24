
# Terraform Plugin

## Tips

* Terraform [Plugins](https://www.terraform.io/docs/plugins/index.html)
* [hashicorp/terraform-provider-scaffolding](https://github.com/hashicorp/terraform-provider-scaffolding)

## registry
* 默认 registry.terraform.io/hashicorp
* source `[<HOSTNAME>/]<NAMESPACE>/<TYPE>`
* [Provider Registry Protocol](https://www.terraform.io/docs/internals/provider-registry-protocol.html)
  * `:namespace/:type/versions`
  * `:namespace/:type/:version/download/:os/:arch`
* [Perform CRUD operations with Providers](https://learn.hashicorp.com/tutorials/terraform/provider-use)
* 本地路径格式 `registry.terraform.io/hashicorp/google/2.0.0/linux_amd64/terraform-provider-google_v2.0.0`
* [目录](https://www.terraform.io/docs/commands/cli-config.html#implied-local-mirror-directories)


```bash
# migrate
mkdir -p ~/.terraform.d/plugins/terraform.wener.me/wener/libvirt/0.6.2/darwin_amd64
cp ~/.terraform.d/plugins/darwin_amd64/terraform-provider-libvirt \
  ~/.terraform.d/plugins/terraform.wener.me/wener/libvirt/0.6.2/darwin_amd64/terraform-provider-libvirt_v0.6.2

terraform providers mirror ~/.terraform.d/plugins

cat ~/.terraform.d/plugins/terraform.wener.me/wener/libvirt/index.json

terraform state replace-provider 'registry.terraform.io/-/libvirt' 'terraform.wener.me/wener/libvirt'

terraform state replace-provider 'registry.terraform.io/-/docker' 'registry.terraform.io/terraform-providers/docker'
terraform state replace-provider 'registry.terraform.io/-/postgresql' 'registry.terraform.io/terraform-providers/postgresql'
```
