---
title: Nats Version
tags:
  - Version
---

# Nats Version

- https://github.com/nats-io/nats-server/releases

:::caution

- nats.go 最好匹配服务端版本

:::

| ver | date       | nats.go |
| --- | ---------- | ------- |
| 2.5 | 2021-09-10 | v1.12.1 |
| 2.4 | 2021-08-27 | v1.12.0 |
| 2.3 | 2021-06-24 | v1.11.0 |
| 2.2 | 2021-03-15 | v1.10.0 |
| 2.1 | 2019-09-21 |         |
| 2.0 | 2019-05-05 |         |

## 2.5

- MQTT/Monitoring
  - /connz

## 2.4

- JetStream
  - Push Consumer 行为发生变化 - 客户端和服务端都需要升级
    - 避免相同 durable consumer 重复 sub
    - 避免相同 durable consumer 创建多个 queue group
    - queue sub 时，如果没有 consumer 和 duraable 则创建临时 js consumer
  - ConsumerConfig.DeliverGroup consumer 关联 queue
  - ConsumerInfo.PushBound 表示已经绑带 push 关系
- https://github.com/nats-io/nats-server/releases/tag/v2.4.0

## 2.3

- OCSP - Online Certificate Status Protocol
- JetStream
  - stream purge by subject
  - per-subject message limit
  - encryption data at rest

```ini
[ ext_ca ]
authorityInfoAccess = OCSP;URI:http://ocsp.example.net:80
tlsfeature = status_request
```

```
# ocsp: true

ocsp {
  # auto, must, always, never
  mode: must
  url: "http://ocsp.example.net"
}
```

## 2.2

- 新增 JetStream
- 支持 MQTT 3.1.1
- 支持 WebSocket 链接
- Message Header
- Security & Account
  - CIDR Block
  - Time-Based Account Restrictions
  - Default User Permissions
- Monitoring
  - jsz
  - /accountz
  - /varz
  - /leafz
- JWT

## 2.1

- add rtt /routez
- /leafz

## 2.0

- NKey
- Accounts
- JWT
- Gateway
- Lean Nodes
- System events
- new route protocol
