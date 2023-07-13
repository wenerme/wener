---
title: FerretDB
---

# FerretDB

- [FerretDB/FerretDB](https://github.com/FerretDB/FerretDB)
  - Apache-2.0, Go
  - Open Source MongoDB alternative


```bash
# PostgreSQL backend
# docker run -d --rm --name ferretdb -p 27017:27017 ghcr.io/ferretdb/all-in-one

# SQLite
docker run -it --rm \
  -p 27017:27017 \
  -v $PWD/data:/data/ \
  -e FERRETDB_HANDLER=sqlite \
  -e FERRETDB_SQLITE_URL=file:/data/ \
  --name ferretdb ghcr.io/ferretdb/all-in-one
```
