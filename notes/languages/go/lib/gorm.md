---
title: GORM
---

## gorm

> Golang 的 ORM 实现
> 基于 Entity 模型

- [go-gorm/gorm](https://github.com/go-gorm/gorm)
- 执行过程
  - 构建 Statement 对象
  - 查询 - 执行 query 回调
- 几乎所有实际操作都是通过 callback 串联起来的
- callbacks 管理 processor 组
- processor 下有实际回调处理
- 回调 操作 Statement 上关联的值对象进行查询修改
  - `func(db *gorm.DB)`
  - `db.Statement.ReflectValue` - 结果数据
- 入口 processor - 调用后开始实际执行
  - create
    - gorm:begin_transaction
    - gorm:before_create
    - gorm:save_before_associations
    - gorm:create
    - gorm:save_after_associations
    - gorm:after_create
    - gorm:commit_or_rollback_transaction
  - query
    - gorm:query
    - gorm:preload
    - gorm:after_query
  - update
    - 与 create 类似
    - gorm:setup_reflect_value - 在 begin_transaction 后
  - delete
    - gorm:begin_transaction
    - gorm:before_delete
    - gorm:delete_before_associations
    - gorm:delete
    - gorm:after_delete
    - gorm:commit_or_rollback_transaction
  - row
    - gorm:row
  - raw
    - gorm:raw
- RegisterDefaultCallbacks - 默认 callback 注册
  - 能看得出来执行过程
- 关系 - Relationship
  - 创建时会自动创建关联
  - 其他操作可选 - `Select(clause.Associations)` `Select("Profile")`
  - 也可以直接针对关联进行操作 - `Association("Profile")`
  - 关系处理方式分为 JoinTable 和 Reference
- gorm:preload
  - 多层级 Preload 会按序 - 例如 `Preload("Profile.Address")` 会分成 `Profile` 和 `Profile.Address` 两次完成
  - 如果关系不存在，找不到 Relationship 目前会 NPE
- 语句构建
  - `clause.Expression{ Build(Builder) }` - 表示任意语句
  - `clause.Builder` - WriteString, AddVar, WriteQuoted - 构建上下文
  - `clause.Interface` - 带 Name 的 表达式 - 可以被合并和替换 - 例如 LIMIT, SELECT
  - `clause.Table`, `clause.Column`
- Relationship 关联的 Schema 可能和实际 Schema 不同 - 导致无法 Preload
- Embed Struct 也是当作 embedded 来处理的，只不过没有前缀
  - 现在嵌套多层解析的 schema 会有问题 - [#3964](https://github.com/go-gorm/gorm/issues/3964)
- [go-gorm/datatypes](https://github.com/go-gorm/datatypes) - gorm.io/datatypes
  - 实现了其他数据类型 - 例如 JSON

```go
// 直接调用 processor
func TestPreloadOnly(t *testing.T){
  // 模型只包含主键
  var m models.User
  m.ID = 1
  // 通常逻辑 - 但构造出来的 stmt 包含基础信息
  stmt := db.Model(&m).Preload("Profile")
  // 填充需要的信息 - 正常逻辑这些字段会被填充
  stmt.Statement.Dest = stmt.Statement.Model
  stmt.Statement.ReflectValue = reflect.ValueOf(stmt.Statement.Dest).Elem()
  assert.NoError(t, stmt.Statement.Parse(stmt.Statement.Model))

  // 直接调用 preload
  callbacks.Preload(stmt)
  assert.NoError(t, stmt.Error)

  // 字段被成功 preload
  fmt.Println(m.Profile)
}
```

- 创建、更新、删除 默认在事务中执行
  - SkipDefaultTransaction 可关闭 - 约 30% 性能
- Tag 不区分大小写

```go
// 查询条件与数据不同但可以一次操作
db.Where(User{Name: "non_existing"}).Assign(User{Age: 20}).FirstOrCreate(&user)
```

## 钩子

- 创建和更新
  - BeforeSave
  - BeforeCreate/BeforeUpdate
  - AfterCreate/AfterUpdate
  - AfterSave
- 删除
  - BeforeDelete
  - AfterDelete
- 查询
  - AfterFind

```go
// 操作当前的 Statement 可修改语句
func (u *User) BeforeCreate(tx *gorm.DB) error {
  // 通过 tx.Statement 修改当前操作，例如：
  tx.Statement.Select("Name", "Age")
  tx.Statement.AddClause(clause.OnConflict{DoNothing: true})

  // tx 是带有 `NewDB` 选项的新会话模式
  // 基于 tx 的操作会在同一个事务中，但不会带上任何当前的条件
  err := tx.First(&role, "name = ?", user.Role).Error
  // SELECT * FROM roles WHERE name = "admin"
  // ...
  return err
}
```

## DryRun 查看执行语句

```go
stmt := db.Session(&gorm.Session{DryRun: true}).First(&user, 1).Statement
stmt.SQL.String() //=> SELECT * FROM `users` WHERE `id` = $1 ORDER BY `id`
stmt.Vars         //=> []interface{}{1}

// 可生成完整 SQL - 不要用于查询，有 SQL 注入风险
db.Dialector.Explain(stmt.SQL.String(), stmt.Vars...)
```

## 跳回钩子处理

```go
db.Session(&gorm.Session{SkipHooks: true}).Create(&user)
```

## 多态

- 默认多态值为表名

```go
type Cat struct {
  ID    int
  Name  string
  Toy   Toy `gorm:"polymorphic:Owner;"`
}

type Dog struct {
  ID   int
  Name string
  Toy  Toy `gorm:"polymorphic:Owner;"`
}

type Toy struct {
  ID        int
  Name      string
  OwnerID   int
  OwnerType string
}
```

## 使用 UID 实现类似多态

```go
type Model struct {
  ID    int
  UID   string // uuid
}
type Cat struct {
  Model
  Name  string
  Toy   Toy `gorm:"polymorphic:Owner;"`
}

type Dog struct {
  Model
  Name string
  Toy  Toy `gorm:"polymorphic:Owner;"`
}

type Toy struct {
  ID        int
  Name      string
  OwnerID   int
  OwnerType string
  OwnerUID string
}
```
