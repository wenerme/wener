---
title: Web Server FAQ
tags:
  - FAQ
---

# Web Server FAQ

### Caddy vs Traefik

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
- 选择 HAProxy
  - 负载均衡
  - SSL Offload
  - 入口 - SNI、反向代理、SSL Offload
  - 希望看到状态和监控
- 选择 Nginx
  - 需要托管网站
  - 需要应用层控制
  - 需要实现应用网关

### Caddy v1 vs Caddy v2

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
- Keepalived
  - 支持 4 层 TCP、UDP 负载

两者面向不同场景，大部分使用使用 haproxy，如果需要 udp 考虑 keepalived 或者 nginx。
