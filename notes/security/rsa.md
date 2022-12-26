---
title: rsa
---

# RSA

```bash
openssl genrsa -out pk.pem 2048
openssl rsa -in pk.pem -pubout -out pub.pem

# self-signed certificate
openssl req -new -x509 -key pk.pem -out cert.pem -days 360
# pem to pfx
openssl pkcs12 -export -inkey pk.pem -in cert.pem -out cert.pfx
```

**带密码的 PEM**

```pem
-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: AES-128-CBC,0F5C7993DCFA4C0962CE249CFD854B91
```

```bash
# 测试密码
openssl rsa -noout -in file.pem -passin "pass:PASSWORD"
openssl rsa -noout -in file.pem -passin "file:password.txt"
```

- DES-EDE3-CBC


```bash
# pkcs1 -> pkcs8
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in pkcs1.key -out pkcs8.key
```
