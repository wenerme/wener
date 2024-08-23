---
title: sing-box
---

# sing-box

- [SagerNet/sing-box](https://github.com/SagerNet/sing-box)
  - GPLv3, Golang
  - universal proxy platform
  - 支持协议
    - ShadowTLS / Shadowsocks / Trojan / VLESS / VLESS-REALITY / VMess-HTTPUpgrade-TLS / VMess-WebSocket-TLS / VMess-WebSocket / VMess
- 参考
  - [SagerNet/sing-box-for-android](https://github.com/SagerNet/sing-box-for-android)
  - [SagerNet/sing-box-for-apple](https://github.com/SagerNet/sing-box-for-apple)

```bash
# macOS Homebrew
brew install sing-box # 命令行 /opt/homebrew/etc/sing-box/config.json
brew install sfm      # 桌面应用

/opt/homebrew/opt/sing-box/bin/sing-box version

# AlpineLinux
# /usr/bin/sing-box
# sing-box -D /var/lib/sing-box -C /etc/sing-box check
# sing-box -D /var/lib/sing-box -C /etc/sing-box run
apk add -X https://mirrors.tuna.tsinghua.edu.cn/alpine/edge/testing/ --no-cache sing-box
kill -HUP $(pgrep sing-box) # reload

# https://github.com/SagerNet/sing-box/releases
# https://sing-box.sagernet.org/changelog/
VERSION=1.9.4
VERSION=1.10.0-beta.3
curl -L -o sing-box.tar.gz https://github.com/SagerNet/sing-box/releases/download/v${VERSION}/sing-box-${VERSION}-$(uname -s | tr '[:upper:]' '[:lower:]')-$(uname -m | sed 's/x86_64/amd64/').tar.gz
# gtar -zxvf sing-box.tar.gz --strip-components=1 --wildcards '*/sing-box'
tar zxvf sing-box.tar.gz --strip-components=1 --wildcards '*/sing-box'
./sing-box version

# Linux
sudo mv sing-box /usr/local/bin/
# sudo mv sing-box /usr/bin/ # 配合 sing-box-openrc
apk add -X https://mirrors.tuna.tsinghua.edu.cn/alpine/edge/testing/ --no-cache sing-box

docker run -d \
  -v /etc/sing-box:/etc/sing-box/ \
  --name=sing-box \
  --restart=always \
  ghcr.io/sagernet/sing-box \
  -D /var/lib/sing-box \
  -C /etc/sing-box/ run

sing-box run conf.json
```

## 配置 {#config}

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
