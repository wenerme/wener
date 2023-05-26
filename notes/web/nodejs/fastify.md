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

## 生命周期

| phase             | hook             | abort   |
| ----------------- | ---------------- | ------- |
| Incoming          |                  |
| Routing           |                  |
| Instance Logger   |                  |
|                   | onRequest        | 4xx,5xx |
|                   | preParsing       | 4xx,5xx |
| Parsing           |                  | 4xx,5xx |
|                   | preValidation    | 4xx,5xx |
| Validation        |                  | 400     |
|                   | preHandler       | 4xx,5xx |
| User Handler      |                  | 4xx,5xx |
| Reply             |                  |
|                   | preSerialization | 4xx,5xx |
|                   | onSend           |
| Outgoing Response |                  | 4xx,5xx |
|                   | onResponse       |

## 路由

- `/data/*`
  - `req.prams['*']` 获取之后的参数

## ecosystem

- fastify
  - ajv - 验证
    - [fastify/ajv-compiler](https://github.com/fastify/ajv-compiler)
      - 避免直接依赖 ajv
  - pino - 日志
    - [jsumners/abstract-logging](https://github.com/jsumners/abstract-logging)
      - 可动态开关
  - avvio - 依赖调度顺序
  - find-my-way - 路由
  - light-my-request
  - secure-json-parse - JSON 解析
  - fast-json-stringify - JSON 序列化
    - 更快 - 2x faster than JSON.stringify()
    - 利用 schema 信息生成 stringify
    - [@fastify/fast-json-stringify-compiler](https://github.com/fastify/fast-json-stringify-compiler)
  - rfdc - Really Fast Deep Clone
- [Core Plugins](https://www.fastify.io/ecosystem/#Core%20Plugins)
  - cookie, cors, compress, caching, rate-limit, helmet, etag
  - formbody - 解析 x-www-form-urlencoded
  - multipart
  - swagger - 支持生成
    - [json-schema-resolver](https://github.com/Eomm/json-schema-resolver)
      - 处理 JSON Schema
  - env - 验证 ENV
  - request-context - AsyncLocalStorage - NodeJS v16.4
  - reply-from - 转发
  - schedule - CRON
  - session - 有状态会话
    - 使用 connect-redis 连接 redis
  - stateless-session - 无状态会话
    - 数据加密存在 Cookie
  - static - serve 静态文件
  - under-pressure - 自动熔断
  - websocket - 基于 ws
  - middie - 中间件
  - @fastify/routes - 汇聚所有路由到 Map fastify.routes
- [@fastify/sensible](https://github.com/fastify/fastify-sensible)
  - 依赖
    - forwarded - 处理转发头
    - http-errors - 构造异常
    - vary - 构造 vary 头
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
- autoload - 扫描目录加载 插件、路由
- [@fastify/nextjs](https://github.com/fastify/fastify-nextjs)
  - nextjs 集成 - 不是替代 NextJS 内部的 WebServer
  - nextjs 内部默认 express
- [@fastify/redis](https://github.com/fastify/fastify-redis)
  - redis 连接插件
  - [ioredis](https://github.com/luin/ioredis)
- @fastify/postgres
- [@fastify/auth](https://github.com/fastify/fastify-auth)
  - 提供 auth 相关 hook
  - 支持多种 auth 逻辑
- [@fastify/jwt](https://github.com/fastify/fastify-jwt)
  - jwt 验证和签名
  - fast-jwt
- [@fastify/error](https://github.com/fastify/fastify-error)
  - 构造 error
- @fastify/env
  - env-schema
- [mercurius-js/mercurius](https://github.com/mercurius-js/mercurius)
  - GraphQL servers and gateways
  - [zalando-incubator/graphql-jit](https://github.com/zalando-incubator/graphql-jit)

---

- https://www.fastify.io/docs/latest/Guides/Ecosystem/

```ts
const warning = require('process-warning')();
warning.create('FastifyDeprecation', 'FST_ERROR_CODE', 'message');
warning.emit('FST_ERROR_CODE');
```

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

## @fastify/autoload

```ts
fastify.register(Autoload, {
  dir: path.join(__dirname, 'plugins'),
  dirNameRoutePrefix: false
  // ignorePattern
  // indexPattern
  forceESM: true,
  // fastify-plugin
  encapsulate: false
})
```

## @fastify/static

```ts
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/', // optional: default '/'
});
```

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

### eject

- 生成 server

```ts
// Read the .env file.
import * as dotenv from 'dotenv';
dotenv.config();

// Require the framework
import Fastify from 'fastify';

// Require library to exit fastify process, gracefully (if possible)
import closeWithGrace from 'close-with-grace';

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
app.register(import('./app'));

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace({delay: 500}, async function ({signal, err, manual}) {
  if (err) {
    app.log.error(err);
  }
  await app.close();
} as closeWithGrace.CloseWithGraceAsyncCallback);

app.addHook('onClose', async (instance, done) => {
  closeListeners.uninstall();
  done();
});

// Start listening.
app.listen({port: parseInt(process.env.PORT) || 3000}, (err: any) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
```

## ajv

- 默认 Ajv v8, Draft 07
- https://github.com/fastify/ajv-compiler/blob/main/index.js#L9-L18

```ts
const defaultAjvOptions = {
  coerceTypes: 'array',
  useDefaults: true,
  removeAdditional: true,
  uriResolver: fastUri,
  addUsedSchema: false,
  // Explicitly set allErrors to `false`.
  // When set to `true`, a DoS attack is possible.
  allErrors: false,
};
```

## You cannot use `send` inside the `onError` hook

## Request body is too large

默认 1MiB
