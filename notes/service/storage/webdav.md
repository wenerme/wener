---
title: WebDAV
---

# WebDAV

- http://www.webdav.org/specs/rfc4918.html
- 子协议
  - CalDAV - 日历
  - CardDAV - 联系人

```bash
echo Hello > hello.txt
curl -T hello.txt 127.0.0.1:8080/hello.txt
curl 127.0.0.1:8080/hello.txt
```

| method        | mean        |
| ------------- | ----------- |
| OPTIONS       | stat, allow |
| GET,HEAD,POST | read file   |
| DELETE        | rm          |
| PUT           | write file  |
| MKCOL         | mkdir       |
| COPY          | cp          |
| MOVE          | mv          |
| LOCK          |
| UNLOCK        |
| PROPFIND      |
| PROPPATCH     |

- COPY, MOVE
  - Destination
  - Depth
  - Overwrite
- LOCK
  - Timeout
  - Depth
  - Lock-Token
- UNLOCK
  - Lock-Token
- PROPFIND
  - Depth

```http
OPTIONS /hello.txt

# http://www.webdav.org/specs/rfc4918.html#dav.compliance.classes
DAV: 1, 2
# http://msdn.microsoft.com/en-au/library/cc250217.aspx
MS-Author-Via: DAV
Allow: OPTIONS, LOCK, PUT, MKCOL
# dir
Allow: OPTIONS, LOCK, DELETE, PROPPATCH, COPY, MOVE, UNLOCK, PROPFIND
# file
Allow: OPTIONS, LOCK, GET, HEAD, POST, DELETE, PROPPATCH, COPY, MOVE, UNLOCK, PROPFIND, PUT
```
