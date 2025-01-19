---
title: Control plane
---

# Control plane

- 控制面板

- [Control plane](https://en.wikipedia.org/wiki/Control_plane)
  - 配置 Data plane - 管理操作路径
- [Data plane](https://en.wikipedia.org/wiki/Data_plane)
  - 实际处理逻辑 - 处理数据 - 用户访问路径
  - 高性能 - 可能是硬件
    - 例如 [Forwarding plane](https://en.wikipedia.org/wiki/Forwarding_plane)
  - 相对轻量
  - 功能单一
  - 通常为代理服务
- 参考
  - [Istio Architecture](https://istio.io/latest/docs/ops/deployment/architecture/)
  - [Linkerd Architecture](https://linkerd.io/2.10/reference/architecture/)

| -             | Control plane      | Data plane    |
| ------------- | ------------------ | ------------- |
| Router        | 路由表             | 包转发        |
| Ingress Nginx | Ingress Controller | Nginx         |
| Linkerd       | controller         | linkerd-proxy |
| Istio         | istiod             | envoy+sidecar |
