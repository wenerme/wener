---
title: sing-box
---

# sing-box

- [SagerNet/sing-box](https://github.com/SagerNet/sing-box)
  - GPL, Golang
  - universal proxy platform
  - 支持协议
    - ShadowTLS / Shadowsocks / Trojan / VLESS / VLESS-REALITY / VMess-HTTPUpgrade-TLS / VMess-WebSocket-TLS / VMess-WebSocket / VMess
- 参考
  - [SagerNet/sing-box-for-android](https://github.com/SagerNet/sing-box-for-android)
  - [SagerNet/sing-box-for-apple](https://github.com/SagerNet/sing-box-for-apple)

```bash
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
