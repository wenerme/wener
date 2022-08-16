---
title: grpc web
---

# grpc web

- [gRPC Web](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md)
- [grpc/grpc-web](https://github.com/grpc/grpc-web)
- nginx
  - [ngx_http_grpc_module](http://nginx.org/en/docs/http/ngx_http_grpc_module.html)
  - [Introducing gRPC Support with NGINX 1.13.10](https://www.nginx.com/blog/nginx-1-13-10-grpc/)
- envoy
- [improbable-eng/grpc-web](https://github.com/improbable-eng/grpc-web)
  - 直接使用 go 作为代理
  - 支持 unary 和 server stream
  - [nice-grpc-web](https://github.com/deeplay-io/nice-grpc/tree/master/packages/nice-grpc-web)
    - 基于 @improbable-eng/grpc-web
    - 接口更加友好
- kong [grpc-web](https://docs.konghq.com/hub/kong-inc/grpc-web/) 插件
  - 如果没有原始 proto 只能支持二进制编码
    - `application/grpw-web+proto`
    - `application/grpc-web`
    - `application/grpc-web-text`
    - `application/grpc-web-text+proto`
  - 如果有原始编码，则可以支持转码
    - `application/grpc-web+json`
    - `application/grpc-web-text+json`
  - 如果 kong 是通过数据库多节点部署的，那比较难有 proto 文件

## Awesome

- web pkg
  - google-protobuf - 230kB/46kB
  - grpc-web - 35kB/13kB
    - `new MyService()`
    - xhr
  - @improbable-eng/grpc-web - 24kB/7kB
    - `grpc.{unary,invoke,client}`
  - [protobufjs/protobuf.js](https://github.com/protobufjs/protobuf.js)
  - [thesayyn/protoc-gen-ts](https://github.com/thesayyn/protoc-gen-ts)
    - 暂不支持 grpc-web
  - [improbable-eng/ts-protoc-gen](https://github.com/improbable-eng/ts-protoc-gen)
    - 支持 grpc-web，开发不活跃
    - fetch
  - [bufbuild/protobuf-es](https://github.com/bufbuild/protobuf-es)
    - 未来会支持 RPC
  - @bufbuild/protobuf
- nodejs
  - @grpc/grpc-js
  - @grpc/proto-loader

## Protocol

- `mode=grpcwebtext`
  - `Content-type: application/grpc-web-text`
  - `application/grpc-web-text+[proto,thrift]`
  - Base64 编码
  - 支持 unary 和 server streaming
- `mode=grpcweb`
  - `Content-type: application/grpc-web+proto`
  - `application/grpc-web+[proto,json,thrift]`
    - 默认 +proto
  - 二进制编码
  - 只支持 unary

```yaml title="buf.gen.yaml"
plugins:
  - name: grpc-web
    out: gen/web
    opt: mode=grpcwebtext
```

- import_style - closure,commonjs,commonjs+dts,typescript
- mode - grpcwebtext,grpcweb
