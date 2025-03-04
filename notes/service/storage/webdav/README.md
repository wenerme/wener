---
title: WebDAV
---

# WebDAV

- http://www.webdav.org/specs/rfc4918.html
- 子协议
  - CalDAV - 日历
  - CardDAV - 联系人
- WebDAV 没有标准位置，常见位置
  - /webdav
  - /dav
- CalDAV /.well-known/caldav
- CardDAV /.well-known/carddav

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

## Awesome

### Server

- rclone
- nginx
- [mholt/caddy-webdav](https://github.com/mholt/caddy-webdav)
- [AlistGo/alist](https://github.com/AlistGo/alist)
  - AGPLv3, Go
- NextCloud
- ownCloud
- Seafile
- [drakkan/sftpgo](https://github.com/drakkan/sftpgo)
  - AGPLv3, Go
  - SFTP, HTTP/S, FTP/S and WebDAV server - S3, Google Cloud Storage, Azure Blob

### Server Library

- NodeJS
  - [sciactive/nephele](https://github.com/sciactive/nephele)
    - Apache-2.0
    - pluggable WebDAV, CardDAV, and CalDAV server for Node.js and Express
  - [hironico/nico.drive](https://github.com/hironico/nico.drive)
    - MIT
    - WebDAV server written in NodeJS with additional REST API features such as thumbnail generation API
  - [OpenMarshal/npm-WebDAV-Server-Types](https://github.com/OpenMarshal/npm-WebDAV-Server-Types)
- Golang
  - [hacdias/webdav](https://github.com/hacdias/webdav)
    - MIT, Go
  - https://godoc.org/golang.org/x/net/webdav

```bash
# ghcr.io/hacdias/webdav:latest
# hacdias/webdav:latest
go install github.com/hacdias/webdav/v5@latest
```

```yaml
address: 0.0.0.0
port: 6065
behindProxy: true
directory: .
prefix: /webdav
permissions: CRUD
users: []
```

### Client

- [mickael-kerjean/filestash](https://github.com/mickael-kerjean/filestash)
  - AGPLv3, JS, Go
  - file manager / web client for SFTP, S3, FTP, WebDAV, Git, Minio, LDAP, CalDAV, CardDAV, Mysql, Backblaze
- macOS Finder
  - `WebDAVFS/3.0.0 (03008000) Darwin/24.1.0 (arm64)`

### Client Library

- [perry-mitchell/webdav-client](https://github.com/perry-mitchell/webdav-client)
  - MIT, TS, JS
  - Client, Browser, NodeJS
  - npm:webdav
- https://sabre.io/dav/clients/

### Reading

- MS Exchange [WebDAV Methods](<https://docs.microsoft.com/en-us/previous-versions/office/developer/exchange-server-2003/aa142917(v=exchg.65)>)
- https://en.wikipedia.org/wiki/WebDAV

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

## NGINX

```nginx
location /cache/ {
  # The path to the directory where nginx should store the cache contents.
  root /path/to/cache/dir;
  # Allow PUT
  dav_methods PUT;
  # Allow nginx to create the /ac and /cas subdirectories.
  create_full_put_path on;
  # The maximum size of a single file.
  client_max_body_size 1G;
  allow all;
}
```

## macOS

- Finder
  - Go > Connect to Server
  - `http://webdav.example.com/`
- https://support.apple.com/en-hk/guide/mac-help/mchlp1546/mac

## windows

```bat
net use z: https:/my.cloud.domain/remote.php/dav/files/USERNAME/ /persistent:yes /user:USERNAME PASSWORD

@echo off
net use z: /delete
echo mit USERNAME verbinden
timeout /T 3 /nobreak >NUL
net use z: https://your.domain.tld/remote.php/dav/files/USERNAME/ /persistent:yes /user:USERNAME PASSWORD
```

- 不使用 HTTPS 连接
  - 可能是 WebDAV Client 不支持 SNI - 使用 IP 访问
  - 可能不支持 TSLv1.1 / TSLv1.2
- Error 0x800700DF: The file size exceeds the limit allowed and cannot be saved.
  - `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WebClient\Parameters`
    - FileSizeLimitInBytes
      - 4GB -> 4294967295
