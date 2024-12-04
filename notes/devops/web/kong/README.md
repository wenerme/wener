---
title: Kong
---

# Kong Gateway

- [kong](https://github.com/Kong/kong)
  - Apache-2.0, OpenResty + LUA + lua-kong-nginx-module
  - [REST Admin API](https://docs.konghq.com/latest/admin-api/)
  - 支持 Golang 插件
  - [CHANGELOG](https://github.com/Kong/kong/blob/master/CHANGELOG.md)
  - [kong.conf.default](https://github.com/Kong/kong/blob/master/kong.conf.default)
- 8000 - HTTP 监听端口
- 8443 - HTTPS 监听端口
- 8001 - 管理接口 HTTP
- 8444 - 管理接口 HTTPS

:::tip

- v3 支持 db-less - 直接通过 YAML 配置

:::

:::caution

- 限制非常多， 不如用 [apisix](../apisix.md)
- EE 版本 - [ee vs gateway](https://docs.konghq.com/gateway/latest/)
  - ws,wss
  - rbac
  - GraphQL
  - OAuth, OIDC, LDAP, JWT
  - OPA AuthZ
  - Secret
  - API Analytics

:::

## Notes

- 概念
  - Service
    - 服务定义 - 包含 路由、上游、插件
    - 被请求的对象
  - Route
    - 路由定义 - 包含 主机、路径、来源、目标
    - 关联一个服务
  - Upstream
    - 上游定义 - 包含 目标、健康检查、负载均衡
  - Consumer
    - 消费者 - 即用户/应用 - 包含 插件、各种授权、ACL 分组
  - Plugin
    - 插件定义 - 关联预定义的插件、服务、路由、消费者
  - Certificate
    - 证书 - 证书、密钥、SNI
- 特性
  - 鉴权
  - 流控 - 管理限流进出 API 流量
  - 分析 - 审查和监控微服务接口流量
  - 转换 - 实时转换请求和响应
  - 日志 - 发送日志到日志存储服务
  - 无服务 - 通过 API 请求函数
- 企业版
  - GraphQL 缓存 - graphql-proxy-cache-advanced
  - GraphQL 流控 - graphql-rate-limiting-advanced
- 安装
  - https://bintray.com/package/files/kong/kong-alpine-tar/alpine
  - [源码安装](https://docs.konghq.com/install/source)
  - Alpine https://github.com/Kong/docker-kong/blob/master/alpine/Dockerfile
- 问题
  - [#4490](https://github.com/Kong/kong/issues/4490) - 不支持基于端口路由

## Awesome

### UI

- [pantsel/konga](https://github.com/pantsel/konga)
  - 开发不太活跃
  - 需要数据库
  - EJS
- [PGBI/kong-dashboard](https://github.com/PGBI/kong-dashboard)
  - 没有在维护
  - Angular 1
- [pocketdigi/kong-admin-ui](https://github.com/pocketdigi/kong-admin-ui)
  - 没怎么维护
  - Vue
  - http://kong-admin.pocketdigi.com/
  - `docker run -d --name kong-admin-ui -p 8899:80 pocketdigi/kong-admin-ui:0.4.0`
- [ajaysreedhar/kongdash](https://github.com/ajaysreedhar/kongdash)
  - electron 应用
