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

```http title="cors"
Access-Control-Allow-Origin: http://example.com
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: ACL, CANCELUPLOAD, CHECKIN, CHECKOUT, COPY, DELETE, GET, HEAD, LOCK, MKCALENDAR, MKCOL, MOVE, OPTIONS, POST, PROPFIND, PROPPATCH, PUT, REPORT, SEARCH, UNCHECKOUT, UNLOCK, UPDATE, VERSION-CONTROL
Access-Control-Allow-Headers: Overwrite, Destination, Content-Type, Depth, User-Agent, Translate, Range, Content-Range, Timeout, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control, Location, Lock-Token, If
Access-Control-Expose-Headers: DAV, content-length, Allow
Access-Control-Max-Age: 3600
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
