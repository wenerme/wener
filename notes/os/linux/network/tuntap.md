---
title: tuntap
---

# tuntap

- tun
  - L3 - TCI/IP
- tap
  - L2 - Ethernet

```bash
ip tuntap add tap0 mode tap         # user $(id -u) group $(id -g)
ip addr add 172.20.0.1/24 dev tap0
ip link set tap0 up
```
