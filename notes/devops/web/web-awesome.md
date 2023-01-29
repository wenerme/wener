---
title: Awesome
tags:
  - Awesome
---

# Web Server Awesome

- [valeriansaliou/bloom](https://github.com/valeriansaliou/bloom)
  - MPLv2, Rust
  - HTTP REST API caching middleware

## Framework

- https://web-frameworks-benchmark.netlify.app/result

## Proxy

- 性能
  - iptables 转发性能最好，功能最弱
  - haproxy 作为负载均衡，大多时候性能够好，使用方便
  - nginx 功能比 haproxy 友好，逻辑处理能力和生态比 haproxy 好，性能可能弱于 haproxy
  - envoy 性能好，作为底层存在，对用户直接使用不友好，对 api 使用友好
  - treafik,caddy 对使用友好，性能可能弱于 nginx
- 性能因素
  - 并发
  - 延时
    - 平均响应时间
    - 长尾
  - RPS

---

- nginx
- haproxy
- caddy
- treafik
- [dlundquist/sniproxy](https://github.com/dlundquist/sniproxy)
- [NickMRamirez/Proxy-Benchmarks](https://github.com/NickMRamirez/Proxy-Benchmarks)
- [digitalocean/nginxconfig.io](https://github.com/digitalocean/nginxconfig.io)
  - nginx.conf webui
