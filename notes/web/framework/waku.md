---
title: waku
---

# waku

- [wakujs/waku](https://github.com/wakujs/waku)
  - MIT, TypeScript
  - 极简 React 框架，基于 React Server Components (RSC)
  - 专为中小型 Web 应用设计：营销网站、轻电商、Web 应用
  - 深度集成 RSC，支持服务端数据获取和处理
  - 支持 Server Actions、SSG/SSR、灵活路由系统
  - 技术栈: React 19 + Vite + SWC + Hono
  - 支持 Vercel、Netlify、Cloudflare Pages 等部署平台
- `fsRouter`
- `createPages`
- `defineRouter`

```bash
npm install waku

# Vercel
npm install @wakujs/adapter-vercel

# Netlify
npm install @wakujs/adapter-netlify

# Cloudflare Pages
npm install @wakujs/adapter-cloudflare-pages

# Node.js
npm install @wakujs/adapter-node
```

## 路由系统

Waku 支持三种路由方式：

### 文件系统路由

基于 `./src/pages/` 目录结构自动生成路由：

```
src/
├── pages/
│   ├── _layout.tsx          # 根布局
│   ├── _root.tsx            # HTML 根元素
│   ├── index.tsx            # 首页 (/)
│   ├── about.tsx            # 关于页 (/about)
│   ├── _components/         # 忽略 _ 开头目录
│   ├── foo/
│   │   └── index.tsx        # 嵌套页 (/foo)
│   └── nested/
│       ├── _layout.tsx      # 嵌套布局
│       └── [name].tsx       # 动态路由 (/nested/:name)
```

**特性：**

- `_layout.tsx`: 布局组件，自动包裹子页面
- `_root.tsx`: 自定义 `<html>`, `<head>`, `<body>`
- `[slug].tsx`: 动态路由参数
- `[...catchAll].tsx`: 捕获所有路由
- `getConfig()`: 配置渲染模式 (`'static'` 或 `'dynamic'`)
- **不支持路由分组**: 文件路由基于目录结构，无 `(group)` 语法

### createPages

在 `./src/entries.tsx` 中编程定义路由

```typescript
export default createPages(async ({ createPage, createLayout }) => [
  // 路由分组 - 不影响最终 URL
  createLayout({
    path: '/(main)', // 分组布局
    component: MainLayout,
  }),
  createPage({
    path: '/(main)/dashboard', // URL: /dashboard
    component: DashboardPage,
    render: 'static',
  }),
  createPage({
    path: '/(auth)/login', // URL: /login
    component: LoginPage,
  }),
  // 嵌套分组和动态路由
  createPage({
    path: '/(shop)/category/[slug]', // URL: /category/:slug
    component: CategoryPage,
    staticPaths: ['electronics', 'books'],
  }),
  // 嵌套分组
  createPage({
    path: '/(shop)/(products)/item/[id]', // URL: /item/:id
    component: ProductPage,
  }),
]);
```

**特性：**

- `createPage()`: 定义页面，支持分组路径
- `createLayout()`: 定义布局，可应用于分组
- `createRoot()`: 自定义根元素
- `createApi()`: 定义 API 路由
- `(group)`: 路由分组语法，不影响 URL
- 嵌套分组: `/(a)/(b)/page` → `/page`
- 冲突检测: 相同最终路径会报错

### defineRouter

最低层级的路由控制，`createPages` 和文件路由都基于此实现。

## 项目结构

### 基本结构

```
my-app/
├── package.json
├── tsconfig.json
├── waku.config.ts          # 配置文件 (可选)
├── public/                 # 静态资源
│   └── favicon.ico
└── src/
    ├── components/         # 共享组件
    ├── styles.css          # 全局样式
    ├── entries.tsx         # createPages 路由 (可选)
    ├── waku.client.tsx     # 客户端入口 (可选)
    ├── waku.server.tsx     # 服务端入口 (可选)
    └── pages/              # 文件路由页面 (可选)
        ├── _layout.tsx
        ├── index.tsx
        └── ...
```

### waku.config.ts

```typescript
import { defineConfig } from 'waku/config';

export default defineConfig({
  basePath: '/my-app', // 基础路径
  unstable_viteConfigs: {
    // Vite 配置
    // 自定义 Vite 配置
  },
});
```
