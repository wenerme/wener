---
title: Hono
---

# Hono

- [honojs/hono](https://github.com/honojs/hono)
  - Fast, Lightweight, Web-standards
  - 支持环境
    - Cloudflare Workers
    - Cloudflare Pages
    - Fastly Compute
    - Deno
    - Bun
    - Lagon
    - Vercel
    - AWS Lambda
    - Lambda@Edge
  - used by:
    - cdnjs
    - Polyfill.io
    - https://ultrajs.dev/ React

```bash
npm add hono @hono/node-server @hono/zod-openapi @hono/trpc-server
```

```ts
import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();
app.get('/', (c) => c.text('Hono meets Node.js'));

// for NodeJS
serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`); // Listening on http://localhost:3000
});
```

```ts
// for tRPC

import { trpcServer } from '@hono/trpc-server';
import { appRouter } from './router';

const app = new Hono();

app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
  }),
);


```

## html

1. 配置 tsconfig

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "hono/jsx"
  }
}
```

2. 使用 pragma directive

```ts
/** @jsx jsx */
/** @jsxFrag Fragment */
import { jsx, Fragment } from 'hono/jsx';
```
