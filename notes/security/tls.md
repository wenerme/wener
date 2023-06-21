---
title: TLS
---

# TLS

- [Cipher suite](https://en.wikipedia.org/wiki/Cipher_suite)
  - TLS 1.3 AEAD
- HTTPS quality
  - https://www.ssllabs.com/ssltest/viewMyClient.html
  - https://www.howsmyssl.com/
  - https://badssl.com/
- https://subtls.pages.dev/

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
