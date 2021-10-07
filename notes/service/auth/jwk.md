---
title: JWK
---

# JWK

- 签名 jwt 的 cert/key/pub key/key set
- jwt 的 header 里包含 kid 用于匹配 jwk 里的 key

```json
{
  "keys": [
    {
      "use": "sig",
      "kty": "RSA",
      "kid": "1",
      "alg": "RS256",
      "n": "",
      "e": "AQAB",
      "x5c": [
        ""
      ],
      "x5t": "",
      "x5t#S256": ""
    }
  ]
}
```
