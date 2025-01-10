---
title: Connect
tags:
  - Protocol
---

# Connect

- https://connect.build/
  - gRPC 竞品
  - 兼容 gRPC, gRPC-Web 协议
  - 支持 bi-streaming - 使用 gRPC 协议
  - 支持 JSON- 和 binary-encoded Protobuf
  - Connect 自身协议 - 基于 POST - application/connect+proto
    - 支持 Stream - 一行一个请求，类似 SSE
    - 协议和实现更简单
    - 支持 HTTP1
  - 目前支持 Go, Web, Node.js, Swift, Kotlin
- grpc: application/grpc, application/grpc+proto, application/grpc+json
- grpc-web: pplication/grpc-web, application/grpc-web+proto, application/grpc-web+json
- connect
  - unary: application/proto, application/json
  - striming: application/connect+proto, application/connect+json

:::caution

- Python Implementation [connectrpc/connectrpc.com#71](https://github.com/connectrpc/connectrpc.com/pull/71)
  - https://github.com/mattrobenolt/connect-python
  - https://github.com/i2y/connecpy

:::

## Awesome

- [Connect Protocol Reference](https://connect.build/docs/protocol/)
- [connectrpc/vanguard-go](https://github.com/connectrpc/vanguard-go)
  - Apache-2.0, Go
  - Gateway
  - REST, gRPC, gRPC-Web, and Connect
- [bufbuild/protobuf-es](https://github.com/bufbuild/protobuf-es)
  - JS PB 实现
- [bufbuild/connect-crosstest](https://github.com/bufbuild/connect-crosstest)
  - 兼容测试
- [connectrpc/connect-es](https://github.com/connectrpc/connect-es)
  - npm:@connectrpc/connect-node
    - 客户端、服务端
  - 客户端
    - npm:@connectrpc/connect-web
  - 服务端
    - npm:@connectrpc/connect-next
    - npm:@connectrpc/connect-fastify
    - npm:@connectrpc/connect-express

## 协议 {#protocol}

```http
POST /<Package>.<Service>/<Method>
```

## connect-es

- router = `{handlers,service(),rpc()}`
  - handlers - universal handler
    - 支持所有协议 - grpc, grpcWeb, connect
    - 包含元信息
  - service 注册整个 service
  - rpc 注册一个方法
  - handler = 协议协商 -> interceptor -> impl
    - interceptor 无法访问当前的 impl
    - invokeUnaryImplementation
    - `const next = applyInterceptors(fn,interceptors)`
    - `return message = next()`

## connect-web

- [connectrpc/connect-es](https://github.com/connectrpc/connect-es)
- @bufbuild/connect-web -> connectrpc/connect-es
  - 16kB/5kB

```bash
npm install @bufbuild/protoc-gen-es @bufbuild/protoc-gen-connect-web

PATH=$PATH:$(pwd)/node_modules/.bin
```

## connect-go

- ~~[bufbuild/connect-go](https://github.com/bufbuild/connect-go)~~
  - 使用 net/http
  - 生成使用泛型
  - 🌟 Client 和 Server 接口相同 - 方便操作
- [connectrpc/connect-go](https://github.com/connectrpc/connect-go)

```bash
# 基于 POST 的 connect 协议
curl \
  --header "Content-Type: application/json" \
  --data '{"sentence": "I feel happy."}' \
  https://demo.connect.build/buf.connect.demo.eliza.v1.ElizaService/Say

# 兼容 gRPC 协议
grpcurl \
  -d '{"sentence": "I feel happy."}' \
  demo.connect.build:443 \
  buf.connect.demo.eliza.v1.ElizaService/Say
```

```bash
go install github.com/bufbuild/buf/cmd/buf@latest
go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install github.com/bufbuild/connect-go/cmd/protoc-gen-connect-go@latest
go install github.com/bufbuild/protobuf-es/cmd/protoc-gen-es@latest
```

```yaml title="buf.gen.yaml:"
version: v1
plugins:
  - name: go
    out: gen
    opt: paths=source_relative
  - name: connect-go
    out: gen
    opt: paths=source_relative
```

### 实现

- Handler - 当个 RPC 方法处理
  - 实现 Connect, gRPC, gRPC-Web 协议
  - 提供 ServeHTTP
  - 构造
    - NewBidiStreamHandler
    - NewClientStreamHandler
    - NewServerStreamHandler
    - NewUnaryHandler

## Why Connect

- gRPC 因为考虑 Google 内部使用和开源社区使用，一些设计上很乱很奇怪
- gRPC 小版本也可能不出现兼容
- gRPC 在 Web 环境非常麻烦
- 要求 HTTP/2 Trailer - 对使用环境、实现要求苛刻
- vs golang grpc
  - 不兼容 net/http
  - 实现复杂

---

- https://buf.build/blog/connect-a-better-grpc
