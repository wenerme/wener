---
title: MySQL
---

# MySQL Exporter

- [prometheus/mysqld_exporter](https://github.com/prometheus/mysqld_exporter)
- https://github.com/prometheus/mysqld_exporter/tree/main/mysqld-mixin

```sql
CREATE USER 'exporter'@'localhost' IDENTIFIED BY 'XXXXXXXX' WITH MAX_USER_CONNECTIONS 3;
GRANT PROCESS, REPLICATION CLIENT, SELECT ON *.* TO 'exporter'@'localhost';
```
