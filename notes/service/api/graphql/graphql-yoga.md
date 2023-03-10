---
title: graphql-yoga
---

# graphql-yoga

- [dotansimha/graphql-yoga](https://github.com/dotansimha/graphql-yoga)
  - MIT, Typescript, NodeJS, Bun, Deno
  - GraphQL 服务端

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
