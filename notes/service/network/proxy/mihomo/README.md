---
title: mihomo
---

# mihomo

- [MetaCubeX/mihomo](https://github.com/MetaCubeX/mihomo/tree/Alpha)
  - GPLv3
  - fork 自 [clash](../clash/README.md)
  - Clash.Meta -> mihomo
- 参考
  - [MetaCubeX/metacubexd](https://github.com/MetaCubeX/metacubexd)
    - 前端

```bash
brew install mihomo # macOS

# https://github.com/MetaCubeX/mihomo/releases
VERSION=1.19.16
# macOS
curl -L -o mihomo.gz https://github.com/MetaCubeX/mihomo/releases/download/v${VERSION}/mihomo-darwin-arm64-v${VERSION}.gz
# Linux
curl -L -o mihomo.gz https://github.com/MetaCubeX/mihomo/releases/download/v${VERSION}/mihomo-linux-amd64-compatible-v${VERSION}.gz

gzip -d mihomo.gz
chmod +x mihomo
./mihomo -v
./mihomo --help

# install
sudo mv mihomo /usr/local/bin/mihomo

curl -LO https://github.com/wenerme/wener/raw/master/notes/service/network/proxy/clash/mihomo.openrc.sh
sudo mv mihomo.openrc.sh /etc/init.d/mihomo
sudo chmod +x /etc/init.d/mihomo

# /etc/mihomo/config.yaml
mkdir -p /etc/mihomo
```

| flag                 | env                                     | for                     |
| -------------------- | --------------------------------------- | ----------------------- |
| `-config BASE64`     | CLASH_CONFIG_STRING                     | base64-encoded 配置内容 |
| `-d DIR`             | CLASH_HOME_DIR                          | 配置目录                |
| `-ext-ctl ADDR`      | CLASH_OVERRIDE_EXTERNAL_CONTROLLER      | 外部控制器地址          |
| `-ext-ctl-pipe ADDR` | CLASH_OVERRIDE_EXTERNAL_CONTROLLER_PIPE | 外部控制器管道地址      |
| `-ext-ctl-unix ADDR` | CLASH_OVERRIDE_EXTERNAL_CONTROLLER_UNIX | 外部控制器 Unix 地址    |
| `-ext-ui DIR`        | CLASH_OVERRIDE_EXTERNAL_UI_DIR          | 外部 UI 目录            |
| `-f FILE`            | CLASH_CONFIG_FILE                       | 配置文件                |
| `-m`                 |                                         | GeoData 模式            |
| `-secret SECRET`     | CLASH_OVERRIDE_SECRET                   | RESTful API 密钥        |
| `-t`                 |                                         | 测试配置并退出          |

- QUIC_GO_DISABLE_GSO
- QUIC_GO_DISABLE_ECN
- DISABLE_SYSTEM_HOSTS
- DISABLE_LOOPBACK_DETECTOR
- SKIP_SAFE_PATH_CHECK
- DISABLE_SYSTEM_CA
- DISABLE_EMBED_CA
- LISTEN_NAMEDPIPE_SDDL
  - windows

## 配置 {#config}

- https://github.com/MetaCubeX/mihomo/blob/Alpha/docs/config.yaml
- https://wiki.metacubex.one/config/
- rules

## Notes

- tun
  - 大多数参数都只针对 linux
  - https://github.com/metacubex/sing-tun
    - fork [SagerNet/sing-tun](https://github.com/SagerNet/sing-tun)
  - auto-redirect
    - 支持 iptables, nftables

# FAQ

- mrs - Mihomo Rule Set ?
  - MAGCI `MRS\0x1` - MSRv1
  - 提供 domain & ipcidr 列表
  - 体积更小
  - zstd 压缩

## ASN

```yaml
rules:
  - IP-ASN,22697,Proxy,no-resolve # Roblox
```

- ~/.config/mihomo/ASN.mmdb
- https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/GeoLite2-ASN.mmdb
