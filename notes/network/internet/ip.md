---
title: IP
---

# TCP/IP

- https://en.wikipedia.org/wiki/IP_address
- https://en.wikipedia.org/wiki/Reserved_IP_addresses
- http://ip.taobao.com/
- AS13335
  - CF WARP
  - https://bgpview.io/asn/13335
  - https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/firewall/
- https://datatracker.ietf.org/doc/html/rfc3330

```bash
# 获取 IP
curl checkip.amazonaws.com
curl ipinfo.io/ip
curl ifconfig.co
curl ipecho.net/plain
curl icanhazip.com
curl ipv4.icanhazip.com

curl 'https://vv.video.qq.com/checktime?otype=json&callback=onCheckTime'

# 使用 DNS 的方式获取
dig +short myip.opendns.com @resolver1.opendns.com
```

- 240.0.0.0/4
  - class E
  - 没有被使用
  - 特殊 IP 段
  - https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
  - https://tools.ietf.org/html/draft-chen-ati-adaptive-ipv4-address-space-03
  - Reclaiming IPv4 Class E's 240.0.0.0/4  https://news.ycombinator.com/item?id=40491038
- 169.254.169.254
  - 通常作为 metadata
  - AWS, GCP, Azure
  - 系统会通过这个 IP 地址向云服务查询当前实例的信息（例如实例ID、区域、配置信息等）。
  - AWS http://169.254.169.254/latest/meta-data/
    - [aws/amazon-ec2-metadata-mock](https://github.com/aws/amazon-ec2-metadata-mock)
    - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
  - Azure `http://169.254.169.254/metadata/instance?api-version=2021-02-01`
    - Header ` Metadata: true`
  - GCP http://metadata.google.internal/
    - Header `Metadata-Flavor: Google`
  - OpenStack http://169.254.169.254/openstack/


## Private

| CIDR            | Start       | End             | Count    | Class |
| --------------- | ----------- | --------------- | -------- | ----- | ---------- |
| 0.0.0.0/8       |
| 127.0.0.0/8     |
| 10.0.0.0/8      | 10.0.0.0    | 10.255.255.255  | 16777216 | A     |
| 100.64.0.0/10   | 100.64.0.0  | 100.127.255.255 |
| 169.254.0.0/16  |
| 172.16.0.0/12   | 172.16.0.0  | 172.31.255.255  | 1048576  | B     |
| 192.0.0.0/24    |
| 192.0.2.0/24    |             |                 |          |       | TEST-NET-1 |
| 192.168.0.0/16  | 192.168.0.0 | 192.168.255.255 | 65536    | B     |
| 192.88.99.0/24  |
| 198.18.0.0/15   |
| 198.51.100.0/24 |             |                 |          |       | TEST-NET-2 |
| 203.0.113.0/24  |             |                 |          |       | TEST-NET-3 |
| 224.0.0.0/3     |
| 224.0.0.0/4     |
| ::1/128         |
| fc00::/7        |
| fe80::/10       |

```
127.0.0.0/8,10.0.0.0/8,100.64.0.0/10,172.16.0.0/12,192.168.0.0/16
```

- [rfc5737](https://datatracker.ietf.org/doc/html/rfc5737) IPv4 Address Blocks Reserved for Documentation
  - TEST-NET
  - 文档建议 Block

## Welknown Private

| CIDR            | for              |
| --------------- | ---------------- |
| 10.42.0.0/16    | k3s cluster-cidr |
| 10.43.0.0/16    | k3s service-cidr |
| 10.244.0.0/16   | k0s cluster-cidr |
| 10.96.0.0/12    | k0s service-cidr |
| 10.96.0.10      | k0s dns          |
| 10.10.0.0       | openvpn          |
| 100.64.0.0/10   | tailscale        |
| 100.100.100.100 | tailscale dns    |

## Tags

- https://github.com/MetaCubeX/meta-rules-dat
  - https://github.com/MetaCubeX/meta-rules-dat/blob/master/.github/workflows/run.yml
  - https://github.com/metacubex/geo
    - 工具
- [Loyalsoldier/v2ray-rules-dat](https://github.com/Loyalsoldier/v2ray-rules-dat)
- [Loyalsoldier/domain-list-custom](https://github.com/Loyalsoldier/domain-list-custom)
- [v2fly/domain-list-community](https://github.com/v2fly/domain-list-community)
  - https://github.com/v2fly/v2ray-core/blob/master/app/router/config.proto
  - 生成 PB 格式
- mmdb - MaxMind DB
  - https://maxmind.github.io/MaxMind-DB/
  - [runk/node-maxmind](https://github.com/runk/node-maxmind)
    - NodeJS
  - [runk/mmdb-lib](https://github.com/runk/mmdb-lib)
    - MIT, Browser
- geoip2
  - http://dev.maxmind.com/geoip/geoip2/geolite2/

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
