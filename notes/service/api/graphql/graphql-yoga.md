---
title: graphql-yoga
---

# graphql-yoga

- [dotansimha/graphql-yoga](https://github.com/dotansimha/graphql-yoga)
  - MIT, Typescript
  - 支持 NodeJS, Bun, Deno, Cloudflare Worker
  - 支持 Next.js, SvelteKit, uWebSockets, Fastify, NestJS
  - GraphQL 服务端
- 参考
  - 内部使用 [@whatwg-node/server](https://github.com/ardatan/whatwg-node) 作为 adapter

```ts
import { createSchema, createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => 'Hello from Yoga!',
      },
    },
  }),
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql');
});
```
