---
title: API Awesome
tags:
  - Awesome
---

# API Awesome

## API/RPC 考虑因素

- 灵活
  - 静态结构
  - 动态结构
  - 兼容性
- 性能
  - 延时要求
  - 服务对服务
  - 服务对客户端
- 序列化
  - 二进制
  - 文本 - JSON
- 语言兼容
  - 需要支持什么语言
  - 自用只需考虑个别语言
  - 对外则需要考虑通用
- 接口模式
  - 请求响应
  - 流式请求
  - 流式响应
- 规范
  - 生成友好
  - 元数据信息完整
- 场景
  - 自用 - 满足内部使用即可
  - 对外 - 采用现有标准规范
- 生态
  - 可观察性
    - Metric
    - Trace
  - 网关
  - 中间件感知

## API Gateway 考虑因素

- 管理能力
  - 负责 增删改 Endpoint - vendor lockin
  - 使用现有配置 - 控制能力弱
- 可观察性能力
  - Metric 集成
  - Trace 集成
  - 内置 - 网关采集、内置显示
  - 外部 - grafana、jeager、prometheus
- 控制能力
  - Auth
  - Threshold
  - 注入自定义逻辑 - Hook
- 协议感知能力
  - gRPC
  - HTTP
  - GraphQL
  - TCP、UDP
- 平台集成能力
  - Kubernetes Service、Annotatation
  - Consul Service
  - ETCD、ZK
- 实现模式
  - 无侵入 - 直接网络拦截
    - 网络层处理 - Cilium
  - 侵入 - 修改代码逻辑
    - 中间件 - 集成 metric、trace 等能力
    - SQL Trace
  - Sidecar - 按应用网络拦截
    - 获取基础 metric 信息、可能能实现 trace 能力
    - Agent 能代表应用身份
    - 通常还能实现 E2E 加密认证
- 元数据存储方式
  - CRD
  - DB - PostgreSQL、MySQL - 需要额外维护、但方便排查使用
  - KV - ETCD、ZK

## Design

