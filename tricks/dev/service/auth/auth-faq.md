---
id: auth-faq
title: 认证授权常见问题
---

# 认证授权常见问题

## Proxy Auth vs Forward Auth
* Proxy - 代理授权
  * 拦截所有请求
  * 请求转发给上游
  * 不需要额外反向代理配置
  * 优势
    * 单次请求完成验证
  * 劣势
    * 实现更复杂
      * 除了需要实现 auth 能力还需要实现 proxy 能力
    * 可以不依赖额外 Nginx/反向代理 - 但一般都会有
      * 所以还是等同于多一次请求
    * 每个上游部署一个
* Forward - 转发授权
  * 网关请求时发起一个额外的认证请求
  * 需要配置额外的反向代理 - 但一般一个域名一次配置
  * 优势
    * 实现简单
    * 部署一个给多个上游使用
  * 劣势
    * 多一次请求
    * 无法传递额外信息到上游
      * 例如 无法传递 JWT 头

## louketo-proxy vs oauth2-proxy
* louketo
  * 代理授权为主
  * 类似于一个 Nginx 网关，流量从中过
  * 以集成 Keycloak 为主
  * 每个上游都需要部署一个
  * 脱胎于 Keycloak Gateway - 因此能更好与 KC 集成
    * 简易配置
    * 角色
    * 权限
    * 路径资源控制
    * 透传 logout 到 KC
* oauth2
  * 转发授权为主
  * 支持代理模式
  * 支持更多三方 Oauth2 集成
  * Nginx 请求之前验证
  * 简单的验证
  * 可以只部署一个给多个上游使用 - 转发模式
  * Keycloak 集成
    * 仅支持 `--keycloak-group`
    * 不支持 cookie-refresh
    * 无法访问原始 jwt 信息
    * 无法正确 logout
