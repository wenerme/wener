---
id: nftables-rule
title: nftables 规则
---

## 表达式

- accept、drop、queue、continue、return、jump chain、goto chain
- masquerade - 源地址自动设置为出口地址
- type
  - filter、route、nat
- hook
  - ip、ip6、inet - prerouting、input、forward、output、postrouting
  - netdav - ingress

### 优先级

| PRI  | name     | def                        | desc                                                                              |
| ---- | -------- | -------------------------- | --------------------------------------------------------------------------------- |
| -400 |          | NF_IP_PRI_CONNTRACK_DEFRAG | priority of defragmentation                                                       |
| -300 | raw      | NF_IP_PRI_RAW              | traditional priority of the raw table placed before connection tracking operation |
| -225 |          | NF_IP_PRI_SELINUX_FIRST    | SELinux operations                                                                |
| -200 |          | NF_IP_PRI_CONNTRACK        | Connection tracking operations                                                    |
| -150 | mangle   | NF_IP_PRI_MANGLE           | mangle operation                                                                  |
| -100 | dstnat   | NF_IP_PRI_NAT_DST          | DNAT                                                                              |
| 0    | filter   | NF_IP_PRI_FILTER           | filtering operation, the filter table                                             |
| 50   | security | NF_IP_PRI_SECURITY         | Place of security table where secmark can be set for example                      |
| 100  | srcnat   | NF_IP_PRI_NAT_SRC          | SNAT                                                                              |
| 225  |          | NF_IP_PRI_SELINUX_LAST     | SELinux at packet exit                                                            |
| 300  |          | NF_IP_PRI_CONNTRACK_HELPER | connection tracking at exit                                                       |

### 匹配

- meta （元属性，如接口）
  - oif、iif、oifname、iifname
- icmp （ICMP 协议）
  - type
- icmpv6 （ICMPv6 协议）
  - type
- ip （IP 协议）
  - protocol
  - daddr
  - saddr
- ip6 （IPv6 协议）
  - daddr
  - saddr
- tcp （TCP 协议）
  - dport
  - sport
- udp （UDP 协议）
  - dport
  - sport
- sctp （SCTP 协议）
  - dport
  - sport
- ct （链接跟踪）
  - state new | established | related | invalid

```bash
# 查看端口
nft describe tcp dport
```

## 默认规则

```shell
# 清空
flush ruleset

# 基础 IPv4/IPv6 有状态的防火墙 - 用户服务器或工作站
table inet filter {
	chain input {
    # 默认 drop input
		type filter hook input priority 0; policy drop;

    # 允许本地流量
		iifname lo accept \
		comment "Accept any localhost traffic"

    # 允许出去的流量
		ct state { established, related } accept \
		comment "Accept traffic originated from us"

    # 丢弃无效连接
		ct state invalid drop \
		comment "Drop invalid connections"

    # 113 端口返回端口不可达
    # https://en.wikipedia.org/wiki/Ident_protocol
    # https://github.com/janikrabe/oidentd
    # apk add oidentd
		tcp dport 113 reject with icmpx type port-unreachable \
		comment "Reject AUTH to make it fail fast"

		# ICMPv4
    # 接受指定类型的 icmp 类型
		ip protocol icmp icmp type {
			echo-reply,  # type 0
			destination-unreachable,  # type 3
			time-exceeded,  # type 11
			parameter-problem,  # type 12
		} accept \
		comment "Accept ICMP"

    # 限制 ping 速率
		ip protocol icmp icmp type echo-request limit rate 1/second accept \
		comment "Accept max 1 ping per second"

		# ICMPv6

		ip6 nexthdr icmpv6 icmpv6 type {
			destination-unreachable,  # type 1
			packet-too-big,  # type 2
			time-exceeded,  # type 3
			parameter-problem,  # type 4
			echo-reply,  # type 129
		} accept \
		comment "Accept basic IPv6 functionality"

		ip6 nexthdr icmpv6 icmpv6 type echo-request limit rate 1/second accept \
		comment "Accept max 1 ping per second"

    # IPv6 SLAAC 协议
		ip6 nexthdr icmpv6 icmpv6 type {
			nd-router-solicit,  # type 133
			nd-router-advert,  # type 134
			nd-neighbor-solicit,  # type 135
			nd-neighbor-advert,  # type 136
		} ip6 hoplimit 255 accept \
		comment "Allow IPv6 SLAAC"

    # IPv6 多播链路发现
		ip6 nexthdr icmpv6 icmpv6 type {
			mld-listener-query,  # type 130
			mld-listener-report,  # type 131
			mld-listener-reduction,  # type 132
			mld2-listener-report,  # type 143
		} ip6 saddr fe80::/10 accept \
		comment "Allow IPv6 multicast listener discovery on link-local"
	}

	chain forward {
    # 默认不允许转发
		type filter hook forward priority 0; policy drop;
	}

	chain output {
    # 默认不允许 output
		type filter hook output priority 0; policy accept;
	}
}
# 包含自定义规则
include "/etc/nftables.d/*.nft"
```

## masquerade

```shell
table ip nat {
  chain prerouting {
    type nat hook prerouting priority 0;
  }
  chain postrouting {
    type nat hook postrouting priority 100;
    # 源地址自动设置为出口地址
    oifname "enp0s2" masquerade
  }
}
```

## 允许常用端口

```shell
table inet filter {
  chain input {
    type filter hook input priority 0;
    # allow ssh,http
    tcp dport {ssh,http,https} accept
    # http3 use udp
    udp dport {https} accept
  }
}
```

## 限定来源地址

```shell
define ALLOWED_NETS = {
  192.168.0.0/16,
  1.2.3.4
}

table inet firewall {
  chain inbound {
    type filter hook input priority 0; policy drop;
    # 限定来源访问
    tcp dport { http, https } ip saddr $ALLOWED_NETS accept
    udp dport { http, https } ip saddr $ALLOWED_NETS accept
  }
}
```

## 所有端口重定向到 22

```
table ip nat {
  chain prerouting {
    type nat hook prerouting priority 0;
    tcp dport != 22 redirect to 22
  }
  chain postrouting {
    type nat hook postrouting priority 0;
  }
}
```
