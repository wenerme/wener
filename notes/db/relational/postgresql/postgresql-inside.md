---
title: PostgreSQL Inside
---

# Inside

- https://www.postgresql.org/docs/current/catalog-pg-class.html
- JSON 1GB 限制，压缩前
- pg_table_size, pg_relation_size, pg_total_relation_size
  - total_relation_size = table_size + index_size
  - table_size = relation_size + toast_size
  - external_size = toast_size + index_size
- https://www.postgresql.org/docs/current/storage-file-layout.html
- 参考
  - https://github.com/postgrespro/zson
    - 压缩 JSONB
- https://www.postgresql.org/docs/current/functions-admin.html
