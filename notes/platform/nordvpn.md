---
title: NordVPN
---

# NordVPN

- 注意 10 设备限制
- 推荐区域 - 香港作为 relay
  - 美国 - 可以考虑额外节点
  - 台湾
  - 日本
  - 新加坡
- NordLynx 基于 WireGuard
- DNS - 支持 tls
  - 103.86.99.100
  - 103.86.96.100
- 参考
  - [bubuntux/nordvpn](https://github.com/bubuntux/nordvpn)
  - [azinchen/nordvpn](- https://github.com/azinchen/nordvpn)
    - Docker
  - https://downloads.nordvpn.com/certificates/root.der
  - PacketHub S.A.

```bash
curl -x https://$USERNAME:$PASSWORD@uk2160.nordvpn.com:89 4.icanhazip.com
curl -x socks5h://$USERNAME:$PASSWORD@dallas.us.socks.nordhold.net 4.icanhazip.com
```

| Name                      | Identifier            | ID  | ports |
| ------------------------- | --------------------- | --- | ----- |
| IKEv2/IPSec               | ikev2                 | 1   |
| OpenVPN UDP               | openvpn_udp           | 3   |
| OpenVPN TCP               | openvpn_tcp           | 5   |
| Socks 5                   | socks                 | 7   | 1080  |
| HTTP Proxy                | proxy                 | 9   |
| PPTP                      | pptp                  | 11  |
| L2TP/IPSec                | l2tp                  | 13  |
| OpenVPN UDP Obfuscated    | openvpn_xor_udp       | 15  |
| OpenVPN TCP Obfuscated    | openvpn_xor_tcp       | 17  |
| HTTP CyberSec Proxy       | proxy_cybersec        | 19  |
| HTTP Proxy (SSL)          | proxy_ssl             | 21  | 89    |
| HTTP CyberSec Proxy (SSL) | proxy_ssl_cybersec    | 23  |
| IKEv2/IPSec IPv6          | ikev2_v6              | 26  |
| OpenVPN UDP IPv6          | openvpn_udp_v6        | 29  |
| OpenVPN TCP IPv6          | openvpn_tcp_v6        | 32  |
| Wireguard                 | wireguard_udp         | 35  | 51820 |
| OpenVPN UDP TLS Crypt     | openvpn_udp_tls_crypt | 38  |
| OpenVPN TCP TLS Crypt     | openvpn_tcp_tls_crypt | 41  |
| OpenVPN UDP Dedicated     | openvpn_dedicated_udp | 42  |
| OpenVPN TCP Dedicated     | openvpn_dedicated_tcp | 45  |
| Skylark                   | skylark               | 48  |
| Mesh Relay                | mesh_relay            | 50  |
| NordWhisper               | nordwhisper           | 51  | 8443  |

- HTTPS Proxy - 89 - 最简单易用，但是不支持 UDP
- SOCKS5 不作为主要支持 - 只有特殊少部分节点支持
- VPN 类协议不方便代理使用 - OpenVPN, IKEv2/IPSec, WireGuard/NordLynx
  - WireGuard 越来越多场景支持 userspace
- 私有协议支持的场景很少 - NordWhisper, NordLynx
- 支持协议 HTTP Proxy, SOCKS5, NordLynx, OpenVPN TCP, OpenVPN UDP, NordWhisper
- cybersec
  - 网络安全相关
- https://platform.openai.com/docs/supported-countries
- https://cyberwaters.com/list-of-vpn-port-numbers-vpn-service-providers-use/

```bash
# https://my.nordaccount.com/zh/dashboard/nordvpn/access-tokens/
TOKEN=
# 会返回 username,password,nordlynx_private_key
curl -u token:$TOKEN https://api.nordvpn.com/v1/users/services/credentials
# wg 的 public_key 在 server 信息里
# 获取推荐服务
curl -s 'https://api.nordvpn.com/v1/servers/recommendations?&filters[country_id]=195&filters[servers_technologies][identifier]=wireguard_udp&limit=3'

# BR
curl -s 'https://api.nordvpn.com/v1/servers/recommendations?&filters[country_id]=30&filters[servers_technologies][identifier]=proxy_ssl&limit=1'
# HK
curl -s 'https://api.nordvpn.com/v1/servers/recommendations?&filters[country_id]=97&filters[servers_technologies][identifier]=proxy_ssl&limit=1'
# JP
curl -s 'https://api.nordvpn.com/v1/servers/recommendations?&filters[country_id]=108&filters[servers_technologies][identifier]=proxy_ssl&limit=1'
# SG
curl -s 'https://api.nordvpn.com/v1/servers/recommendations?&filters[country_id]=195&filters[servers_technologies][identifier]=proxy_ssl&limit=1'
# TR Turkey
curl -s 'https://api.nordvpn.com/v1/servers/recommendations?&filters[country_id]=220&filters[servers_technologies][identifier]=proxy_ssl&limit=1'
# US
curl -s 'https://api.nordvpn.com/v1/servers/recommendations?&filters[country_id]=228&filters[servers_technologies][identifier]=proxy_ssl&limit=1'
```

- filters
  - `filters[country_id]`
    - 10, Argentina
    - 30, Brazil
    - 97, Hong Kong
    - 108, Japan
    - 195, Singapore
    - 220, Turkey
    - 227, United Kingdom
    - 228, United States
    - https://github.com/bubuntux/nordlynx/discussions/8

## NordWhisper

## Wireguard

- https://gist.github.com/bluewalk/7b3db071c488c82c604baf76a42eaad3

## socks

```bash
curl -x socks5h://$USERNAME:$PASSWORD@dallas.us.socks.nordhold.net 4.icanhazip.com
```

```
amsterdam.nl.socks.nordhold.net
atlanta.us.socks.nordhold.net
dallas.us.socks.nordhold.net
detroit.us.socks.nordhold.net
dublin.ie.socks.nordhold.net
ie.socks.nordhold.net
los-angeles.us.socks.nordhold.net
new-york.us.socks.nordhold.net
nl.socks.nordhold.net
san-francisco.us.socks.nordhold.net
se.socks.nordhold.net
stockholm.se.socks.nordhold.net
us.socks.nordhold.net

socks-us15.nordvpn.com
socks-us13.nordvpn.com
socks-us14.nordvpn.com
socks-us12.nordvpn.com
socks-us11.nordvpn.com
socks-us9.nordvpn.com
socks-us10.nordvpn.com
socks-us8.nordvpn.com
socks-us7.nordvpn.com
socks-us6.nordvpn.com

# Ireland #1-5
196.196.192.3
196.196.192.11
196.196.192.59
196.196.192.19
196.196.192.51

# Sweden #1-5
196.196.244.3
196.196.244.11
196.196.244.51
196.196.244.19
196.196.244.75

socks-nl4.nordvpn.com
socks-nl3.nordvpn.com
socks-nl2.nordvpn.com

amsterdam.nl.socks.nordhold.net
atlanta.us.socks.nordhold.net
dallas.us.socks.nordhold.net
los-angeles.us.socks.nordhold.net
nl.socks.nordhold.net
se.socks.nordhold.net
stockholm.se.socks.nordhold.net
us.socks.nordhold.net
```

- nl - Amsterdam North Holland
- se - Sweden
- https://ipleak.net/?q=us.socks.nordhold.net
- dallas.us.socks.nordhold.net
  - 165.231.210.164
- atlanta.us.socks.nordhold.net
  - 196.247.50.68

## NordLynx

```bash
# apt, yum, dnf, zypper
# https://repo.nordvpn.com/
# /gpg/nordvpn_public.asc
# /deb/nordvpn/debian
# /yum/nordvpn/centos
# sh <(curl -sSf https://downloads.nordcdn.com/apps/linux/install.sh)

nordvpn set technology nordlynx
nordvpn c
```

- https://support.nordvpn.com/Connectivity/Linux/1362931332/How-can-I-use-NordLynx-in-the-NordVPN-app-for-Linux.htm

## API

:::tip

- socks 支持的区域少
- proxy_ssl 支持的区域多

:::

```bash
sudo apk add jq yq fping

curl -o countries.json https://api.nordvpn.com/v1/servers/countries
curl -s https://api.nordvpn.com/v1/servers/countries | jq -r '[.[].name] | sort | unique | .[]'

# 约 30MB
curl -sfL 'https://api.nordvpn.com/v1/servers?limit=9999999' | jq > server.json
yq '[ .[] | select (.features.socks) | pick(["domain","load","name","country"])] ' server.json
yq '[ .[] | select (.features.proxy_ssl) | pick(["country","domain","ip_address","load"]) | select(.country | contains("Korea","Hong","Japan"))] | sort_by(.domain) ' server.json

fping -ac 60 $(yq -r '[ .[] | select (.features.socks) | .domain ] | join(" ")' server.json) > socks.txt
# 非常多，只筛选部分
# "Hong"
# 节点
yq -r '[ .[] | select (.features.proxy_ssl) | pick(["country","domain","ip_address","load"]) | select(.country | contains("Korea","Japan","Taiwan","Singapore","Brazil","United States")) | .domain ] | join(" ")' server.json
# 探测最快的
fping -ac 10 $(yq -r '[ .[] | select (.features.proxy_ssl) | pick(["country","domain","ip_address","load"]) | select(.country | contains("Korea","Japan","Taiwan","Singapore","Brazil","United States")) | .domain ] | join(" ")' server.json) &> proxy_ssl.txt

# sort by avg, reverse
sort -t / -k 9 -h -r proxy_ssl.txt

# proxy_ssl
openssl s_client -connect us4353.nordvpn.com:89

openssl s_client -connect at80.nordvpn.com:89
openssl s_client -connect 5.253.207.203:89
curl -x https://$USERNAME:$PASSWORD@at80.nordvpn.com:89 icanhazip.com
```

```js
let all = require('./server.json');
let byCountry = all
  .sort((a, b) => a.load - b.load)
  .reduce((acc, v) => {
    acc[v.locations[0].country.code] ||= v;
    return acc;
  }, {});
```

- type: physical, virtual
- 110 Country
- 废弃 https://support.nordvpn.com/hc/en-us/articles/21586950310801
  - https://nordvpn.com/api/server
  - https://nordvpn.com/api/server/stats
- `https://api.nordvpn.com/v1/servers?limit=9999999`
- https://api.nordvpn.com/v1/servers/countries
- https://api.nordvpn.com/v1/servers/recommendations

```json
{
  "id": 1000502,
  "created_at": "2023-11-15 12:48:42",
  "updated_at": "2024-06-07 05:43:26",
  "name": "Singapore #557",
  "station": "149.50.213.43",
  "ipv6_station": "",
  "hostname": "sg557.nordvpn.com",
  "load": 0,
  "status": "online",
  "type": "physical",
  "locations": [
    {
      "id": 557,
      "created_at": "2017-09-06 12:24:30",
      "updated_at": "2017-09-06 12:24:30",
      "latitude": 1.2930556,
      "longitude": 103.8558333,
      "country": {
        "id": 195,
        "name": "Singapore",
        "code": "SG",
        "city": {
          "id": 7867982,
          "name": "Singapore",
          "latitude": 1.293056,
          "longitude": 103.855833,
          "dns_name": "singapore",
          "hub_score": 0
        }
      }
    }
  ],
  "services": [
    {
      "id": 1,
      "name": "VPN",
      "identifier": "vpn",
      "created_at": "2017-03-21 12:00:45",
      "updated_at": "2017-05-25 13:12:31"
    },
    {
      "id": 5,
      "name": "Proxy",
      "identifier": "proxy",
      "created_at": "2017-05-29 19:38:30",
      "updated_at": "2017-05-29 19:38:30"
    }
  ],
  "technologies": [
    {
      "id": 3,
      "name": "OpenVPN UDP",
      "identifier": "openvpn_udp",
      "created_at": "2017-05-04 08:03:24",
      "updated_at": "2017-05-09 19:27:37",
      "metadata": [],
      "pivot": { "technology_id": 3, "server_id": 1000502, "status": "online" }
    },
    {
      "id": 5,
      "name": "OpenVPN TCP",
      "identifier": "openvpn_tcp",
      "created_at": "2017-05-09 19:28:14",
      "updated_at": "2017-05-09 19:28:14",
      "metadata": [],
      "pivot": { "technology_id": 5, "server_id": 1000502, "status": "online" }
    },
    {
      "id": 42,
      "name": "OpenVPN UDP Dedicated",
      "identifier": "openvpn_dedicated_udp",
      "created_at": "2019-09-19 14:49:18",
      "updated_at": "2019-09-19 14:49:18",
      "metadata": [],
      "pivot": { "technology_id": 42, "server_id": 1000502, "status": "online" }
    },
    {
      "id": 45,
      "name": "OpenVPN TCP Dedicated",
      "identifier": "openvpn_dedicated_tcp",
      "created_at": "2019-09-19 14:49:54",
      "updated_at": "2019-09-19 14:49:54",
      "metadata": [],
      "pivot": { "technology_id": 45, "server_id": 1000502, "status": "online" }
    }
  ],
  "groups": [
    {
      "id": 9,
      "created_at": "2017-06-13 13:42:36",
      "updated_at": "2018-08-22 12:54:48",
      "title": "Dedicated IP",
      "identifier": "legacy_dedicated_ip",
      "type": {
        "id": 3,
        "created_at": "2017-06-13 13:40:17",
        "updated_at": "2017-06-13 13:40:23",
        "title": "Legacy category",
        "identifier": "legacy_group_category"
      }
    },
    {
      "id": 23,
      "created_at": "2017-10-27 14:23:51",
      "updated_at": "2017-10-30 08:09:57",
      "title": "Asia Pacific",
      "identifier": "asia_pacific",
      "type": {
        "id": 5,
        "created_at": "2017-10-27 14:16:30",
        "updated_at": "2017-10-27 14:16:30",
        "title": "Regions",
        "identifier": "regions"
      }
    }
  ],
  "specifications": [
    { "id": 8, "title": "Version", "identifier": "version", "values": [{ "id": 200, "value": "2.0.0" }] }
  ],
  "ips": [
    {
      "id": 1140179,
      "created_at": "2023-11-15 12:53:55",
      "updated_at": "2023-11-15 12:53:55",
      "server_id": 1000502,
      "ip_id": 47332106,
      "type": "entry",
      "ip": { "id": 47332106, "ip": "149.50.213.43", "version": 4 }
    }
  ]
}
```

**旧版本格式**

```json
{
  "id": 996449,
  "ip_address": "140.99.188.179",
  "search_keywords": ["P2P"],
  "categories": [],
  "name": "United States SOCKS #26",
  "domain": "socks-us26.nordvpn.com",
  "price": 0,
  "flag": "US",
  "country": "United States",
  "location": { "lat": 34.052222200000003, "long": -118.2427778 },
  "load": 15,
  "features": {
    "ikev2_v6": false,
    "ikev2": false,
    "l2tp": false,
    "mesh_relay": false,
    "openvpn_dedicated_tcp": false,
    "openvpn_dedicated_udp": false,
    "openvpn_tcp_tls_crypt": false,
    "openvpn_tcp_v6": false,
    "openvpn_tcp": false,
    "openvpn_udp_tls_crypt": false,
    "openvpn_udp_v6": false,
    "openvpn_udp": false,
    "openvpn_xor_tcp": false,
    "openvpn_xor_udp": false,
    "pptp": false,
    "proxy_cybersec": false,
    "proxy_ssl_cybersec": false,
    "proxy_ssl": false,
    "proxy": false,
    "skylark": false,
    "socks": true,
    "wireguard_udp": false
  }
}
```

```bash
curl https://api.nordvpn.com/vpn/check/full
```

# FAQ

## 10 设备限制 {#limits}

:::caution

- 10 并发连接
- 相同服务相同协议不能同时发起连接

:::

- ~~6 链接限制~~ -> 10
- 过多连接可能需要登录后才能连接成功
- https://support.nordvpn.com/hc/en-us/articles/19476515228305
- https://nordvpn.com/zh/features/vpn-for-multiple-devices/
- ~~https://support.nordvpn.com/FAQ/1047408552~~
