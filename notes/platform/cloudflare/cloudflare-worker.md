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
- [Pricing](https://developers.cloudflare.com/workers/platform/pricing/)
  - Free
    - Workers Bundled
      - 第一个请求后的延迟变低
      - 10 ms/请求
      - 100,000 请求/天
      - 最多 1000 秒/天, 一个月最多 30,000 秒, =500 分钟
    - KV
      - 全局性的低延迟键值边缘存储
      - 100,000 read/day
      - 1,000 update or list/day
  - Paid Plan - Bundled - US$5/月
    - 10 million 请求/月, +$0.50/million
    - 30s/请求
    - 100M/请求
    - 30Mms/CPU时间 - 500分钟, 约 8.3 小时
  - Paid plan - Unbound
    - 1 million 请求/月, + $0.15/million
    - 400,000 GB-s, +$12.50/million GB-s

:::note

- Cloudflare Workers [serverless-next.js#111](https://github.com/serverless-nextjs/serverless-next.js/issues/111)

:::

- https://workers.cloudflare.com/

## wrangler

```bash
npm create cloudflare@latest -- my-first-worker

npm i @cloudflare/wrangler -g

wrangler login
```

- ~/.wrangler/config/default.toml

# FAQ

## You have not installed wrangler

```bash
node $(dirname $(realpath $(which wrangler)))/install-wrangler.js
```
