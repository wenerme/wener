---
title: gRPC FAQ
tags:
  - FAQ
  - Limits
---

# gRPC FAQ

:::note

- 不支持 Prefix
  - [grpc/grpc-web#702](https://github.com/grpc/grpc-web/issues/702)
  - [grpc/grpc-dotnet#110](https://github.com/grpc/grpc-dotnet/issues/110)
- Support gRPC over HTTP/3 [grpc#19126](https://github.com/grpc/grpc/issues/19126)
- gRPC tunneling [grpc#14101](https://github.com/grpc/grpc/issues/14101)

:::

## Limits

- 请求 Message 默认最大 4MB
- 响应 Message 默认无限制
- Web/ConnectRPC
  - 支持 Server Streaming
  - 不支持 Client Streaming
- HTTP Header
  - Cloudflare 32 KB, 单个 16 KB
    - Pages https://developers.cloudflare.com/pages/configuration/headers/
  - Apache - 8K
  - Nginx - 4K-8K
  - IIS - 8K-16K
  - Tomcat - 8K – 48K
  - Node (<13) - 8K; (>13) - 16K

---

- [grpc/proposal](https://github.com/grpc/proposal)

## proto3 optional

- optional 会返回 zero value
  - 无法区分空值 和 optional
  - 可以使用额外的 has 方法来判断是否存在
- proto v3.15 - 2020-04-23 增加 optional
  - v3.12-v3.14 使用 `--experimental_allow_proto3_optional`
  - 底层使用 oneof 实现
- 折中方案
  - 使用 oneof
  - 使用 google.protobuf.FieldMask
  - 使用 Message 类型 - 还是会使用 pointer - 例如 `google.protobuf.StringValue` 替代 string
- 参考
  - Missing value/null support for scalar value types in proto 3 [protocolbuffers/protobuf#1606](https://github.com/protocolbuffers/protobuf/issues/1606)
  - [golang/protobuf#15](https://github.com/golang/protobuf/issues/15)
  - [protobuf/docs/field_presence.md](https://github.com/protocolbuffers/protobuf/blob/main/docs/field_presence.md)
  - [edgedb-go#150](https://github.com/edgedb/edgedb-go/issues/150)

## Trailer

gRPC 实现依赖 HTTP Trailer 能力，类似 longpulling。

- [Why Does gRPC Insist on Trailers?](https://carlmastrangelo.com/blog/why-does-grpc-insist-on-trailers)
- [Headers/Trailer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Trailer)
- fetch 不支持 trailer [fetch#981](https://github.com/whatwg/fetch/issues/981)
  - 因此 web 不支持直接使用 grpc
  - deno 不支持 grpc - 实现了 fetch

## transport: Error while dialing reading server HTTP response: unexpected EOF

plaintext
