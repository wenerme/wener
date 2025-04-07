---
tags:
  - Configuration
---

# Sing-Box Config

- `sing-box://import-remote-profile?url=urlEncodedURL#urlEncodedName`

```json
{
  "log": {},
  "dns": {},
  "ntp": {},
  "inbounds": [],
  "outbounds": [],
  "route": {},
  "experimental": {}
}
```

**规则路由匹配逻辑**

```txt
(domain || domain_suffix || domain_keyword || domain_regex || geosite || geoip || ip_cidr || ip_is_private) &&
(port || port_range) &&
(source_geoip || source_ip_cidr || source_ip_is_private) &&
(source_port || source_port_range) &&
其他条件
```

- mixed -> socks4, socks4a, socks5, http
- https://github.com/chika0801/sing-box-examples

### tun

- auto_route
  - 将 tun 作为默认路由 或 配置 route_address
- interface_name

```json
{
  "type": "tun",
  "tag": "tun-in",
  "address": "172.16.0.1/30",
  "gso": true,
  "auto_route": true,
  "auto_redirect": false,
  "iproute2_table_index": 2022,
  "iproute2_rule_index": 9000,
  "mtu": 1400,
  "strict_route": true,
  "stack": "gvisor",
  "sniff": true,
  "sniff_override_destination": false,
  "route_exclude_address": ["223.5.5.5/32", "1.1.1.1/32", "10.0.0.0/8"],
  "route_exclude_address_set": ["geoip-cn"]
}
```

```bash
ip ru
```

```
9000:	from all to 172.16.0.0/30 lookup 2022
9001:	from all lookup 2022 suppress_prefixlength 0
9002:	not from all dport 53 lookup main suppress_prefixlength 0
9002:	from all iif tun0 goto 9010
9003:	not from all iif lo lookup 2022
9003:	from 0.0.0.0 iif lo lookup 2022
9003:	from 172.16.0.0/30 iif lo lookup 2022
9010:	from all nop
```

```bash
ip ro show tab 2022
```

## Schema

- https://github.com/GUI-for-Cores/GUI.for.SingBox/blob/main/frontend/src/types/profile.d.ts
