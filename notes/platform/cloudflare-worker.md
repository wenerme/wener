---
title: Cloudflare Workers
---

# Worker

- [cloudflare/wrangler](https://github.com/cloudflare/wrangler)
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
- Free
  - Workers Bundled
    - 10 ms/请求
    - 第一个请求后的延迟最低
    - 100,000 请求/天
  - KV
    - 全局性的低延迟键值边缘存储
    - 100,000 read/day
    - 1,000 update or list/day
- Paid Plan - Bundled - US$5/月
  - 10 million 请求/月, +$0.50/million
  - 50ms/请求
- Paid plan - Unbound
  - 1 million 请求/月, + $0.15/million
  - 400,000 GB-s, +$12.50/million GB-s

:::note

- [serverless-next.js#111](https://github.com/serverless-nextjs/serverless-next.js/issues/111)

:::

## wrangler

```bash
npm i @cloudflare/wrangler -g

wrangler login
```

- ~/.wrangler/config/default.toml

# FAQ

## You have not installed wrangler

```bash
node $(dirname $(realpath $(which wrangler)))/install-wrangler.js
```
