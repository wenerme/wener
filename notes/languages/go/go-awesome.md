---
title: Go Awesome
---

# Golang Awesome

* ORM
  * [go-gorm/gorm](https://github.com/go-gorm/gorm) - ⭐️
    * 目前 Go 里实现最为优美的 ORM
    * XORM 被 gogs 和 gitea 使用，是 gogs 原作者开发 - 但认为比不上 gorm
* 命令行
  * [spf13/cobra](https://github.com/spf13/cobra) - ⭐️
    * 目前使用最多
    * 比 urfave/cli 更 Opinioned， 但觉得是更好的 opinion
* 日志
  * [uber-go/zap](https://github.com/uber-go/zap) - ⭐️
    * 适用于生产、核心链路
    * 需要更多的配置
  * logrus
    * 适用于简单快速使用
    * 默认即可使用
* Observerable
  * Prometheus Metrics
  * Jaeger
* 参考
  * [mingrammer/go-web-framework-stars](https://github.com/mingrammer/go-web-framework-stars)
  * https://golangroadmap.com/

## 数据库驱动
* [mattn/go-sqlite3](https://github.com/mattn/go-sqlite3)
  * DNS - https://www.sqlite.org/uri.html
    * `file:test.db?cache=shared&mode=memory`
    * mode ro, rw, rwc, memory
      * rwc - Read, Write, Create
    * cache shared, private - https://www.sqlite.org/sharedcache.html
    * _foreign_keys/_fk - `PRAGMA foreign_keys` - 外键约束

## Web

:::tip

* Go 本身的 HTTP 处理已经比较完备，选择框架和库尽量以增强为主，避免选择全新实现
* 兼容 Go HTTP 处理逻辑的库能够相互组合使用

:::

* 路由
  * [gorilla/mux](https://github.com/gorilla/mux) - ⭐️
    * 非常便于使用的路由，增强 go http 功能
  * [julienschmidt/httprouter](https://github.com/julienschmidt/httprouter)
    * 牺牲功能换取性能
    * 不适用于 RESTful 接口
    * 不能区分路由 `/users/like`, `/users/:userId`
* 辅助增强
* 框架
  * [gin-gonic/gin](https://github.com/gin-gonic/gin)
    * 默认处理逻辑将请求和响应封装为了 Context
    * 能 Wrap http 的 Handler
    * 基于 httprouter 路由 - 不能区分路由 `/users/like`, `/users/:userId`
    * 不适用于 RESTful 接口
  * beego
    * 用于快速开发的完整框架 - All in one
    * 不推崇，尽量避免使用
    * 除非所有理念刚好匹配
  * echo
  * chi
  * revel
* HTTP
  * [valyala/fasthttp](http://github.com/valyala/fasthttp)
    * 重写的 http 处理
    * 注重性能
    * Zero memory allocations in hot paths. Up to 10x faster than net/http
* Websocket
  * [gorilla/websocket](https://github.com/gorilla/websocket)
    * 实现 ws 的首选库
    * 功能比 `golang.org/x/net/websocket` 丰富完善
  * [olahol/melody](https://github.com/olahol/melody)
    * 基于 gorilla/websocket 封装的简单消息处理库
    * 不再维护，如需修改可以拷贝出来使用
  * [centrifugal/centrifugo](https://github.com/centrifugal/centrifugo)
    * 实时消息服务 - Websocket as a Service
      * 作为独立服务存在
      * JWT 认证
      * 暴露 HTTP, GRPC 接口
      * 可以将 RPC Websocket 请求转换为 HTTP 请求
    * MIT 协议
    * language-agnostic - 语言无关
    * Websocket - JSON, Protobuf
    * SockJS - polyfill
    * 类似商业产品
      * https://pusher.com/websockets
    * 适用场景
      * php+html - php 不易处理 ws，但使用该服务可以 php --POST-> centrifugo --WS-> html
      * vercel 部署请求必须 10s 内 - 则可以 NextJS 后端 -> centrifugo -> 前端
      * AWS Lambda 场景 - 没有长链接，需要支持通知
      * Function as a Service 场景 - 没有链接概念，需要支持通知
      * 聊天产品、实时通知、消息集成、事件驱动
      * 类似于 Kafka，但是是面向 C 端产品

## JSON
* [json-iterator/go](https://github.com/json-iterator/go)
  * 替代 `encoding/json`
  * 更好性能，更多功能
    * 自定义类型解码
    * 宽松名字处理
* [tidwall/gjson](https://github.com/tidwall/gjson)
  * Get Json Path
* [tidwall/sjson](https://github.com/tidwall/sjson)
  * Set Json Path


## 数据处理
* [go-playground/validator](https://github.com/go-playground/validator)
  * struct 标签注解校验 - 类似于 Java 的 Bean Validate
* [go-ozzo/ozzo-validation](https://github.com/go-ozzo/ozzo-validation)
  * 校验库
* [mapstruct/mapstruct](https://github.com/mapstruct/mapstruct)
  * 对象互转 - 基于反射

## 网络
* [tidwall/evio](https://github.com/tidwall/evio)
  * event-loop networking for Go
* [panjf2000/gnet](https://github.com/panjf2000/gnet)
  * 高性能、轻量级、非阻塞的事件驱动 Go 网络框架。
* [magma/magma](https://github.com/magma/magma)
  * Platform for building access networks and modular network services

## 事件驱动
* [tibcosoftware/flogo](https://github.com/tibcosoftware/flogo)
  * 包含 Web UI
  * 用于实现事件驱动编程
  * 场景
    * 集成 Flow 处理
    * 流处理
    * 上下文决策
    * Microgateway
* [ThreeDotsLabs/watermill](https://github.com/ThreeDotsLabs/watermill)
* [trustmaster/goflow](https://github.com/trustmaster/goflow)
* [flowbase/flowbase](https://github.com/flowbase/flowbase)

## Markdown
* [yuin/goldmark](https://github.com/yuin/goldmark)
  * 易于扩展 - 内建较多扩展
  * 实现扩展需要阅读源码添加
* [gomarkdown/markdown](https://github.com/gomarkdown/markdown)
  * 自带部分扩展功能
* [russross/blackfriday](https://github.com/russross/blackfriday)
  * 不兼容 CommonMark
  * 无法扩展
  * [microcosm-cc/bluemonday](https://github.com/microcosm-cc/bluemonday)
    * html sanitizer

## 语言
* [rogchap/v8go](https://github.com/rogchap/v8go)
  * 内含预编译的静态 libv8
* [augustoroman/v8](https://github.com/augustoroman/v8)
  * V8 Binding

## 有趣
* [fogleman/primitive](https://github.com/fogleman/primitive)
  * 将图像转换为原子图形

# Inside
## go-gorm/gorm
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

## graphql-go/graphql
* [graphql-go/graphql](https://github.com/graphql-go/graphql)
* Golang GraphQL - 包含解析和执行
* 构建过程和执行过程可以使用 thunk 模式 - 返回函数，用到的时候再执行
* 因为存在循环依赖，延迟执行也能进行其他优化
* resolve - `func(p ResolveParams) (interface{}, error)`
  * DefaultResolveFn - field 默认 resolve
    * 支持 map 和 struct - 不支持 Embed struct
    * 字段比较忽略大小写
  * source 也可以实现 FieldResolver - 这样可以交由返回结果判断如何 resolve
  * 执行过程
    * 收集字段
    * 执行字段
    * resolve 字段
    * 计算值 - 处理 promise、序列化 scalars、执行下级字段
      * thunk 延迟
      * null 检查
      * list 展开
      * union 和 interface 实际类型检测
      * object 展开 - 向下求值
* 扩展
  * `ParseDidStart(context.Context) (context.Context, ParseFinishFunc)`
  * `ValidationDidStart(context.Context) (context.Context, ValidationFinishFunc)`
  * `ExecutionDidStart(context.Context) (context.Context, ExecutionFinishFunc)`
  * `ResolveFieldDidStart(context.Context, *ResolveInfo) (context.Context, ResolveFieldFinishFunc)`

## 99designs/gqlgen
* [99designs/gqlgen](https://github.com/99designs/gqlgen)
  * 基于生成的 GraphQL 引擎
  * Schema first - 需要 DSL 定义 GraphQL Schema
  * 类型安全
* [gqlgen vs gophers vs graphql-go vs thunder](https://gqlgen.com/feature-comparison/)

## entgo
* 基于代码生成的数据库引擎
  * 支持 MySQL, MariaDB, PostgreSQL, SQLite, Gremlin
* 项目源自 facebook
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

:::tip

* 内建 id 字段 - 可覆盖

:::

:::caution

* 不支持 upsert - [ent/ent#139](https://github.com/ent/ent/issues/139)
* 不支持 软删除 - [ent/ent#252](https://github.com/ent/ent/issues/252)
* 关联关系不支持自定义属性
* 不支持级联删除 - [ent/ent#407](https://github.com/ent/ent/issues/407)
* 目前 GoType 要求为 struct 或可映射类型

:::
