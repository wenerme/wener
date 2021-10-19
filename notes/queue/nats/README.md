---
id: nats
title: NATS
---

# NATS

- [nats-io/nats-server](https://github.com/nats-io/nats-server) 是什么？
  -  偏向通讯协议，用作 消息队列
  - 默认没有持久化
  - 协议支持 MQTT, NATS, WebSocket
- 端口
  - 4222 客户端
  - 8222 HTTP 管理和信息上报
  - 6222 集群路由
- 参考
  - [nats-io/natscli](https://github.com/nats-io/natscli)
    - 命令行工具
  - [nats-io/nsc](https://github.com/nats-io/nsc)
    - nats 账号管理功能
  - [compare-nats](https://docs.nats.io/compare-nats)
  - [Client Protocol](https://docs.nats.io/nats-protocol/nats-protocol)

```bash
# 服务端 - 大约 10mb
# docker 启动
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats:alpine
# macOS 安装启动
brew install nats-server
nats-server

# nats 工具需要额外 tap 或者直接下载 https://github.com/nats-io/natscli/releases
brew tap nats-io/nats-tools
brew install nats-io/nats-tools/nats
nats --help

nats account info
nats rtt
```

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

## Notes

- Subject-Based Messaging
  - Subject 名字 `[a-z0-9.]+`
  - 通过 `time.us` 方式实现级联
  - 单层匹配 `time.*.east`
  - 多层匹配 `time.us.>`
- Publish-Subscribe
- Request-Reply
- Queue Groups / Queue Subscribe / Consumer Group
  - Kafka Consumer Group 概念
  - 多个 consumer 共享消费位置
  - queue 表示这个 group - 有唯一的名字
  - 如果不设置 durable 则会在 consumer 关闭完时移除 queue 信息
  - durable 为一个 consumer 的名字
  - 当所有 consumer unsub 时，也会移除 queue 信息
- ACK
  - 响应一条消费的消息
  - 返回 `+ACK`
- Sequence Numbers
- Leaf Nodes
  - 路由消息到其他集群

## auth

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

```
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

## nats-account-server

- [nats-io/nats-account-server](https://github.com/nats-io/nats-account-server)

## nats-top

- [nats-io/nats-top](https://github.com/nats-io/nats-top)

# FAQ

## cannot create a queue subscription for a consumer without a deliver group
