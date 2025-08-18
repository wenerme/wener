---
title: ACL
---

# PostgreSQL ACL

:::tip

- `CREATE USER` 是 `CREATE ROLE` 的别名

:::

- DATABASE - 数据库
  - `CONNECT` - 允许用户连接到数据库。
  - `CREATE` - 允许用户在数据库中创建新的 Schema。
  - `TEMPORARY` / `TEMP` - 允许用户在此数据库中创建临时表。
- SCHEMA - 模式
  - `USAGE` - 允许用户访问 Schema 中的对象。
  - `CREATE` - 允许用户在此 Schema 中创建新对象（如表、视图、函数等）。
- TABLE - 表
  - `SELECT` - 允许从表或特定列读取数据。
  - `INSERT` - 允许向表中插入新行。
  - `UPDATE` - 允许更新表中已有的行。
  - `DELETE` - 允许从表中删除行。
  - `TRUNCATE` - 允许使用 `TRUNCATE` 命令快速清空表。
  - `REFERENCES` - 允许创建指向此表的外键约束。
  - `TRIGGER` - 允许在表上创建触发器。
- COLUMN - 列
  - `SELECT` - 允许从特定列读取数据。
  - `INSERT` - 允许在 `INSERT` 命令中为特定列提供值。
  - `UPDATE` - 允许在 `UPDATE` 命令中更新特定列。
  - `REFERENCES` - 允许创建指向此列的外键约束。
- SEQUENCE - 序列
  - `USAGE` - 允许使用 `currval` 和 `nextval` 函数。
  - `SELECT` - 允许使用 `currval` 函数。
  - `UPDATE` - 允许使用 `nextval` 和 `setval` 函数。
- FUNCTION / PROCEDURE - 函数 / 过程
  - `EXECUTE` - 允许调用函数或过程。
- VIEW - 视图
  - 权限与表（TABLE）的权限类似（`SELECT`, `INSERT`, `UPDATE` 等）。
- TYPE - 类型
  - `USAGE` - 允许使用自定义类型（例如，在创建表、函数或进行类型转换时）。
- TABLESPACE - 表空间
  - `CREATE` - 允许在此表空间中创建数据库对象（如表、索引）。

---

- User -> Role - 新版都是 ROLE
- 属性
  - LOGIN - 可登录 - `CREATE USER` 默认包含 LOGIN
  - INHERIT - 是否继承权限 IN ROLE - 默认 开启
    - 默认继承 PUBLIC
  - SUPERUSER
  - CREATEDB
  - CREATEROLE
  - REPLICATION LOGIN
  - `PASSWORD 'password' | PASSWORD NULL`
  - BYPASSRLS - RLS 不生效
  - CONNECTION LIMIT - 连接数限制
  - VALID UNTIL 'timestamp'
  - IN ROLE - 赋予角色
  - `ROLE role` - 添加其他角色到该分组
  - `ADMIN role`
    - 类似 ROLE, 但允许该角色添加其他成员到该组
    - 允许 `role` 添加其他成员到该组
- 预设角色
  - pg_read_all_data
  - pg_read_all_settings
  - pg_read_all_stats
  - pg_write_all_data
  - pg_stat_scan_tables - ACCESS SHARE
  - pg_monitor -> pg_read_all_settings, pg_read_all_stats, pg_stat_scan_tables
  - pg_database_owner
  - pg_signal_backend - 取消查询、终止会话
  - pg_read_server_files - COPY
  - pg_write_server_files
  - pg_execute_server_program
