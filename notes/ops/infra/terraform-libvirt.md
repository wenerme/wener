# Terraform Libvirt

* [dmacvicar/terraform-provider-libvirt](https://github.com/dmacvicar/terraform-provider-libvirt)
* [oVirt/terraform-provider-ovirt](https://github.com/oVirt/terraform-provider-ovirt)

```bash
go get -v github.com/dmacvicar/terraform-provider-libvirt
# 全局添加
mkdir -p ~/.terraform.d/plugins/darwin_amd64/
mv ~/go/bin/terraform-provider-libvirt ~/.terraform.d/plugins/darwin_amd64/
```

```hcl
// 可以使用 LIBVIRT_DEFAULT_URI
variable "libvirt" {}

provider "libvirt" {
  uri = var.libvirt.uri
}
```

```hcl
// https://github.com/dmacvicar/terraform-provider-libvirt/blob/master/website/docs/r/domain.html.markdown
resource "libvirt_domain" "terraform_test" {
  name = "terraform_test"
}
```

```
 # IMPORTANT
 # Ubuntu can hang is a isa-serial is not present at boot time.
 # If you find your CPU 100% and never is available this is why
 console {
   type        = "pty"
   target_port = "0"
   target_type = "serial"
 }

 console {
   type        = "pty"
   target_type = "virtio"
   target_port = "1"
 }
```
