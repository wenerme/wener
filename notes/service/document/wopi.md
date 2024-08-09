---
title: WOPI
---

# WOPI

- WOPI - Web Application Open Platform Interface
- [WOPI REST API Reference](https://learn.microsoft.com/en-us/microsoft-365/cloud-storage-partner-program/rest/)
- [MS-WOPI Protocol](https://learn.microsoft.com/en-us/openspecs/office_protocols/ms-wopi/6a8bb410-68ad-47e4-9dc3-6cf29c6b046b)
- [MS-FSSHTTP Protocol](https://learn.microsoft.com/en-us/openspecs/sharepoint_protocols/ms-fsshttp/05fa7efd-48ed-48d5-8d85-77995e17cc81)
  - File Synchronization via SOAP over HTTP Protocol
- COBALT

```
https://<collabora-server>/loleaflet/dist/loleaflet.html?WOPISrc=<wopi-url>&access_token=<token>
```

- endpoints
  - CheckFileInfo
  - PutRelativeFile
  - Lock
  - Unlock
  - RefreshLock
  - UnlockAndRelock
  - DeleteFile
  - RenameFile
- `GET /wopi/files/{file_id}`
  - 获取文件信息
- `GET /wopi/files/{file_id}/contents`
  - 获取文件内容
- `POST /wopi/files/{files_id}`
  - 修改文件 - lock, rename, delete
- `PUT/POST /wopi/files/{files_id}/contents`
  - 上传文件

## Awesome

- NodeJS
  - [mikeebowen/node-wopi-server](https://github.com/mikeebowen/node-wopi-server)
  - [coatsy/wopi-node](https://github.com/coatsy/wopi-node)
  - https://github.com/CollaboraOnline/collabora-online-sdk-examples//tree/master/webapp/nodejs
- [Microsoft/wopi-validator-cli-python](https://github.com/Microsoft/wopi-validator-cli-python)
  - 验证 WOPI 实现是否符合规范
