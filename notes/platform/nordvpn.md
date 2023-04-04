---
title: NordVPN
---

# NordVPN

## socks

```bash
curl -x socks5h://$USERNAME:$PASSWORD@dallas.us.socks.nordhold.net 4.icanhazip.com
```

```
amsterdam.nl.socks.nordhold.net
atlanta.us.socks.nordhold.net
dallas.us.socks.nordhold.net
dublin.ie.socks.nordhold.net
ie.socks.nordhold.net
los-angeles.us.socks.nordhold.net
nl.socks.nordhold.net
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
```

- nl - Netherlands
- se - Sweden

## API



```bash
curl -s https://api.nordvpn.com/v1/servers/countries | jq -r '[.[].name] | sort | unique | .[]'

curl -o server.json https://nordvpn.com/api/server
yq '[ .[] | select (.features.socks) | pick(["domain","load","name"])] ' server.json
yq '[ .[] | select (.features.proxy_ssl) | pick(["country","domain","ip_address","load"]) | select(.country | contains("Korea","Hong","Japan"))] | sort_by(.domain) ' server.json

fping -ac 60 $(yq '[ .[] | select (.features.socks) | .domain ] | join(" ")' server.json)
fping -ac 60 $(yq '[ .[] | select (.features.proxy_ssl) | pick(["country","domain","ip_address","load"]) | select(.country | contains("Korea","Hong","Japan")) | .domain ] | join(" ")' server.json)

# proxy_ssl
openssl s_client -connect us4353.nordvpn.com:89
```

- https://nordvpn.com/api/server
- https://nordvpn.com/api/server/stats
- `https://api.nordvpn.com/v1/servers?limit=9999999`
- https://api.nordvpn.com/v1/servers/countries

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

|              field | for                       | port |
| -----------------: | ------------------------- | ---- |
|              socks | SOCKS5                    | 1080 |
|          proxy_ssl | HTTP Proxy (SSL)          | 89   |
| proxy_ssl_cybersec | HTTP CyberSec Proxy (SSL) |
