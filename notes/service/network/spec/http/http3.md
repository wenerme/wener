---
title: HTTP 3
---

# HTTP3

- https://http3-explained.haxx.se/
- Alt-Svc: h3=":50781"
- [QUIC IS RFC 9000](https://daniel.haxx.se/blog/2021/05/27/quic-is-rfc-9000/)
- [Usage statistics of HTTP/3 for websites](https://w3techs.com/technologies/details/ce-http3)
- Kubernetes 1.24 2022-05
  - 开启 MixedProtocolLBService
  - https://kubernetes.io/docs/concepts/services-networking/service/#load-balancers-with-mixed-protocol-types
  - Support of mixed protocols in Services with type=LoadBalancer [KEP 1435](https://github.com/kubernetes/enhancements/issues/1435)
    - 1.26 Stable
  - 支持配置相同端口不同协议


:::info

- [haproxy/haproxy#680](https://github.com/haproxy/haproxy/issues/680) HAProxy Support HTTP3
  - HAProxy 2.5, QUIC+HTTP/3
- https://github.com/haproxytech/kubernetes-ingress/issues/546

:::
