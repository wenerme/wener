---
title: atlas
---

# atlas

- [ariga/atlas](https://github.com/ariga/atlas)
  - Apache-2.0, Go
  - Schema 迁移工具
  - 支持 SQL, HCL, ORM 作为 Schema 来源
  - 支持 PostgresSQL, MySQL, MariaDB, SQLite
  - 支持作为 terraform 的 provider
- dev-url
  - 使用 SQL schemas 的时候需要一个临时的 数据库
- atlas_schema_revisions
- 工作流
  - 声明工作流 - Declarative Workflow
    - `atlas schema`
    - 优点
      - 简洁高效
      - 易于审查和理解
      - 自动化
    - 缺点
      - 控制力较弱
  - 版本化迁移 - Versioned Migration
    - `atlas migrate`
    - “基于变更的迁移”(Change-based Migrations)
    - 优点
      - 明确可控 (Explicit & Controlled)
      - 所见即所得
    - 缺点
      - 编写繁琐
        - 难以审查最终状态
  - 版本化迁移创作 (Versioned Migration Authoring)
    - declarative + versioned
    - `atlas migrate diff`
    - 生成迁移文件
    - 适用于复杂的变更
  - https://atlasgo.io/concepts/declarative-vs-versioned
- HCL

:::caution Pro 功能

- 只有 付费 Pro 才能登陆 $9/月/开发者
- Pro 功能 - 免费版功能非常受限
  - function
  - procedure
  - sequence
  - trigger
  - extension
  - partition
  - system_versioned tables for SQL Server
  - view
  - materialized view
  - event trigger
  - domain
  - Composite Type for PostgreSQL
  - Range Type for PostgreSQL
  - row-level security policy for PostgreSQL
  - `server` Foreign Servers for PostgreSQL

:::

```bash
brew install ariga/tap/atlas # official tap
# brew install atlas
# npx @ariga/atlas
# 手动安装
curl --create-file-mode 0755 -o atlas -L https://release.ariga.io/atlas/atlas-darwin-arm64-latest

# -s/--schema 指定多个 schema, 或者 pg search_path 指定 schema, --exclude 排除 schema
# --format '{{ hcl . | split | write }}'
# --format '{{ hcl . | split "type" ".pg.hcl" | write "schema/" }}' # 输出 schema/table.pg.hcl schema/schema.pg.hcl
atlas schema inspect -u "sqlite://test.db"             # 生成 HCL schema
atlas schema apply -u "sqlite://test.db" -f schema.hcl # 应用迁移
atlas serve --storage "sqlite://test.db"               # WebUI

# dev 环境用于预先验证
atlas schema apply --url "sqlite://prod.db" --dev-url "sqlite://prod.db" -f schema.hcl

atlas migrate new          # 生成 migrations/时间戳.sql
atlas migrate validate     # 对比 migrations/atlas.sum
atlas migrate hash --force # 强制重新生成 migrations/atlas.sum

# 生成 diff SQL 到 migrations
# --to 目标状态
# --dir 现在状态
atlas migrate diff \
  --dir "file://migrations" \
  --to "file://schema.pg.hcl" \
  --dev-url "docker://postgres/17-alpine/dev?search_path=public"

# Versioned Migration Authoring
atlas schema inspect --env local > schema.pg.hcl
atlas migrate diff baseline --env local --format '{{ sql . "  " }}'
atlas migrate apply --env local --baseline 00000000000000
atlas migrate status --env local

# 直接使用 SQL 作为 Schema
atlas schema inspect -u file://schemas/main.sql --env local --format '{{ sql . "  " }}' > migrations/00000000000000_baseline.sql
atlas migrate hash
atlas migrate apply --env local --baseline 00000000000000

atlas schema diff \
  --to file://schemas/main.sql \
  --from file://migrations \
  --dev-url "docker://postgres/17/dev"

# 修改了 migrations 需要重新 hash
atlas migrate hash
atlas migrate diff --to 'file://schemas/main.sql' --dev-url "docker://postgres/17/dev"

# Workflow
# =======================================================================
# 手动编辑 0_base.sql 文件 - 因为 atlas 免费版本不支持 function, procedure
# 生成 1_baseline.sql 文件
# 添加 IF NOT EXISTS - 因为不支持 function, procedure 有些依赖顺序有问题，需要手动在 base 里添加表
atlas schema inspect -u file://schemas/main.sql --env local --format '{{ sql . "  " }}' > migrations/1_baseline.sql
# TYPE 不支持 IF NOT EXISTS
# DO $$ BEGIN CREATE TYPE ...; EXCEPTION WHEN duplicate_object THEN null; END $$;
sed -i -E 's/^(CREATE (TABLE|SCHEMA|(UNIQUE )?INDEX|SEQUENCE)) ([^I].*)/\1 IF NOT EXISTS \4/g' migrations/*.sql
# 更新 atlas.sum
atlas migrate hash
# 验证基于 SQL 的迁移可执行
atlas migrate diff --to 'file://migrations' --dev-url "docker://postgres/17/dev"

# 修改 schema 后生成 migration
atlas migrate diff --to 'file://schemas/main.sql' --dev-url "docker://postgres/17/dev"

# 验证基于 Schema 的迁移是否可执行
# 由于不支持 function, procedure 所以可能失败
atlas schema apply --to 'file://schemas/main.sql' -u "docker://postgres/17/dev" --dev-url "docker://postgres/17/dev"

# 查看 docker 镜像的 tag
regctl tag ls arigaio/mysql
```

- docker 官方镜像是 arigaio/ 下的镜像
- docker+mysql://

```hcl title="atlas.hcl"
# atlas migrate hash --env diff
# atlas migrate diff --env diff
env "diff" {
  src = "file://schema.pg.hcl" # schema 定义
  url = "file://migrations" # 管理的数据库
  dev = "docker://postgres/17-alpine/dev?search_path=public"
}
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

- 支持读取 .env
- 可以使用 atlas.hcl 配置

```hcl
variable "envfile" {
    type    = string
    default = "/path/to/.env"
}

locals {
    envfile = {
        for line in split("\n", file(var.envfile)): split("=", line)[0] => regex("=(.*)", line)[0]
        if !startswith(line, "#") && length(split("=", line)) > 1
    }
}

env {
    name = atlas.env
    url  = local.envfile["DATABASE_URL"]
}
```

```sql
CREATE TABLE "atlas_schema_revisions"."atlas_schema_revisions" (
  "version" character varying NOT NULL,
  "description" character varying NOT NULL,
  "type" bigint NOT NULL DEFAULT 2,
  "applied" bigint NOT NULL DEFAULT 0,
  "total" bigint NOT NULL DEFAULT 0,
  "executed_at" timestamptz NOT NULL,
  "execution_time" bigint NOT NULL,
  "error" text NULL,
  "error_stmt" text NULL,
  "hash" character varying NOT NULL,
  "partial_hashes" jsonb NULL,
  "operator_version" character varying NOT NULL,
  PRIMARY KEY ("version")
);
```

## SQL Schema

- 文件指令
  - atlas:txmode：控制迁移是否在事务中执行（如关闭事务）。
  - atlas:nolint：禁用整个文件的 Lint 警告。
  - atlas:checkpoint：将该迁移标记为“检查点”。
  - atlas:delimiter：自定义语句分隔符（如 ;;）。
  - atlas:txtar：在带预检查的迁移中引入额外检查文件，先执行再迁移。
  - atlas:assert：在预检查文件中控制断言行为；oneof 表示至少一个断言需通过。
  - atlas:sensitive：避免在日志中记录敏感/PII 值（可作用于文件或单条语句）。
  - atlas:import：在 schema 文件中导入其他 schema 文件或目录。
- 语句指令
  - atlas:nolint：在迁移文件的单条 SQL 语句上禁用 Lint 警告，仅对该语句生效。示例：ALTER TABLE ...; -- atlas:nolint
  - atlas:assert：用于预检查文件中的断言语句，声明其覆盖的一个或多个 Lint 规则，被覆盖的规则不再提示警告/错误。示例：-- atlas:assert destructive-changes,large-index

```sql
-- atlas:import ./schemas
```

## atlas.hcl

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

# FAQ

## avoid diff schema

```hcl
diff {
	add_table {
		if_not_exists = true
	}
	drop_table {
		if_exists = true
	}
	skip {
		modify_schema = true
	}
}
```

```
Error: *schema.ModifySchema is not allowed when migration plan is scoped to one schema
```

**wrong alter schema**

```sql
-- Modify "" schema
ALTER DATABASE CHARSET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
```

## migrate set version

```bash
atlas migrate set
```

```sql
-- 直接更改 SQL 设置
update atlas_schema_revisions set applied=total,error='',error_stmt='' where version='20251126'
```
