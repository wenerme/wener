---
title: pgloader
---

# pgloader

- https://pgloader.io/
  - MySQL, SQLite,  MS SQL Server, CSV, HTTP, Archive, PostgreSQL to PostgreSQL, Citus
  - MySQL to PostgreSQL  Continuous Migration
  - COPY streaming

```
load database
   from mysql://user@host/dbname
   into pgsql://user@host/dbname
  with create no schema
  alter schema 'dbname' rename to 'public';
```
