---
id: version
title: 版本历史
tags:
  - Version
---

# PostgreSQL Version

- [发布历史](https://en.wikipedia.org/wiki/PostgreSQL#Release_history)
  - 现在一般每年 Q4 发布新版本，最近大多为 10 月
- [版本支持说明](https://www.postgresql.org/support/versioning/)
  - 发布后支持 5 年

| PostgreSQL      | Release Date |
| --------------- | ------------ |
| [PostgreSQL 16] | 2023-09-14   |
| [PostgreSQL 15] | 2022-10-13   |
| [PostgreSQL 14] | 2021-09-30   |
| [PostgreSQL 13] | 2020-09-24   |
| [PostgreSQL 12] | 2019-10-03   |
| [PostgreSQL 11] | 2018-10-18   |

- https://www.postgresql.org/about/featurematrix/
- [zheap](https://wiki.postgresql.org/wiki/Zheap)
  - handle UPDATE in PostgreSQL
  - 2020 [ZHEAP: REINVENTED POSTGRESQL STORAGE](https://www.cybertec-postgresql.com/en/zheap-reinvented-postgresql-storage/)
  - 2021 [zheap: What has been done since last time](https://www.cybertec-postgresql.com/en/postgresql-zheap-current-status/)

[postgresql 15]: #postgresql-15
[postgresql 14]: #postgresql-14
[postgresql 13]: #postgresql-13
[postgresql 12]: #postgresql-12
[postgresql 11]: #postgresql-11

## PostgreSQL 16

- Logical Replication 优化
- Parallel Execution 优化
- JSON/JSONB 支持更多操作 - 更完善的 SQL/JSON  支持
- Concurrent Bulk Loading
- psql
  - `\bind` -> `SELECT $1::int + $2::int \bind 1 2 \g)`
- SIMD 加速
  - JSON
  - 字符串处理
- pg_stat_io
- load_balance_hosts
  - libpq
- 参考
  - https://www.postgresql.org/about/news/postgresql-16-released-2715/
## PostgreSQL 15

- 新增 MERGE 语句 - 用于合并两个 **表**
  - `MERGE INTO table USING source ON join WHEN MATCHED THEN INSERT|UPDATE|DELETE|DO NOTHING`
  - 支持增删改
  - `INSERT ... ON CONFLICT` 只支持 增改
- ~~更多 SQL/JSON 函数~~
  - 构造 JSON
    - `JSON('{}')` = `'{}'::json`
    - JSON_SCALAR, JSON_OBJECT, JSON_OBJECTAGG, JSON_ARRAY, JSON_ARRAYAGG
  - 查询 JSON
    - `IS JSON [NOT] [{VALUE|SCALAR|ARRAY|OBJECT}] [{WITH|WITHOUT} UNIQUE [KEYS]]`
    - JSON_EXISTS, JSON_VALUE, JSON_QUERY, JSON_TABLE
  - JSON_TABLE - JSON 转表
  - 大多 JSON 相关特性被 revert
    - https://git.postgresql.org/gitweb/?p=postgresql.git;a=commitdiff;h=2f2b18bd3f554e96a8cc885b177211be12288e4a
    - 时间来不及 https://www.postgresql.org/message-id/40d2c882-bcac-19a9-754d-4299e1d87ac7@postgresql.org
- 更多 regex 函数
  - regexp_count , regexp_instr, regexp_like, regexp_substr
- 新增 range_agg 用于聚合 range,multirange 类型为 multirange
- 支持 zstd 压缩
  - toast 支持 zstd
  - pg_basebackup 支持 zstd
  - wal_compression 支持 zstd
- 逻辑复制支持限定 表 , Schema, 行, 列
  - 新增 pg_publication_namespace 记录 PUBLICATION 信息
- UNIQUE null 处理选项
  - `nulls distinct` - null 要求唯一
  - `nulls not distinct` - null 不要求唯一 - 目前的默认逻辑
- 性能
  - 支持并行处理 `SELECT DISTINCT`
  - postgres_fdw 增加 `parallel_commit` 选型
  - > 8kb 的 toast 可以利用索引去重
- 支持 jsonlog
- psql `\dconfig` 显示非默认配置

```sql
-- 逻辑复制限定
-- ===================
-- FOR ALL TABLES IN SCHEMA
CREATE PUBLICATION pub1 FOR ALL TABLES IN SCHEMA sch1,sch2;
-- ADD ALL TABLES IN SCHEMA
ALTER PUBLICATION pub1 ADD ALL TABLES IN SCHEMA sch3,sch4;
-- 限定表
CREATE PUBLICATION pub1 FOR ALL TABLES IN SCHEMA sch1,sch2, TABLE tbl1, tbl2;
-- 修改表
ALTER PUBLICATION pub1 ADD ALL TABLES IN SCHEMA sch3,sch4, TABLE tbl3, tbl4;

-- UNIQUE NULL 处理逻辑
-- ===================
create table test2 (
    id serial primary key,
    codename text,
    unique NULLS NOT DISTINCT (codename)
);
```

## PostgreSQL 14

- `BEGIN ATOMIC ... END` 不再需要 quote `BEGIN $$ ... $$ END`, 只能用于 LANGUAGE sql
  - 定义时就被解析和检查 - early binding
    - 构造依赖关系
    - 检查对象合法
  - 会自动跟踪函数体内使用的数据库对象的依赖关系。
  - 能 DROP ... CASCADE，避免留下孤立的函数
  - 不支持多态参数
  - https://www.postgresql.org/docs/current/sql-createfunction.html#id-1.9.3.67.6
- SELECT/INSERT
  - 大部分关键词允许被用于列名
  - 正确处理插入多列时的 `DEFAULT` - 之前是直接错误
  - CTE 新增 SEARCH, CYCLE
    - SEARCH - 控制递归的查询方式
      - `SEARCH DEPTH FIRST BY id SET ordercol`
      - `SEARCH BREADTH FIRST BY id SET ordercol`
    - CYCLE - 递归时判断是否是循环
      - `CYCLE id SET is_cycle USING path`
- 其他命令
  - `CREATE TRIGGER` 支持 `OR REPLACE`
  - `REFRESH MATERIALIZED VIEW` 支持并行查询
  - `GRANT` 和 `REVOKE` 支持 `GRANTED BY`
  - `TRUNCATE` 支持外部表
  - `ALTER SUBSCRIPTION ... ADD/DROP PUBLICATION` - 方便修改 PUBLICATION
- 数据类型
  - 数字类型支持 `infinity` 和 `-infinity` - 之前浮点数已经支持
  - 除以 `infinity` 返回 0 - 之前异常
  - 除以 NaN 返回 NaN - 之前异常
  - JSON 支持 `data['name']` 格式访问数据 - subscripts - 其他内嵌数据也可以用这样语法 - 例如 hstore
  - multirange - RANGE 非连续类型
- 函数
  - function 和 procedure 支持是 SQL 标准方法体
    - 之前是单引号 或 `$$`
    - 现在可直接写
  - procedure 支持 OUT 参数
  - 新增 trim_array()
  - 新增 bytea 的 ltrim, rtrim
  - split_part() 支持 负索引
  - bit_xor - 位或运算
  - bit_count - 返回多少个 bit
  - `SUBSTRING(text SIMILAR pattern ESCAPE escapechar)`
    - 之前 `SUBSTRING(text FROM pattern FOR escapechar)`
- 客户端接口
  - libpq 支持 pipeline - 并行执行多个语句，可按需等待返回
- server
  - 新增预定义角色 pg_read_all_data, pg_write_all_data
  - 新增预定义角色 pg_database_owner - 匹配数据库 owner
  - 客户端断开链接则终止长查询 - client_connection_check_interval
  - postgres_fdw
    - 新增管理函数 - postgres_fdw_get_connections,postgres_fdw_disconnect,postgres_fdw_disconnect_all
    - 支持查询并行
    - 支持导入结构 IMPORT FOREIGN SCHEMA
- vacuum
  - 允许忽略索引 - INDEX_CLEANUP
  - 允许忽略 TOAST - PROCESS_TOAST
  - 提升较多关联关系数据库的 vacuum 速度
  - autovacuum 支持分析分片表 - CONCURRENTLY
- index
  - btree - 删除性能提升 - Bottom-up Index Deletion - 避免索引膨胀
- 分片表
  - 优化 updates/deletes 只影响少部分分区时的性能
  - 允许不阻塞的方式脱离分区
- 优化器
  - IN 支持使用 hash 查找大量常量值 - 之前是 seq scan
  - 扩展统计支持 OR 语句
  - 扩展统计支持 语句 - 之前是列
- 性能提升
  - 窗口函数支持增量排序
  - 提升并行 seq scan 性能
  - 多外部表引用支持并行查询 - postgres_fdw 需要设置 async_capable
  - 提升正则比较性能
  - TOAST 支持 LZ4 压缩 - 保留支持 pglz
  - 大量连接数场景性能提升 - 2x
  - [enable_memoize](https://www.postgresql.org/docs/14/runtime-config-query.html#GUC-ENABLE-MEMOIZE)
    - nested join 的时候能提升性能
- [PostgreSQL 14 Release Notes](https://www.postgresql.org/docs/14/release-14.html)

```sql
-- 新的访问语法
SELECT ('{ "postgres": { "release": 14 }}'::jsonb)['postgres']['release'];

-- multirange
SELECT '{[3,7), [8,9)}'::int4multirange;

-- 导入外部结构 - 可选择或排除表
IMPORT FOREIGN SCHEMA remote_schema
--    [ { LIMIT TO | EXCEPT } ( table_name [, ...] ) ]
    FROM SERVER server_name
    INTO local_schema
--    [ OPTIONS ( option 'value' [, ... ] ) ]
;

-- 日期分桶 - 方便切分
-- 2020-02-11 15:30:00
SELECT date_bin('15 minutes', TIMESTAMP '2020-02-11 15:44:17', TIMESTAMP '2001-01-01');
```

## PostgreSQL 13

- 索引
  - B Tree 索引优化对重复数据的处理，减少索引大小
    - 经测试，一个表的索引从 6G 减少到 2.5G
- 性能
  - 增量排序 - 查询结果已排序的情况下可加速数据排序
    - 配置 [enable_incrementalsort](https://www.postgresql.org/docs/13/runtime-config-query.html#GUC-ENABLE-INCREMENTALSORT)
  - 大数据 HASH 聚合可使用磁盘存储
    - 之前如果 HASH 聚合超过 `work_mem` 则不会选择 HASH 聚合
    - 配置 [enable_hashagg_disk](https://www.postgresql.org/docs/13/runtime-config-query.html#GUC-ENABLE-HASHAGG-DISK)
  - grouping sets 可使用 hash 聚合 - 如果启用了 enable_hashagg_disk
  - insert 可触发 autovacuum
  - TOAST 支持请求部分解压 - 之前是全量
- 工具命令
  - `VACUUM PARALLEL` - vacuum 并行
  - 支持 `FETCH FIRST WITH TIES` 语法 - 如果最后一行是一样的则继续返回
    - [demo](https://www.db-fiddle.com/f/dMTYXbeacpQ53itrxR6iaR/0)
  - `EXPLAIN` 返回计划时的 `BUFFER` 使用情况
    - `explain (analyze, buffers) select * from test;` [demo](https://www.db-fiddle.com/f/585uC9XZ73MXLzofH8HXrn/0)
  - `ALTER TABLE DROP EXPRESSION` 移除列上的生成属性
  - `ALTER VIEW RENAME COLUMN` - 之前只能 `ALTER TABLE RENAME COLUMN`
  - `DROP DATABASE WITH FORCE` - 强制断开用户使删除库成功
- 数据类型
  - 多态数据类型 - [anycompatible](https://www.postgresql.org/docs/13/datatype-pseudo.html#DATATYPE-PSEUDOTYPES-TABLE)
  - `xid8` - FullTransactionId
  - `ROW` 支持后缀访问成员 `(ROW(4, 5.0)).f1`
- 函数
  - `jsonb_setI()` - 对 NULL 做特殊处理
  - jsonpath `.datetime()` 将 JSON 值转换为 SQL 时间戳类型
  - `NORMALIZE()`, `IS NORMALIZED` - 范化和检查 Uicode 字符串是否范化
  - Unicode 转义 - `E'\u####'`, `U&'\####'`
  - `to_date()` `to_timestamp()` 支持非英文的 月、日 名字
  - 内建 `gen_random_uuid()` 生成 UUIDv4
    - 不需要安装扩展
  - 添加 gcd 和 lcm 来计算最大公约数和最小公倍数
  - `min_scale()` `trim_scale()` 处理浮点数
- 服务端应用
  - `pg_verifybackup` - 验证备份
  - `pg_dump --include-foreign-data` - 导出外部数据
  - `vacuumdb --parallel` - 并行 vacuum
  - `reindexdb --jobs` - 并行重新索引
- 额外模块
  - 可信扩展 - 指定允许普通用户安装的扩展
    - 之前只有 superuser 能安装
  - 允许非特权用户不带密码连接 `postgres_fdw`
    - 通过 `alter user mapping xxx set password_required false` 禁用
- [PostgreSQL 13 Release Notes](https://www.postgresql.org/docs/13/release-13.html)
- [Deduplication for B-tree](https://www.cybertec-postgresql.com/en/b-tree-index-deduplication/)
- [Reindexing all tables after upgrading to PostgreSQL 13](https://adamj.eu/tech/2021/04/13/reindexing-all-tables-after-upgrading-to-postgresql-13/)

## PostgreSQL 12

- [Release 12](https://www.postgresql.org/docs/12/release-12.html)
  - SQL/JSON path
  - 生成列
  - JIT 默认开启
  - 索引占用磁盘空间减少
- 分片
  - 外键引用可以指向分片表
  - 创建分片表可以使用表达式 - 之前是常量值，但表达式是在创建时进行计算
- 索引
  - btree 使用的空间减少
  - [Bottom-up Index Deletion](https://www.postgresql.org/docs/14/btree-implementation.html)
    - 减少写放大问题
- 优化起
  - 支持多列 常见值(most-common-value MVC) 统计
    - 对于大数据来说很有价值
  - CTE 可以被引擎重写 - 以前 CTE 是优化的边界
- 性能
  - JIT 默认启用
- 监控
  - 可以采样事务执行日志 - log_transaction_sample_rate
  - 执行进度报告
    - `CREATE INDEX`, `REINDEX` - pg_stat_progress_create_index
    - `CLUSTER`, `VACUUM FULL` - pg_stat_progress_cluster
- 鉴权
  - GSSAPI 支持加密
  - LDAP 支持通过 DNS SRV 发现
- 其他模块
  - ORDER BY 和 LIMIT 可以被下推到 postgres_fdw
- 工具命令
  - `REINDEX CONCURRENTLY` 并行重新索引
  - 支持 [生成列](https://www.postgresql.org/docs/12/ddl-generated-columns.html)
    - 不能被插入或更新
    - 可以被指定为 DEFAULT
    - 不能作为 key
    - 本质上相当于 before update 的 trigger，会在自定义 trigger 之后执行，trigger 里不能访问生成列
  - `COPY FROM` 支持 `WHERE`
  - 添加 `COMMIT AND CHAIN`, `ROLLBACK AND CHAIN`
    - 完成事务马上又开启
  - `VACUUM` 和 `ANALYZE` 支持 `SKIP_LOCK` - 忽略不能马上锁定的表
  - `CREATE AGGREGATE` 支持 `OR RELACE`
- 函数
  - 支持 [SQL/JSON path](https://www.postgresql.org/docs/12/functions-json.html#FUNCTIONS-SQLJSON-PATH)
    - 对经常使用 JSON 来说是非常重要的特性
  - 添加 [统计相关的聚合函数](https://www.postgresql.org/docs/12/functions-aggregate.html#FUNCTIONS-AGGREGATE-STATISTICS-TABLE)
    - 对于分析场景来说很有用
- [PostgreSQL 12 Released!](https://www.postgresql.org/about/news/1976/)

```sql
-- 生成列
create table test(
  id serial,
  name text,
  name_upper text generated always as upper(name) stored
);
```

## PostgreSQL 11

- 分片
  - 支持使用 hash 键分片
  - UPDATE 更新分片键时可以将数据更新到正确的分片
  - SELECT 性能提升
  - 对于分片表支持 PRIMARY KEY, FOREIGN KEY, 索引和触发器
- 并行
  - 并行 hash join
  - 并行 CREATE INDEX 创建 B-tree 索引
  - 并行 CREATE TABLE .. AS, CREATE MATERIALIZED VIEW 和一些 UNION 操作
- SQL 存储过程
  - 支持内嵌事务
  - 使用 CALL 执行, CREATE/DROP/ALTER PROCEDURE
  - 也可以使用 DROP/ALTER ROUTINE 删除和修改, 也可以操作函数和聚合
  - 现在的存储函数是在事务内执行
  - 事务的操作只能在顶层存储过程
  - https://www.postgresql.org/docs/11/static/xproc.html
- 部分 SQL JIT
- 窗口函数支持所有 SQL:2011 标准, 包括 RANGE distance PRECEDING/FOLLOWING, GROUPS mode, and frame exclusion options
- 之前 ALTER TABLE .. ADD COLUMN 并且 DEFAULT 为 non-null 时会重写整个表, 现在大部分情况下都不会, 这类操作会相当快
- 支持使用 quit 和 exit 退出
- [POSTGRESQL 11 BETA 1 RELEASED!](https://www.postgresql.org/about/news/1855/)
  - [HN](https://news.ycombinator.com/item?id=17144221)
- [PostgreSQL 11 Release Notes](https://www.postgresql.org/docs/11/static/release-11.html)

## PostgreSQL 10

- [New in postgres 10](https://wiki.postgresql.org/wiki/New_in_postgres_10)
- [PostgreSQL 10 New Features With Examples](http://h50146.www5.hpe.com/products/software/oe/linux/mainstream/support/lcc/pdf/PostgreSQL_10_New_Features_en_20170522-1.pdf)

- https://blog.2ndquadrant.com/postgresql-10-identity-columns/
- The identity property is not inherited. For a serial column, the default expression is inherited but the sequence ownership is not (similar to the LIKE case).

```sql
-- 之前
-- serial 不会被语句重现
-- 会有序列归属问题
CREATE TABLE test_old (
    id serial PRIMARY KEY,
    payload text
);

INSERT INTO test_old (payload) VALUES ('a'), ('b'), ('c') RETURNING *;

-- 之后
-- 符合 SQL 标准, 兼容 DB2, Oracle
-- 语句重现
CREATE TABLE test_new (
    id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    payload text
);

INSERT INTO test_new (payload) VALUES ('a'), ('b'), ('c') RETURNING *;
```

## 9.x
