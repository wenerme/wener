---
title: S3
tags:
  - AWS
  - Limits
  - Protocol
---

# S3

- [garage](./garage.md)
- [MinIO](../minio/README.md)
- [oxyno-zeta/s3-proxy](https://github.com/oxyno-zeta/s3-proxy)
  - Apache-2.0, Go
- [gaul/s3proxy](https://github.com/gaul/s3proxy)
  - Apache-2.0, Java
- S3 Proxy with overlay
  - https://github.com/Switch-TV/s3proxy/tree/feature/overlay-middleware
- [pottava/aws-s3-proxy](https://github.com/pottava/aws-s3-proxy)
- [dandanthedev/littletinystorage](https://github.com/dandanthedev/littletinystorage)
  - GPLv3, TS
  - S3 兼容接口
  - 可以作为实现的参考
- glacier - 冷存储, 90 天 删除

## Limits

| item        | spec       | e.g.  |
| ----------- | ---------- | ----- |
| key         | 1024 bytes | a/b/c |
| key segment | 255 bytes  | a     |
| bucket      | 63 bytes   |

**bucket name**

```
(?!(^xn--|.+-s3alias$))^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$
(?!(^((2(5[0-5]|[0-4][0-9])|[01]?[0-9]{1,2})\.){3}(2(5[0-5]|[0-4][0-9])|[01]?[0-9]{1,2})$|^xn--|.+-s3alias$))^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$
```

- key
  - UTF8
  - 安全字符 `[0-9a-zA-z!_.*'()-]`
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html
  - BucketName 规则
- [S3 Limits](https://docs.aws.amazon.com/AmazonS3/latest/userguide/qfacts.html)
- minio [Thresholds and Limits](https://min.io/docs/minio/linux/operations/concepts/thresholds.html)

## headers

- `x-amz-meta-`
- `x-amz-acl`
- `x-amz-server-side-encryption-`
- `x-amz-server-side-encryption`
- `x-amz-storage-class`

```
content-type
cache-control
content-encoding
content-disposition
content-language
x-amz-website-redirect-location

Content-MD5: ${BASE64}

# SigV4 - Signature Version 4
# UNSIGNED-PAYLOAD 不计算 payload hash
x-amz-content-sha256: UNSIGNED-PAYLOAD
x-amz-content-sha256: ${hex(sha256)}

# 自动处理
x-amz-sdk-checksum: SHA256
```

- https://docs.aws.amazon.com/AmazonS3/latest/userguide/checking-object-integrity.html

## API

- https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html
- https://min.io/docs/minio/linux/developers/javascript/API.html

## Profile

- AWS_PROFILE
- ~/.aws/credentials
- `%USERPROFILE%\.aws\credentials`
- ~/.aws/config
- https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html

```ini title="~/.aws/credentials"
[default]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_SECRET_KEY

[your_profile_name]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_SECRET_KEY
```

```bash
aws --profile project01 --endpoint-url http://localhost:9000 s3 ls s3://my-bucket01/
```

# FAQ

- Aliyun
  - s3.oss-cn-hongkong.aliyuncs.com
  - 内网 s3.oss-cn-hongkong-internal.aliyuncs.com
  - https://help.aliyun.com/zh/oss/developer-reference/compatibility-with-amazon-s3-1/
