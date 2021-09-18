---
title: juicefs
---

# juicefs

- [juicedata/juicefs](https://github.com/juicedata/juicefs)
  - AGPL-3.0, Go
  - distributed POSIX fs
  - metadata - Redis, TiKV, PG, MySQL
  - data - S3, OSS, Ceph, MinIO
  - 对带宽要求高
    - 带宽不足，可以把缓存设大，再开启异步写入模式 --writeback
