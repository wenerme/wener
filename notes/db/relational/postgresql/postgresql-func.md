---
title: Functions
---

# PostgreSQL Functions

- 定义 FUNCTION
  - VOLATILE - 默认
  - IMMUTABLE - 不修改 DB，不查询 DB，参数相同总是返回一样的值
  - STABLE - 不修改 DB，根据环境不同可能返回值变化
    - current_timestamp 是 STABLE
  - `PARALLEL { UNSAFE | RESTRICTED | SAFE }`
    - RESTRICTED - 默认
  - LEAKPROOF - 函数无 副作用
    - 安全相关
    - 只有 superuser 可以设置
- 控制流
  - `NULLIF(value,match)`
  - `COALESCE(values...)` - 返回第一个非 NULL
    - 不会都求值
- 参考
  - [Functions and Operators](https://www.postgresql.org/docs/current/functions.html)

```sql
-- 常用方式
CREATE FUNCTION add(integer, integer) RETURNS integer
AS 'select $1 + $2;'
LANGUAGE SQL
IMMUTABLE
RETURNS NULL ON NULL INPUT;

-- 更 SQL 的方式
CREATE FUNCTION add(a integer, b integer) RETURNS integer
LANGUAGE SQL
IMMUTABLE
RETURNS NULL ON NULL INPUT
RETURN a + b;

-- PL/pgSQ
CREATE OR REPLACE FUNCTION increment(i integer) RETURNS integer
AS $$
BEGIN
  RETURN i + 1;
END;
$$ LANGUAGE plpgsql;
```

## 默认 PUBLIC 可执行 函数

```sql
-- 不允许 PUBLIC 执行
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;
```

## PROCEDURE vs FUNCTION vs ROUTINE

- PROCEDURE - SQL 标准
  - 不返回值
  - 可以使用 OUT 参数
  - 使用 `CALL` 调用
  - 可以 **嵌套事务**
- FUNCTION
  - 可以 RETURN 可以 OUT 参数
  - 使用 `SELECT` 调用
  - 不可以嵌套事务
  - 支持多种语言: SQL, PL/pgSQL, C, 扩展语言
  - 语法更丰富
    - VARIADIC
    - DEFAULT
    - 多态
    - 重载
    - 返回表
- ROUTINE=PROCEDURE+FUNCTION
  - `ALTER ROUTINE`, `DROP ROUTINE` 可用于操作 FUNCTION 或 PROCEDURE
  - **没有** `CREATE ROUTINE`
