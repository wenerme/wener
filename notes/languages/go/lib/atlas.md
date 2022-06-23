---
title: atlas
---

# atlas

- [ariga/atlas](https://github.com/ariga/atlas)
  - Apache-2.0, Go
  - Schema 迁移工具
  - 支持 PostgresSQL, MySQL, MariaDB, SQLite
  - 支持作为 terraform 的 provider

```bash
brew install ariga/tap/atlas

atlas schema apply -u "sqlite://test.db" -f schema.hcl # 应用迁移
atlas schema inspect -u "sqlite://test.db"             # 生成 schema
atlas serve --storage "sqlite://test.db"               # WebUI

# dev 环境用于预先验证
atlas schema apply --url "sqlite://prod.db" --dev-url "sqlite://prod.db" -f schema.hcl

atlas migrate new          # 生成 migrations/时间戳.sql
atlas migrate validate     # 对比 migrations/atlas.sum
atlas migrate hash --force # 强制重新生成 migrations/atlas.sum
```

```hcl title="schema.hcl"
schema "main" {

}

table "users" {
  schema = schema.main
  column "id" {
    null = false
    type = int
  }
  column "name" {
    null = true
    type = varchar(100)
  }
  primary_key {
    columns = [column.id]
  }
}

table "posts" {
  schema = schema.main
  column "id" {
    null = false
    type = int
  }
  column "title" {
    null = true
    type = varchar(100)
  }
  column "body" {
    null = true
    type = text
  }
  column "author_id" {
    null = true
    type = int
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "fk_posts_author_id" {
    columns     = [column.author_id]
    ref_columns = [table.users.column.id]
    on_update   = NO_ACTION
    on_delete   = NO_ACTION
  }
  index "idx_posts_author_id" {
    unique  = false
    columns = [column.author_id]
  }
}
```

## DSL

- 默认 DSL 名字 atlas.hcl
- schema
  - charset
  - collate
  - comment
- table
  - schema - 引用定义的 schema
  - column
    - type
    - null
    - default
    - as - 生成列
    - comment
    - collate
    - auto_increment - MySQL, SQLite
    - identity
      - generated - ALWAYS
      - start
      - increment
  - primary_key
    - columns
  - foreign_key
    - columns
    - ref_columns
    - on_delete - CASCADE, NO_ACTION
    - on_update
  - index
    - on
      - column
      - desc
      - prefix - 索引多长 - MySQL, MariaDB
    - unique
    - type - HASH, GIN, BRIN, FULLTEXT
    - options
      - page_per_range
    - where - 部分索引 - PostgreSQL, SQLite
  - check
    - expr
  - partition - PostgreSQL
    - type=RANGE
    - by
      - column
      - expr
- variable
- env - `--env local`
  - src
  - url
  - dev
  - schemas
  - migration_dir
    - url - `file://migrations`
    - format - atlas, flyway, liquibase, goose, golang-migrate
  - 其他属性会作为 schema.hcl 的变量 - `--var tenant=wener`

```hcl
schema "a" {}
schema "b" {}

// 多 schema 同名表
table "a" "users" {
  schema = schema.a
}
table "b" "users" {
  schema = schema.b
}
```

```hcl
env "local" {
  src = "schema.hcl"

  url = "sqlite://prod.db"
  dev = "sqlite://dev.db"

  schemas = ["main"]
}
```
