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
# sing-box -D /var/lib/sing-box -C /etc/sing-box run
apk add -X https://mirrors.tuna.tsinghua.edu.cn/alpine/edge/testing/ --no-cache sing-box
kill -HUP $(pgrep sing-box) # reload

curl -L -o sing-box.tar.gz https://github.com/SagerNet/sing-box/releases/download/v1.8.11/sing-box-1.8.11-$(uname -s | tr '[:upper:]' '[:lower:]')-$(uname -m | sed 's/x86_64/amd64/').tar.gz
tar zxvf sing-box.tar.gz --strip-components=1 --wildcards '*/sing-box'
./sing-box version
sudo mv sing-box /usr/local/bin/
# sudo mv sing-box /usr/bin/ # 配合 sing-box-openrc

docker run -d \
  -v /etc/sing-box:/etc/sing-box/ \
  --name=sing-box \
  --restart=always \
  ghcr.io/sagernet/sing-box \
  -D /var/lib/sing-box \
  -C /etc/sing-box/ run
```

## 配置

- https://github.com/chika0801/sing-box-examples
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
