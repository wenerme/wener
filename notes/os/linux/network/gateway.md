---
title: gateway
---

# gateway

- gateway = forward + NAT

```bash
# 确认启用 forward
sysctl net.ipv4.ip_forward
sysctl -w net.ipv4.ip_forward=1

# 持久化配置
echo net.ipv4.ip_forward=1 | sudo tee /etc/sysctl.d/99-gateway.conf
sysctl -p /etc/sysctl.d/99-gateway.conf

# test gateway
# ====================
IP=$(dig +short ipv4.icanhazip.com | tail -1)
curl -H 'Host: icanhazip.com' $IP

# add route
ip ro add $IP via 192.168.1.2
# test again
curl -H 'Host: icanhazip.com' $IP
```
