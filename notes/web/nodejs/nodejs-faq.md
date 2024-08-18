---
title: NodeJS FAQ
tags:
  - FAQ
---

# NodeJS FAQ

- NODE_OPTIONS

:::caution

- 持久化 DB 存储是 NodeJS 的弱项
  - 纯 JS 没有好的存储实现
  - SQLite 依赖 addon
  - SQLite over WASM 还不成熟

:::

## Tool Chain

- 静态项目 - ViteJS
- 前端项目 - NextJS+trpc+NestJS - 复杂项目
  - 部分 NestJS 逻辑共用
  - 输出 standalone 模式 - 直接拷贝到容器即可
- 后端项目 - NestJS+fastify
  - 开发: ts-node --swc --esm --transpileOnly --watch src/main.ts
    - tsx 不支持 decorator，不然可以用 tsx
  - 构建: esbuild --bundle --external=sharp src/main.ts
    - 输出一个 js 放到容器即可
    - 注意加 tsc 插件处理 decorator
- 基础依赖
  - zod
  - valtio, zustand
  - daisyui, styled-components
  - dayjs

```bash
pnpm node --loader ts-node/esm --watch ./src/apps/ve-contract-server/main.ts
```

```json title="tsconfig.json"
{
  "ts-node": {
    "transpileOnly": true,
    "swc": true,
    "esm": true,
    "files": true,
    "experimentalSpecifierResolution": "node"
  }
}
```

## Node Dev

- ts+watch - tsx, ts-node, swc-node
  - +decorator
    - ts-node+swc
  - +tsconfig.paths
    - tsx, ts-node+tsconfig-paths
    - +esm
      - tsx
- 目前还没有 esm+tsconfig.paths+decorator 的

---

- ts-node+swc 问题
  - 不加载 swcrc 导致 paths 无效 https://github.com/TypeStrong/ts-node/issues/1856
  - pnpm patch 临时解决
- esbuild decorator 问题
  - https://github.com/evanw/esbuild/issues/104
  - https://github.com/nuxt/nuxt/issues/21756
  - https://github.com/unjs/nitro/issues/1345
- swc-node 处理 .ts 问题
  - https://github.com/swc-project/swc-node/pull/744
  - https://github.com/swc-project/swc-node/issues/710
- tsconfig-paths esm 问题
  - https://github.com/dividab/tsconfig-paths/issues/243

## 选择包管理器 {#choose-pm}

> 选择 pnpm

- pnpm
  - 速度快
  - 使用 hardlink - 节省空间，速度快
    - 如果在 wsl 可能用不了 hardlink，回退为 softlink 或者 copy 方式
  - 意外情况比较少
  - workspace 支持完善
- npm
  - node_modules 太大
  - 安装慢
  - 如果 pnpm 不兼容的情况可以考虑 npm
- yarn v1
  - 比 npm 好一点 - 区别越来越小
  - 支持 workspace
- yarn berry
  - 很多工具不支持
  - pnp 方式生态推进慢
  - 不建议使用

## shebang

**CJS**

```ts
#!/usr/bin/env node
```

**ESM**

```bash
#!/usr/bin/env bash
":" //# comment
exec /usr/bin/env node --input-type=module - "$@" < "$0"
```

**NodeJS 20.10+**

```bash
node --experimental-default-type=module cli
```

- ESM
  - 增加 mjs 文件后缀即可
  - https://github.com/nodejs/node/issues/49444
  - https://github.com/orgs/nodejs/discussions/37857
- --experimental-default-type

## performance

- UV_THREADPOOL_SIZE=4
  - 最大 1024
- knex
  - pool min:2, max: 10