- Google [AIP](https://google.aip.dev/general) - API Improvement Proposals
  - [cloud.google.com/apis](https://cloud.google.com/apis/design)
- [Zalando RESTful API and Event Guidelines](https://opensource.zalando.com/restful-api-guidelines/)
- [How to design better REST APIs](https://r.bluethl.net/how-to-design-better-apis)
  1. 一致 - 字段名、接口名、授权、头处理、状态码、HTTP 方法
  1. ISO 8601 Date
  1. 区分不需要授权的接口
  1. 提供 GET /health
  1. API 添加版本 - 例如 /v1/health
  1. Accept API key authentication - 服务端对服务端
  1. 使用正确的 HTTP 状态码
  1. 使用正确的 HTTP 方法
  1. Use self-explanatory, simple names
  1. 使用标准的错误响应 - HTTP 状态码+对应消息体
  1. 创建成功返回创建内容
  1. PUT -> PATCH
  1. Be as specific as possible
  1. Use pagination
  1. Allow expanding resources
- https://stripe.com/blog/idempotency
- [microsoft/api-guidelines](https://github.com/microsoft/api-guidelines)

## 规范

- [RFC9110](https://datatracker.ietf.org/doc/html/rfc9110) HTTP Semantics
- [Financial-grade API](https://fapi.openid.net)
- [Microsoft Graph](https://docs.microsoft.com/zh-cn/graph/overview)
  - github [microsoftgraph](https://github.com/microsoftgraph)
  - [graph-explorer](https://developer.microsoft.com/zh-cn/graph/graph-explorer)
- [WangNingkai/OLAINDEX](https://github.com/WangNingkai/OLAINDEX)
- https://www.asyncapi.com/docs/specifications/v2.3.0
  - [swaggest/go-asyncapi](https://github.com/swaggest/go-asyncapi)
  - https://medium.com/event-driven-utopia/understanding-asyncapis-with-a-practical-example-ee2b4be221d8
- https://swagger.io/specification/
- https://jsonapi.org/format/
- [webrpc/webrpc](https://github.com/webrpc/webrpc)

## RPC

> **Note**
>
> - rpc 和 serialization 主要的区别在于 **服务** 是否为第一公民
> - 除了 gRPC, jsonrpc 其他 rpc 实现基本都是语言相关的
>   - 意味着 非第一方语言的支持相对较弱
> - gRPC 是支持最多语言的 RPC 协议

| RPC        | by         | Languages               | Notes      |
| ---------- | ---------- | ----------------------- | ---------- |
| [gRPC]     | Google     |                         |
| Thrift     | Facebook   | Java                    |
| [twirp]    | TwitchTV   | Go - PHP,Ruby           |
| [finagle]  | Twitter    | Scala                   | Apache-2.0 |
| [tarpc]    | Google     | Rust                    |
| [ice]      |
| **国产**   |            |                         |
| HSF        | Alibaba    | Java                    |
| [Dubbo]    | Alibaba    | Java                    |
| [go-zero]  | 好未来技术 | Go                      |
| [kitex]    | 字节跳动   | Go                      |
| [sofa-rpc] | 蚂蚁金服   | Java                    |
| [tars]     | 腾讯       | C++,Java,NodeJS,PHP,Web | BSD-3      |
| [brpc]     | 百度       | C++,Java                |
| [motan]    | 微博       | Java                    |
| [cat]      | 大众点评   | Java                    |
| [rpcx]     |            | Go                      |
| [erpc]     |            | Go                      |

| Microservice | by       | Tech    |
| ------------ | -------- | ------- |
| [armeria]    | Line     | Java    |
| **国产**     |
| [kratos]     | 哔哩哔哩 | Go,gRPC |
| [go-chassis] |          | Go      |
| [go-doudou]  |          | Go      |

[dubbo]: ./dubbo.md
[ice]: https://github.com/zeroc-ice/ice
[cat]: https://github.com/dianping/cat
[motan]: https://github.com/weibocom/motan
[kitex]: https://github.com/cloudwego/kitex
[brpc]: https://github.com/apache/incubator-brpc
[tars]: https://github.com/tarsCloud/tars
[kratos]: ../../languages/go/lib/kratos.md
[go-zero]: ../../languages/go/lib/go-zero.md
[grpc]: ./grpc.md
[twirp]: ./twirp.md
[finagle]: https://github.com/twitter/finagle
[sofa-rpc]: https://github.com/sofastack/sofa-rpc
[tarpc]: https://github.com/google/tarpc
[grpc]: ./grpc.md
[rpcx]: ../../languages/go/lib/rpcx.md
[erpc]: https://github.com/andeya/erpc
[armeria]: https://github.com/line/armeria
[go-chassis]: https://github.com/go-chassis/go-chassis
[go-doudou]: https://github.com/unionj-cloud/go-doudou

- JSON RPC
- [gRPC]
  - by Google
  - [connect](./connect.md) - 支持 HTTP POST ，兼容 gRPC
- Avro
- [json-api/json-api](https://github.com/json-api/json-api)
  - application/vnd.api+json
- [only-cliches/NoProto](https://github.com/only-cliches/NoProto)
  - MIT, Rust
  - Flexible, Fast & Compact Serialization with RPC
- [twitchtv/twirp](./twirp.md)
  - by Twitch
- [finagle]
  - Apache-2.0, Scala
  - by Twitter
- tRPC

## Serialization

- protobuf
- flatbuffer
- json
- xml
- yaml
- msgpack
- [inkeliz/karmem](https://github.com/inkeliz/karmem)
  - BSD-3
  - faster than Google Flatbuffers and optimized for TinyGo and WASM
- [betwixt-labs/bebop](https://github.com/betwixt-labs/bebop)
  - Typescript, C#, Rust, C++
  - [betwixt-labs/tempo](https://github.com/betwixt-labs/tempo)
    - RPC

---

- ASN.1 PER
- Avro, CapnProto, Protobufs, Flatbuffers
- Schema-ful, copying: Protobuf, Thrift, plenty more
- Schema-ful, zero-copy: Cap'n'proto, Flatbuffers
- Schema-less, copying: Json (binary and other variants included), XML
- Schema-less, zero-copy: Flexbuffers
- Avro is also another data serialization format. Schema-Ful,
- Arrow would be schema-ful, zero-copy
- CBOR - Concise Binary Object Representation
  - 与 JSON 混用

---

- https://github.com/djkoloski/rust_serialization_benchmark
- https://github.com/alecthomas/go_serialization_benchmarks

## Data Gateway

- Hasura
- graphile
- PostREST
- Prisma2
- [stargate/stargate](https://github.com/stargate/stargate)
  - Java, Apache-2.0
- [urigo/graphql-mesh](https://github.com/urigo/graphql-mesh)
  - GraphQL Adapter
  - 后端支持 GraphQL, JSON Schema, gRPC, Swagger, OpenAPI, SOAP, Postgres, Mongo, OData, Thrift, SQLite, MySQL, Neo4j

## OpenAPI

- [getkin/kin-openapi](https://github.com/getkin/kin-openapi)
  - MIT, Golang
  - OpenAPIv3 for Go

## API Gateway

> API 生命周期管理

- [apache/apisix](https://github.com/apache/apisix)
- [apache/incubator-shenyu](https://github.com/apache/incubator-shenyu)
  - 可扩展、高性能、响应式的 **Java** API 网关
- Kong
- Tyk
- [luraproject/lura](https://github.com/luraproject/lura)
- [How to choose the right API Gateway for your platform](https://www.moesif.com/blog/technical/api-gateways/How-to-Choose-The-Right-API-Gateway-For-Your-Platform-Comparison-Of-Kong-Tyk-Apigee-And-Alternatives/)
- [api-platform/api-platform](https://github.com/api-platform/api-platform)
  - Create REST and GraphQL APIs, scaffold Jamstack webapps, stream changes in real-time.

## 管理 {#management}

- [YMFE/yapi](https://github.com/YMFE/yapi)
  - YMFE 去哪儿网
  - 商业产品 apifox
- [thx/rap2-delos](https://github.com/thx/rap2-delos)
  - http://rap2.taobao.org/
- [thx/RAP](https://github.com/thx/RAP)
- [sx1989827/DOClever](https://github.com/sx1989827/DOClever)
- https://www.eolinker.com/
- https://www.getpostman.com/
- https://paw.cloud/

## Doc

- [slatedocs/slate](https://github.com/slatedocs/slate)
- [Redocly/redoc](https://github.com/Redocly/redoc)
- swagger
- graphql
- OpenAPI
- [syroegkin/swagger-markdown](https://github.com/syroegkin/swagger-markdown)
  - 只支持 v2

## Tool

- [Hoppscotch](./hoppscotch.md)
  - MIT, Vue+Typescript
  - 不能持久化
- [Kong/insomnia](https://github.com/Kong/insomnia)
  - MIT, JS+TS
  - GraphQL, REST, WebSockets, gRPC
  - 需要上传才能同步
- [google/gnostic](https://github.com/google/gnostic)
- [OpenAPITools/openapi-generator](https://github.com/OpenAPITools/openapi-generator)
- [EsperoTech/yaade](https://github.com/EsperoTech/yaade)
  - self-hosted, collaborative API development environment
- SoapUI
- [kubeshop/tracetest](https://github.com/kubeshop/tracetest)
- Postman

## 参考

- [public-apis/public-apis](https://github.com/public-apis/public-apis)
- [How Uber Engineering Evaluated JSON Encoding and Compression Algorithms to Put the Squeeze on Trip Data](https://eng.uber.com/trip-data-squeeze-json-encoding-compression/)
  - 2016-02

## Service Discovery

- Redis
  - https://github.com/pyloque/captain#service-discovery-api
- [Nacos](./nacos.md)
