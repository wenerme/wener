---
title: Router
tags:
  - Network
  - Router
  - Routing
---

# Router

- [FRRouting](https://frrouting.org/)
  - FRRouting (FRR) is an IP routing protocol suite for Linux and Unix platforms which includes protocol daemons for BGP, IS-IS, LDP, OSPF, PIM, and RIP.

```bash
# Linux
sudo route add -net 10.67.0.0/16 gw 192.168.120.254

# macOS
sudo route -n add -net 10.67.0.0/16 192.168.120.254
```
