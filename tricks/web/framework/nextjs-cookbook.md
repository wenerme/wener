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
