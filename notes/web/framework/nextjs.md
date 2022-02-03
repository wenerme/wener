---
id: nextjs
title: NextJS
---

# NextJS

- 页面自定义
  - [默认特殊页面内容](https://github.com/zeit/next.js/tree/master/packages/next/pages)
  - `_document.js`
    - 自定义文档内容 - HTML
    - 在 `<Main/>` 之外的组建都不会在页面初始化 - 只做 SSR
    - 不要在这里做应用逻辑 - 在 app 做
    - 不要在这里做布局
    - 不要在这里用事件
    - 不能在这里导入 CSS
  - `_app.js`
    - 自定义应用
- 问题
  - [#8311](https://github.com/zeit/next.js/issues/8311) - Setting-Up Socket.io-based Serverless API Route
  - [#9965](https://github.com/zeit/next.js/issues/9965) - Server-Sent Events don't work in Next API routes
  - [#9524](https://github.com/zeit/next.js/issues/9524) - Static Generation / SSG Improvements
  - [#706](https://github.com/zeit/next.js/issues/706) - Add support to transpile modules inside node_modules
    - 跨项目转译 - [martpie/next-transpile-modules](https://github.com/martpie/next-transpile-modules)
    - 配合 lerna 使用有问题
    - 被转译模块不能使用绝对路径，除非添加 package
      - `import 'libs/utils'` 不可以
      - `import './utils'` 可以
      - `import '@wener/core/libs/utils'` 可以
  - [#5054](https://github.com/vercel/next.js/issues/5054) - Truly static pages without react app
    - PR [#11949](https://github.com/vercel/next.js/pull/11949)
      - 页面导出 `const config={unstable_runtimeJS: false}`
- 参考
  - https://github.com/kirill-konshin/next-redux-wrapper
  - i18n https://github.com/isaachinman/next-i18next/issues/274
  - [unicodeveloper/awesome-nextjs](https://github.com/unicodeveloper/awesome-nextjs)
  - [nextauthjs/next-auth](https://github.com/nextauthjs/next-auth)
  - [vercel/platforms](https://github.com/vercel/platforms)
    - template for site builders and low-code tools.

:::tips

- getInitialProps
  - 只能用于页面组件不能用于子组件
  - 在第一次渲染会执行，之后会在客户端做转换
  - 不要能服务端的模块，通过 API 实现调用
- 内置了 node-fetch

:::

:::caution

- 无法按页面切分 CSS
  - 最终会生成单个 css 文件
  - 只有 _app 可以导入全局 css
- 单一 HTML 入口

:::

## 快速开始

```bash
# 初始化项目
mkdir my-web && cd my-web
# 依赖
# npm install --save next react react-dom
# npm install --save-dev typescript @types/react @types/node
yarn add next@latest react@latest react-dom@latest
yarn add --dev typescript @types/react @types/node

# 首页
mkdir pages
cat <<INDEX >pages/index.tsx
import React from 'react'
function Home({ pid }) {
  return <div>NextJS Running on {pid}!</div>
}
Home.getInitialProps = function () {
  return { pid: process.pid }
}
export default Home
INDEX
# 启动服务
./node_modules/.bin/next
# 访问 http://localhost:3000

# 其它常用目录
mkdir -p public libs hooks types components modules reducers hooks
```

## Tips

```bash
# 基础依赖
yarn add next@latest react@latest react-dom@latest
yarn add --dev typescript @types/react @types/node

# Next 扩展增强插件
# 已内建
# yarn add @zeit/next-css @zeit/next-sass @next/mdx
yarn add next-transpile-modules @next/bundle-analyzer

# 已内建
# yarn add dotenv tsconfig-paths-webpack-plugin
yarn add --dev @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties
yarn add --dev babel-plugin-import

# 服务端开发
# isomorphic-unfetch isomorphic-ws

# 常用工具
yarn add moment lodash date-fns
yarn add --dev @types/lodash

# UI 框架
yarn add antd

# 测试
yarn add --dev ts-node jest ts-jest @types/jest
```

## 提示

### 目录结构

- next.config.js - 配置文件
- next-env.d.ts - 针对 TS 的类型定义
- pages - 页面 - 可直接访问
  - `_document.js`
  - `_app.js`
  - api - 接口 - 通过 `/api/*` 访问

#### 自定义 `_app.js`

```js
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
```

#### 自定义 `_document.js`

```js
// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

#### 自定义 `_error.js`

```js
```

### 接口

- 使用 [micro](https://github.com/zeit/micro) 框架

修改 pages/api/test.ts 为以下内容

```ts
import { NextApiRequest, NextApiResponse } from 'next';
export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ title: 'From server side' });
};
```

然后访问 http://localhost:3000/api/test

#### 接口配置

```js
export const config = {
  api: {
    // 默认会解析 1mb 的 body - 可以关闭
    bodyParser: false,

    // 修改配置
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
```

#### 支持 CORS

```js
import Cors from 'micro-cors';

const cors = Cors({
  allowedMethods: ['GET', 'HEAD'],
});

function Endpoint(req, res) {
  res.json({ message: 'Hello Everyone!' });
}

export default cors(Endpoint);
```

### 常用脚本

**packages.json**

```js
{
  "scripts": {
    "test": "jest --passWithNoTests",
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```

**支持自定义端口**

> Heroku 部署需要这样

```js
{
  "scripts": {
    "test": "jest --passWithNoTests",
    "dev": "next dev -p ${PORT:-3000}",
    "build": "next build",
    "start": "next start -p ${PORT:-3000}"
  }
}
```

**workspace**

```js
{
  "scripts": {
    "test": "yarn --cwd packages/server test",
    "dev": "yarn --cwd packages/server dev",
    "build": "yarn --cwd packages/server build",
    "start": "yarn --cwd packages/server start"
  }
}
```

## 配置

- [next.config.js](https://nextjs.org/docs/api-reference/next.config.js/introduction)
- [defaultConfig](https://github.com/zeit/next.js/blob/canary/packages/next/next-server/server/config.ts#L12-L63)

```js
module.exports = {
  // 自定义环境变量
  env: { customKey: 'my-value' },
  // 页面扩展名
  pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
  // 资源路径替换
  assetPrefix: isProd ? 'https://cdn.mydomain.com' : '',
  // 支持 server 和 serverless
  target: 'serverless',

  // 自定义 webpack 配置
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    return config;
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },

  // target 为 server 支持压缩
  // 如果前端后 web 服务可以不考虑开启
  compress: false,

  // 自动静态优化的提示 - 闪电图标
  devIndicators: {
    autoPrerender: false,
  },

  // 关闭 X-Powered-By 头
  poweredByHeader: false,
  // 生成 ETag - 默认开启
  generateEtags: false,

  // 构建目录
  distDir: 'build',

  // 生成构建 ID
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return 'my-build-id';
  },

  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },

  typescript: {
    // 忽略开发时的 typescript 错误
    ignoreDevErrors: true,
  },

  // 静态导出的路径 - next export
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
      '/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
      '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } },
    };
  },

  // 会导出为 about/index.html 而不是 about.html
  exportTrailingSlash: true,
};
```

```js
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
    };
  }

  return {
    /* config options for all phases except development here */
  };
};
```

### 针对服务端配置 fs:empty

```js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }
    return config;
  },
};
```

### 支持 CSS

> ⚠️ 9.2 后内建支持 css

```js
const withCSS = require('@zeit/next-css');
module.exports = withCSS({});
```

### apollo

- https://github.com/zeit/next.js/tree/master/examples/with-apollo

## FAQ

### 检测在浏览器

```js
// Webpack 定义 - 会根据依赖来移除代码
// https://github.com/zeit/next.js/pull/5159
process.browser;
// 通用逻辑
typeof window === 'undefined';
```

### 如何在 getInitialProps 引入服务端模块

- 如果直接 require 是会导致被打包到客户端代码的

```js
const faker = eval("require('faker')");
```

这个方式是最简单的，其他方式参考 [SSR and Server Only Modules](https://arunoda.me/blog/ssr-and-server-only-modules)

### Invalid left-hand side in assignment "MyModule\*" = namespaces;

- [using npm debug module breaks build (overriding any property on process.env)](https://spectrum.chat/zeit/now/using-npm-debug-module-breaks-build-overriding-any-property-on-process-env~b36f36b2-7785-4aea-b1f9-065a284b4188)
- debug 模块的问题 - 注意引入位置 - 如果通过 transpile 可能会有问题

### 分析服务端代码和 SSR 代码

**安装依赖**

```bash
npm install --save-dev webpack-bundle-analyzer @zeit/next-bundle-analyzer
```

**next.config.js**

```js
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

const nextConfig = {
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  },
  webpack(config) {
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
```

**添加脚本**

添加到 package.json

```
"analyze": "BUNDLE_ANALYZE=both next build",
"analyze:server": "BUNDLE_ANALYZE=server next build",
"analyze:browser": "BUNDLE_ANALYZE=browser next build"
```

**执行分析**

```bash
npm run analyze
```

> - [SSR and Server Only Modules](https://arunoda.me/blog/ssr-and-server-only-modules)
> - [examples/analyze-bundles](https://github.com/zeit/next.js/tree/canary/examples/analyze-bundles)
