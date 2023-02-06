---
tags:
- Insight
---

# MinIO Inside

- xl.meta
  - headers+msgpack+inline-data
  - 存储小文件 - 128KiB
- .minio.sys/
  - buckets/
  - config/
    - config.json/
      - xl.meta
    - iam/
      - format.json/
        - xl.meta
      - sts/
        - `<ID>`/
          - identity.json/
            - xl.meta
  - format.json
  - multipart/
  - tmp/
  - tmp-old/
- STS - Security Token Service
  - 临时票据
  - username, secret, token
- 参考
  - [cmd/xl-storage.go](https://github.com/minio/minio/blob/master/cmd/xl-storage.go)
  - [MinIO Versioning, Metadata and Storage Deep Dive](https://blog.min.io/minio-versioning-metadata-deep-dive/)
  - [MinIO Optimizes Small Object Storage and Adds .tar Auto-Extraction](https://blog.min.io/minio-optimizes-small-objects/)
