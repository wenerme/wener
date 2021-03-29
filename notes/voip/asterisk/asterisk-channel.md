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

- chan_mobile 和 chan_dongle 没显示 - 因为注册失败
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

## 通道模块

```
Module                         Description                              Use Count  Status      Support Level
chan_bridge_media.so           Bridge Media Channel Driver              0          Running              core
chan_dahdi.so                  DAHDI Telephony w/PRI                    0          Running              core
chan_dongle.so                 Huawei 3G Dongle Channel Driver          0          Not Running      extended
chan_iax2.so                   Inter Asterisk eXchange (Ver 2)          0          Running              core
chan_mgcp.so                   Media Gateway Control Protocol (MGCP)    0          Running          extended
chan_mobile.so                 Bluetooth Mobile Device Channel Driver   0          Not Running      extended
chan_oss.so                    OSS Console Channel Driver               0          Running        deprecated
chan_pjsip.so                  PJSIP Channel Driver                     0          Running              core
chan_rtp.so                    RTP Media Channel                        0          Running              core
chan_sip.so                    Session Initiation Protocol (SIP)        0          Running          extended
chan_skinny.so                 Skinny Client Control Protocol (Skinny)  0          Running          extended
chan_unistim.so                UNISTIM Protocol (USTM)                  0          Running          extended
12 modules loaded
```
