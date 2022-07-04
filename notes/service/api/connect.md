---
title: Connect
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
  - 预计支持 go, ts, express, rails, django, laravel
- 参考
  - [Connect Protocol Reference](https://connect.build/docs/protocol/)
  - [bufbuild/protobuf-es](https://github.com/bufbuild/protobuf-es)
    - JS PB 实现
  - [bufbuild/connect-crosstest](https://github.com/bufbuild/connect-crosstest)
    - 兼容测试

## Connect 协议

```http
POST /<Package>.<Service>/<Method>
```

## connect-go

- [bufbuild/connect-go](https://github.com/bufbuild/connect-go)
  - 使用 net/http
  - 生成使用泛型
  - 🌟 Client 和 Server 接口相同 - 方便操作

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
  - 提供  ServeHTTP 
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
