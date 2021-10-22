---
title: HAProxy Version
---

# HAProxy Version

| version | release date |
| ------- | ------------ |
| 2.4     | 2021-05-13   |
| 2.3     | 2020-11-05   |

## HAProxy 2.4

> 变化非常大

- 协议
  - HTTP2/WebSocket
    - [rfc8441](https://tools.ietf.org/html/rfc8441) HTTP CONNECT
  - FIX - Financial Information eXchange
  - MQTT
    - 包有效性校验
    - 基于客户端标识路由
- 负载均衡
  - 支持 TCP DNS
  - 熔断增强 - http_fail_cnt, http_fail_rate
- SSL/TLS
  - 动态 SSL 证书存储 - 不再需要重启
  - 允许动态 SNI 链接复用 - `sni req.hdr(host)`
- Observability
  - 内置 OpenTracing
  - Prometheus 增加指标
  - 统计增加 SSL/TLS 模块相关 - `stats show-modules`
- 缓存
  - 支持 Vary 头 - `process-vary on`
  - 最大缓存条目控制 - `max-secondary-entries 10`
- 配置
  - 支持预处理
    - `.if <condition> ... .elif <condition> ... .else ... .endif`
    - `.diag`, `.notice`, `.warning`, `.alert`
      - -dD 显示诊断信息
    - 条件
      - `defined(<name>)`
      - `feature(<name>)` - `haproxy -vv`
        - OT - OpenTracing
      - `streq(<str1>,<str2>)`, `strneq(<str1>,<str2>)`
      - `version_atleast(<ver>)`, `version_before(<ver>)`
  - 默认路径 - `default-path`
  - 默认命名 - `default http-defaults from tcp-defaults`
  - 动态超时 - `http-request set-timeout`
  - TCP 升级 HTTP - fe tcp, be http - `tcp-request content switch-mode`
  - 匹配删除 HTTP 头 - `http-request del-header X-Forwarded -m beg`
  - 新增实验模式 - 开启实验功能
    - 动态服务、变量修改
- Lua
  - 多线程 - `lua-load-per-thread`
- 参考
  - [Announcing HAProxy 2.4](https://www.haproxy.com/blog/announcing-haproxy-2-4)

## HAProxy 2.3

- 链接增强 - 为支持 QUIC 和 UDP 做准备
  - 完善 Linux keepalive - 支持 sysctl 修改参数
- 协议 - Syslog TCP/UDP
- 负载均衡
  - balance uri path-only - 解决 HTTP1 和 HTTP2 地址不一样问题
- SSL/TLS
  - 允许静态 SNI 链接复用 - `sni str(example.local)`
- Observability
  - stats HTTP 2 信息 - `stats show-modules`
  - 基于 SPOE 集成 OpenTracing
- Lua 5.4
- 参考
  - [Announcing HAProxy 2.3](https://www.haproxy.com/blog/announcing-haproxy-2-3)
