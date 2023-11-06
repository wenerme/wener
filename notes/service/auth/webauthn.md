---
title: WebAuthn
---

# WebAuthn

> WebAuthn使用一对公钥和私钥进行身份验证。私钥存储在用户的设备上，而公钥则存储在服务器上。当用户尝试登录时，服务器会发送一个挑战，用户的设备会使用私钥对其进行签名，然后服务器可以使用公钥来验证签名。这种方法的优点是，即使攻击者能够拦截通信，他们也无法使用捕获的信息来冒充用户，因为他们没有私钥。

- [Passkeys](./passkeys.md)
- https://webauthn.io/
- https://en.wikipedia.org/wiki/WebAuthn
- https://github.com/herrjemand/awesome-webauthn
- https://webauthn.guide/
  - [HN](https://news.ycombinator.com/item?id=31836922)
- Keycloak
  - https://keycloak.ch/keycloak-tutorials/tutorial-webauthn/
  - https://github.com/keycloak/keycloak-documentation/blob/main/server_admin/topics/authentication/webauthn.adoc
- https://passkeys.dev/docs/tools-libraries/libraries/
