# Performance
## HTTP Caching



对 HTTP 缓存的概述

* 服务端返回时携带 `ETag` 用于标示该资源的一个签名,例如 hashCode 或版本号
* 客户端请求时携带 `If-None-Match` 为上次服务器返回的 `ETag` 值
* 如果服务器判断请求的资源未更改,则返回 `304 Not Modified` 不需要返回具体内容.
* 通过 `Cache-Control: max-age=120` 来控制缓存多久,单位为秒

### Cache-Control
[规范](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9)中定义了用于实现对缓存控制的 `Cache-Control` 参数.


![如何定义缓存](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/images/http-cache-decision-tree.png)



https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching
https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching_FAQ
