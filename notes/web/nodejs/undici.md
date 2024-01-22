---
title: undici
---

# undici

- 参考
  - 不支持 socks 代理 [#2224](https://github.com/nodejs/undici/issues/2224)
  - [Kaciras/fetch-socks](https://github.com/Kaciras/fetch-socks)
  - [TooTallNate/proxy-agents](https://github.com/TooTallNate/proxy-agents)
    - 不支持 undici https://github.com/TooTallNate/proxy-agents/issues/239
  - ProxyAgent vulnerable to MITM https://github.com/nodejs/undici/security/advisories/GHSA-pgw7-wx7w-2w33

# FAQ

## ERR_TLS_CERT_ALTNAME_INVALID

- https ProxyAgent 出现
- https://hackerone.com/reports/1583680
