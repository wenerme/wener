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
```

## Multi WAN
* https://unix.stackexchange.com/a/87999/47774

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

