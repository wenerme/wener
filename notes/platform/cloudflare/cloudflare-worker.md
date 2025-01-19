---
title: Cloudflare Workers
---

# Worker

- [cloudflare/workerd](https://github.com/cloudflare/workerd)
  - Apache-2.0, C++
  - JavaScript/Wasm runtime that powers Cloudflare Workers
  - V8+Patches
  - 开源运行时
- [cloudflare/wrangler](https://github.com/cloudflare/wrangler)
  - 本地开发环境
- [cloudflare/miniflare](https://github.com/cloudflare/miniflare)
  - Fully-local simulator
- [skymethod/denoflare](https://github.com/skymethod/denoflare)
  [HN](https://news.ycombinator.com/item?id=29142772)
- [losfair/blueboat](https://github.com/losfair/blueboat)
  - open-source alternative to Cloudflare Workers
- [cloudflare/production-saas](https://github.com/cloudflare/production-saas)
- [flareact/flareact](https://github.com/flareact/flareact)
  - Edge-rendered React framework built for Cloudflare Workers
- [lukeed/worktop](https://github.com/lukeed/worktop)

:::note

- 会移除 `.html` 后缀
- Cloudflare Workers [serverless-next.js#111](https://github.com/serverless-nextjs/serverless-next.js/issues/111)
- worker 没有本地临时 存储
  - 使用 KV 或 R2

:::

- https://workers.cloudflare.com/

# FAQ

## OpenAI API Country, region, or territory not supported

- Cloudflare 会使用请求的 IP 来发出请求
- 因此从国内发出的请求还是会被拦截

## You have not installed wrangler

```bash
node $(dirname $(realpath $(which wrangler)))/install-wrangler.js
```
