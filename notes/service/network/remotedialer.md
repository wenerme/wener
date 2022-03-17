---
title: remotedialer
---

# remotedialer

- [rancher/remotedialer](https://github.com/rancher/remotedialer)
  - 使用 websocket 建立通道
  - tcp over websocket
  - 内部会管理多个客户端
  - 通过通道进行 `Dial` - 相当于通过远程进行调用
- Adopter
  - k3s, rancher
  - inlets - 将通道能力作为产品功能
