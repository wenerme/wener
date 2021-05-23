---
id: asterisk-moduls
title: Asterisk Modules
---

# Asterisk Modules

```bash
# 模块类型
ls /usr/lib/asterisk/modules | egrep -o '^[a-z]+' | sort | uniq -c | sort -nr
ls /usr/lib/asterisk/modules | xargs -n 1 basename | sed 's/.so$//' | sort | grep func_

asterisk -x 'module show'
```

## 内置模块

> 不可以动态 load、unload - 部分可以配置不启用

| module      | conf             | desc                                   |
| ----------- | ---------------- | -------------------------------------- |
| acl         | acl.conf         | 统一 ACL 控制                          |
| ccss        | ccss.conf        | Call Completion Supplementary Services |
| cdr         | cdr.conf         | Call Detail Record                     |
| cel         | cel.conf         | Call Event Log                         |
| dnsmgr      | dnsmgr.conf      | 内置 DNS 管理器                        |
| dsp         | dsp.conf         |
| enum        | enum.conf        | 通过 DNS 解析电话号码                  |
| extconfig   | extconfig.conf   | 静态和实时外部配置引擎                 |
| features    | features.conf    |
| http        | http.conf        | 内置 HTTP 服务                         |
| indications | indications.conf |
| logger      | logger.conf      |
| manager     | manager.conf     | AMI                                    |
| plc         |                  | Packet Loss Concealment - 音频丢包补偿 |
| sounds      |                  | 声音文件索引                           |
| udptl       | udptl.conf       | UDP Transport Layer - 端口配置         |

- dsp - 信号处理
- CCSS - Call Completion Supplementary Services - 通话完成补偿服务
  - 由 CCBS 和 CCNR 组成
    - CCBS - Call Completion on Busy Subscriber
    - CCNR - Call Completion on No Response
  - 例如 A 呼叫 B，但 B 在和 C 通话，开启 CCSS/CCBS 后，可以在 B 和 C 通话完成后通知 A

## 动态模块

> 1. 可动态加载
> 2. 可能不同模块提供相同功能 - 模块互斥

| type   | desc           |
| ------ | -------------- |
| app    | Dialplan 应用  |
| bridge | 三方通话、会议 |
| cdr    | CDR+后端配置   |
| cel    | CEL+后端配置   |
| chan   | 通道技术       |
| codec  | 语音编码       |
| format | 语音文件格式   |
| func   | Dialplan 函数  |
| pbx    | 路由           |
| res    | 资源           |

## chan

| chan              | conf             | desc                                              |
| ----------------- | ---------------- | ------------------------------------------------- |
| chan_audiosocket  |                  | 简单的 Audio over TCP 协议 - 用于实现外部音频处理 |
| chan_alsa         | alsa.conf        | Linux 接口                                        |
| chan_bridge_media |
| chan_console      | console.conf     | Linux 接口                                        |
| chan_dahdi        | chan_dahdi.conf  | DAHDi 板卡接口                                    |
| chan_dongle       | dongle.conf      | GSM 接口                                          |
| chan_iax2         | iax.conf         | Inter Asterisk eXchange (Ver 2)                   |
| chan_mgcp         | mgcp.conf        | Media Gateway Control Protocol                    |
| chan_oss          | oss.conf         | Linux 接口                                        |
| chan_pjsip        | pjsip.conf       | 基于 pjproject 的 sip 实现，推荐使用              |
| chan_rtp          | rtp.conf         | RTP Media Channel                                 |
| chan_sip          | sip.conf         | 最早的 sip 实现，⚠️ 不再维护                      |
| chan_skinny       | skinny.conf      | Skinny Client Control Protocol                    |
| chan_unistim      | unistim.conf     | Unified Networks IP Stimulus                      |
| chan_mobile       | chan_mobile.conf | 蓝牙                                              |

| modules  | dependencies      |
| -------- | ----------------- |
| chan_rtp | res_rtp_multicast |

- Linux 音频接口
  - 默认 oss
  - alsa - Advanced Linux Sound Architecture
    - 作为替代 OSS 存在
  - console - portaudio - audio i/o devices as telephony devices
    - portaudio 实现依赖 alsa
    - portaudio 支持 TCP
    - 有好的用户交互工具
    - 支持复杂的 mix 逻辑
  - oss - Open Sound System
    - 最早
