---
title: xray
---

# xray

- [XTLS/Xray-core](https://github.com/XTLS/Xray-core)
  - MPLv2, Go
  - VLESS, XTLS, REALITY, XUDP, PLUX
  - XTLS 修改了 Go 的 TLS - 别的工具不好集成
  - XTLS 协议的原理是将代理过程中的两条 TLS 请求合并成一条 TLS，减少一次 TLS 加密过程来达到提升性能的目的
    - https://github.com/rprx/v2ray-vless/releases/tag/xtls
  - 由于 License 问题独立 https://github.com/XTLS/Go/issues/9
    - 作者 RPRX 将 License 收紧
    - https://github.com/XTLS/Go/issues/9#issuecomment-1094515399
- 参考
  - https://github.com/XTLS/Xray-core/issues/1896

:::tips

- xray-core licence 比 sing-box 的 GPL 更宽松, 比 v2fly/v2ray-core 更严格
- xray 比 sing-box 在 vless, trojan 的认证相关支持更好
  - 支持多账户
- 不建议作为客户端
  - 不支持 TUN
  - 不支持 mixed - http & socks 同端口
- 不支持 reload
- 配置相对比较繁琐但比较严谨

:::

```bash
brew install xray
# https://github.com/XTLS/Xray-core/releases
# /etc/xray/
docker run --rm -it --name proxy ghcr.io/xtls/xray-core:25.1.1
# reload
docker exec proxy xray run -test -dump -confdir /etc/xray && docker restart proxy && docker logs -f --tail 100 proxy

xray run -c config.json
xray run -test -dump -confdir /etc/xray

# vless client id
# https://github.com/XTLS/Xray-core/issues/158
xray uuid -i "自定义字符串"
```

- 配置支持环境变量 `env:PORT`
- 入
  - dokodemo-doo
  - http
  - shadowsocks
  - socks
  - vless
  - vmess
  - trojan
  - wireguard

## conf

- 使用 pb 做配置 序列化
- 支持 json, yaml, toml 配置
- 支持配置文件后缀 pb, protobuf, json, jsonc, yaml, yml, toml
- https://xtls.github.io/config/

## Notes

- policy.Manager
  - level -> policy.Session
    - stats, timeout

## Vless

- 至少 18 byte
- 使用 PB 封装 meta/header 信息
- 指令 指令（TCP、UDP、Mux）
- https://xtls.github.io/development/protocols/vless.html
