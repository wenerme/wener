---
title: TCP
---

# TCP

- KCM - kernel connection multiplexer
  - https://www.kernel.org/doc/Documentation/networking/kcm.txt
  - https://lwn.net/Articles/657999/
- MPTCP - Multipath TCP
  - Linux 5.6+ MPTCP v1
  - [rfc8684](https://www.rfc-editor.org/rfc/rfc8684.html)
    TCP Extensions for Multipath Operation with Multiple Addresses
  - https://www.mptcp.dev/
  - http://multipath-tcp.org/
  - https://lwn.net/Articles/544399/
  - 多路 TCP
  - inverse multiplexing
  - 兼容 TCP
  - wiki [Multipath TCP](https://en.wikipedia.org/wiki/Multipath_TCP)
  - 使用场景
    - 多网络时快速切换
    - 聚合多网络
    - 利用多 wan 口
