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

## BUG: failed to parse server response

- 服务端返回的 XML
  - 解析失败 https://github.com/minio/minio-js/blob/d08e54a391adb8fe6630c8cfde66621d6f37b777/src/internal/xml-parser.ts#L282-L303
  - garage 没有返回 Location
    - https://git.deuxfleurs.fr/Deuxfleurs/garage/src/commit/3a87bd1370eb9fefc67deec9d7dfa2187ddf9763/src/api/s3/multipart.rs#L432


```xml
<?xml version="1.0" encoding="UTF-8"?>
<CompleteMultipartUploadResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <Bucket>X</Bucket>
    <Key>X</Key>
    <ETag>&quot;572e7a853374de6582ca2b0bc03486e1-1&quot;</ETag>
</CompleteMultipartUploadResult>
```
