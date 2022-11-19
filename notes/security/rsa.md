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
