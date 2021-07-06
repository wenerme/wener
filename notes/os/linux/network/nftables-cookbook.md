---
title: NFTables Cookbook
---

# NFTables Cookbook

- 参考
  - [Quick reference-nftables in 10 minutes](https://wiki.nftables.org/wiki-nftables/index.php/Quick_reference-nftables_in_10_minutes)
  - [Nftables/Examples](https://wiki.gentoo.org/wiki/Nftables/Examples)
  - [Performing Network Address Translation (NAT)](<https://wiki.nftables.org/wiki-nftables/index.php/Performing_Network_Address_Translation_(NAT)>)

## 防火墙功能

```nft
table ip filter {
  # 允许本地请求
	chain output {
		type filter hook output priority 100; policy accept;
	}

  # 允许局域网到 fw，不允许 WAN 到 fw
	chain input {
		type filter hook input priority 0; policy accept;
		iifname "lan0" accept
		iifname "wan0" drop
	}

  # 允许 LAN 请求 WAN - 允许 WAN 回应 LAN 请求
	chain forward {
		type filter hook forward priority 0; policy drop;
		iifname "lan0" oifname "wan0" accept
		iifname "wan0" oifname "lan0" ct state related,established accept
	}
}
```

## 基础 NAT 功能

```
table ip nat {
	chain prerouting {
		type nat hook prerouting priority 0; policy accept;
	}

  # 从 WAN 出的包，在结束路由后替换 来源地址 为 wan0 的主要地址
	chain postrouting {
		type nat hook postrouting priority 100; policy accept;
		oifname "wan0" masquerade
	}
}
```
