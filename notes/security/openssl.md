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
```

- https://gist.github.com/Soarez/9688998

# FAQ

## variable lookup failed for ca::default_ca
