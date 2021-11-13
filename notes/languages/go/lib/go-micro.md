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
  - [m3o/m3o](https://github.com/m3o/m3o)
  - [micro/services](https://github.com/micro/services)
    - 基于 micro 的服务示例
  - [Asim Aslam on Microservices, go-micro, and PaaS 3.0](https://www.infoq.com/podcasts/microservices-go-micro-paas3/)
  - 类似项目
    - [google/go-cloud](https://github.com/google/go-cloud)

:::caution

- gRPC 不支持 Client Stream
  - [asim/go-micro#2212](https://github.com/asim/go-micro/issues/2212)
- gRPC 服务端无法接收 metadata
  - [asim/go-micro#574](https://github.com/asim/go-micro/issues/574)

:::

```go
package main
import "go-micro.dev/v4"

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
# micro 快速生成工具
# go install github.com/asim/go-micro/cmd/gomu@latest

go install go-micro.dev/v4/cmd/micro@master
micro generate skaffold

micro call helloworld Helloworld.Call '{"name": "John"}'
```

## Components

- 分离 New 和 Init
  - New 接收 Option 但不会报错
  - 因此很多配置可以设置为动态

---

- api - HTTP API
  - api.Api - mux
  - api.Service
    - 一个 Endpoint 和多个 registry.Service
    - Path -selector-> registry.Service
  - api.Endpoint
    - 一个入口, Host+Method+Path
    - 如果 Path 以 `^` 开头则为 pcre
  - handler - http.Handler - 实际处理
    - api - http <-> registry.Service
    - event - http <-> client.Publish
    - http - http <-> api.Service
    - rpc - http <-proto/json-> api.Service -> registry.Service
    - 对 body 和服务的识别处理不同
  - server - API Gateway - path -> http.Handler
    - http - HTTP Server
  - router
    - router.Router
      - 映射 http.Request -> api.Service
      - 注册 endpoint
    - registry
      - watch registry.Registry 所有 Service 的所有 Endpoint
      - 网关性质
  - resolver - http.Request -> resolver.Endpoint/Host+Method+Path
    - 提取请求信息
- auth - AuthN + AuthZ - API 资源角度
- broker - PubSub
  - 异步
- events - 事件
  - Stream+Store
  - 支持 ACK
  - nats, redis
- cache - 缓存
  - kv+时效
  - 只有 Get+Put+Delete 操作
- client - 客户端
- cmd - 提供命令行入口处理
  - 持有所有服务的实现 - 全局上下文
  - 初始化相关服务
  - Before - 应用配置、Init 服务
  - 默认 Action 没有任何操作
- codec - 编码
- config - 配置
  - encoder.Encoder - 编码解码 - json,yaml,xml 等
  - source.Source - 一个 **配置项** 来源
    - 指向 path/路径/文件/环境变量/flag
    - source.ChangeSet - 配置内容
  - loader.Loader - 加载合并 source
  - reader.Reader - 合并 source.ChangeSet
    - 默认 json 实现
    - format -> encoder.Encoder
    - reader.Values - 支持 get/set/del/scan 的配置项
    - reader.Value - 配置项值
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
  - registry.Service - 注册的服务信息
    - 注册的名字为 server.DefaultName - 也就是服务维度 / micro.Service 维度
    - 包含多个 Endpoint, Node
  - registry.Endpoint - 终端
    - server.Handler - 每个方法会注册为一个 Endpoint
      - relfect.Type Method
      - name=type.method
    - server.Subscriber - 每个 Subscriber 方法 会注册为一个 Endpoint
      - Func, reflect.Type.Name+.method.Name
  - registry.Node
- server - RPC 服务端
  - server.Server
  - server.Router - 类似 http.Handler+mux 角色
  - server.Request
  - server.Response
  - server.Message
  - server.Stream
  - server.Handler - opaque handler - 实现相关
    - 处理 Request -> Response
  - server.Subscriber - opaque subscriber - 实现相关
    - 处理 Message
    - func
      - func(context.Context,Type)
    - struct
      - func(Type)
      - func(context.Context,Type)
      - func(context.Context,requestType,responseType) - grpc - 以 responseType 作为 Request
- selector - 服务选择机制
- transport - 传输协议抽象
- runtime - 运行时
- selector - 负载选择
- store - 数据存储/对象存储/KV 存储
  - redis, memcached, mysql, consul, file(bolt),cockroach
  - 有 database, table 概念
  -  有 offset,limit 概念
  - 读取默认返回多值
  - 数据包含 key,value,metadata,expire_at
  - Read+Write+Delete+List 操作
  - 现在已经没有 BlobStore 了
    - [s3.go](https://github.com/asim/go-micro/blob/09d6d0e2d22b7d342de713b762b982afe93396c6/store/s3/s3.go)
- sync - 分布式锁
- transport - 传输层抽象
- web
  - web.Service - path -> http.Handler
    - 会注册
    - 持有 cmd.Cmd - 包含整体上下文
    - http.ServeMux
    - http.Client
- micro - 微服务
  - micro.Service - micro 平台服务规范/Pattern
    - 会注册
    - client.Client
    - server.Server
    - Init
      - 加载插件 MICRO_PLUGIN
      - cmd.Cmd.Init
      - store.Store.Init
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
- 大部分组件都有 Default
- Service
  - micro.Service - micro 平台服务规范/Pattern
  - micro.Function
  - web.Service - path -> http.Handler
  - api.Service - Endpoint -> rpc Service
  - registry.Service - 注册的服务信息
  - runtime.Service - 运行时相关服务

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
# go install github.com/asim/go-micro/cmd/protoc-gen-micro/v3@latest
go install go-micro.dev/v4/cmd/protoc-gen-micro@latest
```

# FAQ

## asim/go-micro vs micro/go-micro

- asim/go-micro
  - 个人项目
  - 接口变化很大
  - 涉及到 License 变化
  - micro/go-micro -> asim/go-micro
- [micro/go-micro](https://pkg.go.dev/github.com/micro/go-micro/v3)
  - 公司项目 - micro.mu
  - 接口和实现满足公司需要
