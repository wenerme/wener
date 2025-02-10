---
title: redir
---

# redir

- redir 重定向 代理
- 支持 Linux, Android
- 将所有请求重定向到给定端口
- 透明代理
- 主要处理 TCP 连接转发，对于 UDP 或其他协议的转发通常不适用。
- 简单易用

```bash
sysctl -w net.ipv4.ip_forward=1

# e.g. gost tunnel
gost -L red://:12345?sniffing=true -F 192.168.1.1:1080
iptables -t nat -A OUTPUT -p tcp --match multiport ! --dports 12345,1080 -j DNAT --to-destination 127.0.0.1:12345
```

- 参考
  - https://gost.run/en/tutorials/redirect/
  - [troglobit/redir](https://github.com/troglobit/redir)
  - https://blog.waynecommand.com/post/gateway-proxy
