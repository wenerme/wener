---
title: FAQ
tags:
  - FAQ
---

# FAQ

| Request           | Response         |
| ----------------- | ---------------- |
| [Accept-Encoding] | Content-Encoding |

- Response
  - Accept-Ranges: bytes|none - 是否支持部分请求

[accept-encoding]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding

```
Accept-Encoding: br;q=1.0, gzip;q=0.8, *;q=0.1
Range: bytes=200-1000, 2000-6576, 19000-
```

## Transfer-Encoding vs Content-Encoding

- Transfer-Encoding - 可动态修改 - 传输层
- Content-Encoding - 不要动态修改 - 业务逻辑层
  - 大多客户端实现都使用 Content-Encoding 检测压缩

---

```bash
# 返回 content-encoding: gzip
curl -H 'Accept-encoding: gzip' -I https://s.wener.me

curl -H 'Accept-encoding: zstd, br, gzip, deflate' -I https://s.wener.me
```

- [What will Cloudflare compress?](https://support.cloudflare.com/hc/en-us/articles/200168396)
- https://stackoverflow.com/a/11664307/1870054

## 301 vs 302

- 301 Moved Permanently
  - 永久，客户端下次可能直接映射重定向后的地址
- 302 Found / Moved Temporarily
  - 临时，还会再请求
- 303 See Other
  - 特定语义
- 307 Temporary Redirect
  - 请求重发
  - 支持 POST
- 308 Permanent Redirect
  - 类似 301 但不允许修改 method

## HTTP SEARCH/QUERY Method

- GET 支持缓存，但不能携带 Body 请求
- POST 可以用作查询，但不能缓存
- 目前应该会支持 QUERY 方法

> HTTP SEARCH is a new HTTP method, for safe requests that include a request body. It's still early & evolving, but it was recently adopted as an IETF draft standard, and it's going to add some great new tools for HTTP development everywhere.
>
> -- httptoolkit

---

- https://datatracker.ietf.org/doc/draft-ietf-httpbis-safe-method-w-body/
- https://github.com/httpwg/http-extensions/labels/safe-method-w-body
- https://httptoolkit.com/blog/http-search-method/
- ecosystem
  - https://github.com/nestjs/nest/pull/10533 NextJS v10 support SEARCH method
  - Support for new HTTP QUERY method [akka-http#3936](https://github.com/akka/akka-http/issues/3936)


## Accept-Encoding

- Chrome 123
  - Accept-Encoding: gzip, deflate, br, zstd
- [nodejs/undici#2847](https://github.com/nodejs/undici/issues/2847)
  - fetch zstd support
- https://caniuse.com/zstd
- https://github.com/web-platform-tests/wpt/tree/master/fetch/content-encoding/zstd
