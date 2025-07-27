---
title: bun
---

# bun

- [oven-sh/bun](https://github.com/oven-sh/bun)
  - MIT, Zig
  - JavaScriptCore,tinycc,libiconv LGPLv2
  - boringssl,libarchive,libiconv,lol-html,mimalloc,picohttp,tinycc,uSockets,zlib-cloudflare,libicu,uWebsockets
- @types/bun, ~~bun-types~~
  - typing
- 参考
  - [SaltyAom/bun-http-framework-benchmark](https://github.com/SaltyAom/bun-http-framework-benchmark)
  - [oven-sh/awesome-bun](https://github.com/oven-sh/awesome-bun)

:::caution

- Roadmap [#159](https://github.com/oven-sh/bun/issues/159)
- bun:ffi 能力是独一无二的
  - 可以为了 ffi 而使用 bun
- bun 目前还不适用于通用的生产环境
  - 相对来说，bun 更适用于前端项目而不是后端项目，因为 后端 项目通常需要更多的 node 兼容模块
- bun 非常不建议直接用于后端
  - 可能会遇到各式各样无法修复的错误
  - 库的开发者一般也不会针对 bun 测试
- deploy [bun#211](https://github.com/oven-sh/bun/issues/211)
- 未实现 ~~dns~~, ~~http2~~, https, child_process, vm, tls, async_hooks, worker_threads, inspector
- 未实现 HTTP request body streaming
  - Streaming upload with fetch [#6017](https://github.com/oven-sh/bun/issues/6017)
- 兼容
  - 支持 vitest [#4145](https://github.com/oven-sh/bun/issues/4145)
  - 支持 ReactNative [#123](https://github.com/oven-sh/bun/issues/123)
  - fetch 100 continue 问题 [#7428](https://github.com/oven-sh/bun/issues/7428)
    - S3 SDK, fetch 请求
  - ~~支持 NestJS [#1641](https://github.com/oven-sh/bun/issues/1641)~~

:::

:::tip

- bun 嵌入了 tinycc，有 jit 能力，因此 ffi 效率非常高
- bun 还处于非常早期开发阶段
- 使用 JavaScriptCore - 各有优缺点
- bun 一些点的性能很好，但整体应用性能比不上 node

:::

```bash
# Manually Install
# =======================
# macOS
curl -LO https://github.com/oven-sh/bun/releases/download/bun-v1.2.19/bun-darwin-x64.zip
unzip bun-darwin-x64.zip
mv bun-darwin-x64/bun ~/bin/
xattr -r -d com.apple.quarantine ~/bin/bun
bun -v

bun upgrade          # 升级
bun upgrade --canary # 升级到尚未发布版本 - bun 开发很快，可以提前尝试一些特性

docker run --rm -it wener/bun bun -v
docker run --rm --init --ulimit memlock=-1:-1 oven/bun # 官方镜像
docker run -it --rm -v $PWD:/host -w /host -p 3000:3000 --entrypoint bash oven/bun:debian

# 安装脚本
curl -fsSL https://bun.com/install | bash
```

```bash
bun bun src/index.js
# https://github.com/oven-sh/bun/issues/211
./node_modules.bun > ./node_modules.js
```

```bash
npm add -D @types/bun
```

## ffi

- 目前应该无法将 number 转换为 Pointer

```ts
// 注意转换为 CString 需要 \0 结尾
function ptrOfStr(s?: string) {
  return typeof s === 'string' ? ptr(Buffer.from(s + '\0', 'utf8')) : null;
}
```

- 64 bit 的 processor 使用52bit 的地址空间
  - js 支持 53bit 的整数
  - https://en.wikipedia.org/wiki/64-bit_computing#Limits_of_processors
- 不支持 struct
  - https://github.com/oven-sh/bun/issues/6139
  - 使用 toArrayBuffer 和 read 来直接获取 ptr 数据

```ts
import { viewSource } from 'bun:ffi';

// 生成的 C 代码
console.log(
  viewSource(
    {
      hello_world: {
        returns: 'float',
        args: ['float'],
      },
    },
    false,
  )[0],
);
```

```ts
import { dlopen, FFIType } from 'bun:ffi';

// /lib/x86_64-linux-gnu/libc.so.6
// /usr/lib/x86_64-linux-gnu/libc.so.6
const { printf } = dlopen('libc.so.6', {
  printf: { args: [FFIType.cstring, FFIType.f64] },
}).symbols;

printf(new TextEncoder().encode('%.17f\n'), 4);
```

## memory

- https://bun.sh/docs/project/benchmarking#measuring-memory-usage
- MIMALLOC_SHOW_STATS=1

```ts
Bun.gc(true); // synchronous
Bun.gc(false); // asynchronous
```

## macro

- 类似 inline+预执行

```ts
import { random } from './random.ts' with { type: 'macro' };
```

## compile

```bash
# --sourcemap --minify --target bun-linux-x64-modern
# 90MB+
bun build --compile ./src/main.ts --outfile myapp --external={pg-query-stream,better-sqlite3,tedious,oracledb,mysql2,sqlite3,mysql} --external=@mikro-orm/{migrations,entity-generator,better-sqlite,sqlite,mariadb,mysql,mongodb,seeder}
```

## debug

```bash
bun --inspect server.ts
```

# FAQ

## hono

```
Failed to find Response internal state key
```

- 检查下是不是用了 node 的 serve 而不是 Bun.serve
- https://github.com/honojs/hono/issues/2466

## Failed to open library. This is usually caused by a missing library or an invalid library path.

检查下是不是 arch 错了。
