---
tags:
  - FAQ
---

# API FAQ

## HTTP vs RPC vs gRPC

- HTTP
  - 提供标准的语义操作 - method,path,header,encoding
    - 路由通常基于 HOST+PATH
  - Proxy Server 能 Inspect 请求信息作出响应
    - 例如: 缓存 GET 响应, 增加额外日志, 增加元信息
  - 作为 WWW 的基础协议应用最广泛
  - 本身主要用于提供 Web Server - POST 请求可提供 C/S 服务
  - 协议本身灵活，除了基本约束，其他的人为规范只是形式上的
    - 例如: RESTful, JSONRPC, gRPC-Web
- RPC
  - RPC 只是概念而不是协议
  - 提供程序语义
    - 路由通常基于 服务+方法
  - 主要用于 API 操作
    - 序列化 - 高效 - 固定编码逻辑
    - 安全 - mTLS, 默认 TLS
    - 跨语言 - DSL+生成 - 完整标准工具链
  - 不同的 RPC 协议实现都有所不同
- gRPC
  - 主流 RPC 协议 - 基于 HTTP2
    - protobuf 序列化
    - 默认 TLS
    - 支持非常多的语言生成
  - 高级的 Proxy Server 能 Inspect 请求进行有限的处理逻辑
    - 协议转换
    - trace 信息注入
    - retry

## POST vs PATCH vs PUT

- POST - 创建
- PATCH - 部分更新
- PUT - 全量更新
