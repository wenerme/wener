---
title: PL/pgSQL
---

# PL/pgSQL

- [plpgsql](https://www.postgresql.org/docs/current/plpgsql.html)
  - [declarations](https://www.postgresql.org/docs/current/plpgsql-declarations.html)
    - %TYPE
    - %ROWTYPE
- raise
  - DEBUG, LOG, INFO, NOTICE, WARNING, EXCEPTION
  - 默认 EXCEPTION

:::caution

- 尽量避免 EXCEPTION - 过多影响性能

:::

:::tip

- 不想要结果使用 PERFORM
- 内部逻辑对比
  - `IF expression THEN ...` -> `SELECT expression`
  - `IF x < y THEN ...` -> `PREPARE statement_name(integer, integer) AS SELECT $1 < $2`

:::

- 语句
  - SELECT, INSERT, UPDATE, DELETE + INTO
  - PERFORM - 执行不返回结果语句
  - EXECUTE - 执行动态构建的语句
  - `GET [ CURRENT ] DIAGNOSTICS variable { = | := } item [ , ... ]`
    获取结果状态
    - ROW_COUNT
    - PG_CONTEXT
  - NULL - noop
  - COMMIT
  - ROLLBACK
  - RAISE
  - ASSERT
- 控制流
  - RETURN
  - RETURN NEXT, RETURN QUERY, RETURN QUERY EXECUTE
    - 定义返回结果，还需要执行 RETURN 才会返回
    - 返回前结果会全部存储 - 因此不要返回大量的数据
  - `EXIT [ label ] [ WHEN boolean-expression ]`
    - 跳出 BLOCK - 类似 break
  - `CONTINUE [ label ] [ WHEN boolean-expression ]`
  - IF/THEN/ELSE/ELSIF/END IF
  - CASE/WHEN/ELSE/END CASE
  - LOOP/END LOOP
  - WHILE/LOOP/END LOOP
  - FOR/IN/LOOP/END LOOP - 便利结果、数字
  - FOREACH/IN ARRYAY/LOOP/END LOOP - 便利数组
  - EXCEPTION/WHEN/THEN
    - `GET STACKED DIAGNOSTICS variable { = | := } item [ , ... ]`
      - 获取异常信息
- cursor
  - 定义
    - `refcursor`
    - `CURSOR FOR SELECT * FROM tenk1`
    - `CURSOR (key integer) FOR SELECT * FROM tenk1 WHERE unique1 = key`
  - OPEN/FOR
  - OPEN/FOR EXECUTE
  - FETCH/INTO
  - MOVE - 类似 FETCH 但不返回结果
  - `UPDATE table SET ... WHERE CURRENT OF cursor`
    - 要求 cursor 没有 聚合
    - 建议添加 FOR UPDATE
  - `DELETE FROM table WHERE CURRENT OF cursor`
  - CLOSE
  - FOR/IN/LOOP/END LOOP
- trigger
  - 返回类型 trigger - 数据变化
  - 返回类型 event_trigger - 数据库事件
  - 自动创建变量 `TG_<NAME>`
    - NEW, OLD
    - TG_NAME, TG_WHEN, TG_LEVEL, TG_OP, TG_RELID, TG_RELNAME
    - TG_TABLE_NAME, TG_TABLE_SCHEMA
    - TG_NARGS, TG_ARGV
    - event - DDL - https://www.postgresql.org/docs/current/event-trigger-matrix.html
      - TG_EVENT, TG_TAG
  - 返回 NULL 或 record
  - BEFORE row
    - 返回 NULL 则不会触发实际操作 - INSERT/UPDATE/DELETE
    - 修改 NEW 返回会使用新的值
    - DELETE 返回内容无意义，但需要 非 NULL
      - 此时 NEW 为 NULL，一般返回 OLD

```sql title="整体结构"
[ <<label>> ]
[ DECLARE
    declarations ]
BEGIN
    statements
END [ label ];
```

```sql title="print_strict_params 辅助调试"
CREATE FUNCTION get_userid(username text) RETURNS int
AS $$
#print_strict_params on
DECLARE
userid int;
BEGIN
    SELECT users.userid INTO STRICT userid
        FROM users WHERE users.username = get_userid.username;
    RETURN userid;
END;
$$ LANGUAGE plpgsql;
```

```sql title="FOR 支持 REVERSE 和 BY"
FOR i IN REVERSE 10..1 BY 2 LOOP
    -- i will take on the values 10,8,6,4,2 within the loop
END LOOP;
```

- 函数隐含最外层 block - label 为函数名字
  - 包含 DIAGNOSTICS 信息
  - 隐含 FOUND 变量 - 当语句有值时会设置
    - SELECT INTO
    - PERFORM
    - UPDATE, INSERT, DELETE
    - FETCH
    - MOVE
    - FOR, FOREACH
    - RETURN QUERY, RETURN QUERY EXECUTE

```sql title="使用隐含的 FOUND 变量"
SELECT * INTO STRICT myrec FROM emp WHERE empname = myname;
IF NOT FOUND THEN
    RAISE EXCEPTION 'employee % not found', myname;
END IF;
```

- select into STRICT 单个 record 可能的异常 code
  - NO_DATA_FOUND
  - TOO_MANY_ROWS
- 没有 STRICT 直接返回第一条，没有则是 NULL

```sql
-- strict_multi_assignment
-- too_many_rows
SET plpgsql.extra_warnings TO 'shadowed_variables';
```

```
#variable_conflict error
#variable_conflict use_variable
#variable_conflict use_column
```
