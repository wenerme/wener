---
title: fastify
---

# fastify

- [fastify/fastify](https://github.com/fastify/fastify)
  - MIT, JS+d.ts
  - 目前性能最好
  - 推荐使用 schema 校验输入输出
- 参考
  - [fastify.io](https://www.fastify.io)

## ecosystem
- [Core Plugins](https://www.fastify.io/ecosystem/#Core%20Plugins)
  - swagger - 支持生成
  - env, cores, cookie, compress, caching, rate-limit
  - request-context - AsyncLocalStorage - NodeJS v16.4
  - reply-from - 转发
  - schedule - CRON
  - session
  - static
  - under-pressure - 自动熔断
  - websocket - 基于 ws
- [@fastify/nextjs](https://github.com/fastify/fastify-nextjs)
  - nextjs 集成 - 不是替代 NextJS 内部的 WebServer
  - nextjs 内部默认 express
- [@fastify/redis](https://github.com/fastify/fastify-redis)
  - redis 连接插件
  - ioredis
- [@fastify/auth](https://github.com/fastify/fastify-auth)
- https://www.fastify.io/docs/latest/Guides/Ecosystem/
- [@fastify/sensible](https://github.com/fastify/fastify-sensible)
  - fastify.httpErrors - 构造 error
  - `reply.<httpError>`
  - reply.vary
  - reply.cacheControl
  - reply.preventCache
  - reply.revalidate
  - reply.staticCache
  - reply.stale
  - reply.maxAge
  - request.forwarded
  - request.is - 检测 mime 类型
  - fastify.assert
  - fastify.to - async 错误处理
### nextjs

```js
const fastify = require('fastify')();

fastify.register(require('@fastify/nextjs')).after(() => {
  fastify.next('/*');
});

fastify.listen(3000, (err) => {
  if (err) throw err;
  console.log('Server listening on http://localhost:3000');
});
```

- [Serve Next.js with Fastify](https://dev.to/applicazza/serve-next-js-with-fastify-5e67)

## fastify-cli

```bash
npm add -g fastify-cli

# fastify
# fastify-plugin
# fastify-cli
# @fastify/sensible
# https://github.com/tapjs/node-tap
fastify generate my-server --lang=ts

cd my-server
npm install # dependencies
npm start   # build:ts - fastify start -l info dist/app.js
npm build:ts
npm run dev # build:ts - watch:ts+dev:start pino-colada pretty logging
npm test
```

- [fastify/fastify-cli](https://github.com/fastify/fastify-cli)
