---
title: permify
---

# Permify

- [Permify/permify](https://github.com/Permify/permify)
  - Apache-2.0, Go
  - 通过 CDC 同步信息
- DSL 除了定义 ReBAC 还包含了数据库映射信息
  - PG 创建 replication_slot, 开始同步
- 参考
  - https://docs.permify.co/docs/getting-started/modeling

```http
POST /v1/permissions/check

{
  "user": "1",
  "action": "push",
  "object": "repository:1",
  "depth": 8
}
```

