---
title: musl
---

# musl

- [musl](https://musl.libc.org/) - MIT
  - [FAQ](https://www.musl-libc.org/faq.html)
- [与 glibc 的不同点](https://wiki.musl-libc.org/functional-differences-from-glibc.html)
- 不支持 nsswitch
  - [pikhq/musl-nscd](https://github.com/pikhq/musl-nscd)

## DNS 问题

- 问题
  - [alpine/aports#9734](https://gitlab.alpinelinux.org/alpine/aports/issues/9734) - DNS resolver patch
    - AAAA 不识别 NotImp 导致等待超时
  - 会同时发起 A 和 AAAA 请求
  - glibc's DNS resolver only generates AAAA queries if it can create an IPv6 socket.
  - 5s 超时重试
  - `options single-request`
  - `options timeout:1`
- 参考
  - [weaveworks/weave#3287](https://github.com/weaveworks/weave/issues/3287) DNS lookup timeouts due to races in conntrack
  - [gliderlabs/docker-alpine#255](https://github.com/gliderlabs/docker-alpine/issues/255)
  - [kubernetes/kubernetes#56903](https://github.com/kubernetes/kubernetes/issues/56903#issuecomment-462252499) - DNS intermittent delays of 5s
  - [Intermittent delays in Kubernetes](https://medium.com/techmindtickle/e9de8239e2fa)
    - resolve.conf 添加 `options single-request-reopen`
  - [Racy conntrack and DNS Lookup Timeouts](https://dzone.com/articles/racy-conntrack-and-dns-lookup-timeouts)
    - 因为 A 和 AAAA 通过同一个端口发起请求导致异常
    - disable parallel lookups, disable IPv6 to avoid AAAA lookups, use TCP for lookups
  - [resolver: only exit the search path loop there are a positive number of results give](https://www.openwall.com/lists/musl/2018/03/30/4) - DNS 服务异常导致 musl 行为异常
  - [DNS resolution happenning only after timeout](https://www.openwall.com/lists/musl/2017/10/04/6)
    - 因为 AAAA 的问题
    - 目前无法禁止
  - [How to disable AAAA lookups?](https://serverfault.com/questions/632665)
    - 目前没有好的方式
  - [Linux slow dns lookup (delay = 5 seconds)](https://www.math.tamu.edu/~comech/tools/linux-slow-dns-lookup/)
  - dnsmasq 也没有直接针对 aaaa 返回 nx 的方式
    - [Is there a way to "block" IPv6 address queries?](http://lists.thekelleys.org.uk/pipermail/dnsmasq-discuss/2005q2/000229.html)
    - 可以通过减少 DNS 外部查询以达到类似目的
    - `cache-size=65535` 和 `min-cache-ttl=300` 增加缓存
  - iptables 禁用 aaaa 记录查询
    - [oskar456/xt_dns](https://github.com/oskar456/xt_dns) 模块可以实现 dns 匹配
    - https://www.v2ex.com/t/242793
  - 转发处理 AAAA
    - [shawn1m/overture](https://github.com/shawn1m/overture) - 支持 reject qtype - 但是返回 ServFail
    - 建议返回 NXDOMAIN [weaveworks/weave#2244](https://github.com/weaveworks/weave/issues/2244)

```bash
# 监控 DNS 请求
tcpdump -ni eth0 port 53

# 完整查询内容例如 |03|www|07|example|03|com
# 使用 match-set 禁用 AAAA
iptables -N AAAA
# iptables -I FORWARD 1 -p udp -s 192.168.0.0/16 --dport 53 -j AAAA
iptables -I OUTPUT 1 -p udp --dport 53 -j AAAA
# drop 会导致超时 - 最好是返回 NXDATA 或者 NXDOMAIN
iptables -A AAAA -m string --algo bm --from 40 --hex-string '|001c|' -j DROP
```
