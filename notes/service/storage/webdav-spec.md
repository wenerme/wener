---
title: WebDAV Spec
tags:
  - RFC
---

# WebDAV Spec

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
