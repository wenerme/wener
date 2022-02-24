---
title: Network FAQ
tags:
  - FAQ
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

## 简单的端口排查

```bash
# nc - busybox
# ==========
# UDP
nc -u -l -p 12345 -e cat
echo test | nc -u -w 2 127.0.0.1 12345
# TCP
nc -l -p 12345 -e cat
echo test | nc -w 2 127.0.0.1 12345

# ncat - nmap
# ==========
ncat -ulk -e /bin/cat 12345

# socat
# ==========
socat -u udp-l:12345,fork exec:/bin/cat
echo "test" | socat -u - udp:127.0.0.1:12345

socat -u tcp-l:12345,fork exec:/bin/cat
echo "test" | socat -u - tcp:127.0.0.1:12345
```
