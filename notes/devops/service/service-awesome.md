---
title: Service Awesome
tags:
  - Awesome
---

# Service Awesome

- [meshery/meshery](https://github.com/meshery/meshery)
  - service mesh management plane
  - 在现有 mesh 之上提供管理能力
  - 实现 SMI
  - 集成 WASM 过滤
  - https://smp-spec.io/
- Service Mesh
  - 强调 编排服务、Rollout 流量控制
  - 内部服务、 跨边界服务
  - 选择考虑维度
    - VM 支持 - 是否有裸机场景
    - 代码侵入性
    - Sidecar 资源占用
    - Observability 支持情况 - 一般都会支持
- API Gateway
  - 强调 编排接口、流量限制
  - 暴露内部服务 - Ingress + API 感知
- 服务治理 - [SOA governance](https://en.wikipedia.org/wiki/SOA_governance)
  - 服务注册中心 - 发现
  - 服务配置中心
  - 服务生命周期
  - 服务可观察
  - 服务 Schema
  - 服务 Portal
  - 强依赖使用的 RPC 协议
- 服务注册
  - eurake
  - consul
  - etcd
  - zk
  - nacos

## Service Mesh

- linkerd
- istio
- consul
- kuma
- traefik mesh

## API Gateway

- CNCF [API Gateway Landscape](https://landscape.cncf.io/card-mode?category=api-gateway&grouping=category)
- [Kubernetes Gateway API](https://gateway-api.sigs.k8s.io/)
  - GatewayClass, Gateway, HTTPRoute
  - [Implementations](https://gateway-api.sigs.k8s.io/references/implementations/)
- [apache/apisix](https://github.com/apache/apisix)
  - etcd+nginx
- [Kong/kong](https://github.com/Kong/kong)
  - Apache-2.0, Lua+nginx
- [emissary-ingress/emissary](https://github.com/emissary-ingress/emissary)
  - Apache-2.0, Python+Go+Envoy
- [megaease/easegress](https://github.com/megaease/easegress)
  - Apache-2.0, Go
  - 国产
- [solo-io/gloo](https://github.com/solo-io/gloo)
  - Apache-2.0, Go+Envoy
- [luraproject/lura](https://github.com/luraproject/lura)
  - Apache-2.0, Go

## RPC

- [grpc/grpc](https://github.com/grpc/grpc)
  - Google
- [apache/thrift](https://github.com/apache/thrift)
  - Facebook
  - [facebook/fbthrift](https://github.com/facebook/fbthrift)
- [twitter/finagle](https://github.com/twitter/finagle)
  - Twitter
- [twitchtv/twirp](https://github.com/twitchtv/twirp)
  - Twitch TV
  - Apache-2.0, Go
- [apache/dubbo](https://github.com/apache/dubbo)
  - Java
  - 阿里 - 内部使用 HSF
  - [apache/dubbo-go](https://github.com/apache/dubbo-go)
    - 官方维护
- [apache/incubator-brpc](https://github.com/apache/incubator-brpc)
  - 百度
- [TarsCloud/Tars](https://github.com/TarsCloud/Tars)
  - 腾讯
- [Meituan-Dianping/octo-rpc](https://github.com/Meituan-Dianping/octo-rpc)
  - 美团
- [dianping/cat](https://github.com/dianping/cat)
  - Apache-2.0, Java
  - 点评
  - MVC, RPC, DB, Cache, Queue, Conf
- [go-kratos/kratos](https://github.com/go-kratos/kratos)
  - Bilibili
  - 质量一般
  - gRPC 脚手架 + 配置 + 服务发现
- [smallnest/rpcx](https://github.com/smallnest/rpcx)
- [go-kiss/sniper](https://github.com/go-kiss/sniper)
  - bilibili
- 参考
  - [Snailclimb/guide-rpc-framework](https://github.com/Snailclimb/guide-rpc-framework)

## Event

- [cloudevents](https://github.com/cloudevents)
- [knative/serving](https://github.com/knative/serving)
- [kedacore/keda](https://github.com/kedacore/keda)
