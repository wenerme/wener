---
title: TLS
---

# TLS

- TLS - Transport Layer Security
- ECH - Encrypted Client Hello
- ESNI - Encrypted SNI
  - ESNI -> ECH
- SNI - Server Name Indication
- Redis 支持 TLS
  - `redis-cli -u "rediss://default:$REDIS_PASSWORD@redis.example.com:443" --sni redis.example.com info`
- Postgres 17 支持 TLS
  - PG17 支持 `?sslnegotiation=direct&sslmode=require`
    - alpn postgresql
    - https://www.postgresql.org/docs/17/protocol-flow.html#PROTOCOL-FLOW-SSL
  - 旧版本 应用层实现的 SSL
  - PJJDBC v42.7.4
  - https://github.com/pgjdbc/pgjdbc/blob/master/pgjdbc/src/main/java/org/postgresql/PGProperty.java#L696
- SSH 不支持 TLS
  - 使用的应用层协议
- https://docs.kernel.org/networking/tls.html
- 不支持 TLS 的可以使用 stunnel/frp 等 tunnel - 但是需要额外运维
- [Cipher suite](https://en.wikipedia.org/wiki/Cipher_suite)
  - TLS 1.3 AEAD
- HTTPS quality
  - https://www.ssllabs.com/ssltest/viewMyClient.html
  - https://www.howsmyssl.com/
  - https://badssl.com/
- https://subtls.pages.dev/

## ClientHello

> ClientHello 是明文的

- **协议版本 (Version)** - 指明客户端期望使用的 TLS 协议版本（例如 TLS 1.2、TLS 1.3）
- **随机数 (Random)** - 32 字节随机数据，用于生成会话密钥，其中可能包含时间戳等信息
- **会话 ID (Session ID)** - 用于标识可复用的会话，方便后续会话恢复
- **密码套件 (Cipher Suites)** - 客户端支持的加密算法组合列表，供服务器选择合适的套件
- **压缩方法 (Compression Methods)** - 客户端支持的数据压缩算法（通常仅包含"无压缩"选项）
- **扩展 (Extensions)** - 包含各种可选扩展:
  - SNI（服务器名称指示）
  - ALPN（应用层协议协商）
  - 支持组（支持的椰圆曲线等）
  - 签名算法
  - Key Share（用于 TLS 1.3 密钥交换）
  - 支持版本（用于协商实际使用的 TLS 版本）等

## implementations

- [Comparison of TLS implementations](https://en.wikipedia.org/wiki/Comparison_of_TLS_implementations)

## OCSP

OCSP是Online Certificate Status Protocol的缩写，即在线证书状态协议。它是一种用于验证数字证书是否有效的协议，可以检查证书是否被吊销或过期。当客户端与服务器建立TLS/SSL连接时，客户端会向证书颁发机构（CA）的OCSP服务器发送请求，以获取证书的状态信息。如果证书被吊销或过期，客户端将会收到一个无效的证书警告，从而保护用户的安全。OCSP协议可以提高证书验证的效率和安全性，避免了客户端需要下载整个证书撤销列表（CRL）的问题。

```bash
# server certificate
openssl s_client -servername wener.me -connect wener.me:443 < /dev/null 2>&1 |  sed -n '/-----BEGIN/,/-----END/p' > certificate.pem
# intermediate certificate
openssl s_client -showcerts -servername wener.me -connect wener.me:443 < /dev/null 2>&1 |  sed -n '/-----BEGIN/,/-----END/p' > chain.pem
# 去掉第一个 server cert
nano chain.pem

# http://e1.o.lencr.org
# http://r3.o.lencr.org
# ocsp.digicert.cn 百度
openssl x509 -noout -ocsp_uri -in certificate.pem
OCSP_URL=$(openssl x509 -noout -ocsp_uri -in certificate.pem)

openssl x509 -text -noout -in certificate.pem

openssl ocsp -issuer chain.pem -cert certificate.pem -text -url $OCSP_URL
```

- https://akshayranganath.github.io/OCSP-Validation-With-Openssl/

<!--
https://ping.chinaz.com/r3.o.lencr.org
ocsp.digicert.com
-->

```
ocsp-lb.apple.com.akadns.net
ocsp-cn-lb.apple.com.akadns.net
ocsp.apple.com.cdn20.com
ocsp.g.aaplimg.com
ocsp.apple.com
ocsp.digicert.com
```

```
ocsp.apple.com.download.ks-cdn.com
k128-mzstatic.gslb.ksyuncdn.com
```

## ocsp stapling

OCSP Stapling（也称为TLS Stapling）是一种TLS/SSL协议的优化技术，它可以减少客户端与证书颁发机构（CA）服务器之间的通信次数，提高网站的性能和安全性。

- HAProxy 2.8
  - 支持设置 ocsp-update on

<!--

https://www.cnblogs.com/wenming/p/12679152.html
https://icicimov.github.io/blog/server/HAProxy-OCSP-stapling
-->
