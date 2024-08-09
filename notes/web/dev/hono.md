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
npm add -D typescript @types/node vitest

# MISC
npm add dotenv @nestjs/common @wener/nestjs @wener/utils

# for Bun
npm add -D @types/bun

# for Dev
npm add -D ts-node esbuild @swc/cli

npm node --loader ts-node/esm --watch ./src/main.ts

# build
# =====================
# swc support decorate
pnpm swc ./src -d ./dist/out
# bundle all deps
pnpm esbuild ./dist/out/main.js --external:{http,fs,path,stream,crypto,os,node:\*} --define:process.env.NODE_ENV=\"production\" --bundle --format=esm --outdir=dist/app --minify-syntax --charset=utf8 --target=es2022,node20 --sourcemap=external --legal-comments=external

cat << EOF
FROM wener/node:20

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY rootfs /

RUN mkdir -p /app && chown -R nodejs:nodejs /app
USER nodejs
# for Native Addon
#RUN --mount=type=cache,target=/home/nodejs/.npm,uid=1001,gid=1001 \
#    npm i sharp pg mysql2 --platform=linuxmusl

COPY --chown=nodejs:nodejs dist/app/ /app/

CMD [ "node" , "--enable-source-maps", "main.mj" ]
EOF

echo '{"name": "server","type": "module"}' > dist/app/package.json
docker buildx build -t server --load --platform linux/amd64 .
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

## Notes

- App - Hono
  - use = ALL 方法 = all -> `on(['ALL'],path,handler)`
  - on - 支持多个方法、多个 path
  - route
    - 将另外一个 app 的所有 routes 添加到当前 app
    - 指定的 path 会作为 basePath 添加到另外一个 app
  - mount
    - 挂载基于 fetch 接口的 handler
    - 相当于 `ALL /path/*` -> `handler`
  - fetch - 入口
  - fire
    - `addEventListener('fetch')` - 用于 edge 环境
    - FetchEventLike
    - https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
    - https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
  - request
    - 辅助用于测试 - 接受 ExecutionContext 和 Envs
    - 不需要完整 URL
    - 实际调用 fetch
  - 特殊 handler
    - onError
    - notFound
- Routing
  - `/posts/:id/comment/:comment_id`
  - `/api/animal/:type?` - 可选
  - `/post/:date{[0-9]+}/:title{[a-z]+}` - 正则
  - `/posts/:filename{.+\\.png$}` - 包含 slash
  - `*`
  - `/wild/*/card`

```ts
const app = new Hono({
  // 处理带 Host
  getPath: (req) => req.url.replace(/^https?:\/(.+?)$/, '$1'),
});

app.get('/www1.example.com/hello', (c) => c.text('hello www1'));
app.get('/www2.example.com/hello', (c) => c.text('hello www2'));
```

- @hono/zod-openapi
  - 生成 openapi
  - 但是写起来非常的麻烦
  - 基于 [asteasolutions/zod-to-openapi](https://github.com/asteasolutions/zod-to-openapi)
- @hono/node-server
  - fetch -> listener
    - listener
      - incoming: IncomingMessage | Http2ServerRequest
      - outgoing: ServerResponse | Http2ServerResponse
  - 会修改 Reuqest
  - https://github.com/honojs/node-server/blob/main/src/request.ts

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

# FAQ

## Hijack

- 如果已经处理，则返回 RESPONSE_ALREADY_SENT

```ts
import { serve } from '@hono/node-server';
import type { HttpBindings } from '@hono/node-server';
import { RESPONSE_ALREADY_SENT } from '@hono/node-server/utils/response';
import { Hono } from 'hono';

const app = new Hono<{ Bindings: HttpBindings }>();

app.get('/', (c) => {
  const { outgoing } = c.env;
  outgoing.writeHead(200, { 'Content-Type': 'text/plain' });
  outgoing.end('Hello World\n');

  return RESPONSE_ALREADY_SENT;
});
```
