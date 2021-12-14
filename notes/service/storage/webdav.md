---
title: WebDAV
---

# WebDAV

- http://www.webdav.org/specs/rfc4918.html
- 子协议
  - CalDAV - 日历
  - CardDAV - 联系人

```bash
# echo Hello > /hello.txt
echo Hello | curl -T - 127.0.0.1:8080/hello.txt
# cat /hello.txt
curl 127.0.0.1:8080/hello.txt
# 上传到目录
touch test.txt
curl -T test.txt 127.0.0.1:8080/
# ls /
curl -X PROPFIND http://127.0.0.1:8080/ | xmllint --format -
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
| PROPFIND      | ls          |
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

## Props

- dead properties
  - 额外属性
- live properties
  - 隐含属性
  - DAV:

| prop               | dir? | note                             |
| ------------------ | ---- | -------------------------------- |
| resourcetype       | x    | `<D:collection xmlns:D="DAV:"/>` |
| displayname        | x    |
| getcontentlength   |
| getlastmodified    | x    |
| creationdate       |
| getcontentlanguage |
| getcontenttype     |      | mime                             |
| getetag            |      | 一般默认 modtime                 |
| lockdiscovery      |
| supportedlock      | x    |

- http://webdav.org/specs/rfc4918.html#PROPERTY_getlastmodified
- golang.org/issue/15

## MS-Author-Via: DAV

- http://msdn.microsoft.com/en-au/library/cc250217.aspx
