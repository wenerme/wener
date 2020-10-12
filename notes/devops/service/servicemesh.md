---
id: servicemesh
title: Service Mesh
---

# Service Mesh

## Tips
* Why
  * 统一处理 横切关注点/[Cross-cutting_concern](https://en.wikipedia.org/wiki/Cross-cutting_concern)
    * 类似于 AOP 的切面
    * Service Mesh 处理所有服务之间的切面
  * 快速迭代 - 接口/服务作为产品快速进入市场
  * 处理 __服务之间__ / __外部__ 通信
* Why not
  * 带来额外的延迟
  * 复杂的运维部署
  * sidecar 耗费额外的资源
* When
  * 同步通信场景
  * 产品是 API/服务/接口
* 功能/目的/CCC
  * 路由
    * 负载均衡
    * 百分比流量切分
    * 基于 头/路由 流量切分
    * 代理
  * 流量
    * 访问控制
    * 流量切分
    * 流量规格定义
    * 流量指标
  * 监控
    * 访问日志
    * [黄金指标](https://landing.google.com/sre/sre-book/chapters/monitoring-distributed-systems/#xref_monitoring_golden-signals)
      * 延迟、流量、错误、饱和
    * 路由级监控
    * 跟踪
      * Jaeger, Zipkin, OpenCensus, OpenTracing
  * 弹性
    * 熔断
    * 重试和超时
    * 基于路径的重试和超时
    * 错误注入
    * 延迟注入
  * 安全
    * mTLS
    * CA 证书管理/集成
    * 鉴权规则
* 组成部分
  * control plane
  * data plane
  * proxy
* Traffic Shiffting
  * Istio [Traffic Shifting](https://istio.io/latest/docs/tasks/traffic-management/traffic-shifting/)
* 参考
  * [Service Mesh Comparison](https://servicemesh.es/)
  * [flagger](https://flagger.app/) - Progressive Delivery Operator for Kubernetes
    * Canary - progressive traffic shifting
    * A/B Testing - HTTP headers and cookies traffic routing
    * Blue/Green - traffic switching and mirroring
* 注意⚠️ - 目前=2020
  * istio 是目前功能最为完善的 service mesh，但体积和资源占用也是相当可观
  * linkerd2 是目前极为轻量，侵入性极小，功能有限但能上生产的的 service mesh

## Notes
* 微服务的 observability, reliability, security
* Service Mesh 的结构都是 CP+DP
* DP 为应用的 Sidecar
* Service Mesh 就是将应用通信网络层的基础功能抽象为 DP
  * 服务发现 - 如何请求 服务 A
  * 日志
  * 跟踪
  * 服务权限
  * 指标监控
  * 例如 dubbo RPC 中关于客户端与注册中心通信这部分功能
* __重__ 客户端到 轻客户端的过程
* Service Mesh 的 Service 是应用纬度，不是 `me.wener.test.PingService` 这样的接口纬度
* 面向 Service 更像是面向 Dataplane
* 要求平坦的网络结构 - 节点互通
* Dataplane 类似一个节点的网关，处理所有的出入流量

## SMI
* [Service Mesh Interface](https://smi-spec.io/) / [servicemeshinterface/smi-spec](https://github.com/servicemeshinterface/smi-spec)
  * Traffic Access Control - 访问控制
  * Traffic Metrics - 指标
  * Traffic Specs
  * Traffic Split - 流量切分

```yaml
kind: TrafficSplit
metadata:
  name: canary
spec:
  # The root service that clients use to connect to the destination application.
  service: website
  # Services inside the namespace with their own selectors, endpoints and configuration.
  backends:
  - service: website-v1
    weight: 90
  - service: website-v2
    weight: 10
```