- fastify
- [fast-json-stringify](https://github.com/fastify/fast-json-stringify)
- find-my-way

## musl

- 非官方构建 https://unofficial-builds.nodejs.org/download/release/v20.11.1/
  - 构建仓库 [nodejs/unofficial-builds](https://github.com/nodejs/unofficial-builds)
  - 只有 x64-musl
- arm64/aarch64
  - 暂无
  - https://github.com/nodejs/node/pull/45756
  - https://github.com/nodejs/unofficial-builds/pull/59
  - [nodejs/unofficial-builds#104](https://github.com/nodejs/unofficial-builds/issues/104)

## sqlite3

```bash
# ./node_modules/sqlite3/build/Release/node_sqlite3.node
find ./node_modules/sqlite3/ -iname '*.node'

npm install sqlite3 --build-from-source
```

## source map

- sourcemap 大了过后非常慢
- 例如: main.mjs 10mb, main.mjs.map 20mb
  - --enable-source-maps 启动 40s
  - 直接启动 2s
  - `-r @cspotcode/source-map-support/register`
- NodeJS 12.12.0 [--enable-source-maps](https://nodejs.org/docs/latest-v16.x/api/cli.html#--enable-source-maps)
- https://github.com/evanw/node-source-map-support
- https://github.com/cspotcode/source-map-performance-demo#example-output
- https://github.com/cspotcode/node-source-map-support
  - 性能更好
- esbuild
  - 排除 node_modules https://github.com/evanw/esbuild/issues/1685#issuecomment-944916409
  - 排除 sourcesContent
    - 包含完整 source code - 如果只用于 stack trace 则不需要
    - https://esbuild.github.io/api/#sources-content

```ts
import '@cspotcode/source-map-support/register';
```

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

```
TypeError: Cannot set property duplex of #<Request> which has only a getter
```

```ts
let init: RequestInit & Record<string, any> = {
  get duplex() {
    return 'half';
  },
};
```

- https://github.com/nodejs/node/issues/46221
- https://github.com/whatwg/fetch/issues/1254

## Critical dependency: require function is used in a way in which dependencies cannot be statically extracted

检查下是不是 import 路径错误，可能因为 IDE 自动导入，指向了错误路径。

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

## Reached heap limit Allocation failed - JavaScript heap out of memory

```bash
NODE_OPTIONS="--max-old-space-size=8192" eslint --fix
```

- `DEBUG=*`
- `DEBUG=typescript-eslint`
- `TIMING=1`

## Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory

- 可增加

```bash
node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))'
NODE_OPTIONS="--max-old-space-size=8192" node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))'
```

- 2048
- 4096
- 4144
- 5120
- 6144
- 7168
- 8192
- 16384
- https://nodejs.org/api/cli.html#--max-old-space-sizesize-in-megabytes
- https://chromium.googlesource.com/v8/v8.git/+/refs/tags/10.3.129/src/heap/heap.cc#314
- [v8](../browser/v8.md)

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

- 使用 snapshot 加速启动
  - 例如: main.mjs 10mb, main.mjs.map 20mb
    - --enable-source-maps 启动 40s
    - 无 `enable-source-maps` 启动 2s
- NODE_COMPILE_CACHE
  - v22.1.0+
  - 支持 cjs & esm

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
- RFC: speeding up Node.js startup using V8 snapshot [#17058](https://github.com/nodejs/node/issues/17058)
- https://github.com/microsoft/TypeScript/issues/25658

## fastify vs express

- fastify
  - 更快
    - fast-json-stringify
  - 模块化
  - 更易用
- express
  - 更成熟？
  - monolithic
  - 生态更大 - 功能更多

## import npm global

```bash
export NODE_PATH=$(npm root --quiet -g)
```

## ERR_OSSL_EVP_UNSUPPORTED

```
Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:71:19)
    at Object.createHash (node:crypto:133:10)
    at BulkUpdateDecorator.hashFactory (~/node_modules/.pnpm/webpack@5.39.0_webpack-cli@4.7.2/node_modules/webpack/lib/util/createHash.js:145:18)
```

- pnpm 安装有问题，换 npm 后好了

## getaddrinfo ENOTFOUND undefined

```js
fetch(`http://example.com`);
```

## 命令行获取 package 所在目录

```bash
pnpm pwd
pnpm node -e 'process.stdout.write(path.resolve(__dirname))'
```

```makefile
PKG_ROOT ?= $(shell pnpm node -e 'process.stdout.write(path.resolve(__dirname))')
```

## ioredis vs redis

> ⚠️ ioredis 在被 redis 收编后不在怎么维护

- @redis/client
  - 官方主推
  - 开发相对活跃
- ioredis
  - 更好用
  - 接口更友好
  - 更快
  - Is this package still actively maintained? [redis/ioredis#1870](https://github.com/redis/ioredis/issues/1870)
- iovalkey
  - fork ioredis
  - 目前开发还不太活跃
  - [valkey-io/iovalkey](https://github.com/valkey-io/iovalkey)
- https://www.reddit.com/r/node/comments/uymb7w/redis_vs_ioredis/
- https://ably.com/blog/migrating-from-node-redis-to-ioredis
  - ably 从 node-redis 迁移为 ioredis

## The operation failed for an operation-specific reason: Cipher job failed

## Failed to execute 'digest' on 'SubtleCrypto': 2nd argument is not instance of ArrayBuffer, Buffer, TypedArray, or DataView.

多半是传入了 undefined

## detect runtime

- bun 也会设置 process.versions.node

```js
console.log(process.release.name); // 总是 node

// bun
if (process.versions.bun) {
}
if (typeof Bun !== 'undefined') {
}
```
