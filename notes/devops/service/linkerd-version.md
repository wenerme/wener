---
title: Linkerd Version
tags:
  - Version
---

# Linkerd Version

| ver  | release date |
| ---- | ------------ |
| 2.11 | 2021-09-30   |
| 2.10 | 2021-03-11   |
| 2.9  | 2021-11-07   |

## 2.11

- 服务策略 - 限定服务交互
  - 内置 all-authenticated、all-unauthenticated、deny
  - CDR Server、ServerAuthorization
- gRPC 请求重试
- 有 Body 的 HTTP 重试 - 最大 64K
- `linkerd check -o short`
- [Announcing Linkerd 2.11](https://linkerd.io/2021/09/30/announcing-linkerd-2.11/)

## 2.10

- Control Plane 支持扩展
  - 核心资源占用减少 - 2.9 cp ~500mb -> 200mb
  - viz - Prometheus, Grafana, Dashboard
  - multicluster
  - jaeger
- multi-cluster TCP
  - 2.8 引入 多集群 HTTP 支持
- proxy 支持 opaque ports
  - 不透明端口 - 不会做协议检测
  - 之前是忽略，现在是标记为 opaque
  - annotation config.linkerd.io/opaque-ports
  - linkerd inject --opaque-ports
  - 默认 25,443,587,3306,5432,11211
- proxy 使用 tlsv1.3
- docker 使用 cr.l5d.io 仓库

## 2.9

- mTLS TCP
- ARM
- proxy 支持多核
- 支持 [Service Topology](https://kubernetes.io/docs/concepts/services-networking/service-topology/)
  - 例如优先请求本节点服务
- 支持 EndpointSlice - `--enable-endpoint-slices`
- 支持外部 Prometheus - `global.prometheusUrl`
- 新增注解 `linkerd.io/inject: ingress`
  - 代理支持 service profiles
  - 支持路由
  - 支持 HTTP 流量切分
- 配置存放于 `linkerd-config` ConfigMap
- 参考
  - [Announcing Linkerd 2.9](https://linkerd.io/2020/11/09/announcing-linkerd-2.9/)
  - [stable-2.9.0](https://github.com/linkerd/linkerd2/releases/tag/stable-2.9.0)
