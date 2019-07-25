# JWT

## Tips
* [JWT](http://jwt.io/)
* https://mkjwk.org/
  * 生成 JWK
* 是一套认证协议
* 协议简单且易于实现
* 主要用于分布式的无状态接口调用

https://auth0.com/blog/cookies-vs-tokens-definitive-guide/

* [JWS#rfc7515](https://tools.ietf.org/html/rfc7515)
* [JWE#rfc7516](https://tools.ietf.org/html/rfc7516)
* [JWK#rfc7517](https://tools.ietf.org/html/rfc7517)
* [JWA#rfc7518](https://tools.ietf.org/html/rfc7518)
* [JWT#rfc7519](https://tools.ietf.org/html/rfc7519)

__强项__

* 快速开发
* 不需要 Cookie
* JSON 相对友好
* 不依赖社交登陆
* 概念简单易于理解

__限制__
* Token 有大小限制
* Token 不能被回收
* 需要 Token 有个较短的失效周期


字段|全称|含义
----|----|----
iss | Issuer | 发出者
sub | Subject | 一般为用户 id
aud | Audience | 接受者
exp | Expiration time | 失效时间
nbf | Not before | 在这之前不生效
iat | Issued at | 发出时间
jti | JWT ID
typ | Type | 类型,由用户扩展

常见算法

* HMAC + SHA256
* RSASSA-PKCS1-v1_5 + SHA256
* ECDSA + P-256 + SHA256
* RSA vs ECDSA
  * 同等安全度下
    * RSA 更长, 签名验证更快
    * ECDSA 更短, 生成签名和密钥时快得多

__示例__

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
