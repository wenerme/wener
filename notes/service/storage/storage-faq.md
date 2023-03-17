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
