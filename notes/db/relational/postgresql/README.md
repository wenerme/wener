---
id: postgresql
title: PostgresSQL
---

# PostgresSQL

## Tips
* [Postgres vs. PostgreSQL](https://www.enterprisedb.com/blog/postgres-vs-postgresql)
  * PostgreSQL 为主，Postgres 作为别名
* [Manual](https://www.postgresql.org/docs/manuals/)
* Current [Document](https://www.postgresql.org/docs/current/static/index.html)
* [Postgrest](https://github.com/begriffs/postgrest)
  * REST API for any Postgres database
* [pRest](https://github.com/prest/prest)
  * Golang
* [Awesome PostgreSQL](https://github.com/dhamaniasad/awesome-postgres)
* [Trees In The Database](http://www.slideshare.net/quipo/trees-in-the-database-advanced-data-structures/)
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
  * [Postgres Hidden Gems](http://www.craigkerstiens.com/2018/01/31/postgres-hidden-gems/)
* Hosted Provider
  * [Heroku](https://www.heroku.com/pricing) 免费 10K 行数据
  * [ElephantSQL](https://www.elephantsql.com/plans.html) 免费 20MB 5链接

```bash

brew install postgresql
brew postgresql-update database

# POSTGRES_USER=postgres
# POSTGRES_PASSWORD
# POSTGRES_DB
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

### 升级

```bash
pg_dumpall -U postgres > dumpfile
/etc/init.d/postgresql stop
apk add -u postgresql
/etc/init.d/postgresql setup
/etc/init.d/postgresql start
psql -U postgres -f dumpfile
```

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

```bash
# 导入 JSON
# JSON 如果包含转移可能会有问题, 例如包含 \n
cat data.json | psql -h localhost -p 5432 feeds -c "COPY news_feed (data) FROM STDIN;"

# 支持导入 CSV 和 JSON
# https://github.com/lukasmartinelli/pgfutter
# create table raw_data(id serial primary key, data jsonb);
pgfutter --host localhost --db db-name --user myuser --schema myschema --table raw_data --jsonb json data.json
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
  * `?`   jsonb, 检测是否包含 key 或数组元素
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

-- What GRANT USAGE ON SCHEMA exactly do? https://stackoverflow.com/q/17338621/1870054

--ACCESS DB
REVOKE CONNECT ON DATABASE nova FROM PUBLIC;
GRANT  CONNECT ON DATABASE nova  TO user;

--ACCESS SCHEMA
REVOKE ALL     ON SCHEMA public FROM PUBLIC;
GRANT  USAGE   ON SCHEMA public  TO user;

--ACCESS TABLES
grant usage , select on all sequences in schema s to u;

REVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC ;
GRANT SELECT                         ON ALL TABLES IN SCHEMA public TO read_only ;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO read_write ;
GRANT ALL                            ON ALL TABLES IN SCHEMA public TO admin ;
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

https://wiki.postgresql.org/wiki/Autonomous_subtransactions
