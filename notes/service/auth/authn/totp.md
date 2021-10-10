---
title: TOTP
---

# TOTP

- Time-based One-time Passwords
  - SHA-1, rotates every 30 seconds
  - otpauth://totp/ - [Key Uri Format](https://github.com/google/google-authenticator/wiki/Key-Uri-Format)
    - algorithm=sha1 - sha1,sha256,sha512
    - digits=6 - 1-10
    - period=30
- 用于 2FA 的方式之一
- 参考
  - [Bitwarden Authenticator (TOTP)](https://bitwarden.com/help/article/authenticator-keys/)
