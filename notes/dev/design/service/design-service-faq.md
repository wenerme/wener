---
tags:
  - Design
  - Service
  - FAQ
---

# Design Service FAQ

## API vs Service

- **Service**
  - 逻辑
  - 业务行为、架构逻辑设计、偏向内部
  - Context,Input -> Output
  - 有方法的概念
- **API**
  - 协议
  - 由接口提供方定义，调用方按契约交互
  - 路径、请求和响应格式、鉴权、错误码
  - 内外交互契约
  - Request -> Response
  - 有 Path 的概念

## Request vs Fetch {#request-vs-fetch}

- fetch
  - HTTP 传输层
  - 类似 golang 的Handle
  - 非常基础原始的方式表达一个 请求响应
- request
  - 调用封装
  - 逻辑处理
  - 注入
  - 业务

```ts
type HeaderLike = Record<string, any> | Headerd;
function request<OUT = any, IN = OUT>(options: {
  method?: string;
  baseUrl?: string;
  url?: string;
  path?: string;
  headers?: HeaderLike | MaybeFunction<Headers, Headers>;
  params?: {};
  body?: any;
  retry?: {};
  fetch?: FetchLike;
  timeout?: number;
}): Promise<OUT>;
```

## Service as Secret Broker

```
Client + Internal Auth Token
  -> Server + Real Auth
    -> External Service
```

- Server 只负责加上 Auth 信息
- 附加价值
  - 审计信息
  - 细粒度 AuthZ
  - 敏感信息剥离
  - 租户、隔离
  - 中间层
- 需要的话可以感知请求内容
- 对 Client 来说和直接请求 External Service 没区别
- 典型服务
  - Openrouter
