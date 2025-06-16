---
title: FRP
---

# frp

- [fatedier/frp](https://github.com/fatedier/frp) 是什么？
  - 基于端口的 4 层反向代理
  - 基于 vhost 的 7 层反向代理
  - 服务端支持 http, tcp, udp, kcp
  - 服务端支持 ws 暴露 - TCP over Websocket
  - 代理支持 tcp,udp,http,https,stcp,xtcp
    - stcp - 两个客户端通过共享密钥互通
    - xtcp - NAT 穿透 P2P - 成功率低
      - 支持 fallback
  - 服务端和客户端支持简单 dashboard
- [文档](https://gofrp.org/docs/)
- 默认端口 7000
- 组件
  - frps - 服务端 - 一般有外网 IP
  - frpc - 客户端 - 一般位于内网, 期望被外网访问, A -> frps -> frpc
- 缺陷
  - xtcp 点到点穿透率低, 基本失败, 如果需要 p2p 可选择 tinc.
- 参考
  - [gofrp/fp-multiuser](https://github.com/gofrp/fp-multiuser)
  - [koho/frpmgr](https://github.com/koho/frpmgr)

```bash
apk add frp       # AlpineLinux
brew install frpc # macOS
# https://github.com/fatedier/frp/releases

# -t frps 的认证 token
# -d 自定义域名
# -l 本地服务端口
# -u 名字 - 标识作用
frpc http -t TOKEN -l 3000 -u wener -d wener.frp.wener.me -s frp.wener.me:80 -uc -ue -p websocket

# Reload
curl http://admin:admin@127.0.0.1:7400/api/reload

# debug port
apk add iproute2-ss
ss -lntp

curl -s https://api.github.com/repos/fatedier/frp/releases/latest | jq -r .tag_name

# -u wener -n ssh -> wener.ssh
frpc stcp --sk SECRET -t TOKEN -l 22 -u wener -n ssh -s frp.wener.me -P 443 -p wss --ue --uc

# 检查配置
frpc verify -c /etc/frp/frpc.yaml
```

## frps

```bash

```

# FAQ

## get sid from visitor error

nat 穿透率低, 目前没有解决方案. 如果需要 p2p 建议选择其他方案, 例如 tinc.

## start new visitor connection error: custom listener for doesn't exist

visitor 端出现, 应该是没有配置 server_name

## websocket.Dial ws://frps:443/~!frp: unexpected EOF

- 0.51 支持 wss
- `protocol=wss`
