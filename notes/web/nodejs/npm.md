---
title: NPM
---

# NPM

- [npm download size](https://arve0.github.io/npm-download-size/)
- cache
  - `$HOME/.npm`
  - `%AppData%/npm-cache`
  - --cache
- https://www.runpkg.com/
- https://deps.dev/

:::tip

- NODE_ENV=production 或 --production 时 npm ci/install 不会安装开发依赖
  - `npm ci --include=dev` 强制安装 dev

:::

```json title="建议限定版本"
{
  "engines": {
    "node": "14",
    "npm": "8"
  }
}
```

```bash
# 查看本地缓存大小
du -hs ~/.npm/_cacache/
```

## .npmrc

```ini
# 不推荐 - 经常出现因为镜像问题构建失败
#registry="https://registry.npmmirror.com"
disturl="https://npmmirror.com/mirrors/node"
chromedriver_cdnurl="https://npmmirror.com/mirrors/chromedriver"
electron_mirror="https://npmmirror.com/mirrors/electron/"
fse_binary_host_mirror="https://npmmirror.com/mirrors/fsevents"
node_inspector_cdnurl="https://npmmirror.com/mirrors/node-inspector"
nodejs_org_mirror="https://npmmirror.com/mirrors/node"
nvm_nodejs_org_mirror="https://npmmirror.com/mirrors/node"
operadriver_cdnurl="https://npmmirror.com/mirrors/operadriver"
phantomjs_cdnurl="https://npmmirror.com/mirrors/phantomjs"
profiler_binary_host_mirror="https://npmmirror.com/mirrors/node-inspector/"
puppeteer_download_host="https://npmmirror.com/mirrors/"
sass_binary_site="https://npmmirror.com/mirrors/node-sass"
selenium_cdnurl="https://npmmirror.com/mirrors/selenium"
SQLITE3_BINARY_SITE="https://npmmirror.com/mirrors/sqlite3"
sharp_binary_host="https://npmmirror.com/mirrors/sharp"
sharp_libvips_binary_host="https://npmmirror.com/mirrors/sharp-libvips"
```

- https://registry.npmmirror.com/binary.html
- https://docs.npmjs.com/cli/v6/configuring-npm/npmrc

## registry

| url                                            | from     |
| ---------------------------------------------- | -------- |
| https://registry.npmjs.org                     | 官方     |
| https://registry.npm.taobao.org                | 淘宝     |
| https://mirrors.sjtug.sjtu.edu.cn/npm-registry | 上海交大 |
| https://registry.npmmirror.com                 | 淘宝     |
| https://r.cnpmjs.org                           |

```bash
# 淘宝镜像
npm i --registry=https://registry.npm.taobao.org
# 上海交大镜像
npm ci --registry=https://mirrors.sjtug.sjtu.edu.cn/npm-registry
# npx 使用镜像
npm_config_registry=https://registry.npm.taobao.org npx @scoped/package
#
npx --registry=https://registry.npmjs.org -y cubejs-cli create demo-cube -d postgres
```

## scope

- https://docs.npmjs.com/getting-started/scoped-packages
- https://docs.npmjs.com/private-modules/intro
- https://docs.npmjs.com/misc/scope

```bash
# 添加一个 scope
npm login --registry=https://reg.wener.me/nexus/repository/npm-internal/ --scope=@wener
# 添加后可修改关联的仓库
npm config set @wener:registry https://reg.wener.me/nexus/repository/npm-internal/
# 初始化时可以使用指定的 scope, 包名中会加上  @wener
npm init --scope=wener
# 发布是会发往 @wener 的仓库中
npm publish
# 安装指定 scope 中的模块
npm install @wener/wener-test
# 可以设置当前的全局 scope
npm config set scope wener
```

## workspaces

- [npm workspaces](https://github.com/npm/rfcs/blob/latest/implemented/0026-workspaces.md)

```json
{
  "name": "workspace-example",
  "version": "1.0.0",
  // 两种格式
  "workspaces": ["packages/*"],
  "workspaces": {
    "packages": ["packages/*"]
  }
}
```

```bash
npm ls
# 添加依赖到 workspace
npm add -w @wener/apis-weaver systemjs
# 依赖另外一个 workspace - 不能在 module add - 会报找不到
npm add -w @wener/apis-weaver @wener/apis-core
# npx 在 ws 下执行
npx -w @wener/apis-weaver typesync
# run 在 ws 下执行 - 注意 path.resolve 还是基于 ws 路径而不是当前路径
npm run -w @wener/apis-weaver build
```

## corepack

```bash
corepack enable
```

## 打包

```json title="package.json"
{
  // cjs
  "main": "./main.js",
  // esm
  "module": "./index.js",
  "types": "./index.d.ts",
  "unpkg": "./umd/react-router-dom.production.min.js",

  // 多个 entry - 访问除此之外的会被拒绝
  "exports": {
    ".": {
      "require": "./index.cjs",
      "import": "./index.mjs",
      "default": "./index.js"
    },
    "./package.json": "./package.json",
    "./extra": "./jsx-runtime.cjs",
  },

  // 是否有全局操作
  "sideEffects": false
}
```

```js title="main.js"
'use strict';

/* eslint-env node */

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/react-router-dom.production.min.js');
} else {
  module.exports = require('./umd/react-router-dom.development.js');
}
```

---

- Pure ESM package
  https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
