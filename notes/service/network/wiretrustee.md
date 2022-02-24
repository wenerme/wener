---
title: wiretrustee
---

# wiretrustee

- [wiretrustee/wiretrustee](https://github.com/wiretrustee/wiretrustee) 是什么？
  - BSD-3, Go
  - 基于 WebRTC, STUN, TURN 的 P2P 网络通道


:::caution

- 目前没有 iOS & Android 应用 - [#115](https://github.com/wiretrustee/wiretrustee/issues/115)

:::

```bash
sudo wiretrustee init \
  --stunURLs stun:stun.wiretrustee.com:3468,stun:stun.l.google.com:19302 \
  --turnURLs <TURN User>:<TURN password>@turn:stun.wiretrustee.com:3468  \
  --signalAddr signal.wiretrustee.com:10000  \
  --wgLocalAddr 10.30.30.1/24  \
  --log-level info

sudo wiretrustee add-peer --allowedIPs 10.30.30.2/32 --key '<REMOTE PEER WIREUARD PUBLIC KEY>'
sudo wiretrustee up --log-level info

wiretrustee signal --log-level INFO
```
