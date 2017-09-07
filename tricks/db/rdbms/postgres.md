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
# 查看运行状态
pg_ctl -D $PGDATA status 
```

## Notes
### 备份

```bash
# 转储单个库
# -j 并发数
pg_dump dbname > outfile
psql dbname < infile

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

### 9.x



