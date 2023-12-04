---
title: NextJS FAQ
tags:
  - FAQ
---

# NextJS FAQ

- https://github.com/vercel/next.js/blob/canary/packages/next/src/lib/server-external-packages.json

:::caution

- react router 会导致页面整个刷新 [#49479](https://github.com/vercel/next.js/issues/49479)
- NextJS Server
  - 尽量避免太重的 Server
    - 导致前端开发慢
    - 依赖可能出现各种问题
  - Server 环境复杂 - middleware、server action、edge
    - 使用可能有各种注意事项
    - Server 会初始化多次
  - Server 会导致环境依赖
    - 复用度降低
  - 如果不需要 服务端渲染/SSR/SEO 尽量避免过多 Server 代码

:::

## 环境变量

- dotenv 会自动 reload
- .env 加载顺序
  - `.env.$(NODE_ENV).local`
    - development production test
    - 不该加到 git 参考
  - .env.local
    - 不会打包到 standalone
    - test 不会加载
  - `.env.$(NODE_ENV)`
  - .env
    - 会被打包到 standalone

```ts
// 测试加载
import { loadEnvConfig } from '@next/env';
export default async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};
```

- 默认暴露到前端 `NEXT_PUBLIC_`
- NEXTAUTH_URL
  - [next-auth](./next-auth.md)
- NEXT_PUBLIC_VERCEL_URL
- 参考
  - https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables

| env                    | demo                                 | production                     |
| ---------------------- | ------------------------------------ | ------------------------------ |
| BASE_PATH              | /auth                                |
| NEXT_PUBLIC_URL        | http://127.0.0.1:$PORT               | https://wener.me               |
| NEXT_PUBLIC_BASE_PATH  | `$BASE_PATH `                        |
| NEXT_PUBLIC_BASE_URL   | `$NEXT_PUBLIC_URL$BASE_PATH`         |
| NEXTAUTH_URL           |
| PORT                   | 3000                                 |
| NEXTAUTH_URL           | http://127.0.0.1:$PORT/auth/api/auth | https://wener.me/auth/api/auth |
| NEXTAUTH_URL_INTERNAL  | http://127.0.0.1:$PORT/auth/api/auth |
| NEXTAUTH_SECRET        |                                      | 生产环境必须                   |
| NEXT_PUBLIC_VERCEL_URL |

```ini
PORT=3000
BASE_PATH=/auth
NEXTAUTH_URL=http://127.0.0.1:$PORT/auth/api/auth
NEXTAUTH_URL_INTERNAL=http://127.0.0.1:$PORT/auth/api/auth
NEXTAUTH_SECRET=
```

## socket hang up - 30s timeout

- rewrite 时出现
- 本地测试可以 Disabling HTTP Keep-Alive
  - https://nextjs.org/docs/api-reference/next.config.js/disabling-http-keep-alive
- 线上可以配置 experimental.proxyTimeout

```js
module.exports = {
  httpAgentOptions: {
    keepAlive: false,
  },
  experimental: {
    proxyTimeout: 30_000, // 默认 30s
  },
};
```

## pathname vs asPath

| path          | pathname     | asPath          |
| ------------- | ------------ | --------------- |
| /             | /            | /               |
| /user/123     | `/user/[id]` | `/user/123`     |
| /user/123#top | `/user/[id]` | `/user/123#top` |

- asPath 真实路径
- pathname NextJS 的文件路径

## server vs serverless

- server
  - 打包为整个应用
  - 支持自定义 server
  - 支持长链接 - websocket
  - 建议使用
- serverless
  - 不会构建一体化应用
  - 页面独立 - 服务与页面不耦合
  - 页面与服务分离后更容易部署
    - 但依然是需要 next 来运行 - [#4496](https://github.com/zeit/next.js/issues/4496)
  - vercel 默认模式
- 参考
  - [Build Target](https://nextjs.org/docs/api-reference/next.config.js/build-target)

## next.config.ts

**next.config.js**

```js
require('ts-node').register(require('./tsconfig.json'));

module.exports = require('./next.config.ts');
```

## next.config.js 类型提示

```js
/** @type {import('next').NextConfig} */
module.exports = {};
```

## Prop className did not match

nextjs 12 后需要配置 compiler

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // 添加
    styledComponents: true,
  },
};
module.exports = nextConfig;
```

## 使用单一的 API 来处理所有接口

```bash
yarn add polka cors body-parser
```

```ts
import polka from 'polka';
import cors from 'cors';
import { json, text, urlencoded } from 'body-parser';

let _router;

export function getRouter() {
  return _router || (_router = routes(setup(polka())));
}

function setup(route) {
  // treat path params as query - same as how next api handle this
  route.use((req, res, next) => {
    if (req.params) {
      const q = req.query;
      for (const [k, v] of Object.entries(req.params)) {
        if (!q[k]) {
          q[k] = v;
        }
      }
    }
    return next();
  });
  return route;
}

export function routes(r: any) {
  const route = r as Router<NextApiRequest, NextApiResponse>;
  // handle error
  route.use(async (req, res, next) => {
    try {
      return await next();
    } catch (e) {
      const detail = normalizeError(e);
      res.status(detail.status).json(detail);
      console.error(`ERROR Handle ${req.url}`, e);
    }
  });
  route.use(json());
  route.use(urlencoded({ extended: true }));
  route.use(text());

  const corsOrigin = cors({ origin: true });

  // cors
  route.get('/api/cors', corsOrigin as any, (req, res) => res.json({}));
  // path params
  route.get('/api/user/:id', corsOrigin as any, (req, res) => res.json({ id: req.query.id }));

  return route;
}

export function handleRequest(req, res) {
  getRouter().handler(req, res);
}

export default handleRequest;
export const config = {
  api: {
    bodyParser: false,
  },
};
```

## Critical dependency: the request of a dependency is an expression

构建为 serverless 时可能出现

- [#10633](https://github.com/vercel/next.js/issues/10633)

## 禁用 minification

```js
export default {
  productionBrowserSourceMaps: true,
  webpack(config) {
    config.optimization.minimize = false;
    config.optimization.minimizer = [];
    return config;
  },
};
```

## css 顺序不一致

将 app 导入的 css 抽取放到一个 css 文件进行导入

```css
@import '~normalize.css/normalize.css';
@import '~@blueprintjs/icons/lib/css/blueprint-icons.css';
@import '~@blueprintjs/core/lib/css/blueprint.css';
@import '~@blueprintjs/select/lib/css/blueprint-select.css';
@import '~@blueprintjs/datetime/lib/css/blueprint-datetime.css';
@import '~@blueprintjs/popover2/lib/css/blueprint-popover2.css';
@import '~@blueprintjs/table/lib/css/table.css';
@import '~tailwindcss/tailwind.css';
@import '~nprogress/nprogress.css';
```

确保 tailwind 覆盖 blueprintjs 样式

- 开启 webpack5 该方式无效
- [#16630](https://github.com/vercel/next.js/issues/16630)

## 访问 public 里的 index.html

```js
module.export = {
  async rewrites() {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: '/:path*/index.html',
        },
      ],
    };
  },
};
```

- https://github.com/vercel/next.js/discussions/14361#discussioncomment-874019

## Lockfile was successfully patched, please run "npm install" to ensure @next/swc dependencies are downloaded

## standalone

- 非常适用于 docker 环境
- 只需要 .next/standalone 不需要 node_modules
- 使用 [@vercel/nft](https://github.com/vercel/nft) 分析 import

```js
module.exports = {
  output: 'standalone',
  experimental: {
    // monorepo 需要调整 root
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
};
```

```dockerfile
FROM node:16-alpine
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# monorepo need prefix path
COPY next.config.js ./apps/web/
COPY public ./apps/web/public
COPY package.json ./apps/web/package.json

COPY --chown=nextjs:nodejs .next/standalone ./
COPY --chown=nextjs:nodejs .next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

# monorepo
CMD ["node", "apps/web/server.js"]
```

- 由于 hosting 的原因，可能出现模块无法找到的问题
- pnpm 重复 build 会有问题
- 基于 [@vercel/nft](https://github.com/vercel/nft) 跟踪依赖
  - ntf -> Node File Trace
- https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files-experimental
- https://github.com/vercel/next.js/discussions/16995

## dynamic preload

- dyanmic 不会预加载 - prefetch
- 使用 @loadable/component

## safari tel

```html
<meta name="format-detection" content="telephone=no" />
```

## 检测在浏览器

```js
// Webpack 定义 - 会根据依赖来移除代码
// https://github.com/zeit/next.js/pull/5159
process.browser;
// 通用逻辑
typeof window === 'undefined';
```

## 如何在 getInitialProps 引入服务端模块

- 如果直接 require 是会导致被打包到客户端代码的

```js
const faker = eval("require('faker')");
```

这个方式是最简单的，其他方式参考 [SSR and Server Only Modules](https://arunoda.me/blog/ssr-and-server-only-modules)

## Invalid left-hand side in assignment "MyModule\*" = namespaces;

- [using npm debug module breaks build (overriding any property on process.env)](https://spectrum.chat/zeit/now/using-npm-debug-module-breaks-build-overriding-any-property-on-process-env~b36f36b2-7785-4aea-b1f9-065a284b4188)
- debug 模块的问题 - 注意引入位置 - 如果通过 transpile 可能会有问题

## 分析服务端代码和 SSR 代码

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

## You're using a Node.js module (buffer) which is not supported in the Edge Runtime

- Buffer.from -> atob/btoa
- https://nextjs.org/docs/api-reference/edge-runtime

## Expected server HTML to contain a matching div

```tsx
function App({ Component, pageProps }: AppProps) {
  return (
    <div suppressHydrationWarning> // <- ADD THIS
      {typeof window === 'undefined' ? null : <Component {...pageProps} />}
    </div>
  );
}
```

## SPA rewrites

```ts title="next.config.js"
module.exports = {
  async rewrites() {
    return [
      {
        source: '/:any*',
        destination: '/',
      },
    ];
  },
};
```

## Date cannot be serialized as JSON

superjson

## Module build failed: UnhandledSchemeError: Reading from "node:assert" is not handled by plugins (Unhandled scheme).

```js title="next.config.js"
const webpack = require('webpack');

module.exports = {
  webpack: (config, options) => {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      }),
    );
    return config;
  },
};
```

- middleware 运行环境限制很多
  - https://nextjs.org/docs/api-reference/edge-runtime
- webpack 不支持 node 协议
- https://github.com/vercel/next.js/issues/28774

## Can't resolve 'assert'

```bash
npm add assert
```

- node:assert -> assert

## Creating an optimized production build

- https://github.com/vercel/next.js/issues/37825

## DYNAMIC_SERVER_USAGE

dynamic ssr:false 时出现

## Warning: lazy: Expected the result of a dynamic import() call.

NextJS ssr 不支持 React.lazy

## Cannot read properties of null (reading 'useRef')

- SSR, Hook
- appDir: false 还是出现
- "use client"
- [zustand#1395](https://github.com/pmndrs/zustand/issues/1395)
- https://github.com/vercel/next.js/issues/42263

## 库 import 必须要有 .js 后缀 {#js-extension}

- 因为 `{ "type": "module" }`, `{ "resolution": "NodeNext" }` 定义如此
- 但是 swc compile 出来没有
- https://github.com/vercel/next.js/discussions/32237
- `--experimental-specifier-resolution=node`
  - 允许没有 .js 后缀
- https://stackoverflow.com/questions/62619058

```bash
NODE_OPTIONS=--experimental-specifier-resolution=node
```

## process.env.NEXT_PHASE

```bash
export const PHASE_EXPORT = 'phase-export'
export const PHASE_PRODUCTION_BUILD = 'phase-production-build'
export const PHASE_PRODUCTION_SERVER = 'phase-production-server'
export const PHASE_DEVELOPMENT_SERVER = 'phase-development-server'
export const PHASE_TEST = 'phase-test'
export const PHASE_INFO = 'phase-info'
```

- https://github.com/vercel/next.js/blob/2de45693a9207c040dcc0f1a1d1a4f44431170e2/packages/next/src/shared/lib/constants.ts#L23-L28

## Failed to find Server Action. This request might be from an older or newer deployment.

## await isn't allowed in non-async function

- NextJS 14， Server Action

```
await __webpack_async_dependencies__
```

- https://github.com/vercel/next.js/discussions/57535

```js
const config = {
  experimental: {
    // https://github.com/vercel/next.js/discussions/57535
    esmExternals: false,
  },
};
```
