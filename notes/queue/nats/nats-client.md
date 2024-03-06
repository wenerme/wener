---
tags:
  - Client
  - SDK
---

# Client

- NodeJS
  - nats - **不支持 websocket**
- NodeJS/Browser - Websocket
  - nats.ws
- 官方 Client
  - WebSocket
  - C, C#, Crystal, Deno, Elixir, Go, Java, Nginx, NodeJS, Ruby, Pure Ruby
  - Python Asyncio, Python Torando, Rust
- Connectors/Utils
  - 官方: Spark, Redis PubSub, Kafka Bridge, MQ Series Bridge, Replicator
- 参考
  - [Clients](https://nats.io/download/)

```ts
// 最多 10 次重连
export const DEFAULT_MAX_RECONNECT_ATTEMPTS = 10;
// 重连随机间隔范围
export const DEFAULT_JITTER = 100;
// jitter for tls
export const DEFAULT_JITTER_TLS = 1000;
// Ping interval
export const DEFAULT_PING_INTERVAL = 2 * 60 * 1000; // 2 minutes
export const DEFAULT_MAX_PING_OUT = 2;

// DISCONNECT Parameters, 2 sec wait, 10 tries
// 重连间隔
export const DEFAULT_RECONNECT_TIME_WAIT = 2 * 1000;

// 重连间隔计算逻辑
const reconnectDelayHandler = () => {
  let extra = options.tls ? options.reconnectJitterTLS : options.reconnectJitter;
  if (extra) {
    extra++;
    extra = Math.floor(Math.random() * extra);
  }
  return options.reconnectTimeWait + extra;
};
```

- https://github.com/nats-io/nats.deno/blob/main/nats-base-client/options.ts

## Request/Reply

- Request/Reply
  - client: subscribe INBOX
  - client: publish subject
  - server: reply -> publish(msg.replay) -> client.INBOX
  - client: handle reply
  - client: unsubscribe INBOX

## NodeJS Websocket

```ts
function polyfillWebSocket(ws?: any): MaybePromise<boolean> {
  const globalThis = getGlobalThis();
  if ('WebSocket' in globalThis) {
    return false;
  }
  if (ws) {
    const { WebSocket } = ws;
    Object.assign(globalThis, { WebSocket });
  }
  return import('ws').then((ws) => polyfillWebSocket(ws));
}

const { connect } = await import('nats.ws');
const client = await connect({
  servers: ['wss://nats.example.com:443'],
});
console.log(client.stats());
```
