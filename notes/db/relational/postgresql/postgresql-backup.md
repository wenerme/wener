---
tags:
  - Backup
---

# Backup

- 导出
  - `COPY ... TO STDOUT WITH CSV HEADER \g export.scv`
  - `\copy (select 1 as val) TO 'test.csv' WITH CSV HEADER`
- 参考
  - [pg_dumpall](https://www.postgresql.org/docs/current/app-pg-dumpall.html)
  - [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html)
  - [pg_restore](https://www.postgresql.org/docs/current/app-pgrestore.html)
  - https://www.percona.com/blog/2019/03/27/postgresql-upgrade-using-pg_dump-pg_restore/

```bash
# -Z compress
pg_dump -Fc -Z 9 -j $(nproc) --file=file.dump myDb
pg_restore -Fc -j $(nproc) file.dump
```
