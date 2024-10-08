---
tags:
  - FAQ
---

# 存储服务常见问题

:::tip

- xfs,ext4 inode 通常在百万级别时会有性能问题
  - 元数据管理、fsck、目录 list、碎片化

:::

## Web 大文件处理

- Gmail attachment 20-25 MB
  - Google Driver
- GitHub 50MB 警告，限制 100MB
  - Git LFS
  - [About large files on GitHub](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)
- AWS S3
  - 单操作限制 5GB
  - Amazon S3 console 160GB
  - multipart upload 5TB
    - [Uploading and copying objects using multipart upload](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html)
  - [Uploading objects](https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html)
- 服务端
  - [tus](./tus.md)
- 客户端
  - [transloadit/uppy](https://github.com/transloadit/uppy)
    - by Transloadit

---

- https://uploadcare.com/blog/handling-large-file-uploads/

## garage vs minio

- garage
  - 小文件处理似乎更友好
  - 默认分布式
  - chunk+metadata
- minio
  - 小文件有特殊优化，但还是没那么理想
  - 默认单机，分布式方案相对复杂，不推荐
  - disk 上直接存储文件
    - list 操作依赖 fs 性能
  - 辅助功能完善：console 控制台、policy、bucket lifecycle、加密等

## Object Storage Service vs Filesystem

- 对象存储
  - 存储对象 - Key, Blob
  - 面向网络
  - 面向大规模 - 可伸缩
    - 处理大量小文件时可能不如文件系统高效，但在处理大文件或流式数据时性能良好。
  - 适合存储非结构化数据
    - 如照片、视频、日志文件和备份数据等。
    - 广泛应用于云存储、大数据分析、静态Web资源托管和数据归档。
  - RESTful
  - 功能区别
    - List 会很快且不受文件梳理影响
    - 不能 重命名目录 - 如果支持 rename 也是某种层面的封装
- 文件系统
  - 文件+目录 - 支持嵌套
  - 本地
  - POSIX
  - 低延迟
  - 可靠
  - inode 本身大多操作可以原子
  - 大多使用 btree 索引

---

**对象存储**

| path                 | blob | metadata |
| -------------------- | ---- | -------- |
| /etc/app/config.json | `{}` |

**文件系统**

| inode | parent | name        | blob | metadata |
| ----- | ------ | ----------- | ---- | -------- |
| 1     | (null) |             |
| 2     | 1      | etc         |      |          |
| 3     | 2      | app         |      |          |
| 4     | 3      | config.json | `{}` |          |

## Content Addressable Storage {#cas}

- 内容寻址存储
- hash -> object
- 可能对大的文件做 chunk
- 不友好的场景
  - E2E 加密
  - 可压缩文件类型 - 图片
- 应用场景
  - git
  - garage
  - IPFS
  - juicefs

## document vs file vs object

- document
  - 使用 ID 跟踪
  - 结构化
  - 强调协作、编辑
  - 内容可知
  - 内容随时变化
  - 内容通常表现为 json object
  - 内容可能为 base + diff 的方式合并
  - 通常会有多版本支持
  - 通常支持集成多种类型媒体
- file
  - 使用 filapth/id 跟踪
  - 叫做 file 可能会有 file 相关的一些基本性质
    - 文件名、文件大小、文件类型、文件权限、文件创建时间、文件修改时间
    - 拷贝、复制、移动、删除
  - 位于 document 和 object 之间
  - 有结构，但不一定可知
  - 可能表现为 document 也可能表现为 object
  - 可能表现为 metadata + blob/object 的方式
- object
  - key -> blob
  - 通常 object 变化频率很低
  - 通常不会直接修改 object，而是新建一个 object
  - 通常 可以使用 hash 等方式来跟踪
  - 通常用于存储 大的 非结构化数据
    - 大 -> MB 级别 到 TB 级别
