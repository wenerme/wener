---
title: nftables 规则
---

# 表达式

```bash
# 翻译 iptables 规则为 nftables
sudo iptables-save > legacy-rules.txt
iptables-restore-translate -f legacy-rules.txt

nft list ruleset   # dump nftables 规则
nft -c -f rule.nft # check
nft -f rule.nft    # load  - 原子操作
```

- accept、drop、queue、continue、return、jump chain、goto chain
- masquerade - 源地址自动设置为出口地址

# Table

- chain 容器
  - 同一个 table 的 chain 不能有相同名字
- name
  - 避免使用名称 inet, filter, nat, mangle
  - 不同 family 可以有相同名字的 table
- family=ip, arp, ip6, bridge, inet, netdev

:::tips

- 建议大多数时候只用 `table inet` 作为 filter
- 目前 NAT 相关规则主要支持 IPv4
  - 因此 masquerade 相关可以放到单独的 `table ip` 表
  - 例如 chain prerouting, postrouting, forward
- 如果不考虑 IPv6 可以只用 `table ip`

:::

**地址类型**

| family | desc             |
| ------ | ---------------- |
| ip     | IPv4 - 默认      |
| ip6    | IPv6             |
| inet   | IPv4/IPv6        |
| arp    | IPv4 ARP         |
| bridge | 经过桥接设备的包 |
| netdev | 入口设备         |

```bash
nft list tables # [<family>]
# nft [-n] [-a] list table [<family>] <name>
# nft (add | delete | flush) table [<family>] <name>
```

## 单文件 reload {#reload-individual-table}

```nft
flush table ip wode
flush table inet wode

table ip wode {
}

table inet wode {
}
```

或者 `replace` 也是安全的

```nft
replace table ip mytable {
}
```

```bash
nft -f /etc/nftables/wode.nft
```

# Chain

- rule 容器
- type=filter, route, nat
  - filter - 过滤
    - 支持 arp, bridge, ip, ip6, inet
  - route
    - 支持 ip, ip6
  - nat
    - 支持 ip, ip6
- hook
  - ip, ip6, inet 支持 prerouting, input, forward, output, postrouting
  - arp 支持 input, output
  - bridge
  - netdev 支持 ingress, egress
- priority - 优先级
- policy - 默认规则
  - accept, drop, queue, continue, return, jump chain, goto chain
- base chain
  - 指的是直接与内核数据包处理钩子（hook）关联的链。
  - 不是通过 jump 调用的链，而是内核在数据包进入网络栈时直接调用的入口点。
  - input、output、forward、prerouting、postrouting
  - 必须指定默认策略

```bash
# nft (add | create) chain [<family>] <table> <name> [ \{ type <type> hook <hook> [device <device>] priority <priority> \; [policy <policy> \;] \} ]
# nft (delete | list | flush) chain [<family>] <table> <name>
# nft rename chain [<family>] <table> <name> <newname>
```

**hook**

![](https://people.netfilter.org/pablo/nf-hooks.png)

| hook        | desc                                                   |
| ----------- | ------------------------------------------------------ |
| prerouting  | 所有进入系统的包，在路由之前处理，可用于过滤和修改属性 |
| input       | 进入 本地 系统的包                                     |
| forward     | 转发到其他 host 的包                                   |
| output      | 本地 发出的包                                          |
| postrouting | 所有离开系统的包                                       |
| ingress     |
| egress      |

- 地址 支持的 hook
  - ip,ip6,inet,bridge - prerouting,input,forward,output,postrouting
  - arp - input,output
  - netdav - ingress
- https://wiki.nftables.org/wiki-nftables/index.php/Netfilter_hooks

**priority**

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

**bridge priority**

| Name   | Value | Hooks       |
| ------ | ----- | ----------- |
| dstnat | -300  | prerouting  |
| filter | -200  | all         |
| out    | 100   | output      |
| srcnat | 300   | postrouting |

# Rule

- 定义 action
- handle - 内部标识, 序号

```bash
# nft add rule [<family>] <table> <chain> <matches> <statements>
# nft insert rule [<family>] <table> <chain> [position <handle>] <matches> <statements>
# nft replace rule [<family>] <table> <chain> [handle <handle>] <matches> <statements>
# nft delete rule [<family>] <table> <chain> [handle <handle>]
```

## 匹配

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

## nft

- `\` 续行
- `#` 注释
- 标识符 `^[a-zA-Z][a-zA-Z0-9/\_.]*`
  - 可使用双引号避免冲突
- [nft.8](https://man.archlinux.org/man/nft.8)

```nft
# 引入文件
# -I/--includepath
# 忽略 . 开头文件
include filename

# 定义变量
define variable = expr
# 使用变量
$variable
```

## nft cli

```bash
# 描述信息
nft describe tcp flags
nft describe ct_state
nft describe icmp type
```

**主要操作对象**

- rulset - 所有的 table 和 chain
  - `{list | flush} ruleset [family]`
- table
  - chain 容器
  - 通过 地址类型和名字标识

```
{add | create} table [family] table [{ flags flags ; }]
{delete | list | flush} table [family] table
list tables [family]
delete table [family] handle handle
```

- chain
  - rule 容器
  - 区分 base chian 和 regular chain
  - base - entry point for packets from the networking stack
    - 支持 policy - 默认 accept
  - regular - may be used as jump target and is used for better rule organization
  - chain type

| type   | families      | hooks                                  |
| ------ | ------------- | -------------------------------------- |
| filter | all           | all                                    |
| nat    | ip, ip6, inet | prerouting, input, output, postrouting |
| route  | ip, ip6       | output                                 |

- nat 通过做 NAT 处理，只处理第一个包 - 用于 created conntrack entry

```
{add | create} chain [family] table chain [{ type type hook hook [device device] priority priority ; [policy policy ;] }]
{delete | list | flush} chain [family] table chain
list chains [family]
delete chain [family] table handle handle
rename chain [family] table chain newname
```

- rule
  - 实际操作规则

```
{add | insert} rule [family] table chain [handle handle | index index] statement ... [comment comment]
replace rule [family] table chain handle handle statement ... [comment comment]
delete rule [family] table chain handle handle
```

- set - `{80,443}`
  - 区分匿名集合和有名字的集合
  - 用于辅助定义
  - 用过 `@set_name` 引用

```
add set [family] table set { type type | typeof expression ; [flags flags ;] [timeout timeout ;] [gc-interval gc-interval ;] [elements = { element[, ...] } ;] [size size ;] [policy policy ;] [auto-merge ;] }
{delete | list | flush} set [family] table set
list sets [family]
delete set [family] table handle handle
{add | delete} element [family] table set { element[, ...] }
```

- map
- element
- flowtable
  - accelerate packet forwarding in software
  - layer 3/4
- 状态对象
  - counter
  - quota
- ct helper
  - 定义 connection tracking helper
  - 用于 ct helper set
- ct timeout
  - update connection tracking timeout
- ct expectation
  - create connection expectations
  - 用于 ct expectation set
- counter
- quota

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
    # 默认允许 output
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

# 参考

- https://wiki.nftables.org/wiki-nftables/index.php/Quick_reference-nftables_in_10_minutes
- Syntax
  - https://wiki.nftables.org/wiki-nftables/index.php/Scripting
