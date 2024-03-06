---
tags:
  - FAQ
---

# 存储服务常见问题

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

## Object Storage Service vs Filesystem

- 对象存储
  - 存储对象
    - 每个对象包含数据本身+元数据+全局唯一标识 - data, metadata, key
  - 面向网络
  - 面向大规模 - 可伸缩
    - 处理大量小文件时可能不如文件系统高效，但在处理大文件或流式数据时性能良好。
  - 适合存储非结构化数据
    - 如照片、视频、日志文件和备份数据等。
    - 广泛应用于云存储、大数据分析、静态Web资源托管和数据归档。
  - RESTful
- 文件系统
  - 文件+目录 - 支持嵌套
  - 本地
  - POSIX
  - 低延迟
  - 可靠
