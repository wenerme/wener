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

```http
PROPFIND http://127.0.0.1:3000/webdav/scans/B126/WS/2001/D10/135
Accept: application/xml
depth: 1
content-type: application/xml

<?xml version="1.0" encoding="UTF-8"?>
<d:propfind
  xmlns:d="DAV:"
  xmlns:oc="http://owncloud.org/ns"
  xmlns:nc="http://nextcloud.org/ns"
  xmlns:ocs="http://open-collaboration-services.org/ns"
  xmlns:ocm="http://open-cloud-mesh.org/ns">
  <d:prop>
    <d:resourcetype/>
    <d:displayname/>
    <d:getcontentlength/>
    <d:getlastmodified/>
    <d:getcontenttype/>
    <d:supportedlock/>
    <d:getetag/>
  </d:prop>
</d:propfind>
```

| previx | uri                                       |
| ------ | ----------------------------------------- |
| d      | DAV:                                      |
| oc     | http://owncloud.org/ns                    |
| nc     | http://nextcloud.org/ns                   |
| ocs    | http://open-collaboration-services.org/ns |
| ocm    | http://open-cloud-mesh.org/ns             |

**properties**

| Property                        | Description                                 | Example                                                                                       |
| ------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `<d:creationdate />`            | 节点的创建日期。                            | 1970-01-01T00:00:00+00:00                                                                     |
| `<d:getlastmodified />`         | 最近修改时间。                              | Wed, 20 Jul 2022 05:12:23 GMT                                                                 |
| `<d:getetag />`                 | 文件的 etag。                               | &quot;6436d084d4805&quot;                                                                     |
| `<d:getcontenttype />`          | 文件的 MIME 类型。                          | image/jpeg                                                                                    |
| `<d:resourcetype />`            | 指定资源的性质。                            | `<d:collection />` 表示文件夹                                                                 |
| `<d:getcontentlength />`        | 如果是文件，则表示文件大小（字节）。        | 3030237                                                                                       |
| `<d:getcontentlanguage />`      | 内容的语言。                                | en                                                                                            |
| `<d:displayname />`             | 适合展示的名称。                            | 文件名                                                                                        |
| `<d:lockdiscovery />`           | WebDAV 2 类支持的虚拟端点。始终返回空响应。 | `<d:lockdiscovery />`                                                                         |
| `<d:quota-available-bytes />`   | 文件夹中可用字节数量。                      | 3950773, -1 (未计算), -2 (未知), -3 (无限制)                                                  |
| `<d:quota-used-bytes />`        | 文件夹中已用字节数量。                      | 3950773                                                                                       |
| `<d:supportedlock />`           | WebDAV 2 类支持的虚拟端点。                 | 锁定功能 XML                                                                                  |
| `<nc:acl-can-manage>`           | 当前用户的 ACL 管理能力。                   | 1 或 0                                                                                        |
| `<nc:acl-enabled>`              | 群组文件夹的 ACL 状态。                     | 1 或 0                                                                                        |
| `<nc:acl-list>`                 | ACL 规则数组。                              | ACL 规则的 XML                                                                                |
| `<nc:contained-file-count />`   | 目录中的文件数量。                          |                                                                                               |
| `<nc:contained-folder-count />` | 目录中的文件夹数量。                        |                                                                                               |
| `<nc:creation_time />`          | 创建时间戳。                                | 1675789581                                                                                    |
| `<nc:data-fingerprint />`       | 备份恢复标识符。                            |                                                                                               |
| `<nc:group-folder-id>`          | 群组文件夹 ID。                             | 1                                                                                             |
| `<nc:has-preview />`            | 是否有可用预览。                            | true 或 false                                                                                 |
| `<nc:hidden>`                   | 文件是否应该隐藏。                          | true 或 false                                                                                 |
| `<nc:inherited-acl-list>`       | 来自父文件夹的 ACL 规则。                   | 见 `<nc:acl-list>`                                                                            |
| `<nc:is-encrypted />`           | 文件夹是否端到端加密。                      | 0 (否), 1 (是)                                                                                |
| `<nc:is-mount-root>`            | 节点是否为挂载根目录。                      | true 或 false                                                                                 |
| `<nc:lock-owner-displayname>`   | 锁定所有者的显示名称。                      | Alice                                                                                         |
| `<nc:lock-owner-editor>`        | 应用拥有的锁的应用 ID。                     |                                                                                               |
| `<nc:lock-owner-type>`          | 锁定所有者类型。                            | 0 (用户), 1 (Office/Text), 2 (WebDAV)                                                         |
| `<nc:lock-owner>`               | 锁定所有者的用户 ID。                       | alice                                                                                         |
| `<nc:lock-time>`                | 锁定创建时间戳。                            | 1675789581                                                                                    |
| `<nc:lock-timeout>`             | 锁定的 TTL（秒）。                          | 0 (无超时)                                                                                    |
| `<nc:lock-token>`               | 锁定令牌。                                  | files_lock/0e53dfb6-61b4-46f0-b38e-d9a428292998                                               |
| `<nc:lock>`                     | 文件锁定状态。                              | 1 或 0                                                                                        |
| `<nc:mount-type />`             | 挂载类型。                                  | '' (本地), 'shared', 'group', 'external', 'external-session'                                  |
| `<nc:note />`                   | 共享备注。                                  |                                                                                               |
| `<nc:reminder-due-date>`        | 提醒到期日期（ISO 8601）。                  | 1970-01-01T00:00:00+00:00                                                                     |
| `<nc:rich-workspace />`         | 工作区文件内容。                            |                                                                                               |
| `<nc:rich-workspace-file />`    | 工作区文件 ID。                             | 3456                                                                                          |
| `<nc:share-attributes />`       | 用户设置的属性。                            | 属性的 JSON 数组                                                                              |
| `<nc:sharees />`                | 共享接收者列表。                            | 共享接收者的 XML                                                                              |
| `<nc:upload_time />`            | 上传时间戳。                                | 1675789581                                                                                    |
| `<nc:version-author />`         | 文件版本作者的 ID。                         |                                                                                               |
| `<nc:version-label />`          | 用户设置的文件标签。                        |                                                                                               |
| `<oc:checksums />`              | 校验和数组。                                | `<oc:checksum>md5:04c36b75222cd9fd47f2607333029106</oc:checksum>`                             |
| `<oc:comments-count />`         | 评论数量。                                  | 2                                                                                             |
| `<oc:comments-href />`          | 评论的 DAV 端点。                           | /remote.php/dav/comments/files/{fileId}                                                       |
| `<oc:comments-unread />`        | 未读评论数量。                              | 0                                                                                             |
| `<oc:downloadURL />`            | 直接下载 URL（未实现）。                    |                                                                                               |
| `<oc:favorite />`               | 收藏状态。                                  | 0 (未收藏), 1 (已收藏)                                                                        |
| `<oc:fileid />`                 | 实例内文件的唯一 ID。                       | 7                                                                                             |
| `<oc:id />`                     | 由实例 ID 命名空间限定的文件 ID。           | 00000007oc9l3j5ur4db                                                                          |
| `<oc:owner-display-name />`     | 共享文件所有者的显示名称。                  | Alice                                                                                         |
| `<oc:owner-id />`               | 共享文件所有者的用户 ID。                   | alice                                                                                         |
| `<oc:permissions />`            | 用户对文件的权限。                          | S(已共享), R(可共享), M(已挂载), G(可读), D(可删除), NV(可更新/可移动), W(可更新), CK(可创建) |
| `<oc:share-types />`            | 共享类型的 XML 数组。                       | `<oc:share-type>{shareTypeId}</oc:share-type>`                                                |
| `<oc:size />`                   | 大小（字节）（对文件夹也有效）。            | 127815235                                                                                     |
| `<oc:tags />`                   | 用户指定标签列表。                          | `<oc:tag>test</oc:tag>`                                                                       |
| `<ocm:share-permissions />`     | 用户权限的 JSON 数组。                      | ["share", "read", "write"]                                                                    |
| `<ocs:share-permissions />`     | 用户对共享的权限。                          | 1 (读), 2 (更新), 4 (创建), 8 (删除), 16 (共享), 31 (全部)                                    |

- https://docs.nextcloud.com/server/latest/developer_manual/client_apis/WebDAV/basic.html
