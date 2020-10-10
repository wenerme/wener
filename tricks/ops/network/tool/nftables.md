# NFTables

## Tips
* [nft.8](https://jlk.fjfi.cvut.cz/arch/manpages/man/nft.8)
* 注意
  * 默认规则会 `include "/etc/nftables.d/*.nft"`
    * save 后不会有 - 避免 save
    * 尽量使用 reload
  * inet 只能用于 filter 不能用于 nat
* 参考
  * [Quick reference-nftables in 10 minutes](https://wiki.nftables.org/wiki-nftables/index.php/Quick_reference-nftables_in_10_minutes)

```bash
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
```
