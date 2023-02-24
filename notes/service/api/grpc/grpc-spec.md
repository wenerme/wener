---
title: grpc spec
---

# grpc spec

## naming

```
[scheme]://[authority]/endpoint
```

- unix:///path/to/socket
- unix-abstract:
- Target - 解析后的请求目标 ~= Address
  - Scheme - 默认 passthrough
  - Authority
  - Endpoint
- 不识别的 schema 则变成 `passthrough:///<target>`
  - 因此 dialer 要有能处理 schema 的能力
- Target -Resolver-> `Address[]` -Balancer/Dial-> Transport
- golang
  - 默认 dialer 为 net.Dialer#DialContext
  - tcp 会监测代理环境 HTTPS_PROXY - 会自动启用代理 - groc.WithNoProxy 可关闭
