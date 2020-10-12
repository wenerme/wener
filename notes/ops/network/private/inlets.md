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

## 笔记
* 使用 websocket 进行 tunnel
  * 类似项目 [google/huproxy](https://github.com/google/huproxy) - 非常简单，好理解
  * 使用 [rancher/remotedialer](https://github.com/rancher/remotedialer) 实现 TCP over HTTP WebSocket
  * 通过 client 发起 dial，通过 ws 建立通道
* HTTP 头
  * `x-inlets-id` - 客户端 uuid
  * `x-inlets-upstream` - 需要客户端请求的上游
* 没有处理 http2
  * pro 有
  * 因此无法使用 grpc2
  * 检测 http2 支持 `curl -sI https://curl.haxx.se -o/dev/null -w '%{http_version}\n'`
* 路由逻辑在 `pkg/router`
* server
  * `/` - 前端代理
  * `/tunnel` - client 过来的通道
