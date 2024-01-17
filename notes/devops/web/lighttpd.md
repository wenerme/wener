---
title: lighttpd
---

# lighttpd

- [lighttpd](https://www.lighttpd.net/)
  - BSD-3-Clause, C
  - 轻量
  - 通过 module 扩展张功能
  - FastCGI, SCGI, CGI
- adopted by
  - Bloomberg

:::info

- 不支持 HTTP/3

:::

```bash
# lighttpd, lighttpd-angel
apk add lighttpd
# 额外模块
# apk add lighttpd-mod_{auth,webdav}
```
