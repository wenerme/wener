---
title: sqlc
---

# sqlc

- [kyleconroy/sqlc](https://github.com/kyleconroy/sqlc) 是什么？
  - SQL 文件生成 Go 代码进行 DB 操作
  - 适用于复杂 SQL 场景
- [Playground](https://play.sqlc.dev/)

```bash
go get github.com/kyleconroy/sqlc/cmd/sqlc
docker run --rm -v $(pwd):/src -w /src kjconroy/sqlc generate
```

**sqlc.yaml**

```yaml
ersion: '1'
# 生成包
packages:
  - name: 'db' # 生成包名 - 默认 path 的 basename
    path: 'internal/db' # 生成位置
    queries: './sql/query/' # 查询 SQL 位置
    schema: './sql/schema/' # Schema SQL 位置
    engine: 'postgresql' # postgresql, mysql
    emit_db_tags: false # 生成 db tag
    emit_prepared_queries: false # 生成 prepare
    emit_interface: false # Querier 接口
    emit_exact_table_names: false # 如果为 true 则 struct 与表名相同 - 否则会自动使用单数形式
    emit_empty_slices: false # 默认 :many 没有的时候返回 nil, true 返回 []
    emit_json_tags: true # JSON tag
    # 包级别覆盖
  - overrides: []
overrides:
  # 类型覆盖
  - go_type: 'github.com/gofrs/uuid.UUID'
    db_type: 'uuid'
    nullable: false
  # 列覆盖
  - column: 'authors.id'
    go_type: 'github.com/segmentio/ksuid.KSUID'

# Struct 字段名映射
rename:
  spotify_url: 'SpotifyURL'
```

```sql
-- name: <name> <command>
```

- name 作为方法名
- command
  - `:exec` - `func (q *Queries) Name(ctx context.Context) error`
  - `:execresult` - `func (q *Queries) Name(ctx context.Context) (sql.Result, error)`
  - `:execrows` - `func (q *Queries) Name(ctx context.Context) (int64, error)`
  - `:many` - `func (q *Queries) Name(ctx context.Context) ([]Schema, error)`
  - `:one` - `func (q *Queries) Name(ctx context.Context) (Schema, error)`

```sql
CREATE TABLE authors (
  id   BIGSERIAL PRIMARY KEY,
  name text      NOT NULL,
  bio  text
);

-- name: GetAuthor :one
SELECT * FROM authors
WHERE id = $1 LIMIT 1;

-- name: ListAuthors :many
SELECT * FROM authors
ORDER BY name;

-- name: CreateAuthor :one
INSERT INTO authors (
  name, bio
) VALUES (
  $1, $2
)
RETURNING *;

-- name: DeleteAuthor :exec
DELETE FROM authors
WHERE id = $1;
```
