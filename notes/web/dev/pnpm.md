---
title: pnpm
---

# pnpm

- [pnpm](https://github.com/pnpm/pnpm)
  - since 2017
  - 速度快、节省空间
- Store - `pnpm store path`
  - Windows ~/AppData/Local/pnpm/store
  - macOS ~/Library/pnpm/store
  - Linux ~/.local/share/pnpm/store
  - 项目下虚拟 Store ./node_modules/.pnpm
    - hardlink 到全局 store
  - .pnpm-store
  - [content-addressable storage](https://pnpm.io/next/symlinked-node-modules-structure)
- 支持 workspace 引用 - `"button": "workspace:1.0.0",`
- .npmrc - https://pnpm.io/npmrc
  - workspace 要求必须存在
- **采用**: next.js, vite, vue3
  - 因为 yarn 2+/berry 变化太大，无法使用 - 同时 yarn v1 开发停滞，导致大量项目迁移 pnpm
- 参考
  - https://pnpm.io/benchmarks
  - https://pnpm.io/motivation#creating-a-non-flat-node_modules-directory
  - https://blog.logrocket.com/javascript-package-managers-compared/
  - migration stories
    - [vercel/next.js#37259](https://github.com/vercel/next.js/pull/37259)
      - 从 yarn v1 迁移到 pnpm 安装时间减半
    - https://divriots.com/blog/switching-to-pnpm

:::caution

- Typescript 可能检测不到类型，出现类型异常 [TypeScript#29808](https://github.com/microsoft/TypeScript/issues/29808)
  - 尝试 `"preserveSymlinks": true`
- pnpm store path
  - 默认会在相同磁盘 - 因为 hardlink 需要相同磁盘

:::

:::info

- pnpm monorepo docker support [#1637](https://github.com/pnpm/pnpm/issues/1637)
  - monorepo 无法分离单个模块依赖，会包含所有依赖
- Support workspaces from package.json [#2255](https://github.com/pnpm/pnpm/issues/2255)
  - yarn & pnpm 使用不同的名词描述
- import npm 项目时，旧的依赖放到 node_modules/.ignored

:::

```bash
npm i -g pnpm
# by corepack
# corepack prepare pnpm --activate

# 基本操作同 npm

pnpm install --filter @wener/demo # 选择性安装
pnpm env use --global lts         # 使用 LTS 版本 Node.js

pnpm root # 返回当前 node_modules 路径
pnpm bin  # 返回当前 node_modules/.bin 路径

# store 管理
# ==========
pnpm store status
# pnpm store add <package> # 等同于 pnpm add
pnpm store prune # 移除未引用的包
pnpm store path  # 路径
```

```ini title=".npmrc"
strict-peer-dependencies = false
auto-install-peers = true
public-hoist-pattern[]=*jest*
```

- ~/Library/pnpm
- NODE_PATH=$HOME/Library/pnpm/global/5/.pnpm/node_modules

## 配置

- strict-peer-dependencies
- auto-install-peers
  - 迁移时可以开启，之后建议关闭
  - missing non-optional peer dependencies are automatically installed
  - 可能导致问题
    - https://github.com/pnpm/pnpm/issues/5144#issuecomment-1207261343
- legacy-peer-deps
  - NPMv7 配置
  - 恢复为 NPMv4 - NPMv6 行为
  - bypass peerDependency auto-installation
  - https://stackoverflow.com/a/66620869/1870054

### package.json

```json title="package.json"
{
  "engines": {
    "node": ">=16",
    "pnpm": ">=7"
  },
  "dependenciesMeta": {
    "button": {
      // 强制注入，而不是软连接 - 适用于依赖基础库版本不同时
      "injected": true
    }
  },
  "peerDependenciesMeta": {
    "bar": {
      // 允许 peer 依赖不存在
      "optional": true
    }
  },
  // 覆盖 publish 配置 - 生成 publish 用的 package.json - 开发时就可以 "main": "src/index.ts"
  "publishConfig": {
    "main": "lib/index.js",
    // types 也可以
    "typings": "lib/index.d.ts",
    // bin, exports, module, browser, esnext, es2015, umd:main, typesVersions, cpu, os
    // 修改 publish 的基础默认 - 默认时当前目录，目录下包含 package.json
    // "directory": "dist",
    // chmod +x - 默认只有 bin 下的可执行
    "executableFiles": ["./dist/shim.js"]
  },

  "pnpm": {
    // 依赖覆盖
    "overrides": {
      "foo": "^1.0.0", // 版本依赖覆盖
      "quux": "npm:@myorg/quux@^1.0.0", // 依赖修改
      "bar@^2.1.0": "3.0.0", // 版本修改
      "qar@1>zoo": "2" // 间接依赖版本修改
    },
    // 扩展依赖的依赖
    // pnpm 和 yarn 维护的扩展库
    // https://github.com/yarnpkg/berry/blob/master/packages/yarnpkg-extensions/sources/index.ts
    "packageExtensions": {
      "react-redux@1": {
        "peerDependencies": {
          "react-dom": "*"
        },
        "optionalDependencies": {},
        "dependencies": {},
        "peerDependenciesMeta": {}
      }
    },
    "peerDependencyRules": {
      "ignoreMissing": ["react"], // 如果 peer 依赖不存在不提示
      "allowedVersions": { "react": "17" } // 允许 peer 依赖版本 - 低版本安装高版本不报错
    },
    // 忽略 依赖 的构建操作 -  preinstall, install, postinstall
    "neverBuiltDependencies": ["fsevents", "level"],
    // 与 neverBuiltDependencies 相反
    "onlyBuiltDependencies": ["fsevents"]
  }
}
```

## .npmrc

```ini title="推荐配置"
strict-peer-dependencies = false
auto-install-peers = true
```

```ini title="全部配置项"
hoist=true
# 依赖提升到 node_modules/.pnpm - 隐藏模块目录
# 例如
# hoist-pattern[]=*eslint*
hoist-pattern[]=*

# 依赖提升到 node_modules/
public-hoist-pattern[]=*eslint*
public-hoist-pattern[]=*prettier*

# 允许 node_modules 内模块访问未声明依赖
shamefully-hoist=false

# Windows ~/AppData/Local/pnpm/store
# macOS ~/Library/pnpm/store
# Linux ~/.local/share/pnpm/store
# store-dir

modules-dir=node_modules
# isolated - node_modules/.pnpm
# hoisted - 平坦 node_modules 结构，无 symlink - 同 npm
# pnp - 无 node_modules, 推荐同时设置 symlink=false
node-linker=isolated
symlink=true
enable-modules-dir=true

virtual-store-dir=node_modules/.pnpm
# auto, hardlink, copy, clone
package-import-method=auto
# 分钟 - 默认 7 天
modules-cache-max-age=10080

# 生成 pnpm-lock.yaml
lockfile=true
prefer-frozen-lockfile=true


# highest, time-based, lowest-direct
# time-based 需要 registry-supports-time-field
# https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#full-metadata-format
resolution-mode=highest
# Verdaccio v5.15.1+
registry-supports-time-field=false


# symlink 到根目录 node_modules 后就不 symlink 到子目录
dedupe-direct-deps=false




# true if node-linker=hoisted
# node_modules/.bin
prefer-symlinked-executables=
verify-store-integrity=true

# https://github.com/yarnpkg/berry/blob/master/packages/yarnpkg-extensions/sources/index.ts
ignore-compatibility-db=false
# 设置 NODE_PATH
extend-node-path=true

# Peer Dependency
# ===============
# 安装 non-optional peer dependencies
auto-install-peers=false
strict-peer-dependencies=true
dedupe-peer-dependents=true
strict-peer-dependencies=false
resolve-peers-from-workspace-root=true

# CLI
# ===
# auto, always, never
color=auto
# no-color
# debug, info, warn, error
loglevel=info
use-beta-cli=false
# pnpm i -> pnpm i -r
recursive-install=true
engine-strict=false
# npm-path

# Build Settings
# ==============
child-concurrency=5
side-effects-cache=true
side-effects-cache-readonly=false
unsafe-perm=false

# Node.js
# =======
use-node-version=
node-version=
# release, rc, nightly, v8-canary
# node-mirror:<releaseDir>=https://nodejs.org/download/<releaseDir>/

# Misc
# ====
use-running-store-server=false
save-prefix=^
tag=latest
# <path to node>/pnpm-global
global-dir=
global-bin-dir=
state-dir=$XDG_STATE_HOME/pnpm
cache-dir=$XDG_CACHE_HOME/pnpm
use-stderr=false
update-notifier=true

# 以下同 npm 配置
registry=https://registry.npmjs.org/
# <scope>:registry
# <URL>:_authToken
# <URL>:tokenHelper
# <URL>:always-auth

# ca=
# cafile=
# cert=
# key=
# strict-ssl

# git-shallow-hosts=['github.com', 'gist.github.com', 'gitlab.com', 'bitbucket.com', 'bitbucket.org']
# local-address
# https-proxy
# proxy
# noproxy
# maxsockets

network-concurrency=16
fetch-retries=2
# fetch-retry-factor,mintimeout,maxtimeout,
# fetch-tomeout
```

- https://github.com/vercel/next.js/blob/canary/.npmrc

### .pnpmfile.cjs

- https://pnpm.io/pnpmfile

## workspace

- 如果版本匹配会默认使用工作空间模块 - npm 常用 `*`
- 如果指定版本不匹配则解析失败
- 使用 workspace: 协议可强制使用工作空间模块
  - 如果 link-workspace-packages 为 false，则只有使用 worksapce: 协议才会 link

```yaml title="pnpm-workspace.yaml"
packages:
  - 'apps/*'
  - 'packages/*'
```

- https://pnpm.io/workspaces

## store server

- .npmrc 可配置 `use-running-store-server=true` 使用 store server

```bash
# start stop status
# --background
# --network-concurrency
# --protocol=auto
# --store-dir=$HOME/.pnpm-store
# --[no-]lock 锁定文件，避免外部进程修改
# --ignore-stop-requests
# --ignore-upload-requests
pnpm server start --port=5813
```

## Dockerfile

```dockerfile
FROM node:16

RUN curl -f https://get.pnpm.io/v7.1.8.js | node - add --global pnpm

COPY pnpm-lock.yaml ./

# 使用 fetch 使 docker 构建依赖更少
# 正常 install 需要 .npmrc package.json pnpm-lock.yaml .pnpmfile.cjs package.json
RUN pnpm fetch --prod

ADD . ./
RUN pnpm install -r --offline --prod

EXPOSE 8080
CMD [ "node", "server.js" ]
```

- [#3114](https://github.com/pnpm/pnpm/issues/3114)

## 模板项目依赖

```bash
pnpm init
cat << CONF > .npmrc
strict-peer-dependencies=true
auto-install-peers=true
legacy-peer-deps=false
CONF
cat << YAML > pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
YAML

pnpm add -Dw tsx turbo typescript ava esbuild
pnpm add -Dw prettier prettier-plugin-{pkg,tailwindcss} @trivago/prettier-plugin-sort-imports
pnpm add -Dw eslint eslint-config-{prettier,standard-with-typescript} eslint-plugin-{import,n,promise,react}
pnpm add -Dw @types/node @types/react    # hoist common dependencies
pnpm add -Dw tailwindcss postcss cssnano # DevTools
pnpm add -Dw @wener/wode

mkdir -p apps/{web,server,playground} packages/{common,ui}

cd apps/web
pnpm init
pnpm add next
pnpm add @wener/reaction @wener/utils
pnpm add react react-dom @headlessui/react react-icons react-hook-form @tanstack/react-query @tanstack/react-table zustand valtio immer use-immer
pnpm add dayjs axios
pnpm add -D tailwindcss daisyui @tanstack/react-query-devtools
pnpm add -D @tailwindcss/line-clamp @tailwindcss/typography @tailwindcss/container-queries daisyui
pnpm add react-router react-router-dom # SPA
# pnpm add @trpc/client @trpc/react @trpc/server # tRPC for NextJS

mkdir src/{app,pages,components,styles,libs} -p
cat << CSS > src/styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;
CSS
cat << JSX > src/pages/_app.tsx
import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function App({ Component, pageProps }:AppProps) {
  return <Component {...pageProps} />;
}

export default App;
JSX
cat << JSX > src/pages/index.tsx
export const Page = ()=>{
  return <div>Hello</div>
}
export default Page
JSX
cd -

cd apps/server
pnpm init
pnpm add fastify
cd -

cd apps/playground
cd -

# tRPC
pnpm add superjson @trpc/client @trpc/next @trpc/server zod ws
# NextJS with superjson
pnpm add superjson next-superjson-plugin

# DB
pnpm add @sequelize/core pg

pnpm add -D @types/pg @types/ws
```

## Typescript FAQ

主要是 pnpm symlink 引起问题

### Type error: The inferred type of 'trpc' cannot be named without a reference to 'react-query'. This is likely not portable. A type annotation is necessary.

- https://github.com/microsoft/TypeScript/issues/29808
- https://github.com/microsoft/TypeScript/issues/42873
- https://github.com/microsoft/TypeScript/issues/47663

# FAQ

## ERR_PNPM_MODIFIED_DEPENDENCY  Packages in the store have been mutated

`pnpm store status` 时出现

```bash
pnpm install --force # refetch
```

## EEXIST: file already exists, symlink @next/env

在使用 nextjs outputStandalone 时，第二次构建出现。

```bash
# 临时解决办法 或 不用 outputStandalone
# 删除 nextjs 所在 moudle 即可
rm -rf ./node_modules/.pnpm/*
```

- https://github.com/pnpm/pnpm/issues/4663

## node_modules 相同包包含多个目录

- 不同的 peer deps 会创建目录
- 通过在 root package.json 中添加 pnpm.overrides 来解决 - 全局统一版本
- https://github.com/pnpm/pnpm/issues/5807
- https://pnpm.io/how-peers-are-resolved

```bash
grep '^\s*/' pnpm-lock.yaml | sort -u | tr -d ' '

grep '^\s*/' pnpm-lock.yaml | sort -u | tr -d ' ' | grep -E '[0-9.]+_' -C 1
```

- e.g.
  - @nestjs/platform-fastify -> fastify@4.15.0
  - fastify@4.17.0
  - 会导致两份 fastify - 导致版本不匹配
- 带全局状态的不能有多个
  - @mikro-orm/postgresql
  - @mikro-orm/core
- 以前全局匹配的不能有多个
  - 例如 nestjs 需要匹配依赖

```bash
pnpm tsx ./dup.ts
```

```ts title="dup.ts"
import fs from 'node:fs';

const deps = fs
  .readFileSync('./pnpm-lock.yaml', 'utf8')
  .split('\n')
  .filter((v) => /^\s*[/]/.test(v))
  .map((v) => v.trim())
  .map((v) => {
    const { name, version, spec } =
      v.match(/^\/(?<name>(@[^\/]+\/)?[^@]+)@(?<version>[^:(]+)(\((?<spec>.*?)\))?:$/)?.groups || {};
    return { name, version, spec };
  });

let dups: Record<string, { name: string; version: string; spec: string }[]> = {};
for (const dep of deps) {
  if (!dep) continue;
  const { name, version, spec } = dep;
  if (!dups[name]) dups[name] = [];
  dups[name].push({ name, version, spec });
}

dups = Object.fromEntries(Object.entries(dups).filter(([, v]) => v.length > 1));

console.log(dups);
```

## peer deps

```bash
npx install-peerdeps --pnpm <your-package>
```

## npm ci

```bash
pnpm i --frozen-lockfile
CI=true pnpm i
```

- CI 检测逻辑 https://github.com/watson/ci-info/blob/20fae89d2bdeb0e5dd70e6a9e8d2647764e6ff04/index.js#L56-L69

## 平台参数

```bash
pnpm install --config.platform=linux --config.architecture=x64
```

- https://github.com/pnpm/pnpm/issues/5965

## Cannot read properties of undefined (reading 'startsWith')
