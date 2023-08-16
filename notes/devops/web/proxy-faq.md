---
title: Proxy FAQ
tags:
  - FAQ
---

# Web Server FAQ

:::tip

- 应用服务器 - nginx, caddy, traefik
  - 功能为主
- 负载均衡服务器 - haproxy, keepalived
  - 性能为主
- VIP - 路由到单一节点 - HA、floating IP
  - 基于冗余路由 或 BGP
- 负载均衡 - 根据算法路由到多个节点

:::

## Perf

- https://blog.tjll.net/reverse-proxy-hot-dog-eating-contest-caddy-vs-nginx/
  - https://news.ycombinator.com/item?id=32865497

## SOCKS vs HTTP vs HTTPS

- HTTP
  - 支持最广泛的协议
  - 基于 HTTP 的 CONNECT 方法 - 7 层协议
  - wget 只支持 http
  - 一般支持 Basic 鉴权
  - 请求是明文感知更多细节
  - 支持复杂转发逻辑 - privoxy
    - 路径, 域名, 头
    - 更加智能的转发
  - 可以配合缓存服务使用
    - 例如 squid - 需结合 tls 使用
  - 可以做 TCP 通道
- SOCKS
  - 支持程度仅次于 HTTP
  - TCP 协议 - 5 层协议
  - 支持 UDP
  - 最容易的协议 - `ssh -d 1080`
  - 基于握手进行协商，一个地址一个端口进行映射
  - DNS 在远程进行解析
- HTTPS
  - 使用少
  - HTTP + TLS

## WebServer vs Proxy

- WebServer - nginx, apache
  - 支持静态文件
  - 支持 cgi, fastcgi 等应用协议
- Proxy - haproxy
  - 支持 HTTP, HTTPS
  - 支持 TCP, UDP

---

WebServer 也可以是 Proxy

## Caddy vs Traefik

- Caddy
  - 定位是 Web 服务器
  - 特点是 HTTP2、自动 HTTPS
  - ~~V2 版本还在开发中 - 变化很大~~
  - 支持多 acme 服务商
  - 支持作为 acme 服务商
- Traefik
  - 定位是微服务下的负载均衡、边界路由、反向代理
  - 偏向 Cloud Native
  - 对 K8S 支持较好 - 支持作为 Ingress
  - V2 版本调整了前后端概念 - 结构更加清晰易于配置
  - 支持 TCP 和 SNI 负载路由
  - acme 不支持分布式 - 付费

### Nginx vs HAProxy

- Nginx
  - 擅长应用层控制
  - 支持 Web Hosting
  - 作为负载均衡限流能力较弱
  - 统计指标少
  - 支持 TCP 和 UDP
  - 更多应用层面的感知 - 7 层
  - 通过模块提供各种功能
  - 收费版 [Nginx Plus](https://www.nginx.com/products/nginx/#compare-versions)
  - ⚠️ 社区版 upstream 的 host 不会变 - 不会随 dns 变化 - 对于 LB 来说比较致命
- HAProxy
  - 擅长负载均衡
  - 不支持作为 Web 服务器
  - 比 Nginx 更擅长 SSL offload / SSL terminate
  - 主要角色是负载均衡
  - 支持非常多的限流策略
  - 支持非常多的统计指标
  - 不支持 UDP [#62](https://github.com/haproxy/haproxy/issues/62)
    - 如果是 DNS 负载推荐用 [dnsdist](https://dnsdist.org)
    - 2.3 开始支持 QUIC 支持部分 UDP 负载
  - 代码量和逻辑比 Nginx 简单
  - 收费版 - [HAProxy EE](https://www.haproxy.com/products/community-vs-enterprise-edition/)

---

- 选择 HAProxy
  - 负载均衡
  - SSL Offload
  - 入口 - SNI、反向代理、SSL Offload
  - 希望看到状态和监控
- 选择 Nginx
  - 需要托管网站
  - 需要应用层控制
  - 需要实现应用网关

## Caddy v1 vs Caddy v2

- Caddy v1
  - 通过配置文件配置 - 简单/功能有限
  - 全量 reload
- Caddy v2
  - 通过接口配置 - 更加灵活/复杂
  - 方便拓展
  - 可以 API 控制
  - 细粒度动态配置

## HAProxy vs Keepalived

- HAProxy
  - 支持 4 层 TCP 和 7 层 HTTP
  - 感知部分 4 层协议 - 例如 syslog
  - 反向代理
- Keepalived
  - 支持 4 层 TCP、UDP 负载
  - 用于实现 VIP

两者面向不同场景，大部分使用使用 haproxy，如果需要 udp 考虑 keepalived 或者 nginx。

## Varnish vs Squid vs HAProxy

都是 HTTP 缓存服务

- [varnish](./varnish.md)
  - ingress
  - 提供服务 - 服务端 - 上游一般为内部服务
- [squid](../../service/network/squid.md)
  - egress
  - 消费服务 - 使用端 - 上游一般为外部服务
- HAProxy
  - ingress
  - 内存缓存
  - 缓存功能业余
  - 可配合 varnish 使用

---

- [HAProxy’s Load-Balancing Algorithm for Static Content Delivery with Varnish](https://www.haproxy.com/blog/haproxys-load-balancing-algorithm-for-static-content-delivery-with-varnish/)
- [HAProxy and Varnish Comparison](https://www.haproxy.com/blog/haproxy-and-varnish-comparison/)

## httping

```bash
alias httping="curl --silent --max-time 1 --output /dev/null --fail --head"
```

- https://github.com/pjperez/httping
