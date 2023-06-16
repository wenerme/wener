---
tags:
  - FAQ
---

# ClickHouse FAQ

## 文件系统 {filesystem}

---

- https://kb.altinity.com/altinity-kb-setup-and-maintenance/filesystems/

## Cannot modify 'add_http_cors_header' setting in readonly mode

- 用  readonly=2

- https://clickhouse.com/docs/en/operations/settings/permissions-for-queries/#readonly

- 0 — Read, Write, and Change settings queries are allowed.
- 1 — Only Read data queries are allowed.
- 2 — Read data and Change settings queries are allowed.
