---
tags:
  - Client
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
  - 官方: Spark,  Redis PubSub, Kafka Bridge, MQ Series Bridge, Replicator
- 参考
  - [Clients](https://nats.io/download/)

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
