---
id: iptables-ref
title: iptables 参考
---

# iptables 参考

- [How To Choose an Effective Firewall Policy to Secure your Servers](https://www.digitalocean.com/community/tutorials/how-to-choose-an-effective-firewall-policy-to-secure-your-servers)
- [Drop versus Reject](http://www.chiark.greenend.org.uk/~peterb/network/drop-vs-reject)
- [iptables-cheatsheet.md](https://gist.github.com/mcastelino/c38e71eb0809d1427a6650d843c42ac2)
- http://ipset.netfilter.org/ipset.man.html
- https://github.com/coreos/go-iptables
- https://linux.die.net/man/8/iptables
- http://www.netfilter.org/
- https://wiki.archlinux.org/index.php/Iptables_(简体中文)
- http://ipset.netfilter.org/iptables-extensions.man.html
- [详解 iptables 概念](http://www.zsythink.net/archives/1199)
- [IPTables packet traverse map](http://www.adminsehow.com/2011/09/iptables-packet-traverse-map/)
- [第九章、防火墙与 NAT 服务器](http://cn.linux.vbird.org/linux_server/0250simple_firewall.php)
- [How can I port forward with iptables?](https://serverfault.com/questions/140622)
- [How To Mangle The Packets](https://netfilter.org/documentation/HOWTO/NAT-HOWTO-6.html)

## Hook

- 本地流入 PREROUTING -> INPUT
- 外部流量 PREROUTING -> FORWARD -> POSTROUTING
- 本地发出 OUTPUT -> POSTROUTING

## 內建目标

- RETURN - 从 chain 返回
- ACCEPT - 退出 chain，退出当前 table
- DROP - 立即丢弃包
- QUEUE
- REJECT - 返回拒绝包 - 存在于 INPUT, FORWARD, OUTPUT
- DANT - nat 表的 PREROUTING, OUTPUT
- SNAT - nat 表的 POSTROUTING
- LOG
  - `iptables -A INPUT -p tcp -j LOG --log-prefix "INPUT packets"`
- ULOG - 多播到 netlink socket，应用可以订阅进行处理
- MARK - mangle 表
- MASQUERADE - 类似于 SNAT，但用于 outbound 接口，IP 可能会变
- REDIRECT - nat 表的 PREROUTING, OUTPUT - 重定向包、流到机器
- NOTRACK - raw 表 - 用于关闭连接跟踪 - 不被 iptables/netfilter 处理

## 连接状态

- NEW
  - 包未关联连接 - 第一个未关联包不会认为是 INVALID
  - 会创建新的连接
- ESTABLISHED
  - 包已关联连接 - 从 NEW 关联连接
  - TCP 当返回 SYN/ACK 时
  - UDP/ICMP 当 src 和 dst 交换时
- RELATED
  - 包未关联已有连接但关联了系统中被标记为 RELATED 的连接
  - 会创建新的连接或 ICMP 错误
  - 例如 FTP 双端口
- INVALID - 无法识别、内存溢出、ICMP 错误、无法路由
- UNTRACKED - 在 raw 中使用 NOTRACK
- SNAT - 虚拟状态，确保后续 恢复 响应包 源地址
- DNAT - 虚拟状态，确保后续 恢复 响应包 目标地址

## 常用匹配模块

- `-m`/`--match` 指定模块
- connmark
- conntrack
- ipvs
- mark
- redirect

## A Deep Dive into Iptables and Netfilter Architecture

- [A Deep Dive into Iptables and Netfilter Architecture](https://www.digitalocean.com/community/tutorials/a-deep-dive-into-iptables-and-netfilter-architecture)
- 5 个 Hook
  - NF_IP_PRE_ROUTING - PREROUTING
    - 进入网络栈
    - 先于路由决策
  - NF_IP_LOCAL_IN - INPUT
    - 如果包被路由到本地
  - NF_IP_FORWARD - FORWARD
    - 如果包被路由到其他主机
  - NF_IP_LOCAL_OUT - OUTPUT
    - 本地发起流量
  - NF_IP_POST_ROUTING - POSTROUTING
    - 本地发起流量或转发流量
    - 在被发送之前
- 使用表来组织规则 - 通过规则返回的决策类型进行表划分
  - filter - 过滤包
  - nat - 地址转换
  - mangle - 修改包
  - raw - 用于 opt-out 包跟踪
  - security - 用于设置 SELinux 上下文 mark
- chain - 规则链 - 控制包规则求值的路径

| Tables↓/Chains→               | PREROUTING | INPUT | FORWARD | OUTPUT | POSTROUTING |
| ----------------------------- | ---------- | ----- | ------- | ------ | ----------- |
| (routing decision)            |            |       |         | ✓      |
| raw                           | ✓          |       |         | ✓      |
| (connection tracking enabled) | ✓          |       |         | ✓      |
| mangle                        | ✓          | ✓     | ✓       | ✓      | ✓           |
| nat (DNAT)                    | ✓          |       |         | ✓      |
| (routing decision)            | ✓          |       |         | ✓      |
| filter                        |            | ✓     | ✓       | ✓      |
| security                      |            | ✓     | ✓       | ✓      |
| nat (SNAT)                    |            | ✓     |         |        | ✓           |

- 到本地的包 PREROUTING -> INPUT
- 到其他主机 PREROUTING -> FORWARD -> POSTROUTING
- 本地发出包 OUTPUT -> POSTROUTING

# FAQ

## - DROP vs REJECT

- 建议使用 REJECT
- DROP - 不处理直接丢包
  - TCP 会超时
    - TCP 会发起多次，因为 TCP 本身协议可靠会重复发包
  - UDP 认为服务端已经接收
  - 针对恶意攻击会耗费更多客户端资源
    - 但专业的工具一般不受影响
- REJECT 返回失败 - 客户端接收到无法到达
  - 通过 ICMP 返回
  - 可以包含原因
  - 对于恶意攻击可嗅探则会立即返回增加检测速度
  - 用户体验会更好

## mangle vs nat

- 两者都是操作、修改包
- mangle 先于 nat
- mangle
  - 服务类型
  - TTL
  - Mark
  - POSTROUTING 在路由决策之前，因此 mark 标记进入不同的路由表比较重要
- nat
  - 地址转换
