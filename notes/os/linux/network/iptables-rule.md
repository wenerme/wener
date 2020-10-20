---
id: iptables-rule
title: iptables 规则
---

# iptables 规则


* 参考
  * [Per-IP rate limiting with iptables](https://making.pusher.com/per-ip-rate-limiting-with-iptables/)

```bash
# %50 包丢弃
-A INPUT -i eth0 -m statistic --mode random --probability 0.5000 -j DROP

# DOCKER
# https://docs.docker.com/network/iptables/
# 不允许 eth0 流量访问 docker 暴露的 443
-I DOCKER-USER -i eth0 -p tcp -m tcp --dport 443 -j DROP
# 只允许 443 和 80
-I DOCKER-USER 1 -i eth0 -p tcp -m state --state NEW -m multiport ! --dports 443,80 -j DROP;

# syn 限流
-A INPUT -p tcp  --syn -m limit --limit 30/s --limit-burst 30 -j ACCEPT
# 使用 hashlimit 会更合理 - 每个 ip 15/s
-A INPUT -p tcp --syn -m hashlimit --hashlimit 15/s --hashlimit-burst 30 --hashlimit-mode srcip --hashlimit-srcmask 32 --hashlimit-name synattack -j ACCEPT
# 默认丢弃
-A INPUT -p tcp --syn -j DROP

# 立即 REJECT 而不是等待超时
-A INPUT -p tcp -s 192.168.1.0/24 --dport 443 -j REJECT --reject-with tcp-reset

# 如果想要限定 forward 规则，可以在最后添加一个 accept 来判断是否还有未允许的
-A FORWARD  -j ACCEPT
```

## Multi WAN
* https://unix.stackexchange.com/a/87999/47774
* https://unix.stackexchange.com/a/71834/47774

```bash
# reset
iptables -t mangle -F
iptables -t mangle -X

# fwmark
iptables -t mangle -A PREROUTING -j CONNMARK --restore-mark
# 如果未设置
iptables -t mangle -A PREROUTING -m mark ! --mark 0 -j RETURN
iptables -t mangle -A PREROUTING -i wan      -j MARK --set-mark $MARK_CAVTEL
iptables -t mangle -A PREROUTING -i comcast  -j MARK --set-mark $MARK_COMCAST
iptables -t mangle -A PREROUTING -i vz-dsl   -j MARK --set-mark $MARK_VZDSL

iptables -t mangle -A POSTROUTING -o wan     -j MARK --set-mark $MARK_CAVTEL
iptables -t mangle -A POSTROUTING -o comcast -j MARK --set-mark $MARK_COMCAST
iptables -t mangle -A POSTROUTING -o vz-dsl  -j MARK --set-mark $MARK_VZDSL
iptables -t mangle -A POSTROUTING -j CONNMARK --save-mark

##### NAT ######
iptables -t nat -F
iptables -t nat -X
for local in «list of internal IP/netmask combos»; do
    iptables -t nat -A POSTROUTING -s $local -o wan     -j SNAT --to-source «IP»
    iptables -t nat -A POSTROUTING -s $local -o comcast -j SNAT --to-source «IP»
    iptables -t nat -A POSTROUTING -s $local -o vz-dsl  -j SNAT --to-source «IP»
done

# this is an example of what the incoming traffic rules look like
for extip in «list of external IPs»; do
    iptables -t nat -A PREROUTING   -p tcp -d $extip --dport «port» -j DNAT --to-destination «internal-IP»:443
done
```


```bash
ip rule flush
ip rule add from all               pref 1000  lookup main 
ip rule add from A.B.C.D/29        pref 1500  lookup comcast # these IPs are the external ranges (we have multiple IPs on each connection)
ip rule add from E.F.G.H/29        pref 1501  lookup cavtel
ip rule add from I.J.K.L/31        pref 1502  lookup vzdsl
ip rule add from M.N.O.P/31        pref 1502  lookup vzdsl # yes, you can have multiple ranges
ip rule add fwmark $MARK_COMCAST   pref 2000  lookup comcast
ip rule add fwmark $MARK_CAVTEL    pref 2001  lookup cavtel
ip rule add fwmark $MARK_VZDSL     pref 2002  lookup vzdsl
ip rule add                        pref 2500  lookup comcast # the pref order here determines the default—we default to Comcast.
ip rule add                        pref 2501  lookup cavtel
ip rule add                        pref 2502  lookup vzdsl
ip rule add                        pref 32767 lookup default
```

__/etc/networking/interfaces__

```bash
iface comcast inet static
    address A.B.C.Q
    netmask 255.255.255.248
    up ip route add table comcast default via A.B.C.R dev comcast
    down ip route flush table comcast
```
