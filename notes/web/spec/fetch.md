---
tags:
  - API
---

# fetch

- https://developer.mozilla.org/en-US/docs/Web/API/fetch
- [禁止修改的 Header](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name)
  - `Proxy-*`
  - `Sec-*`
  - Accept-
  - Access-Control-
  - Cookie
  - Content-Length
  - Date
  - DNT
  - Expect
  - Host
  - Keep-Alive
  - Origin
  - Referer
  - Transfer-Encoding
  - Upgrade
  - Via

## credentials

请求是否带 Cookie

- omit
- same-origin - 默认
- include  - 总是包含

preflight 不会包含。
