---
title: entgo
---

# entgo
* [ent/ent](https://github.com/ent/ent) 是什么？
  * 项目源自 facebook
  * 支持 RESTful 接口
  * 基于代码生成的 ORM
    * 支持 MySQL, MariaDB, PostgreSQL, SQLite, Gremlin
  * 创建和更新使用 setter/getter
  * 支持生成 gqlgen 集成代码
  * 特点
    * 不基于 struct 定义模型，直接定义 Fields, Indexes, Edges
    * 支持定义校验
    * 能 mixin 公共模型
    * 添加 annotation 自定义信息
* 支持的类型
  * 所有 golang 数字类型
  * bool
  * string
  * time.Time
  * []byte
  * JSON
  * Enum
  * UUID
  * Other - 自定义 DB 类型和 Go 类型
* 支持全局唯一 ID - int 类型
  * migrate.WithGlobalUniqueID
  * ID 前面部分为 Table 索引
  * ent_types 表维护 表名->索引 关系
  * 因此一个 ID 能获取到类型信息
  * graphql Node ID 需要该能力
  * github gql 使用 String ID - 格式为 base64 `04:User583231`
* 参考
  * [Neptune / Gremlin - experience compared to SQL backends](https://github.com/ent/ent/issues/452#issuecomment-619430120)
    * ent 早期后端为 Gremlin

:::tip

* 内建 id 字段 - 可覆盖

:::

:::caution

* 不支持 upsert - [ent/ent#139](https://github.com/ent/ent/issues/139)
* 不支持 软删除 - [ent/ent#252](https://github.com/ent/ent/issues/252)
* 关联关系不支持自定义属性
* 不支持级联删除 - [ent/ent#407](https://github.com/ent/ent/issues/407)
* 目前 GoType 要求为 struct 或可映射类型
* 不支持多态 - [#1048](https://github.com/ent/ent/issues/1048)
* entql 嵌套分页 N+1 问题 - [#1180](https://github.com/ent/ent/issues/1180)

:::


```bash
go get entgo.io/ent/cmd/ent

go mod init <project>
ent init User
go generate ./ent

# edge
go run entgo.io/ent/cmd/ent init Car Group
```

## Note
* Validator 不能获取到上下文，会 cast 成实际类型
* Save 顺序
  * 设置默认值
  * 没有 hooks
    * 校验字段
    * 保存
  * 有 hooks
    * 生成 Mutator - 校验、保存
    * 执行 hook
* ent.Policy - 访问策略控制
  * 通过拦截控制查询和修改 - 没有 Action 概念，只有 Query 和 Mutation
  * 三种决策结果
    * privacy.Allow
    * privacy.Deny
    * privacy.Skip
