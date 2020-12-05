---
id: http
title: HTTP
---

# HTTP

## Tips
* 301 vs 302
  * 301 Moved Permanently
  * 302 Found / Moved Temporarily


```
# 单位为秒
Cache-Control: public, max-age=3600
Expires: Thu, 01 Dec 2014 16:00:00 GMT
```

## CORS
* 默认允许头
  * Cache-Control
  * Content-Language
  * Content-Type
  * Expires
  * Last-Modified
  * Pragma
* access-control-expose-headers - 控制暴露头

```yaml
# 请求
Access-Control-Request-Headers: authorization
Access-Control-Request-Method: GET

# 响应
Access-Control-Allow-Headers: authorization
Access-Control-Allow-Methods: POST,GET
Access-Control-Allow-Origin: http://127.0.0.1:3000
```

## HTTP2
* [HTTP/2 and SPDY indicator](https://chrome.google.com/webstore/detail/http2-and-spdy-indicator/mpbpobfflnpcgagjijhmgnchggcjblin)
* [chrome://net-internals/#http2](chrome://net-internals/#http2)

## QUIC
* Quick UDP Internet Connections
* [SwitchyOmega#706](https://github.com/FelisCatus/SwitchyOmega/issues/706) - Support QUIC proxies
* [chrome://net-internals/#quic](chrome://net-internals/#quic)
* https://en.wikipedia.org/wiki/QUIC
* https://github.com/curl/curl/wiki/QUIC
* https://www.chromium.org/quic
* https://github.com/mholt/caddy/wiki/QUIC
* QUIC 希望能够提供等同于 SSL/TLS 层级的网络安全保护，减少数据传输及创建连接时的延迟时间，双向控制带宽，以避免网络拥塞。
