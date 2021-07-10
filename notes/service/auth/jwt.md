---
id: jwt
title: JWT
---

# JWT

- [JWT](http://jwt.io/)
- https://openid.net/developers/jwt/
- https://mkjwk.org/
  - 生成 JWK
- 是一套认证协议
- 协议简单且易于实现
- 主要用于分布式的无状态接口调用

https://auth0.com/blog/cookies-vs-tokens-definitive-guide/

- [JWS#rfc7515](https://tools.ietf.org/html/rfc7515)
- [JWE#rfc7516](https://tools.ietf.org/html/rfc7516)
- [JWK#rfc7517](https://tools.ietf.org/html/rfc7517)
- [JWA#rfc7518](https://tools.ietf.org/html/rfc7518)
- [JWT#rfc7519](https://tools.ietf.org/html/rfc7519)

**强项**

- 快速开发
- 不需要 Cookie
- JSON 相对友好
- 不依赖社交登陆
- 概念简单易于理解

**限制**

- Token 有大小限制
- Token 不能被回收
- 需要 Token 有个较短的失效周期

| 字段 | 全称            | 含义            |
| ---- | --------------- | --------------- |
| iss  | Issuer          | 发出者          |
| sub  | Subject         | 一般为用户 id   |
| aud  | Audience        | 接受者          |
| exp  | Expiration time | 失效时间        |
| nbf  | Not before      | 在这之前不生效  |
| iat  | Issued at       | 发出时间        |
| jti  | JWT ID          |
| typ  | Type            | 类型,由用户扩展 |

常见算法

- HMAC + SHA256
- RSASSA-PKCS1-v1_5 + SHA256
- ECDSA + P-256 + SHA256
- RSA vs ECDSA
  - 同等安全度下
    - RSA 更长, 签名验证更快
    - ECDSA 更短, 生成签名和密钥时快得多
- 参考
  - https://datatracker.ietf.org/doc/html/rfc7518#section-3

**示例**

```js
{
  "iss": "http://example.org",
  "aud": "http://example.com",
  "iat": 1356999524,
  "nbf": 1357000000
}
```

```js
{
  "iss": "https://oidc.my.com",
  "x5t": "AAAAAAAAAAAAAAAAAAAA"
  "typ": "JWT"
  "alg": "RS265"
}

{
  "sub": "wener"
  "name": "Wener"
  "email": "wener@wener.me"
  "phone_number": "1852159826715"
  "aud": "https://otheremail.com"
  "iss": "https://oidc.my.com"
  "nbf": 1497868409096
  "jti": "ANpzy7AyyANx0Cn8WMP5N7bG3E8awOhB"
  "exp": 1497868509096
  "nbf": 1497868409096
}
```

## JWKS

- https://github.com/auth0/node-jwks-rsa
- https://www.googleapis.com/oauth2/v3/certs
- Firebase
  - https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com

https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com

https://auth0.com/docs/tokens/reference/jwt/jwks-properties

https://sandrino.auth0.com/.well-known/jwks.json
https://sandrino.auth0.com/pem

https://docs.hasura.io/1.0/graphql/manual/auth/authentication/jwt.html

```json
{
  "keys": [
    {
      "alg": "RS256",
      "kty": "RSA",
      "use": "sig",
      "n": "",
      "e": "AQAB",
      "kid": "RkI5MjI5OUY5ODc1N0Q4QzM0OUYzNkVGMTJDOUEzQkFCOTU3NjE2Rg",
      "x5t": "RkI5MjI5OUY5ODc1N0Q4QzM0OUYzNkVGMTJDOUEzQkFCOTU3NjE2Rg",
      "x5c": [
        // base64 编码
        ""
      ]
    }
  ]
}
```

https://developers.google.com/identity/protocols/OpenIDConnect

```json
{
  "keys": [
    {
      "e": "AQAB",
      "kty": "RSA",
      "alg": "RS256",
      "n": "1Zi0-4bNwZ7gGefz17U2NoKT4xBq-nzAa899teHxB2Q9KVCZYDhbQkpiIrBNg2u8s6TtoSljpq6MJpsKJVJgpT70gDCCgaUsGNYql9-kwWNKd80FlU1sjDEGouUIVEoYHzooPyn9r027KzMnTv5LGRYjxb5lvGnb4UCw5MF_EeSTNpGD7zb0b6juXwBxPi0oIUbQxAcGgH3oS40hXAjJ_U2T3Hln8lBlnVhLbrh-5qF-uoYDxjtAY9XyEJQH_rGiRfXWgBfSM02t9DCB46sQbEMM2iLe7mkGrZtCHR4zbAsAP0s2VGqSmwszNTWqqsdOccbfXp3i_ThkR3pDdTSIQQ",
      "use": "sig",
      "kid": "57b1928f2f63329f2e92f4f278f94ee1038c923c"
    },
    {
      "e": "AQAB",
      "kty": "RSA",
      "alg": "RS256",
      "n": "rEpSQ8IO8Gauj5AGRbgfwfaxHRMGONuTog4fWKWzZYxdWa76khbynWTAzUJVzw_FaAiZGnl7tlmD7pdKWOHszrcK2Hru87KzeRnnqvWlSqdKValu6x5TfBnJwxgr-L8Mnu4xNnrMG2AWcRkjFVWQmwZyEF3WroRzbxrVTlChD_UydnRuiV1z0BPkLOxTzF5RH21ukImElOm3AFIFXP5h8Z0yLrFEcxzLgDIt7wC68apH7uRmy2-a9D4b4Jwi3HRlAgsYAKXYeEQC3f8Mv03liJBv3CPZU4EyXLQUJA28b8l5NUSDI9tnbrfP8SIXlqLz8mNfuKR18LAU3s9sv-sR3Q",
      "use": "sig",
      "kid": "47456b8069e4365e517ca5e29757d1a9efa567ba"
    }
  ]
}
```
