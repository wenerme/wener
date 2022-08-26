---
title: trpc
---

# trpc

- [trpc/trpc](https://github.com/trpc/trpc)
- @trpc/next - NextJS
- spec
  - https://trpc.io/docs/rpc

:::caution

- 不支持 react-query 4 [#2243](https://github.com/trpc/trpc/issues/2243)
- Support for additional Content-Types [#](https://github.com/trpc/trpc/issues/1937)

:::

```bash
npm add @trpc/client @trpc/server
```

```ts
import * as trpc from '@trpc/server';
import {z} from 'zod';

const appRouter = trpc
  .router()
  .query('getUser', {
    input: (val: unknown) => {
      if (typeof val === 'string') return val;
      throw new Error(`Invalid input: ${typeof val}`);
    },
    async resolve(req) {
      req.input; // string
      return {id: req.input, name: 'Bilbo'};
    },
  })
  .mutation('createUser', {
    // validate input with Zod
    input: z.object({name: z.string().min(5)}),
    async resolve(req) {
      // use your ORM of choice
      return await UserModel.create({
        data: req.input,
      });
    },
  });

export type AppRouter = typeof appRouter;
```

## fastify

```ts title="context.ts"
import {inferAsyncReturnType} from '@trpc/server';
import {CreateFastifyContextOptions} from '@trpc/server/adapters/fastify';

export function createContext({req, res}: CreateFastifyContextOptions) {
  const user = {name: req.headers.username ?? 'anonymous'};

  return {req, res, user};
}

export type Context = inferAsyncReturnType<typeof createContext>;
```

```ts
import {fastifyTRPCPlugin} from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import {createContext} from './context';
import {appRouter} from './router';
import ws from '@fastify/websocket';

const server = fastify({
  maxParamLength: 5000,
});

// 支持 subscription
server.register(ws);

server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: {router: appRouter, createContext},
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
