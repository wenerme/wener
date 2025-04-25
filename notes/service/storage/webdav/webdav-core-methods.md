---
title: WebDAV 核心方法
tags:
  - WebDAV
  - HTTP
---

# WebDAV 核心方法

WebDAV (Web Distributed Authoring and Versioning) 是 HTTP 的扩展，允许客户端在 Web 服务器上执行远程内容管理操作。以下是 WebDAV 规范中定义的核心方法。

## 基础 HTTP 方法

WebDAV 利用了基础的 HTTP 方法，并为文件操作提供了新的语义：

| 方法   | 描述           | 用途                         |
| ------ | -------------- | ---------------------------- |
| GET    | 获取资源内容   | 下载文件                     |
| HEAD   | 获取资源元信息 | 获取文件元数据，不下载内容   |
| POST   | 创建新资源     | 一般用途较少，常用于复杂操作 |
| DELETE | 删除资源       | 删除文件或目录               |
| PUT    | 上传资源内容   | 上传或覆盖文件               |

## WebDAV 扩展方法

WebDAV 规范 (RFC 4918) 添加了以下核心方法：

| 方法      | 描述               | 相关参数                                                        |
| --------- | ------------------ | --------------------------------------------------------------- |
| PROPFIND  | 获取资源属性       | Depth: 控制递归深度 (0, 1, infinity)                            |
| PROPPATCH | 设置或删除资源属性 | 通过 XML 主体指定属性修改                                       |
| MKCOL     | 创建集合（目录）   | 不能用于已存在的资源                                            |
| COPY      | 复制资源           | Destination: 目标 URI<br>Overwrite: 是否覆盖<br>Depth: 递归深度 |
| MOVE      | 移动资源           | Destination: 目标 URI<br>Overwrite: 是否覆盖                    |
| LOCK      | 锁定资源           | Lock-Token: 锁令牌<br>Timeout: 锁超时<br>Depth: 锁定深度        |
| UNLOCK    | 解锁资源           | Lock-Token: 要解锁的令牌                                        |

## 方法功能对照表

如果将 WebDAV 方法映射到文件系统操作，可以这样理解：

| WebDAV 方法 | 文件系统操作      | 功能描述               |
| ----------- | ----------------- | ---------------------- |
| GET         | cat, 读取         | 读取文件内容           |
| PUT         | echo > file, 写入 | 上传文件内容           |
| DELETE      | rm, rmdir         | 删除文件或目录         |
| MKCOL       | mkdir             | 创建目录               |
| COPY        | cp                | 复制文件或目录         |
| MOVE        | mv                | 移动或重命名文件/目录  |
| PROPFIND    | ls, stat          | 列出目录内容或文件属性 |
| PROPPATCH   | chmod, chown      | 修改文件属性           |
| LOCK        | flock             | 锁定文件，防止并发修改 |
| UNLOCK      | 释放 flock        | 解除文件锁定           |

## 常见响应状态码

WebDAV 操作中常见的 HTTP 状态码：

- 200 OK - 请求成功
- 201 Created - 资源创建成功
- 204 No Content - 操作成功但无返回内容
- 207 Multi-Status - 多状态响应，包含多个子响应
- 403 Forbidden - 操作被禁止
- 404 Not Found - 资源不存在
- 409 Conflict - 资源冲突
- 412 Precondition Failed - 前置条件失败
- 423 Locked - 资源被锁定
- 507 Insufficient Storage - 存储空间不足

## 基础 WebDAV 使用示例

```bash
# 列出目录内容
curl -X PROPFIND --header "Depth: 1" https://webdav.example.com/

# 创建目录
curl -X MKCOL https://webdav.example.com/newdir/

# 上传文件
curl -T localfile.txt https://webdav.example.com/remotefile.txt

# 下载文件
curl -O https://webdav.example.com/remotefile.txt

# 删除文件
curl -X DELETE https://webdav.example.com/remotefile.txt

# 移动/重命名
curl -X MOVE --header "Destination: https://webdav.example.com/newname.txt" \
  https://webdav.example.com/oldname.txt
```

## 扩展和规范

WebDAV 核心规范 (RFC 4918) 的基础上，还有多个扩展规范：

- DeltaV (RFC 3253) - 版本控制
- ACL (RFC 3744) - 访问控制
- SEARCH (RFC 5323) - 服务器端搜索
- CalDAV (RFC 4791) - 日历扩展
- CardDAV (RFC 6352) - 通讯录扩展
