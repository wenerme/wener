---
title: Web Dev FAQ
tags:
  - FAQ
---

# Web Dev FAQ

| abbr. | stand for                               |
| ----- | --------------------------------------- |
| iife  | Immediately Invoked Function Expression |

## invariant

- 在开发时 assert 错误
- [invariant](https://github.com/zertosh/invariant)
  - 早期来自 React, flux
  - 现在 React 使用 invariant
- [tiny-invariant](https://github.com/alexreardon/tiny-invariant)
- https://github.com/facebook/flux/blob/2.0.2/src/invariant.js
- https://github.com/facebook/react/blob/v0.13.3/src/vendor/core/invariant.js

## 如何选择 模块 格式

- 面向 node 服务端的项目 - mjs, cjs
- 面向 web 的库 - mjs
- 面向 web 的插件 - iife - 直接执行
- 面向 微前端 - systemjs

## 如何选择工具链

:::tip

建议多尝试，了解更多场景，选择适合自己的。

:::

- Web 开发 - 开发环境、框架、集成
  - [NextJS](../framework/nextjs.md)
    - 优点: 开箱即用，支持 SSR ，支持 API ，支持 Layout SSR，支持 SIG，商业化
    - 缺点: 只能应用开发，只能 React
  - [Vite](./vite.md)
    - 优点: ESBuild + Rollup 最佳体验，支持多框架
    - 缺点:
      - less opinioned - 因为支持多框架
      - 重心相对分散
  - Webpack - 慢、传统、配置复杂 - 不建议 - 除非实现非常复杂的 Bundle 逻辑
- 库 开发 - 自定义、Bundle
  - [ESBuild](./bundle/esbuild.md)
    - 优点: 快、ESM 支持友好 - 开发时体验很好
    - 缺点: 不支持 SystemJS 打包，要求环境更加现代
  - [Rollup](./bundle/rollup.md)
    - 可配合 ESBuild 使用 - 更快
    - 优点:
      - 最强 Bundler
      - Bundle 结果干净可读
      - 支持非常多配置
      - 支持非常多格式
    - 缺点: 无开箱即用，需要一点配置，有一点慢
  - [Vite](./vite.md)
  - [swc](./bundle/swc.md)
- 测试
  - [Ava](./testing/ava.md) - --loader=tsx
    - 优点: 简单轻便
    - 缺点: 不能浏览器测试 - 配合 jsdom 可测试部分
  - [vitest](./testing/vitest.md)
    - 优点: 功能完善, 开箱即用, 默认支持 TS/TSX
    - 缺点: 功能非常多, 依赖 Vite
  - [jest](./testing/jest.md) - 自动 jsdom polyfill
    - 不建议使用 - 对 TS 不友好
- 开发工具
  - [prettier](./prettier.md)
  - [eslint](./eslint.md)
  - WebStrom
  - [turbo](./turborepo.md) - 大型 monorepo 项目
