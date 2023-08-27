---
title: Minio FAQ
tags:
  - FAQ
---

# Minio FAQ

- MINIO_UPDATE=off

## 默认账号密码

minioadmin:minioadmin

## The Access Key Id you provided does not exist in our records.

确认 accessKeyId 是否正确

## The request signature we calculated does not match the signature you provided. Check your key and signing method.

确认 secretAccessKey 是否正确

## MinIO 小文件支持

- 支持 .zip - https://blog.min.io/small-file-archives/
  - s3zip 扩展
  - 直接下载 zip 内文件
  - 索引 zip 内容
  - `x-minio-extract: true` 立即索引
  - 支持接口 HeadObject, GetObject, ListObjectsV2
- 上传支持 .tar 自动解压
  - PutObjectExtract
- 小文件合并 xl.meta
  - 128KB
