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
