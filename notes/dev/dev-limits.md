---
tags:
  - Limits
---

# 开发常见限制

- NATS - 最大消息体 max_payload=1 MB, 最大 64 MB, 不建议超过 8MB
- gRPC 请求 Message 默认最大 4MB
- gRPC 响应 Message 默认无限制
- Kubernetes
  - 110 pods/node
  - 1 MB/object - ETCD 限制
  - 所有 annotation KV 加起来不超过 **256Kb**
  - RFC-1123 - DNS LabelName 最长 **63** 字符
    - 所有支持 DNS Lookup 的对象 - pod,service,namespace
    - label
  - gRPC 4MB 限制同样影响 K8S API Server
- ETCD
  - 单次请求 1.5MiB - --max-request-bytes=1.5MiB
  - 最大2G - --quota-backend-bytes=2GB - 建议不超过 8GB
- PostgreSQL
  - db 名字 最长 63 byte
  - 最多 32767 参数占位 - `?` - 范围为 smallint
