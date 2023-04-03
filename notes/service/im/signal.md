---
title: Signal
---

# Signal

- [signalapp](https://github.com/signalapp)
  - [Signal-Server](https://github.com/signalapp/Signal-Server)
    - AGPLv3, Java
  - [Signal-Android](https://github.com/signalapp/Signal-Android)
    - GPLv3, Java, Kotlin
  - [Signal-iOS](https://github.com/signalapp/Signal-iOS)
    - AGPLv3, Swift, ObjC
  - [Signal-Desktop](https://github.com/signalapp/Signal-Desktop)
    - AGPLv3, Typescript, Electron
  - [libsignal](https://github.com/signalapp/libsignal)
    - AGPLv3, Rust, Java, Switf, TypeScript
- Signal Protocol
  - E2E 加密
  - 群组消息单独加密
  - [Double Ratchet](https://signal.org/docs/specifications/doubleratchet/)
  - used by WhatsApp, Facebook Messenger, Google Allo, Signal
- Double Ratchet
  - Diffie-Hellman key exchange
  - out-of-order messages, message resynchronization, message authentication
  - used by Signal, WhatsApp, Wire

## Server

- [Signal-Server](https://github.com/signalapp/Signal-Server)
  - AGPLv3, Java
  - Dropwizard, resilience4j, curve25519-java, Bouncy Castle, Jedis, Lettuce, ~~Liquibase~~, libphonenumber
  - grpc, websocket, graphql
  - mockito, wiremock, assertj
  - com.eatthepath.pushy
  - Redis Pub/Sub
  - Redis Lua 定义脚本
  - Cache - DynamoDB + Redis
- 旧的 DB [messagedb.xml](https://github.com/signalapp/Signal-Server/blob/477615fc66ed6307f3d213eff7e18e95fab17fe2/service/src/main/resources/messagedb.xml)
- 参考
  - [What I've learned from Signal server source code](https://softwaremill.com/what-ive-learned-from-signal-server-source-code/)
    - [resources/lua/insert_item.lua](https://github.com/signalapp/Signal-Server/blob/main/service/src/main/resources/lua/insert_item.lua)
      - messageId=counter++
      - ZADD Queue messageId Message
      - HSET Meta guid messageId
      - EXPIRE Queue 90 days
      - EXPIRE Meta 90 days

### proto

- https://github.com/signalapp/Signal-Server/tree/main/service/src/main/proto

```proto3
enum PubSubType {
  UNKNOWN   = 0;
  QUERY_DB  = 1;
  DELIVER   = 2;
  KEEPALIVE = 3;
  CLOSE     = 4;
  CONNECTED = 5;
}
```
