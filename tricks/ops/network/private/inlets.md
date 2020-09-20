---
id: inlets
title: inlets 通道
---

# inlets
## Tips
* [inlets/inlets](https://github.com/inlets/inlets) - L7 HTTP/HTTPS 通道 - MIT
  * tunnel 客户端和服务端
  * 一个进程一个 tunnel
  * 自动重连
  * 支持 ws 和 wss 通讯
  * 支持 http, https, ws 通道
  * 默认开启 CORS - `--disable-transport-wrapping`
  * 注意 ⚠️ 不支持 __gRPC__
* inlets-pro - L4 通道 - 商业授权
  * 支持 TCP 自动 TLS 加密
  * 个人 180/年，商业 5 通道 1860/年 额外通道 20/月
* [inlets/inletsctl](https://github.com/inlets/inletsctl)
  * 自动安装配置

```bash
# macOS
brew install inlets

# 服务端
# http://localhost:8000
# -t 可设置 Token
inlets server

# 客户端
python -m SimpleHTTPServer 8123
# 启动后访问 localhost:8000 即可
# remote 使用 ws 协议
inlets client --remote 127.0.0.1:8000 --upstream http://127.0.0.1:8123
```

## kubernetes operator
* [inlets/inlets-operator](https://github.com/inlets/inlets-operator)
