---
title: go-kit
---

# go-kit

- [go-kit/kit](https://github.com/go-kit/kit)
  - 开发不活跃、设计可作参考
  - 微服务开发套件/库
  - Unopinioned
  - 三层
    - Transport
    - Endpoint
    - Service

| Layer     | Impl                                                                              |
| --------- | --------------------------------------------------------------------------------- |
| Transport | http<br/>nats<br/>jsonrpc<br/>grpc<br/>thrift<br/>amqp<br/>httprp                 |
| Endpoint  | metrics<br/>balance<br/>limiting                                                  |
| Service   | business analytics<br/>application logging<br/>service metrics<br/>business login |

## 模块

- auth - 认证
  - basic
  - casbin - [casbin/casbin](https://github.com/casbin/casbin) 集成
  - jwt
- circuitbreaker - 熔断
  - Gobreaker - [sony/gobreaker](https://github.com/sony/gobreaker)
  - HandyBreaker - [streadway/handy/breaker](https://github.com/streadway/handy)
  - Hystrix - [afex/hystrix-go](https://github.com/afex/hystrix-go)
- endpoint - 终端接口定义
  - Endpoint - `func(ctx context.Context, request interface{}) (response interface{}, err error)`
    - 请求 -> 响应
    - 大多其他功能通过封装该接口实现
    - 可以表示客户端和服务端
  - Middleware - `func(Endpoint) Endpoint`
- log - 日志
  - Logger，LoggerFunc - 日志接口
  - level - 日志级别 Debug Info Warn Error
  - logrus - logrus 日志集成
  - syslog - syslog 日志
  - term - 终端日志，支持颜色
  - zap - [uber-go/zap](https://github.com/uber-go/zap) 结构化日志
- metrics - 指标监控
  - Counter、Gauge、Histogram、Timer - 指标接口
  - expvar
  - prometheus
  - statsd
- ratelimit - 限流
- sd - 服务发现
  - Endpointer - 返回多个 Endpoint，发现的服务
    - 发现的 Endpoint
  - Factory - 实例定义 例如 host:port -> Endpoint
  - Instancer - 客户端发现的服务实例信息
    - 客户端使用的服务发现
    - Event 包含实例字符串和异常，实例字符串通过 Factory 获取到实际 Endpoint
    - 启动后会一般会后台持续刷新
  - Registrar - 服务注册
    - 服务端使用的服务发现
  - consul
    - Instancer
    - Registrar
      - 注册 agent service
  - dnssrv
    - Instancer
  - etcd
  - eureka
  - zk - Zookeeper
  - lb - 负载均衡
    - Balancer - 返回单个 Endpoint，负载均衡选择结果
      - 一般通过 sd.Endpointer 创建
    - 支持策略
      - Random
      - Retry
      - RoundRobin
- tracing - 跟踪
  - opencensus
  - opentracing
  - zipkin
- transport - 传输协议
  - amqp
  - grpc
  - http
    - jsonrpc - JSON RPC 序列化
    - proto - Protobuf 序列化
  - httprp - HTTP 反向代理
  - nats
  - thrift
