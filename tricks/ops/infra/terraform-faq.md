# Terraform FAQ
## Tips

## helm_release: Error: rpc error: code = Unavailable desc = transport is closing
* 可能是由于 helm lint 失败导致
* 可以考虑添加 depends_on 解决
  * `depends_on = [ module.helm-metallb-system ]`
* [#486](https://github.com/hashicorp/terraform-provider-helm/issues/486)
