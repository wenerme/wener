---
title: Go Awesome
---

# Golang Awesome

- ORM
  - [go-gorm/gorm](https://github.com/go-gorm/gorm) - ⭐️
    - 基于反射
    - 目前 Go 里实现最为优美的 ORM
    - XORM 被 gogs 和 gitea 使用，是 gogs 原作者开发 - 但认为比不上 gorm
  - [ent/ent](https://github.com/ent/ent) - ⭐️
    - 基于代码生成
    - Meta 信息完善，更适合复杂业务逻辑
- 命令行
  - [spf13/cobra](https://github.com/spf13/cobra) - ⭐️
    - 目前使用最多
    - 比 urfave/cli 更 Opinioned， 但觉得是更好的 opinion
- Observerable
  - Prometheus Metrics
  - Jaeger
- 参考
  - [mingrammer/go-web-framework-stars](https://github.com/mingrammer/go-web-framework-stars)
  - https://golangroadmap.com/

## 学习

- https://golang.org/doc/effective_go
- https://github.com/golang/go/wiki/CodeReviewComments
- https://github.com/golang/go/wiki/Modules
- https://github.com/golang/go/wiki
- https://golang.org/ref/spec
- project layout
  - [Simple Pojrect Layout](https://eli.thegreenplace.net/2019/simple-go-project-layout-with-modules/)
  - [golang-standards/project-layout](https://github.com/golang-standards/project-layout)
    - rsc: this is not a standard Go project layout - [#117](https://github.com/golang-standards/project-layout/issues/117)

## 日志

- [uber-go/zap](https://github.com/uber-go/zap) - ⭐️
  - 适用于生产、核心链路
  - 需要更多的配置
  - Suger 模式接口友好 - 些微影响性能
- [sirupsen/logrus](https://github.com/sirupsen/logrus)
  - 目前处于 **维护模式** 🚧 - 完成使命
  - 适用于简单快速使用
  - 默认即可使用
- [rs/zerolog](https://github.com/rs/zerolog)
  - Zero Allocation JSON Logger

## 数据库驱动

- [mattn/go-sqlite3](https://github.com/mattn/go-sqlite3)
  - DNS - https://www.sqlite.org/uri.html
    - `file:test.db?cache=shared&mode=memory`
    - mode ro, rw, rwc, memory
      - rwc - Read, Write, Create
    - cache shared, private - https://www.sqlite.org/sharedcache.html
    - `_foreign_keys/_fk` - `PRAGMA foreign_keys` - 外键约束

## 数据库操作

- [kyleconroy/sqlc](https://github.com/kyleconroy/sqlc)
  - sql 生成 go 代码进行调用
- [sosedoff/pgweb](https://github.com/sosedoff/pgweb)
  - Golang Web 管理工具 - MIT, 只读
- [volatiletech/sqlboiler](https://github.com/volatiletech/sqlboiler)
  - database-first ORM
- 迁移
  - [golang-migrate/migrate](https://github.com/golang-migrate/migrate)
  - [rubenv/sql-migrate](https://github.com/rubenv/sql-migrate)

## Web

:::tip

- Go 本身的 HTTP 处理已经比较完备，选择框架和库尽量以增强为主，避免选择全新实现
- 兼容 Go HTTP 处理逻辑的库能够相互组合使用

:::

- 路由
  - [gorilla/mux](https://github.com/gorilla/mux) - ⭐️
    - 非常便于使用的路由，增强 go http 功能
  - [julienschmidt/httprouter](https://github.com/julienschmidt/httprouter)
    - 牺牲功能换取性能
    - 不适用于 RESTful 接口
    - 不能区分路由 `/users/like`, `/users/:userId`
- 辅助增强
- 框架
  - [gin-gonic/gin](https://github.com/gin-gonic/gin)
    - 默认处理逻辑将请求和响应封装为了 Context
    - 能 Wrap http 的 Handler
    - 基于 httprouter 路由 - 不能区分路由 `/users/like`, `/users/:userId`
    - 不适用于 RESTful 接口
  - beego
    - 用于快速开发的完整框架 - All in one
    - 不推崇，尽量避免使用
    - 除非所有理念刚好匹配
  - echo
  - chi
  - revel
- HTTP
  - [valyala/fasthttp](http://github.com/valyala/fasthttp)
    - 重写的 http 处理
    - 注重性能
    - Zero memory allocations in hot paths. Up to 10x faster than net/http
- Websocket
  - [gorilla/websocket](https://github.com/gorilla/websocket)
    - 实现 ws 的首选库
    - 功能比 `golang.org/x/net/websocket` 丰富完善
  - [olahol/melody](https://github.com/olahol/melody)
    - 基于 gorilla/websocket 封装的简单消息处理库
    - 不再维护，如需修改可以拷贝出来使用
  - [centrifugal/centrifugo](https://github.com/centrifugal/centrifugo)
    - 实时消息服务 - Websocket as a Service
      - 作为独立服务存在
      - JWT 认证
      - 暴露 HTTP, GRPC 接口
      - 可以将 RPC Websocket 请求转换为 HTTP 请求
    - MIT 协议
    - language-agnostic - 语言无关
    - Websocket - JSON, Protobuf
    - SockJS - polyfill
    - 类似商业产品
      - https://pusher.com/websockets
    - 适用场景
      - php+html - php 不易处理 ws，但使用该服务可以 php --POST-> centrifugo --WS-> html
      - vercel 部署请求必须 10s 内 - 则可以 NextJS 后端 -> centrifugo -> 前端
      - AWS Lambda 场景 - 没有长链接，需要支持通知
      - Function as a Service 场景 - 没有链接概念，需要支持通知
      - 聊天产品、实时通知、消息集成、事件驱动
      - 类似于 Kafka，但是是面向 C 端产品

## 代码生成

- [cmd/stringer/stringer.go](https://github.com/golang/tools/blob/master/cmd/stringer/stringer.go)
  - 为 int 枚举生成 String 方法
  - `//go:generate stringer -type=Pill`
  - `-type`
  - `-output`
  - `-trimprefix`
  - `-tags`
  - `-linecomment` - String 返回 Comment 内容
- [google/addlicense](https://github.com/google/addlicense)
  - 添加 License
  - `//go:generate go run github.com/google/addlicense -c Wener -y 2019-present ./`
- [fatih/gomodifytags](https://github.com/fatih/gomodifytags)
  - 添加 json tag
  - `gomodifytags -file demo.go -struct Server -add-tags json -add-options json=omitempty -transform camelcase --skip-unexported`
- [hexdigest/gowrap](https://github.com/hexdigest/gowrap)
  - 生成 interface 实现，辅助实现修饰模式
- [awalterschulze/goderive](https://github.com/awalterschulze/goderive)
  - 为 Struct 生成 Equal、Compare、DeepCopy、GoString、Hash
  - 为类型生成 Set 操作
  - 生成函数式编程方法
  - 生成并发操作
- [miku/zek](https://github.com/miku/zek)
  - XML -> Go Struct
  - [在线生成](https://www.onlinetool.io/xmltogo)
- 功能性
  - [99designs/gqlgen](https://github.com/99designs/gqlgen) - GraphQL Schema -> Model/Resolver
  - [ent/ent](https://github.com/ent/ent) - Schema -> CRUD, MySQL, PostgreSQL, SQLite

## JSON

- [json-iterator/go](https://github.com/json-iterator/go)
  - 替代 `encoding/json`
  - 更好性能，更多功能
    - 自定义类型解码
    - 宽松名字处理
- [tidwall/gjson](https://github.com/tidwall/gjson)
  - Get Json Path
- [tidwall/sjson](https://github.com/tidwall/sjson)
  - Set Json Path
- [qri-io/jsonschema](https://github.com/qri-io/jsonschema)
- [xeipuuv/gojsonschema](https://github.com/xeipuuv/gojsonschema)

## 数据处理

- [go-playground/validator](https://github.com/go-playground/validator)
  - struct 标签注解校验 - 类似于 Java 的 Bean Validate
- [go-ozzo/ozzo-validation](https://github.com/go-ozzo/ozzo-validation)
  - 校验库
- [mapstruct/mapstruct](https://github.com/mapstruct/mapstruct)
  - 对象互转 - 基于反射

## 网络

- [tidwall/evio](https://github.com/tidwall/evio)
  - event-loop networking for Go
- [panjf2000/gnet](https://github.com/panjf2000/gnet)
  - 高性能、轻量级、非阻塞的事件驱动 Go 网络框架。
- [magma/magma](https://github.com/magma/magma)
  - Platform for building access networks and modular network services
- [koding/websocketproxy](https://github.com/koding/websocketproxy)
  WebSocket reverse proxy
- [soheilhy/cmux](https://github.com/soheilhy/cmux)
  Connection multiplexer - serve different services on the same port

## 事件驱动

- [tibcosoftware/flogo](https://github.com/tibcosoftware/flogo)
  - 包含 Web UI
  - 用于实现事件驱动编程
  - 场景
    - 集成 Flow 处理
    - 流处理
    - 上下文决策
    - Microgateway
- [ThreeDotsLabs/watermill](https://github.com/ThreeDotsLabs/watermill)
- [trustmaster/goflow](https://github.com/trustmaster/goflow)
- [flowbase/flowbase](https://github.com/flowbase/flowbase)

## Service Framework

- [asim/go-micro](https://github.com/asim/go-micro)
- [AsynkronIT/protoactor-go](https://github.com/AsynkronIT/protoactor-go)
  - Proto Actor - Ultra fast distributed actors for Go, C# and Java/Kotlin
- [wasmCloud/wasmCloud](https://github.com/wasmCloud/wasmCloud)
  - wasm actor 平台 - 支持 tinygo
- [tal-tech/go-zero](https://github.com/tal-tech/go-zero)
- [smallnest/rpcx](https://github.com/smallnest/rpcx)
  - 微服务框架

## Markdown

- [yuin/goldmark](https://github.com/yuin/goldmark)
  - 易于扩展 - 内建较多扩展
  - 实现扩展需要阅读源码添加
- [gomarkdown/markdown](https://github.com/gomarkdown/markdown)
  - 自带部分扩展功能
- [russross/blackfriday](https://github.com/russross/blackfriday)
  - 不兼容 CommonMark
  - 无法扩展
  - [microcosm-cc/bluemonday](https://github.com/microcosm-cc/bluemonday)
    - html sanitizer

## 认证授权/Auth

- [dexidp/dex](https://github.com/dexidp/dex) - OIDC, IdP
- [ory](https://github.com/ory)
  - hydra - OIDC, IdP
  - kratos - 用户注册管理
  - oathkeeper - 访问代理 - 注入授权信息
  - keto - 访问控制服务
  - fosite - Golang OAuth2 框架

## 语言

- [rogchap/v8go](https://github.com/rogchap/v8go)
  - 内含预编译的静态 libv8
- [augustoroman/v8](https://github.com/augustoroman/v8)
  - V8 Binding

## 有趣

- [fogleman/primitive](https://github.com/fogleman/primitive)
  - 将图像转换为原子图形
- [esimov/triangle](https://github.com/esimov/triangle)
  - 转换为三角形
- [alecthomas/chroma](https://github.com/alecthomas/chroma)
  - 代码高亮
- [mugo](https://benhoyt.com/writings/mugo)
- [rhu1/fgg](https://github.com/rhu1/fgg)
  - basic prototype of Featherweight Go and Featherweight Generic Go
- [joewalnes/websocketd](https://github.com/joewalnes/websocketd)
  - Turn any program that uses STDIN/STDOUT into a WebSocket server
- [jeromer/mumbojumbo](https://github.com/jeromer/mumbojumbo)
  字符串混淆
- [esimov/caire](https://github.com/esimov/caire)
  内容感知的图像缩放

## 控制理论 / Control theory

- [Reactive planning and reconciliation in Go](https://gianarb.it/blog/reactive-planning-and-reconciliation-in-go)
- [spotahome/gontroller](https://github.com/spotahome/gontroller)
  - [Gontroller: a Go library to create reliable feedback loop controllers](https://product.spotahome.com/832d4a9522ea)
- [gianarb/planner](https://github.com/gianarb/planner)
- [konimarti/lti](https://github.com/konimarti/lti)

## Lib

- [adhocore/gronx](https://github.com/a\dhocore/gronx) cron parser

## Tool

- [google/bloaty](https://github.com/google/bloaty)
  - 二进大小分析
- [xo/usql](https://github.com/xo/usql)
  - SQL 命令行工具

## Service

- [umputun/remark42](https://github.com/umputun/remark42) comment egnine

## Performance

- [bspaans/jit-compiler](https://github.com/bspaans/jit-compiler)
- [Writing a JIT compiler in Golang](https://medium.com/kokster/964b61295f)
- [Go Performance Tools Cheat Sheet](https://steveazz.xyz/blog/go-performance-tools-cheat-sheet/)
- [CPU Utilization is Wrong](http://www.brendangregg.com/blog/2017-05-09/cpu-utilization-is-wrong.html)

## Linux System

- [rainycape/governator](https://github.com/rainycape/governator)
  - process manager for UNIX systems
- [ochinchina/supervisord](https://github.com/ochinchina/supervisord)

## SIP/WebRTC

- [rtctunnel/rtctunnel](https://github.com/rtctunnel/rtctunnel)
  network tunnels over WebRTC
- [ghettovoice/gosip](https://github.com/ghettovoice/gosip)
  SIP in GO
- [jaroszan/sip](https://github.com/jaroszan/sip)
  SIP simulator in Go
- [xiaochengtech/sip](https://gitee.com/xiaochengtech/sip)
  Go 实现的 RFC3261-SIP 协议
- [KalbiProject/Kalbi](https://github.com/KalbiProject/Kalbi)
  Golang SIP framework
- [sip client.go](https://github.com/framsc/sip-client-in-golang/blob/master/sip%20client.go)
  - 简单处理 Register
