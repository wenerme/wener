---
id: channel
title: Asterisk 通道
---

# Asterisk 通道

- [Channel Drivers](https://wiki.asterisk.org/wiki/display/AST/Channel+Drivers)

```bash
# 所有注册的通道类型
core show channeltypes
```

## 通道类型

- chan_oss、chan_alsa、chan_console 只能注册一个 - 因为在做同一件事
- SIP 功能可由 chan_sip 和 chan_pjsip 提供 - 目前建议使用 pjsip
- IAX 是 asterisk 之间的通讯协议 - 用于实现多实例，互相发现，外部线路等

| Type         | Description                              | Devicestate | Presencestate | Indications | Transfer |
| ------------ | ---------------------------------------- | ----------- | ------------- | ----------- | -------- |
| Announcer    | Bridge Media Announcing Channel Driver   | no          | no            | yes         | no       |
| CBAnn        | Conference Bridge Announcing Channel     | no          | no            | yes         | no       |
| CBRec        | Conference Bridge Recording Channel      | no          | no            | no          | no       |
| Console      | OSS Console Channel Driver               | no          | no            | yes         | no       |
| DAHDI        | DAHDI Telephony w/PRI                    | yes         | no            | yes         | no       |
| Dongle       | Huawei 3G Dongle Channel Driver          | yes         | no            | yes         | no       |
| IAX2         | Inter Asterisk eXchange Driver (Ver 2)   | yes         | no            | yes         | yes      |
| Local        | Local Proxy Channel Driver               | yes         | no            | yes         | no       |
| MGCP         | Media Gateway Control Protocol (MGCP)    | yes         | no            | yes         | no       |
| MulticastRTP | Multicast RTP Paging Channel Driver      | no          | no            | no          | no       |
| PJSIP        | PJSIP Channel Driver                     | yes         | no            | yes         | yes      |
| Recorder     | Bridge Media Recording Channel Driver    | no          | no            | yes         | no       |
| SIP          | Session Initiation Protocol (SIP)        | yes         | no            | yes         | yes      |
| Skinny       | Skinny Client Control Protocol (Skinny)  | yes         | no            | yes         | no       |
| Surrogate    | Surrogate channel used to pull channel f | no          | no            | no          | no       |
| UnicastRTP   | Unicast RTP Media Channel Driver         | no          | no            | no          | no       |
| USTM         | UNISTIM Channel Driver                   | no          | no            | yes         | no       |

> chan_mobile 和 chan_dongle 没显示 - 因为注册失败

## 通道模块

| Module               | Description                             | Support Level |
| -------------------- | --------------------------------------- | ------------: |
| chan_bridge_media.so | Bridge Media Channel Driver             |          core |
| chan_dahdi.so        | DAHDI Telephony w/PRI                   |          core |
| chan_dongle.so       | Huawei 3G Dongle Channel Driver         |      extended |
| chan_iax2.so         | Inter Asterisk eXchange (Ver 2)         |          core |
| chan_mgcp.so         | Media Gateway Control Protocol (MGCP)   |      extended |
| chan_mobile.so       | Bluetooth Mobile Device Channel Driver  |      extended |
| chan_oss.so          | OSS Console Channel Driver              |    deprecated |
| chan_pjsip.so        | PJSIP Channel Driver                    |          core |
| chan_rtp.so          | RTP Media Channel                       |          core |
| chan_sip.so          | Session Initiation Protocol (SIP)       |      extended |
| chan_skinny.so       | Skinny Client Control Protocol (Skinny) |      extended |
| chan_unistim.so      | UNISTIM Protocol (USTM)                 |      extended |


# FAQ

## chan_sip vs chan_pjsip

- chan_sip
  - 2014 年前 - SIP 早期
  - Asterisk <= 11
- chan_pjsip
  - Asterisk >= 12
  - 基于 PJSIP 库 - 独立于 Asterisk
- 如果只处理 VoIP - chan_sip 足矣
  - 传统的电话网关都使用非常老版本的 asterisk - 例如 1.8
- 如果需要处理现代化通讯 - 使用 chan_pjsip
  - Websocket
  - WebRTC
  - 视频
  - 新的编码 - Opus, VP8, VP9
- 参考
  - [Migrating from chan_sip to res_pjsip](https://wiki.asterisk.org/wiki/display/AST/Migrating+from+chan_sip+to+res_pjsip)
