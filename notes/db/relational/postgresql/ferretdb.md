---
title: FerretDB
---

# FerretDB

- [FerretDB/FerretDB](https://github.com/FerretDB/FerretDB)
  - Apache-2.0, Go
  - Open Source MongoDB alternative
- 参考
  - [Supported commands](https://docs.ferretdb.io/reference/supported-commands/)
  - [Known differences](https://docs.ferretdb.io/diff/)
    - 不能处理 `\0`
    - 不支持嵌套数组
    - `-0` -> `0`
    - Key 不能包含 `.`
    - Key 不能以 `$` 开头
    - Value 不支持 Infinity, -Infinity, NaN
    - insert 不能包含重复 Key
    - 保留前缀 `_ferretdb_`
- MongoDB -> PostgreSQL
  - databases -> schemas
  - collections -> tables
  - documents -> rows JSONB

```bash
# PostgreSQL backend
# docker run -d --rm --name ferretdb -p 27017:27017 ghcr.io/ferretdb/all-in-one

# PostgreSQL
docker run -it --rm \
  -p 27017:27017 \
  -v $PWD/data:/data/ \
  -e FERRETDB_TELEMETRY=disable \
  -e DO_NOT_TRACK=true \
  -e FERRETDB_POSTGRESQL_URL=postgres://postgres:5432/ferretdb \
  --name ferretdb ghcr.io/ferretdb/all-in-one

# mongodb://username:password@127.0.0.1/ferretdb?authMechanism=PLAIN

# SQLite
docker run -it --rm \
  -p 27017:27017 \
  -v $PWD/data:/data/ \
  -e FERRETDB_TELEMETRY=disable \
  -e DO_NOT_TRACK=true \
  -e FERRETDB_HANDLER=sqlite \
  -e FERRETDB_SQLITE_URL=file:/data/ \
  --name ferretdb ghcr.io/ferretdb/all-in-one
```
