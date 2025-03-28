---
title: OpenSSL
---

# OpenSSL

- [openssl/openssl](https://github.com/openssl/openssl)
  - Apache-2.0, C, Perl
- libssl, libcrypto, openssl
- 参考
  - https://www.openssl.org/docs/manmaster/

## CA

```bash
openssl genrsa -out example.org.key 2048
openssl rsa -in example.org.key -noout -text # introspect

openssl rsa -in example.org.key -pubout -out example.org.pubkey
openssl rsa -in example.org.pubkey -pubin -noout -text

openssl req -new -key example.org.key -out example.org.csr
openssl req -in example.org.csr -noout -text

openssl genrsa -out ca.key 2048
openssl req -new -x509 -key ca.key -out ca.crt

openssl x509 -req -in example.org.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out example.org.crt
openssl x509 -in example.org.crt -noout -text
cat example.org.crt ca.crt > example.org.bundle.crt

# 查看服务器证书
openssl s_client -servername cloudflare.com -connect cloudflare.com:443
# 获取证书
openssl s_client -servername cloudflare.com -connect cloudflare.com:443 < /dev/null | openssl x509 -outform PEM > cloudflare.com.crt
# 证书信息
# cloudflare.com, *.amp.cloudflare.com, *.cloudflare.com, *.dns.cloudflare.com, *.staging.cloudflare.com
openssl x509 -in cloudflare.com.crt -text -noout | grep -E 'Subject:|DNS:'

# FP
echo -sha256 -sha1 -md5 | xargs -n1 openssl x509 -noout -fingerprint -inform pem -in ca.crt

# 查看证书时间
# notBefore=
# notAfter=
openssl x509 -in wener.me.crt -noout -dates
# 查看域名
openssl x509 -in wener.me.crt -noout -text | grep -E 'Subject:|DNS:'
```

- https://gist.github.com/Soarez/9688998

# FAQ

## variable lookup failed for ca::default_ca

## SSL certificate verify result: unable to get local issuer certificate (20), continuing anyway

The root certificate is not in the local database of trusted root certificates. The local database of trusted root certificates was not give or queried by OpenSSL.


```bash
openssl s_client -servername wener.me -connect wener.me:443
```
