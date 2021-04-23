---
title: NextJS Internal
---

# NextJS Internal

- target
  - server
  - serverless
    - 会 bundle node_modules 内容
    - 使用并不理想
  - serverless-trace
    - serverless 但不 bundle node_modules

## 默认 next start

默认服务启动逻辑

```js
import http from 'http';
import next from 'next';

// https://github.com/zeit/next.js/blob/canary/packages/next/server/lib/start-server.ts
export default async function start(serverOptions: any, port?: number, hostname?: string) {
  const app = next(serverOptions);
  const srv = http.createServer(app.getRequestHandler());
  await new Promise((resolve, reject) => {
    // This code catches EADDRINUSE error if the port is already in use
    srv.on('error', reject);
    srv.on('listening', () => resolve());
    srv.listen(port, hostname);
  });
  // It's up to caller to run `app.prepare()`, so it can notify that the server
  // is listening before starting any intensive operations.
  return app;
}

// https://github.com/zeit/next.js/blob/canary/packages/next/cli/next-start.ts
import { resolve } from 'path';

const dir = resolve(args._[0] || '.');
const port = args['--port'] || 3000;

start({ dir }, port, args['--hostname'])
  .then(async (app) => {
    // tslint:disable-next-line
    console.log(`> Ready on http://${args['--hostname'] || 'localhost'}:${port}`);
    await app.prepare();
  })
  .catch((err) => {
    // tslint:disable-next-line
    console.error(err);
    process.exit(1);
  });
```

## 最简自定义 server

- 使用自定义 server 则不需要 next start

```js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
```
