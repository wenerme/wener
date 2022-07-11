---
title: IP
---

# TCP/IP

- https://en.wikipedia.org/wiki/IP_address
- https://en.wikipedia.org/wiki/Reserved_IP_addresses
- http://ip.taobao.com/

```bash
# 获取 IP
curl checkip.amazonaws.com
curl ipinfo.io/ip
curl ifconfig.co
curl ipecho.net/plain
curl icanhazip.com
curl ipv4.icanhazip.com

# 使用 DNS 的方式获取
dig +short myip.opendns.com @resolver1.opendns.com
```

## Private

| CIDR            | Start       | End             | Count    | Class |
| --------------- | ----------- | --------------- | -------- | ----- |
| 0.0.0.0/8       |
| 127.0.0.0/8     |
| 10.0.0.0/8      | 10.0.0.0    | 10.255.255.255  | 16777216 | A     |
| 100.64.0.0/10   | 100.64.0.0  |
| 169.254.0.0/16  |
| 172.16.0.0/12   | 172.16.0.0  | 172.31.255.255  | 1048576  | B     |
| 192.0.0.0/24    |
| 192.0.2.0/24    |
| 192.168.0.0/16  | 192.168.0.0 | 192.168.255.255 | 65536    | B     |
| 192.88.99.0/24  |
| 198.18.0.0/15   |
| 198.51.100.0/24 |
| 203.0.113.0/24  |
| 224.0.0.0/3     |
| 224.0.0.0/4     |
| ::1/128         |
| fc00::/7        |
| fe80::/10       |

## Welknown

| CIDR            | for              |
| --------------- | ---------------- |
| 10.42.0.0/16    | k3s cluster-cidr |
| 10.43.0.0/16    | k3s service-cidr |
| 10.244.0.0/16   | k0s cluster-cidr |
| 10.96.0.0/12    | k0s service-cidr |
| 10.96.0.10      | k0s dns          |
| 100.64.0.0/10   | tailscale        |
| 100.100.100.100 | tailscale dns    |

## FAQ

### IP-address ending with zero?

- 现在来说是没问题的, 20 年前有隐性的子网约定, .0 代表网络, .255 代表广播, 许多硬件设备和软件规则有基于这样的假设, 现在都是以 CIDR 为标准, 因此 .0 和 .255 都是有效的地址
- [IP-address ending with zero?](https://stackoverflow.com/questions/14915188)

### Tools

- https://ipjisuanqi.com/
- https://dnsdaquan.com/
- https://ipchaxun.com/
- https://icplishi.com/jiashule.com/
-

## apnic

https://www.apnic.net/about-apnic/corporate-documents/documents/resource-guidelines/rir-statistics-exchange-format/

https://github.com/DanielPLSH/apnic
根据 apnic 发布的最新 IP 地址，分析电信、联通、移动等 IP 地址段

version|registry|serial|records|startdate|enddate|UTCoffset
http://ftp.apnic.net/apnic/stats/apnic/delegated-apnic-latest
