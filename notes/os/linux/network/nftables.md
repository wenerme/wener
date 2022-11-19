---
title: NFTables
---

# NFTables

- 是什么？
  - iptables 后继
- [nft.8](https://jlk.fjfi.cvut.cz/arch/manpages/man/nft.8)
- 参考
  - [Adoption](https://wiki.nftables.org/wiki-nftables/index.php/Adoption)
  - [Quick reference-nftables in 10 minutes](https://wiki.nftables.org/wiki-nftables/index.php/Quick_reference-nftables_in_10_minutes)
  - [Migrating my iptables setup to nftables](https://developers.redhat.com/blog/2017/01/10/migrating-my-iptables-setup-to-nftables/)
  - [What comes after 'iptables'? Its successor, of course: `nftables`](https://developers.redhat.com/blog/2016/10/28/what-comes-after-iptables-its-successor-of-course-nftables/)
  - [Benchmarking nftables](https://developers.redhat.com/blog/2017/04/11/benchmarking-nftables/)
  - [Transparent proxy with nftables](https://hev.cc/3033.html)
- 开发
  - [google/nftables](https://github.com/google/nftables) - Golang
  - [zevenet/nftlb](https://github.com/zevenet/nftlb)
    nftables load balancer

:::tip

- 默认规则会包含目录内配置 - `include "/etc/nftables.d/*.nft"`
  - save 后不会有该 include 语句 - 不要 save
  - 尽量使用 reload - `service nftables reload`
- inet 只能用于 filter 不能用于 nat

:::

```bash
# 所有规则
nft list ruleset
# 导出为 JSON
nft -j list ruleset

# 清除规则
nft flush ruleset

# 清除单个 famliy 规则
nft flush ruleset arp
nft flush ruleset ip
nft flush ruleset ip6
nft flush ruleset bridge
nft flush ruleset inet

# 应用规则
nft -f rule.nft

# 转义
# nft add rule ip filter INPUT tcp dport 22 ct state new counter accept
iptables-translate -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW -j ACCEPT

# 单个规则只能使用句柄删除
# 查看
nft --handle --numeric list chain inet filter input
# 删除
nft delete rule inet fltrTable input handle 10

# 清空表
nft flush table foo
# 清空链
nft flush chain foo bar
nft delete rule ip6 foo bar

nft describe tcp flags
nft describe ct_state
nft describe icmp_type
```

# FAQ

## Error: Could not process rule: File exists
