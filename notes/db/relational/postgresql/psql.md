---
title: psql
---

# psql

- ~/.psqlrc
- ~/.psql_history

| meta command                                                         | for                            |
| -------------------------------------------------------------------- | ------------------------------ |
| `\a`                                                                 | toggle align                   |
| `\c <db>`, `\connect <db>`                                           | 切换 数据库 = 重连             |
| `\c [-reuse-previous=on\|off] [db [user] [host] [port] \| conninfo]` | 切换 链接                      |
| `\C [title]`                                                         | 设置标题 = `\pset title TITLE` |
| `\cd [dir]`                                                          | 切换目录                       |
| `\conninfo`                                                          | 显示连接信息                   |
| `\dn`                                                                | list schema                    |
| `\ds`                                                                | list relation                  |
| `\dt *.*`                                                            | list all table                 |
| `\dt`                                                                | list public schema table       |
| `\du`                                                                | list users                     |
| `\dx`                                                                | list extensions                |
| `\l`                                                                 | list database                  |
| `\df[amptwS+]`                                                       | list functions                 |
| `\copy`                                                              |
| `\g [ (option=value [...]) ] [ filename ]`                           | 执行输出到文件                 |
| `\g [ (option=value [...]) ] [ \|command ]`                          | 执行输出到命令                 |
| `\g [ (option=value [...]) ]`                                        | 执行输出到 stdout              |
| `\if exp \elif exp \else \endif`                                     | 条件判断                       |
| `\timing [ on \| off ]`                                              | 显示执行时间                   |

- a - agg
- n - normal
- p - procedure
- t - trigger
- w - window
- S - system object
- `+` - 额外信息

:::caution

- meta command 需要在一行 - 特别是 `\copy()`
- 变量
  - `\set name value`
  - `\echo :name`
  - `\unset name`

:::

| var                     | for                                      |
| ----------------------- | ---------------------------------------- |
| AUTOCOMMIT              | 自动提交                                 |
| `COMP_KEYWORD_CASE`     | 关键字大小写                             |
| DBNAME                  | 数据库名                                 |
| ECHO                    | 输出                                     |
| ECHO_HIDDEN             | 隐藏输出                                 |
| ENCODING                | 编码                                     |
| ERROK                   | 错误忽略                                 |
| FETCH_COUNT             | 每次获取                                 |
| HIDE_TABLEAM            | 隐藏表                                   |
| HIDE_TOAST_COMPRESSION  | 隐藏压缩                                 |
| HISTCONTROL             | 历史控制                                 |
| HISTFILE                | 历史文件                                 |
| HISTSIZE                | 历史大小                                 |
| HOST                    | 主机                                     |
| IGNOREEOF               | 忽略 EOF                                 |
| LASTOID                 | 最后 OID                                 |
| LAST_ERROR_MESSAGE      | 最后错误                                 |
| LAST_ERROR_SQLSTATE     | 最后错误状态                             |
| ON_ERROR_ROLLBACK       | 错误回滚                                 |
| ON_ERROR_STOP           | 错误停止                                 |
| PORT                    | 端口                                     |
| PROMPT1,PROMPT2,PROMPT3 | 提示符                                   |
| QUIET                   | 安静                                     |
| ROW_COUNT               | 行数                                     |
| SERVER_VERSION_NAME     | 服务器版本                               |
| SERVER_VERSION_NUM      | 服务器版本号                             |
| SHELL_ERROR             | shell 错误                               |
| SHOW_ALL_RESULTS        | 显示所有结果                             |
| SHOW_CONTEXT            | 显示上下文                               |
| SINGLELINE              | 单行 `-S`                                |
| SINGLESTEP              | 单步 `-s`                                |
| SQLSTATE                | 状态                                     |
| USER                    | 用户                                     |
| VERBOSITY               | 详细度 default, verbose, terse, sqlstate |
| VERSION                 |
| VERSION_NAME            |
| VERSION_NUN             |

```sql
\echo :VERSION

-- 获取程序返回
\set val `cat test.txt`

select :'VERSION' as ver;
```

| flag               |
| ------------------ |
| -h,--host=hostname |
| -p,--port=port     |

```bash
brew install libpq # client only
export PATH="$(brew --prefix)/opt/libpq/bin:$PATH"

# brew install postgresql@15 #

# 使用链接字符串
psql "service=myservice sslmode=require"
psql postgresql://dbmaster:5433/mydb?sslmode=require
```

```
\copy { table [ ( column_list ) ] } from { 'filename' | program 'command' | stdin | pstdin } [ [ with ] ( option [, ...] ) ] [ where condition ]
\copy { table [ ( column_list ) ] | ( query ) } to { 'filename' | program 'command' | stdout | pstdout } [ [ with ] ( option [, ...] ) ]
```

- 和 [COPY](https://www.postgresql.org/docs/current/sql-copy.html) 类似
  - COPY 是输出到服务端
  - `\copy` 是输出到客户端
    - 类似 `COPY ... TO STDOUT ` - 不过这样可以写多行 SQL

```sql
-- 两者效果相同, 但 copy 支持多行, \copy 只能在一行
\copy (select 1 as val) TO 'test.csv' WITH CSV HEADER
COPY (
  select 1 as val
) TO STDOUT WITH CSV HEADER \g test.csv;


-- COPY 处理 conflict - 只能通过临时表来处理
-- 如果在事务 BEGIN, COMMIT 里可以增加 ON COMMIT DROP
CREATE TEMP TABLE tmp_table  (LIKE main_table INCLUDING DEFAULTS);
COPY tmp_table FROM 'data.csv';
INSERT INTO main_table SELECT * FROM tmp_table ON CONFLICT DO NOTHING;

-- 链接信息
\conninfo
-- You are connected to database "test" as user "admin" on host "127.0.0.1" at port "5432".
```

---

- 配合 [pgpass](./pgpass.md) 避免输入密码
- [psql](https://www.postgresql.org/docs/current/app-psql.html)
