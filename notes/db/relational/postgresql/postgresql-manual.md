# PostgreSQL Manual

## Tips

* 注意:
  * 扩展默认是创建在的 public, 其他如果需要使用, 可以添加 public 到 search_path
  * 在创建视图时, `SELECT *` 会被展开
  * 分配表的锁会被统一占用, 不会因为不在分片区间内就只占用一个分片的锁
  * 方法中执行语句时不能使用参数, 需要 EXECUTE 执行动态拼接的语句才行

```sql
-- DESCRIBE TABLE
\d+ tablename

SELECT
  column_name,
  data_type,
  character_maximum_length
FROM INFORMATION_SCHEMA.COLUMNS
WHERE table_name = '<tablename>';

```

## Concept
* TABLESPACE

## Window Function
Window Functions
https://www.postgresql.org/docs/current/static/functions-window.html

Window Functions Tutorial
https://www.postgresql.org/docs/current/static/tutorial-window.html

4.2.8. Window Function Calls
https://www.postgresql.org/docs/devel/static/sql-expressions.html#SYNTAX-WINDOW-FUNCTIONS


```
function_name ([expression [, expression ... ]]) [ FILTER ( WHERE filter_clause ) ] OVER window_name
function_name ([expression [, expression ... ]]) [ FILTER ( WHERE filter_clause ) ] OVER ( window_definition )
function_name ( * ) [ FILTER ( WHERE filter_clause ) ] OVER window_name
function_name ( * ) [ FILTER ( WHERE filter_clause ) ] OVER ( window_definition )

window_definition:
  [ existing_window_name ]
  [ PARTITION BY expression [, ...] ]
  [ ORDER BY expression [ ASC | DESC | USING operator ] [ NULLS { FIRST | LAST } ] [, ...] ]
  [ frame_clause ]

frame_clause:
  { RANGE | ROWS } frame_start
  { RANGE | ROWS } BETWEEN frame_start AND frame_end

frame_start/frame_end:
  UNBOUNDED PRECEDING
  value PRECEDING
  CURRENT ROW
  value FOLLOWING
  UNBOUNDED FOLLOWING
```

