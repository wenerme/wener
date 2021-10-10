---
title: PKCE
---

# PKCE

- PKCE=Proof Key for Code Exchange
- 参考
  - https://oauth.net/2/pkce/
  - https://datatracker.ietf.org/doc/html/rfc7636
  - [Authorization Code Flow with Proof Key for Code Exchange](https://auth0.com/docs/authorization/flows/authorization-code-flow-with-proof-key-for-code-exchange-pkce)
  - [PKCE: What and Why?](https://dropbox.tech/developers/pkce--what-and-why-)
- 基于 authorization code flow 用于替代 implicit flow - 避免回跳时附加 access_token
  - 客户端请求添加 code_challenge, code_challenge_method
    - code_challenge=base64(sha256(client_verifier))
      - 可能 S256 加密
    - code_challenge_method=plain,S256
    - 此时构建 code_verifier 但不发送
  - 服务端响应 authorization_code
  - 客户端请求 token 接口 - code={authorization_code},code_verifier,grant_type=authorization_code
  - 服务端检查 基于初始请求的 code_challenge 检查 code_verifier
  - 通过检查响应 access_token
