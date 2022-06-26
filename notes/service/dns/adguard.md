---
title: AdGuard
---

# AdGuard

- [AdguardTeam/AdGuardHome](https://github.com/AdguardTeam/AdGuardHome)

| port         | for           |
| ------------ | ------------- |
| 53           | DNS           |
| 67,68        | DHCP          |
| 80,443,3000  | DoH           |
| 853          | DNS over TLS  |
| 784,853,8853 | DNS over QUIC |
| 5443         | DNSCrypt      |
| 3000         | web           |

```bash
# Docker
# https://hub.docker.com/r/adguard/adguardhome

docker run --rm -it \
  -v $PWD/work:/opt/adguardhome/work \
  -v $PWD/conf:/opt/adguardhome/conf \
  -p 53:53/tcp -p 53:53/udp \
  -p 67:67/udp -p 68:68/udp \
  -p 80:80/tcp -p 443:443/tcp -p 443:443/udp -p 3000:3000/tcp \
  -p 853:853/tcp \
  -p 784:784/udp -p 853:853/udp -p 8853:8853/udp \
  -p 5443:5443/tcp -p 5443:5443/udp \
  --name adguardhome adguard/adguardhome
```

:::caution

- 依赖本地存储，不支持 HA 部署 [#573](https://github.com/AdguardTeam/AdGuardHome/issues/573)

:::

- conf/
  - AdGuardHome.yaml
- work/
  - data/
    - filters
    - sessions.db
    - stats.db
