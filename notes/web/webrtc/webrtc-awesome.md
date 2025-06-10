---
title: WebRTC Awesome
tags:
  - Awesome
---

# WebRTC Awesome

- [webrtc/samples](https://github.com/webrtc/samples)
  WebRTC Web demos and samples
- [webrtc/apprtc](https://github.com/webrtc/apprtc)
  - [appr.tc](https://appr.tc)
- [rtctunnel/rtctunnel](https://github.com/rtctunnel/rtctunnel)
  network tunnels over WebRTC
- [jitsi/jitsi-meet](https://github.com/jitsi/jitsi-meet)
  Secure, Simple and Scalable Video Conferences
- [obsproject/obs-studio](https://github.com/obsproject/obs-studio)
  video recording and live streaming
- [peers/peerjs](https://github.com/peers/peerjs)
  - MIT, Typescript
- [peers/peerjs-server](https://github.com/peers/peerjs-server)
- [livekit/livekit-server](https://github.com/livekit/livekit-server)
  Distributed audio/video rooms over WebRTC
  - Apache-2.0, Go
- [WebRTC-HTTP ingestion protocol](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html)
  - WHIP
- [glimesh/broadcast-box](https://github.com/glimesh/broadcast-box)
  - supported by
    - OBS, ffmpeg
- [AlexxIT/go2rtc](https://github.com/AlexxIT/go2rtc)
- https://github.com/Yahweasel/libav.js/
- [node-webrtc/node-webrtc](https://github.com/node-webrtc/node-webrtc)
  - [WebRTC](https://chromium.googlesource.com/external/webrtc/+/branch-heads/m79) 的 Node 绑定
  - `yarn add wrtc`
  - Node 支持 armv7l、arm64、x64
  - Electron 支持 x64
- TURN/STUN Server
  - [coturn/coturn](https://github.com/coturn/coturn)
    - BSD-3, C TURN/STUN Server
  - [pion/turn](https://github.com/pion/turn)
    Golang, TURN Server/Client
- Golang
  - [pion](https://github.com/pion) Golang, MIT, WebRTC
    - [pion/ion](https://github.com/pion/ion)
      Distributed RTC System by pure Go and Flutter
    - [pion/dtls](https://github.com/pion/dtls)
      Golang, DTLS 1.2 Server/Client
    - [pions/webrtc](https://github.com/pion/webrtc)
      - MIT, Golang
      - WebRTC API
  - ~~[keroserene/go-webrtc](https://github.com/keroserene/go-webrtc)~~
- Gateway
  - [meetecho/janus-gateway](https://github.com/meetecho/janus-gateway)
    - GPL-3.0, C
- C/C++
  - [paullouisageneau/libdatachannel](https://github.com/paullouisageneau/libdatachannel)
    - MPL-2.0, C++
    - SSL - GnuTLS, Mbed TLS, OpenSSL
    - usrsctp
    - Plog
    - libjuice
    - libsrtp
    - nlohmann/json
    - [WASM](https://github.com/paullouisageneau/datachannel-wasm)
- NodeJS
  - [shinyoshiaki/werift-webrtc](https://github.com/shinyoshiaki/werift-webrtc)
    - TS 实现
    - ICE/DTLS/SCTP/RTP
  - [murat-dogan/node-datachannel](https://github.com/murat-dogan/node-datachannel)
    - binding libdatachannel
  - ~~[node-webrtc/node-webrtc](https://github.com/node-webrtc/node-webrtc)~~
- Spec
  - https://w3c.github.io/p2p-webtransport/
- Ecosystem
  - [bitwhip/bitwhip](https://github.com/bitwhip/bitwhip)
    - MIT, Rust
    - CLI Native WebRTC Agent in Rust
  - [Glimesh/broadcast-box](https://github.com/Glimesh/broadcast-box)
    - MIT, Go
  - [obsproject/obs-studio#7926](https://github.com/obsproject/obs-studio/pull/7926)
    - OBS 支持 WebRTC 输出
  - ffmpeg 支持 WebRTC - WHIP

| abbr. | stand for                              | meaning              |
| ----- | -------------------------------------- | -------------------- |
| DTLS  | Datagram Transport Layer Security      | 数据报传输层安全协议 |
| ICE   | Interactive Connectivity Establishment | 交互式连接建立       |
| RTC   | Real-Time Communication                | 实时通信             |
| SCTP  | Stream Control Transmission Protocol   | 流控制传输协议       |
| SDP   | Session Description Protocol           | 会话描述协议         |
| SRTP  | Secure Real-time Transport Protocol    | 安全实时传输协议     |
| STUN  | Session Traversal Utilities for NAT    | NAT 会话遍历实用工具 |
| SVC   | Scalable Video Coding                  | 可伸缩视频编码       |
| TURN  | Traversal Using Relays around NAT      | NAT 中继穿越         |
| WHIP  | WebRTC HTTP Ingestion Protocol         | WebRTC HTTP 输入协议 |

- WHIP
  - WebRTC 推流
  - https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html
    - 使用一个 HTTP POST 请求来完成一次性的 SDP (Session Description Protocol) 要约/应答过程
    - 在编码器/媒体生产者（WHIP 客户端）与广播摄取端点（媒体服务器）之间建立一个 ICE/DTLS 会话
    - 会话一旦建立，媒体流就会单向地从客户端流向服务器。
- Simulcast 同播
  - 同一个媒体源（例如，同一个摄像头或麦克风）发送多个不同编码版本的媒体流，并通过不同的 RTP 流进行传输
  - [RFC 8853](https://datatracker.ietf.org/doc/html/rfc8853)
    - 《在会话描述协议 (SDP) 和 RTP 会话中使用 Simulcast》

## WebCodecs

- VideoEncoder, VideoDecoder, AudioWorkletm
- requestAnimationFrame
- https://caniuse.com/webcodecs
  - Chrome 94+

## WebTransport

- 加密、拥塞控制、独立流、1RTT、UDP 端口复用、透明网络迁移
- HTTP/3
- https://caniuse.com/webtransport
  - Chrome 97+

## 参考/References

- https://quic.video/blog/replacing-webrtc/
- [Explaining the WebRTC Secure Real-Time Transport Protocol (SRTP)](https://www.callstats.io/blog/2018/05/16/explaining-webrtc-secure-real-time-transport-protocol-srtp)
- [A Study of WebRTC Security](https://webrtc-security.github.io)
- [WebRTC 安全性的研究](https://webrtc.org.cn/webrtc-security)

## stun

- stun.stunprotocol.org:3478
- stun.l.google.com:19302
- stun1.l.google.com:19302
- stun2.l.google.com:19302
- stun3.l.google.com:19302
- stun4.l.google.com:19302
- stun01.sipphone.com
- stun.ekiga.net
- stun.fwdnet.net
- stun.ideasip.com
- stun.iptel.org
- stun.rixtelecom.se
- stun.schlund.de
- stunserver.org
- stun.softjoys.com
- stun.voiparound.com
- stun.voipbuster.com
- stun.voipstunt.com
- stun.voxgratia.org
- stun.xten.com
- stun.fwdnet.net
- stun.voxgratia.org
- stun.xten.com
- s1.taraba.net
- s2.taraba.net
- s1.voipstation.jp
- s2.voipstation.jp
- numb.viagenie.ca
- stun.counterpath.com

---

- stuns https://gist.github.com/zziuni/3741933

## turn

- turn2.l.google.com
