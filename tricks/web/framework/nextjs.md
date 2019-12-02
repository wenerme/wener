# NextJS

## Tips
* 注意
  * getInitialProps
    * 只能用于页面组件不能用于子组件
    * 在第一次渲染会执行，之后会在客户端做转换
    * 不要能服务端的模块，通过 API 实现调用
  * 请求推荐使用 `isomorphic-unfetch`
* 页面自定义
  * _document.js
    * 自定义文档内容 - HTML
    * 在 `<Main/>` 之外的组建都不会在页面初始化 - 只做 SSR
    * 不要在这里做应用逻辑 - 在 app 做
    * 不要在这里做布局
    * 不要在这里用事件
    * 不能在这里导入 CSS
  * _app.js
      * 自定义应用
## 快速开始

```bash
# 初始化项目
mkdir my-web && cd my-web
# 依赖
npm install --save next react react-dom
npm install --save-dev @types/react @types/node
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
```

## 提示

### 目录结构
* next.config.js - 配置文件
* next-env.d.ts - 针对 TS 的类型定义
* pages - 页面 - 可直接访问
  * api - 接口 - 通过 `/api/*` 访问

### 接口
修改 pages/api/test.ts 为以下内容

```ts
import { NextApiRequest, NextApiResponse } from 'next'
export default (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ title: 'From server side' })
}
```

然后访问 http://localhost:3000/api/test

## 配置

### 针对服务端配置 fs:empty
```js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }
    return config
  }
}
```

### 支持 CSS
```js
const withCSS = require('@zeit/next-css')
module.exports = withCSS({})
```

### apollo
* https://github.com/zeit/next.js/tree/master/examples/with-apollo

## FAQ

### 检测在浏览器

```js
// Webpack 定义 - 会根据依赖来移除代码
// https://github.com/zeit/next.js/pull/5159
process.browser
// 通用逻辑
typeof window === 'undefined'
```

### 如何在 getInitialProps 引入服务端模块
* 如果直接 require 是会导致被打包到客户端代码的

```js
const faker = eval("require('faker')")
```

这个方式是最简单的，其他方式参考 [SSR and Server Only Modules](https://arunoda.me/blog/ssr-and-server-only-modules)


### 分析服务端代码和SSR代码

__安装依赖__

```bash
npm install --save-dev webpack-bundle-analyzer @zeit/next-bundle-analyzer
```

__next.config.js__

```js
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')

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
    return config
  },
}

module.exports = withBundleAnalyzer(nextConfig)
```

__添加脚本__

添加到 package.json

```
"analyze": "BUNDLE_ANALYZE=both next build",
"analyze:server": "BUNDLE_ANALYZE=server next build",
"analyze:browser": "BUNDLE_ANALYZE=browser next build"
```

__执行分析__

```bash
npm run analyze
```

> * [SSR and Server Only Modules](https://arunoda.me/blog/ssr-and-server-only-modules)
> * [examples/analyze-bundles](https://github.com/zeit/next.js/tree/canary/examples/analyze-bundles)


