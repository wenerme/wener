---
title: Go Awesome
tags:
  - Awesome
---

# Golang Awesome

- https://go-proverbs.github.io/

## 常用库

- mux
  - [chi](./lib/chi.md) - ⭐️
  - gin, mux
- ORM
  - [gorm](./lib/gorm.md) - ⭐️
    - 基于反射
    - 目前 Go 里实现最为优美的 ORM
    - XORM 被 gogs 和 gitea 使用，是 gogs 原作者开发 - 但认为比不上 gorm
  - [ent](./lib/ent.md) - ⭐️
    - 基于代码生成
    - Meta 信息完善，更适合复杂业务逻辑
- 命令行
  - [spf13/cobra](https://github.com/spf13/cobra) - ⭐️
    - 目前使用最多
    - flag 由 pflag 处理，配置由 viper 处理
    - 比 urfave/cli 更 unopinioned
    - urfave/cli 更加 declarative
    - [muesli/coral](https://github.com/muesli/coral)
      - cobra fork with only 4 dependencies
  - [urfave/cli](https://github.com/urfave/cli)
- IoC - fx
- JWX
  - [golang-jwt/jwt](https://github.com/golang-jwt/jwt)
  - [lestrrat-go/jwx](https://github.com/lestrrat-go/jwx)
    - jwt,jwk,jwa,jws,jwe
- OIDC
  - [caos/oidc](./lib/oidc.md)
    - op,rs
  - [golang.org/x/oauth2](https://pkg.go.dev/golang.org/x/oauth2)
- 配置
  - viper - 重量级
    - 会 lowercase YAML key
    - break space
  - [caarlos0/env](https://github.com/caarlos0/env)
  - [knadh/koanf](https://github.com/knadh/koanf)
    - 轻量 - 功能按需引入 - binary 小
- 日志
  - zap
  - logrus
- HTTP Client
  - [wenerme/go-req](https://github.com/wenerme/go-req)
- Observerable
  - Prometheus Metrics
  - Jaeger
- Testing
  - [onsi/ginkgo](https://github.com/onsi/ginkgo)
  - [smartystreets/goconvey](https://github.com/smartystreets/goconvey)
- 参考
  - [mingrammer/go-web-framework-stars](https://github.com/mingrammer/go-web-framework-stars)

<!-- - https://golangroadmap.com/ -->

## 学习

- https://go-proverbs.github.io/
- https://golang.org/doc/effective_go
- https://github.com/golang/go/wiki/CodeReviewComments
- https://github.com/golang/go/wiki/Modules
- https://github.com/golang/go/wiki
- https://golang.org/ref/spec
- project layout
  - [Simple Pojrect Layout](https://eli.thegreenplace.net/2019/simple-go-project-layout-with-modules/)
  - [golang-standards/project-layout](https://github.com/golang-standards/project-layout)
    - rsc: this is not a standard Go project layout - [#117](https://github.com/golang-standards/project-layout/issues/117)
- [Network Programming with Go](https://tumregels.github.io/Network-Programming-with-Go/)
  - [HN](https://news.ycombinator.com/item?id=28824996)
- [Gotchas in the Go Network Packages Defaults](https://martin.baillie.id/wrote/gotchas-in-the-go-network-packages-defaults/)
- Playground
  - https://goplay.tools
    - [x1unix/go-playground](https://github.com/x1unix/go-playground)
  - https://play.golang.org

## 日志

- [rs/zerolog](https://github.com/rs/zerolog)
  - Zero Allocation JSON Logger
  - 接口更友好
  - ⚠️ 重复名字字段不会覆盖
- [uber-go/zap](https://github.com/uber-go/zap) - ⭐️
  - 适用于生产、核心链路
  - 需要更多的配置
  - Suger 模式接口友好 - 些微影响性能
- [sirupsen/logrus](https://github.com/sirupsen/logrus)
  - 目前处于 **维护模式** 🚧 - 完成使命
  - 适用于简单快速使用
  - 默认即可使用
- benchmark
  - https://github.com/rs/logbench
    - http://hackemist.com/logbench/
  - https://github.com/uber-go/zap#performance

## 数据库驱动

- [mattn/go-sqlite3](https://github.com/mattn/go-sqlite3)
  - 依赖 CGO
  - DSN - https://www.sqlite.org/uri.html
    - `file:test.db?cache=shared&mode=memory`
    - mode ro, rw, rwc, memory
      - rwc - Read, Write, Create
    - cache shared, private - https://www.sqlite.org/sharedcache.html
    - `_foreign_keys/_fk` - `PRAGMA foreign_keys` - 外键约束
- [cznic/sqlite](https://gitlab.com/cznic/sqlite)
  - pure go SQLite
- [jackc/pgx](https://github.com/jackc/pgx)
  - 推荐 - 纯 Go
  - [jackc/pgtype](https://github.com/jackc/pgtype)
    - 接口没有 pq 提供的类型方便操作
  - vs pq
    - [sourcegraph/sourcegraph#16575](https://github.com/sourcegraph/sourcegraph/issues/16575#issuecomment-747923724)
- [go-redis/redis](https://github.com/go-redis/redis)
  - [go-redis/redis#607](https://github.com/go-redis/redis/issues/607)
    - 不支持 Prefix
- [lib/pq](https://github.com/lib/pq)
  - 已不推荐使用

## 数据库相关

- [ent](./lib/ent.md)
  - [ariga/sqlcomment](https://github.com/ariga/sqlcomment)
    - 添加注释 - 用于 trace
- [gorm](./lib/gorm.md)
- [guregu/null](https://github.com/guregu/null)
  - 包装 sql.Null 支持 序列化
- [qustavo/sqlhooks](https://github.com/qustavo/sqlhooks)
  - 添加 hook
- [kyleconroy/sqlc](https://github.com/kyleconroy/sqlc)
  - sql 生成 go 代码进行调用
- [sosedoff/pgweb](https://github.com/sosedoff/pgweb)
  - Golang Web 管理工具 - MIT, 只读
- [go-pg/pg](https://github.com/go-pg/pg)
  - ORM focus on PostgreSQL features and performance
- [volatiletech/sqlboiler](https://github.com/volatiletech/sqlboiler)
  - database-first ORM
- [xo/xo](https://github.com/xo/xo)
  - DB 生成 Go
- [jmoiron/sqlx](https://github.com/jmoiron/sqlx)
  - 辅助 sql 操作
- [xo/dburl](https://github.com/xo/dburl)
  - Connect String
- SQL Builder
  - [Masterminds/squirrel](https://github.com/Masterminds/squirrel)
  - [uptrace/bun](https://github.com/uptrace/bun)
- 迁移
  - [golang-migrate/migrate](https://github.com/golang-migrate/migrate)
  - [rubenv/sql-migrate](https://github.com/rubenv/sql-migrate)

## Web

:::tip

- Go 本身的 HTTP 处理已经比较完备，选择框架和库尽量以增强为主，避免选择全新实现
- 兼容 Go HTTP 处理逻辑的库能够相互组合使用

:::

### 路由/Router

- [chi](./lib/chi.md)
  - 标准接口
  - 开发比 mux 活跃
  - radix trie - 类似 httprouter - 性能优于 mux
  - 自带较多 middleware
- [gorilla/mux](https://github.com/gorilla/mux)
  - 不推荐使用
  - 非常便于使用路由，增强 go http 功能
  - 变量匹配路由 - `O(n)`
- [julienschmidt/httprouter](https://github.com/julienschmidt/httprouter)
  - 牺牲功能换取性能
  - 不适用于 RESTful 接口 - 不能区分路由 `/users/like`, `/users/:userId`
- 参考
  - [julienschmidt/go-http-routing-benchmark](https://github.com/julienschmidt/go-http-routing-benchmark)

### 框架/Framework

- [kataras/iris](https://github.com/kataras/iris)
  - BSD-3
- [gin-gonic/gin](https://github.com/gin-gonic/gin)
  - 默认处理逻辑将请求和响应封装为了 Context
  - 能 Wrap http 的 Handler
  - 基于 httprouter 路由 - 不能区分路由 `/users/like`, `/users/:userId`
    - 不适用于 RESTful 接口
    - [gin#2016](https://github.com/gin-gonic/gin/issues/2016)
- [gofiber/fiber](https://github.com/gofiber/fiber)
  - 非 net/http 体系
  - 基于 fasthttp
- [cloudwego/hertz](https://github.com/cloudwego/hertz)
  - 微服务
  - 网络层基于 Netpoll
  - 文档 https://www.cloudwego.io/zh/docs/hertz/
  - by 字节跳动
- [emicklei/go-restful](https://github.com/emicklei/go-restful)
  - 辅助构建 RESTful 类型接口
  - 抽象 Resource 概念
  - 抽象 Entity 编码处理
  - 支持 JSON 和 XML
  - 支持定义 OpenAPI
- [ogen-go/ogen](https://github.com/ogen-go/ogen)
  - 生成 OpenAPIv3
- beego
  - 用于快速开发的完整框架 - All in one
  - 不推崇，尽量避免使用
  - 除非所有理念刚好匹配
- echo
- revel

### 增强处理

- [go-chi/render](https://github.com/go-chi/render)
  - 辅助处理请求响应内容
- [unrolled/render](https://github.com/unrolled/render)
- [yuriizinets/kyoto](https://github.com/yuriizinets/kyoto)
- _SSR_ :)
  - [wolfeidau/hotwire-golang-website](https://github.com/wolfeidau/hotwire-golang-website)
  - https://www.akmittal.dev/posts/hotwire-go/
  - [jfyne/live](https://github.com/jfyne/live)
  - [brendonmatos/golive](https://github.com/brendonmatos/golive)

### Websocket

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
- [gobwas/ws](https://github.com/gobwas/ws)
  Tiny WebSocket library for Go

### Misc

- [valyala/fasthttp](http://github.com/valyala/fasthttp)
  - 重写的 net/http 处理
  - 注重性能
  - Zero memory allocations in hot paths. Up to 10x faster than net/http
- [golobby/container](https://github.com/golobby/container)
  - IoC Container
- [zhenghaoz/gorse](https://github.com/zhenghaoz/gorse)
  recommender system service
- [davidschlachter/embedded-struct-visualizer](https://github.com/davidschlachter/embedded-struct-visualizer)
  - struct 关系可视化
- [orijtech/structslop](https://github.com/orijtech/structslop)
  - struct 字段顺序调整优化
- [tmc/reactssr](https://github.com/tmc/reactssr)
  - React SSR
- [razorpay/go-financial](https://github.com/razorpay/go-financial)
  - numpy-financial
  - [Go Financial — A pkg for elementary financial functions](https://engineering.razorpay.com/892b1532eb2e)
- [loov/goda](https://github.com/loov/goda)
  - Go Dependency Analysis toolkit

## GraphQL

- [99designs/gqlgen](https://github.com/99designs/gqlgen)
  - GraphQL Schema 生成 Model/Resolver
  - 静态类型，无法动态 Schema
  - 参照 graphql-js 实现
- [graph-gophers/graphql-go](https://github.com/graph-gophers/graphql-go)
  - BSD-2
  - 类型自动绑定 Schema - 静态 Schema
- [graphql-go/graphql](https://github.com/graphql-go/graphql)
  - 代码动态生成 Schema - 动态 Schema
- [Yamashou/gqlgenc](https://github.com/Yamashou/gqlgenc)
  - gqlgen 客户端
- [Khan/genqlient](https://github.com/Khan/genqlient)
  - type-safe Go GraphQL client

**网关**

- [ysugimoto/grpc-graphql-gateway](https://github.com/ysugimoto/grpc-graphql-gateway)
  - 基于 pb 生成 graphql 网关
  - 实现使用 [graphql-go/graphql](https://github.com/graphql-go/graphql)
- [movio/bramble](https://github.com/movio/bramble)
  - MIT, Golang
  - 比 apollo 简单但功能更弱
  - 基于 service 合成 - 支持部分简单 directive
  - 不支持 subscriptions
  - [Introducing Bramble: A Federated GraphQL Gateway Implemented In Go](https://movio.co/blog/building-a-new-api-platform-for-movio/)
- [nautilus/gateway](https://github.com/nautilus/gateway)
  - MIT, Golang
  - Introspect schema，自动合并 - 不需要 directive
  - 不支持 subscriptions
  - [A Guide to GraphQL Schema Federation, Part 1](https://itnext.io/a-guide-to-graphql-schema-federation-part-1-995b639ac035)

## 代码生成/Generator

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
  - transform
    - snakecase - base_domain
    - camelcase - baseDomain
    - lispcase - base-domain
    - pascalcase - BaseDomain
    - titlecase - Base Domain
    - keep
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
- [mholt/json-to-go](https://github.com/mholt/json-to-go)
  - JSON -> Go Struct
  - [在线生成](https://mholt.github.io/json-to-go/)
- [gzuidhof/tygo](https://github.com/gzuidhof/tygo)
  - Go -> Typescript
- 功能性
  - [ent/ent](https://github.com/ent/ent) - Schema -> CRUD, MySQL, PostgreSQL, SQLite
  - [uber-go/gopatch](https://github.com/uber-go/gopatch)
    - 根据规则转换代码
  - [ogen-go/ogen](https://github.com/ogen-go/ogen)
    - OpenAPI, Golang

## JSON

- [sclevine/yj](https://github.com/sclevine/yj)
  - Convert between YAML, TOML, JSON, HCL
- [json-iterator/go](https://github.com/json-iterator/go)
  - 替代 `encoding/json`
  - 更好性能，更多功能
    - 自定义类型解码
    - 宽松名字处理
- [go-faster/jx](https://github.com/go-faster/jx)
  - 高性能 JSON encode,decode
  - 不兼容 encoding/json - 因此才能提供性能优势
  - 不支持反射
  - 适用于代码生成场景
- [tidwall/gjson](https://github.com/tidwall/gjson)
  - Get Json Path
- [tidwall/sjson](https://github.com/tidwall/sjson)
  - Set Json Path
- [qri-io/jsonschema](https://github.com/qri-io/jsonschema)
- [xeipuuv/gojsonschema](https://github.com/xeipuuv/gojsonschema)
- [ugorji/go](https://github.com/ugorji/go)
  diomatic codec and rpc lib for msgpack, cbor, json, etc.

## 数据处理/Data

- [go-playground/validator](https://github.com/go-playground/validator)
  - struct 标签注解校验 - 类似于 Java 的 Bean Validate
  - 功能完善
- [go-validator/validator](https://github.com/go-validator/validator)
  - 实现简单 - 基础类型基础功能
- [go-ozzo/ozzo-validation](https://github.com/go-ozzo/ozzo-validation)
  - 校验库
- mapstructure
- [bytedance/go-tagexpr](https://github.com/bytedance/go-tagexpr)
  - 使用表达式 validate
- [BWbwchen/MapReduce](https://github.com/BWbwchen/MapReduce)

## 网络/Network

- [cloudwego/netpoll](https://github.com/cloudwego/netpoll)
  - non-blocking I/O networking framework, focused on RPC
- https://github.com/inetaf
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
  - grpc,ssh,http,https 同端口
- [songgao/water](https://github.com/songgao/water)
  TUN/TAP library written in native Go
- [name5566/leaf](https://github.com/name5566/leaf)
  game server framework in Go
- [xtaci/gonet](https://github.com/xtaci/gonet)
  Game Server Skeleton in golang.
- [nadoo/glider](https://github.com/nadoo/glider)
  - forward proxy with multiple protocols support
- [cilium/ebpf](https://github.com/cilium/ebpf)

## 协议/Protocol

- [hacdias/webdav](https://github.com/hacdias/webdav)
  - Simple Go WebDAV server

## 事件驱动/Event

- [temporal](../../service/workflow/temporal.md)
- [uber/cadence](../../service/workflow/cadence.md)
  - distributed, scalable, durable, and highly available orchestration engine
  - execute asynchronous long-running business logic
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

## 服务框架/Service Framework

- [dapr/dapr](https://github.com/dapr/dapr)
  portable, event-driven, runtime for building distributed applications
  - Sidecar 模式
  - 微软 项目
- [AsynkronIT/protoactor-go](https://github.com/AsynkronIT/protoactor-go)
  - Proto Actor - Ultra fast distributed actors for Go, C# and Java/Kotlin
- [wasmCloud/wasmCloud](https://github.com/wasmCloud/wasmCloud)
  - wasm actor 平台 - 支持 tinygo
- [RichardKnop/machinery](https://github.com/RichardKnop/machinery)
  asynchronous task queue/job queue based on distributed message passing
- [hibiken/asynq](https://github.com/hibiken/asynq)
  - MIT, Golang
  - Redis
  - Simple, reliable, and efficient distributed task queue in Go
- [twitchtv/twirp](https://github.com/twitchtv/twirp)
  simple RPC framework with protobuf service definitions
  - protobuf+net/http
- [gogf/gf](https://github.com/gogf/gf)

## 微服务框架/Microservices Framework

大多微服务框架着重于 RPC、服务发现、配置，并提供基础的中间件 监控、Trace。

- [stefanprodan/podinfo](https://github.com/stefanprodan/podinfo)
- [go-kit/kit](https://github.com/go-kit/kit)
  standard library for microservices
  - 简单灵活自由拼装 - 因此定位是 kit 和 库
  - 很多抽象接口值得学习
- [go-micro](./lib/go-micro.md) - [asim/go-micro](https://github.com/asim/go-micro)
  standalone framework for distributed systems development
- [google/go-cloud](https://github.com/google/go-cloud)
  - Go Cloud Development Kit
- [nytimes/gizmo](https://github.com/nytimes/gizmo)
- [ergo-services/ergo](https://github.com/ergo-services/ergo)
  - design patterns of Erlang/OTP

**国产**

- [kratos](./lib/kratos.md) - [go-kratos/kratos](https://github.com/go-kratos/kratos)
  - grpc,wire
  - kratos 命令行工具
  - 哔哩哔哩 RPC 框架
- [go-zero](./lib/go-zero.md) - [zeromicro/go-zero](https://github.com/zeromicro/go-zero)
  - 好未来技术
  - 自定义 DSL + goctl 生成
- [cloudwego/kitex](https://github.com/cloudwego/kitex)
  - Apache-2.0, Go
  - 字节跳动 RPC 框架
- [rpcx](./lib/rpcx.md) - [smallnest/rpcx](https://github.com/smallnest/rpcx)
- [go-chassis/go-chassis](https://github.com/go-chassis/go-chassis)
- [unionj-cloud/go-doudou](https://github.com/unionj-cloud/go-doudou)

## 国内环境

- [wenerme/go-wecom](https://github.com/wenerme/go-wecom)
- [go-pay/gopay](https://github.com/go-pay/gopay)

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
- [Permify/permify-gorm](https://github.com/Permify/permify-gorm)

## 扩展/Extension

- [plugin](https://pkg.go.dev/plugin)
  - -buildmode=plugin
    - 只支持 Linux, FreeBSD, macOS - dlopen
    - 需要 **cgo** - [#19569](https://github.com/golang/go/issues/19569)
  - Lookup symbol 强转类型进行使用 - 类似 dlopen - 底层使用 dlopen
  - main 下 exported 的符号都可以使用
  - 加载时所有包的 init 都会触发
  - plugin 不支持 close - go 涉及到 gc 和全局状态
  - 交互不需要序列化 - 相同内存空间
- [hashicorp/go-plugin](https://github.com/hashicorp/go-plugin)
  - 基于 RPC 的插件系统
    - 交互信息需要序列化
    - 用于专门的场景 - 例如不能用于 Hook HTTP 请求
  - 多进程
    - 隔离 cgo
    - 避免 crash
    - 支持热升级
    - 多语言

## 语言/Language

- [rogchap/v8go](https://github.com/rogchap/v8go)
  - 内含预编译的静态 libv8
  - alpine 需要额外构建 [v8go#170](https://github.com/rogchap/v8go/issues/170)
- [augustoroman/v8](https://github.com/augustoroman/v8)
  - V8 Binding
  - 🚧 不再维护
- [mvdan/sh](https://github.com/mvdan/sh)
  Shell parser, formatter, interpreter
  - source APKBUILD https://gitlab.alpinelinux.org/kdaudt/atools-go
- [mvdan/gofumpt](https://github.com/mvdan/gofumpt)
  stricter gofmt
- [burrowers/garble](https://github.com/burrowers/garble)
  - BSD-3
  - 混淆 Go 代码 - 替代现有 go 工具
- [mjibson/sqlfmt](https://github.com/mjibson/sqlfmt)
- [d5/tengo](https://github.com/d5/tengo)
  - MIT
  - 自定义的语言
- [dop251/goja](https://github.com/dop251/goja)
  - Javascript
  - +6MB
- [Shopify/go-lua](https://github.com/Shopify/go-lua)
  - MIT
  - Lua 5.2 VM
  - 兼容 luac 编译结果
- [yuin/gopher-lua](https://github.com/yuin/gopher-lua)
  - MIT
  - Lua 5.1
- [google/starlark-go](https://github.com/google/starlark-go)
  - Python
  - used by Caddy, Bazel
- [traefik/yaegi](https://github.com/traefik/yaegi)
  - by Traefik
  - Apache-2.0
  - +14MB
  - 自定义类型需要源码 - 配置 GOPATH - 对依赖的模块进行 vendor
  - 支持解释模式和编译模式
  - Yaegi is Another Elegant Go Interpreter

## Template

- [Masterminds/sprig](https://github.com/Masterminds/sprig) - 提供大量模板函数
- [gliderlabs/sigil](https://github.com/gliderlabs/sigil)
- [hairyhenderson/gomplate](https://github.com/hairyhenderson/gomplate) - 支持数据源的命令行模板
  - slim - UPX - https://github.com/hairyhenderson/gomplate/issues/326

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
- [Go in a scratch VM](https://syslog.ravelin.com/a28c14e82a51)
- 游戏
  - [Lallassu/bintris](https://github.com/Lallassu/bintris)
- 算法
  - [smarty-archives/mafsa](https://github.com/smarty-archives/mafsa)
    - Minimal Acyclic Finite State Automata
  - [blevesearch/vellum](https://github.com/blevesearch/vellum)
    - FST

## 控制理论 / Control theory

- [Reactive planning and reconciliation in Go](https://gianarb.it/blog/reactive-planning-and-reconciliation-in-go)
- [spotahome/gontroller](https://github.com/spotahome/gontroller)
  - [Gontroller: a Go library to create reliable feedback loop controllers](https://product.spotahome.com/832d4a9522ea)
- [gianarb/planner](https://github.com/gianarb/planner)
- [konimarti/lti](https://github.com/konimarti/lti)

## Library

- cron
  - [adhocore/gronx](https://github.com/adhocore/gronx) cron parser
- vfs
  - [hack-pad/hackpadfs](https://github.com/hack-pad/hackpadfs)
- cache
  - [coocood/freecache](https://github.com/coocood/freecache)
- goroutine
  - [oklog/run](https://github.com/oklog/run)
  - [golang.org/x/sync/errgroup](https://pkg.go.dev/golang.org/x/sync/errgroup)
- error
  - [github.com/pkg/errors](https://github.com/pkg/errors)
  - [github.com/hashicorp/go-multierror](https://github.com/hashicorp/go-multierror)
  - [go.uber.org/multierr](https://github.com/uber-go/multierr)
  - [cockroachdb/errors](https://github.com/cockroachdb/errors)
- compress/archive
  - [github.com/mholt/archiver](https://github.com/mholt/archiver)
    - 各种压缩包
  - [github.com/nwaples/rardecode](https://github.com/nwaples/rardecode)
    - rar
  - [klauspost/compress](https://github.com/klauspost/compress)
  - [andybalholm/brotli](https://github.com/andybalholm/brotli)
- magic/mime
  - [wenerme/go-magic](https://github.com/wenerme/go-magic)
- charset
  - golang.org/x/text/encoding/charmap
  - golang.org/x/text/encoding/simplifiedchinese
  - golang.org/x/net/html/charset
  - https://github.com/saintfish/chardet
  - https://github.com/djimenez/iconv-go
    - iconv cgo binding
- nlp
  - [liuzl/gocc](https://github.com/liuzl/gocc)
    - [BYVoid/OpenCC](https://github.com/BYVoid/OpenCC)
      - C++
- lang
  - [golang.org/x/text/language](https://pkg.go.dev/golang.org/x/text/language)
  - https://go.dev/blog/matchlang
- distributed/分布式
  - [hashicorp/memberlist](https://github.com/hashicorp/memberlist)
- hash
  - [minio/sha256-simd](https://github.com/minio/sha256-simd)
- media
  - [Kagami/go-avif](https://github.com/Kagami/go-avif)
- http
  - support content negotiation [#19307](https://github.com/golang/go/issues/19307)
    - 解析 Accept https://github.com/markusthoemmes/goautoneg/blob/master/accept.go
    - [elnormous/contenttype](https://github.com/elnormous/contenttype)
- saas/paas
  - [tsuru/tsuru](./lib/tsuru.md)
    - BSD-3
    - PaaS
  - [Goxiaoy/go-saas](https://github.com/Goxiaoy/go-saas)
  - [geeks-accelerator/oss/saas-starter-kit](https://gitlab.com/geeks-accelerator/oss/saas-starter-kit)
    - 2019
- semver
  - [hashicorp/go-version](https://github.com/hashicorp/go-version)
- 数据结构/算法
  - [shivamMg/trie](https://github.com/shivamMg/trie)
- [SimonWaldherr/golang-benchmarks](https://github.com/SimonWaldherr/golang-benchmarks)

## Tool

- [arl/statsviz](https://github.com/arl/statsviz)
  - visualization of your Go application runtime statistics (GC, MemStats, etc.) in the browser
- [mgechev/revive](https://github.com/mgechev/revive)
- golint
- [jondot/goweight](https://github.com/jondot/goweight)
  - 分析 go 模块大小
- [google/bloaty](https://github.com/google/bloaty)
  - 二进大小分析
- [xo/usql](https://github.com/xo/usql)
  - SQL 命令行工具
- [google/gops](https://github.com/google/gops)
  - Go 进程诊断
- [google/ko](https://github.com/google/ko)
  Build and deploy Go applications on Kubernetes
- [go-task/task](https://github.com/go-task/task)
- [charmbracelet/wish](https://github.com/charmbracelet/wish)
  - Make SSH apps
- [elves/elvish](https://github.com/elves/elvish)
- ssh
  - [golang.org/x/crypto/ssh](https://pkg.go.dev/golang.org/x/crypto/ssh)
    - x/crypto/ssh: rsa-sha2-256/rsa-sha2-512 [#49952](https://github.com/golang/go/issues/49952)
    - 服务端 /etc/ssh/sshd_config 添加 `PubkeyAcceptedAlgorithms +ssh-rsa` 可临时解决
    - AlpineLinux 3.15 新版本 openssh server 默认不允许 ssh-rsa
      - openssh 8.8 废弃 ssh-rsa
  - [k0sproject/rig](https://github.com/k0sproject/rig)
  - [appleboy/easyssh-proxy](https://github.com/appleboy/easyssh-proxy)
  - [owenthereal/upterm](https://github.com/owenthereal/upterm)
  - [gliderlabs/ssh](https://github.com/gliderlabs/ssh)
    - SSH Server
- shell
  - [google/shlex](https://github.com/google/shlex)

```bash
go install github.com/jondot/goweight@latest
cd cmd/server
goweight
```

## Debug

- profiling
  - [pyroscope-io/pyroscope](https://github.com/pyroscope-io/pyroscope)
- log
  - [maruel/panicparse](https://github.com/maruel/panicparse)
- metrics
  - [felixge/httpsnoop](https://github.com/felixge/httpsnoop)
  - [github.com/slok/go-http-metrics](https://github.com/slok/go-http-metrics)
    -prometheus 内置 handler 拦截
- GODEBUG=http1debug
- GODEBUG=http2debug=2

## Service

- [umputun/remark42](https://github.com/umputun/remark42) comment egnine
- [ortuman/jackal](https://github.com/ortuman/jackal)
  - XMPP
- [google/martian](https://github.com/google/martian)
  - building custom HTTP/S proxies

## Performance

- [bspaans/jit-compiler](https://github.com/bspaans/jit-compiler)
- [Writing a JIT compiler in Golang](https://medium.com/kokster/964b61295f)
- [Go Performance Tools Cheat Sheet](https://steveazz.xyz/blog/go-performance-tools-cheat-sheet/)
- [CPU Utilization is Wrong](http://www.brendangregg.com/blog/2017-05-09/cpu-utilization-is-wrong.html)

## OS/操作系统

- [rainycape/governator](https://github.com/rainycape/governator)
  - process manager for UNIX systems
- [ochinchina/supervisord](https://github.com/ochinchina/supervisord)
- [immortal/immortal](https://github.com/immortal/immortal)
- [willscott/go-nfs](https://github.com/willscott/go-nfs)
- [kahing/goofys](https://github.com/kahing/goofys)
- [progrium/macdriver](https://github.com/progrium/macdriver)
  - Native Mac APIs for Go
- [gokrazy/gokrazy](https://github.com/gokrazy/gokrazy)
  - Go+Linux Kernel+RPi firmware on Board
- [lmorg/murex](https://github.com/lmorg/murex)
  - Bash-like

## Lower Level

- [mmcloughlin/avo](https://github.com/mmcloughlin/avo)
  - Generate x86 Assembly with Go
- [twitchyliquid64/golang-asm](https://github.com/twitchyliquid64/golang-asm)

## ML/机器学习

- [sjwhitworth/golearn](https://github.com/sjwhitworth/golearn) is a 'batteries included' machine learning library for Go. Simplicity, paired with customisability, is the goal.
- [cdipaolo/goml](https://github.com/cdipaolo/goml) is a machine learning library written entirely in Golang which lets the average developer include machine learning into their applications.
- [chewxy/gorgonia](https://github.com/chewxy/gorgonia) is a library that helps facilitate machine learning in Go. Write and evaluate mathematical equations involving multidimensional arrays easily.

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

## Command Line

- [charmbracelet/bubbletea](https://github.com/charmbracelet/bubbletea)
  TUI framework

## Office

- [pdfcpu/pdfcpu](https://github.com/pdfcpu/pdfcpu)

## Internal

- https://github.com/emluque/golang-internals-resources
- https://github.com/teh-cmc/go-internals
- https://www.altoros.com/blog/golang-internals-part-1-main-concepts-and-project-structure/
- https://github.com/golang/go/tree/master/src/cmd/compile

## Tools

- https://github.com/natesales/q
  - GPL-3.0
  - command line DNS client with support for UDP, TCP, DoT, DoH, DoQ and ODoH
  - [ogham/dog](https://github.com/ogham/dog)

## 参考

- https://github.com/orgs/google/repositories?q=&type=all&language=go&sort=stargazers

# TBD

### Utils

- [jinzhu/now](https://github.com/jinzhu/now)
  Now is a time toolkit for golang
- [benmanns/goworker](https://github.com/benmanns/goworker)
  Go-based background worker
- [dustin/go-humanize](https://github.com/dustin/go-humanize)
  - 格式化数据大小, 时间和数字等
- [dropbox/godropbox](https://github.com/dropbox/godropbox)
  Common libraries for writing Go services/applications.
- [asciimoo/wuzz](https://github.com/asciimoo/wuzz)
  Interactive cli tool for HTTP inspection
- [goreleaser/goreleaser](https://github.com/goreleaser/goreleaser)
  Deliver Go binaries as fast and easily as possible

### Console

- [jroimartin/gocui](https://github.com/jroimartin/gocui)
  Minimalist Go package aimed at creating Console User Interfaces.
- [nsf/termbox-go](https://github.com/nsf/termbox-go)
  Pure Go termbox implementation

### Data

- https://github.com/Workiva/go-datastructures
- https://github.com/emirpasic/gods

### Web

- Auth
  - https://github.com/markbates/goth
    - Package goth provides a simple, clean, and idiomatic way to write authentication packages for Go web applications.
- https://gitea.com/lunny/tango

### Misc

- https://github.com/geziyor/geziyor
- https://github.com/alexflint/go-restructure
- https://github.com/pointlander/peg Peg, Parsing Expression Grammar
- https://github.com/hanwen/go-fuse

### Hardware

- https://github.com/ycoroneos/golang_embedded
- [ycoroneos/G.E.R.T](https://github.com/ycoroneos/G.E.R.T)
  - Golang Embedded Run-Time
  - https://news.ycombinator.com/item?id=15591847
  - https://news.ycombinator.com/item?id=14590847
- https://bugs.alpinelinux.org/issues/4276
  - gcc-arm-none-eabi

## Scripts

- https://github.com/peterh/liner
  line editor with history
- https://github.com/dop251/goja
  ECMAScript/JavaScript engine
- https://github.com/elves/elvish