## Inheritance
* [3.6. Inheritance](https://www.postgresql.org/docs/current/static/tutorial-inheritance.html)
* [5.9. Inheritance](https://www.postgresql.org/docs/current/static/ddl-inherit.html)
* [When to use inherited tables in PostgreSQL?](https://stackoverflow.com/a/3075248/1870054)
  * 比较老的问题, 主要说是数据分片问题

* 查询主表会返回所有子表数据
* 一个表可以继承多个表
* 主表和字表数据之间没有关联
* 限制
  * 索引, 外键, 限制等都只对单个表生效

## Date/Time
9.9 Date/Time Functions and Operators
https://www.postgresql.org/docs/current/static/functions-datetime.html

## 8 Data Types
### JSON

### Array
8.15. Arrays
https://www.postgresql.org/docs/current/static/arrays.html

### String
https://www.postgresql.org/docs/current/static/functions-matching.html

* POSIX 正则
  * `~` 大小写敏感
  * `~*` 大小写不敏感
  * `!~` 不匹配
  * `!~*` 不匹配大小写不敏感

### UUID
* https://tomharrisonjr.com/uuid-or-guid-as-primary-keys-be-careful-7b2aa3dcb439
* http://www.starkandwayne.com/blog/uuid-primary-keys-in-postgresql/
* [8.12. UUID Type](https://www.postgresql.org/docs/current/static/datatype-uuid.html)
* [F.45. uuid-ossp](https://www.postgresql.org/docs/current/static/uuid-ossp.html)
* [F.26. pgcrypto](https://www.postgresql.org/docs/current/static/pgcrypto.html)

### Network
* cidr
* 62.2. Built-in Operator Classes
 https://www.postgresql.org/docs/current/static/gist-builtin-opclasses.html

 inet_ops	inet, cidr	&& >> >>= > >= <> << <<= < <= =


## TOAST
66. Database Physical Storage
66.2. TOAST
https://www.postgresql.org/docs/current/static/storage-toast.html

https://wiki.postgresql.org/wiki/TOAST

TOAST (The Oversized-Attribute Storage Technique).
* TOAST_MAX_CHUNK_SIZE 大约 2k, 1/4 page
* TOAST_TUPLE_THRESHOLD 使用 TOAST 的阀值, 一般 2k
* TOAST_TUPLE_TARGET 压缩后目标大小
* 存储类型
  8 PLAIN 默认, 避免压缩和 OutOfLine
    * EXTENDED

## Index

```sql
CREATE [ UNIQUE ] INDEX [ CONCURRENTLY ] [ [ IF NOT EXISTS ] name ] ON table_name [ USING method ]
    ( { column_name | ( expression ) } [ COLLATE collation ] [ opclass ] [ ASC | DESC ] [ NULLS { FIRST | LAST } ] [, ...] )
    [ WITH ( storage_parameter = value [, ... ] ) ]
    [ TABLESPACE tablespace_name ]
    [ WHERE predicate ]
```

* CONCURRENTLY
  * 不占用 写 锁, 允许表 插入, 更新, 删除操作
  * 注意事项 https://www.postgresql.org/docs/current/static/sql-createindex.html#SQL-CREATEINDEX-CONCURRENTLY

* 11.[Indexes](https://www.postgresql.org/docs/current/static/indexes.html)
* 11.3.[Multicolumn Indexes](https://www.postgresql.org/docs/current/static/indexes-multicolumn.html)
  * B-tree, GiST, GIN, BRIN 支持多列索引
  * 最多 32 列 (pg_config_manual.h)
  * B-tree
    * 对左侧使用相等判断, 对右侧使用非相等判断时性能最好
  * GiST
    * 查询索引列的任意子集
    * 最左侧的列条件最重要, 决定了会扫描多少索引
    * 当第一列索引只有几个不同值时性能不高
  * GIN
    * 查询索引列的任意子集
    * 索引搜索性能不受列和条件的影响
  * BRIN
    * 查询索引列的任意子集
    * 索引搜索性能不受列和条件的影响
    * 使用不同 pages_per_range 是选择 多个BRIN 索引而不是一个 多列BRIN 索引的原因


* 11.5.[Combining Multiple Indexes](https://www.postgresql.org/docs/current/static/indexes-bitmap-scans.html)


11.2. Index Types
https://www.postgresql.org/docs/current/static/indexes-types.html
B-tree, Hash, GiST, SP-GiST, GIN and BRIN

https://hashrocket.com/blog/posts/exploring-postgres-gin-index

Index Maintenance
https://wiki.postgresql.org/wiki/Index_Maintenance

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX users_search_idx ON users USING gin (first_name gin_trgm_ops, last_name gin_trgm_ops);
```

https://www.postgresql.org/docs/current/static/sql-createindex.html

## VIEW

https://www.postgresql.org/docs/current/static/sql-creatematerializedview.html

## MATERIALIZED VIEW

```
CREATE MATERIALIZED VIEW [ IF NOT EXISTS ] table_name
    [ (column_name [, ...] ) ]
    [ WITH ( storage_parameter [= value] [, ... ] ) ]
    [ TABLESPACE tablespace_name ]
    AS query
    [ WITH [ NO ] DATA ]
```

* 可以创建索引
* 不能插入
* 会存储数据
* 适用于报表


## Table Partitioning
5.10. Table Partitioning https://www.postgresql.org/docs/current/static/ddl-partitioning.html

* unique constraints are not supported on partitioned tables

* 限制
  * 不能自动对所有分片创建索引
    * 索引需要在每个分片上进行创建
    * 因此也不能添加主键唯一性限制
  * 不支持主键, 因此也不支持外键引用或约束
  * 不能使用 `ON CONFLICT`
  * 如果 `UPDATE` 会导致分片切换, 该操作会失败
  * 触发器只能在分片上定义

  
## Cursor
* 42.7.[Cursors](https://www.postgresql.org/docs/current/static/plpgsql-cursors.html)
* [FETCH](https://www.postgresql.org/docs/current/static/sql-fetch.html)
* 8.16.[Composite Types](https://www.postgresql.org/docs/current/static/rowtypes.html)
https://github.com/postgres/postgres/blob/REL_10_1/src/backend/utils/adt/rowtypes.c


## Parallel
15. Parallel Query
https://www.postgresql.org/docs/current/static/parallel-query.html

47. Background Worker Processes
https://www.postgresql.org/docs/current/static/bgworker.html

https://yq.aliyun.com/articles/59180

* https://www.postgresql.org/docs/current/static/runtime-config-resource.html#GUC-MAX-WORKER-PROCESSES


```sql
-- 并行相关的参数
SELECT * FROM pg_settings WHERE name like '%work%';
```

## 37. Extending SQL
https://www.postgresql.org/docs/current/static/extend.html
### User-defined Functions
37.3. User-defined Functions
https://www.postgresql.org/docs/current/static/xfunc.html


```sql

CREATE FUNCTION clean_emp() RETURNS void AS $$
    DELETE FROM emp
        WHERE salary < 0;
$$ LANGUAGE SQL;


CREATE FUNCTION add_one(integer) RETURNS integer
     AS 'DIRECTORY/funcs', 'add_one'
     LANGUAGE C STRICT;
-- note overloading of SQL function name "add_one"
CREATE FUNCTION add_one(double precision) RETURNS double precision
     AS 'DIRECTORY/funcs', 'add_one_float8'
     LANGUAGE C STRICT;

CREATE FUNCTION makepoint(point, point) RETURNS point
     AS 'DIRECTORY/funcs', 'makepoint'
     LANGUAGE C STRICT;

CREATE FUNCTION copytext(text) RETURNS text
     AS 'DIRECTORY/funcs', 'copytext'
     LANGUAGE C STRICT;

CREATE FUNCTION concat_text(text, text) RETURNS text
     AS 'DIRECTORY/funcs', 'concat_text'
     LANGUAGE C STRICT;
```

## Extension

## Explain

https://explain.depesz.com/

## 配置
https://www.postgresql.org/docs/current/static/runtime-config.html
https://www.postgresql.org/docs/current/static/runtime-config-resource.html

```ini


# ========================
# 内存
# ========================

#
# 25% RAM
# Larger settings for shared_buffers usually require a corresponding increase in max_wal_size, in order to spread out the process of writing large quantities of new or changed data over a longer period of time.
shared_buffers=128MB

# amount of memory to be used by internal sort operations and hash tables before writing to temporary disk files
work_mem=4MB
# Specifies the maximum amount of memory to be used by maintenance operations, such as VACUUM, CREATE INDEX, and ALTER TABLE ADD FOREIGN KEY
# when autovacuum runs, up to autovacuum_max_workers times this memory may be allocated, so be careful not to set the default value too high. It may be useful to control for this by separately setting autovacuum_work_mem.
maintenance_work_mem=64MB

# ========================
# 磁盘
# ========================

# ========================
# 内核资源
# ========================
# maximum number of simultaneously open files allowed to each server subprocess
max_files_per_process=1000

# ========================
# Cost-based Vacuum Delay
# ========================

# ========================
# Background Writer
# ========================

# ========================
# 异步
# ========================

# 控制整个系统的 worker 进程数
# 如果有standby，standby的参数必须大于等于主库的参数值
max_worker_processes=8

# 每个 Gather 或 Gather Merge 节点启动的最大 worker
# 每个 worker 资源占用是独立的, 因此要注意设置适当的 work_mem
max_parallel_workers_per_gather=2

# 并行最大的 worker 数
max_parallel_workers=8

# ========================
# WAL
# ========================

# 决定写入多少内容到 WAL, 可选值 replica,minimal,logical
# minimal 不能从基础备份中重构数据
# logical 在 replica 之上添加逻辑复制需要的信息
wal_level=replica

# The amount of shared memory used for WAL data that has not yet been written to disk. 
# -1 -> 1/32 * shared_buffers, 大约3%
wal_buffers=-1
```

* parallel_setup_cost
  * 计算并行计算的成本，优化器根据CBO原则选择是否开启并行 
* parallel_tuple_cost
  * woker进程处理完后的tuple要传输给上层node，即进程间的row交换成本，按node评估的输出rows来乘。
* force_parallel_mode
  * 是否强制开启并行, 建议测试使用
* max_parallel_workers_per_gather
  * 每个 Gather 最多允许启用多少个 worker
  * OLTP业务系统中, 不要设置太大, 因为每个worker都会消耗同等的 work_mem 等资源, 争抢会比较厉害。
* max_parallel_workers_per_gather
* max_parallel_workers
