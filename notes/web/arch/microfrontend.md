---
title: 微前端
---

# 微前端

- 目的/核心 - 并不是要达到所有 - 需要权衡
  - 垂直切分前端
  - 技术无关 - 可混合多种框架
  - 团队切分 - 独立
  - 外部依赖共享 - React - Import Map
  - 独立部署 - 能部署某个组件或页面
- 附加
  - SSR 支持 - 按照路由切分是可能的
- 反应 microservice 概念 - isolation
- 参考
  - single-spa [Recommended Setup](https://single-spa.js.org/docs/recommended-setup/)

:::info 考虑的问题点

- 微前端的目的
  - 新旧项目架构迁移 - 新的逐步取代旧的
  - 灵活配置部署
  - 自定义、outsource 部分应用模块开发
- 是否需要多框架/语言
  - 通讯问题
  - 上下文问题
  - 构建问题
  - 维护更新问题
  - 基础库问题
- 是否需要样式隔离
  - CSS 重复 - bundle 大
  - 设计样式不统一
  - 隔离程度

:::

:::tip 建议

- 最好是单一语言
  - rollup 共享核心包
    - 例如 react、zustand、UI 库
  - bundle 非核心小包
  - 方便提供基础支撑 - 路由、通讯、基础框架、状态
- 最好基础 CSS 共享
  - 基础使用 ulti 类 CSS 库 - 例如 tailwind css
    - 减少写 CSS
    - 默认可以使用的 CSS 框架
  - 控制 CSS 作用域 - 例如 css module、styled、emotion、shadowdom

:::

:::info 参考问题

- [single-spa/single-spa#103](https://github.com/single-spa/single-spa/issues/103) - RFC: Server Rendering
- [vercel/next.js#6040](https://github.com/vercel/next.js/issues/6040) - Feasibility of micro frontends
  - 使用 multi-zone 基于 url 划分
- [webpack/webpack#10352](https://github.com/webpack/webpack/issues/10352) - Module federation and code sharing between bundles. Many builds act as one

:::

## 微前端划分点

- 路由 - 营销网站 - NextJS
- 页面布局 - 后端
  - 例如 iframe - 划分多区域
  - 例如 每个区域 mount 一个 webcomponent
  - 例如 react 每个区域 switch 一个 sub path - 基于内部路由
- 功能模块 - 高度定制场景 - 例如 单页多 App
  - 通过自定义注册信息识别 `registry({name:'',load:()=>{}})`
- 代码模块 - 自定义场景，使用 systemjs 构建应用
  - 通过 import `@my-sys/module` 识别

## 实现方案

- iframe
- NextJS [multi-zone](https://nextjs.org/docs/advanced-features/multi-zones)
  - url 切分
  - 支持 SSR - 适用于营销场景
- single-spa
  - URL 切分、layout 模块
  - bootstrap、mount、unmount 钩子
  - 监听 url 变化
  - 语言无关
- qiankun
  - 基于 single-spa 封装
  - Proxy 沙箱隔离访问全局对象
- [systemjs/systemjs](https://github.com/systemjs/systemjs)
  - 自行映射模块实现，systemjs 用于系统维度协调
- webpack federation [#10352](https://github.com/webpack/webpack/issues/10352)
- import map - [Import maps](https://developers.google.com/web/updates/2019/03/kv-storage#import_maps)
- bundle 外部依赖
  - webpack [external](https://webpack.js.org/configuration/externals/#root)
  - rollup [external](https://rollupjs.org/guide/en/#external)
- WebComponent
  - 封装组件、语言无关
  - ShadowDom 挑实现框架
  - 组件样式是否需要隔离待商榷
- [micro-zoe/micro-app](https://github.com/micro-zoe/micro-app)
  - 京东
  - 基于 CustomElement，类似 iframe 设计体验
  - connectedCallback

## importmap

```html
<!-- The import map is inlined into your page -->
<script type="importmap">
  {
    "imports": {
      "/path/to/kv-storage-polyfill.mjs": ["std:kv-storage", "/path/to/kv-storage-polyfill.mjs"]
    }
  }
</script>

<!-- Then any module scripts with import statements use the above map -->
<script type="module">
  import storage from '/path/to/kv-storage-polyfill.mjs';

  // Use `storage` ...
</script>
```
