---
title: NextJS
---

# NextJS

:::caution

- NextJS 的构建相当复杂 - lambda、server action、pages、app
  - dev 能运行，build 后可能又无法运行
- 不要用于后端太重的场景
  - 构建会遇到各种问题
  - 前后端 Refresh 的频度不一样 - 后端 refresh 时慢

:::


- [vercel/next.js](https://github.com/vercel/next.js)
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
  - [Persistent Layout Patterns in Next.js](https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/)
  - https://github.com/kirill-konshin/next-redux-wrapper
  - i18n https://github.com/isaachinman/next-i18next/issues/274
  - [unicodeveloper/awesome-nextjs](https://github.com/unicodeveloper/awesome-nextjs)
  - [nextauthjs/next-auth](https://github.com/nextauthjs/next-auth)
  - [vercel/platforms](https://github.com/vercel/platforms)
    - template for site builders and low-code tools.
  - [Layouts RFC](https://nextjs.org/blog/layouts-rfc)
    - https://nextjs.org/docs/basic-features/layouts

:::tip

- getInitialProps
  - 只能用于页面组件不能用于子组件
  - 在第一次渲染会执行，之后会在客户端做转换
  - 不要能服务端的模块，通过 API 实现调用
- 内置了 node-fetch
- 增量缓存的页面位于 .next/server/pages
  - 可以考虑映射到外部 - 需要拷贝初始数据

:::

:::caution

- 无法按页面切分 CSS
  - 最终会生成单个 css 文件
  - 只有 `_app` 可以导入全局 css
- ~~单一 HTML 入口 - 不像 vite 支持多入口~~
- rewrites 会在 build 时生成 router-manifest, 因此 start 时配置的变量 **无法** 产生影响
- ESM 使用还有问题
  - 目前 main 最好还是指向 cjs
  - import ESM module fails with custom typescript server [#36940](https://github.com/vercel/next.js/issues/36940)
  - next.config.js 只能是 cjs [#32239](https://github.com/vercel/next.js/discussions/32239)
    - next 不会检测使用 next.config.cjs, 因此目前别无选择
    - NextJS 自身时 bundle 后的 CJS，重写为 ESM 难度高
  - [next.js#36940](https://github.com/vercel/next.js/issues/36940)
  - ESM 相关问题 [alineacms/alinea#31](https://github.com/alineacms/alinea/issues/31)
- 路径不支持 UTF8 [#10084](https://github.com/vercel/next.js/issues/10084)

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
cat << INDEX > pages/index.tsx
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

```ts
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

## Create

```bash
npx -y create-next-app@latest --ts
npx -y tailwindcss init -p
npm add -D tailwindcss postcss autoprefixer @tailwindcss/typography
npm add @headlessui/react zustand
# npm add react-query

npm add -D prettier
npm add -D @trivago/prettier-plugin-sort-imports

mkdir src/{components,hooks,contents,server,client}

# 按需
npm add classnames
npm add react-icons
npm add daisyui
# 数据
npm add axios react-query

# 后台
npm add react-table @tanstack/react-virtual
```

```json title="package.json"
{
  "prettier": {
    "bracketSameLine": false,
    "importOrder": ["^(?!@src/)", "^[^.]", "^[.][.]", "^[.][/]"],
    "importOrderSeparation": false,
    "trailingComma": "all",
    "printWidth": 120,
    "singleQuote": true,
    "overrides": [
      {
        "files": ["*.html", "*.css"],
        "options": {
          "singleQuote": false
        }
      }
    ]
  },
  "lint-staged": {
    "**/*": "prettier --write --ignore-unknown"
  }
}
```

```js title="postcss.config.js"
module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- WebStorm
  - Languages & Frameworks -> Style Sheets -> Dialects -> PostCSS
  - Languages & Frameworks -> JavaScript -> Prettier -> On 'Reformat Code' action

## middleware

- https://github.com/vercel/examples/tree/main/edge-functions

```ts title="pages/_middleware.ts"
import type { NextFetchEvent, NextRequest } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  return new Response('Hello, world!');
}
```

## next/image

- 缓存到 `<distDir>/cache/images` - `.next/cache/images`
- 返回包含 x-nextjs-cache - MISS, STALE, HIT
- 缓存时效 max(minimumCacheTTL,Cache-Control.s-maxage || Cache-Control.max-age)

| prop        | default   |
| ----------- | --------- | --------------------- |
| quality     | 75        |
| sizes       | 100vw     |
| priority    | false     |
| placeholder | empty     | blur 提供 blurDataURL |
| unoptimized | false     |
| layout      | intrinsic |
| loading     | lazy      |

- width/height
  - 除了 fill 其他都需要 width 和 height
  - responsive, fill - 表示图片本来大小
  - intrinsic, fixed, raw - 表示渲染大小
- sizes - md [sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes)
  - responsive 和 fill 默认使用 100vw
    - 100vw 优化空间小
    - 建议提供 sizes 属性
  - 如果实际没显示这么大，尽量设置一个合理的更小的值，提高压缩比 - 例如 50vw
  - intrinsic 和 fixed 不使用 sizes

| layout     | srcSet                   | sizes |
| ---------- | ------------------------ | ----- | ------------------------------- |
| intrinsic  | imageSizes               |       | 缩小适配容器                    |
| fixed      | imageSizes               |       | 固定 width, height              |
| responsive | imageSizes + deviceSizes | 100vw | 适配容器 width                  |
| fill       | imageSizes + deviceSizes | 100vw |
| raw        |                          |       | 有 sizes 同 sizes, 否则同 fixed |

- intrinsic - 根据 viewport 缩放
- fixed - 固定大小，不考虑 viewport - 接近 `img`
- responsive - intrunsic+fixed - 要求 parent 是 `display: block`
- fill
  - 需要 parent 是 `position: relative`
  - 通常配合 objectFit
- 考虑 viewport -> 有 srcset

---

- sizes - 选择 srcsec 的依据
  - `<media-query> <size>, <size>`
  - 最后一个不能有 media-query
  - `(max-width: 600px) 200px, 50vw`
  - tailwindcss container
    - `(max-width: 1536px) 1536px, (max-width: 1280px) 1280px, (max-width: 1024px) 1024px, (max-width: 768px) 768px, (max-width: 640px) 640px, 100vw`
    - `(min-width: 720px) 35vw, 50vw`
- srcsec
  - `<url> <descriptor>`
    - descriptor - `<width>w|<density>x`
      - 默认 1x
    - 不应该同时包含 width 和 density
  - `200.png 200w, 400.png 400w`
  - `1x.png 1x, 2x.png 2x`
- img.currentSrc - 判断当前使用的 src
- 参考
  - [joe-bell/plaiceholder](https://github.com/joe-bell/plaiceholder)
  - https://image-component.nextjs.gallery/
  - [cyrilwanner/next-optimized-images](https://github.com/cyrilwanner/next-optimized-images)
    - 支持优化更多图像类型，作为参考

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 180,
    // avif 比 webp 慢 20%，小 20%
    // 默认只有 image/webp 建议添加 image/avif
    formats: ['image/avif', 'image/webp'],

    // 图片变种 deviceSizes*imageSizes
    // responsive 和 fill 时使用
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // srcset - 在提供了 size 时使用
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // svg
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: `default-src 'self'; script-src 'none'; sandbox;`,
    // hosts
    domains: ['via.placeholder.com', 'lh3.googleusercontent.com'],

    // 支持的平台 imgix, cloudinary, akamai
    // 使用 custom 可自行提供实现 - ({ src, width, quality }) => string
    // 开发环境使用 squoosh - 慢但易于安装
    // 生产环境推荐 sharp
    // loader: 'default',
  },
};
module.exports = nextConfig;
```

## 动态路由 {#dynamic-routes}

- `pages/post/[pid].js`
- `pages/post/[pid]/[comment].js`
- `pages/post/[...slug].js`
- `pages/post/[[...slug]].js`
  - 可选全部捕获
  - 会匹配 - `/post`

# FAQ

## sharp

- 不建议在主镜像内构建
  - Alpine 构建依赖 vips-dev glib-dev make gcc g++
- NEXT_SHARP_PATH=/tmp/node_modules/sharp next start
- https://github.com/lovell/sharp-libvips
- https://nextjs.org/docs/messages/install-sharp
- https://nextjs.org/docs/messages/sharp-missing-in-production

```bash
# 指定 platform 可从 dist 下载预编译
npm install --verbose --platform=linuxmusl sharp
```

## next.config.js

- https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration

## next

- https://github.com/vercel/next.js/blob/canary/packages/next/shared/lib/html-context.ts
- unstable_runtimeJS
- unstable_JsPreload
- PageConfig
  - https://github.com/vercel/next.js/blob/2a42de2fd18a7c06a8f3d931405386a8283280ef/packages/next/types/index.d.ts#L63-L89
