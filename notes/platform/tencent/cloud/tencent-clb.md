---
title: 腾讯云 CLB
tags:
  - LB
---

# CLB

腾讯云 CLB 在 HTTPS listener 终止或代理前端请求后，可使用请求头向后端保留客户端到 CLB 的原始协议语义。后端协议为 HTTP 时，这一信息尤其重要，因为后端连接本身无法区分前端请求原本是 HTTP 还是 HTTPS。

## 转发请求头

| header | 值 | 说明 |
| ------ | -- | ---- |
| `X-Client-Proto` | `HTTP` / `HTTPS` | CLB 转发请求到后端时植入，表示客户端访问 CLB 所使用的前端协议。 |

### X-Client-Proto

- `X-Client-Proto: HTTP`：客户端以 HTTP 请求 CLB。
- `X-Client-Proto: HTTPS`：客户端以 HTTPS 请求 CLB。
- 典型场景：CLB 接收 HTTPS，但以 HTTP 转发到后端。应用、Nginx 或网关可据此生成正确的 absolute URL、Cookie `Secure` 策略和 HTTPS redirect 行为。
- 该字段描述的是客户端到 CLB 的协议，不描述 CLB 到后端的连接协议；两段链路可不同。
- 指定官方页面只定义 `X-Client-Proto` 的取值。CLB 的个性化配置页将 `X-Forwarded-Proto` 列为默认下发的保留字段，但未在公开字段说明中定义其值构造规则；应用若需要标准化协议字段，应先确认实际 listener 配置和请求观测结果。
- 后端应仅在网络边界确保请求经受信任 CLB 转发后才信任该类协议头；若后端端口可被外部直接访问，客户端可以伪造同名 HTTP header。

## 其他 CLB 相关字段

### 真实客户端地址

`X-Forwarded-For`

: 公网七层 IPv4/IPv6 CLB 默认提供的真实客户端 IP 获取方式。
: CLB 与后端使用长连接时，后端连接的 peer IP 不再是客户端 IP，应从该字段获取。应用需要按受信任代理边界解析多跳 `X-Forwarded-For`，不能无条件信任客户端自行携带的首个值。

`X-Real-IP`

: 被 CLB 列为默认下发且禁止通过个性化配置覆盖的保留字段。
: 已查到的公开页面没有给出它的独立值构造规则；真实 IP 需求应优先按官方明确说明的 `X-Forwarded-For` 实现。

### 可通过七层个性化配置添加的请求字段

CLB 的 `proxy_set_header` 支持向后端添加下列字段。`X-Real-Port` 是文档列出的默认配置；其他字段需要在个性化配置中显式选择，不应假定默认存在。

| header | 值来源 | 用途 |
| ------ | ------ | ---- |
| `X-Real-Port` | `$remote_port` | 客户端源端口。 |
| `X-clb-lbid` | `$lbid` | CLB 实例标识。 |
| `Stgw-request-id` | `$stgw_request_id` | CLB 内部请求 ID，不应作为业务幂等键。 |
| `X-Forwarded-Port` | `$vport` | CLB listener 端口。 |
| `X-Method` | `$request_method` | 客户端 HTTP 方法。 |
| `X-Uri` | `$uri` | 客户端请求 URI 路径。 |
| `X-Args` | `$args` | 客户端请求参数。 |

### CLB 保留字段

CLB 的七层个性化配置文档将以下名称列为默认下发、禁止覆盖的 header：`X-Stgw-Time`、`Host`、`X-Client-Proto`、`X-Forwarded-Proto`、`X-Client-Proto-Ver`、`X-Client-Spdy`、`X-Real-IP`、`X-Forwarded-For`、`Upgrade`、`Connection`。

- 这表示名称由 CLB 管理，不等于每个字段都有公开、稳定的值格式合同。
- 当前公开资料对 `X-Client-Proto` 和 `X-Forwarded-For` 提供了直接使用语义；对于 `X-Forwarded-Proto`、`X-Client-Proto-Ver`、`X-Client-Spdy` 和 `X-Stgw-Time`，在缺少字段值说明或实际 listener 验证前，不应将其作为应用安全或业务逻辑的唯一依据。
- HTTPS listener 默认开启 HTTP/2 时，CLB 转发到后端的 header 名会转换为小写。HTTP header 名本身大小写不敏感，但自定义中间件、日志解析或错误的大小写敏感代码需要修正。

### 非 HTTP header：Proxy Protocol v2

- Proxy Protocol v2 仅适用于标准账户。官方列出的适用 listener 为 IPv4/IPv6 实例的 TCP、UDP、TCP SSL、QUIC；其中 IPv6 TCP/UDP 配置仍处于灰度阶段，需要以控制台可用性或工单结果为准。
- 启用后，CLB 会在连接开头以二进制格式携带源 IP、源端口和传输协议。
- 它不是 HTTP request header，后端必须显式支持并启用 Proxy Protocol v2；直接对不支持的服务开启会造成连接解析失败，且官方说明该切换不支持在线平滑迁移。

## 参考

- [HTTPS 转发配置入门指南：HTTP、HTTPS 头部标识](https://cloud.tencent.com/document/product/214/6534)
- [七层个性化配置](https://cloud.tencent.com/document/product/214/15171)
- [负载均衡配置相关](https://cloud.tencent.com/document/product/214/5411)
- [IPv4 CLB 场景下获取客户端真实 IP](https://cloud.tencent.com/document/product/214/3728)
- [后端服务器通过 CLB 获取客户端真实 IP：Proxy Protocol v2](https://cloud.tencent.com/document/product/214/118937)
