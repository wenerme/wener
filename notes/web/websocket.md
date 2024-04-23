---
title: WebSocket
---

# websocket

```
Sec-Websocket-Extensions: permessage-deflate; client_max_window_bits
Sec-Websocket-Key: 3jdknZ3cA9awItgV8bJ88A==
Sec-Websocket-Version: 13
```

- Sec-Websocket-Extensions
  - permessage-deflate - 启用压缩
  - client_max_window_bits - 最大压缩窗口大小
- Sec-Websocket-Key
  - 16 字节随机值
  - 用于验证服务器正确理解 WebSocket
  - 返回 Sec-WebSocket-Accept
- Sec-Websocket-Version
  - 13

```bash
curl \
    --include \
    --no-buffer \
    --header "Connection: Upgrade" \
    --header "Upgrade: websocket" \
    --header "Host: example.com:80" \
    --header "Origin: http://example.com:80" \
    --header "Sec-WebSocket-Key: SGVsbG8sIHdvcmxkIQ==" \
    --header "Sec-WebSocket-Version: 13" \
    http://example.com:80/
```

## WebSockets over HTTP/2

- [rfc8441](https://datatracker.ietf.org/doc/html/rfc8441) Bootstrapping WebSockets with HTTP/2
- [Chrome 91](https://www.chromestatus.com/feature/6251293127475200)
- HAProxy 2.4.9 - [haproxy#1364](https://github.com/haproxy/haproxy/issues/1364)
- Golang 暂不支持
  - [golang/go#32763](https://github.com/golang/go/issues/32763)
  - [nhooyr/websocket#4](https://github.com/nhooyr/websocket/issues/4)
