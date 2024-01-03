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

cat <<EOF
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
