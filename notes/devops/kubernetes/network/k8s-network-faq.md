---
title: K8S Network FAQ
tags:
  - FAQ
---

# K8S Network FAQ

## NodePort 端口范围

- 30000–32767

## Service 先走本节点 Endpoint

```yaml
apiVersion: v1
kind: Service
metadata:
  name: keydb
  annotations:
    # Topology Aware Hints
    # Kubernetes v1.23 Beta
    # 之前为 topology-aware-hints
    # 值为 Auto|Disabled
    service.kubernetes.io/topology-aware-routing: auto
spec:
  selector:
    app: keydb
  ports:
    - port: 6379
  # Kubernetes v1.21 废弃
  topologyKeys:
    - 'kubernetes.io/hostname'
    - 'kubernetes.io/hostname'
    - 'topology.kubernetes.io/zone'
    - 'topology.kubernetes.io/region'
    - '*'
```

---

- [KEP#2433](https://github.com/kubernetes/enhancements/blob/master/keps/sig-network/2433-topology-aware-hints/README.md)
- [Topology Aware Hints](https://kubernetes.io/docs/concepts/services-networking/topology-aware-hints/)
  - Kubernetes v1.23 Beta

## Endpoints vs EndpointSlices

- EndpointSlices 替代 Endpoints - v1.21
- Endpoints will be mirrored to EndpointSlices for Services with no spec.selector

## 默认 IngressClass

```bash
kubectl get ingressclasses
kubectl describe ingressclasses nginx
kubectl annotate ingressclasses nginx ingressclass.kubernetes.io/is-default-class=true
```

> ingress does not contain a valid IngressClass

## Ingress vs Gateway

- Ingress
  - 内容更多 - 包含了 Host 配置和 规则配置
  - 只定义了 HTTP Host+Path 规则
  - 通常暴露 80 和 443 两个端口
- Gateway - gateway.networking.k8s.io
  - 区分了 Gateway 和 HTTPRoute - 打散规则
  - Gateway 通过 selector 选择要包含的 HTTPRoute
  - Gateway 和 Route 是 对对多 关系
    - 例如 一个 dev 一个 test 但使用部分相同 Route
  - 可以将 HTTPRoute 的配置下放到开发人员
  - 支持非 HTTP 路由
    - TLSRoute - 基于 SNI 路由
    - TCPRoute, UDPRoute - 基于目标端口路由
  - 明确支持透传 HTTPS
  - 暴在 80 和 443 之上支持暴露额外端口

## LB/Load Balance vs Ingress vs ClusterIP vs API Gateway

- LB/Load Balance - 负载均衡
  - 只是一种概念
  - 表示聚合了后端多个服务/节点，对外进行统一暴露
  - 基本功能
    - 上游监控状态监控 - 忽略异常节点/服务
    - 轮询
- Ingress - 流量入口
  - 能感知 7 层协议的 LB - TCP/UDP/HTTP
    - 基于 4 层实现 7 层
  - 因为能感知 7 层协议，所以可以支持更多的路由功能
  - 基本功能 - 基于 HTTP 协议 Host+Path 的 LB
    - 基于 Hots/主机名 路由
    - 基于 路径 路由
    - TLS Offload
  - 常见实现: nginx, haproxy, envoy, traefik
- ClusterIP
  - 4 层协议的 LB - IP
    - 可基于 2 层实现 4 层 - MAC
  - 实现虚拟 IP - 该 IP 可以是私有的，也可以是平台提供的公网 IP
  - 是一种服务
  - 基本功能 - 基于 IP 的 LB
  - 常见实现: metallb
- API Gateway - 接口网关
  - 在应用层协议之上集成更多功能
  - API Gateway 是 Ingress 超集
  - 提供更上层的能力
    - 感知更多协议 - 例如 gRPC/MQTT/MySQL/PostgreSQL/GraphQL
    - 能基于服务进行路由
      - gRPC 不同服务进行路由
      - MQTT 路由
    - 能感知客户端更多信息 - 例如 实现 Auth、限流 等功能
    - 能对输入输出进行操作
      - 修改 HTTP 返回 JSON 内容
      - 对请求响应进行 Instrument - 例如 tracing
    - 更接近开发 - 通常支持 Hook 代码或外部应用进行处理
    - 编排接口
    - 可与服务发现结合使用
  - 通常会抽象更高层的概念 - 服务、路由、Consumer、Plugin
  - 常见实现: ambassador, kong, apisix

## 通过 DNS 名字访问 StatusfulSet Pod

- 确保 headless service 存在 - 例如: redis
- serviceName=redis
- metadata.name=redis
- clusterIP: None
- 然后通过 `redis-0.redis.NAMESPACE.svc.cluster.local` 访问
  - 注意多了一层 stateful 的名字
- 要 ready 后才有记录

---

- https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-network-id
- https://github.com/kubernetes/kubernetes/issues/45779
- https://github.com/kubernetes/kubernetes/issues/92559
  - Headless 有 30s 的 cache-miss 缓存，新的 pod 要 30s DNS 才能访问
