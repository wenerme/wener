---
title: stun
---

# stun

- DNS SRV `_stun._udp.example.com`
- 参考
  - [iptable matching rule for STUN/TURN traffic](https://askubuntu.com/questions/1043752)
  - [pion/turn](https://github.com/pion/turn)
    - MIT, Golang STUN/TURN Client/Server
  - [coturn/coturn](https://github.com/coturn/coturn)
    - BSD-3, C TURN/STUN Server

| port     | desc                    |
| -------- | ----------------------- |
| 3478/udp | STUN                    |
| 3478/tcp | STUN/TLS - de-multiplex |
| 5349/tcp | TLS                     |

## Knonw STUN Server

- stun.stunprotocol.org:3478
- stun.zoiper.com
- stun.linphone.org
- 参考
  - voip-info [stun](https://www.voip-info.org/stun/)

```bash
dig srv _stun._udp.stun.linphone.org
# _stun._udp.stun.linphone.org. 2527 IN   SRV     0 100 3478 stun.linphone.org.
# _stun._udp.stun.linphone.org. 2527 IN   SRV     10 100 3478 sip1.linphone.org.
```
