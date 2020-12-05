---
title: GORM
---

# GORM

* 创建、更新、删除 默认在事务中执行
  * SkipDefaultTransaction 可关闭 - 约 30% 性能
* Tag 不区分大小写

```go
// 查询条件与数据不同但可以一次操作
db.Where(User{Name: "non_existing"}).Assign(User{Age: 20}).FirstOrCreate(&user)
```

## 钩子
* 创建和更新
  * BeforeSave
  * BeforeCreate/BeforeUpdate
  * AfterCreate/AfterUpdate
  * AfterSave
* 删除
  * BeforeDelete
  * AfterDelete
* 查询
  * AfterFind

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
* 默认多态值为表名

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
