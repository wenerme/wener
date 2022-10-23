---
title: tshark
---

# tshark

- [tshark.dev](https://tshark.dev/)
- 参考
  - [tshark.1](https://www.wireshark.org/docs/man-pages/tshark.html)
  - [Wireshark display filter syntax and reference](https://www.wireshark.org/docs/man-pages/wireshark-filter.html)
  - https://www.wireshark.org/docs/dfref/h/http.html

```bash
# interfaces
tshark -D

# filter
tshark -f "net 192.168.8.0/24"

# 只显示 req header
tshark tcp port 80 or tcp port 443 -V -R "http.request"
# 只显示 res header
tshark -V -Y "tcp.port == 80 && http.response"

# DHCP
tshark -i ethX -n port 68 -R 'bootp.type == 2'

# SNI
tshark -V -Y 'tcp.port==443 && ssl.handshake.extensions_server_name=="example.com"'
```

# FAQ

## Couldn't run /usr/bin/dumpcap in child process: Operation not permitted

- 运行时添加 --cap-add=NET_RAW --cap-add=NET_ADMIN

```bash
getcap $(which dumpcap)
# /usr/bin/dumpcap cap_net_admin,cap_net_raw=eip
```
