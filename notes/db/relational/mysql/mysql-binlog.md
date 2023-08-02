---
title: Binary Log
---

# Binary Log

| conf                          | default | for     |
| ----------------------------- | ------- | ------- |
| sql_log_bin                   | ON      |
| sync_binlog                   | 1       |
| binlog_expire_logs_seconds    | 2592000 | 30 days |
| binlog_expire_logs_auto_purge | ON      |


```sql
SELECT @@GLOBAL.log_bin, @@GLOBAL.version, @@GLOBAL.version_comment, @@GLOBAL.version_compile_os;
```
