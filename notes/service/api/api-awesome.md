---
title: API Awesome
tags:
  - Awesome
---

# API Awesome

- API 考虑因素
  - 灵活
    - 静态结构、动态结构
  - 性能
    - 延时要求、服务对服务、服务对客户端
  - 序列化
  - 服务兼容
  - 语言兼容
    - 需要支持什么语言
  - 接口模式
    - 请求响应、流式请求、流式响应
  - 规范 - 生成友好

## 规范

- Google [AIP](https://google.aip.dev/general) - API Improvement Proposals
- [Financial-grade API](https://fapi.openid.net)
- [Microsoft Graph](https://docs.microsoft.com/zh-cn/graph/overview)
  - github [microsoftgraph](https://github.com/microsoftgraph)
  - [graph-explorer](https://developer.microsoft.com/zh-cn/graph/graph-explorer)
- [WangNingkai/OLAINDEX](https://github.com/WangNingkai/OLAINDEX)

## RPC

:::caution

- rpc 和 serialization 主要的区别在于 **服务** 是否为第一公民
- 除了 grpc, jsonrpc 其他 rpc 实现基本都是语言相关的
  - 意味着 非第一方语言的支持相对较弱

:::

- JSON RPC
- gRPC
- Thrift
- Avro
- Dubbo
- [json-api/json-api](https://github.com/json-api/json-api)
  - application/vnd.api+json
- [only-cliches/NoProto](https://github.com/only-cliches/NoProto)
  - MIT, Rust
  - Flexible, Fast & Compact Serialization with RPC
- [tal-tech/go-zero](https://github.com/tal-tech/go-zero)
  - 好未来技术
  - 自定义 DSL + goctl 生成
- [cloudwego/kitex](https://github.com/cloudwego/kitex)
  - Apache-2.0, Go
  - 字节跳动 RPC 框架
- [sofastack/sofa-rpc](https://github.com/sofastack/sofa-rpc)
  - Apache-2.0, Java
  - 蚂蚁金服 RPC 框架
- [tarsCloud/tars](https://github.com/tarsCloud/tars)
  - BSD-3, C++
  - 腾讯 RPC 框架
  - 多语言 - Go、Java、NodeJS、PHP、Web

## Serialization

- ASN.1 PER
- Avro, CapnProto, Protobufs, Flatbuffers
- Schema-ful, copying: Protobuf, Thrift, plenty more
- Schema-ful, zero-copy: Cap'n'proto, Flatbuffers
- Schema-less, copying: Json (binary and other variants included), XML
- Schema-less, zero-copy: Flexbuffers (Any others? This seems new to me)
- Avro is also another data serialization format. Schema-Ful,
- Arrow would be schema-ful, zero-copy
- CBOR - Concise Binary Object Representation
  - 与 JSON 混用

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

## API Gateway

> API 生命周期管理

- [apache/apisix](https://github.com/apache/apisix)
- [apache/incubator-shenyu](https://github.com/apache/incubator-shenyu)
  - 可扩展、高性能、响应式的 **Java** API 网关
- Kong
- Tyk
- [luraproject/lura](https://github.com/luraproject/lura)
- [How to choose the right API Gateway for your platform](https://www.moesif.com/blog/technical/api-gateways/How-to-Choose-The-Right-API-Gateway-For-Your-Platform-Comparison-Of-Kong-Tyk-Apigee-And-Alternatives/)

## Doc

- [slatedocs/slate](https://github.com/slatedocs/slate)
- swagger
- graphql

## Tool

- [Kong/insomnia](https://github.com/Kong/insomnia)

## 参考

- [public-apis/public-apis](https://github.com/public-apis/public-apis)
- [How Uber Engineering Evaluated JSON Encoding and Compression Algorithms to Put the Squeeze on Trip Data](https://eng.uber.com/trip-data-squeeze-json-encoding-compression/)
  - 2016-02
