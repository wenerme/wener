---
title: gRPC FAQ
tags:
  - FAQ
---

# gRPC FAQ

:::note

- Support gRPC over HTTP/3 [grpc#19126](https://github.com/grpc/grpc/issues/19126)
- gRPC tunneling [grpc#14101](https://github.com/grpc/grpc/issues/14101)

:::

- [grpc/proposal](https://github.com/grpc/proposal)

## Trailer

gRPC 实现依赖 HTTP Trailer 能力，类似 longpulling。

- [Headers/Trailer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Trailer)
- fetch 不支持 trailer [fetch#981](https://github.com/whatwg/fetch/issues/981)
  - 因此 web 不支持直接使用 grpc
  - deno 不支持 grpc - 实现了 fetch
