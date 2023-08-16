---
title: SocketIO
---

# SocketIO

- [socketio/socket.io](https://github.com/socketio/socket.io)
  - real-time bidirectional event-based communication
- [socketio/socket.io-redis-adapter](https://github.com/socketio/socket.io-redis-adapter)
  - pub/sub
  - `socket.io#/#` - broadcast
  - `socket.io#/#room21#` - room
  - `<prefix>#<namespace>#*`
  - `<prefix>-request#<namespace>#`
  - `<prefix>-response#<namespace>#`
- https://admin.socket.io/

## Protocol

```
WEBSOCKET wss://example.com/socket.io/?EIO=3&transport=websocket
```

- EIO - 版本 - 3/4
  - EngineIO v2 -> SocketIO v0.9
  - EngineIO v3 -> SocketIO v1, v2
  - EngineIO v4 -> SocketIO v3
    - reverse ping/pong
      - server -> client
      - 因为 client 的 timer 不一定靠谱
    - long-polling base64 binary data
    - record separator `\x1e`
      - 之前使用 length - 对于非 utf16 客户端实现不友好
- transport - 传输协议 - websocket/polling
- sid - session id

**polling**

- `Content-Type: application/octet-stream`
- `Content-Type: text/plain; charset=UTF-8`
- `<packet type>[<data>]<separator><packet type>[<data>]<separator><packet type>[<data>][...]`
  - separator=`\x1e` - [Record Separator](https://en.wikipedia.org/wiki/C0_and_C1_control_codes#Field_separators)

**WebSocket**

- `<packet type>[<data>]`

```
<- 0{"sid":"258c675c-a211-4bd4-a861-7b2ae022309e","upgrades":["websocket"],"pingInterval":25000,"pingTimeout":60000}
<- 40

-> 2
<- 3
```

**engine.io type**

| N   | for     |
| --- | ------- |
| 0   | open    |
| 1   | close   |
| 2   | ping    |
| 3   | pong    |
| 4   | message |
| 5   | upgrade |
| 6   | noop    |

_open_

```json
{
  "sid": "lv_VI97HAXpY6yYWAAAC",
  "upgrades": ["websocket"],
  "pingInterval": 25000,
  "pingTimeout": 20000,
  "maxPayload": 1000000
}
```

**socket.io action**

| N   | for          |
| --- | ------------ |
| 0   | CONNECT      |
| 1   | DISCONNECT   |
| 2   | EVENT        |
| 3   | ACK          |
| 4   | ERROR        |
| 5   | BINARY_EVENT |
| 6   | BINARY_ACK   |

- `40` -> message/CONNECT

```
-> { type: CONNECT, namespace: "/admin", data: { "token": "123" } }
<- { type: CONNECT, namespace: "/admin", data: { sid: "iLnRaVGHY4B75TeVAAAB" } }
```

- type, namespace, data
- CONNECT -> CONNECT,CONNECT_ERROR
- EVENT, BINARY_EVENT -> ACK, BINARY_ACK

```
<packet type>[<# of binary attachments>-][<namespace>,][<acknowledgment id>][JSON-stringified payload without binary]

+ binary attachments extracted
```

_编码_

```json
{ "type": "CONNECT", "namespace": "/admin", "data": { "sid": "oSO0OpakMV_3jnilAAAA" } }
```

```
0/admin,{"sid":"oSO0OpakMV_3jnilAAAA"}
```

**参考**

- https://github.com/socketio/socket.io-protocol
- https://github.com/socketio/engine.io-protocol

# FAQ

## namespace vs room

**相同点**

- 命名空间和房间都是在服务端创建
- 服务器只会将消息分发给连接到了相应命名空间和房间的客户端

**不同点**

- 一个命名空间一个连接,一个命名空间下的房间共享一个连接
- 客户端可任意离开房间,但要离开命名空间只能断开连接
- 客户端只能连接到服务器上已经存在的命名空间
- 只能在服务器端进入房间,但实现一个从客户端控制服务端加入房间的命令很简单.
- 命名空间可进行授权验证
- 房间虽然不支持授权验证,但自定义一个授权验证还是很容易的.
- 房间是命名空间的一部分,默认为 'global' 命名空间

因此使用命名空间最好使用服务器上已经定义好的,而房间主要用于动态创建的.

- http://stackoverflow.com/questions/10930286
- https://divillysausages.com/2015/07/12/an-intro-to-socket-io/
