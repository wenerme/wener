---
title: Auth
---

# Nats Auth

- 静态 token / user-password
- nkey - Ed25519 JWT
- NATS JWT / Operator-Account-User
- JWKS / OIDC 风格 JWT 验证
  - 需要 Ed25519, 可能更自然是 OIDC -> Auth Callout -> NATS User JWT claims
- Auth Callout，自定义 auth service

---

- resolver
  - memory
  - url
    - https://github.com/nats-io/nats-account-server
    - 自己签发 user JWT
    - 可以自己实现

## Auth callout

> NATS v2.10.0+

- 基于 [Service](./nats-service.md)
- Demo
  - https://github.com/ConnectEverything/nats-by-example/blob/main/examples/auth/callout/cli/service/main.go
- https://docs.nats.io/running-a-nats-service/configuration/securing_nats/auth_callout
