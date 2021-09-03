---
title: grpc web
---

# grpc web

- [gRPC Web](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-WEB.md)
- nginx
  - [ngx_http_grpc_module](http://nginx.org/en/docs/http/ngx_http_grpc_module.html)
  - [Introducing gRPC Support with NGINX 1.13.10](https://www.nginx.com/blog/nginx-1-13-10-grpc/)
- envoy
- [improbable-eng/grpc-web](https://github.com/improbable-eng/grpc-web)
  - 直接使用 go 作为代理
  - 支持 unary 和 server stream
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

## 通信格式

- `mode=grpcwebtext`
  - `Content-type: application/grpc-web-text`
  - Base64 编码
  - 支持 unary 和 server streaming
- `mode=grpcweb`
  - `Content-type: application/grpc-web+proto`
  - 二进制编码
  - 只支持 unary
