---
id: version
title: 版本历史
---

# Version
* [发布历史](https://en.wikipedia.org/wiki/PostgreSQL#Release_history)
  * 现在一般每年 Q4 发布新版本，最近大多为 10 月

## 13
* [PostgreSQL 13 Release Notes](https://www.postgresql.org/docs/13/release-13.html)
* 索引
  * B Tree 索引优化对重复数据的处理，减少索引大小
* 性能
  * 增量排序 - 查询结果已排序的情况下可加速数据排序
    * 配置 [enable_incrementalsort](https://www.postgresql.org/docs/13/runtime-config-query.html#GUC-ENABLE-INCREMENTALSORT)
  * 大数据 HASH 聚合可使用磁盘存储
    * 之前如果 HASH 聚合超过 `work_mem` 则不会选择 HASH 聚合
    * 配置 [enable_hashagg_disk](https://www.postgresql.org/docs/13/runtime-config-query.html#GUC-ENABLE-HASHAGG-DISK)
  * grouping sets 可使用 hash 聚合 - 如果启用了 enable_hashagg_disk
  * insert 可触发 autovacuum
  * TOAST 支持请求部分解压 - 之前是全量
* 工具命令
  * `VACUUM PARALLEL` - vacuum 并行
  * 支持 `FETCH FIRST WITH TIES` 语法 - 如果最后一行是一样的则继续返回
    * [demo](https://www.db-fiddle.com/f/dMTYXbeacpQ53itrxR6iaR/0)
  * `EXPLAIN` 返回计划时的 `BUFFER` 使用情况
    * `explain (analyze, buffers) select * from test;` [demo](https://www.db-fiddle.com/f/585uC9XZ73MXLzofH8HXrn/0)
  * `ALTER TABLE DROP EXPRESSION` 移除列上的生成属性
  * `ALTER VIEW RENAME COLUMN` - 之前只能 `ALTER TABLE RENAME COLUMN`
  * `DROP DATABASE WITH FORCE` - 强制断开用户使删除库成功
* 数据类型
  * 多态数据类型 - [anycompatible](https://www.postgresql.org/docs/13/datatype-pseudo.html#DATATYPE-PSEUDOTYPES-TABLE)
  * `xid8` - FullTransactionId
  * `ROW` 支持后缀访问成员 `(ROW(4, 5.0)).f1`
* 函数
  * `jsonb_setI()` - 对 NULL 做特殊处理
  * jsonpath `.datetime()` 将 JSON 值转换为 SQL 时间戳类型
  * `NORMALIZE()`, `IS NORMALIZED` - 范化和检查 Uicode 字符串是否范化
  * Unicode 转义 - `E'\u####'`, `U&'\####'`
  * `to_date()` `to_timestamp()` 支持非英文的 月、日 名字
  * 内建 `gen_random_uuid()` 生成 UUIDv4
    * 不需要安装扩展
  * 添加 gcd 和 lcm 来计算最大公约数和最小公倍数
  * `min_scale()` `trim_scale()` 处理浮点数
* 服务端应用
  * `pg_verifybackup` - 验证备份
  * `pg_dump --include-foreign-data` - 导出外部数据
  * `vacuumdb --parallel` - 并行 vacuum
  * `reindexdb --jobs` - 并行重新索引
* 额外模块
  * 可信扩展 - 指定允许普通用户安装的扩展
    * 之前只有 superuser 能安装
  * 允许非特权用户不带密码连接 `postgres_fdw`
    * 通过 `alter user mapping xxx set password_required false` 禁用

## 12
* [PostgreSQL 12 Released!](https://www.postgresql.org/about/news/1976/)
* [Release 12](https://www.postgresql.org/docs/12/release-12.html)
  * SQL/JSON path
  * 生成列
  * JIT 默认开启
  * 索引占用磁盘空间减少
* 分片
  * 外键引用可以指向分片表
  * 创建分片表可以使用表达式 - 之前是常量值，但表达式是在创建时进行计算
* 索引
  * btree 使用的空间减少
* 优化起
  * 支持多列 常见值(most-common-value MVC) 统计
    * 对于大数据来说很有价值
  * CTE 可以被引擎重写 - 以前 CTE 是优化的边界
* 性能
  * JIT 默认启用
* 监控
  * 可以采样事务执行日志 - log_transaction_sample_rate
  * 执行进度报告
    * `CREATE INDEX`, `REINDEX` - pg_stat_progress_create_index
    * `CLUSTER`, `VACUUM FULL` - pg_stat_progress_cluster
* 鉴权
  * GSSAPI 支持加密
  * LDAP 支持通过 DNS SRV 发现
* 其他模块
  * ORDER BY 和 LIMIT 可以被下推到 postgres_fdw
* 工具命令
  * `REINDEX CONCURRENTLY` 并行重新索引
  * 支持 [生成列](https://www.postgresql.org/docs/12/ddl-generated-columns.html)
    * 不能被插入或更新
    * 可以被指定为 DEFAULT
    * 不能作为 key
    * 本质上相当于 before update 的 trigger，会在自定义 trigger 之后执行，trigger 里不能访问生成列
  * `COPY FROM` 支持 `WHERE`
  * 添加 `COMMIT AND CHAIN`, `ROLLBACK AND CHAIN`
    * 完成事务马上又开启
  * `VACUUM` 和 `ANALYZE` 支持 `SKIP_LOCK` - 忽略不能马上锁定的表
  * `CREATE AGGREGATE` 支持 `OR RELACE`
* 函数
  * 支持 [SQL/JSON path](https://www.postgresql.org/docs/12/functions-json.html#FUNCTIONS-SQLJSON-PATH)
    * 对经常使用 JSON 来说是非常重要的特性
  * 添加 [统计相关的聚合函数](https://www.postgresql.org/docs/12/functions-aggregate.html#FUNCTIONS-AGGREGATE-STATISTICS-TABLE)
    * 对于分析场景来说很有用

```sql
-- 生成列
create table test(
  id serial,
  name text,
  name_upper text generated always as upper(name) stored
);
```

## 11
* [POSTGRESQL 11 BETA 1 RELEASED!](https://www.postgresql.org/about/news/1855/)
  * [HN](https://news.ycombinator.com/item?id=17144221)
* [Appendix E. Release Notes](https://www.postgresql.org/docs/11/static/release-11.html)
  * 分片
    * 支持使用 hash 键分片
    * UPDATE 更新分片键时可以将数据更新到正确的分片
    * SELECT 性能提升
    * 对于分片表支持 PRIMARY KEY, FOREIGN KEY, 索引和触发器
  * 并行
    * 并行 hash join
    * 并行 CREATE INDEX 创建 B-tree 索引
    * 并行 CREATE TABLE .. AS, CREATE MATERIALIZED VIEW 和一些 UNION 操作
  * SQL 存储过程
    * 支持内嵌事务
    * 使用 CALL 执行, CREATE/DROP/ALTER PROCEDURE
    * 也可以使用 DROP/ALTER ROUTINE 删除和修改, 也可以操作函数和聚合
    * 现在的存储函数是在事务内执行
    * 事务的操作只能在顶层存储过程
    * https://www.postgresql.org/docs/11/static/xproc.html
  * 部分 SQL JIT
  * 窗口函数支持所有 SQL:2011 标准, 包括 RANGE distance PRECEDING/FOLLOWING, GROUPS mode, and frame exclusion options
  * 之前 ALTER TABLE .. ADD COLUMN 并且 DEFAULT 为 non-null 时会重写整个表, 现在大部分情况下都不会, 这类操作会相当快
  * 支持使用 quit 和 exit 退出

## 10
* [New in postgres 10](https://wiki.postgresql.org/wiki/New_in_postgres_10)
* [PostgreSQL 10 New Features With Examples](http://h50146.www5.hpe.com/products/software/oe/linux/mainstream/support/lcc/pdf/PostgreSQL_10_New_Features_en_20170522-1.pdf)

* https://blog.2ndquadrant.com/postgresql-10-identity-columns/
* The identity property is not inherited. For a serial column, the default expression is inherited but the sequence ownership is not (similar to the LIKE case).
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

