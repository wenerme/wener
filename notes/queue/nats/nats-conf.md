---
tags:
  - Configuration
---

# NATS Conf

- https://docs.nats.io/running-a-nats-service/configuration

## nats-server.conf

```conf
# Client port of 4222 on all interfaces
port: 4222

# HTTP monitoring port
monitor_port: 8222

# NSC 生成的 Operator JWT
operator: $HOME/.nsc/nats/O/O.jwt
# Account Server
resolver: URL(http://localhost:9090/jwt/v1/accounts/)

# This is for clustering multiple servers together.
cluster {

  # Route connections to be received on any interface on port 6222
  port: 6222

  # Routes are protected, so need to use them with --routes flag
  # e.g. --routes=nats-route://ruser:T0pS3cr3t@otherdockerhost:6222
  authorization {
    user: ruser
    password: T0pS3cr3t
    timeout: 2
  }

  # Routes are actively solicited and connected to from this server.
  # This Docker image has none by default, but you can pass a
  # flag to the gnatsd docker image to create one to an existing server.
  routes = []
}
```

## leaf

## Auth

- nats 通过 account 实现租户隔离
- 使用 account 需要设置 auth
- 认证方式
  - token - 可以配置明文或 bcrypt 加密的 token
  - user+password - 密码支持 bcrypt 加密
  - tls
  - nkey
- 授权
  - publish
  - subscribe
  - allow_responses - max,expires
- 参考
  - [Account lookup using Resolver](https://docs.nats.io/running-a-nats-service/configuration/securing_nats/auth_intro/jwt/resolver)
    - 实际处理逻辑 https://github.com/nats-io/nats-account-server/blob/69cb476d18a0194c6a59866b642fdee295db6a55/server/core/jwthandler.go#L137-L139

```bash
nats server passwd -p 123456
```

```hcl
authorization {
  default_permissions = {
    publish = "SANDBOX.*"
    subscribe = ["PUBLIC.>", "_INBOX.>"]
  }
  ADMIN = {
    publish = ">"
    subscribe = ">"
  }
  REQUESTOR = {
    publish = ["req.a", "req.b"]
    subscribe = "_INBOX.>"
  }
  RESPONDER = {
    subscribe = ["req.a", "req.b"]
    publish = "_INBOX.>"
  }
  users = [
    {user: admin,   password: $ADMIN_PASS, permissions: $ADMIN}
    {user: client,  password: $CLIENT_PASS, permissions: $REQUESTOR}
    {user: service,  password: $SERVICE_PASS, permissions: $RESPONDER}
    {user: other, password: $OTHER_PASS}
    {
      user: test
      password: test
      permissions: {
          publish: {
              deny: ">"
          },
          subscribe: {
              allow: "client.>"
          }
      }
    }
    { user: b, password: b, permissions: {subscribe: "q", allow_responses: true } },
    { user: c, password: c, permissions: {subscribe: "q", allow_responses: { max: 5, expires: "1m" } } }
  ]
}

accounts: {
  A: {
    users: [
      {user: a, password: a}
    ]
    exports: [
      {stream: puba.>}
      {service: pubq.>}
      {stream: b.>, accounts: [B]}
      {service: q.b, accounts: [B]}
    ]
  },
  B: {
    users: [
      {user: b, password: b}
    ]
    imports: [
      {stream: {account: A, subject: b.>}}
      {service: {account: A, subject: q.b}}
    ]
  },
  C: {
    users: [
      {user: c, password: c}
    ]
    imports: [
      {stream: {account: A, subject: puba.>}, prefix: from_a}
      {service: {account: A, subject: pubq.C}, to: Q}
    ]
  }
}
no_auth_user: a
```
