---
title: 游戏加速器
---

# 游戏加速器

* DNS 服务
  * DNS 获取到 IP 和域名映射
  * DNS 上游尽量使用 dnscrypt
  * 尽量开启 DNSSEC
  * 最好能预判 IP 是否通
    * 减慢 DNS 解析
  * SQLite 记录查询 - 方便跟踪排查和生成路由
* 路由模式接入
  * 路由代理/透明代理 - 使用方便
  * 实时生成 ip ro 路由
  * 节点作为 AP
  * 需要开启 DHCP
  * 需要支持接收转发的节点 - 例如 tinc 组网
* 服务模式接入
  * 需要配置节点和节点支持协议
  * 支持更加灵活组网
  * HTTP Proxy 最通用
    * 直接知道代理域名
    * 可按需转发
    * TCP 协议
  * SOCKS 可实时判断 IP 决定是否路由
    * 不能路由 icmp 和 udp

* DNS 参考
  * https://github.com/AdguardTeam/dnsproxy - DoH, DoT, DoQ, DNSCrypt
  * https://github.com/ameshkov/dnslookup
  * https://github.com/d2g/dnsforwarder/blob/master/server.go
