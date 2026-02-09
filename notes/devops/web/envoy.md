---
tags:
  - Gateway
  - Proxy
---

# Envoy

- [envoyproxy/envoy](https://github.com/envoyproxy/envoy)
  - Apache-2.0, C++
  - CNCF 毕业项目
  - 云原生高性能边缘/中间/服务代理
  - 支持 HTTP/1.1, HTTP/2, gRPC, TCP, UDP
  - 可观测性: 分布式追踪、指标、日志
  - 动态配置: xDS API
  - 可扩展: Lua, WASM
- 参考
  - [EnvoyProxy](https://www.envoyproxy.io/)

## 基于 Envoy 的项目

- [istio/istio](https://github.com/istio/istio) - 服务网格
- [alibaba/higress](https://github.com/alibaba/higress) - 云原生 API 网关
- [emissary-ingress/emissary](https://github.com/emissary-ingress/emissary) - Kubernetes Ingress
- [projectcontour/contour](https://github.com/projectcontour/contour) - Kubernetes Ingress

## gRPC

- [gRPC Bridge](https://www.envoyproxy.io/docs/envoy/latest/start/sandboxes/grpc_bridge)
  - HTTP/1.1 客户端通过 Envoy 访问 gRPC 服务

## 配置

```bash
# 验证配置
envoy --mode validate -c envoy.yaml

# 启动
envoy -c envoy.yaml
```

| 参数                         | 说明                                    |
| ---------------------------- | --------------------------------------- |
| `-c, --config-path`          | 配置文件路径                            |
| `--mode serve/validate`      | 运行模式                                |
| `-l, --log-level`            | 日志级别 trace/debug/info/warning/error |
| `--log-path`                 | 日志文件路径                            |
| `--concurrency`              | worker 线程数                           |
| `--service-cluster`          | 集群名称                                |
| `--service-node`             | 节点名称                                |
| `--local-address-ip-version` | 本地 IP 版本 v4/v6                      |
