---
title: elysia
---

# elysia

- [elysiajs/elysia](https://github.com/elysiajs/elysia)
  - 基于 [bun](./bun.md) 的 Web 框架
  - 使用 @sinclair/typebox
  - 代码量很少，逻辑简单
  - AOT
    - 生成代码来进行 route
    - route 变成一个大 switch
  - 与 [hono](./hono.md) 非常相似，但面向 bun 为主
    - hono 更早，支持更多 环境
    - 没有 AOT
    - 没默认 typebox - 支持多种 validator
- 参考
  - [bogeychan/elysia-polyfills](https://github.com/bogeychan/elysia-polyfills)
    - 可以在 node 环境下使用 elysia

```bash
pnpm add elysia @elysiajs/swagger @elysiajs/static
```

```ts title="server.ts"
import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';

const app = new Elysia()
  .use(swagger())
  .post('/sign-in', ({ body }) => signIn(body), {
    body: t.Object({
      username: t.String(),
      password: t.String(),
    }),
  })
  .listen(8080);

export type App = typeof app;
```

```ts title="client.ts"
import { edenTreaty } from '@elysiajs/eden';
import type { App } from './server';

const app = edenTreaty<App>('http://localhost:8080');

app.signIn
  .post({
    username: 'saltyaom',
    password: 12345678,
  })
  .then(console.log);
```

## Notes

- 完整流程 https://github.com/elysiajs/elysia/blob/main/src/dynamic-handle.ts
- decorator
  - 增加在 context 上
- state
  - 增加在 store 上
- context
  - request
  - set
  - store
  - body
  - query
  - params
  - headers
  - cookies
- handler - 一条路由
  - store - 构建时的配置信息
    - handle
    - hooks
      - transform
      - beforeHandle
      - afterHandle
    - validator
      - body
      - headers
      - query
      - params
      - cookie
      - response
    - content - ContentType
      - application/octet-stream 会让 body 为 arrayBuffer
      - 没有则会触发 onParse
      - fallback 为基于 header 里的 content-type 进行 parse

# FAQ

- gen eden types
  - https://github.com/elysiajs/elysia/issues/257#issuecomment-1752547939
