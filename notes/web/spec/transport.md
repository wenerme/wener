---
title: Transport
---

# Transport

- WebSockets
  - HTTP 1.1
  - 基于 TCP, Frame
  - 单一、可靠、有序的消息流
- WebTransport - Chrome 97
  - 基于 HTTP/3, QUIC, UDP
  - 双向，低延迟 - 不保证可靠性、有序
  - 支持 Web Workers
  - 使用 Streams API 交互 - SendStream、ReceiveStream、BidirectionalStream
- WebRTC - Chrome 24, Safari 11
  - RTP/RTCP -  RFC3550
  - ICE 、DTLS、SCTP
  - RTCDataChannel
- Long Polling
  - 服务端不结束响应
- SSE - Server Sent Event
  - 类似 Long Polling
