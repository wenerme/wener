# HAProxy Ingress

## Tips

* [jcmoraisjr/haproxy-ingress](https://github.com/jcmoraisjr/haproxy-ingress)
  * [文档](https://haproxy-ingress.github.io/docs/)
  * 基于[模板](https://github.com/jcmoraisjr/haproxy-ingress/blob/master/rootfs/etc/haproxy/template/haproxy.tmpl)生成配置
  * 支持 acme
  * 有很多辅助配置能够使得配置更加方便
  * 支持 modsecurity
* [haproxytech/kubernetes-ingress](https://github.com/haproxytech/kubernetes-ingress)
  * [文档](https://github.com/haproxytech/kubernetes-ingress/tree/master/documentation)
  * 使用 [haproxytech/dataplaneapi](https://github.com/haproxytech/dataplaneapi) 管理配置
  * 镜像 `haproxytech/kubernetes-ingress` 基于 `haproxytech/haproxy-alpine`
  * 支持 configmap、ingress、service 配置

