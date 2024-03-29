---
id: version
title: Asterisk 版本
---

# Asterisk Version

| Ver            | Type     | Release    | EOL        |
| -------------- | -------- | ---------- | ---------- |
| [Asterisk 20]  | LTS      | 2022-10-19 | 2027-10-19 |
| [Asterisk 19]  | Standard | 2021-11-02 | 2023-11-02 |
| [Asterisk 18]  | LTS      | 2020-10-20 | 2024-10-20 |
| [Asterisk 17]  | Standard | 2019-10-28 | 2021-10-28 |
| [Asterisk 16]  | LTS      | 2018-10-09 | 2022-10-09 |
| [Asterisk 15]  | Standard | 2017-10-03 | 2019-10-03 |
| [Asterisk 14]  | Standard | 2016-09-26 | 2018-09-26 |
| [Asterisk 13]  | LTS      | 2014-10-24 | 2020-10-24 |
| [Asterisk 11]  | LTS      | 2012-10-25 | 2017-10-25 |
| [Asterisk 1.8] | LTS      | 2010-10-21 | 2015-10-21 |
| [Asterisk 1.4] | LTS      | 2006-12-23 | 2012-04-21 |

[asterisk 20]: #asterisk-20
[asterisk 19]: #asterisk-19
[asterisk 18]: #asterisk-18
[asterisk 17]: #asterisk-17
[asterisk 16]: #asterisk-16
[asterisk 15]: #asterisk-15
[asterisk 14]: #asterisk-14
[asterisk 13]: #asterisk-13
[asterisk 11]: #asterisk-11
[asterisk 10]: #asterisk-10
[asterisk 1.8]: #asterisk-1.8

```bash
# 获取给的版本源码
curl -O https://downloads.asterisk.org/pub/telephony/asterisk/asterisk-18-current.tar.gz
```

