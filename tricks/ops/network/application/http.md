# HTTP

## Tips
* 301 vs 302
  * 301 Moved Permanently
  * 302 Found / Moved Temporarily
* Cache
  * MDN [Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)


```
# 单位为秒
Cache-Control: public, max-age=3600
Expires: Thu, 01 Dec 2014 16:00:00 GMT
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
