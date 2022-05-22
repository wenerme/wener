---
title: yarn version
tags:
  - Version
---

# yarn version

| version             | date |
| ------------------- | ---- |
| [Yarn v4](#yarn-v4) |
| [Yarn v3](#yarn-v3) |
| [Yarn v2](#yarn-v2) |
| [Yarn v1](#yarn-v1) |

- Node.js >=16.10 corepack

:::caution

- ~PnP 不支持 ESM - [yarnpkg/berry#638](https://github.com/yarnpkg/berry/issues/638)~
- TypeScript 官方尚不支持 PnP - [microsoft/TypeScript#35206](https://github.com/microsoft/TypeScript/pull/35206)
  - yarn 内置 patch

:::

## Yarn v4

## Yarn v3

- 如果当前环境为 node_moduels 则兼容使用 node_moduels 而不是 pnp
  - 迁移到 3 会容易很多
- opt-in pnp
- 生态比 v2 时好了很多
- 内置 esbuild 插件 - yarn 使用 esbuild 构建
  - @yarnpkg/esbuild-plugin-pnp
- 不再支持 Node 10
- Plug'n'Play hooks `pnp.js` -> `.pnp.cjs`
- 虚拟目录 `$$virtual` -> `__virtual__`
- @yarnpkg/pnpify 拆分
  - @yarnpkg/sdks
  - @yarnpkg/pnpify
  - @yarnpkg/nm - node_modules
- @yarnpkg/plugin-node-modules -> @yarnpkg/plugin-nm

## Yarn v2

- 默认 pnp 模式 - 刚开始迁移非常难
- 依赖为压缩包，不展开
- 支持离线
- 安装非常快
- 但因为生态滞后，很多包 pnp 需要调整
- 官方维护了部分 patch - 自己使用时也需要自行维护 patch

## Yarn v1

- node_moduels 模式
- 支持 namespace
- 兼容 npm
- 缓存安装速度比 npm 更快
