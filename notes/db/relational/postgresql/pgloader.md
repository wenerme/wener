---
title: pgloader
---

# pgloader

- [dimitri/pgloader](https://github.com/dimitri/pgloader)
  - MySQL, SQLite, MS SQL Server, CSV, HTTP, Archive, PostgreSQL to PostgreSQL, Citus
  - MySQL to PostgreSQL Continuous Migration
  - COPY streaming
- `postgresql://[user[:password]@][netloc][:port][/dbname][?option=value&...]`
- sqlite
  - FROM - url, file, .zip
  - WITH
    - include drop
    - include no drop
    - truncate
    - no truncate
    - disable triggers
    - create [no] indexes/tables
    - drop indexes
    - reset [no] sequences
    - schema only
    - data only
    - encoding = UTF-8
  - including only table names like 'invoice%'
  - excluding table names like 'appointments'

```bash
docker run --rm -it --name pgloader dimitri/pgloader:latest pgloader --version

pgloader --context ./sqlite.ini ./sqlite.load
```

```pre title="sqlite.load"
load database
  from '{{DBPATH}}'
  into postgresql:///pgloader;
```

```ini title="sqlite.ini"
[pgloader]
DBPATH = sqlite/sqlite.db
```

```
load database
   from mysql://user@host/dbname
   into pgsql://user@host/dbname
  with create no schema
  alter schema 'dbname' rename to 'public';
```

```
load database
     from sqlite:///data/tags.db
     into postgresql:///tags

 with include drop, create tables, create indexes, reset sequences

  set work_mem to '16MB', maintenance_work_mem to '512 MB';
```

# FAQ
## 10 fell through ECASE expression. Wanted one of (0 2 3 4 5 6 7 8).

不支持新版 14+ 的默认 auth 逻辑


- pg_hba.conf
  - scram-sha-256 -> md5
- https://github.com/dimitri/pgloader/issues/1207
