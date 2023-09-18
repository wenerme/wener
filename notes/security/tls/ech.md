---
title: ECH
---

# ECH

- 加密 SNI - ESNI -> ECH - Encrypted Client Hello
- 依赖 HTTPS DNS 记录
- HAProxy - [#1924](https://github.com/haproxy/haproxy/issues/1924)
- OpenSSL [#7482](https://github.com/openssl/openssl/issues/7482)
- WolfSSL v5.6.0 --enable-hpke
  - https://www.wolfssl.com/encrypted-client-hello-ech-now-supported-wolfssl/
- Nginx [#2275](https://trac.nginx.org/nginx/ticket/2275)
- 参考
  - https://blog.cloudflare.com/encrypted-client-hello/
  - https://www.cloudflare.com/zh-cn/ssl/encrypted-sni/
  - https://datatracker.ietf.org/doc/html/draft-ietf-tls-esni
  - Chrome 117 - https://chromestatus.com/feature/6196703843581952
    - chrome://flags/#encrypted-client-hello
    - 2023-09
  - https://tls-ech.dev
  - https://defo.ie/ech-check.php


```bash
# 国内被拦截
dig tls-ech.dev HTTPS +short
# 需要代理
curl -s -H 'accept: application/dns+json' 'https://dns.google.com/resolve?name=tls-ech.dev&type=HTTPS' | jq '.Answer[].data' -r
```

```
1 . ech=AEn+DQBFKwAgACABWIHUGj4u+PIggYXcR5JF0gYk3dCRioBW8uJq9H4mKAAIAAEAAQABAANAEnB1YmxpYy50bHMtZWNoLmRldgAA
```
