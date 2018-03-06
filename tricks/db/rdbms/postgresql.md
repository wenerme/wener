# PostgresSQL

## Tips
* [Manual](https://www.postgresql.org/docs/manuals/)
* Current [Document](https://www.postgresql.org/docs/current/static/index.html)
* [Postgrest](https://github.com/begriffs/postgrest)
  * REST API for any Postgres database
* [pRest](https://github.com/prest/prest)
  * Golang
* [Awesome PostgreSQL](https://github.com/dhamaniasad/awesome-postgres)
* [Trees In The Database](http://www.slideshare.net/quipo/trees-in-the-database-advanced-data-structures/)
* 知乎 [MySQL vs Postgres](https://www.zhihu.com/question/20010554)
* 默认端口: 5432
* PG 所带的 bin [列表](https://pkgs.alpinelinux.org/contents?file=&path=*bin*&name=postgresql&branch=edge&repo=main&arch=x86_64)
  * pgbench
  * pg_resetxlog
  * pg_controldata
  * pg_test_fsync
  * pg_upgrade
  * pg_test_timing
  * pg_xlogdump
  * pg_rewind
  * initdb
  * pg_ctl
  * postgres
  * postmaster
  * pg_archivecleanup
* 其他工具
  * [pgtune](http://pgfoundry.org/projects/pgtune)
    * Tuning wizard for postgresql.conf
    * http://pgtune.leopard.in.ua/
    * https://www.pgconfig.org
  * [pg_top](http://ptop.projects.postgresql.org/)
    * Monitor PostgreSQL processes
  * [pgbadger](https://github.com/dalibo/pgbadger/)
    * 日志分析
  * [pgcli](https://www.pgcli.com/)
    * [dbcli/pgcli](https://github.com/dbcli/pgcli)
    * 带高亮和自动补全的命令行
  * [pgloader](http://pgloader.io)
    * [dimitri/pgloader](https://github.com/dimitri/pgloader)
    * Migrate to PostgreSQL in a single command
    * 支持 csv,fixed,db3,ixf,sqlite,mysql,mssql
  * [pgformatter](https://sqlformat.darold.net/)
    * PostgreSQL syntax beautifier
  * [pgpool-ii](https://www.pgpool.net)
    * Connection Pooling
    * Replication
    * Load Balancing
    * Limiting Exceeding Connections
  * [pgrouting](http://www.pgrouting.org)
    * Provides geospatial routing for PostGIS/PostgreSQL database
  * [pgroonga](https://pgroonga.github.io/)
    * [pgroonga/pgroonga](https://github.com/pgroonga/pgroonga)
    * PostgreSQL extension to use Groonga as the index.
  * https://github.com/wal-e/wal-e
  * [pgsync](https://github.com/ankane/pgsync)
    * Sync Postgres data between databases
* 资源
  * [dhamaniasad/awesome-postgres](https://github.com/dhamaniasad/awesome-postgres)
* 数据结构
  * Database / Schema / table
* 数据迁移
  * https://wiki.postgresql.org/wiki/Converting_from_other_Databases_to_PostgreSQL
* 参考
  * [Why PostgreSQL doesn't have query hints](https://it.toolbox.com/blogs/josh-berkus/why-postgresql-doesnt-have-query-hints-020411)
    * [HN](https://news.ycombinator.com/item?id=2179433)
  * [A PostgreSQL Response to Uber](http://thebuild.com/presentations/uber-perconalive-2017.pdf)
    * Write Amplification
      * PostgreSQL must update every index if a change to the row updates an index.
      * PostgreSQL keeps each version of the tuple on disk until it is vacuumed.
      * Each page changed here must be pushed down the binary replication link.
    * Replication
      * PostgreSQL does not have logical replication in core. (Coming in 10!)
      * Existing logical replication tools (Slony, Bucardo, etc.) are somewhat fiddly to set up and manage.
    * Replica MVCC
      * Incoming streaming replication activity can be blocked by queries, or queries can be cancelled.
      * Naïve users can be surprised by query cancellation messages.
    * Upgrade
      * PostgreSQL does not have in-place major version upgrade.
      * You have to do some kind of process to get low-downtime upgrades.
      * pg_upgrade, while a big improvement, is not a panacea.
        * PostGIS, for example, is a huge pain.
    * Buffer Pool
      * PostgreSQL’s shared buffer management performance peaks at 8-32GB.
        * [citation required]
      * Larger shared_buffers than that (usually) mean diminishing returns.
      * Retrieving things from file system cache is slower than from shared buffers.
    * Connection Management
      * The PostgreSQL forking model is not efficient for lots of connections, or fast connection cycling.
      * While basic RAM statistics can be misleading, each backend does consume a notable amount of memory.

```bash
# POSTGRES_USER=postgres
# POSTGRES_PASSWORD
# PGDATA=/var/lib/postgresql/data
# 可以用任意 --user 启动
docker run -it --rm -v $PWD/pg:/var/lib/postgresql/data postgres:alpine


# 设置数据目录, 免得后面再指定
export PGDATA=$HOME/data/pg/data
# 查看配置, -W 可要求提示输入密码
initdb -kU postgres -s
# 生成数据库
initdb -kU postgres
# 启动数据库
pg_ctl -D $PGDATA -l $HOME/data/pg/logfile start
pg_ctl -D $PGDATA -l $PGDATA/pg.log start
# 查看运行状态
pg_ctl -D $PGDATA status 
```

```sql


-- 查看当前版本
select version();

-- 将字符串风格为字符数组
select regexp_split_to_array('abc','');
```

## Notes

### 备份

* https://www.postgresql.org/docs/current/static/app-psql.html
* https://wiki.postgresql.org/wiki/Incremental_backup
* https://www.postgresql.org/docs/current/static/continuous-archiving.html
* https://www.postgresql.org/docs/current/static/app-pgdump.html

```bash
# 转储单个库
pg_dump dbname > outfile
psql dbname < infile

# -j 8 并发数
# -F d 目录格式, 并发要求使用目录
# -t 指定表
# -O --no-owner
# -f backup 文件/目录名
pg_dump -F d -f backup -j 8 db -t a -t b -O

# 使用压缩
pg_dump dbname | gzip > filename.gz
gunzip -c filename.gz | psql dbname

# 使用自定义格式, 必须要使用 pg_restore 恢复
pg_dump -Fc dbname > filename
pg_restore -d dbname filename

# 转储所有
pg_dumpall > outfile
psql -f infile postgres
```

```sql
-- 导入 CSV

-- COPY
-- https://www.postgresql.org/docs/current/static/sql-copy.html
-- COPY table_name [ ( column_name [, ...] ) ] FROM { 'filename' | PROGRAM 'command' | STDIN } [ [ WITH ] ( option [, ...] ) ]
-- COPY { table_name [ ( column_name [, ...] ) ] | ( query ) } TO { 'filename' | PROGRAM 'command' | STDOUT } [ [ WITH ] ( option [, ...] ) ]
-- 需要管理员权限
-- 支持 text,binary,csv
-- Windows users might need to use an E'' string and double any backslashes used in the path name.
-- 要求文件在服务器上
COPY phonebook (id,name, phone) FROM '/tmp/phonebook.csv' DELIMITER ',' CSV;
-- 带头导出
COPY phonebook TO '/tmp/data.csv' DELIMITER ',' CSV HEADER;

-- \copy
-- https://www.postgresql.org/docs/current/static/app-psql.html#APP-PSQL-META-COMMANDS-COPY
-- \copy { table [ ( column_list ) ] | ( query ) } { from | to } { 'filename' | program 'command' | stdin | stdout | pstdin | pstdout } [ [ with ] ( option [, ...] ) ]
-- 从客户端进行导入
-- 可以使用相对路径, 会先将文件上传到服务器
\copy out_tmp (id,name) from 'out.csv' DELIMITER ',' CSV;
-- 导出
\copy my_table to 'filename' csv header
\copy (select id,name from out_tmp) to 'exp.csv' DELIMITER ',' CSV;
-- 带头
\copy (select id,name from out_tmp) to 'exp.csv' DELIMITER ',' CSV HEADER;

```

### optimize
* http://www.revsys.com/writings/postgresql-performance.html
* https://wiki.postgresql.org/wiki/Performance_Optimization
* https://www.datadoghq.com/blog/100x-faster-postgres-performance-by-changing-1-line/
* https://www.postgresql.org/docs/current/static/parallel-query.html
* [Optimize and Improve PostgreSQL Performance with VACUUM, ANALYZE, and REINDEX](https://confluence.atlassian.com/kb/optimize-and-improve-postgresql-performance-with-vacuum-analyze-and-reindex-885239781.html)
* [Really Big Elephants: PostgreSQL DW](https://www.slideshare.net/PGExperts/really-big-elephants-postgresql-dw-15833438)
  * DW-datawarehouse
    * BI/DW
    * 分析数据库
    * OLAP
    * 数据挖掘
    * 决策支持
  * JOIN 优化
    * 5 JOIN 类型
    * 可进行 20+ 的表 JOIN
  * 在任何语句中都可执行子查询
    * 嵌套子查询
  * Window 查询
  * 递归查询
* PG 的 MVCC 实现使得更新操作非常昂贵. 如果需要更新表里的每一行, 那每一行都会拷贝为一个新的版本, 旧的版本会标记为已删除.
  * 因此一般来说重写整个表会比更新来的更快
* `DROP COLUMN` 不会做物理删除, 而是将列标记为不可见, 因此操作会非常快

```sql
-- 这个操作会非常慢
update a set name = b.name from b where a.id = b.id;
-- 这个操作会比整个更新快
create table c as (select a.age, b.name from a left join b on a.id = b.id);

-- 所以整表更新建议
begin;
create table T as select col1, col2, colN from orders;
drop table orders;
alter table T rename to orders;
commit;

-- 置空一列
-- 数据大了后该操作非常慢
UPDATE orders SET status = null;
-- 因此可以考虑这样
ALTER TABLE orders DROP column status
                 , ADD  column status text;


```

### Install
* https://pkgs.alpinelinux.org/package/v3.7/main/x86_64/postgresql
* https://pkgs.alpinelinux.org/package/edge/testing/x86_64/postgis
* https://hub.docker.com/_/postgres/
  * https://github.com/docker-library/postgres/blob/1805adb0693d9602bfb19b6bf2583b311c43b749/10/alpine/Dockerfile


### 数据类型
* https://www.postgresql.org/docs/10/static/datatype.html
* 数组
  * 可以使用 GIN 索引
    * https://www.postgresql.org/docs/current/static/indexes-types.html
  * 操作需要使用数组操作符

#### JSON
* 支持 hstore, json 和 jsonb 类型
  * 大部分时候选择 JSONB
  * 如果只写入或者要求快速写入, 很少查询可以选择 JSON
* https://www.postgresql.org/docs/current/static/datatype-json.html
* json 文本, 操作更耗时, 每次需要解析, 会保存重复键值, 以最后一次为准
* josnb 二进制, 一般磁盘空间更大, 写入更耗时, 支持索引
* 操作符
  * `->`  取字段, 可以是数组索引
  * `->>` 返回的值始终为 text, 不会有引号
  * `#>`  指定多个路径, 获取为 text
    * `SELECT  '{"a":[1,2,3],"b":[4,5,6]}'::json#>>'{a,2}';`
  * `@>`  jsonb, 检测左侧是否包含右侧
  * `<@`  jsonb, 检测右侧是否包含左侧
  * `?`   jsonb, 检测是否包含 key
    * `SELECT '{"a":1, "b":2}'::jsonb ? 'b';`
  * `?|`  jsonb, 检测是否包含某个 key
    * `SELECT  '{"a":1, "b":2, "c":3}'::jsonb ?| array['b', 'ceeee', 'e'];`
  * `?&`  jsonb, 是否包含所有 key
  * `||`  jsonb, 拼接两个 jsonb
  * `-`   删除 kv 或数组元素
    * `SELECT  '{"a": "b"}'::jsonb - 'a';` `SELECT  '["a", "b"]'::jsonb - 'a';`
    * `SELECT  '["a", "b"]'::jsonb - (-1);` `SELECT  '["a", "b"]'::jsonb - (1);`
  * `#-`  删除路径
* FAQ
  * https://dba.stackexchange.com/questions/54283/how-to-turn-json-array-into-postgres-array


```sql
SELECT '5'::json;
SELECT '[1, 2, "foo", null]'::json;
SELECT '{"bar": "baz", "balance": 7.77, "active": false}'::json;

-- 检测是否包含
SELECT '"foo"'::jsonb @> '"foo"'::jsonb;
SELECT '[1, 2, 3]'::jsonb @> '[3, 1]'::jsonb;
-- 指定一个字段
SELECT data->'field' FROM doc;

-- 创建索引
CREATE INDEX idxgin ON api USING GIN (jdoc);
CREATE INDEX idxginp ON api USING GIN (jdoc jsonb_path_ops);

-- 将数组作为行
SELECT
  s ->> 'name'
FROM tab t, jsonb_array_elements(t.family -> 'children') s;
```


### Admin

```sql
-- 相当于给其他人 root 权限
grant postgres to someone;


GRANT ALL PRIVILEGES ON DATABASE "my_db" to my_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO myuser;
```

### NOTIFY

```sql
LISTEN virtual;
NOTIFY virtual;
NOTIFY virtual, 'This is the payload';


LISTEN foo;
SELECT pg_notify('fo' || 'o', 'pay' || 'load');

-- NOTIFY on insert
-- Send Notify Procedure
CREATE OR REPLACE FUNCTION my_tab()
  RETURNS TRIGGER AS $$
DECLARE
BEGIN
  PERFORM pg_notify('my_tab_insert_notify', new.id::TEXT);
  RETURN new;
END;
$$ LANGUAGE plpgsql;
-- Trigger
CREATE TRIGGER my_tab_after_insert
AFTER INSERT ON my_tab
FOR EACH ROW EXECUTE PROCEDURE my_tab_notify_insert();
```

### Graph
* https://www.postgresql.org/docs/current/static/queries-with.html
* [Pg Conf - Implementing Graph Database based-on PostgreSQL](https://www.slideshare.net/JoshuaBae/pg-conf-implementing-graph-database-basedon-postgresql)
* [SQLGraph: An Efficient Relational-Based Property Graph Store](https://static.googleusercontent.com/media/research.google.com/zh-CN//pubs/archive/43287.pdf)
* https://github.com/pietermartin/sqlg
* https://github.com/cayleygraph/cayley/pull/289
  * graph: Postgres backend
* http://bitnine.net/agensgraph/
  * 基于 PG
* [Graphs in the Database: Rdbms In The Social Networks Age](https://www.slideshare.net/quipo/rdbms-in-the-social-networks-age)
* [Trees In The Database - Advanced data structures](https://www.slideshare.net/quipo/trees-in-the-database-advanced-data-structures)


```
```


### Extension
* https://pgxn.org/

* [Additional Supplied Modules](https://www.postgresql.org/docs/current/static/contrib.html)
  * 自带的扩展
* FDW
  * https://www.postgresql.org/docs/current/static/postgres-fdw.html
  * http://multicorn.org/
    * Multicorn is a PostgreSQL 9.1+ extension meant to make Foreign Data Wrapper development easy, by allowing the programmer to use the Python programming language.

```sql
--  查看安装的
\dX;
select * from pg_extension;

-- 查看所有的
SELECT * FROM pg_available_extensions;

-- 查看所有的
CREATE EXTENSION IF NOT EXISTS file_fdw;
```

#### postgres-fdw

## Version

### 10
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

### 9.x


## FAQ
### varchar vs text
* [PostgreSQL: Difference between text and varchar (character varying)](https://stackoverflow.com/a/4849030/1870054)
* 没有区别, 存储方式是完全一样的, 只是其他的类型会检测长度
* 建议均使用 text, 在应用层做限制

### int vs bigint
* 在 64 位的服务器上, 两者占用的空间相同
* 因此建议使用 bigint

### 数组索引
GIN 索引是反向索引(inverted indexes), 适用于包含多个值的情况.

* 支持的操作符
<@
@>
=
&&


### 数组外键
* 不支持

### ERROR:  cannot alter type of a column used by a view or rule
必须要先 drop view 再操作, 目前没有比较好的操作方式, 但操作都可以在一个事务中完成

有些修改可以通过直接修改 pg_attribute 来达到目的, 但是非常不建议.

### 时间戳上的毫秒处理
目前没有比较好的处理方式

```sql
-- 将一个毫秒的 ts 转为 timestamp 类型
ALTER TABLE  my_info
  ALTER COLUMN tstmp TYPE TIMESTAMP USING to_timestamp(tstmp / 1000) + ((tstmp % 1000) || ' milliseconds') :: INTERVAL;
```
### 查询语句的最大大小
* 目前为 1G
* [Is there a maximum length constraint for a postgres query?](https://dba.stackexchange.com/q/131399)
* [src/common/psprintf.c#L28](https://github.com/postgres/postgres/blob/REL_10_1/src/common/psprintf.c#L28)

```c
#define MaxAllocSize   ((Size) 0x3fffffff) /* 1 gigabyte - 1 */
```

### IN vs any
* https://stackoverflow.com/a/28995514/1870054
* IN
  * Bitmap 扫描
  * 数据量大时, 执行时间更慢计划时间更久
* ANY
  * 会使用临时表做 JOIN
  * 数据量大时, 执行时间更久计划时间更快

```sql
CREATE TABLE test (
  id  BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  val TEXT
);

-- 插入测试数据
DO
$$
BEGIN
  FOR i IN 1..100000 LOOP
    INSERT INTO test (val) VALUES ('val#' || i);
  END LOOP;
END
$$;

EXPLAIN SELECT *
        FROM test
        WHERE id IN (1, 2, 3);

EXPLAIN SELECT *
        FROM test
        WHERE id = ANY (VALUES (1), (2), (3));
```

```
# IN
Bitmap Heap Scan on test  (cost=12.86..19.97 rows=3 width=40)
  Recheck Cond: (id = ANY ('{1,2,3}'::bigint[]))
  ->  Bitmap Index Scan on test_pkey  (cost=0.00..12.86 rows=3 width=0)
        Index Cond: (id = ANY ('{1,2,3}'::bigint[]))

# ANY
Nested Loop  (cost=0.32..25.00 rows=3 width=40)
  ->  HashAggregate  (cost=0.05..0.08 rows=3 width=4)
        Group Key: ""*VALUES*"".column1
        ->  Values Scan on ""*VALUES*""  (cost=0.00..0.04 rows=3 width=4)
  ->  Index Scan using test_pkey on test  (cost=0.28..8.29 rows=1 width=40)
        Index Cond: (id = ""*VALUES*"".column1)
```

```SQL
-- 测试 IN
DO
$$
DECLARE
  x   TEXT = '';
  r   REFCURSOR;
  rec RECORD;
BEGIN
  x = '0';
  FOR i IN 1..1000 LOOP
    x = x || ',' || i;
  END LOOP;
  OPEN r FOR EXECUTE 'EXPLAIN ANALYSE SELECT *
        FROM test
        WHERE id IN (' || x || ')';

  FOR i IN 1..6 LOOP
    FETCH r INTO rec;
    RAISE NOTICE 'ROW %', rec;
  END LOOP;
END
$$;

-- 测试 ANY
DO
$$
DECLARE
  x   TEXT;
  r   REFCURSOR;
  rec RECORD;
BEGIN
  x = '(0)';
  FOR i IN 1..1000 LOOP
    x = x || ',(' || i || ')';
  END LOOP;
  OPEN r FOR EXECUTE 'EXPLAIN ANALYSE SELECT *
        FROM test
        WHERE id = any (VALUES ' || x || ')';

  FOR i IN 1..10 LOOP
    FETCH r INTO rec;
    RAISE NOTICE 'ROW %', rec;
  END LOOP;
END
$$;
```

### psql

```
General
  \copyright             show PostgreSQL usage and distribution terms
  \errverbose            show most recent error message at maximum verbosity
  \g [FILE] or ;         execute query (and send results to file or |pipe)
  \gexec                 execute query, then execute each value in its result
  \gset [PREFIX]         execute query and store results in psql variables
  \q                     quit psql
  \crosstabview [COLUMNS] execute query and display results in crosstab
  \watch [SEC]           execute query every SEC seconds

Help
  \? [commands]          show help on backslash commands
  \? options             show help on psql command-line options
  \? variables           show help on special variables
  \h [NAME]              help on syntax of SQL commands, * for all commands

Query Buffer
  \e [FILE] [LINE]       edit the query buffer (or file) with external editor
  \ef [FUNCNAME [LINE]]  edit function definition with external editor
  \ev [VIEWNAME [LINE]]  edit view definition with external editor
  \p                     show the contents of the query buffer
  \r                     reset (clear) the query buffer
  \s [FILE]              display history or save it to file
  \w FILE                write query buffer to file

Input/Output
  \copy ...              perform SQL COPY with data stream to the client host
  \echo [STRING]         write string to standard output
  \i FILE                execute commands from file
  \ir FILE               as \i, but relative to location of current script
  \o [FILE]              send all query results to file or |pipe
  \qecho [STRING]        write string to query output stream (see \o)

Informational
  (options: S = show system objects, + = additional detail)
  \d[S+]                 list tables, views, and sequences
  \d[S+]  NAME           describe table, view, sequence, or index
  \da[S]  [PATTERN]      list aggregates
  \dA[+]  [PATTERN]      list access methods
  \db[+]  [PATTERN]      list tablespaces
  \dc[S+] [PATTERN]      list conversions
  \dC[+]  [PATTERN]      list casts
  \dd[S]  [PATTERN]      show object descriptions not displayed elsewhere
  \ddp    [PATTERN]      list default privileges
  \dD[S+] [PATTERN]      list domains
  \det[+] [PATTERN]      list foreign tables
  \des[+] [PATTERN]      list foreign servers
  \deu[+] [PATTERN]      list user mappings
  \dew[+] [PATTERN]      list foreign-data wrappers
  \df[antw][S+] [PATRN]  list [only agg/normal/trigger/window] functions
  \dF[+]  [PATTERN]      list text search configurations
  \dFd[+] [PATTERN]      list text search dictionaries
  \dFp[+] [PATTERN]      list text search parsers
  \dFt[+] [PATTERN]      list text search templates
  \dg[S+] [PATTERN]      list roles
  \di[S+] [PATTERN]      list indexes
  \dl                    list large objects, same as \lo_list
  \dL[S+] [PATTERN]      list procedural languages
  \dm[S+] [PATTERN]      list materialized views
  \dn[S+] [PATTERN]      list schemas
  \do[S]  [PATTERN]      list operators
  \dO[S+] [PATTERN]      list collations
  \dp     [PATTERN]      list table, view, and sequence access privileges
  \drds [PATRN1 [PATRN2]] list per-database role settings
  \ds[S+] [PATTERN]      list sequences
  \dt[S+] [PATTERN]      list tables
  \dT[S+] [PATTERN]      list data types
  \du[S+] [PATTERN]      list roles
  \dv[S+] [PATTERN]      list views
  \dE[S+] [PATTERN]      list foreign tables
  \dx[+]  [PATTERN]      list extensions
  \dy     [PATTERN]      list event triggers
  \l[+]   [PATTERN]      list databases
  \sf[+]  FUNCNAME       show a function's definition
  \sv[+]  VIEWNAME       show a view's definition
  \z      [PATTERN]      same as \dp

Formatting
  \a                     toggle between unaligned and aligned output mode
  \C [STRING]            set table title, or unset if none
  \f [STRING]            show or set field separator for unaligned query output
  \H                     toggle HTML output mode (currently off)
  \pset [NAME [VALUE]]   set table output option
                         (NAME := {format|border|expanded|fieldsep|fieldsep_zero|footer|null|
                         numericlocale|recordsep|recordsep_zero|tuples_only|title|tableattr|pager|
                         unicode_border_linestyle|unicode_column_linestyle|unicode_header_linestyle})
  \t [on|off]            show only rows (currently off)
  \T [STRING]            set HTML <table> tag attributes, or unset if none
  \x [on|off|auto]       toggle expanded output (currently off)

Connection
  \c[onnect] {[DBNAME|- USER|- HOST|- PORT|-] | conninfo}
                         connect to new database (currently "postgres")
  \encoding [ENCODING]   show or set client encoding
  \password [USERNAME]   securely change the password for a user
  \conninfo              display information about current connection

Operating System
  \cd [DIR]              change the current working directory
  \setenv NAME [VALUE]   set or unset environment variable
  \timing [on|off]       toggle timing of commands (currently off)
  \! [COMMAND]           execute command in shell or start interactive shell

Variables
  \prompt [TEXT] NAME    prompt user to set internal variable
  \set [NAME [VALUE]]    set internal variable, or list all if no parameters
  \unset NAME            unset (delete) internal variable

Large Objects
  \lo_export LOBOID FILE
  \lo_import FILE [COMMENT]
  \lo_list
  \lo_unlink LOBOID      large object operations
```

## pg_dump --help
```
pg_dump dumps a database as a text file or to other formats.

Usage:
  pg_dump [OPTION]... [DBNAME]

General options:
  -f, --file=FILENAME          output file or directory name
  -F, --format=c|d|t|p         output file format (custom, directory, tar,
                               plain text (default))
  -j, --jobs=NUM               use this many parallel jobs to dump
  -v, --verbose                verbose mode
  -V, --version                output version information, then exit
  -Z, --compress=0-9           compression level for compressed formats
  --lock-wait-timeout=TIMEOUT  fail after waiting TIMEOUT for a table lock
  -?, --help                   show this help, then exit

Options controlling the output content:
  -a, --data-only              dump only the data, not the schema
  -b, --blobs                  include large objects in dump
  -c, --clean                  clean (drop) database objects before recreating
  -C, --create                 include commands to create database in dump
  -E, --encoding=ENCODING      dump the data in encoding ENCODING
  -n, --schema=SCHEMA          dump the named schema(s) only
  -N, --exclude-schema=SCHEMA  do NOT dump the named schema(s)
  -o, --oids                   include OIDs in dump
  -O, --no-owner               skip restoration of object ownership in
                               plain-text format
  -s, --schema-only            dump only the schema, no data
  -S, --superuser=NAME         superuser user name to use in plain-text format
  -t, --table=TABLE            dump the named table(s) only
  -T, --exclude-table=TABLE    do NOT dump the named table(s)
  -x, --no-privileges          do not dump privileges (grant/revoke)
  --binary-upgrade             for use by upgrade utilities only
  --column-inserts             dump data as INSERT commands with column names
  --disable-dollar-quoting     disable dollar quoting, use SQL standard quoting
  --disable-triggers           disable triggers during data-only restore
  --enable-row-security        enable row security (dump only content user has
                               access to)
  --exclude-table-data=TABLE   do NOT dump data for the named table(s)
  --if-exists                  use IF EXISTS when dropping objects
  --inserts                    dump data as INSERT commands, rather than COPY
  --no-security-labels         do not dump security label assignments
  --no-synchronized-snapshots  do not use synchronized snapshots in parallel jobs
  --no-tablespaces             do not dump tablespace assignments
  --no-unlogged-table-data     do not dump unlogged table data
  --quote-all-identifiers      quote all identifiers, even if not key words
  --section=SECTION            dump named section (pre-data, data, or post-data)
  --serializable-deferrable    wait until the dump can run without anomalies
  --snapshot=SNAPSHOT          use given snapshot for the dump
  --strict-names               require table and/or schema include patterns to
                               match at least one entity each
  --use-set-session-authorization
                               use SET SESSION AUTHORIZATION commands instead of
                               ALTER OWNER commands to set ownership

Connection options:
  -d, --dbname=DBNAME      database to dump
  -h, --host=HOSTNAME      database server host or socket directory
  -p, --port=PORT          database server port number
  -U, --username=NAME      connect as specified database user
  -w, --no-password        never prompt for password
  -W, --password           force password prompt (should happen automatically)
  --role=ROLENAME          do SET ROLE before dump

If no database name is supplied, then the PGDATABASE environment
variable value is used.
```

## pg_restore --help
```
pg_restore restores a PostgreSQL database from an archive created by pg_dump.

Usage:
  pg_restore [OPTION]... [FILE]

General options:
  -d, --dbname=NAME        connect to database name
  -f, --file=FILENAME      output file name
  -F, --format=c|d|t       backup file format (should be automatic)
  -l, --list               print summarized TOC of the archive
  -v, --verbose            verbose mode
  -V, --version            output version information, then exit
  -?, --help               show this help, then exit

Options controlling the restore:
  -a, --data-only              restore only the data, no schema
  -c, --clean                  clean (drop) database objects before recreating
  -C, --create                 create the target database
  -e, --exit-on-error          exit on error, default is to continue
  -I, --index=NAME             restore named index
  -j, --jobs=NUM               use this many parallel jobs to restore
  -L, --use-list=FILENAME      use table of contents from this file for
                               selecting/ordering output
  -n, --schema=NAME            restore only objects in this schema
  -N, --exclude-schema=NAME    do not restore objects in this schema
  -O, --no-owner               skip restoration of object ownership
  -P, --function=NAME(args)    restore named function
  -s, --schema-only            restore only the schema, no data
  -S, --superuser=NAME         superuser user name to use for disabling triggers
  -t, --table=NAME             restore named relation (table, view, etc.)
  -T, --trigger=NAME           restore named trigger
  -x, --no-privileges          skip restoration of access privileges (grant/revoke)
  -1, --single-transaction     restore as a single transaction
  --disable-triggers           disable triggers during data-only restore
  --enable-row-security        enable row security
  --if-exists                  use IF EXISTS when dropping objects
  --no-data-for-failed-tables  do not restore data of tables that could not be
                               created
  --no-publications            do not restore publications
  --no-security-labels         do not restore security labels
  --no-subscriptions           do not restore subscriptions
  --no-tablespaces             do not restore tablespace assignments
  --section=SECTION            restore named section (pre-data, data, or post-data)
  --strict-names               require table and/or schema include patterns to
                               match at least one entity each
  --use-set-session-authorization
                               use SET SESSION AUTHORIZATION commands instead of
                               ALTER OWNER commands to set ownership

Connection options:
  -h, --host=HOSTNAME      database server host or socket directory
  -p, --port=PORT          database server port number
  -U, --username=NAME      connect as specified database user
  -w, --no-password        never prompt for password
  -W, --password           force password prompt (should happen automatically)
  --role=ROLENAME          do SET ROLE before restore

The options -I, -n, -P, -t, -T, and --section can be combined and specified
multiple times to select multiple objects.

If no input file name is supplied, then standard input is used.
```
