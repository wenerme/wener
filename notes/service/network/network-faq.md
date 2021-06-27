---
title: Network FAQ
---

# Network FAQ

## TURN vs STUN

- STUN
  - 实现 NAT 穿透、端口映射
  - 实现信令能力
  - 资源占用低，服务器流量很小
  - 通常有公共的 stun 服务 - 无需授权
- TURN
  - 中继，无法 NAT 穿透时
  - 实现中继代理请求
  - 资源占用高，服务器流量大
  - 不存在公共的 turn 服务 - 通常需要授权
