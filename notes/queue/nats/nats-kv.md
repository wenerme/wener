---
title: KV
---

# NATS KV

- 基于 JetStream 的 KV 存储
- https://pkg.go.dev/github.com/nats-io/nats.go#KeyValue
- https://github.com/nats-io/nats-architecture-and-design/blob/main/adr/ADR-8.md
  - read in-memory cache
  - key `\A[-/_=\.a-zA-Z0-9]+\z` - 不能 `.` 开头或结尾
  - bucket `\A[a-zA-Z0-9_-]+\z`
  - bucket
    - main `KV_<Bucket Name>`
    - ingest subject `$KV.<Bucket Name>.>`
    - max_msgs_per_subject - 历史版本数 - 最大 64
    - rollup_hdrs - rollup 删除
    - max_age - TTL
    - max_msg_size - value size
    - max_bytes - bucket size
  - $KV.CONFIGURATION.auth.username
    - io.nats.jetstream.api.v1.stream_msg_get_request

```bash
nats kv
```
