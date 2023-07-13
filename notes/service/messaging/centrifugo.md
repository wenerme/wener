---
title: centrifugo
---

# centrifugo

- [centrifugal/centrifugo](https://github.com/centrifugal/centrifugo)
    - 实时消息服务
      - 作为独立服务存在
      - JWT 认证
      - 暴露 HTTP, GRPC 接口
      - 可以将 RPC Websocket 请求转换为 HTTP 请求
    - MIT 协议
    - language-agnostic - 语言无关
    - Websocket - JSON, Protobuf
    - SockJS - polyfill
    - 类似商业产品
      - https://pusher.com/websockets
    - 适用场景
      - php+html - php 不易处理 ws，但使用该服务可以 php --POST-> centrifugo --WS-> html
      - vercel 部署请求必须 10s 内 - 则可以 NextJS 后端 -> centrifugo -> 前端
      - AWS Lambda 场景 - 没有长链接，需要支持通知
      - Function as a Service 场景 - 没有链接概念，需要支持通知
      - 聊天产品、实时通知、消息集成、事件驱动
      - 类似于 Kafka，但是是面向 C 端产品
- HTTP
  - X-API-Key
- GRPC
