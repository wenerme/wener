---
title: sftpgo
---

# sftpgo

- [drakkan/sftpgo](https://github.com/drakkan/sftpgo)
  - AGPL-3.0, Go
  - 协议支持 SSH, FTP, WebDAV
  - 存储支持 S3, Google Cloud Storage, Azure Blob, SFTP, HTTP/S
  - 提供 WebClient /web/client 和 WebAdmin /web/admin

```bash
brew install sftpgo

# 2022 SFTP
# 8080 Web
# /srv/sftpgo/backups
# /srv/sftpgo/data/<username>
docker run --rm -it \
  -p 2022:2022 \
  -p 8080:8080 \
  -v $PWD/sftpgo/data:/srv/sftpgo \
  -v $PWD/sftpgo/config:/var/lib/sftpgo \
  --name sftpgo drakkan/sftpgo:latest
```
