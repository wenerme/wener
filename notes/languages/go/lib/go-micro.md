---
title: go-micro
---

# go-micro

- [asim/go-micro](https://github.com/asim/go-micro)
  - 基本接口定义+Plugins 提供平台相关实现
- Transport http :52980
- Broker http :52981
- GRPC server :53915
- 参考
  - [micro/services](https://github.com/micro/services)

:::caution

- gRPC 不支持 Client Stream
  - [asim/go-micro#2212](https://github.com/asim/go-micro/issues/2212)
- gRPC 服务端无法接收 metadata
  - [asim/go-micro#574](https://github.com/asim/go-micro/issues/574)

:::

```bash
# gomu 快速生成工具
go install github.com/asim/go-micro/cmd/gomu@latest

gomu generate skaffold

gomu call helloworld Helloworld.Call '{"name": "John"}'
```

## Components

- api - HTTP API
  - handler - http.Handler
  - server - API Gateway - path -> http.Handler
    - http - HTTP Server
  - router - http.Request -> api.Service
    - 注册 endpoint
  - resolver - http.Request -> resolver.Endpoint/Host+Method+Path
    - 提取请求信息
  - Service - 关联多个 Endpoint，关联注册服务
  - Endpoint - 一个入口, Host+Method+Path
    - 由 handler 实际处理
    - rpc,meta,proxy 等
- auth - AuthN + AuthZ - API 资源角度
- broker - PubSub
- client - 客户端
- registry - Service/服务 注册中心
- server - RPC 服务端
- selector - 服务选择机制
- transport - 传输协议抽象
- runtime - 运行时
- store - 数据存储/对象存储
- tracer - 跟踪
- profile
- config - 配置
- cmd - 提供命令行入口处理
- 大部分组件都有 Default

## RPC
- micro metadata 上下文内容
  - Remote
  - :authority
  - content-type
  - user-agent
- grpc 时客户端会将 micro metadata 的数据转到 grpc 头 - 如果要添加授权则使用 micro metadata
- client
  - WithServiceToken - authWrapper 会取 metadata 里的 Authorization
  - 有 Auth 会用到 metadata 里的 Micro-Namespace
- HeaderPrefix 默认 Micro-
  - Namespace
  - From-Service
## protoc-gen-micro

- grpc 适配 micro

```bash
go install github.com/asim/go-micro/cmd/protoc-gen-micro/v3@latest
```
