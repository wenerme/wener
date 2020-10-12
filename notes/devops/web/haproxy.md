---
id: haproxy
title: HAProxy
---

# HAProxy

## Tips
* [haproxy.com](https://www.haproxy.com/) - The #1 Open Source Software Load Balancer and Application Delivery Controller
* 最擅长 __负载均衡__
* 注意
  * 不能转发 UDP
* 特性
  * L4(TCP) L7(HTTP) 负载均衡
  * URL 重写
  * 限流
  * SSL/TLS termination/offload
  * Gzip
  * 支持 HTTP 代理协议
  * 监控检查
  * 链接和HTTP日志
  * HTTP/2
  * 多线程
  * 无缝重载
  * gRPC
  * Lua 和 SPOE 支持
  * L4 重试
  * 简单熔断机制
* 参考
  * [HAProxy at GitHub](https://www.haproxy.com/user-spotlight-series/inside-the-github-load-balancer/)
  * [5 Ways to Extend HAProxy with Lua](https://www.haproxy.com/blog/5-ways-to-extend-haproxy-with-lua/)
  * [Using HAProxy as an API Gateway](https://www.haproxy.com/blog/using-haproxy-as-an-api-gateway-part-3-health-checks/)

## metrics
* https://www.haproxy.com/blog/haproxy-exposes-a-prometheus-metrics-endpoint/
* https://www.haproxy.com/blog/exploring-the-haproxy-stats-page/
