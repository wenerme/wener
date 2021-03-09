---
title: IPTables Cookbook
---

# IPTables Cookbook


## 允许一个网卡路由转发到另外一个网卡

* 允许 wlan1 -> wlan0

```bash
iptables -A FORWARD -i wlan1 -o wlan0 -j ACCEPT
iptables -A FORWARD -i wlan0 -o wlan1 -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE
```
