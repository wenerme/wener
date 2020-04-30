---
id: faq
title: FAQ
---

# PostgreSQL FAQ

## How to Upgrade
可以构造一个包含所有版本的镜像，然后进行升级 - [Dockerfile](https://github.com/postgres/pgadmin4/blob/master/Dockerfile)

## CTID

https://dba.stackexchange.com/questions/203989/what-is-the-data-type-of-the-ctid-system-column-in-postgres

https://postgresql.verite.pro/blog/2019/04/24/oid-column.html

## 切换用户

```sql
set role user;
```

## 切换数据库
* 只能重新链接

## 密码存储
* [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html)
* [Hashed Passwords with PostgreSQL's pgcrypto](https://www.meetspaceapp.com/2016/04/12/passwords-postgresql-pgcrypto.html)
* https://stackoverflow.com/questions/15733196/where-2x-prefix-are-used-in-bcrypt

```sql
-- 生成 Hash
select crypt('12345', gen_salt('bf', 8));
-- 判断密码相等
select crypt('12345', password) = password
```

## Calculating and Saving Space in PostgreSQL
* [Column Tetris](https://stackoverflow.com/a/7431468/1870054)
* [HN](https://news.ycombinator.com/item?id=16471242)
* 每种数据类型都有特定的对齐要求 - [pg-type](https://www.postgresql.org/docs/current/static/catalog-pg-type.html)
* [pg_controldata](https://www.postgresql.org/docs/current/static/app-pgcontroldata.html)
  * 可以获取数据的族群信息
  * Maximum data alignment 显示数据的对齐要求
* [Database Object Size Functions](https://www.postgresql.org/docs/current/static/functions-admin.html#FUNCTIONS-ADMIN-DBSIZE)

```bash
pg_controldata data/
```

```sql
-- 列宽
select pg_column_size('int');
```

```
pg_control version number:            1002
Catalog version number:               201707211
Database system identifier:           6502788473953883273
Database cluster state:               in production
pg_control last modified:             五  3/ 9 12:04:15 2018
Latest checkpoint location:           0/32F8A88
Prior checkpoint location:            0/32DA0D0
Latest checkpoint's REDO location:    0/32F8A50
Latest checkpoint's REDO WAL file:    000000010000000000000003
Latest checkpoint's TimeLineID:       1
Latest checkpoint's PrevTimeLineID:   1
Latest checkpoint's full_page_writes: on
Latest checkpoint's NextXID:          0:730
Latest checkpoint's NextOID:          25609
Latest checkpoint's NextMultiXactId:  1
Latest checkpoint's NextMultiOffset:  0
Latest checkpoint's oldestXID:        548
Latest checkpoint's oldestXID's DB:   1
Latest checkpoint's oldestActiveXID:  730
Latest checkpoint's oldestMultiXid:   1
Latest checkpoint's oldestMulti's DB: 1
Latest checkpoint's oldestCommitTsXid:0
Latest checkpoint's newestCommitTsXid:0
Time of latest checkpoint:            五  3/ 9 12:04:12 2018
Fake LSN counter for unlogged rels:   0/1
Minimum recovery ending location:     0/0
Min recovery ending loc's timeline:   0
Backup start location:                0/0
Backup end location:                  0/0
End-of-backup record required:        no
wal_level setting:                    replica
wal_log_hints setting:                off
max_connections setting:              100
max_worker_processes setting:         8
max_prepared_xacts setting:           200
max_locks_per_xact setting:           64
track_commit_timestamp setting:       off
Maximum data alignment:               8
Database block size:                  8192
Blocks per segment of large relation: 131072
WAL block size:                       8192
Bytes per WAL segment:                16777216
Maximum length of identifiers:        64
Maximum columns in an index:          32
Maximum size of a TOAST chunk:        1996
Size of a large-object chunk:         2048
Date/time type storage:               64-bit integers
Float4 argument passing:              by value
Float8 argument passing:              by value
Data page checksum version:           1
Mock authentication nonce:            32f8310a0cf344f7c1432dd733d3cf6065b748697485724af31fbaf7605f50bc
```


## unsupported Unicode escape sequence

一般是因为 `\u0000`, 替换掉即可, pg 的字符串不支持 `\u0000`

## psql 开启时间记录
* `\timing`

```bash
# 直接命令行使用
psql -c '\timing' -c 'select 1'
```
