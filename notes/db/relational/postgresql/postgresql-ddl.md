---
title: DDL
---

# PostgreSQL DDL

## CREATE TABLE

- 区分 column_constraint, table_constraint
- INHERITS - 继承源表
  - 可以是 本地表或远程表
  - 会建立关系 - 修改父表影响子表
  - 可覆盖列定义 - 但类型要匹配
- LIKE - 复制源表信息 -
  - 可复制 本地表、视图、远程表、组合类型
  - `{ INCLUDING | EXCLUDING } { COMMENTS | COMPRESSION | CONSTRAINTS | DEFAULTS | GENERATED | IDENTITY | INDEXES | STATISTICS | STORAGE | ALL }`
  - 默认选项为 EXCLUDING，也就是包含所有
- 外键
  - addition foreign key constraint - 被引用表 SHARE ROW EXCLUSIVE
  - MATCH
    - SIMPLE - 默认 - 允许任意列 NULL - 含 NULL 则不限制
    - FULL - 多外键列时不允许有一个列为 NULL 除非全 NULL
    - PARTIAL - 未实现
  - ON DELETE|UPDATE
    - NO ACTION - 默认 - 可以延迟检查
    - RESTRICT - 同 NO ACTION 但 不可以延迟检查
    - CASCADE
    - SET NULL
    - SET DEFAULT - 设置为默认，要求引用表也能匹配上对应行
- `[NOT] DEFERRABLE`
  - 是否立即检查 - 可以在事务最后检查
- `INITIALLY {IMMEDIATE|DEFERRED}`
  - 控制可延迟检查限制的 检查时间
  - IMMEDIATE - 立即
  - DEFERRED - 事务结束
  - 可修改 `SET CONSTRAINTS { ALL | name [, ...] } { DEFERRED | IMMEDIATE }`
- ON COMMIT - 控制临时表提交时的行为
  - PRESERVE ROWS
  - DELETE ROWS
  - DROP
- 参考
  - [CREATE TABLE](https://www.postgresql.org/docs/current/sql-createtable.html)
- PG 11 开始支持生成列
  - PG 12 支持 STORED
  - VIRTUAL - WIP

## ALTER TABLE

- `{ DISABLE | ENABLE } ROW LEVEL SECURITY`
  - 是否开启 RLS
- `[NO] FORCE ROW LEVEL SECURITY`
  - 是否限制 table owner - ⚠️ 该操作不会 enable RLS
  - 默认不限制 table owner
- 参考
  - [ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)

```sql
-- 查看 RLS 状态
select relname, relrowsecurity, relforcerowsecurity
from pg_class
where relname not like 'pg_%'
  and relname not like 'sql_%'
  and relkind = 'r';
```

## 继承表

- 权限只校验父表
- 不支持跨表 UNIQUE、外键
  - 索引只能针对单个表
- INSERT, UPDATE 需要明确表
- ALTER TABLE 可以将表设置为继承表
- 不支持 ALTER TABLE RENAME

```sql
SELECT name, elevation
-- ONLY 不包含 children 表
FROM ONLY cities
WHERE elevation > 500;

-- c.tableoid 来源表 - 在 pg_class.oid 找到定义
SELECT c.tableoid::regclass, c.name, c.elevation
FROM cities c
WHERE c.elevation > 500;

SELECT name, elevation
-- 显性要求包含 children - 默认包含 - 不建议使用该语法
FROM cities*
WHERE elevation > 500;
```

- https://www.postgresql.org/docs/current/ddl-inherit.html
- https://www.postgresql.org/docs/current/tutorial-inheritance.html
- 可用于数据分片 - https://arctype.com/blog/inheritance-in-postgres/
  - 不过现在的 pg 分片功能更成熟
