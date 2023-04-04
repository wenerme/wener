---
title: Cache-Control
---

# Cache-Control

- MDN [Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
- https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching
- https://support.cloudflare.com/hc/en-us/articles/115003206852-Understanding-Origin-Cache-Control
- max-age=0 vs no-cache
  - https://stackoverflow.com/a/1383359/1870054
- [If-None-Match](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-None-Match)
  - `W/` weak validator
  - GET, HEAD
  - 值为 etag, 存在则返回 304 Not Modified
  - 修改操作, 412 Precondition Failed
  - `If-None-Match: "<etag>"[, "<etag>"]`

**请求**

```
Cache-Control: max-age=<seconds>
Cache-Control: max-stale[=<seconds>]
Cache-Control: min-fresh=<seconds>
Cache-Control: no-cache
Cache-Control: no-store
Cache-Control: no-transform
Cache-Control: only-if-cached
```

**响应**

```
Cache-Control: must-revalidate
Cache-Control: no-cache
Cache-Control: no-store
Cache-Control: no-transform
Cache-Control: public
Cache-Control: private
Cache-Control: proxy-revalidate
Cache-Control: max-age=<seconds>
Cache-Control: s-maxage=<seconds>

Cache-Control: immutable
Cache-Control: stale-while-revalidate=<seconds>
Cache-Control: stale-if-error=<seconds>
```

- private - 面向单用户 - Authorization - browser 缓存
- public - 多用户共享缓存 - proxy cache 缓存
- post-check
- pre-check
- immutable
  - max-age 内避免尝试校验缓存

```
# 单位为秒
Cache-Control: public, max-age=3600
Expires: Thu, 01 Dec 2014 16:00:00 GMT
```

- Cache-Control: public, max-age=86400
  - static asset
- Cache-Control: no-store
  - 不缓存
- Cache-Control: private, max-age=3600
  - 浏览器缓存但 Proxy 不缓存
- Cache-Control: public, no-cache
  - prefer revalidation when served
- Cache-Control: public, no-cache, proxy-revalidate or Cache-Control: public, s-maxage=0
  - Cache assets in proxy caches but REQUIRE revalidation by the proxy when served
- Cache-Control: public, no-cache, must-revalidate
  - Cache assets in proxy caches, but REQUIRE revalidation by any cache when served
- Cache-Control: public, no-transform
  - Cache assets, but ensure the proxy does not modify it
- Cache-Control: public, max-age=3600, stale-if-error=60
  - Cache assets with revalidation, but allow stale responses if origin server is unreachable
- Cache-Control: public, max-age=7200, s-maxage=3600
  - Cache assets for different amounts of time on Cloudflare and in visitor browsers
- Cache-Control: max-age=600, stale-while-revalidate=30
  - Cache an asset and serve while asset is being revalidated
- https://developers.cloudflare.com/cache/about/cache-control

## 平台

- x-vercel-cache
  - HIT, MISS
- x-vercel-id
- cf-cache-status
  - HIT, MISS, EXPIRED, DYNAMIC, BYPASS
