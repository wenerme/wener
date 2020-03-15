---
id: nextjs-cookbook
title: NextJS Cookbook
---

# NextJS Cookbook

* 官方例子 https://github.com/zeit/next.js/tree/canary/examples

* compose https://github.com/JerryCauser/next-compose/blob/master/index.js
* https://dev.to/toomuchdesign/next-js-react-router-2kl8

```ts
// 判断服务端
const isServer = typeof window === 'undefined'
```

## 配置问题排查

```js
// 输出 Webpack 的匹配规则
config.module.rules.forEach(rule => console.log(`Rule Test ${rule.test} Use`, rule.use))
```

## 页面基础代码
```ts
import React from 'react';
import {NextPage} from 'next';

const Page: NextPage = () => {
  return <div></div>
}

export default Page
```

## API 基础代码

```ts
import {NextApiRequest, NextApiResponse} from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({version: process.env.APP_VERSION || '1.0.0'})
};

export default handler;
```

## 页面跳转

```ts
// 初始阶段跳转
Page.getInitialProps = async ({res}) => {
  // 目标地址
  let targetUrl = '...'
  if (!res) {
    window.location.href = targetUrl
  } else {
    res.writeHead(302, {Location: targetUrl})
    res.end()
  }
  return {}
}

// 页面内跳转
function MyPage() {
  const router = useRouter()
  useEffect(() => {
    if (!auth) {
      router.push('...')
    }
  },[])
}

// API 跳转
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.clearCookie('authenticated')
  res.writeHead(302, { Location: '/login' })
  res.end()
};
```

## SSE - Servr-Send Event

```ts
import {NextApiRequest, NextApiResponse} from 'next'

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// curl -Nv localhost:3000/test/see
// https://zeit.co/pricing#limits Zeit free only allowed 10s/req
// NOTE Zeit deploy not works - because the request will be buffered
// https://github.com/zeit/next.js/issues/9965
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('X-Accel-Buffering', 'no');

  for (let i = 0; i < 5; i++) {
    res.write(`data: Hello seq ${i}\n\n`);
    await sleep(1000);
  }
  res.end('done\n');
};

export default handler;
```

```html
<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <title>EventSource test</title>
  </head>
  <body>

    <h1>EventSource test</h1>
    <ul></ul>

    <script type="text/javascript">
      var logger = document.getElementsByTagName('ul')[0],
          socket = new EventSource('/');

      var log = function(text) {
        logger.innerHTML += '<li>' + text + '</li>';
      };

      socket.onopen = function() {
        log('OPEN');
      };

      socket.onmessage = function(event) {
        log('MESSAGE: ' + event.data);
      };

      socket.addEventListener('update', function(event) {
        log('UPDATE(' + event.lastEventId + '): ' + event.data);
      });

      socket.onerror = function(event) {
        log('ERROR: ' + event.message);
      };
    </script>

  </body>
</html>
```

## CSS 导入字体

```js
config.module.rules.push({
  test: /\.(eot|woff|woff2|ttf)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 100000,
      name: '[name].[ext]'
    }
  }
});
```

## 导入 SVG
* url-loader inline 会生成 dataurl - react 可能导致异常
* [next-images](https://github.com/twopluszero/next-images)

```ts
// Typescript 确保不会出现类型错误
declare module '*.svg'

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
```

### 使用 @svgr/webpack
* 可以使用 tsconfig 中的 path
* https://react-svgr.com/docs/webpack/
* https://github.com/webpack-contrib/url-loader/issues/86
* Base64 问题
  * https://github.com/gregberge/svgr/issues/361

```bash
yarn add --dev @svgr/webpack babel-loader
```

```js
config.module.rules.push({
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: 'babel-loader',
    },
    {
      loader: '@svgr/webpack',
      options: {
        babel: false,
        icon: true,
      },
    },
  ],
});
```

### 使用 inline-react-svg
* __不可以__ 使用 tsconfig 中的 path
* 会用 SVGO 优化

```bash
yarn add --dev babel-plugin-inline-react-svg
```

```json
{
  "presets": [ "next/babel" ],
  "plugins": [ "inline-react-svg" ]
}
```
