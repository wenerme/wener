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
  - GSO - Generic Segmentation Offload - 通用分段卸载

:::caution

- TUN ICMP 会被拦截且无法绕过，导致所有 ping 都 < 1ms
  - [google/gvisor#8657](https://github.com/google/gvisor/issues/8657)
- prefer_ipv4 不一定能保证 IPv4 优先
  - [#932](https://github.com/SagerNet/sing-box/issues/932#issuecomment-1738723839)

:::

| abbr. | stand for            |
| ----- | -------------------- |
| SFM   | sing-box for MacOS   |
| SFA   | sing-box for Android |

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
VERSION=1.11.6
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

sing-box version
sing-box check -c conf.json
sing-box run conf.json
```

| flag             | for |
| ---------------- | --- |
| `-c config.json` |
| `-C config.d`    |
| `-D CWD`         |

| abbr. | stand for              | meaning          |
| ----- | ---------------------- | ---------------- |
| VAPID |                        |                  |
| ECH   | Encrypted Client Hello | 加密客户端 Hello |
| RDRC  |

- srs
  - 二进制的 rule set, zlib 压缩
- Router
  - router
    - router.rules
  - dns
    - dns.rules
  - DnsClient
  - `func RouteConnection(ctx context.Context, conn net.Conn, metadata adapter.InboundContext)`
    - .matchRule
      - 按需查找 ProcessInfo
      - 按需 匹配 FakeIP, 匹配到了更新 FQDN
      - 按需 DnsReverseMapping - IP -> Domain
      - 遍历 .rules.Match(metadata)
      - .actionSniff
    - action=route
    - action=reject
    - action=hijack-dns
- NetworkManager
  - 监测 网络状态
  - 监测 网络接口
  - 监测 电源
- InboundManager
- OutboundManager
- EndpointManager
- ConnectionManager
- platform.Interface

```ts
/*
	DomainStrategyAsIS DomainStrategy = iota
	DomainStrategyPreferIPv4
	DomainStrategyPreferIPv6
	DomainStrategyUseIPv4
	DomainStrategyUseIPv6
*/
// `prefer_ipv4` `prefer_ipv6` `ipv4_only` `ipv6_only`
type DomainStrategy = 'prefer_ipv4';
```
