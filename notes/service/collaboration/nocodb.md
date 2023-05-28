---
title: nocodb
---

# nocodb

- [nocodb/nocodb](https://github.com/nocodb/nocodb)
  - AGPLv3, Typescript+Vue

:::info

- Group By [#188](https://github.com/nocodb/nocodb/issues/188)
- Kanban [#140](https://github.com/nocodb/nocodb/issues/140)

:::

```bash
docker run -it --rm \
  -v $PWD/data:/usr/app/data/ \
  --name nocodb -p 8080:8080 nocodb/nocodb:latest

NC_AUTH_JWT_SECRET=$(uuidgen)
# for PostgreSQL
docker run -d --name nocodb-postgres \
  -v $PWD/data:/usr/app/data/ \
  -e NC_DB="pg://host.docker.internal:5432?u=root&p=password&d=d1" \
  -e NC_AUTH_JWT_SECRET=$NC_AUTH_JWT_SECRET \
  -p 8080:8080 \
  nocodb/nocodb:latest
```
