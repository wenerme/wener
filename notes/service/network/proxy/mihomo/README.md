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
# https://github.com/MetaCubeX/mihomo/releases
VERSION=1.18.7
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

## 配置 {#config}

- https://github.com/MetaCubeX/mihomo/blob/Alpha/docs/config.yaml
- https://wiki.metacubex.one/config/
- rules
