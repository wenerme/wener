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

- 面向 node 服务端的项目 - cjs, mjs
- 面向 web 的库 - mjs
- 面向 web 的插件 - iife - 直接执行