- [Versions](https://wiki.asterisk.org/wiki/display/AST/Asterisk+Versions)
- [CHANGES](https://github.com/asterisk/asterisk/blob/master/CHANGES)
- [edge/main/x86_64/asterisk](https://pkgs.alpinelinux.org/package/edge/main/x86_64/asterisk)
  - edge 版
- JIRA [Change Log](https://issues.asterisk.org/jira/browse/ASTERISK/?selectedTab=com.atlassian.jira.jira-projects-plugin:changelog-panel)
- [res_pjsip: Enable DNS support.](https://reviewboard.asterisk.org/r/3343/diff/)
- debian asterisk [tracker](https://tracker.debian.org/pkg/asterisk)
- [Certified Asterisk](https://www.asterisk.org/products/software/certified-asterisk/)
  - 一年发布 2-4 次
  - 确保更加稳定 - 官方提供支持确保 SLA
  - 提供商业服务支持
  - 默认只包含 core 模块
  - 16 LTS

## Asterisk 20

## Asterisk 19

- debug log categories
  - dtls, dtls_packet, ice, rtcp, rtcp_packet, rtp, rtp_packet, stun, and stun_packet
  - "simple" record formatting mode
- app_voicemail - send greeting and instructions
- astcachedir - /var/cache/asterisk
- app_confbridge - force the estimated bitrate on an SFU
- Originate 可设置变量
- ConfKick
- app_dial - A
- app_morsecode
- [CHANGES](https://raw.githubusercontent.com/asterisk/asterisk/19/CHANGES)

## Asterisk 18

- LTS | 2020-10-20 - 2024-10-20
- logger 新增 plain 格式 - 包含文件名，方法代码行
- 支持 H.265/HEVC
- 支持 [AudioSocket](https://wiki.asterisk.org/wiki/display/AST/AudioSocket) 协议
  - chan_audiosocket, app_audiosocket
  - 基于 TCP 的音频传输协议 - 适用于局域网实现音频处理 server - 例如 AI
  - [CyCoreSystems/audiosocket](https://github.com/CyCoreSystems/audiosocket)
  - [Audio Pipes : playing with real-time audio with Asterisk](https://www.youtube.com/watch?v=tjduXbZZEgI)
- STIR/SHAKEN - Secure Telephony Identity Revisited / Signature-based Handling of Asserted information using toKENs
  - 避免伪造 callerid
- [CHANGES](https://raw.githubusercontent.com/asterisk/asterisk/18/CHANGES)

## Asterisk 17

- 废弃 **chan_sip**
- ARI 支持应用事件过滤
- AttendedTransfer - queue up attended transfer to the given extensio
- BlindTransfer - redirect all channels currently bridged to the caller channel to the specified destination
- ConfBridge
  - remb_behavior 选项新增 average_all, highest_all, lowest_all
    - bridge 级别而不是每个来源级别控制
- Dial
  - RINGTIME 和 RINGTIME_MS 变量 - 秒和毫秒 - 创建通话通道和收到第一个 RINGING 信号的间隔
  - PROGRESSTIME 和 PROGRESSTIME_MS - 同上 - 处理 PROGRESS 信号 - 最低值应该为 PDD (Post Dial Delay)
  - DIALEDTIME_MS 和 ANSWEREDTIME_MS - DIALEDTIME 和 ANSWEREDTIME 的毫秒版本
- ReadExten - 添加 `p` 选项当用户按 `#` 时停止
- RTP/ICE
  - 可以使用 ice_host_candidate 本地地址
- pbx_dundi - DUNDi 支持 IPv4/IPv6 双绑定
- 新增 res_mwi_devstate 模块
  - 订阅语音信箱状态事件
- [Prometheus](https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+Configuration_res_prometheus) exporter

## Asterisk 16

- LTS 版本
- PG 12 https://github.com/asterisk/asterisk/commit/52ade18420b346449dff40d6bdb071444cf29e2d

### 新增

- WebRTC
  - 提示视频质量
  - 支持 REMB
    - 聚合预估每个客户端的可用带宽反馈给发送方 - 发送方可以此来调整包大小
  - 支持 NACK
    - 允许客户端请求重新发送来实现更好的乱序包处理
- PJSIP
  - 性能提升 - 允许更多的 AOR 且不影响启动时间
- ConfBridge
  - 文本消息会被中继转发 - 如果开启了 enable_events 还会发送 JSON 事件
- app_originate 支持 `a` 参数, 异步拨号, 不等待响应
- app_macro 模块废弃, 使用 app_stack (Gosub)
- res_config_sqlite 模块废弃, 使用 res_config_sqlite3
- res_monitor 模块废弃, 使用 app_mixmonitor
- cdr_syslog 模块废弃, 并且默认不会构建
- app_fax 模块废弃, 使用 res_fax

- 16.7
- 16.6.2

## Asterisk 15

- 默认使用 bundled pjproject
- 支持 RTCP Multiplexing 和 BUNDLE
  - [Multiplexing RTP Data and Control Packets on a Single Port](https://tools.ietf.org/html/rfc5761)
  - [Negotiating Media Multiplexing Using the SDP](https://datatracker.ietf.org/doc/draft-ietf-mmusic-sdp-bundle-negotiation/)
- Unified Plan
  - [A Unified Plan for Using SDP with Large Numbers of Media Flows draft-roach-mmusic-unified-plan-00](https://tools.ietf.org/html/draft-roach-mmusic-unified-plan-00)
  - multiple media streams per connection
- [asterisk/cyber_mega_phone_2k](https://github.com/asterisk/cyber_mega_phone_2k)
  - testing of Asterisk's (15+) multistream capabilities

## Asterisk 14

- Standard | 2016-09-26 - 2018-09-26
- 核心 DNS 支持 - libunbound 支持 PJSIP NAPTR SRV
- 发布 extension 状态到 SIP 订阅服务器 - 例如 Kamailio
  - 能基于设备状态自动在拨号计划里生成 hint
- 所有应用支持播放 HTTP 媒体
- ARI 支持批量媒体资源管理
- ARI 创建的通道可以转交给 Stasis 应用进行外部控制 - 可以在接通前进行额外操作，例如启用特定的媒体场景

- 14.6.2 - 2017-09-19
- 14.6.1 - 2017-08-31
  - [5902](https://gerrit.asterisk.org/#/c/5902/) res_pjsip: `dtmf_mode` 添加 `auto_info`
    - 默认的 `auto` 会将 dtmf 模式回退到 inband, 该模式是回退为 `INFO`
  - [ASTERISK-27152] - Sending a "tel" uri in a From or To header in an unauthenticated message causes asterisk to crash
- 14.6.0
  - [ASTERISK-22432] - Async AGI crashes Asterisk when issuing "set variable" command without args
  - [ASTERISK-26978] - rtp: Crash in ast_rtp_codecs_payload_code()
  - [ASTERISK-27016] - Crash occurs when a channel in a 'mixing,dtmf_events' bridge is muted multiple times.
  - [ASTERISK-27026] - res_ari: Crash when no ari.conf configuration file exists
  - [ASTERISK-27050] - Crash on Transcoded Audio in PERIODIC_HOOK Function
  - [ASTERISK-27108] - Crash using 'data get' CLI command
  - [ASTERISK-25370] - res_corosync segfaults at startup with corosync version > 2.x
  - [ASTERISK-27046] - res_pjsip_transport_websocket: segfault in get_write_timeout
  - [ASTERISK-27057] - Seg Fault in ast_sorcery_object_get_id at sorcery.c
- 14.5.0
  - [ASTERISK-21855] - Asterisk crashes when XMPP message is sent (JabberSend) and no internet connection is available
  - [ASTERISK-26692] - res_rtp_asterisk: Crash in dtls_srtp_handle_timeout at res_rtp_asterisk (using chan_sip)
  - [ASTERISK-26835] - res_rtp_asterisk: Crash when freeing RTCP address string
  - [ASTERISK-26853] - res_rtp_asterisk: Crash in pjnath when receiving packet
  - [ASTERISK-26926] - func_speex: Crash caused by frame with no datalen
  - [ASTERISK-26927] - pjproject_bundled: Crash on pj_ssl_get_info() while ioqueue_on_read_complete().
  - [ASTERISK-26953] - Asterisk crash if hep.conf have some missing parameters
  - [ASTERISK-26983] - Crash in Manager Reload when TLS Config Changes
  - [ASTERISK-25506] - [patch]CONFBRIDGE failure after an app_confbrige.so module reload results in segfault or error/warning messages.
  - [ASTERISK-26606] - tcptls: Incorrect OpenSSL function call leads to misleading error report

## Asterisk 13

- LTS | 2014-10-24 - 2020-10-24
- REST
- WebSocket
- Stasis

## Asterisk 12

- 新增 ARI 接口
- 新增 Stasis 消息总线
- 新增 chan_pjsip

## Asterisk 11

- LTS | 2012-10-25 |- 2017-10-25
- Call Identifier Logging
- Named Callgroups and Pickupgroups
- 基础 WebRTC 支持 - ICE, DTLS-SRTP, SIP over Websockets
- 支持 ICE - [Interactive Connectivity Establishment (ICE) in Asterisk](https://wiki.asterisk.org/wiki/display/AST/Interactive+Connectivity+Establishment+%28ICE%29+in+Asterisk)
  - NAT 是 Asterisk 里老大难的问题
- Named ACLs

**sip.conf**

```ini
[general]
icesupport=yes
```

**rtp.conf**

```ini
stunaddr=setyourphaserson.stun.org

turnaddr=4everyseason.turn.org
turnusername=relayme
turnpassword=please
```

## Asterisk 10

- 内部数据库从 Berkeley DB 切换为 SQLite 3

## Asterisk 1.8

> 很多旧的 VoIP 网关使用该版本 - 且可能永远不会升级

- LTS | 2010-10-21 - 2015-10-21
- 第二个 LTS 版本 - 大量使用
- 支持 AMI
- 支持 AGI
- SRTP
- SIP IPv6
- Connected Party Identification - COLP and CONP
- 日历集成 - CalDAV, iCal, Exchange, EWS calendars
- Channel Event Logging - CEL
- Distributed Device State - Message Waiting Indicator - Jabber/XMPP PubSub
- 支持 Call Completion Supplementary Services - CCSS
  - Call Completion on Busy Subscriber - CCBS
  - Call Completion on No Response - CCNR
- Advice of Charge - AOC-S, AOC-D, AOC-E
- Multicast RTP
- ISDN Q.SIG Call Rerouting and Call Deflection
- Google Talk, Google Voice integration
- Audio Pitch Shifting
- [New in 1.8](https://wiki.asterisk.org/wiki/display/AST/New+in+1.8)
