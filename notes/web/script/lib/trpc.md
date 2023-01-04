---
title: trpc
---

# trpc

- [trpc/trpc](https://github.com/trpc/trpc)
- @trpc/next - NextJS
- spec
  - https://trpc.io/docs/rpc
- 参考
  - [jlalmes/trpc-openapi](https://github.com/jlalmes/trpc-openapi)
    - 使用 meta 定义路由
      - `.meta({openapi: { method: 'GET', path: '/say-hello', headers: [] } })`
    - 使用 zod 定义 input 和 output
    - 创建新的路由
    - 路由忽略大小写，忽略 Trailing slashes
    - API Handler
      - createOpenApiNextHandler
      - createOpenApiHttpHandler - node:http
      - createExpressMiddleware
      - ⚠️ 暂不支持 fastify - [jlalmes/trpc-openapi#87](https://github.com/jlalmes/trpc-openapi/issues/87)
    - generateOpenApiDocument 生成 Schema

:::caution

- 因为核心是使用 typescript 类型，类型不好 bundle，不方便分享给别的项目
  - https://github.com/trpc/trpc/discussions/1860
- Support for additional Content-Types [#1937](https://github.com/trpc/trpc/issues/1937)
- 合并多个 trpc 会有点麻烦 - SOA
  - React Query 只能一个上下文 trpc
  - 基于路径请求不同 trpc 服务端
  - [examples/soa/client/client.ts#L11-L41](https://github.com/trpc/trpc/blob/c49e0333ced133a883d276e51679c10de2f575e8/examples/soa/client/client.ts#L11-L41)

:::

:::info

- v11 [#3496](https://github.com/trpc/trpc/issues/3496)

:::

```bash
npm add @trpc/client @trpc/server
```

```ts
import * as trpc from '@trpc/server';
import { z } from 'zod';

const appRouter = trpc
  .router()
  .query('getUser', {
    input: (val: unknown) => {
      if (typeof val === 'string') return val;
      throw new Error(`Invalid input: ${typeof val}`);
    },
    async resolve(req) {
      req.input; // string
      return { id: req.input, name: 'Bilbo' };
    },
  })
  .mutation('createUser', {
    // validate input with Zod
    input: z.object({ name: z.string().min(5) }),
    async resolve(req) {
      // use your ORM of choice
      return await UserModel.create({
        data: req.input,
      });
    },
  });

export type AppRouter = typeof appRouter;
```

- 适配 - https://github.com/trpc/trpc/tree/main/packages/server/src/adapters
  - next
    - createNextApiHandler
  - standalone
    - createHTTPHandler
    - createHTTPServer
  - ws
    - applyWSSHandler
    - 基于 ws 包
  - fastify
    - fastifyTRPCPlugin
    - fastifyRequestHandler
  - express
    - createExpressMiddleware
  - node-http
    - nodeHTTPRequestHandler
  - aws-lambda
  - fetch
    - fetchRequestHandler
  - lambda

## fastify

```ts title="context.ts"
import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

export function createContext({ req, res }: CreateFastifyContextOptions) {
  const user = { name: req.headers.username ?? 'anonymous' };

  return { req, res, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;
```

```ts
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import { createContext } from './context';
import { appRouter } from './router';
import ws from '@fastify/websocket';

const server = fastify({
  maxParamLength: 5000,
});

// 支持 subscription
server.register(ws);

server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext },
});

(async () => {
  try {
    await server.listen(3000);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
```

## openapi

```ts
import { initTRPC } from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';
const t = initTRPC.meta<OpenApiMeta>().create();
export const appRouter = t.router({
  sayHello: t.procedure
    // 定义接口
    .meta({ /* 👉 */ openapi: { method: 'GET', path: '/say-hello' } })
    .input(z.object({ name: z.string() }))
    .output(z.object({ greeting: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello ${input.name}!` };
    });
});

// 生成
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'tRPC OpenAPI',
  version: '1.0.0',
  baseUrl: 'http://localhost:3000',
});

import http from 'http';
import { createOpenApiHttpHandler } from 'trpc-openapi';

// 服务端
const server = http.createServer(createOpenApiHttpHandler({ router: appRouter })); /* 👈 */
server.listen(3000);
```
