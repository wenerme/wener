---
title: Headers
---

# HTTP Headers

```
If-Match: <etag_value>
If-Match: <etag_value>, <etag_value>, …

If-None-Match: "<etag_value>"
If-None-Match: "<etag_value>", "<etag_value>", …
If-None-Match: *

If-Modified-Since: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT

If-Range: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT
If-Range: <etag>

If-Unmodified-Since: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT

Last-Modified: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT

ETag: W/"<etag_value>"
ETag: "<etag_value>"
```

- Cache-Control, Content-Location, Date, ETag, Expires, Vary
- https://www.rfc-editor.org/rfc/rfc9110#field.etag
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
- end-to-end header
  - 应该从客户端一路传到最终后端
  - User-Agent, Accept
- hop-by-hop header
  - 只对当前这一跳连接有效，代理不应该继续转发
  - Connection, Keep-Alive, Proxy-Authenticate, Proxy-Authorization, TE, Trailer, Transfer-Encoding, Upgrade
  - Connection 可以指定额外的 hop-by-hop header
    - `Connection: X-Foo`
    - 代理转发到后端前应该删除它
