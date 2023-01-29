---
title: Vite
---

# Vite

- [vitejs/vite](https://github.com/vitejs/vite) 是什么？
  - Dev+Bundle 工具 - No-Bundler - Bundle 为 ESM 独立模块而不是整体 Bundle
  - ESBuild+Rollup
  - Koa
  - 模块 TS, CSS, Static Assets, JSX, JSON, Vue, Glob Import, WebAssembly, Web Worker
  - CSS Code Splitting
- 参考
  - [Why We Switched From Webpack To Vite](https://blog.replit.com/vite)
  - [Comparisons with Other No-Bundler Solutions](https://vitejs.dev/guide/comparisons.html)
  - [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite)
  - Help with monorepo [#1491](https://github.com/vitejs/vite/issues/1491)
  - [anncwb/vite-plugin-html](https://github.com/anncwb/vite-plugin-html)
    - HTML 预处理
  - [rakkasjs/rakkasjs](https://github.com/rakkasjs/rakkasjs)
    - Next.js alternative powered by Vite
- Dev
  - unbundled esm
    - 开发快速 - 方便替代和构建
    - 开发环境浏览器相对新 - 支持 ESM
  - esbuild
- Producation
  - bundle
    - unbundled esm 还是会产生很多请求
    - 生产直接使用 ESM 较少
    - 可以 tree shake, lazy-loading, common chunk splitting
  - rollup
    - 更成熟 - 功能更完善 - 插件多
    - esbuild 支持 esm 为主
  - 保持 与 DEV 一致会有难度

:::caution

- html script 只能 bundle module - `<script type="module">`
- build 一次只能一个 rollup 配置
  - 使用多 config 或 环境变量 解决

:::

:::note

- 未内置支持 mdx
- ~~React hmr 丢失 Context [vitejs/vite#3301](https://github.com/vitejs/vite/issues/3301)~~
  - 2022-09 修复
- ~~hmr 不支持 unamed dynamic import [vitejs/vite#2719](https://github.com/vitejs/vite/issues/2719)~~
  - Vite 4.1+ 修复 - 2023-01

:::

```bash
# 新项目
# vanilla, vanilla-ts, vue, vue-ts, react, react-ts, preact, preact-ts, lit, lit-ts, svelte, svelte-ts
npm init vite@latest my-app -- --template react-ts

# 现有项目
npm add -D vite @vitejs/plugin-react
```

```ts
export default defineConfig({
  plugins: [react()],
  build: {
    // 多页应用
    rollupOptions: {
      input: {
        // js bundle 名字
        main: resolve(__dirname, 'index.html'),
        // -> dist/assets/auth-error.<hash>.js
        'auth-error': resolve(__dirname, 'auth/error.html'),
      },
    },
  },
});
```

```ts title="异步配置"
export default defineConfig(async ({ command, mode }) => {
  const data = await asyncFunction();
  return {
    // build specific config
  };
});
```

## env

| meta env                 | for                                     |
| ------------------------ | --------------------------------------- |
| import.meta.env.MODE     | development,production, `--mode <mode>` |
| import.meta.env.BASE_URL |
| import.meta.env.PROD     |
| import.meta.env.DEV      |
| import.meta.env.SSR      |

- envfiles
  - `.env`
  - `.env.local`
  - `.env.<mode>`
  - `.env.<mode>.local`
- `VITE_` 前缀的变量会暴露到 `import.meta.env`
- https://vitejs.dev/guide/env-and-mode.html

## 支持 MDX

```js
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';

export default defineConfig({
  plugins: [mdx(/* jsxImportSource: …, otherOptions… */)],
});
```

# FAQ

## 扫描多页

```js
require('fast-glob')
  .sync(['./**/*.html', '!dist'])
  .map((entry) => path.resolve(__dirname, entry));
```

## does not provide an export named 'default'

- 需要 esm 模块

## require() of ES Module vite.config.ts not supported

- 依赖了只有 esm 的插件 - 例如 @mdx/rollup

## Vite vs Snowpack

- Vite
  - Dev 和 Bundle 使用相同的工具 - rollup
  - 生成更小
  - 插件开发会更容易
- Snowpack
  - delegates to plugins using webpack/parcel

## Vite vs NextJS

- Vite
  - ESBuild+Rollup
    - ESM - 开发无 bundle - 快
  - SSR 和 SSG WIP 状态
  - 支持多 HTML 入口 - 按页划分 CSS
    - 但需要自行配置
  - 可以打包为 库 - rollup
- NextJS
  - Webpack/SWC
    - bundle - 全量，复杂页面很大很慢
  - SSR、SSG、增量 SSG 支持很好
  - 单一 HTML 入口 - `_app.js` - 不能划分全局 CSS
  - 支持路由
