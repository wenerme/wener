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
  - 基于 [haproxytech/client-native](https://github.com/haproxytech/client-native)
    - 使用 RuntimeAPI
    - 使用配置模型
  - 镜像 `haproxytech/kubernetes-ingress` 基于 `haproxytech/haproxy-alpine`
  - 支持 configmap、ingress、service 配置
  - 支持 外部 模式
  - 问题
    - ExternalName [#100](https://github.com/haproxytech/kubernetes-ingress/issues/100)
    - HTTP 压缩 [#196](https://github.com/haproxytech/kubernetes-ingress/issues/196)
- [haproxytech/dataplaneapi](https://github.com/haproxytech/dataplaneapi)
  - 通过接口动态配置 HAProxy

## haproxytech ingress

- 前缀: ingress.kubernetes.io, haproxy.org, haproxy.com
- 配置继承关系: default <- Configmap <- Ingress <- Service
- [annotation](https://github.com/haproxytech/kubernetes-ingress/blob/master/documentation/annotations.md)
- [logging](https://www.haproxy.com/blog/logging-with-the-haproxy-kubernetes-ingress-controller)

| annotation             | default | note                                                 |
| ---------------------- | ------- | ---------------------------------------------------- |
| ssl-passthrough        | false   | 透传 SSL                                             |
| ssl-redirect           | false   | HTTP -> HTTPS                                        |
| server-ssl             | false   | 后端 HTTPS                                           |
| forwarded-for          | true    |
| backend-config-snippet |
| path-rewrite           |
| send-proxy-protocol    |         | proxy,proxy-v1,proxy-v2,proxy-v2-ssl,proxy-v2-ssl-cn |
| whitelist              |         |

```yaml
# 等同于 nginx-ingress backend-protocol HTTPS
# 等同于 nginx proxy_ssl_verify off;
# HAProxy ssl verify none
server-ssl: true
```

| configmap               | default | note               |
| ----------------------- | ------- | ------------------ |
| scale-server-slots      | 42      | 生成的 server 个数 |
| global-config-snippet   |         |
| frontend-config-snippet |         |
| stats-config-snippet    |         |
| proxy-protocol          |         | IPs or CIDRs       |
| syslog-server           |         |

- proxy-protocol
  - 接受的 PROXY 客户端来源
  - 0.0.0.0/0 允许所有

| controller                | default |                      |
| ------------------------- | ------- | -------------------- |
| --default-backend-service |         | e.g. `nginx-ingress` |
| --default-ssl-certificate |

- [documentation/controller](https://github.com/haproxytech/kubernetes-ingress/blob/master/documentation/controller.md)

## Trouableshooting

```bash
cat /etc/haproxy/haproxy.cfg | grep -v disabled

ls /etc/haproxy/maps
# host.map path-exact.map path-prefix.map sni.map
```
