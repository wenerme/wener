---
title: juicefs
---

# juicefs

- [juicedata/juicefs](https://github.com/juicedata/juicefs)
  - Apache-2.0, Go
  - distributed POSIX fs
  - metadata - Redis, TiKV, PG, MySQL
  - data - S3, OSS, Ceph, MinIO
  - 对带宽要求高
    - 带宽不足，可以把缓存设大，再开启异步写入模式 --writeback

:::caution 不提供实际存储

- 将对象存储暴露为 FS 存储协议
- 维护 FS 元数据
- 本身不存储数据

:::
