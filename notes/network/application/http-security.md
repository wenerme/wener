---
title: HTTP Security
tags:
  - HTTP
  - Security
  - HSTS
---

# HTTP Security

- [MDN: HTTP Strict Transport Security](https://developer.mozilla.org/zh-CN/docs/Security/HTTP_Strict_Transport_Security)

## HSTS Preload

- [HSTS Preload](https://hstspreload.org)
- [Chromium HSTS](https://www.chromium.org/hsts)
- [Chromium HSTS Preload List](https://cs.chromium.org/chromium/src/net/http/transport_security_state_static.json)
- [Firefox Preload List](https://dxr.mozilla.org/comm-central/source/mozilla/security/manager/ssl/nsSTSPreloadList.inc)

Header:

```http
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

## Tools

- [SSL Labs: Analyze Server](https://www.ssllabs.com/ssltest/analyze.html?d=wener.me)
