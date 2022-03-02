---
title: HAProxy Ingress
---

# HAProxy Ingress

- [jcmoraisjr/haproxy-ingress](https://github.com/jcmoraisjr/haproxy-ingress)
  - [文档](https://haproxy-ingress.github.io/docs/)
  - 基于[模板](https://github.com/jcmoraisjr/haproxy-ingress/blob/05afbb6cedb7fd76cb5618e1c9156905eae75de8/rootfs/etc/templates/haproxy/haproxy.tmpl)生成配置
    - 直观
    - 支持所有能力
  - HAProxy 版本旧一点
  - 支持 acme
  - 有很多辅助配置能够使得配置更加方便
  - 支持 modsecurity
  - 支持 外部 HAProxy
- [haproxytech/kubernetes-ingress](https://github.com/haproxytech/kubernetes-ingress)
  - [文档](https://github.com/haproxytech/kubernetes-ingress/tree/master/documentation)
  - 使用 [haproxytech/dataplaneapi](https://github.com/haproxytech/dataplaneapi) 管理配置
  - 镜像 `haproxytech/kubernetes-ingress` 基于 `haproxytech/haproxy-alpine`
  - 支持 configmap、ingress、service 配置
  - HAProxy 版本新一点 - 因为依赖新的 HAProxy 动态配置能力
  - 问题
    - ExternalName [#100](https://github.com/haproxytech/kubernetes-ingress/issues/100)
    - HTTP 压缩 [#196](https://github.com/haproxytech/kubernetes-ingress/issues/196)

## haproxytech
