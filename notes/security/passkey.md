---
title: Passkey
---

# Passkey

- Password-less
- asymmetric public key
- Multi-Device FIDO
- adopted by
  - Amazon, Google, Nintendo, Shopify, Apple
- https://passkeys.dev/
- https://developers.google.com/identity/passkeys
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API
- window.PublicKeyCredential
- 参考
  - [Bitwarden 支持管理 Passkey](https://bitwarden.com/blog/bitwarden-passkey-management/)
  - https://teampassword.com/blog/passkey-vs-webauthn

# Passkey vs WebAuthn

> 两者配合使用达到 无密码 的效果

- Passkey
  - 是 credential
- WebAuthn
  - 是 Web API/标准
  - 和 authenticators 交互
    - CTAP - client to authenticator protocol
  - by W3C, FIDO Alliance
  - 可用于实现 Passkey
