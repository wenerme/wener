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

```go
package main
import "github.com/asim/go-micro/v3"

func main()  {
  // create a new service
  service := micro.NewService(
      micro.Name("helloworld"),
  )

  // initialise flags
  service.Init()

  // start the service
  service.Run()
}
```

```bash
# gomu 快速生成工具
go install github.com/asim/go-micro/cmd/gomu@latest

gomu generate skaffold

gomu call helloworld Helloworld.Call '{"name": "John"}'
```

## Components

- 分离 New 和 Init
  - New 接收 Option 但不会报错
  - 因此很多配置可以设置为动态

---

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
- cache - 缓存
- client - 客户端
- cmd - 提供命令行入口处理
- codec - 编码
- config - 配置
- debug
  - stats
  - trace
  - profile
- errors
- logger
- metadata - KV 元数据 - 其他用到元数据的地方都会转为该类型
- plugins - 插件体系
  - plugins.Plugin - go plugin 接口 - go build -buildmode=plugin
  - 支持类型 broker, client, registry, selector, server, transport
  - 会注册到 cmd.DefaultXxx
- registry - Service/服务 注册中心
- server - RPC 服务端
- selector - 服务选择机制
- transport - 传输协议抽象
- runtime - 运行时
- selector - 负载选择
- store - 数据存储/对象存储/KV 存储
- sync - 分布式锁
- transport - 传输层抽象
- 大部分组件都有 Default
- Service
  - micro.Service - micro 平台服务规范/Pattern
    - client.Client
    - server.Server
    - Init
      - 加载插件 MICRO_PLUGIN
      - Cmd.Init
      - Store.Init
    - Start
      - Server.Start
    - Run
      - Client debug.Handler
      - Profile.Start
      - Start
      - Context.Done()
      - Stop
  - micro.Function
    - 继承 micro.Service
    - 一次性调用
  - api.Service - Endpoint -> rpc Service
  - registry.Service - 注册的服务信息
  - runtime.Service - 运行时相关服务
  - web.Service - path -> http.Handler

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
