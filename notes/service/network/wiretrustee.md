---
title: wiretrustee
---

# wiretrustee

- [wiretrustee/wiretrustee](https://github.com/wiretrustee/wiretrustee) 是什么？
  - BSD-3, Go
  - 基于 WebRTC, STUN, TURN 的 P2P 网络通道


:::caution

- 目前强制依赖 Auth0 [#126](https://github.com/wiretrustee/wiretrustee/issues/126)
- 目前没有 iOS & Android 应用 - [#115](https://github.com/wiretrustee/wiretrustee/issues/115)
- 依赖外部 STUN 和 TURN

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


```bash
# Docker
docker run -it --rm \
  -p 80:80 -p 443:443 \
  -e AUTH0_DOMAIN=<SET YOUR AUTH DOMAIN> \
  -e AUTH0_CLIENT_ID=<SET YOUR CLIENT ID> \
  -e AUTH0_AUDIENCE=<SET YOUR AUDIENCE> \
  -e WIRETRUSTEE_MGMT_API_ENDPOINT=<SET YOUR MANAGEMETN API URL> \
  --name wiretrustee-dashboard wiretrustee/dashboard:main
```
