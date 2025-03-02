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