- skinny - SCCP - [Skinny Client Control Protocol](https://en.wikipedia.org/wiki/Skinny_Client_Control_Protocol)
  - [chan-sccp/chan-sccp](https://github.com/chan-sccp/chan-sccp)
    - 替代 chan_skinny
    - 支持更多功能
- mgcp - [Media Gateway Control Protocol](https://en.wikipedia.org/wiki/Media_Gateway_Control_Protocol)
- unistim - UNIStim - [Unified Networks IP Stimulus](https://en.wikipedia.org/wiki/UNIStim)
  - 废弃协议

```conf

# PJSIP
# ==========
# lookup AOR, dial first Contact
exten => _6XXX,1,Dial(PJSIP/${EXTEN})
# dial all conacts - 会拼接所有 contacts
exten => _6XXX,1,Dial(${PJSIP_DIAL_CONTACTS(${EXTEN})})
# dial SIP - trunk 线路
# 不使用 AOR 和 Contact
exten => _9NXXNXXXXXX,1,Dial(PJSIP/mytrunk/sip:${EXTEN:1}@203.0.113.1:5060)
# dial 预先配置 trunk 上的 AOR 信息
exten => _9NXXNXXXXXX,1,Dial(PJSIP/${EXTEN:1}@mytrunk)

# Local
# ==========
exten => 201,1,Verbose(2,Call desk phone and cellphone but with delay)
exten => 201,n,Dial(Local/deskphone-201@extensions&Local/cellphone-201@extensions,30)

# AudioSocket
# ==========
# Dialplan
exten = 100,1,Verbose("Call to AudioSocket via Dialplan Application")
 same = n,Answer()
 same = n,AudioSocket(40325ec2-5efd-4bd3-805f-53576e581d13,server.example.com:9092)
 same = n,Hangup()
# Chan
exten = 101,1,Verbose("Call to AudioSocket via Channel interface")
 same = n,Answer()
 same = n,Dial(AudioSocket/server.example.com:9092/40325ec2-5efd-4bd3-805f-53576e581d13)
 same = n,Hangup()
```

## pbx

| module       | conf            | desc                               |
| ------------ | --------------- | ---------------------------------- |
| pbx_ael      | extensions.ael  |
| pbx_config   | extensions.conf | 最常用                             |
| pbx_dundi    |
| pbx_loopback |
| pbx_lua      | extensions.lua  |
| pbx_realtime | db/extension    |
| pbx_spool    |                 | 将 callfile 放到目录下自动发起拨号 |

- pbx_realtime
  - 相当于把 extensions.conf 一行一行存到了数据库, 实际上不太好管理
- pbx_lua
  - 使用 Lua 来写 dialplain

## codec

| codec          | desc                                  |
| -------------- | ------------------------------------- |
| codec_a_mu     |
| codec_adpcm    |
| codec_alaw     |
| codec_dahdi    | /dev/dahdi/transcode - DAHDi 硬件转码 |
| codec_g722     |
| codec_g726     |
| codec_gsm      |
| codec_ilbc     |
| codec_lpc10    |
| codec_resample | 从新采样                              |
| codec_ulaw     |

## format

| format         | desc |
| -------------- | ---- |
| format_g719    |
| format_g723    |
| format_g726    |
| format_g729    |
| format_gsm     |
| format_h263    |
| format_h264    |
| format_ilbc    |
| format_pcm     |
| format_siren14 |
| format_siren7  |
| format_sln     |
| format_vox     |
| format_wav     |
| format_wav_gsm |

## cdr

| module             | conf | desc          |
| ------------------ | ---- | ------------- |
| cdr_csv            |
| cdr_custom         |
| cdr_manager        |      | AMI 接收 CDR  |
| cdr_mysql          |
| cdr_pgsql          |
| cdr_sqlite3_custom |
| cdr_syslog         |
| cdr_tds            |      | MS SQL Server |

## cel

| module             | conf | desc          |
| ------------------ | ---- | ------------- |
| cel_custom         |
| cel_manager        |      | AMI 接收 CEL  |
| cel_pgsql          |
| cel_sqlite3_custom |
| cel_tds            |      | MS SQL Server |

## bridge

| module                           | desc                                                  |
| -------------------------------- | ----------------------------------------------------- |
| bridge_builtin_features          |
| bridge_builtin_interval_features |
| bridge_holding                   | store channels in bridge for holding, parking, queues |
| bridge_native_rtp                | Native RTP bridging                                   |
| bridge_simple                    |
| bridge_softmix                   | 多方，软 mix                                          |

## func

| func                | desc |
| ------------------- | ---- |
| func_aes            |
| func_base64         |
| func_blacklist      |
| func_callcompletion |
| func_callerid       |
| func_cdr            |
| func_channel        |
| func_config         |
| func_curl           |
| func_cut            |
| func_db             |
| func_devstate       |
| func_dialgroup      |
| func_dialplan       |
| func_enum           |
| func_env            |
| func_extstate       |
| func_frame_trace    |
| func_global         |
| func_groupcount     |
| func_hangupcause    |
| func_holdintercept  |
| func_iconv          |
| func_jitterbuffer   |
| func_lock           |
| func_logic          |
| func_math           |
| func_md5            |
| func_module         |
| func_periodic_hook  |
| func_pitchshift     |
| func_pjsip_aor      |
| func_pjsip_contact  |
| func_pjsip_endpoint |
| func_presencestate  |
| func_rand           |
| func_realtime       |
| func_sha1           |
| func_shell          |
| func_sorcery        |
| func_sprintf        |
| func_srv            |
| func_strings        |
| func_sysinfo        |
| func_talkdetect     |
| func_timeout        |
| func_uri            |
| func_version        |
| func_vmcount        |
| func_volume         |

## app

| app                   | desc                                 |
| --------------------- | ------------------------------------ |
| app_adsiprog          |
| app_agent_pool        |
| app_alarmreceiver     |
| app_amd               |
| app_attended_transfer |
| app_audiosocket       |
| app_authenticate      |
| app_blind_transfer    |
| app_bridgeaddchan     |
| app_bridgewait        |
| app_cdr               |
| app_celgenuserevent   |
| app_chanisavail       |
| app_channelredirect   |
| app_chanspy           |
| app_confbridge        | confbridge.conf                      |
| app_controlplayback   |
| app_dahdiras          |
| app_db                |
| app_dial              |
| app_dictate           |
| app_directed_pickup   |
| app_directory         |
| app_disa              | Direct Inward System Access          |
| app_dumpchan          |
| app_echo              | 测试应用, 感受延时, 确认是否有声音   |
| app_exec              |
| app_externalivr       |
| app_festival          |
| app_flash             |
| app_followme          |
| app_forkcdr           |
| app_getcpeid          |
| app_ices              |
| app_image             |
| app_meetme            | MeetMe conference bridge             |
| app_milliwatt         |
| app_minivm            |
| app_mixmonitor        | Mixed Audio Monitoring               |
| app_morsecode         |
| app_mp3               |
| app_nbscat            |
| app_originate         |
| app_page              |
| app_playback          |
| app_playtones         |
| app_privacy           |
| app_queue             |
| app_read              |
| app_readexten         |
| app_record            |
| app_sayunixtime       |
| app_senddtmf          |
| app_sendtext          |
| app_sms               | SMS/PSTN                             |
| app_softhangup        |
| app_speech_utils      |
| app_stack             | Dialplan subroutines - Gosub, Return |
| app_stasis            |
| app_stream_echo       |
| app_system            |
| app_talkdetect        |
| app_test              | Interface Test Application           |
| app_transfer          |
| app_url               |
| app_userevent         |
| app_verbose           | VERBOSE                              |
| app_voicemail         |
| app_waitforring       |
| app_waitforsilence    |
| app_waituntil         |
| app_while             |
| app_zapateller        |

## res

| res module                | desc                                          |
| ------------------------- | --------------------------------------------- |
| res_adsi                  |
| res_ael_share             |
| res_agi                   |
| res_audiosocket           |
| res_calendar              |
| res_clialiases            |
| res_clioriginate          |
| res_config_curl           |
| res_config_pgsql          |
| res_config_sqlite3        |
| res_convert               |
| res_crypto                |
| res_curl                  |
| res_format_attr_celt      |
| res_format_attr_g729      |
| res_format_attr_h263      |
| res_format_attr_h264      |
| res_format_attr_ilbc      |
| res_format_attr_opus      |
| res_format_attr_silk      |
| res_format_attr_siren14   |
| res_format_attr_siren7    |
| res_format_attr_vp8       |
| res_hep                   |
| res_hep_pjsip             |
| res_hep_rtcp              |
| res_http_media_cache      |
| res_http_websocket        |
| res_limit                 |
| res_manager_devicestate   |
| res_manager_presencestate |
| res_monitor               | Monitor 功能, 现在更多推荐使用 app_mixmonitor |
| res_musiconhold           |
| res_mutestream            |
| res_mwi_devstate          |
| res_parking               |
| res_phoneprov             |
| res_prometheus            | prometheus 监控                               |
| res_realtime              |
| res_resolver_unbound      |
| res_rtp_asterisk          | RTP，RTCP with Symmetric RTP support for NAT  |
| res_rtp_multicast         |
| res_security_log          |
| res_smdi                  |
| res_snmp                  | SNMP 集成                                     |
| res_speech                |
| res_srtp                  |
| res_statsd                | stattsd 监控                                  |
| res_stir_shaken           | STIR/SHAKEN                                   |
| res_stun_monitor          |
| res_timing_dahdi          |
| res_timing_pthread        |
| res_timing_timerfd        |

| module           | dependencies  |
| ---------------- | ------------- |
| res_agi          | res_speech    |
| res_rtp_asterisk | res_pjproject |
| res_snmp         | net-snmp-dev  |

- [STIR/SHAKEN](https://en.wikipedia.org/wiki/STIR/SHAKEN)
  - STIR - Secure Telephone Identity Revisited
  - SHAKEN - Signature-based Handling of Asserted Information Using toKENs
  - 避免 PTNS CallID 欺骗

## res_stasis

- stasis 应用模块
- 基于 WebSocket 实时控制

| res_stasis              | desc |
| ----------------------- | ---- |
| res_stasis              |
| res_stasis_answer       |
| res_stasis_device_state |
| res_stasis_playback     |
| res_stasis_recording    |
| res_stasis_snoop        |

## res_sorcery

- asterisk 统一的配置访问接口 - CRUD

| res_sorcery              | desc               |
| ------------------------ | ------------------ |
| res_sorcery_astdb        | 从 astdb 获取配置  |
| res_sorcery_config       | 操作配置文件       |
| res_sorcery_memory       | 内存配置           |
| res_sorcery_memory_cache | 缓存远程配置       |
| res_sorcery_realtime     | 从实时后端获取配置 |

## res_ari

- Asterisk RESTful Interface
- REST 管理 Asterisk 资源
- 不同模块提供不同资源接口

| ari module            | desc |
| --------------------- | ---- |
| res_ari               |
| res_ari_applications  |
| res_ari_asterisk      |
| res_ari_bridges       |
| res_ari_channels      |
| res_ari_device_states |
| res_ari_endpoints     |
| res_ari_events        |
| res_ari_model         |
| res_ari_playbacks     |
| res_ari_recordings    |
| res_ari_sounds        |

## res_pjsip

| pjsip module                            | desc                             |
| --------------------------------------- | -------------------------------- |
| res_pjproject                           | PJPROJECT Log & Utility          |
| res_pjsip                               | 基础 SIP 资源                    |
| res_pjsip_acl                           | PJSIP ACL                        |
| res_pjsip_authenticator_digest          | Digest 认证                      |
| res_pjsip_caller_id                     | 支持 CallerID                    |
| res_pjsip_config_wizard                 | pjsip_wizard.conf                |
| res_pjsip_dialog_info_body_generator    | Extension State Dialog Info+XML  |
| res_pjsip_diversion                     | Diversion Header                 |
| res_pjsip_dlg_options                   | SIP OPTIONS in dialog            |
| res_pjsip_dtmf_info                     | 支持 DTMF INFO                   |
| res_pjsip_empty_info                    | 支持 Empty INFO                  |
| res_pjsip_endpoint_identifier_anonymous | 匿名终端标识                     |
| res_pjsip_endpoint_identifier_ip        | IP 终端标识                      |
| res_pjsip_endpoint_identifier_user      | 用户名终端标识                   |
| res_pjsip_exten_state                   | Extension State Notifications    |
| res_pjsip_header_funcs                  | Header Functions                 |
| res_pjsip_history                       | 历史                             |
| res_pjsip_logger                        | 包日志                           |
| res_pjsip_messaging                     | 支持消息                         |
| res_pjsip_mwi                           | MWI 资源                         |
| res_pjsip_mwi_body_generator            |
| res_pjsip_nat                           | NAT 支持                         |
| res_pjsip_notify                        | 支持 CLI/AMI PJSIP NOTIFY        |
| res_pjsip_one_touch_record_info         | INFO One Touch Recording         |
| res_pjsip_outbound_authenticator_digest | outbound digest 认证             |
| res_pjsip_outbound_publish              |
| res_pjsip_outbound_registration         | outbound 注册                    |
| res_pjsip_path                          | Path 头                          |
| res_pjsip_phoneprov_provider            |
| res_pjsip_pidf_body_generator           | Extension State PIDF Provider    |
| res_pjsip_pidf_digium_body_supplement   | PIDF Sangoma presence supplement |
| res_pjsip_pidf_eyebeam_body_supplement  | PJSIP PIDF Eyebeam supplement    |
| res_pjsip_publish_asterisk              | Asterisk Event PUBLISH           |
| res_pjsip_pubsub                        | event                            |
| res_pjsip_refer                         | Blind and Attended Transfer      |
| res_pjsip_registrar                     | Registrar                        |
| res_pjsip_rfc3326                       | Reason 头                        |
| res_pjsip_sdp_rtp                       | SDP RTP/AVP stream handler       |
| res_pjsip_send_to_voicemail             | REFER Send to Voicemail          |
| res_pjsip_session                       |
| res_pjsip_sips_contact                  | UAC SIPS Contact                 |
| res_pjsip_stir_shaken                   |
| res_pjsip_t38                           | PJSIP T.38 UDPTL                 |
| res_pjsip_transport_websocket           | WebSocket                        |
| res_pjsip_xpidf_body_generator          | Extension State PIDF Provider    |

- PIDF - Presence Information Data Format
- T.38 - FoIP Fax over IP - UDP 协议
- rfc3326 - SIP Reason 头
- Presence Subscriptions
  - res_pjsip_pubsub
  - res_pjsip_exten_state
  - res_pjsip_pidf_body_generator
  - res_pjsip_xpidf_body_generator
  - res_pjsip_dialog_info_body_generator
  - 特殊驱动支持
    - res_pjsip_pidf_digium_body_supplement
    - res_pjsip_pidf_eyebeam_body_supplement

## sip common

```ini
load => res_adsi.so
load => res_timing_pthread.so
;load => res_timing_dahdi.so
load => res_agi.so
load => res_crypto.so
load => res_pktccops.so
load => res_smdi.so
load => res_stun_monitor.so
load => res_rtp_asterisk.so
load => res_rtp_msp.so
load => res_curl.so
load => res_clioriginate.so
load => pbx_config.so
load => bridge_multiplexed.so
load => app_dial.so
load => app_exec.so
load => app_system.so
load => app_macro.so
load => app_cdr.so
load => app_chanisavail.so
load => app_grppolicy.so
load => app_mixmonitor.so
load => app_sayunixtime.so
load => app_originate.so
load => app_playback.so
load => app_disa.so
load => app_authenticate.so
load => format_wav.so
load => format_gsm.so
load => func_math.so
load => func_cdr.so
load => func_strings.so
load => func_channel.so
load => func_callerid.so
load => func_timeout.so
load => func_shell.so
load => func_rand.so
load => func_realtime.so
load => func_dialplan.so
load => func_curl.so
load => func_uri.so
load => func_blacklist.so
load => func_db.so
load => func_cut.so
load => cdr_manager.so
load => cdr_syslog.so
load => codec_alaw.so
load => codec_ulaw.so
load => codec_adpcm.so
load => codec_a_mu.so
load => codec_g722.so
load => codec_g723.so
load => codec_g726.so
load => codec_g729.so
load => codec_gsm.so
load => codec_lpc10.so
;load => codec_c1k.so
load => chan_extra.so
load => res_srtp.so
load => chan_sip.so
load => chan_iax2.so
load => res_musiconhold.so
load => func_env.so
```

## res_statsd

- [Integrating Asterisk with StatsD](https://www.asterisk.org/integrating-asterisk-with-statsd/)
- [Utilizing the StatsD Dialplan Application](https://wiki.asterisk.org/wiki/display/AST/Utilizing+the+StatsD+Dialplan+Application)
- [res/res_endpoint_stats.c](https://github.com/asterisk/asterisk/blob/master/res/res_endpoint_stats.c)

**statsd.conf**

```ini
[general]
# 是否启用 statsd 指标
enabled = yes
# statsd 服务端地址
# server[:port] - 默认端口 8125
server = 127.0.0.1
# 指标前缀 - 如果有多个实例则建议添加
prefix = ast-1
# 添加换行
# 方便使用 nc -lu 8125 测试时
;add_newline = no
```

```
ast-1.PJSIP.contacts.1876;@47519c5004a0a52468bd2e1570095db4.rtt:19|ms
ast-1.PJSIP.contacts.states.Created:+1|g
ast-1.PJSIP.contacts.states.Created:-1|g
ast-1.PJSIP.contacts.states.Reachable:+1|g
```

[statsd_exporter](https://github.com/prometheus/statsd_exporter) 映射规则

```yaml
mappings:
  - match: '([^.]+)[.]PJSIP[.]contacts[.]([^;]+)(;[^.]*)?[.]rtt'
    match_type: regex
    name: 'pjsip_contacts_rtt'
    labels:
      asterisk: '$1'
      conact: '$2'
```

## res_prometheus

- [res/res_prometheus.c](https://github.com/asterisk/asterisk/blob/master/res/res_prometheus.c)

## res_snmp

- [Asterisk SNMP Support](https://wiki.asterisk.org/wiki/display/AST/Simple+Network+Management+Protocol+%28SNMP%29+Support)
- https://www.voip-info.org/asterisk-snmp/
- mibs
  - [digium-mib.txt](https://wiki.asterisk.org/wiki/display/AST/Digium+MIB+Definitions)
  - [asterisk-mib.txt](https://wiki.asterisk.org/wiki/display/AST/Asterisk+MIB+Definitions)

```bash
# 编译需要额外依赖
# ================
apk install net-snmp-dev

net-snmp-config --agent-libs

# ./configure --with-netsnmp
```

### 配置

**/etc/asterisk/res_snmp.conf**

```ini
[general]
; 运行为子系统 - 需要 snmpd 启动 agentx
; 非子系统需要 root - 绑定 161 端口
subagent = no
; 启动
enabled = yes
```

```bash
asterisk -x 'module show like snmp'
```

**/etc/snmp/snmpd.conf**

```ini
# Asterisk user
createUser asteriskUser MD5 "<your password>" DES
rwuser asteriskUser priv

master agentx
agentXSocket	/var/agentx/master
agentXPerms 0660 0550 nobody asterisk
```

```bash
# snmp v2
snmpwalk -v2c -c public 127.0.0.1 1.3.6.1.4.1.22736.1
# snmp v3
snmpwalk -v 3 -u asteriskUser -l authPriv -a MD5 -A <your password> -x DES -X <your password> 127.0.0.1 ASTERISK-MIB::astVersionString
```

## 常用配置

```ini
load => res_rtp_multicast
load => chan_rtp
; rtp engine
load => res_rtp_asterisk
load => res_pjproject

load => pbx_config

; channel originate
load => res_clioriginate

load => res_curl
load => res_agi

; bridge
load => chan_bridge_media
load => app_bridgeaddchan
load => app_bridgewait
load => app_confbridge
load => bridge_builtin_features
load => bridge_builtin_interval_features
load => bridge_holding
load => bridge_native_rtp
load => bridge_simple
load => bridge_softmix

; load all codec
load => codec_a_mu
load => codec_adpcm
load => codec_alaw
; load => codec_dahdi ; need dahdi hardware
load => codec_g722
load => codec_g726
load => codec_gsm
load => codec_ilbc
load => codec_lpc10
load => codec_resample
load => codec_ulaw
; load all format
load => format_g719
load => format_g723
load => format_g726
load => format_g729
load => format_gsm
load => format_h263
load => format_h264
load => format_ilbc
load => format_pcm
load => format_siren14
load => format_siren7
load => format_sln
load => format_vox
load => format_wav
load => format_wav_gsm
```
