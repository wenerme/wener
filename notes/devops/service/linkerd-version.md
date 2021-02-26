---
title: Linkerd Version
---

# Linkerd Version

## 2.9
* mTLS TCP
* ARM
* proxy 支持多核
* 支持 [Service Topology](https://kubernetes.io/docs/concepts/services-networking/service-topology/)
  * 例如优先请求本节点服务
* 支持 EndpointSlice - `--enable-endpoint-slices`
* 支持外部 Prometheus - `global.prometheusUrl`
* 新增注解 `linkerd.io/inject: ingress`
  * 代理支持 service profiles
  * 支持路由
  * 支持 HTTP 流量切分
* 配置存放于 `linkerd-config` ConfigMap
* 参考
  * [Announcing Linkerd 2.9](https://linkerd.io/2020/11/09/announcing-linkerd-2.9/)
  * [stable-2.9.0](https://github.com/linkerd/linkerd2/releases/tag/stable-2.9.0)
