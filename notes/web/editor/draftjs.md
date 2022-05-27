---
title: Draftjs
tags:
  - Deprecated
---

# Draftjs

> 新项目不再建议使用，使用 [lexical](./lexical.md)

- [facebook/draft-js](https://github.com/facebook/draft-js)
- 特点
  - 原生 React
  - Facebook 开源使用
  - 基于 contentEditable
  - 支持自定义组件
  - 样式是预定义映射为 css style
  - 以编辑文本内容为主
  - 包含预定义样式和渲染
  - 状态不可变 - immutable.js
  - 受控组件实现编辑 - [API Basics](https://draftjs.org/docs/quickstart-api-basics)
- 注意
  - 移动端支持有问题 [Mobile Not Yet Supported](https://draftjs.org/docs/advanced-topics-issues-and-pitfalls/#mobile-not-yet-supported)
- 开发
  - [Draft default block render map](https://draftjs.org/docs/advanced-topics-custom-block-render-map#draft-default-block-render-map)
    - 固有一些 block 元素 - 可自定义渲染
