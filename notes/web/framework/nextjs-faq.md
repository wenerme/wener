---
title: NextJS FAQ
---

## server vs serverless
* server
  * 打包为整个应用
  * 支持自定义 server
  * 支持长链接 - websocket
* serverless
  * 不会构建一体化应用
  * 页面独立 - 服务与页面不耦合
  * 页面与服务分离后更容易部署
    * 但依然是需要 next 来运行 - [#4496](https://github.com/zeit/next.js/issues/4496)
  * vercel 默认模式
* 参考
  * [Build Target](https://nextjs.org/docs/api-reference/next.config.js/build-target)

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
  route.get('/api/cors', corsOrigin as any, (req,res)=>res.json({}));
  // path params
  route.get('/api/user/:id', corsOrigin as any, (req,res)=>res.json({id:req.query.id}));

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
