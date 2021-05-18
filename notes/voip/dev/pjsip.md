---
title: PJSIP
---

# PJSIP

## Tips

- [pjsip.org](http://www.pjsip.org/)
  - Write in C
  - 支持 C++， Pythone 和 Java
    - http://www.pjsip.org/docs/book-latest/html/intro_pjsua2.html
- [pjsip/pjproject](https://github.com/pjsip/pjproject)
- [pjproject/APKBUILD](https://git.alpinelinux.org/cgit/aports/tree/main/pjproject/APKBUILD)
- [PJSIP-Datasheet](https://trac.pjsip.org/repos/wiki/PJSIP-Datasheet)
- [Roadmap](https://trac.pjsip.org/repos/roadmap)
- [Open Source SIP Stack and Media Links](http://www.pjsip.org/links.htm)
- Asterisk 13 开始可以选择使用封装的 pjsip
- WebRTC
  - https://github.com/pjsip/pjproject/tree/master/third_party/webrtc
- SRTP 基于 https://github.com/cisco/libsrtp
- https://github.com/pjsip/pjproject/tree/master/pjsip-apps/src/swig

## Versions

- [2.11](https://github.com/pjsip/pjproject/releases/tag/2.11)
  - 2021-03-17
  - Trickle ICE
  - iOS native SSL
  - Android native codecs - H264, VP8, VP9, AMR-NB, AMR-WB
  - iOS Swift 和 Android Kotlin [示例应用](https://github.com/pjsip/pjproject/tree/2.11/pjsip-apps)
- [2.10](https://trac.pjsip.org/repos/milestone/release-2.10)
  - 2019-12-31
  - WebRTC 视频交互 - RTCP-FB PLI, VP8 VP9 编码
  - 音频
    - 基于 RTCP 动态调整码率 - Opus, AMR, Speex
    - MacOS Voice Processing IO
- [2.9](https://trac.pjsip.org/repos/milestone/release-2.9)
  - 2019-6-13
  - 视频会议
  - macOS & iOS native SSL backen
  - TURN over TLS
  - SIP 多路监听
- [2.8](https://trac.pjsip.org/repos/milestone/release-2.8)
  - 2018-9-5
  - 主要
    - OPUS param on the fly
    - WebRTC interopability - RTP/SAVPF - SSRC
- [2.7](https://trac.pjsip.org/repos/milestone/release-2.7)
  - 2017-9-25
  - 主要
    - DTLS for SRTP keying
    - iOS (and Mac) H.264 Native Encoder and Decoder
    - NAT64
- [2.6](http://trac.pjsip.org/repos/milestone/release-2.6)
  - 2017-1-25
  - 主要
    - WinRT/Win10 support
  - [#1946](https://trac.pjsip.org/repos/ticket/1946)
    - Assertion in deinitializing client auth session when dialog creation fails
    - 在之前版本中导致了大量异常

## FAQ

### How can I apply a fix from a particular ticket ?

- https://trac.pjsip.org/repos/wiki/FAQ#afix
- 找到对应的 Ticket
- 找到所有 Ticket 的 Change Set
- 下载 Change Set 为 Unified Diff
  - `curl 'https://trac.pjsip.org/repos/changeset/5401?format=diff' -o changeset_r5401.patch`
- 应用补丁
  - `patch -p4 --dry-run < changeset_r3743.diff`
