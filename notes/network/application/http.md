---
title: HTTP
---

# HTTP

- 301 vs 302
  - 301 Moved Permanently
  - 302 Found / Moved Temporarily
- 参考
  - https://tools.ietf.org/id/draft-wright-http-partial-upload-01.html

```
# 单位为秒
Cache-Control: public, max-age=3600
Expires: Thu, 01 Dec 2014 16:00:00 GMT
```

## CORS

- 默认允许头
  - Cache-Control
  - Content-Language
  - Content-Type
  - Expires
  - Last-Modified
  - Pragma
- access-control-expose-headers - 控制暴露头

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

- [HTTP/2 and SPDY indicator](https://chrome.google.com/webstore/detail/http2-and-spdy-indicator/mpbpobfflnpcgagjijhmgnchggcjblin)
- [chrome://net-internals/#http2](chrome://net-internals/#http2)

## QUIC

- Quick UDP Internet Connections
- [SwitchyOmega#706](https://github.com/FelisCatus/SwitchyOmega/issues/706) - Support QUIC proxies
- [chrome://net-internals/#quic](chrome://net-internals/#quic)
- https://en.wikipedia.org/wiki/QUIC
- https://github.com/curl/curl/wiki/QUIC
- https://www.chromium.org/quic
- https://github.com/mholt/caddy/wiki/QUIC
- QUIC 希望能够提供等同于 SSL/TLS 层级的网络安全保护，减少数据传输及创建连接时的延迟时间，双向控制带宽，以避免网络拥塞。

## Digest

- [Digest access authentication](https://en.wikipedia.org/wiki/Digest_access_authentication)
- 现在使用 digest 场景比较少 - 因为需要存储明文
- SIP 使用 digest
- 一般使用 Basic over HTTPS
- 算法
  - MD5
  - MD5-sess - HA1 = MD5(MD5(username:realm:password):nonce:cnonce)
  - SHA-256
  - SHA-256-sess
  - SHA-512
  - SHA-512-sess
- qop - quality of protection
  - auth
    - HA2 = MD5(method:digestURI)
    - response = MD5(HA1:nonce:nonceCount:cnonce:qop:HA2)
  - auth-int
    - HA2 = MD5(method:digestURI:MD5(entityBody))
    - response = MD5(HA1:nonce:nonceCount:cnonce:qop:HA2)
  - 无 - response = MD5(HA1:nonce:HA2)

```
HA1 = MD5(username:realm:password)
HA2 = MD5(method:digestURI)
response = MD5(HA1:nonce:HA2)
```

**服务端返回 challange**

```http
HTTP/1.0 401 Unauthorized
Server: HTTPd/0.9
Date: Sun, 10 Apr 2014 20:26:47 GMT
WWW-Authenticate: Digest realm="testrealm@host.com",
                        qop="auth,auth-int",
                        nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093",
                        opaque="5ccc069c403ebaf9f0171e9517f40e41"
```

**带 Auth 请求**

```http
GET /dir/index.html HTTP/1.0
Host: localhost
Authorization: Digest username="Mufasa",
                     realm="testrealm@host.com",
                     nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093",
                     uri="/dir/index.html",
                     qop=auth,
                     nc=00000001,
                     cnonce="0a4f113b",
                     response="6629fae49393a05397450978507c4ef1",
                     opaque="5ccc069c403ebaf9f0171e9517f40e41"
```

## Forwarded

- X-Forwarded-For
  - X-ProxyUser-Ip

```
X-Real-IP: 127.0.0.1
X-Forwarded-For: 127.0.0.1
X-Forwarded-Host: example.com
X-Forwarded-Port: 443
X-Forwarded-Proto: https
X-Forwarded-Scheme: https
X-Scheme: https
X-Request-ID: -

# Proxy 自身信息
Via:

# 新的标准
Forwarded: by=<identifier>;for=<identifier>;host=<host>;proto=<http|https>
```
