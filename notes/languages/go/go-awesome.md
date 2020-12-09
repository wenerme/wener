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
