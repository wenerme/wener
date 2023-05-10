---
title: NodeJS FAQ
tags:
  - FAQ
---

# NodeJS FAQ

## arm64/aarch64 musl

- 暂无
- https://github.com/nodejs/node/pull/45756
- https://github.com/nodejs/unofficial-builds/pull/59

## source map

- NodeJS 12.12.0 [--enable-source-maps](https://nodejs.org/docs/latest-v16.x/api/cli.html#--enable-source-maps)
- https://github.com/evanw/node-source-map-support

## cjs `__dirname`

```js
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
```

## 直接执行 typescript 或 esnext

- tsx
- ts-node
- babel
- tsm

```bash
# tsx
# ==========
npx tsx app.ts
node --loader tsx app.ts
node --loader @esbuild-kit/esm-loader app.ts

# ts-node
# ==========
node -r @ts-node/register app.ts
# tsconfig 里的 path 能生效
node -r @ts-node/register -r tsconfig-paths/register app.ts

# babel
# ==========
node -r @babel/register app.js
```

## Package 'OpenEXR', required by 'vips', not found

找不到 brew 安装的 pkgconfig

```bash
PKG_CONFIG_PATH=/usr/local/opt/vips/lib/pkgconfig:/usr/local/opt/glib/lib/pkgconfig:/usr/local/opt/openexr/lib/pkgconfig:/usr/local/opt/imath/lib/pkgconfig npm i
```

```
/usr/local/include/vips/vips8:35:10: fatal error: 'glib-object.h' file not found
```

```bash
# export CC
export CXX="$(which g++) -I/usr/local/opt/glib/include/glib-2.0/ -I/usr/local/opt/glib/lib/glib-2.0/include/"

export CXX="$(which g++) $(pkg-config --cflags glib-2.0)"
```

- sharp -> libvips version 8.12.2+ is required
- ubuntu 22.04 jammy
  - https://packages.ubuntu.com/search?searchon=sourcenames&keywords=vips

## libtool: unrecognized option -static when building

```
libtool:   error: unrecognised option: '-static'
```

```bash
brew unlink libtool
rm -rf /usr/local/bin/libtool
which libtool

# 如果添加了 /usr/local/opt/libtool/libexec/gnubin
export PATH=$(echo $PATH | sed -r 's/:[^:]*?libtool[^:]*:/:/')
```

## require() of ES modules is not supported

尝试降级依赖

- ts 可配置 "module": "esnext"
- 然后 package.json 修改 type: module
  - 影响很大
- 参考
  - [node-fetch/node-fetch#1266](https://github.com/node-fetch/node-fetch/issues/1266)

## NodeJS v18 fetch proxy

- 不支持 Agent
- 用 node-fetch 或者 undici

```js
const Undici = requuire('undici');
const ProxyAgent = Undici.ProxyAgent;
const setGlobalDispatcher = Undici.setGlobalDispatcher;

setGlobalDispatcher(new ProxyAgent(process.env.HTTP_PROXY));
```

- [node#43187](https://github.com/nodejs/node/issues/43187)
- [gajus/global-agent#52](https://github.com/gajus/global-agent/issues/52#issuecomment-1134525621)

## RequestInit: duplex option is required when sending a body

- https://github.com/nodejs/node/issues/46221

## Critical dependency: require function is used in a way in which dependencies cannot be statically extracted

检查下是不是 import 路径错误，可能因为 IDE 自动导入，指向了错误路径。

## async context

```ts
const cls = require('cls-hooked');
const namespace = cls.createNamespace('my-very-own-namespace');
```

- https://nodejs.org/api/async_context.html
  - `import { AsyncLocalStorage, AsyncResource } from 'node:async_hooks';`
  - AsyncLocalStorage - node v12.17+
  - [async_hooks](https://github.com/nodejs/node/blob/main/doc/api/async_hooks.md) - node v8+
    - currentId()
    - triggerAsyncId()
    - executionAsyncId()

```ts
// node 8+
import { createHook } from 'async_hooks';
const hook = createHook({
  init: (asyncId, type, triggerId, resource) => {},
  before: (asyncId) => {},
  after: (asyncId) => {},
  destroy: (asyncId) => {},
});
hook.enable();

// ALS
// v13.10.0, v12.17.0
import { AsyncLocalStorage } from 'node:async_hooks';
const asyncLocalStorage = new AsyncLocalStorage();
asyncLocalStorage.run(123, () => {
  console.log(`Store: ${asyncLocalStorage.getStore()}`);
  setImmediate(() => {
    console.log(`setImmediate Store: ${asyncLocalStorage.getStore()}`);
  });
});
```

- [@fastify/request-context](https://github.com/fastify/fastify-request-context)
  - asynchronous-local-storage
  - async_hooks
    - `new AsyncResource('fastify-request-context')`
  - onRequest - 包装运行环境
    - als.runWith
      - AsyncResource.runInAsyncScope(done,req,raw)

```ts
const { als } = require('asynchronous-local-storage');
const requestContext = {
  get: als.get,
  set: als.set,
};
```

- https://sequelize.org/docs/v7/other-topics/transactions
  - `const namespace = cls.createNamespace('sequelize-tx');`
  - [useCLS](https://github.com/sequelize/sequelize/blob/fdd713172748a6c86b656500df2aed8cba096492/src/sequelize.js#L1147-L1158)
    - get, set, bind, run
    - `bind(fn,context): ()=>any`
  - prepareEnvironment
    - 开启事务
    - `this.sequelize.Sequelize._cls.set('transaction', this);`
- [asynchronous-local-storage](https://github.com/kibertoad/asynchronous-local-storage)
  - Node.js ALS with fallback to cls-hooked
- [cls-hooked](https://github.com/Jeff-Lewis/cls-hooked)
  - node 4.7+ - async-hook-jl
  - node 8+ - async_hooks
  - fork 自 continuation-local-storage
- [continuation-local-storage](https://github.com/othiym23/node-continuation-local-storage)

## gyp

- 依赖 apk add --no-cache python3 g++ gcc make
  - 最好使用 prebuild
  - 如果出现了从源码构建，先排查为什么会导致构建

```bash
# 强制从源码构建
npm install sqlite3 --build-from-source=sqlite3

# 查看 binary 地址
# 注意 module_name 可能不同于 npm 包名
npm view sqlite3@3.1.3 binary             # aws
npm view sqlite3@5.1.0 binary.module_name # github

# install 包含 platform 和 libc 条件
npm install --platform=linux --libc=libc --registry https://npm.wener.me/

npm install sqlite3 --node_sqlite3_binary_host_mirror=https://npmmirror.com/mirrors/sqlite3

# 根据平台 rebuild
node-pre-gyp rebuild --target=0.30.2 --arch=x32 --target_platform=win32 --dist-url=https://atom.io/download/atom-shell
```

- --{module_name}\_binary_host_mirror

## Undefined variable module_name in binding.gyp while trying to load binding.gyp

可能 npm 问题，使用 pnpm 构建没问题

## Custom ESM Loaders is an experimental feature. This feature could change at any time

目前无法 supress 警告, 只能通过 require 注入避免

```bash
node --require suppress-experimental.cjs --loader tsx app.ts
```

```js title="suppress-experimental.cjs"
'use strict';
// When using the ESM loader Node.js prints either of the following warnings
//
// - ExperimentalWarning: --experimental-loader is an experimental feature. This feature could change at any time
// - ExperimentalWarning: Custom ESM Loaders is an experimental feature. This feature could change at any time
//
// Having this warning show up once is "fine" but it's also printed
// for each Worker that is created so it ends up spamming stderr.
// Since that doesn't provide any value we suppress the warning.
const originalEmit = process.emit;
// @ts-expect-error - TS complains about the return type of originalEmit.apply
process.emit = function (name, data, ...args) {
  if (
    name === `warning` &&
    typeof data === `object` &&
    data.name === `ExperimentalWarning` &&
    (data.message.includes(`--experimental-loader`) ||
      data.message.includes(`Custom ESM Loaders is an experimental feature`))
  )
    return false;

  // return originalEmit.apply(process, arguments as unknown as Parameters<typeof process.emit>);
  return originalEmit.apply(process, arguments);
};
```

- https://github.com/nodejs/node/issues/30810

## Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory

- 可增加

```bash
node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))'
NODE_OPTIONS="--max-old-space-size=8192" node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))'
```

- 2048
- 4096
- 5120
- 6144
- 7168
- 8192
- 16384

## Can't resolve 'pg-native'

- 用个假的模块替代，避免编译
- https://github.com/brianc/node-postgres/issues/838
  when using babel, pg-native is always required

```js
// webpack
export default {
  resolve: {
    alias: {
      'pg-native': path.join(__dirname, 'pg-native'),
    },
  },
};
```

**pg-native**

```json
{
  "name": "pg-native",
  "private": true,
  "main": "index.js"
}
```

```json
{
  "name": "your-module",
  "private": true,
  "dependencies": {
    "pg": "^8.3.3",
    "pg-native": "file:./modules/pg-native"
  }
}
```

```js
module.exports = null;
```

## REPL load

```bash
node -i -e "$(< rc.js)"
```

- `.load`
  - https://nodejs.org/api/repl.html#repl_design_and_features

## error:0308010C:digital envelope routines::unsupported

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

- https://stackoverflow.com/questions/69692842

## snapshot

```bash
echo "globalThis.foo = 'I am from the snapshot'" > snapshot.js
node --snapshot-blob snapshot.blob --build-snapshot snapshot.js
echo "console.log(globalThis.foo)" > index.js
node --snapshot-blob snapshot.blob index.js

echo "require('v8').startupSnapshot.setDeserializeMainFunction(() => console.log('I am from the snapshot'))" > snapshot.js
node --snapshot-blob snapshot.blob --build-snapshot snapshot.js
node --snapshot-blob snapshot.blob
```

- 不支持 ESM https://github.com/nodejs/help/issues/3981

## 检测在 ts-node 运行

```ts
var detectTSNode = false;

try {
    if (process[Symbol.for("ts-node.register.instance")]) {
        detectTSNode = true;
    }
} catch() {
}
```

- https://github.com/yorickdevries/detect-ts-node/blob/master/index.js