- GRANT - [Privileges](https://www.postgresql.org/docs/current/ddl-priv.html)
  - 角色权限
    - 表 - SELECT | INSERT | UPDATE | DELETE | TRUNCATE | REFERENCES | TRIGGER
      - 允许创建外键限制
      - 允许创建 TRIGGER
    - 列 - SELECT | INSERT | UPDATE | REFERENCES
    - 序列 - USAGE | SELECT | UPDATE
    - 数据库 - CREATE | CONNECT | TEMPORARY | TEMP
    - Schema - CREATE | USAGE
    - Domain - USAGE
    - FDW - USAGE
    - FOREIGN SERVER - USAGE
    - FUNCTION, PROCEDURE, ROUTINE - EXECUTE
  - PUBLIC=所有角色
- POLICY - 表 RLS
  - PERMISSIVE - OR 合并 - 默认
  - RESTRICTIVE - AND 合并
  - USING - 检查 SELECT 和 `INSERT/UPDATE … RETURNING`
    - false - 行不显示
  - WITH CHECK - 检查 INSERT 和 UPDATE - 默认使用 USING 条件
    - false - 出错
- RULE - 重写语句
- 参考
  - [GRANT](https://www.postgresql.org/docs/current/sql-grant.html)
  - [ALTER ROLE](https://www.postgresql.org/docs/current/sql-alterrole.html)
  - [CREATE ROLE](https://www.postgresql.org/docs/current/sql-createrole.html)
  - [ALTER DEFAULT PRIVILEGES](https://www.postgresql.org/docs/current/sql-alterdefaultprivileges.html)
    - 影响未来创建对象，不影响现在
  - [CREATE USER](https://www.postgresql.org/docs/current/sql-createuser.html)
  - postgrest [auth](https://postgrest.org/en/stable/auth.html)
  - pgconf us 2019 [Row Level Security](https://postgresconf.org/system/events/document/000/000/996/pgconf_us_2019.pdf)

:::caution

- set_config 是不能被控制的
  - RLS 针对 current_user - 维护很多用户记录
  - RLS 针对 匹配密码 记录 - db 计算量更大
  - RLS 针对 current_settings - 简单方便，但不可对外暴露
    - 也可以同时针对 current_user - 优先使用从 current_user 提取的信息
    - `tid bigint := coalesce(nullif(current_setting('tenant.id', true), '')::bigint,((regexp_match(current_user, 'tenant_(\d+)$'))[1])::bigint)`
  - RLS 针对 用户 使用静态值 - 性能最好，可提前优化查询
  - RLS 需要考虑做到 租户 维度还是 用户 维度

:::

```sql
create role wener login password 'wener'; -- 可登录用户
create role admin; -- 不可登录角色
grant admin to wener; -- 把 wener 加入 admin 分组
-- 给分组加权限，成员也会得到权限
grant all on all tables in schema public to admin;

-- 不可以用于 SECURITY DEFINER
-- SET [ SESSION | LOCAL ] ROLE NONE|role_name
SET ROLE wener; -- 修改 current_user
RESET ROLE;     -- 恢复

-- 类似于 SET ROLE
-- 设置后，下次 SET ROLE 会校验是否有权限，而 SET ROLE 则是基于最开始的权限判断
-- SET LOCAL 可以用于 SECURITY DEFINER
-- SET [ SESSION | LOCAL ] SESSION AUTHORIZATION DEFAULT|user_name
SET SESSION AUTHORIZATION wener;
RESET SESSION AUTHORIZATION
```

## ROLE 属性

```sql
select current_user; -- 当前用户

-- 控制可见范围
-- 默认 "$user", public
show search_path;
-- 针对 ROLE 设置
alter role demo_app_web set search_path = app_web,public;

-- 针对 ROLE 设置 SESSION 变量
-- ⚠️ 只有在 LOGIN 才生效，SET ROLE 和 SET SESSION AUTHORIZATION 不生效。
alter role demo_t_500 set tenant.id = 500;
```

- search_path 可针对 ROLE, DATABASE 设置

## list grants

```sql
SELECT grantee, grantor, table_schema, table_name, privilege_type
FROM information_schema.role_table_grants
WHERE table_schema NOT IN ('pg_catalog', 'information_schema', 'columnar')
  AND table_name NOT IN ('citus_tables');
```

## list role settings

```sql
SELECT r.rolname, d.datname, rs.setconfig
FROM pg_db_role_setting rs
         LEFT JOIN pg_roles r ON r.oid = rs.setrole
         LEFT JOIN pg_database d ON d.oid = rs.setdatabase;
```

## list policy

```sql
SELECT n.nspname                                   AS schemaname,
       c.relname                                   AS tablename,
       pol.polname                                 AS policyname,
       CASE
           WHEN pol.polpermissive THEN 'PERMISSIVE'::text
           ELSE 'RESTRICTIVE'::text
           END                                     AS permissive,
       CASE
           WHEN pol.polroles = '{0}'::oid[] THEN string_to_array('public'::text, ''::text)::name[]
           ELSE ARRAY(SELECT pg_authid.rolname
                      FROM pg_authid
                      WHERE pg_authid.oid = ANY (pol.polroles)
                      ORDER BY pg_authid.rolname)
           END                                     AS roles,
       CASE pol.polcmd
           WHEN 'r'::"char" THEN 'SELECT'::text
           WHEN 'a'::"char" THEN 'INSERT'::text
           WHEN 'w'::"char" THEN 'UPDATE'::text
           WHEN 'd'::"char" THEN 'DELETE'::text
           WHEN '*'::"char" THEN 'ALL'::text
           ELSE NULL::text
           END                                     AS cmd,
       pg_get_expr(pol.polqual, pol.polrelid)      AS qual,
       pg_get_expr(pol.polwithcheck, pol.polrelid) AS with_check
FROM pg_policy pol
         JOIN pg_class c ON c.oid = pol.polrelid
         LEFT JOIN pg_namespace n ON n.oid = c.relnamespace;
```
