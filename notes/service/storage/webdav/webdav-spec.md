---
title: WebDAV Spec
tags:
  - RFC
  - Protocol
  - HTTP
---

# WebDAV Spec

- http://www.webdav.org/
- [rfc4918](http://www.webdav.org/specs/rfc4918.html)
- DAV - Distributed Authoring and Versioning - 分布式创作和版本控制
- 基于 HTTP/1.1
- Property
  - authors, creation dates
  - Live Property
  - Dead Property
- Collections
- Locking
- Namespace
- XML 编码
- Lock Capability Discovery
  - DAV:supportedlock
- Active Lock Discovery
  - DAV:lockdiscovery
- PROPFIND
  - Depth: 0,1,infinity
- 204 (No Content)
- HTTP 207 Multi-Status
- HTTP 412 Precondition Failed
- 423 (Locked)
- 507 (Insufficient Storage)

| method        | mean       | Headers                     |
| ------------- | ---------- | --------------------------- |
| OPTIONS       | stat       | Allow                       |
| GET,HEAD,POST | read file  |
| DELETE        | rm         |
| PUT           | write file |
| MKCOL         | mkdir      |
| COPY          | cp         | Depth,Overwrite,Destination |
| MOVE          | mv         | Depth,Overwrite,Destination |
| LOCK          |            | Lock-Token,Timeout,Depth    |
| UNLOCK        |            | Lock-Token                  |
| PROPFIND      | ls         | Depth                       |
| PROPPATCH     |

| method |     |
| ------ | --- |
| ACL    |     |
| REPORT |     |

- [RFC3253] DeltaV - 版本控制
  - methods: VERSION-CONTROL, CHECKOUT, CHECKIN, UNCHECKOUT, MKWORKSPACE, UPDATE, LABEL, MERGE, BASELINE-CONTROL, MKACTIVITY
- [RFC3648] OrderColl - 文件夹内容排序
  - methods: ORDERPATCH,
  - headers: Position, Ordering-Type
    - Position ("first" | "last" | (("before" | "after") segment))
      - MOVE, COPY
  - DAV:ordering-type
    - PROPFIND
    - DAV:custom
    - DAV:unordered
  - DAV:ordered-collections-supported
  - DAV:ordering-type-set
  - DAV:collection-must-be-ordered
  - DAV:segment-must-identify-member
  - DAV:position-set
- [RFC3744] ACL - 访问控制
  - ACEs - access control entries
  - ACE - access control element
  - principal
    - DAV:displayname
  - Privileges
    - privilege
      - DAV:all, DAV:authenticated, DAV:unauthenticated, DAV:write, DAV:read, DAV:read-current-user-privilege-set, DAV:write-properties,
      - DAV:write-content - PUT
      - DAV:unlock - UNLOCK - 非 lock owner 进行 unlock
      - DAV:read-acl - PROPFIND DAV:acl
      - DAV:write-acl - ACL DAV:acl
      - DAV:bind - 为 collection 添加方法 - PUT, MKCOL
      - DAV:unbind - 为 collection 移除方法 - DELETE, MOVE
    - DAV:resourcetype
    - abstract
    - aggregate
  - DAV:principal-URL
  - DAV:principal-property-search
  - DAV:principal-search-property-set
  - DAV:acl
  - DAV:current-user-privilege-set
- [RFC4316] PropType - 属性类型
- [RFC4331] Quota - 配额
- [RFC4437] Redir - 重定向、软连接
- [RFC4709] Mount - 客户端 Mount
- [RFC4791] CalDAV - 日历
- [RFC5689] Extended MKCOL
  - 扩展 MKCOL 支持自定义资源类型 - 例如 兼容支持 MKCALENDER
- [RFC5323] SEARCH - 服务端搜索
- [RFC5397] Current Principal
- [RFC5842] BIND - 添加新方法

[rfc3253]: https://datatracker.ietf.org/doc/html/rfc3253
[rfc3648]: https://datatracker.ietf.org/doc/html/rfc3648
[rfc3744]: https://datatracker.ietf.org/doc/html/rfc3744.html

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

```xml
 <?xml version="1.0" encoding="utf-8" ?>
  <D:propfind xmlns:D="DAV:">
    <D:allprop/>
    <D:propname/>
    <D:include>
      <D:supported-live-property-set/>
      <D:supported-report-set/>
    </D:include>
  </D:propfind>
```

```http
HTTP/1.1 207 Multi-Status
Content-Type: application/xml; charset="utf-8"
Content-Length: xxxx

<?xml version="1.0" encoding="utf-8" ?>
<d:multistatus xmlns:d="DAV:">
  <d:response>
    <d:href>http://www.example.com/container/resource3</d:href>
    <d:status>HTTP/1.1 423 Locked</d:status>
    <d:error><d:lock-token-submitted/></d:error>
  </d:response>
</d:multistatus>
```

```http
COPY /~fielding/index.html HTTP/1.1
Host: www.example.com
Destination: http://www.example.com/users/f/fielding/index.html
Overwrite: F
```
