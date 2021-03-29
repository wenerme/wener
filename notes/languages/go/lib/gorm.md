---
title: Golang GORM 解析
---

## gorm

> Golang 的 ORM 实现
> 基于 Entity 模型

* [go-gorm/gorm](https://github.com/go-gorm/gorm)
* 执行过程
  * 构建 Statement 对象
  * 查询 - 执行 query 回调
* 几乎所有实际操作都是通过 callback 串联起来的
* callbacks 管理 processor 组
* processor 下有实际回调处理
* 回调 操作 Statement 上关联的值对象进行查询修改
  * `func(db *gorm.DB)`
  * `db.Statement.ReflectValue` - 结果数据
* 入口 processor - 调用后开始实际执行
  * create
    * gorm:begin_transaction
    * gorm:before_create
    * gorm:save_before_associations
    * gorm:create
    * gorm:save_after_associations
    * gorm:after_create
    * gorm:commit_or_rollback_transaction
  * query
    * gorm:query
    * gorm:preload
    * gorm:after_query
  * update
    * 与 create 类似
    * gorm:setup_reflect_value - 在 begin_transaction 后
  * delete
    * gorm:begin_transaction
    * gorm:before_delete
    * gorm:delete_before_associations
    * gorm:delete
    * gorm:after_delete
    * gorm:commit_or_rollback_transaction
  * row
    * gorm:row
  * raw
    * gorm:raw
* RegisterDefaultCallbacks - 默认 callback 注册
  * 能看得出来执行过程
* 关系 - Relationship
  * 创建时会自动创建关联
  * 其他操作可选 - `Select(clause.Associations)` `Select("Profile")`
  * 也可以直接针对关联进行操作 - `Association("Profile")`
  * 关系处理方式分为 JoinTable 和 Reference
* gorm:preload
  * 多层级 Preload 会按序 - 例如 `Preload("Profile.Address")` 会分成 `Profile` 和 `Profile.Address` 两次完成
  * 如果关系不存在，找不到 Relationship 目前会 NPE
* 语句构建
  * `clause.Expression{ Build(Builder) }` - 表示任意语句
  * `clause.Builder` - WriteString, AddVar, WriteQuoted - 构建上下文
  * `clause.Interface` - 带 Name 的 表达式 - 可以被合并和替换 - 例如 LIMIT, SELECT
  * `clause.Table`, `clause.Column`
* Relationship 关联的 Schema 可能和实际 Schema 不同 - 导致无法 Preload
* Embed Struct 也是当作 embedded 来处理的，只不过没有前缀
  * 现在嵌套多层解析的 schema 会有问题 - [#3964](https://github.com/go-gorm/gorm/issues/3964)

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
