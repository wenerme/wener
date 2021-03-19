---
title: PJSIP
---

# PJSIP

## Tips
* [pjsip.org](http://www.pjsip.org/)
  * Write in C
  * 支持 C++， Pythone 和 Java
    * http://www.pjsip.org/docs/book-latest/html/intro_pjsua2.html
* [pjsip/pjproject](https://github.com/pjsip/pjproject)
* [pjproject/APKBUILD](https://git.alpinelinux.org/cgit/aports/tree/main/pjproject/APKBUILD)
* [PJSIP-Datasheet](https://trac.pjsip.org/repos/wiki/PJSIP-Datasheet)
* [Roadmap](https://trac.pjsip.org/repos/roadmap)
* [Open Source SIP Stack and Media Links](http://www.pjsip.org/links.htm)
* Asterisk 13 开始可以选择使用封装的 pjsip
* WebRTC
  * https://github.com/pjsip/pjproject/tree/master/third_party/webrtc
* SRTP 基于 https://github.com/cisco/libsrtp

## Versions
* [2.8](https://trac.pjsip.org/repos/milestone/release-2.8)
  * 主要
    * OPUS param on the fly
    * WebRTC interopability - RTP/SAVPF - SSRC
* [2.7](https://trac.pjsip.org/repos/milestone/release-2.7)
  * 2017-9-25
  * 主要
    * DTLS for SRTP keying
    * iOS (and Mac) H.264 Native Encoder and Decoder
    * NAT64
* [2.6](http://trac.pjsip.org/repos/milestone/release-2.6)
  * 2017-1-25
  * 主要
    * WinRT/Win10 support
  * [#1946](https://trac.pjsip.org/repos/ticket/1946)
    * Assertion in deinitializing client auth session when dialog creation fails
    * 在之前版本中导致了大量异常

## FAQ
### How can I apply a fix from a particular ticket ?
* https://trac.pjsip.org/repos/wiki/FAQ#afix
* 找到对应的 Ticket
* 找到所有 Ticket 的 Change Set
* 下载 Change Set 为 Unified Diff
  * `curl 'https://trac.pjsip.org/repos/changeset/5401?format=diff' -o changeset_r5401.patch`
* 应用补丁
  * `patch -p4 --dry-run < changeset_r3743.diff`
