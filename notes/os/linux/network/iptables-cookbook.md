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

## NAT with IPSec

```bash
echo 1 > /proc/sys/net/ipv4/ip_forward
iptables -A FORWARD -i eth1 -j ACCEPT

# 配置基于 xfrm 的 vpn
iptables -A FORWARD -i ipsec0 -j ACCEPT

# 查看当前地址
ip xfrm policy
# 添加地址 - xfrm 不需要地址也能工作，但 MASQUERADE 需要转换出正确的地址需要
ip addr add 10.8.1.2/32 dev ipsec0

iptables -t nat -A POSTROUTING -o ipsec0 -j MASQUERADE
```

* [IPsec masquerade technical notes and special security considerations](https://tldp.org/HOWTO/VPN-Masquerade-HOWTO-6.html)
  * AH protocol cannot be masqueraded
  * transport-mode ESP also cannot be reliably masqueraded
* [NAT#IPsec](https://en.wikipedia.org/wiki/NAT_traversal#IPsec)
