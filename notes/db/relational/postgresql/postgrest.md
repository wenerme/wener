---
title: PostgREST
---

# PostgREST

- [postgrest/postgrest](https://github.com/postgrest/postgrest)
  - MIT, Haskell
  - **功能**: 将现有的 PostgreSQL 数据库直接转换为 RESTful API。
  - **特点**: 高性能，无依懒，基于数据库 Schema 自动生成 API。

## Quick Start (Docker)

```bash
# 1. Start PostgREST
docker run --rm --net=host \
  -e PGRST_DB_URI="postgres://postgres:password@localhost/postgres" \
  -e PGRST_DB_ANON_ROLE="postgres" \
  postgrest/postgrest

# 2. Config via file
docker run --rm -v $PWD/postgrest.conf:/etc/postgrest.conf \
  postgrest/postgrest /etc/postgrest.conf
```

**Configuration (`postgrest.conf`):**

```ini
db-uri = "postgres://postgres:password@localhost/postgres"
db-schema = "public"
db-anon-role = "web_anon"
db-pool = 10
```

## Tools

- **Swagger UI**
  ```bash
  docker run --rm -p 8081:8080 -e API_URL=http://localhost:3000 swaggerapi/swagger-ui
  ```

## Alternatives

- [graphile/postgraphile](https://github.com/graphile/postgraphile)
  - PostgreSQL to GraphQL
  - `docker run -p 5000:5000 graphile/postgraphile --connection postgres://user:pass@host:5432/db`
