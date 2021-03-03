---
title: Nginx Ingress 常见问题
---

# Nginx Ingress 常见问题

## 泛域名 Host 路由
* 不支持

## SSL Passthrough
* 默认关闭 - `--enable-ssl-passthrough`
* 通过拦截 443 端口到本地 TCP 代理, bypass NGINX, 性能影响很大
  * 本地代理端口 442
  * 如果 hostname 未被处理则又交由 NGINX 处理
* 透传是发送到 service 而不是独立的 endpoint
* [#5686](https://github.com/kubernetes/ingress-nginx/issues/5686) - 可能开启了也不生效

```yaml
# HELM values
controller:
  extraArgs:
    enable-ssl-passthrough: true
```


## HTTPS SNI 路由

```yaml
# 相关配置
# https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#backend-certificate-authentication
annotations:
  # 修改 SNI
  nginx.ingress.kubernetes.io/proxy-ssl-name: wener.me
  nginx.ingress.kubernetes.io/proxy-ssl-protocols: HTTPS
```

* 参考
  * [kubernetes/kubernetes#19333](https://github.com/kubernetes/kubernetes/issues/19333) - HTTPS Ingress controller for SNI based routing
  * [](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#ssl-passthrough)
