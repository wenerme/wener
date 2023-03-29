---
tags:
  - FAQ
---

# MySQL FAQ


```sql
select version();
```

## debug connections

```sql
-- 默认 151 - 150 普通用户, 1 super
show variables like 'max_connections';
show status where variable_name = 'threads_connected';
show processlist;

select id,
       user,
       host,
       db,
       command,
       time,
       state,
       info
from information_schema.processlist
```

## 修改密码

```sql
select user,host from mysql.user;
select user,host from mysql.db;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

-- 允许 root 远程
-- root@localhost -> root@%
UPDATE mysql.user SET Host='%' WHERE Host='localhost' AND User='root';
FLUSH PRIVILEGES;

-- UPDATE mysql.db SET Host='%' WHERE Host='localhost' AND User='username';
```

## Backup

- https://dba.stackexchange.com/a/91322/234272
