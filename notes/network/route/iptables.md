---
title: iptables
tags:
  - Network
  - Firewall
  - Linux
  - iptables
---

# iptables

```bash
-A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
-A INPUT -s 127.0.0.0/255.0.0.0 -j ACCEPT
....
-A INPUT -m icmp --icmp-state 8 -j ACCEPT
-A INPUT -m icmp --icmp-state 0 -j ACCEPT
```

- [Routing Tables](http://linux-ip.net/html/routing-tables.html)

```bash
ip route add default dev $ISP1_IFACE table ISP1
ip route add default dev $ISP2_IFACE table ISP2

ip rule add fwmark 20 table ISP1 prio 33000
ip rule add fwmark 10 table ISP2 prio 33000

# iptables -t mangle -A PREROUTING -j CONNMARK --restore-mark
# iptables -t mangle -A PREROUTING -m mark ! --mark 0 -j ACCEPT
# iptables -t mangle -A PREROUTING -j MARK --set-mark 10
# iptables -t mangle -A PREROUTING -m statistic --mode random --probability 0.5 -j MARK --set-mark 20
# iptables -t mangle -A PREROUTING -j CONNMARK --save-mark
```

```bash
ttl (IPv4-specific)
This module matches the time to live field in the IP header.
[!] --ttl-eq ttl
Matches the given TTL value.
--ttl-gt ttl
Matches if TTL is greater than the given TTL value.
--ttl-lt ttl
Matches if TTL is less than the given TTL value.
```

ip route add default scope global nexthop via $P1 dev $IF1 weight 1 \
 nexthop via $P2 dev $IF2 weight 1

https://superuser.com/questions/510147/load-balancing-with-multiple-gateways

http://linux-ip.net/html/adv-multi-internet.html

https://lartc.org/howto/lartc.rpdb.multiple-links.html

Kubernetes uses this method to load balance traffic between pods in the cluster.

```bash
iptables -t nat -N LB_PORT80
iptables -t nat -N LB_PORT80_SERVER1
iptables -t nat -A LB_PORT80 \
  -m statistic --mode random --probability 0.5000 \
  -j LB_PORT80_SERVER1
iptables -t nat -N LB_PORT80_SERVER2
iptables -t nat -A LB_PORT80 \
  -j LB_PORT80_SERVER2
iptables -t nat -A INPUT -p tcp -m tcp --dport 80 -j LB_PORT80
```

丢弃 x% 的包

```bash
iptables -A INPUT \
  -s IP_ADDRESS \
  -m statistic --mode random --probability 0.5000 \
  -j DROP
```

depending on origin

```bash
ip route add table gw1 default via $GW1_IP dev $ETH metric 100
ip route add table gw2 default via $GW2_IP dev $ETH metric 100

ip rule add prio 100 from all fwmark 1 lookup gw1
ip rule add prio 110 from all fwmark 2 lookup gw2

# Make sure mark exists before routing happens
#   The first handles incoming packets
-t mangle -A PREROUTING -j CONNMARK --restore-mark
#   The second handles outgoing packets
-t mangle -A OUTPUT -j CONNMARK --restore-mark

# Mark packets and save the mark
-t mangle -A INPUT -m mac --mac-source $GW1_MAC -j MARK --set-mark 1
-t mangle -A INPUT -m mac --mac-source $GW2_MAC -j MARK --set-mark 2
-t mangle -A INPUT -j CONNMARK --save-mark
```

http://ipset.netfilter.org/iptables-extensions.man.html

iptables -p icmp -h

iptables-persistent
iptables-save > ~/iptables-export
iptables-restore < ~/iptables-export

iptables -t nat -A PREROUTING -p tcp -i ppp0 --dport 8001 -j DNAT --to-destination 192.168.1.200:8080
iptables -A FORWARD -p tcp -d 192.168.1.200 --dport 8080 -m state --state NEW,ESTABLISHED,RELATED -j ACCEPT
