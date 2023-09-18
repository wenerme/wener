---
title: bun
---

# bun

- [oven-sh/bun](https://github.com/oven-sh/bun)
  - MIT, Zig
  - JavaScriptCore,tinycc,libiconv LGPLv2
  - boringssl,libarchive,libiconv,lol-html,mimalloc,picohttp,tinycc,uSockets,zlib-cloudflare,libicu,uWebsockets
- bun-types
  - typing

:::caution

- musl 支持
  - [#918](https://github.com/oven-sh/bun/issues/918)
  - [#255](https://github.com/oven-sh/bun/issues/255)
- deploy [bun#211](https://github.com/oven-sh/bun/issues/211)
- ~~无 dns 模块~~ - 0.5+ - pg 不支持 [#288](https://github.com/oven-sh/bun/issues/288)
- 无 async_hooks - sequelize 不支持
- 未实现 ~~dns~~, http2, https, child_process, vm, tls, async_hooks, worker_threads
- 支持 NestJS [#1641](https://github.com/oven-sh/bun/issues/1641)

:::

:::tip

- bun 嵌入了 tinycc，有 jit 能力，因此 ffi 效率非常高
- bun 还处于非常早期开发阶段 - not prodution ready
- 使用 JavaScriptCore - 各有优缺点
- bun 一些点的性能很好，但整体应用性能比不上 node

:::

```bash
# Manually Install
# =======================
curl -LO https://ghproxy.com/https://github.com/oven-sh/bun/releases/download/bun-v1.0.0/bun-darwin-x64.zip
unzip bun-darwin-x64.zip
mv bun-darwin-x64/bun ~/bin/
xattr -r -d com.apple.quarantine ~/bin/bun
bun -v

bun upgrade          # 升级
bun upgrade --canary # 升级到尚未发布版本 - bun 开发很快，可以提前尝试一些特性

docker run --rm -it wener/bun bun -v
docker run --rm --init --ulimit memlock=-1:-1 oven/bun # 官方镜像
```

```bash
bun bun src/index.js
# https://github.com/oven-sh/bun/issues/211
./node_modules.bun > ./node_modules.js
```

## ffi

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

## macro
- 类似 inline+预执行

```ts
import { random } from './random.ts' with { type: 'macro' };
```

## compile

```bash
# 90MB+
bun build --compile ./src/main.ts  --outfile myapp --external={pg-query-stream,better-sqlite3,tedious,oracledb,mysql2,sqlite3,mysql} --external=@mikro-orm/{migrations,entity-generator,better-sqlite,sqlite,mariadb,mysql,mongodb,seeder}
```

# FAQ
