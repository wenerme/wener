---
tags:
  - RPC
---

# orpc

- [unnoq/orpc](https://github.com/unnoq/orpc)
  - MIT, TS
- 类似于 trpc
  - 支持 contract - 不需要耦合 server 实现
  - 耦合更小, 生态支持更多

```bash
# Server
pnpm add @orpc/server @orpc/openapi @orpc/contract
# Client
pnpm add @orpc/client @orpc/react-query
# Common
pnpm add @orpc/contract
```

## Protocol

- https://orpc.unnoq.com/docs/advanced/rpc-protocol
