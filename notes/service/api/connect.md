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

```bash
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
