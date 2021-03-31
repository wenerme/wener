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

ip link add ipsec0 type xfrm dev eth0 if_id 42
ip link set ipsec0 up
# 配置基于 xfrm 的 vpn
iptables -A FORWARD -i ipsec0 -j ACCEPT

# 查看当前地址
ip xfrm policy
# 如果是使用的 swanctl
VIP=$(swanctl -l -i vpn -P | grep local-vips -A1 | tail -1 | tr -d ' ')
# 添加地址 - xfrm 不需要地址也能工作，但 MASQUERADE 需要转换出正确的地址需要
ip addr add $VIP/32 dev ipsec0
# 测试
ip ro add 8.8.8.8 dev ipsec0 src $VIP
# NAT
iptables -t nat -A POSTROUTING -o ipsec0 -j MASQUERADE
RIP=$(swanctl -l -i vpn -P | grep remote-host | egrep -o '[0-9.]+')
# 远程 IP 走默认
ip ro add $RIP dev eth0 src 192.168.1.2 via 192.168.1.1
# 本地默认路由
ip ro add default dev ipsec0 src $VIP
```

* [IPsec masquerade technical notes and special security considerations](https://tldp.org/HOWTO/VPN-Masquerade-HOWTO-6.html)
  * AH protocol cannot be masqueraded
  * transport-mode ESP also cannot be reliably masqueraded
* [NAT#IPsec](https://en.wikipedia.org/wiki/NAT_traversal#IPsec)


## stun/turn
* https://askubuntu.com/a/1044171/267103

```bash
```
