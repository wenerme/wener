---
title: NFTables Cookbook
---

# NFTables Cookbook

- 参考
  - [Quick reference-nftables in 10 minutes](https://wiki.nftables.org/wiki-nftables/index.php/Quick_reference-nftables_in_10_minutes)
  - [Nftables/Examples](https://wiki.gentoo.org/wiki/Nftables/Examples)
  - [Performing Network Address Translation (NAT)](<https://wiki.nftables.org/wiki-nftables/index.php/Performing_Network_Address_Translation_(NAT)>)

## docker iptables

- docker 使用 iptables 创建的基础规则

```nft
# Warning: table ip nat is managed by iptables-nft, do not touch!
table ip nat {
	chain DOCKER {
		iifname "docker0" counter packets 0 bytes 0 return
	}

	chain POSTROUTING {
		type nat hook postrouting priority srcnat; policy accept;
		ip saddr 172.17.0.0/16 oifname != "docker0" counter packets 0 bytes 0 xt target "MASQUERADE"
	}

	chain PREROUTING {
		type nat hook prerouting priority dstnat; policy accept;
		xt match "addrtype" counter packets 472 bytes 25650 jump DOCKER
	}

	chain OUTPUT {
		type nat hook output priority dstnat; policy accept;
		ip daddr != 127.0.0.0/8 xt match "addrtype" counter packets 0 bytes 0 jump DOCKER
	}
}
# Warning: table ip filter is managed by iptables-nft, do not touch!
table ip filter {
	chain DOCKER {
	}

	chain DOCKER-ISOLATION-STAGE-1 {
		iifname "docker0" oifname != "docker0" counter packets 0 bytes 0 jump DOCKER-ISOLATION-STAGE-2
		counter packets 31697 bytes 12130383 return
	}

	chain DOCKER-ISOLATION-STAGE-2 {
		oifname "docker0" counter packets 0 bytes 0 drop
		counter packets 0 bytes 0 return
	}

	chain FORWARD {
		type filter hook forward priority filter; policy accept;
		counter packets 31681 bytes 12128929 jump DOCKER-USER
		counter packets 31684 bytes 12129109 jump DOCKER-ISOLATION-STAGE-1
		oifname "docker0" xt match "conntrack" counter packets 0 bytes 0 accept
		oifname "docker0" counter packets 0 bytes 0 jump DOCKER
		iifname "docker0" oifname != "docker0" counter packets 0 bytes 0 accept
		iifname "docker0" oifname "docker0" counter packets 0 bytes 0 accept
	}

	chain DOCKER-USER {
		counter packets 31682 bytes 12130415 return
	}
}
```

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
