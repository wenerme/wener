---
title: paseo
---

# paseo

- [getpaseo/paseo](https://github.com/getpaseo/paseo)
- 参考
  - iOS https://apps.apple.com/app/paseo-pocket-engineer/id6758887924
  - Web https://app.paseo.sh
  - https://github.com/zenghongtu/paseo-relay

```bash
npm install -g @getpaseo/cli
paseo

paseo ls

# paseo attach <id>
# paseo send <id> "MESSAGE"
# paseo logs <id>
# paseo stop <id>

# ~/.paseo/daemon.log
# 127.0.0.1:6767
# --foreground for debug, --port, --listen
paseo daemon start
paseo daemon status
paseo provider ls

# for public access
paseo daemon set-password
paseo daemon restart

paseo daemon pair --json
paseo ls --host 'https://app.paseo.sh/#offer=...'
paseo --host hostname:6767 ls
# PASEO_PASSWORD=my-secret
#

# paseo import --provider pi <pi-session-id> --cwd /path/to/repo
paseo agent update abc123 --name NAME
```

```
PASEO_HOME=~/.paseo-dev
PASEO_LISTEN=127.0.0.1:6767
PASEO_PASSWORD=xxx
PASEO_HOST=host:6767
```

- ~/.paseo
- ~/.paseo/config.json

```json
{
  "$schema": "https://paseo.sh/schemas/paseo.config.v1.json",
  "version": 1,
  "daemon": {
    "relay": {
      "enabled": true,
      // daemon -> relay
      "endpoint": "relay.example.com:443",
      // client -> relay -  QR code / pairing offer
      "publicEndpoint": "relay.example.com:443",
      "useTls": true,
      "publicUseTls": true
    }
  }
}
```

## Speech

- ~/.paseo/models/local-speech
- 本地 STT、TTS 支持
- STT
  - parakeet-tdt-0.6b-v2-int8
  - https://github.com/k2-fsa/sherpa-onnx
  - NVIDIA Parakeet TDT v2
  - offline NeMo transducer
  - English only
  - int8 ONNX
- TTS
  - kokoro-en-v0_19
  - https://github.com/k2-fsa/sherpa-onnx
  - Kokoro English TTS
  - ONNX
- Turn detection / VAD
  - Silero VAD

可以修改为使用 OpenAI 作为 Provider

```json
{
  "version": 1,
  "features": {
    "dictation": {
      "stt": {
        "provider": "openai"
      }
    },
    "voiceMode": {
      "stt": {
        "provider": "openai"
      },
      "tts": {
        "provider": "openai"
      }
    }
  },
  "providers": {
    "openai": {
      "apiKey": "..."
    }
  }
}
```

# Relay

- Paseo Relay 是一个很薄的 WebSocket 转发层，核心公开接口基本只有：
  - `GET /health`：健康检查。
  - `GET /ws`：WebSocket relay。
- Relay 不理解 Paseo daemon 的业务协议；业务消息在 client 和 daemon 之间端到端加密，relay 只看到连接元信息和 frame 大小。
- Relay 是**连接路由有状态**，不是普通无状态 WebSocket proxy。
  - 官方实现位于 `packages/relay`。
  - 官方线上形态是 Cloudflare Worker + Durable Object。
  - Durable Object 按 `serverId` 分片：同一个 `relay-v<version>:<serverId>` 路由到同一个对象实例。
- self-host 普通 VPS/容器 relay 时，要保证同一个 `serverId` 的所有 WebSocket 都落到同一个 relay 实例。
  - 单机部署最简单。
  - 多实例时需要按 query param `serverId` 做 hash/sticky routing。
  - 不要普通 round-robin。
  - 不建议只按 source IP sticky，因为 daemon 和 client 可能来自不同 IP。

## Relay Config

```json
{
  "version": 1,
  "daemon": {
    "relay": {
      "enabled": true,
      "endpoint": "10.10.1.1:8411",
      "publicEndpoint": "paseo-relay.example.com:443",
      "useTls": false,
      "publicUseTls": true
    }
  }
}
```

核心区分：

- `endpoint`：daemon 主动连接 relay 的地址。
- `publicEndpoint`：写入 QR code / pairing offer，给手机、Web、远程 CLI 连接 relay 的地址。
- `useTls`：daemon 到 `endpoint` 是否用 `wss://`。
- `publicUseTls`：client 到 `publicEndpoint` 是否用 `wss://`。

典型拆分：

```text
daemon -> ws://10.10.1.1:8411/ws
client -> wss://paseo-relay.example.com:443/ws
```

如果 daemon 和 client 都走同一个公网 relay，则 `endpoint` 和 `publicEndpoint` 可以相同。

## Relay Protocol

Relay v2 使用同一个 `/ws` endpoint，通过 query 参数区分连接角色：

```text
/ws?serverId=srv_xxx&role=server&v=2
/ws?serverId=srv_xxx&role=client&v=2
/ws?serverId=srv_xxx&role=server&v=2&connectionId=conn_xxx
```

参数规则：

- `serverId` 必填，是 daemon 的稳定 ID，也是 relay 的 session/shard key。
- `role` 必填，只能是 `server` 或 `client`。
- `v` 可选；缺省按 v1 兼容处理，当前客户端/daemon 会显式传 `v=2`。
- `connectionId` 在 v2 中表示单条 client connection 的路由 ID。

三类 v2 连接：

- daemon control socket
  - URL: `/ws?serverId=srv_xxx&role=server&v=2`
  - `role=server`，无 `connectionId`。
  - daemon 启动后主动连 relay 并常驻。
  - 只承载 relay 控制消息，不转发 Paseo 业务流量。
- client socket
  - URL: `/ws?serverId=srv_xxx&role=client&v=2`
  - Paseo app/web/CLI 通常不传 `connectionId`。
  - relay 为 client 分配 `conn_<random>` 形式的 `connectionId`，并把它存在 socket attachment/tag 中。
  - 如果 client 显式传了 `connectionId`，relay 会使用该值；但协议注释中写的是 client 不应提供，应该让 relay 分配。
- daemon data socket
  - URL: `/ws?serverId=srv_xxx&role=server&v=2&connectionId=conn_xxx`
  - daemon 收到 control 消息后，为对应 `connectionId` 主动建立。
  - relay 在 client socket 和这个 daemon data socket 之间按 `connectionId` 转发 frame。

核心连接流程：

```text
1. daemon -> relay: open server control socket
2. client -> relay: open client socket, relay resolves/assigns connectionId
3. relay -> daemon control: {"type":"connected","connectionId":"conn_xxx"}
4. daemon -> relay: open server data socket with same connectionId
5. relay forwards encrypted frames between client(conn_xxx) and server-data(conn_xxx)
6. last client socket closes: relay closes server-data(conn_xxx) and notifies daemon control
```

核心转发逻辑：

```text
client(conn_xxx) -> relay -> daemon-data(conn_xxx)
daemon-data(conn_xxx) -> relay -> client(conn_xxx)
```

### Data / Frame Format

Relay 层没有复杂数据包 envelope。`/ws` 建立后，WebSocket frame 分两类：

1. relay control JSON text frame：只出现在 daemon control socket 上。
2. data frame：出现在 client socket 和 daemon data socket 上，relay 不解析内容，只按 `connectionId` 转发。

Relay v2 的 data path 里，业务 payload 被 E2EE channel 包了一层：

```text
WebSocket text frame = base64([nonce:24 bytes][ciphertext...])
```

加密 bundle 的二进制格式固定为：

```text
+----------------------+----------------------+
| nonce 24 bytes       | ciphertext N bytes   |
+----------------------+----------------------+
```

- nonce：`tweetnacl` / NaCl box nonce，24 bytes，随机生成。
- ciphertext：`nacl.box.after` 输出，包含 Poly1305 auth tag。
- WebSocket 上传输时通常是 base64 text，便于跨浏览器/Node/Cloudflare 兼容。
- 解密后 plaintext 可能是 UTF-8 string，也可能是 ArrayBuffer；再交给 Paseo daemon/client 自己的 WebSocket 协议处理。

也就是说 relay 看到的是：

```text
serverId, role, connectionId, frame length, timing
```

relay 看不到：

```text
Paseo message type, prompt, agent output, tool call, file content
```

### E2EE Handshake

加密不是 relay 协商的，是 client 和 daemon 自己协商的；relay 只转发握手 frame。

pairing offer 里包含 daemon 的长期 public key：

```json
{
  "v": 2,
  "serverId": "srv_xxx",
  "daemonPublicKeyB64": "...",
  "relay": { "endpoint": "relay.example.com:443", "useTls": true }
}
```

握手流程：

```text
1. daemon 已有持久 ECDH keypair，public key 通过 QR / offer 给 client。
2. client 生成临时 keypair。
3. client 通过 relay data path 发送 plaintext JSON hello：
   {"type":"e2ee_hello","key":"<clientPublicKeyB64>"}
4. daemon 收到 hello 后，用 daemon secret key + client public key 计算 shared key。
5. client 用 client secret key + daemon public key 计算同一个 shared key。
6. daemon 回 plaintext JSON ready：
   {"type":"e2ee_ready"}
7. 双方进入 open 状态，后续所有业务 frame 都用 shared key 加密。
```

密钥与算法：

- key exchange：Curve25519，`nacl.box.before(peerPublicKey, ownSecretKey)`。
- encryption：XSalsa20-Poly1305，`nacl.box.after/open.after`。
- public/secret key 长度：32 bytes。
- shared key 长度：32 bytes。
- nonce 长度：24 bytes。

握手 plaintext frame 只有：

```json
{"type":"e2ee_hello","key":"..."}
{"type":"e2ee_ready"}
```

兼容逻辑：client 在 ready 前每 1s 重发 hello；daemon 如果已经 open 但再次收到相同 hello，会重发 ready 但不 re-key。若 open 后收到不同 client key 的 hello，daemon 会关闭连接，code `1008`，reason `E2EE re-handshake key mismatch`。

注意：E2EE 是每条 client connection / daemon data socket 上的 channel。daemon control socket 不承载 Paseo 业务数据，只承载 relay control JSON，因此不走这个业务 E2EE payload 格式。

### Control Messages

v2 control channel 是 relay 和 daemon control socket 之间的 JSON text message。当前实现确认的消息类型如下。

relay -> daemon:

```json
{"type":"sync","connectionIds":["conn_xxx","conn_yyy"]}
```

含义：全量同步当前 relay 里仍有 client socket 的 `connectionId` 列表。触发时机：

- daemon control socket 刚连上时，relay 立即发送一次 `sync`。
- relay 发现某个 client 已连接但 daemon data socket 长时间未建立时，会再次发送 `sync` 作为 nudge。

relay -> daemon:

```json
{"type":"connected","connectionId":"conn_xxx"}
```

含义：有一个新的 client socket 连接到该 `serverId`。daemon 收到后应为这个 `connectionId` 建立 server data socket。

触发时机：

- 每次 v2 client socket 建立后，relay 调用 `notifyControls({type:"connected", connectionId})`。

relay -> daemon:

```json
{"type":"disconnected","connectionId":"conn_xxx"}
```

含义：某个 `connectionId` 的最后一个 client socket 已关闭。daemon 可关闭/清理对应 data socket。

触发时机：

- client socket close 后，如果同一 `connectionId` 下已经没有其它 client socket，relay 删除 pending frames，关闭 `server:<connectionId>` sockets，并通知 daemon control。

compat daemon -> relay:

```json
{"type":"ping"}
```

compat relay -> daemon:

```json
{"type":"pong","ts":1710000000000}
```

含义：旧 daemon 的 app-level keepalive 兼容。当前新 daemon 主要使用 WebSocket protocol ping/pong；Cloudflare runtime 可在边缘自动响应 protocol ping，避免唤醒 Durable Object。源码注释标记旧 JSON ping 兼容计划在 daemon floor 足够新后删除。

协议侧 daemon parser 也接受 JSON `pong`，但当前 Cloudflare relay 主要只会因兼容 JSON `ping` 返回 JSON `pong`。

### Relay State

relay 内部需要维护：

- `server-control`：daemon control socket，每个 `serverId` 逻辑上一个；新 control 会替换旧 control。
- `server:<connectionId>`：daemon data socket，每个 `connectionId` 逻辑上一个；新 server data 会替换旧 server data。
- `client:<connectionId>`：client socket；同一个 `connectionId` 可有多个 client socket。
- `pendingFrames[connectionId]`：client 先发消息但 daemon data socket 尚未建立时的短暂缓冲。
  - 官方 Cloudflare adapter 限制每个 `connectionId` 最多保留 200 个 frame，超过则丢弃最旧 frame。

### Close / Recovery Semantics

- server control reconnect：新 control 会关闭旧 `server-control` sockets，然后 relay 发送当前 `sync` 列表。
- server data reconnect：同一 `connectionId` 的新 server data 会关闭旧 `server:<connectionId>` sockets，然后 flush pending frames。
- client close：如果不是该 `connectionId` 最后一个 client socket，只记录 close；如果是最后一个，则清 pending frames、关闭 server data、发送 `disconnected`。
- server data close：relay 会关闭对应 `client:<connectionId>` sockets，促使客户端重新连接/重新握手。
- control half-open：client 已连上但 daemon data 长时间没出现时，relay 先发送 `sync` nudge；仍无反应则关闭 control socket，促使 daemon 重连。

### v1 Compatibility

v1 URL 不带 `v=2`，形态是：

```text
/ws?serverId=srv_xxx&role=server
/ws?serverId=srv_xxx&role=client
```

v1 没有 control/data socket 拆分，也没有 `connectionId`。relay 只是按 `role` 把 server/client 两边的 frame 互转；同一 role 新连接会替换旧连接。v2 是当前主要协议。

## Pairing

```bash
paseo daemon pair
paseo daemon pair --json
```

生成的 URL 形如：

```text
https://app.paseo.sh/#offer=...
```

这里的 `app.paseo.sh` 只是 Web UI shell。真正 relay endpoint、TLS 配置、`serverId`、daemon public key 等都在 encoded offer 里。

如果 self-host Web UI，可设置：

```bash
PASEO_APP_BASE_URL=https://paseo-app.example.com paseo daemon start
```

或配置：

```json
{
  "version": 1,
  "app": {
    "baseUrl": "https://paseo-app.example.com"
  }
}
```

然后 pair URL 会变成：

```text
https://paseo-app.example.com/#offer=...
```
