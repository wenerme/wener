---
title: blocky
---

# Blocky

- [0xERR0R/blocky](https://github.com/0xERR0R/blocky)
  - Apache-2.0, Go
  - Blocking
  - 支持自定义规则
  - 支持多协议
    - DNS over UDP and TCP
    - DNS over HTTPS (aka DoH)
    - DNS over TLS (aka DoT)
  - 支持 DNSSEC, eDNS

```bash
curl -L -o blocky.tar.gz https://github.com/0xERR0R/blocky/releases/download/v0.23/blocky_v0.23_$(uname -o)_$(uname -m).tar.gz
tar zxvf blocky.tar.gz

./blocky version

curl -LO https://0xerr0r.github.io/blocky/v0.23/config.yml
# 注释掉 redis.address
./blocky serve -c config.yaml
```

- https://0xerr0r.github.io/blocky/v0.23/configuration/
- https://0xerr0r.github.io/blocky/v0.23/config.yml
