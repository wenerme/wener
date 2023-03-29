---
title: strongSwan
---

# strongSwan

- [vici](https://github.com/strongswan/strongswan/blob/master/src/libcharon/plugins/vici/README.md)
  - 控制协议

## Route-based VPNs

- [RouteBasedVPN](https://wiki.strongswan.org/projects/strongswan/wiki/RouteBasedVPN)
- VTI Linux 3.6+
- Linux 4.19+ XFRM 比 VTI 更好 - strongSwan 5.8.0+
- 参考
  - [Route-based IPsec VPN on Linux with strongSwan](https://vincent.bernat.ch/en/blog/2017-route-based-vpn)
    - VTI

```bash
# iproute2
# ip link add <name> type xfrm dev <underlying interface> if_id <interface ID>
# strongSwan 工具
# /usr/local/libexec/ipsec/xfrmi --name <name> --id <interface ID> --dev <underlying interface>
# <interface ID> 32位整数，使用 0x 十六进制表示
# <underlying interface> 目前无意义 - 除非需要配置流出策略

ip link add ipsec0 type xfrm dev eth0 if_id 42

# 统计信息
ip -s link show eth0
```
