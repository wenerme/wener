---
id: intro
title: Asterisk
---

# Asterisk

## Tips

* [源码](https://gerrit.asterisk.org/)
* 语音文件 https://www.asterisksounds.org
* Asterisk NOW
  * 是一个立即可用的系统镜像
  * [下载](http://www.asterisk.org/downloads/asterisknow-6-64)
* Asterisk
  * [文档](https://wiki.asterisk.org/wiki/display/AST/Home)
  * http://www.asterisk.org/community/documentation
  * https://github.com/asterisk/asterisk
  * https://wiki.asterisk.org/wiki/display/AST/Home
  * https://wiki.asterisk.org/wiki/display/AST/Asterisk+Architecture%2C+The+Big+Picture
* http://www.asteriskdocs.org/
* http://downloads.asterisk.org/pub/
  * 公共下载目录
* 录音时尽量选择 .WAV 而非 .wav
* http://asterisktech.co.ke/cctv-cameras/
* Connecting Non-SIP IP Camera to Your PBX - AstriCon 2014 https://youtu.be/yiQHVq4UzO4
* How to implement an alarm system with Asterisk and a webcam https://www.voip-info.org/how-to-implement-an-alarm-system-with-asterisk-and-a-webcam/
* https://wiki.freepbx.org/display/PC/Asterisk+GSM

https://store.docker.com/community/images/luar/asterisk
https://wiki.alpinelinux.org/wiki/FreePBX



## Ports/Firewall
* [Asterisk firewall rules](https://www.voip-info.org/asterisk-firewall-rules/)
* [Ports used on your PBX](https://wiki.freepbx.org/display/PPS/Ports+used+on+your+PBX)

```bash
# SIP on UDP port 5060. Other SIP servers may need TCP port 5060 as well
iptables -A INPUT -p udp -m udp --dport 5060 -j ACCEPT

# IAX2- the IAX protocol
iptables -A INPUT -p udp -m udp --dport 4569 -j ACCEPT

# IAX - most have switched to IAX v2, or ought to
iptables -A INPUT -p udp -m udp --dport 5036 -j ACCEPT

# RTP - the media stream
# (related to the port range in /etc/asterisk/rtp.conf) 
iptables -A INPUT -p udp -m udp --dport 10000:20000 -j ACCEPT


# MGCP - if you use media gateway control protocol in your configuration
iptables -A INPUT -p udp -m udp --dport 2727 -j ACCEPT
```

PBX SIP and IAX Communication

端口 | 协议 | 目的 | 备注
----|-----|----|----
5060 | UDP | pjsip | pjsip 标准端口,不建议暴露到不信任的网络
5061 | UDP | pjsip | pjsip 标准端口,不建议暴露到不信任的网络
5160 | UDP | pjsip | pjsip 标准端口,不建议暴露到不信任的网络
5161 | UDP | pjsip | pjsip 标准端口,不建议暴露到不信任的网络
10000-20000 | UDP | RTP for SIP | 可对外暴露, 实际 SIP 通话端口
4569 | UDP | IAX | IAX 协议和线路


udp   UNCONN     0      0                     *:4569                              *:* iax
udp   UNCONN     0      0                     *:5060                              *:* sip

Netid State      Recv-Q Send-Q    Local Address:Port                   Peer Address:Port
udp   UNCONN     0      0                     *:4569                              *:*                   users:(("asterisk",pid=24149,fd=49))
udp   UNCONN     0      0                     *:5060                              *:*                   users:(("asterisk",pid=24149,fd=14))
udp   UNCONN     0      0                     *:56156                             *:*                   users:(("asterisk",pid=24149,fd=11))
udp   UNCONN     0      0                     *:10336                             *:*                   users:(("asterisk",pid=24149,fd=86))
udp   UNCONN     0      0                     *:10337                             *:*                   users:(("asterisk",pid=24149,fd=87))
udp   UNCONN     0      0                     *:12244                             *:*                   users:(("asterisk",pid=24149,fd=112))
udp   UNCONN     0      0                     *:12245                             *:*                   users:(("asterisk",pid=24149,fd=113))
udp   UNCONN     0      0                     *:14914                             *:*                   users:(("asterisk",pid=24149,fd=73))
udp   UNCONN     0      0                     *:14915                             *:*                   users:(("asterisk",pid=24149,fd=68))
udp   UNCONN     0      0             127.0.0.1:323                               *:*                   users:(("chronyd",pid=776,fd=1))
udp   UNCONN     0      0                     *:16758                             *:*                   users:(("asterisk",pid=24149,fd=66))
udp   UNCONN     0      0                     *:16759                             *:*                   users:(("asterisk",pid=24149,fd=58))
udp   UNCONN     0      0                     *:16998                             *:*                   users:(("asterisk",pid=24149,fd=70))
udp   UNCONN     0      0                     *:16999                             *:*                   users:(("asterisk",pid=24149,fd=67))
udp   UNCONN     0      0                     *:18010                             *:*                   users:(("asterisk",pid=24149,fd=82))
udp   UNCONN     0      0                     *:18011                             *:*                   users:(("asterisk",pid=24149,fd=83))
udp   UNCONN     0      0                   ::1:323                              :::*                   users:(("chronyd",pid=776,fd=2))
udp   UNCONN     0      0                    :::49592                            :::*                   users:(("asterisk",pid=24149,fd=12))
tcp   LISTEN     0      10                    *:5038                              *:*                   users:(("asterisk",pid=24149,fd=9))
tcp   LISTEN     0      128                   *:111                               *:*                   users:(("systemd",pid=1,fd=41))
tcp   LISTEN     0      128                   *:22                                *:*                   users:(("sshd",pid=1142,fd=3))
tcp   LISTEN     0      10                    *:8088                              *:*                   users:(("asterisk",pid=24149,fd=8))
tcp   LISTEN     0      100           127.0.0.1:25                                *:*                   users:(("master",pid=1361,fd=13))
tcp   LISTEN     0      5                     *:5060                              *:*                   users:(("asterisk",pid=24149,fd=13))
tcp   LISTEN     0      128                  :::111                              :::*                   users:(("systemd",pid=1,fd=40))
tcp   LISTEN     0      128                  :::8080                             :::*                   users:(("ykycc2",pid=9623,fd=7))
tcp   LISTEN     0      128                  :::22                               :::*                   users:(("sshd",pid=1142,fd=4))
tcp   LISTEN     0      128                  :::5432                             :::*                   users:(("docker-proxy-cu",pid=26763,fd=4))
tcp   LISTEN     0      100                 ::1:25                               :::*                   users:(("master",pid=1361,fd=14))

## Certified Asterisk
* [Certified Asterisk](https://www.digium.com/products/asterisk/certified-asterisk)
  * Asterisk 的一个分支
  * 符合 Diginum 的 SLA/Service Level Agreement
  * [Asterisk Support Entitlements Chart](https://www.digium.com/products/asterisk/support/chart)


## Versions
* [Versions](https://wiki.asterisk.org/wiki/display/AST/Asterisk+Versions)
* [CHANGES](https://github.com/asterisk/asterisk/blob/master/CHANGES)
* [edge/main/x86_64/asterisk](https://pkgs.alpinelinux.org/package/edge/main/x86_64/asterisk)
  * edge 版
* JIRA [Change Log](https://issues.asterisk.org/jira/browse/ASTERISK/?selectedTab=com.atlassian.jira.jira-projects-plugin:changelog-panel)

### 16.0 - LTS - 2018-1017
* LTS 版本
* app_originate 支持 `a` 参数, 异步拨号, 不等待响应
* app_macro 模块废弃, 使用 app_stack (Gosub)
* res_config_sqlite 模块废弃, 使用 res_config_sqlite3
* res_monitor 模块废弃, 使用 app_mixmonitor
* cdr_syslog 模块废弃, 并且默认不会构建
* app_fax 模块废弃, 使用 res_fax


### 15.0
* 默认使用 bundled pjproject
* 支持 RTCP Multiplexing 和 BUNDLE
  * [Multiplexing RTP Data and Control Packets on a Single Port](https://tools.ietf.org/html/rfc5761)
  * [Negotiating Media Multiplexing Using the SDP](https://datatracker.ietf.org/doc/draft-ietf-mmusic-sdp-bundle-negotiation/)
* Unified Plan
  * [A Unified Plan for Using SDP with Large Numbers of Media Flows draft-roach-mmusic-unified-plan-00](https://tools.ietf.org/html/draft-roach-mmusic-unified-plan-00)
  * multiple media streams per connection
* [asterisk/cyber_mega_phone_2k](https://github.com/asterisk/cyber_mega_phone_2k)
  * testing of Asterisk's (15+) multistream capabilities

### 14.0
* 14.6.2 - 2017-09-19
* 14.6.1 - 2017-08-31
  * [5902](https://gerrit.asterisk.org/#/c/5902/) res_pjsip: `dtmf_mode` 添加 `auto_info`
      * 默认的 `auto` 会将 dtmf 模式回退到 inband, 该模式是回退为 `INFO`
  * [ASTERISK-27152] - Sending a "tel" uri in a From or To header in an unauthenticated message causes asterisk to crash
* 14.6.0
  * [ASTERISK-22432] - Async AGI crashes Asterisk when issuing "set variable" command without args
  * [ASTERISK-26978] - rtp: Crash in ast_rtp_codecs_payload_code()
  * [ASTERISK-27016] - Crash occurs when a channel in a 'mixing,dtmf_events' bridge is muted multiple times.
  * [ASTERISK-27026] - res_ari: Crash when no ari.conf configuration file exists
  * [ASTERISK-27050] - Crash on Transcoded Audio in PERIODIC_HOOK Function
  * [ASTERISK-27108] - Crash using 'data get' CLI command
  * [ASTERISK-25370] - res_corosync segfaults at startup with corosync version > 2.x
  * [ASTERISK-27046] - res_pjsip_transport_websocket: segfault in get_write_timeout
  * [ASTERISK-27057] - Seg Fault in ast_sorcery_object_get_id at sorcery.c
* 14.5.0
  * [ASTERISK-21855] - Asterisk crashes when XMPP message is sent (JabberSend) and no internet connection is available
  * [ASTERISK-26692] - res_rtp_asterisk: Crash in dtls_srtp_handle_timeout at res_rtp_asterisk (using chan_sip)
  * [ASTERISK-26835] - res_rtp_asterisk: Crash when freeing RTCP address string
  * [ASTERISK-26853] - res_rtp_asterisk: Crash in pjnath when receiving packet
  * [ASTERISK-26926] - func_speex: Crash caused by frame with no datalen
  * [ASTERISK-26927] - pjproject_bundled: Crash on pj_ssl_get_info() while ioqueue_on_read_complete().
  * [ASTERISK-26953] - Asterisk crash if hep.conf have some missing parameters
  * [ASTERISK-26983] - Crash in Manager Reload when TLS Config Changes
  * [ASTERISK-25506] - [patch]CONFBRIDGE failure after an app_confbrige.so module reload results in segfault or error/warning messages.
  * [ASTERISK-26606] - tcptls: Incorrect OpenSSL function call leads to misleading error report

## 13
REST
WebSocket
Stasis


## 服务端
* Asterisk
* Elastix
* FreePBX
* FreeSwitch
* Trixbox
* Yate
* PBX in a Flash
* IPPBX/IVR
* [FaxServer using Asterisk](http://wiki.alpinelinux.org/wiki/FaxServer_using_Asterisk)

### FreePBX
* FAQ
  * [Fwconsole not found](https://community.freepbx.org/t/fwconsole-not-found/33406)

## 客户端
* Softphone
  * ring.cx GNU
  * x.lite
  * Zoiper - iOS
* 协议
  * http://www.pjsip.org/
  * http://sipml5.org/
  * http://wiki.freepbx.org/display/FPG/Extensions+Module+-+PJSIP+Extension
  * https://github.com/onsip/SIP.js

* [Top 50 Open Source VoIP Apps](http://html.com/blog/voip-top-50-open-source-voip-apps/)
* [SIP-Client for Raspberry Pi that works from command line?](http://stackoverflow.com/a/29715067/1870054)

http://www.linphone.org/technical-corner/ortp/overview



## Web

* [Asterisk WebRTC Support](https://wiki.asterisk.org/wiki/display/AST/Asterisk+WebRTC+Support)
* [WebRTC tutorial using SIPML5](https://wiki.asterisk.org/wiki/display/AST/WebRTC+tutorial+using+SIPML5)

* 客户端
  * https://github.com/DoubangoTelecom/sipml5
  * http://jssip.net/

## 视频
* [Asterisk video](http://www.voip-info.org/wiki/view/Asterisk+video)

## 名词

* AGI
  * 执行 Dialplan 中的脚本
  * 针对单次通话
* AMI
  * `manager.conf`
  * 实时接口
  * Telnet
  * 针对整个 PBX
* ARI
  * `ari.conf`
  * 通过接口的方式而不是 C 的方式来写应用
  * HTTP GET POST DELETE
  * Websocks 统计和事件
* Diaplan
* DAHDI
* libpri
* IVR
  * 交互式语音应答

## FAQ
### no samples for gxxx

It means that one of clients, is using silence suppression mechanism which sends audio frames that do not contain any samples. That is causing these Warnings on Asterisk CLI.

Either ignore it, or find the device that does this and disable silent suppression.

* [RTP Silence Suppression](https://www.voip-info.org/wiki/view/RTP+Silence+Suppression)


## Notes
```bash
# 一个基于 Ubuntu 的 freepbx 容器
docker run --net=host -it --name freepbx jmar71n/freepbx
```

* /etc/asterisk/modules.conf

* 模块类型
  * Applications
    * app_
  * Bridging modules
    * bridge_
  * Call detail recording (CDR) modules
    * cdr_
  * Channel event logging (CEL) modules
    * cel_
  * Channel drivers
    * chan_
  * Codec translators
    * codec_
  * Format interpreters
    * format_
  * Dialplan functions
    * func_
  * PBX modules
    * pbx_
  * Resource modules
    * res_
  * Add-on modules
  * Test modules

* 文件结构
  * 配置
    * /etc/asterisk
  * 模块
    * /usr/lib/asterisk/modules
  * 资源库
    * /var/lib/asterisk
  * spool
    * /var/spool/asterisk
    * 存储临时数据
    * 语言信息, 通话记录, 通话文件等
  * 日志
    * /var/log/asterisk
    * cdr,cel,debug,队列,消息,错误等
  * Dialplan
    * 传统方式 /etc/asterisk/extensions.conf
    * Asterisk Extension Logic (AEL) /etc/asterisk/extensions.ael
    * Lua /etc/asterisk/extensions.lua
  * 硬件
    * 常见的厂商 Digium (the sponsor, owner, and primary developer of Asterisk), Sangoma, Rhino, OpenVox, Pika, Voicetronix, Junghanns, Dialogic, Xorcom, beroNet
    * Digium Asterisk Hardware Device Interface - DAHDI
* 常见模块
  * asterisk-alsa
  * asterisk-cdr-mysql
  * asterisk-chan-dongle
  * asterisk-curl
  * asterisk-dahdi
  * asterisk-dbg
  * asterisk-dev
  * asterisk-doc
  * asterisk-fax
  * asterisk-mobile
  * asterisk-odbc
  * asterisk-pgsql
  * asterisk-sample-config
  * asterisk-sounds-en
  * asterisk-sounds-moh
  * asterisk-speex
  * asterisk-srtp
  * asterisk-tds
* 安装的模块位于 `/usr/lib/asterisk/modules`

```bash
apk add asterisk
apk add asterisk-{alsa,cdr-mysql,chan-dongle,curl,dahdi,dbg,dev,doc,fax,mobile,odbc,pgsql,sample-config,sounds-en,sounds-moh,speex,srtp,tds}
asterisk -cvvv
#> module show
#> core stop now
# -c 在前台运行
# -v, -vv, -vvv, -vvvv 详细程度 0-5
# -d, -dd, -ddd, -dddd 日志级别, logger.conf
# -r 远程连接, exit 退出
# -T 在 CLI 输出上添加时间戳
# -x 执行的命令 asterisk -rx 'core show channels'
# -g 如果崩溃了,则生成一个转储文件
```

sip show users
sip show peers               Show all SIP peers (including friends)
sip show registry            Show status of hosts we register with
sip set debug on             Show all SIP messages
sip reload                   Reload configuration file
sip show settings            Show the current channel configuration
iax2 reload
iax2 show peers
iax2 show users

* 基础配置
  * asterisk.conf
    * directories
    * options
    * files
    * compact
  * modules.conf
    * modules
  * indications.conf
  * musiconhold.conf
* 通道配置
  * sip.conf
  * iax.conf

__asterisk.conf [directories]__
Option | Value/Example | Notes
-------|----|----
astetcdir   | /etc/asterisk             | 配置存储目录
astmoddir   | /usr/lib/asterisk/modules | 加载模块的目录
astvarlibdir| /usr/lib/asterisk         | 其他状态信息存储的基础目录.也包含运行时写出的内容
astdbdir    | /var/lib/asterisk         | 会将内部数据库 astdb 存储于该目录
astkeydir   | /var/lib/asterisk         | 会使用该目录下的 keys 子目录来加载加密使用的秘钥
astdatadir  | /var/lib/asterisk         | 系统提供数据的基础目录,例如声音文件.
astagidir   | /var/lib/asterisk/agi-bin | 会使用该目录下的 agi-bin 子目录作为默认加载 AGI 脚本的位置
astspooldir | /var/spool/asterisk       | 语音邮件,通话记录,和通话相关的 spool 存储位置
astrundir   | /var/run/asterisk         | 存储 unix socket 和 pid 文件的位置
astlogdir   | /var/log/asterisk         | 日志文件存储位置


__sip.conf type__
type | Description
-----|----
peer    | 使用来源请求的 IP 和端口来匹配配置
user    | 使用 SIP 来源请求 From 头中的用户名来匹配 sip.conf 中同样名字的配置段例如 `[wener]`.
friend  | 同时使用 peer 和 user. 对于 SIP 电话来说这是最常用的设置.

;	1. Asterisk checks the SIP From: address username and matches against
;	   names of devices with type=user
;	   The name is the text between square brackets [name]
;	2. Asterisk checks the From: addres and matches the list of devices
;	   with a type=peer
;	3. Asterisk checks the IP address (and port number) that the INVITE
;	   was sent from and matches against any devices with type=peer

sip
default is port 5060 for UDP and TCP, 5061
; for TLS).

SIP 由三部分组成
1) the SIP connection (signaling for the call),
2) the outgoing audio stream (RTP),
3) the incoming audio stream (RTP).


Asterisk as a B2BUA
B2BUA (Back to Back User Agent)

部分 VoIP 支持 T.38 faxing protocol, 但更好的做法是 Fax over IP server

http://www.voipsupply.com/voip-adapter-overview




Digium Phone Module for Asterisk (DPMA)
a proprietary technology which allows a secure connection between an Asterisk system and a Digium telephone

注册主要是为了在网络上标识自己,而不是授权,标识自己后才能接收到来电.
授权是在每次拨号时触发,一个座机可以未注册但也可以拨号,不过此时无法接到来电.


MOH
https://www.jamendo.com/start

http://www.thegeekstuff.com/2009/05/sound-exchange-sox-15-examples-to-manipulate-audio-files
https://linux.die.net/man/1/rec
https://www.voip-info.org/wiki/view/Asterisk+config+musiconhold.conf

https://github.com/bg111/asterisk-chan-dongle
http://chan-dongle.blogspot.hk/2017/02/list-of-supported-models.html
https://github.com/bg111/asterisk-chan-dongle/wiki/Requirements-and-Limitations

https://web.archive.org/web/20150821112735/http://wiki.e1550.mobi/doku.php?id=compatible_usb_hubs




```bash
sox SilentCity.mp3 -t raw -r 8000 -s -2 -c 1 SilentCity.sln
cp *.sln /var/lib/asterisk/moh
asterisk -rx "module reload res_musiconhold.so"

# exten => 664,1,NoOp()
#     same => n,Progress()
#     same => n,MusicOnHold()

lame --decode music.mp3 music.wav
sox -V music.wav -r 8000 -c 1 -w music.raw
sox -V music.wav -r 8000 -c 1 -w music.gsm

for i in *.wav; do \
sox $i -r 8000 -c 1 $(basename $i .wav).raw; \
sox $i -r 8000 -c 1 $(basename $i .wav).gsm; \
done
rm *.wav
```









外部连通性


```
[globals]
LOCAL=DAHDI/G0           ; assuming you have a PSTN card in your system
TOLL=SIP/YourVoipCarrier ; as defined in sip.conf

; 匹配外部电话
[external]
exten => _NXXNXXXXXX,1,Dial(${LOCAL}/${EXTEN}) ; 10-digit pattern match for NANP
exten => _NXXXXXX,1,Dial(${LOCAL}/${EXTEN})    ; 7-digit pattern match for NANP
exten => _1NXXNXXXXXX,1,Dial(${TOLL}/${EXTEN}) ; Long-distance pattern match
                                               ; for NANP
exten => _011.,1,Dial(${TOLL}/${EXTEN})        ; International pattern match for
                                               ; calls made from NANP
; This section is functionally the same as the above section.
; It is for people who like to dial '9' before their calls
exten => _9NXXNXXXXXX,1,Dial(${LOCAL}/${EXTEN:1})
exten => _9NXXXXXX,1,Dial(${LOCAL}/${EXTEN:1})
exten => _91NXXNXXXXXX,1,Dial(${TOLL}/${EXTEN:1})
exten => _9011.,1,Dial(${TOLL}/${EXTEN:1})

; 该上下文中允许对外拨号
[LocalSets]
include => external


; 本地通道
; https://wiki.asterisk.org/wiki/display/AST/Local+Channel
[LocalSets]
exten => 107,1,Verbose(2,Dialing multiple locations with time delay)
  ; *** This all needs to be on a single line
  same => n,Dial(Local/channel_1@TimeDelay&Local/channel_2@TimeDelay&Local/channel_3@TimeDelay,40)
  same => n,Hangup()

[TimeDelay]
exten => channel_1,1,Verbose(2,Dialing the first channel)
  same => n,Dial(SIP/0000FFFF0001,20)
  same => n,Hangup()

exten => channel_2,1,Verbose(2,Dialing the second channel with a delay)
  same => n,Wait(10)
  same => n,Dial(DAHDI/g0/14165551212)

exten => channel_3,1,Verbose(2,Dialing the third channel with a delay)
  same => n,Wait(15)
  same => n,Dial(SIP/MyITSP/12565551212,15)
  same => n,Hangup()
```

AstDB
Berkeley database

```
; database put <family> <key> <value>.
; database get <family> <key>
; database del <key>
; database deltree <family>

exten => 456,1,NoOp()
  same => n,Set(DB(test/count)=1)
  same => n,Set(COUNT=${DB(test/count)}) same => n,Answer()
  same => n,SayNumber(${COUNT})

; deletes the key and returns its value in one step
exten => 457,1,Verbose(0, The value was ${DB_DELETE(test/count)})

exten => 457,1,DBdeltree(test)
```

__HotDesking__

```
[HotDesking]
; Control extension range using pattern matches
; Login with 71XX will logout existing extension at this location
; and log this device in with new extension.
; Logoff with 7000 from any device.
;
; 使用模式匹配控制扩展
; 71XX 会注销当前位置现有扩展,并将还设备记录到新的扩展
; 7000 会进行设备注销
exten => 7000,1,Verbose(2,Attempting logoff from device ${CHANNEL(peername)})
  same => n,Set(PeerName=${CHANNEL(peername)})
  same => n,Set(CurrentExtension=${DB(HotDesk/${PeerName})})
  same => n,GoSubIf($[${EXISTS(${CurrentExtension})}]? subDeviceLogoff,1(${PeerName},${CurrentExtension}):loggedoff)
  same => n,GotoIf($[${GOSUB_RETVAL} = 0]?loggedoff)
  same => n,Playback(an-error-has-occurred)
  same => n,Hangup()
  same => n(loggedoff),Playback(silence/1&agent-loggedoff)
  same => n,Hangup()

exten => _71XX,1,Verbose(2,Attempting to login device ${CHANNEL(peername)} to extension ${EXTEN:1})
  same => n,Set(NewPeerName=${CHANNEL(peername)})
  same => n,Set(NewExtension=${EXTEN:1})
; Check if existing extension is logged in for this device (NewPeerName)
; -- If existing extension exists (ExistingExtension)
;    -- get existing device name
;       -- If no existing device
;          -- (login) as we'll overwrite existing extension for this device
;       -- If existing device name
;          -- logoff ExistingExtension + ExistingDevice
;             -- Goto check_device ---------------------------------------+
; -- If no existing extension exists                                      |
;    -- Check if existing device is logged in for this extension          |
;       (NewExtension) <-----------------------------------------------+
;       -- If existing device exists
;          -- Get existing extension
;             -- If extension exists
;                -- Logoff Device + Extension
;                   -- Login
;             -- If no extension exists
;                -- Remove device from AstDB
;                   -- Login
;       -- If no device exists for NewExtension
;           -- Login

; Tests:
; * Login 100 to 0000FFFF0001
; * Login 101 to 0000FFFF0001 (Result: Only 101 logged in)
; * Login 101 to 0000FFFF0002 (Result: Only 101 logged in to new location)
; * Login 100 to 0000FFFF0001 (Result: Both 100 and 101 logged in)
; * Login 100 to 0000FFFF0002 (Result: Only 100 logged into 0000FFFF0002
;                                      -- change locations)
; * Login 100 to 0000FFFF0001 (Result: Only 100 logged in)
   same => n,Set(ExistingExtension=${DB(HotDesk/${NewPeerName})})
   same => n,GotoIf($[${EXISTS(${ExistingExtension})}]?get_existing_device)
   same => n(check_device),NoOp()
   same => n,Set(ExistingDevice=${DB(HotDesk/${NewExtension})})
   same => n,GotoIf($[${EXISTS(${ExistingDevice})}]?get_existing_extension)
   same => n,NoOp(Nothing to logout)
   same => n,Goto(login)
   same => n(get_existing_device),NoOp()
   same => n,Set(ExistingDevice=${DB(HotDesk/${ExistingExtension})})
   same => n,GotoIf($[${ISNULL(${ExistingDevice})}]?login)
   same => n,GoSub(subDeviceLogoff,1(${ExistingDevice},${ExistingExtension}))
   same => n,GotoIf($[${GOSUB_RETVAL} = 0]?check_device)
   same => n,Playback(silence/1&an-error-has-occurred)
   same => n,Hangup()
   same => n(get_existing_extension),NoOp()
   same => n,Set(ExistingExtension=${DB(HotDesk/${ExistingDevice})})
   same => n,GoSubIf($[${EXISTS(${ExistingExtension})}]? subDeviceLogoff,1(${ExistingDevice},${ExistingExtension}):remove_device)
   same => n,GotoIf($[${GOSUB_RETVAL} = 0]?loggedoff)
   same => n,Playback(silence/1&an-error-has-occurred)
   same => n,Hangup()
   same => n(remove_device),NoOp()
   same => n,Set(Result=${DB_DELETE(HotDesk/${ExistingDevice})})
   same => n,Goto(loggedoff)
   same => n(loggedoff),Verbose(2,Existing device and extensions have been logged off prior to login)
   same => n(login),Verbose(2,Now logging in extension ${NewExtension} to device ${NewPeerName})
   same => n,GoSub(subDeviceLogin,1(${NewPeerName},${NewExtension}))
   same => n,GotoIf($[${GOSUB_RETVAL} = 0]?login_ok)
   same => n,Playback(silence/1&an-error-has-occurred)
   same => n,Hangup()
   same => n(login_ok),Playback(silence/1&agent-loginok)
   same => n,Hangup()
; 设备注销
; subDeviceLogoff(PeerName,Extension)
; 返回 尚未注册 -1, 注销成功 0
exten => subDeviceLogoff,1,NoOp()
  same => n,Set(LOCAL(PeerName)=${ARG1})
  same => n,Set(LOCAL(Extension)=${ARG2})
  same => n,ExecIf($[${ISNULL(${LOCAL(PeerName)})} | ${ISNULL(${LOCAL(Extension)})}]?Return(-1))
  same => n,Set(PeerNameResult=${DB_DELETE(HotDesk/${LOCAL(PeerName)})})
  same => n,Set(ExtensionResult=${DB_DELETE(HotDesk/${LOCAL(Extension)})})
  same => n,Return(0)

exten => subDeviceLogin,1,NoOp()
   same => n,Set(LOCAL(PeerName)=${ARG1})
   same => n,Set(LOCAL(Extension)=${ARG2})
   same => n,ExecIf($[${ISNULL(${LOCAL(PeerName)})} | ${ISNULL(${LOCAL(Extension)})}]?Return(-1))
   same => n,Set(DB(HotDesk/${LOCAL(PeerName)})=${LOCAL(Extension)})
  same => n,Set(DB(HotDesk/${LOCAL(Extension)})=${LOCAL(PeerName)})
  same => n,Set(ReturnResult=${IF($[${DB_EXISTS(HotDesk/${LOCAL(PeerName)})} & ${DB_EXISTS(HotDesk/${LOCAL(Extension)})}]?0:-1)})
  same => n,Return(${ReturnResult})
```

```
; Zapateller
; 对于特定的情况播放特定的音频
exten => s,1,NoOp()
  same => n,Zapateller(nocallerid)
  same => n,Playback(enter-ext-of-person)

; Call Parking
[incoming]
include => parkedcalls
exten => 103,1,Dial(SIP/Bob,,tT)
exten => 104,1,Dial(SIP/Charlie,,tT)
```



```
; 处理来自 pstn 的请求
[from-pstn]
; This is the context that would be listed in the config file
; for the circuit (i.e. chan_dahdi.conf)
exten => _X.,1,Verbose(2,Incoming call to ${EXTEN})
    same => n,Goto(number-mapping,${EXTEN},1)
[number-mapping]
; This context is not strictly required, but will make it easier
; to keep track of your DIDs in a single location in your dialplan.
; From here you can pass the call to another part of the dialplan
; where the actual dialplan work will take place.
exten => 4165551234,1,Dial(SIP/0000FFFF0001)
exten => 4165554321,1,Goto(autoattendant-context,start,1)
exten => 4165559876,1,VoiceMailMain() ; a handy back door for listening
                                      ; to voice messages
exten => i,1,Verbose(2,Incoming call to invalid number)
```

```
; 复杂判断
[incoming]
exten => _X.,1,Answer()
  same => n,GotoIf($["${CHANNEL(secure_signaling)}" = "1"]?secure:insecure)
  same => n(secure),NoOp(Signaling is encrypted.)
  same => n,Hangup()
  same => n(insecure),NoOp(Signaling is not encrypted.)
  same => n,Hangup()
```

https://groups.google.com/forum/#!forum/asterisk-tw


core show functions
GotoIf(expression?destination1:destination2)
GotoIfTime(times,days_of_week,days_of_month,months?label)

${MACRO_CONTEXT}
The original context in which the macro was called.
${MACRO_EXTEN}
The original extension in which the macro was called.
${MACRO_PRIORITY}
The original priority in which the macro was called.
${ARG n }
The nth argument passed to the macro. For example, the first argument would be ${ARG1}, the second ${ARG2}, and so on.

```
exten => 123,1,NoOp()
  same => n,GotoIf($[${CALLERID(num)} = 8885551212]?reject:allow)
  same => n(allow),Dial(DAHDI/4)
  same => n,Hangup()
  same => n(reject),Playback(abandon-all-hope)
  same => n,Hangup()

; If it's any hour of the day, on any day of the week,
; during the fourth day of the month, in the month of July,
; we're closed
exten => s,1,NoOp()
  same => n,GotoIfTime(*,*,4,jul?closed,s,1)
; During business hours, send calls to the open context
  same => n,GotoIfTime(09:00-17:59,mon-fri,*,*?open,s,1)
  same => n,GotoIfTime(09:00-11:59,sat,*,*?open,s,1)
; Otherwise, we're closed
  same => n,Goto(closed,s,1)

; 宏 di
[macro-voicemail]
exten => s,1,NoOp()
  same => n,Dial(${ARG1},10)
  same => n,GotoIf($["${DIALSTATUS}" = "BUSY"]?busy:unavail)
  same => n(unavail),VoiceMail(101@default,u)
  same => n,Hangup()
  same => n(busy),VoiceMail(101@default,b)
  same => n,Hangup()

[other]
; 调用宏
exten => 101,1,Macro(voicemail,${JOHN})

; 协程定义
[subDialer]
exten => start,1,NoOp()
  same => n,Dial(${ARG1},${ARG2})
  same => n,Return(${DIALSTATUS})
[subVoicemail]
exten => start,1,NoOp()
  same => n,VoiceMail(${ARG1}@${ARG2},${ARG3})
  same => n,Hangup()

; 调用协程
[other]
exten => 101,1,NoOp()
  same => n,GoSub(subDialer,start,1(${JOHN},30))
  same => n,Set(VoicemailMessage=${IF($[${GOSUB_RETVAL} = BUSY]?b:u)})
  same => n,GoSub(subVoicemail,start,1(${EXTEN},default,${VoicemailMessage}))
```

__VoIP Protocol__
Protocol | Mean | Notes
----|----|----
SIP   | Session Initiation Protocol          | SIP 基于标准的协议,大多数 VoIP 电话和服务都在使用或提供响应支持.
SCCP  | Cisco Skinny Client Control Protocol | SCCP 是私有协议,主要用于 Cisco's Call Manager 和 IP 电话
MGCP  | MGCP 很老的 VoIP 协议,已经很少使用了.
H.323 | 类似于 MGCP , 是很老的 VoIP 协议,已经很少使用了.

__语音编码__
编码 | 速率 | Fidelity
----|----
GSM   | 13 Kbps| 8k
iLBC  | 15 Kbps
G.711 | 64 Kbps
G.722 | 48/56/64 Kbps
G.726 | 16/24/32/40 Kbps
G.728 | 16 Kbps
G.729 | 8 Kbps
SPEEX Narrowband | 14Kps-23Kps | 8k
SPEEX Wideband | 20800-58400 | 16k
OPUS | 6k-51k | 48k
G.722 | 8K-80k | 16k



视频编码
H.263 90000



```
!                              -- Execute a shell command
acl show                       -- Show a named ACL or list all named ACLs
ael reload                     -- Reload AEL configuration
ael set debug {read|tokens|macros|contexts|off} -- Enable AEL debugging flags
agent logoff                   -- Sets an agent offline
agent show all                 -- Show status of all agents
agent show online              -- Show status of online agents
agent show                     -- Show information about an agent
agi dump html                  -- Dumps a list of AGI commands in HTML format
agi exec                       -- Add AGI command to a channel in Async AGI
agi set debug [on|off]         -- Enable/Disable AGI debugging
agi show commands [topic]      -- List AGI commands or specific help
aoc set debug                  -- enable cli debugging of AOC messages
ari mkpasswd                   -- Encrypts a password
ari set debug                  -- Enable/disable debugging of an ARI application
ari show apps                  -- List registered ARI applications
ari show app                   -- Display details of a registered ARI application
ari show status                -- Show ARI settings
ari show users                 -- List ARI users
ari show user                  -- List single ARI user
bridge kick                    -- Kick a channel from a bridge
bridge show all                -- List all bridges
bridge show                    -- Show information about a bridge
bridge technology show         -- List registered bridge technologies
bridge technology {suspend|unsuspend} -- Suspend/unsuspend a bridge technology
calendar dump sched            -- Dump calendar sched context
calendar show calendar         -- Display information about a calendar
calendar show calendars        -- Show registered calendars
calendar show types            -- Show all calendar types loaded
cc cancel                      -- Kill a CC transaction
cc report status               -- Reports CC stats
cdr set debug [on|off]         -- Enable debugging in the CDR engine
cdr show active                -- Display active CDRs for channels
cdr show status                -- Display the CDR status
cdr submit                     -- Posts all pending batched CDR data
cel show status                -- Display the CEL status
channel originate              -- Originate a call
channel redirect               -- Redirect a call
channel request hangup         -- Request a hangup on a given channel
cli check permissions          -- Try a permissions config for a user
cli reload permissions         -- Reload CLI permissions config
cli show aliases               -- Show CLI command aliases
cli show permissions           -- Show CLI permissions
confbridge kick                -- Kick participants out of conference bridges.
confbridge list                -- List conference bridges and participants.
confbridge lock                -- Lock a conference.
confbridge mute                -- Mute participants.
confbridge record start        -- Start recording a conference
confbridge record stop         -- Stop recording a conference.
confbridge show menu           -- Show a conference menu
confbridge show menus          -- Show a list of conference menus
confbridge show profile bridge -- Show a conference bridge profile.
confbridge show profile bridges -- Show a list of conference bridge profiles.
confbridge show profile user   -- Show a conference user profile.
confbridge show profile users  -- Show a list of conference user profiles.
confbridge unlock              -- Unlock a conference.
confbridge unmute              -- Unmute participants.
config list                    -- Show all files that have loaded a configuration file
config reload                  -- Force a reload on modules using a particular configuration file
config show help               -- Show configuration help for a module
console answer                 -- Answer an incoming console call
console boost                  -- Sets/displays mic boost in dB
console dial                   -- Dial an extension on the console
console flash                  -- Flash a call on the console
console hangup                 -- Hangup a call on the console
console {mute|unmute} [toggle] -- Disable/Enable mic input
console send text              -- Send text to the remote device
console transfer               -- Transfer a call to a different extension
console {device}               -- Generic console command
console {set|show} autoanswer [on|off] -- Sets/displays autoanswer
console {set|show} active [<device>] -- Sets/displays active console
core abort shutdown            -- Cancel a running shutdown
core clear profile             -- Clear profiling info
core ping taskprocessor        -- Ping a named task processor
core reload                    -- Global reload
core restart gracefully        -- Restart Asterisk gracefully
core restart now               -- Restart Asterisk immediately
core restart when convenient   -- Restart Asterisk at empty call volume
core set debug channel         -- Enable/disable debugging on a channel
core set debug                 -- Set level of debug chattiness
core set verbose               -- Set level of verbose chattiness
core show applications [like|describing] -- Shows registered dialplan applications
core show application          -- Describe a specific dialplan application
core show calls [uptime]       -- Display information on calls
core show channels [concise|verbose|count] -- Display information on channels
core show channel              -- Display information on a specific channel
core show channeltypes         -- List available channel types
core show channeltype          -- Give more details on that channel type
core show codecs [audio|video|image|text] -- Displays a list of registered codecs
core show codec                -- Shows a specific codec
core show config mappings      -- Display config mappings (file names to config engines)
core show file formats         -- Displays file formats
core show functions [like]     -- Shows registered dialplan functions
core show function             -- Describe a specific dialplan function
core show hanguphandlers all   -- Show hangup handlers of all channels
core show hanguphandlers       -- Show hangup handlers of a specified channel
core show help                 -- Display help list, or specific help on a command
core show hints                -- Show dialplan hints
core show hint                 -- Show dialplan hint
core show image formats        -- Displays image formats
core show license              -- Show the license(s) for this copy of Asterisk
core show profile              -- Display profiling info
core show settings             -- Show some core settings
core show sounds               -- Shows available sounds
core show sound                -- Shows details about a specific sound
core show switches             -- Show alternative switches
core show sysinfo              -- Show System Information
core show taskprocessors       -- List instantiated task processors and statistics
core show threads              -- Show running threads
core show translation          -- Display translation matrix
core show uptime [seconds]     -- Show uptime information
core show version              -- Display version info
core show warranty             -- Show the warranty (if any) for this copy of Asterisk
core stop gracefully           -- Gracefully shut down Asterisk
core stop now                  -- Shut down Asterisk immediately
core stop when convenient      -- Shut down Asterisk at empty call volume
core waitfullybooted           -- Wait for Asterisk to be fully booted
dahdi create channels          -- Create channels
dahdi destroy channels         -- Destroy channels
dahdi restart                  -- Fully restart DAHDI channels
dahdi set dnd                  -- Sets/resets DND (Do Not Disturb) mode on a channel
dahdi set hwgain {rx|tx}       -- Set hardware gain on a channel
dahdi set swgain {rx|tx}       -- Set software gain on a channel
dahdi show cadences            -- List cadences
dahdi show channels [group|context] -- Show active DAHDI channels
dahdi show channel             -- Show information on a channel
dahdi show status              -- Show all DAHDI cards status
dahdi show version             -- Show the DAHDI version in use
data get                       -- Data API get
data show providers            -- Show data providers
database del                   -- Removes database key/value
database deltree               -- Removes database keytree/values
database get                   -- Gets database value
database put                   -- Adds/updates database value
database query                 -- Run a user-specified query on the astdb
database show                  -- Shows database contents
database showkey               -- Shows database contents
devstate change                -- Change a custom device state
devstate list                  -- List currently known custom device states
dialplan add extension         -- Add new extension into context
dialplan add ignorepat         -- Add new ignore pattern
dialplan add include           -- Include context in other context
dialplan debug                 -- Show fast extension pattern matching data structures
dialplan reload                -- Reload extensions and *only* extensions
dialplan remove context        -- Remove a specified context
dialplan remove extension      -- Remove a specified extension
dialplan remove ignorepat      -- Remove ignore pattern from context
dialplan remove include        -- Remove a specified include from context
dialplan save                  -- Save current dialplan into a file
dialplan set chanvar           -- Set a channel variable
dialplan set extenpatternmatchnew false -- Use the Old extension pattern matching algorithm.
dialplan set extenpatternmatchnew true -- Use the New extension pattern matching algorithm.
dialplan set global            -- Set global dialplan variable
dialplan show                  -- Show dialplan
dialplan show chanvar          -- Show channel variables
dialplan show globals          -- Show global dialplan variables
dnsmgr refresh                 -- Performs an immediate refresh
dnsmgr reload                  -- Reloads the DNS manager configuration
dnsmgr status                  -- Display the DNS manager status
dundi flush [stats]            -- Flush DUNDi cache
dundi lookup                   -- Lookup a number in DUNDi
dundi precache                 -- Precache a number in DUNDi
dundi query                    -- Query a DUNDi EID
dundi set debug {on|off}       -- Enable/Disable DUNDi debugging
dundi show cache               -- Show DUNDi cache
dundi show entityid            -- Display Global Entity ID
dundi show hints               -- Show DUNDi hints in the cache
dundi show mappings            -- Show DUNDi mappings
dundi show peers [registered|include|exclude|begin] -- Show defined DUNDi peers
dundi show peer                -- Show info on a specific DUNDi peer
dundi show precache            -- Show DUNDi precache
dundi show requests            -- Show DUNDi requests
dundi show trans               -- Show active DUNDi transactions
dundi store history {on|off}   -- Enable/Disable DUNDi historic records
fax set debug {on|off}         -- Enable/Disable FAX debugging on new FAX sessions
fax show capabilities          -- Show the capabilities of the registered FAX technology modules
fax show session               -- Show the status of the named FAX sessions
fax show sessions              -- Show the current FAX sessions
fax show settings              -- Show the global settings and defaults of both the FAX core and technology modules
fax show stats                 -- Summarize FAX session history
fax show version               -- Show versions of FAX For Asterisk components
features show                  -- Lists configured features
file convert                   -- Convert audio file
group show channels            -- Display active channels with group(s)
hangup request                 -- <no description available>
help                           -- <no description available>
http show status               -- Display HTTP server status
iax2 provision                 -- Provision an IAX device
iax2 prune realtime            -- Prune a cached realtime lookup
iax2 reload                    -- Reload IAX configuration
iax2 set debug {on|off|peer}   -- Enable/Disable IAX debugging
iax2 set debug jb {on|off}     -- Enable/Disable IAX jitterbuffer debugging
iax2 set debug trunk {on|off}  -- Enable/Disable IAX trunk debugging
iax2 set mtu                   -- Set the IAX systemwide trunking MTU
iax2 show cache                -- Display IAX cached dialplan
iax2 show callnumber usage     -- Show current entries in IP call number limit table
iax2 show channels             -- List active IAX channels
iax2 show firmware             -- List available IAX firmware
iax2 show netstats             -- List active IAX channel netstats
iax2 show peer                 -- Show details on specific IAX peer
iax2 show peers                -- List defined IAX peers
iax2 show provisioning         -- Display iax provisioning
iax2 show registry             -- Display IAX registration status
iax2 show stats                -- Display IAX statistics
iax2 show threads              -- Display IAX helper thread info
iax2 show users [like]         -- List defined IAX users
iax2 test losspct              -- Set IAX2 incoming frame loss percentage
iax2 unregister                -- Unregister (force expiration) an IAX2 peer from the registry
indication add                 -- Add the given indication to the country
indication remove              -- Remove the given indication from the country
indication show                -- Display a list of all countries/indications
keys init                      -- Initialize RSA key passcodes
keys show                      -- Displays RSA key information
local show channels            -- List status of local channels
logger add channel             -- Adds a new logging channel
logger mute                    -- Toggle logging output to a console
logger reload                  -- Reopens the log files
logger remove channel          -- Removes a logging channel
logger rotate                  -- Rotates and reopens the log files
logger set level {DEBUG|NOTICE|WARNING|ERROR|VERBOSE|DTMF} {on|off} -- Enables/Disables a specific logging level for this console
logger show channels           -- List configured log channels
manager reload                 -- Reload manager configurations
manager set debug [on|off]     -- Show, enable, disable debugging of the manager code
manager show command           -- Show a manager interface command
manager show commands          -- List manager interface commands
manager show connected         -- List connected manager interface users
manager show eventq            -- List manager interface queued events
manager show events            -- List manager interface events
manager show event             -- Show a manager interface event
manager show settings          -- Show manager global settings
manager show users             -- List configured manager users
manager show user              -- Display information on a specific manager user
media cache create             -- Create an item in the media cache
media cache delete             -- Remove an item from the media cache
media cache refresh            -- Refresh an item in the media cache
media cache show all           -- Show all items in the media cache
media cache show               -- Show a single item in the media cache
meetme kick                    -- Kick a conference or a user in a conference.
meetme list                    -- List all conferences or a specific conference.
meetme {lock|unlock}           -- Lock or unlock a conference to new users.
meetme {mute|unmute}           -- Mute or unmute a conference or a user in a conference.
mgcp audit endpoint            -- Audit specified MGCP endpoint
mgcp reload                    -- Reload MGCP configuration
mgcp set debug {on|off}        -- Enable/Disable MGCP debugging
mgcp show endpoints            -- List defined MGCP endpoints
minivm list accounts           -- List defined mini-voicemail boxes
minivm list templates          -- List message templates
minivm list zones              -- List zone message formats
minivm reload                  -- Reload Mini-voicemail configuration
minivm show settings           -- Show mini-voicemail general settings
minivm show stats              -- Show some mini-voicemail statistics
mixmonitor {start|stop|list}   -- Execute a MixMonitor command
module load                    -- Load a module by name
module reload                  -- Reload configuration for a module
module show [like]             -- List modules and info
module unload                  -- Unload a module by name
moh reload                     -- Reload MusicOnHold
moh show classes               -- List MusicOnHold classes
moh show files                 -- List MusicOnHold file-based classes
no debug channel               -- Disable debugging on channel(s)
originate                      -- <no description available>
parking show                   -- Show a parking lot or a list of all parking lots.
phoneprov show routes          -- Show registered phoneprov http routes
pjproject show buildopts       -- Show the compiled config of the pjproject in use
pjproject show log mappings    -- Show pjproject to Asterisk log mappings
pjsip dump endpt               -- Dump the res_pjsip endpt internals
pjsip export config_wizard primitives [to] -- Export config wizard primitives
pjsip list aors                -- List PJSIP Aors
pjsip list auths               -- List PJSIP Auths
pjsip list channels            -- List PJSIP Channels
pjsip list ciphers             -- List available OpenSSL cipher names
pjsip list contacts            -- List PJSIP Contacts
pjsip list endpoints           -- List PJSIP Endpoints
pjsip list identifies          -- List PJSIP Identifies
pjsip list registrations       -- List PJSIP Registrations
pjsip list transports          -- List PJSIP Transports
pjsip qualify                  -- Send an OPTIONS request to a PJSIP endpoint
pjsip reload                   -- <no description available>
pjsip send notify              -- Send a NOTIFY request to a SIP endpoint
pjsip send register            -- Registers an outbound registration target
pjsip send unregister          -- Unregisters outbound registration target
pjsip set history {on|off|clear} -- Enable/Disable PJSIP History
pjsip set logger {on|off|host} -- Enable/Disable PJSIP Logger Output
pjsip show aors                -- Show PJSIP Aors
pjsip show aor                 -- Show PJSIP Aor
pjsip show auths               -- Show PJSIP Auths
pjsip show auth                -- Show PJSIP Auth
pjsip show channels            -- Show PJSIP Channels
pjsip show channel             -- Show PJSIP Channel
pjsip show channelstats        -- Show PJSIP Channel Stats
pjsip show contacts            -- Show PJSIP Contacts
pjsip show contact             -- Show PJSIP Contact
pjsip show endpoints           -- Show PJSIP Endpoints
pjsip show endpoint            -- Show PJSIP Endpoint
pjsip show history             -- Display PJSIP History
pjsip show identifiers         -- List registered endpoint identifiers
pjsip show identifies          -- Show PJSIP Identifies
pjsip show identify            -- Show PJSIP Identify
pjsip show registrations       -- Show PJSIP Registrations
pjsip show registration        -- Show PJSIP Registration
pjsip show scheduled_tasks     -- Show all scheduled tasks
pjsip show settings            -- Show global and system configuration options
pjsip show transports          -- Show PJSIP Transports
pjsip show transport           -- Show PJSIP Transport
pjsip show unidentified_requests -- Show PJSIP Unidentified Requests
pjsip show version             -- Show the version of pjproject in use
presencestate change           -- Change a custom presence state
presencestate list             -- List currently know custom presence states
pri destroy span               -- Destroy a PRI span
pri intense debug span         -- <no description available>
pri service disable channel    -- Remove a channel from service
pri service enable channel     -- Return a channel to service
pri set debug {on|off|hex|intense|0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15} span -- Enables PRI debugging on a span
pri set debug file             -- Sends PRI debug output to the specified file
pri show channels              -- Displays PRI channel information
pri show debug                 -- Displays current PRI debug settings
pri show spans                 -- Displays PRI span information
pri show span                  -- Displays PRI span information
pri show version               -- Displays libpri version
queue add member               -- Add a channel to a specified queue
queue reload {parameters|members|rules|all} -- Reload queues, members, queue rules, or parameters
queue remove member            -- Removes a channel from a specified queue
queue reset stats              -- Reset statistics for a queue
queue set penalty              -- Set penalty for a channel of a specified queue
queue set ringinuse            -- Set ringinuse for a channel of a specified queue
queue show                     -- Show status of a specified queue
queue show rules               -- Show the rules defined in queuerules.conf
queue {pause|unpause} member   -- Pause or unpause a queue member
realtime destroy               -- Delete a row from a RealTime database
realtime load                  -- Used to print out RealTime variables.
realtime store                 -- Store a new row into a RealTime database
realtime update                -- Used to update RealTime variables.
realtime update2               -- Used to test the RealTime update2 method
reload                         -- <no description available>
rtcp set debug {on|off|ip}     -- Enable/Disable RTCP debugging
rtcp set stats {on|off}        -- Enable/Disable RTCP stats
rtp set debug {on|off|ip}      -- Enable/Disable RTP debugging
say load [new|old]             -- Set or show the say mode
sip notify                     -- Send a notify packet to a SIP peer
sip prune realtime [peer|all]  -- Prune cached Realtime users/peers
sip qualify peer               -- Send an OPTIONS packet to a peer
sip reload                     -- Reload SIP configuration
sip set debug {on|off|ip|peer} -- Enable/Disable SIP debugging
sip set history {on|off}       -- Enable/Disable SIP history
sip show {channels|subscriptions} -- List active SIP channels or subscriptions
sip show channelstats          -- List statistics for active SIP channels
sip show channel               -- Show detailed SIP channel info
sip show domains               -- List our local SIP domains
sip show history               -- Show SIP dialog history
sip show inuse                 -- List all inuse/limits
sip show mwi                   -- Show MWI subscriptions
sip show objects               -- List all SIP object allocations
sip show peers                 -- List defined SIP peers
sip show peer                  -- Show details on specific SIP peer
sip show registry              -- List SIP registration status
sip show sched                 -- Present a report on the status of the scheduler queue
sip show settings              -- Show SIP global settings
sip show tcp                   -- List TCP Connections
sip show users                 -- List defined SIP users
sip show user                  -- Show details on specific SIP user
sip unregister                 -- Unregister (force expiration) a SIP peer from the registry
skinny message clear           -- Clear message to devices
skinny message set             -- Send message to devices
skinny reload                  -- Reload Skinny config
skinny reset                   -- Reset Skinny device(s)
skinny show devices            -- List defined Skinny devices
skinny show device             -- List Skinny device information
skinny show lines [verbose]    -- List defined Skinny lines per device
skinny show line               -- List Skinny line information
skinny show settings           -- List global Skinny settings
sla show stations              -- Show SLA Stations
sla show trunks                -- Show SLA Trunks
sorcery memory cache dump      -- Dump all objects within a sorcery memory cache
sorcery memory cache expire    -- Expire a specific object or ALL objects within a sorcery memory cache
sorcery memory cache populate  -- Clear and populate the sorcery memory cache with objects from the backend
sorcery memory cache show      -- Show sorcery memory cache information
sorcery memory cache stale     -- Mark a specific object or ALL objects as stale within a sorcery memory cache
stun set debug {on|off}        -- Enable/Disable STUN debugging
stun show status               -- Show STUN servers and statuses
timing test                    -- Run a timing test
transcoder show                -- Display DAHDI transcoder utilization.
udptl set debug {on|off|ip}    -- Enable/Disable UDPTL debugging
udptl show config              -- Show UDPTL config options
ulimit                         -- Set or show process resource limits
unistim reload                 -- Reload UNISTIM configuration
unistim send packet            -- Send packet (for reverse engineering)
unistim set debug {on|off}     -- Toggle UNITSTIM debugging
unistim show devices           -- Show UNISTIM devices
unistim show info              -- Show UNISTIM info
voicemail reload               -- Reload voicemail configuration
voicemail show users           -- List defined voicemail boxes
voicemail show zones           -- List zone message formats
xmldoc dump                    -- Dump the XML docs to the specified file
```



```
$ ./menuselect/menuselect --list-options
- chan_mobile                    MENUSELECT_ADDONS
- chan_ooh323                    MENUSELECT_ADDONS
- format_mp3                     MENUSELECT_ADDONS
- res_config_mysql               MENUSELECT_ADDONS
- app_mysql                      MENUSELECT_ADDONS
- cdr_mysql                      MENUSELECT_ADDONS
+ app_agent_pool                 MENUSELECT_APPS
+ app_authenticate               MENUSELECT_APPS
+ app_bridgewait                 MENUSELECT_APPS
+ app_cdr                        MENUSELECT_APPS
+ app_celgenuserevent            MENUSELECT_APPS
+ app_channelredirect            MENUSELECT_APPS
+ app_chanspy                    MENUSELECT_APPS
+ app_confbridge                 MENUSELECT_APPS
+ app_controlplayback            MENUSELECT_APPS
+ app_db                         MENUSELECT_APPS
+ app_dial                       MENUSELECT_APPS
+ app_directed_pickup            MENUSELECT_APPS
+ app_directory                  MENUSELECT_APPS
+ app_disa                       MENUSELECT_APPS
+ app_dumpchan                   MENUSELECT_APPS
+ app_echo                       MENUSELECT_APPS
+ app_exec                       MENUSELECT_APPS
+ app_flash                      MENUSELECT_APPS
+ app_followme                   MENUSELECT_APPS
+ app_forkcdr                    MENUSELECT_APPS
+ app_macro                      MENUSELECT_APPS
+ app_milliwatt                  MENUSELECT_APPS
+ app_mixmonitor                 MENUSELECT_APPS
+ app_originate                  MENUSELECT_APPS
+ app_page                       MENUSELECT_APPS
+ app_playback                   MENUSELECT_APPS
+ app_playtones                  MENUSELECT_APPS
+ app_privacy                    MENUSELECT_APPS
+ app_queue                      MENUSELECT_APPS
+ app_read                       MENUSELECT_APPS
+ app_readexten                  MENUSELECT_APPS
+ app_record                     MENUSELECT_APPS
+ app_sayunixtime                MENUSELECT_APPS
+ app_senddtmf                   MENUSELECT_APPS
+ app_sendtext                   MENUSELECT_APPS
- app_skel                       MENUSELECT_APPS
+ app_softhangup                 MENUSELECT_APPS
+ app_speech_utils               MENUSELECT_APPS
+ app_stack                      MENUSELECT_APPS
+ app_stasis                     MENUSELECT_APPS
+ app_system                     MENUSELECT_APPS
+ app_talkdetect                 MENUSELECT_APPS
+ app_transfer                   MENUSELECT_APPS
+ app_userevent                  MENUSELECT_APPS
+ app_verbose                    MENUSELECT_APPS
+ app_voicemail                  MENUSELECT_APPS
+ app_waituntil                  MENUSELECT_APPS
+ app_while                      MENUSELECT_APPS
+ app_adsiprog                   MENUSELECT_APPS
+ app_alarmreceiver              MENUSELECT_APPS
+ app_amd                        MENUSELECT_APPS
+ app_chanisavail                MENUSELECT_APPS
+ app_dahdiras                   MENUSELECT_APPS
+ app_dictate                    MENUSELECT_APPS
+ app_externalivr                MENUSELECT_APPS
- app_fax                        MENUSELECT_APPS
+ app_festival                   MENUSELECT_APPS
+ app_getcpeid                   MENUSELECT_APPS
+ app_ices                       MENUSELECT_APPS
+ app_image                      MENUSELECT_APPS
- app_ivrdemo                    MENUSELECT_APPS
+ app_jack                       MENUSELECT_APPS
- app_meetme                     MENUSELECT_APPS
+ app_minivm                     MENUSELECT_APPS
+ app_morsecode                  MENUSELECT_APPS
+ app_mp3                        MENUSELECT_APPS
+ app_nbscat                     MENUSELECT_APPS
+ app_osplookup                  MENUSELECT_APPS
- app_saycounted                 MENUSELECT_APPS
+ app_sms                        MENUSELECT_APPS
+ app_test                       MENUSELECT_APPS
+ app_url                        MENUSELECT_APPS
+ app_waitforring                MENUSELECT_APPS
+ app_waitforsilence             MENUSELECT_APPS
+ app_zapateller                 MENUSELECT_APPS
- app_setcallerid                MENUSELECT_APPS
+ bridge_builtin_features        MENUSELECT_BRIDGES
+ bridge_builtin_interval_featur MENUSELECT_BRIDGES
+ bridge_holding                 MENUSELECT_BRIDGES
+ bridge_native_rtp              MENUSELECT_BRIDGES
+ bridge_simple                  MENUSELECT_BRIDGES
+ bridge_softmix                 MENUSELECT_BRIDGES
+ cdr_adaptive_odbc              MENUSELECT_CDR
+ cdr_custom                     MENUSELECT_CDR
+ cdr_manager                    MENUSELECT_CDR
+ cdr_syslog                     MENUSELECT_CDR
+ cdr_csv                        MENUSELECT_CDR
+ cdr_odbc                       MENUSELECT_CDR
+ cdr_pgsql                      MENUSELECT_CDR
+ cdr_radius                     MENUSELECT_CDR
+ cdr_sqlite3_custom             MENUSELECT_CDR
+ cdr_tds                        MENUSELECT_CDR
+ cdr_sqlite                     MENUSELECT_CDR
+ cel_custom                     MENUSELECT_CEL
+ cel_manager                    MENUSELECT_CEL
+ cel_odbc                       MENUSELECT_CEL
+ cel_pgsql                      MENUSELECT_CEL
+ cel_radius                     MENUSELECT_CEL
+ cel_sqlite3_custom             MENUSELECT_CEL
+ cel_tds                        MENUSELECT_CEL
+ chan_bridge_media              MENUSELECT_CHANNELS
+ chan_dahdi                     MENUSELECT_CHANNELS
+ chan_iax2                      MENUSELECT_CHANNELS
+ chan_motif                     MENUSELECT_CHANNELS
+ chan_pjsip                     MENUSELECT_CHANNELS
+ chan_rtp                       MENUSELECT_CHANNELS
+ chan_alsa                      MENUSELECT_CHANNELS
+ chan_console                   MENUSELECT_CHANNELS
+ chan_mgcp                      MENUSELECT_CHANNELS
+ chan_misdn                     MENUSELECT_CHANNELS
+ chan_nbs                       MENUSELECT_CHANNELS
+ chan_oss                       MENUSELECT_CHANNELS
+ chan_phone                     MENUSELECT_CHANNELS
+ chan_sip                       MENUSELECT_CHANNELS
+ chan_skinny                    MENUSELECT_CHANNELS
+ chan_unistim                   MENUSELECT_CHANNELS
+ chan_vpb                       MENUSELECT_CHANNELS
- chan_multicast_rtp             MENUSELECT_CHANNELS
+ codec_a_mu                     MENUSELECT_CODECS
+ codec_adpcm                    MENUSELECT_CODECS
+ codec_alaw                     MENUSELECT_CODECS
+ codec_dahdi                    MENUSELECT_CODECS
+ codec_g722                     MENUSELECT_CODECS
+ codec_g726                     MENUSELECT_CODECS
+ codec_gsm                      MENUSELECT_CODECS
+ codec_ilbc                     MENUSELECT_CODECS
+ codec_lpc10                    MENUSELECT_CODECS
+ codec_resample                 MENUSELECT_CODECS
+ codec_speex                    MENUSELECT_CODECS
+ codec_ulaw                     MENUSELECT_CODECS
+ codec_opus                     MENUSELECT_CODECS
+ codec_silk                     MENUSELECT_CODECS
+ codec_siren7                   MENUSELECT_CODECS
+ codec_siren14                  MENUSELECT_CODECS
+ codec_g729a                    MENUSELECT_CODECS
+ format_g719                    MENUSELECT_FORMATS
+ format_g723                    MENUSELECT_FORMATS
+ format_g726                    MENUSELECT_FORMATS
+ format_g729                    MENUSELECT_FORMATS
+ format_gsm                     MENUSELECT_FORMATS
+ format_h263                    MENUSELECT_FORMATS
+ format_h264                    MENUSELECT_FORMATS
+ format_ilbc                    MENUSELECT_FORMATS
+ format_ogg_vorbis              MENUSELECT_FORMATS
+ format_pcm                     MENUSELECT_FORMATS
+ format_siren14                 MENUSELECT_FORMATS
+ format_siren7                  MENUSELECT_FORMATS
+ format_sln                     MENUSELECT_FORMATS
+ format_wav                     MENUSELECT_FORMATS
+ format_wav_gsm                 MENUSELECT_FORMATS
+ format_jpeg                    MENUSELECT_FORMATS
+ format_vox                     MENUSELECT_FORMATS
+ func_aes                       MENUSELECT_FUNCS
+ func_base64                    MENUSELECT_FUNCS
+ func_blacklist                 MENUSELECT_FUNCS
+ func_callcompletion            MENUSELECT_FUNCS
+ func_callerid                  MENUSELECT_FUNCS
+ func_cdr                       MENUSELECT_FUNCS
+ func_channel                   MENUSELECT_FUNCS
+ func_config                    MENUSELECT_FUNCS
+ func_curl                      MENUSELECT_FUNCS
+ func_cut                       MENUSELECT_FUNCS
+ func_db                        MENUSELECT_FUNCS
+ func_devstate                  MENUSELECT_FUNCS
+ func_dialgroup                 MENUSELECT_FUNCS
+ func_dialplan                  MENUSELECT_FUNCS
+ func_enum                      MENUSELECT_FUNCS
+ func_env                       MENUSELECT_FUNCS
+ func_extstate                  MENUSELECT_FUNCS
+ func_global                    MENUSELECT_FUNCS
+ func_groupcount                MENUSELECT_FUNCS
+ func_hangupcause               MENUSELECT_FUNCS
+ func_holdintercept             MENUSELECT_FUNCS
+ func_iconv                     MENUSELECT_FUNCS
+ func_jitterbuffer              MENUSELECT_FUNCS
+ func_lock                      MENUSELECT_FUNCS
+ func_logic                     MENUSELECT_FUNCS
+ func_math                      MENUSELECT_FUNCS
+ func_md5                       MENUSELECT_FUNCS
+ func_module                    MENUSELECT_FUNCS
+ func_odbc                      MENUSELECT_FUNCS
+ func_periodic_hook             MENUSELECT_FUNCS
+ func_pjsip_aor                 MENUSELECT_FUNCS
+ func_pjsip_contact             MENUSELECT_FUNCS
+ func_pjsip_endpoint            MENUSELECT_FUNCS
+ func_presencestate             MENUSELECT_FUNCS
+ func_rand                      MENUSELECT_FUNCS
+ func_realtime                  MENUSELECT_FUNCS
+ func_sha1                      MENUSELECT_FUNCS
+ func_shell                     MENUSELECT_FUNCS
+ func_sorcery                   MENUSELECT_FUNCS
+ func_speex                     MENUSELECT_FUNCS
+ func_sprintf                   MENUSELECT_FUNCS
+ func_srv                       MENUSELECT_FUNCS
+ func_strings                   MENUSELECT_FUNCS
+ func_sysinfo                   MENUSELECT_FUNCS
+ func_talkdetect                MENUSELECT_FUNCS
+ func_timeout                   MENUSELECT_FUNCS
+ func_uri                       MENUSELECT_FUNCS
+ func_version                   MENUSELECT_FUNCS
+ func_vmcount                   MENUSELECT_FUNCS
+ func_volume                    MENUSELECT_FUNCS
+ func_frame_trace               MENUSELECT_FUNCS
+ func_pitchshift                MENUSELECT_FUNCS
+ func_audiohookinherit          MENUSELECT_FUNCS
+ pbx_config                     MENUSELECT_PBX
+ pbx_loopback                   MENUSELECT_PBX
+ pbx_spool                      MENUSELECT_PBX
+ pbx_ael                        MENUSELECT_PBX
+ pbx_dundi                      MENUSELECT_PBX
+ pbx_lua                        MENUSELECT_PBX
+ pbx_realtime                   MENUSELECT_PBX
+ res_adsi                       MENUSELECT_RES
+ res_agi                        MENUSELECT_RES
+ res_ari                        MENUSELECT_RES
+ res_ari_applications           MENUSELECT_RES
+ res_ari_asterisk               MENUSELECT_RES
+ res_ari_bridges                MENUSELECT_RES
+ res_ari_channels               MENUSELECT_RES
+ res_ari_device_states          MENUSELECT_RES
+ res_ari_endpoints              MENUSELECT_RES
+ res_ari_events                 MENUSELECT_RES
+ res_ari_mailboxes              MENUSELECT_RES
+ res_ari_model                  MENUSELECT_RES
+ res_ari_playbacks              MENUSELECT_RES
+ res_ari_recordings             MENUSELECT_RES
+ res_ari_sounds                 MENUSELECT_RES
+ res_calendar                   MENUSELECT_RES
+ res_calendar_caldav            MENUSELECT_RES
+ res_calendar_ews               MENUSELECT_RES
+ res_calendar_exchange          MENUSELECT_RES
+ res_calendar_icalendar         MENUSELECT_RES
+ res_clialiases                 MENUSELECT_RES
+ res_clioriginate               MENUSELECT_RES
+ res_config_curl                MENUSELECT_RES
+ res_config_odbc                MENUSELECT_RES
+ res_config_sqlite3             MENUSELECT_RES
+ res_convert                    MENUSELECT_RES
+ res_crypto                     MENUSELECT_RES
+ res_curl                       MENUSELECT_RES
+ res_fax                        MENUSELECT_RES
+ res_format_attr_celt           MENUSELECT_RES
+ res_format_attr_g729           MENUSELECT_RES
+ res_format_attr_h263           MENUSELECT_RES
+ res_format_attr_h264           MENUSELECT_RES
+ res_format_attr_opus           MENUSELECT_RES
+ res_format_attr_silk           MENUSELECT_RES
+ res_format_attr_siren14        MENUSELECT_RES
+ res_format_attr_siren7         MENUSELECT_RES
+ res_format_attr_vp8            MENUSELECT_RES
+ res_http_post                  MENUSELECT_RES
+ res_http_websocket             MENUSELECT_RES
+ res_limit                      MENUSELECT_RES
+ res_manager_devicestate        MENUSELECT_RES
+ res_manager_presencestate      MENUSELECT_RES
+ res_monitor                    MENUSELECT_RES
+ res_musiconhold                MENUSELECT_RES
+ res_mutestream                 MENUSELECT_RES
- res_mwi_external               MENUSELECT_RES
+ res_mwi_external_ami           MENUSELECT_RES
+ res_odbc                       MENUSELECT_RES
+ res_odbc_transaction           MENUSELECT_RES
+ res_parking                    MENUSELECT_RES
+ res_pjproject                  MENUSELECT_RES
+ res_pjsip                      MENUSELECT_RES
+ res_pjsip_acl                  MENUSELECT_RES
+ res_pjsip_authenticator_digest MENUSELECT_RES
+ res_pjsip_caller_id            MENUSELECT_RES
+ res_pjsip_config_wizard        MENUSELECT_RES
+ res_pjsip_dialog_info_body_gen MENUSELECT_RES
+ res_pjsip_diversion            MENUSELECT_RES
+ res_pjsip_dlg_options          MENUSELECT_RES
+ res_pjsip_dtmf_info            MENUSELECT_RES
+ res_pjsip_empty_info           MENUSELECT_RES
+ res_pjsip_endpoint_identifier_ MENUSELECT_RES
+ res_pjsip_endpoint_identifier_ MENUSELECT_RES
+ res_pjsip_endpoint_identifier_ MENUSELECT_RES
+ res_pjsip_exten_state          MENUSELECT_RES
+ res_pjsip_header_funcs         MENUSELECT_RES
+ res_pjsip_logger               MENUSELECT_RES
+ res_pjsip_messaging            MENUSELECT_RES
+ res_pjsip_mwi                  MENUSELECT_RES
+ res_pjsip_mwi_body_generator   MENUSELECT_RES
+ res_pjsip_nat                  MENUSELECT_RES
+ res_pjsip_notify               MENUSELECT_RES
+ res_pjsip_one_touch_record_inf MENUSELECT_RES
+ res_pjsip_outbound_authenticat MENUSELECT_RES
+ res_pjsip_outbound_publish     MENUSELECT_RES
+ res_pjsip_outbound_registratio MENUSELECT_RES
+ res_pjsip_path                 MENUSELECT_RES
+ res_pjsip_pidf_body_generator  MENUSELECT_RES
+ res_pjsip_pidf_digium_body_sup MENUSELECT_RES
+ res_pjsip_pidf_eyebeam_body_su MENUSELECT_RES
+ res_pjsip_publish_asterisk     MENUSELECT_RES
+ res_pjsip_pubsub               MENUSELECT_RES
+ res_pjsip_refer                MENUSELECT_RES
+ res_pjsip_registrar            MENUSELECT_RES
+ res_pjsip_registrar_expire     MENUSELECT_RES
+ res_pjsip_rfc3326              MENUSELECT_RES
+ res_pjsip_sdp_rtp              MENUSELECT_RES
+ res_pjsip_send_to_voicemail    MENUSELECT_RES
+ res_pjsip_session              MENUSELECT_RES
+ res_pjsip_sips_contact         MENUSELECT_RES
+ res_pjsip_t38                  MENUSELECT_RES
+ res_pjsip_transport_management MENUSELECT_RES
+ res_pjsip_transport_websocket  MENUSELECT_RES
+ res_pjsip_xpidf_body_generator MENUSELECT_RES
+ res_realtime                   MENUSELECT_RES
+ res_rtp_asterisk               MENUSELECT_RES
+ res_rtp_multicast              MENUSELECT_RES
+ res_security_log               MENUSELECT_RES
+ res_smdi                       MENUSELECT_RES
+ res_sorcery_astdb              MENUSELECT_RES
+ res_sorcery_config             MENUSELECT_RES
+ res_sorcery_memory             MENUSELECT_RES
+ res_sorcery_memory_cache       MENUSELECT_RES
+ res_sorcery_realtime           MENUSELECT_RES
+ res_speech                     MENUSELECT_RES
+ res_srtp                       MENUSELECT_RES
+ res_stasis                     MENUSELECT_RES
+ res_stasis_answer              MENUSELECT_RES
+ res_stasis_device_state        MENUSELECT_RES
+ res_stasis_mailbox             MENUSELECT_RES
+ res_stasis_playback            MENUSELECT_RES
+ res_stasis_recording           MENUSELECT_RES
+ res_stasis_snoop               MENUSELECT_RES
+ res_stasis_test                MENUSELECT_RES
+ res_stun_monitor               MENUSELECT_RES
+ res_timing_dahdi               MENUSELECT_RES
+ res_timing_timerfd             MENUSELECT_RES
+ res_xmpp                       MENUSELECT_RES
+ res_ael_share                  MENUSELECT_RES
- res_chan_stats                 MENUSELECT_RES
+ res_config_ldap                MENUSELECT_RES
+ res_config_pgsql               MENUSELECT_RES
+ res_config_sqlite              MENUSELECT_RES
+ res_corosync                   MENUSELECT_RES
- res_endpoint_stats             MENUSELECT_RES
+ res_fax_spandsp                MENUSELECT_RES
+ res_hep                        MENUSELECT_RES
+ res_hep_pjsip                  MENUSELECT_RES
+ res_hep_rtcp                   MENUSELECT_RES
+ res_phoneprov                  MENUSELECT_RES
+ res_pjsip_history              MENUSELECT_RES
+ res_pjsip_phoneprov_provider   MENUSELECT_RES
- res_pktccops                   MENUSELECT_RES
+ res_snmp                       MENUSELECT_RES
+ res_statsd                     MENUSELECT_RES
+ res_timing_kqueue              MENUSELECT_RES
+ res_timing_pthread             MENUSELECT_RES
+ res_digium_phone               MENUSELECT_RES
+ test_abstract_jb               MENUSELECT_TESTS
+ test_acl                       MENUSELECT_TESTS
+ test_amihooks                  MENUSELECT_TESTS
+ test_aoc                       MENUSELECT_TESTS
+ test_app                       MENUSELECT_TESTS
+ test_ari                       MENUSELECT_TESTS
+ test_ari_model                 MENUSELECT_TESTS
+ test_ast_format_str_reduce     MENUSELECT_TESTS
+ test_astobj2                   MENUSELECT_TESTS
+ test_astobj2_thrash            MENUSELECT_TESTS
+ test_bridging                  MENUSELECT_TESTS
+ test_bucket                    MENUSELECT_TESTS
+ test_callerid                  MENUSELECT_TESTS
+ test_cdr                       MENUSELECT_TESTS
+ test_cel                       MENUSELECT_TESTS
+ test_channel_feature_hooks     MENUSELECT_TESTS
+ test_config                    MENUSELECT_TESTS
+ test_core_codec                MENUSELECT_TESTS
+ test_core_format               MENUSELECT_TESTS
+ test_db                        MENUSELECT_TESTS
+ test_devicestate               MENUSELECT_TESTS
+ test_dlinklists                MENUSELECT_TESTS
+ test_endpoints                 MENUSELECT_TESTS
+ test_event                     MENUSELECT_TESTS
+ test_expr                      MENUSELECT_TESTS
+ test_file                      MENUSELECT_TESTS
+ test_format_cache              MENUSELECT_TESTS
+ test_format_cap                MENUSELECT_TESTS
+ test_func_file                 MENUSELECT_TESTS
+ test_gosub                     MENUSELECT_TESTS
+ test_hashtab_thrash            MENUSELECT_TESTS
+ test_heap                      MENUSELECT_TESTS
+ test_jitterbuf                 MENUSELECT_TESTS
+ test_json                      MENUSELECT_TESTS
+ test_linkedlists               MENUSELECT_TESTS
+ test_locale                    MENUSELECT_TESTS
+ test_logger                    MENUSELECT_TESTS
+ test_message                   MENUSELECT_TESTS
+ test_named_lock                MENUSELECT_TESTS
+ test_netsock2                  MENUSELECT_TESTS
+ test_optional_api              MENUSELECT_TESTS
+ test_pbx                       MENUSELECT_TESTS
+ test_poll                      MENUSELECT_TESTS
+ test_res_pjsip_scheduler       MENUSELECT_TESTS
+ test_res_stasis                MENUSELECT_TESTS
+ test_sched                     MENUSELECT_TESTS
+ test_scoped_lock               MENUSELECT_TESTS
+ test_security_events           MENUSELECT_TESTS
+ test_skel                      MENUSELECT_TESTS
+ test_sorcery                   MENUSELECT_TESTS
+ test_sorcery_astdb             MENUSELECT_TESTS
+ test_sorcery_memory_cache_thra MENUSELECT_TESTS
+ test_sorcery_realtime          MENUSELECT_TESTS
+ test_stasis                    MENUSELECT_TESTS
+ test_stasis_channels           MENUSELECT_TESTS
+ test_stasis_endpoints          MENUSELECT_TESTS
+ test_stringfields              MENUSELECT_TESTS
+ test_strings                   MENUSELECT_TESTS
+ test_substitution              MENUSELECT_TESTS
+ test_taskprocessor             MENUSELECT_TESTS
+ test_threadpool                MENUSELECT_TESTS
+ test_time                      MENUSELECT_TESTS
+ test_uri                       MENUSELECT_TESTS
+ test_utils                     MENUSELECT_TESTS
+ test_uuid                      MENUSELECT_TESTS
+ test_vector                    MENUSELECT_TESTS
+ test_voicemail_api             MENUSELECT_TESTS
+ test_websocket_client          MENUSELECT_TESTS
+ test_xml_escape                MENUSELECT_TESTS
- DONT_OPTIMIZE                  MENUSELECT_CFLAGS
- COMPILE_DOUBLE                 MENUSELECT_CFLAGS
- DEBUG_THREADS                  MENUSELECT_CFLAGS
- DEBUG_FD_LEAKS                 MENUSELECT_CFLAGS
- BETTER_BACKTRACES              MENUSELECT_CFLAGS
- LOTS_OF_SPANS                  MENUSELECT_CFLAGS
- MALLOC_DEBUG                   MENUSELECT_CFLAGS
- DEBUG_CHAOS                    MENUSELECT_CFLAGS
+ BUILD_NATIVE                   MENUSELECT_CFLAGS
- REF_DEBUG                      MENUSELECT_CFLAGS
- AO2_DEBUG                      MENUSELECT_CFLAGS
- STATIC_BUILD                   MENUSELECT_CFLAGS
- REBUILD_PARSERS                MENUSELECT_CFLAGS
- LOW_MEMORY                     MENUSELECT_CFLAGS
- DISABLE_INLINE                 MENUSELECT_CFLAGS
+ OPTIONAL_API                   MENUSELECT_CFLAGS
- USE_HOARD_ALLOCATOR            MENUSELECT_CFLAGS
- RADIO_RELAX                    MENUSELECT_CFLAGS
- G711_NEW_ALGORITHM             MENUSELECT_CFLAGS
- G711_REDUCED_BRANCHING         MENUSELECT_CFLAGS
- TEST_CODING_TABLES             MENUSELECT_CFLAGS
- TEST_TANDEM_TRANSCODING        MENUSELECT_CFLAGS
- ADDRESS_SANITIZER              MENUSELECT_CFLAGS
- THREAD_SANITIZER               MENUSELECT_CFLAGS
- LEAK_SANITIZER                 MENUSELECT_CFLAGS
- UNDEFINED_SANITIZER            MENUSELECT_CFLAGS
- BUSYDETECT_TONEONLY            MENUSELECT_CFLAGS
- BUSYDETECT_COMPARE_TONE_AND_SI MENUSELECT_CFLAGS
- BUSYDETECT_DEBUG               MENUSELECT_CFLAGS
- INTEGER_CALLERID               MENUSELECT_CFLAGS
+ FILE_STORAGE                   MENUSELECT_OPTS_app_voicemail
- ODBC_STORAGE                   MENUSELECT_OPTS_app_voicemail
- IMAP_STORAGE                   MENUSELECT_OPTS_app_voicemail
+ astcanary                      MENUSELECT_UTILS
+ astdb2sqlite3                  MENUSELECT_UTILS
+ astdb2bdb                      MENUSELECT_UTILS
- aelparse                       MENUSELECT_UTILS
- astman                         MENUSELECT_UTILS
- check_expr                     MENUSELECT_UTILS
- check_expr2                    MENUSELECT_UTILS
- conf2ael                       MENUSELECT_UTILS
- muted                          MENUSELECT_UTILS
- smsq                           MENUSELECT_UTILS
- stereorize                     MENUSELECT_UTILS
- streamplayer                   MENUSELECT_UTILS
- agi-test.agi                   MENUSELECT_AGIS
- eagi-test                      MENUSELECT_AGIS
- eagi-sphinx-test               MENUSELECT_AGIS
- jukebox.agi                    MENUSELECT_AGIS
- CORE-SOUNDS-EN-WAV             MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN-ULAW            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN-ALAW            MENUSELECT_CORE_SOUNDS
+ CORE-SOUNDS-EN-GSM             MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN-G729            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN-G722            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN-SLN16           MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN-SIREN7          MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN-SIREN14         MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN_AU-WAV          MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN_AU-ULAW         MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN_AU-ALAW         MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN_AU-GSM          MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN_AU-G729         MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN_AU-G722         MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN_AU-SLN16        MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN_AU-SIREN7       MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN_AU-SIREN14      MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN_GB-WAV          MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN_GB-ULAW         MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN_GB-ALAW         MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN_GB-GSM          MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN_GB-G729         MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN_GB-G722         MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN_GB-SLN16        MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN_GB-SIREN7       MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-EN_GB-SIREN14      MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-ES-WAV             MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-ES-ULAW            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-ES-ALAW            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-ES-GSM             MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-ES-G729            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-ES-G722            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-ES-SLN16           MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-ES-SIREN7          MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-ES-SIREN14         MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-FR-WAV             MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-FR-ULAW            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-FR-ALAW            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-FR-GSM             MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-FR-G729            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-FR-G722            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-FR-SLN16           MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-FR-SIREN7          MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-FR-SIREN14         MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-IT-WAV             MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-IT-ULAW            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-IT-ALAW            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-IT-GSM             MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-IT-G729            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-IT-G722            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-IT-SLN16           MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-IT-SIREN7          MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-IT-SIREN14         MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-RU-WAV             MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-RU-ULAW            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-RU-ALAW            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-RU-GSM             MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-RU-G729            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-RU-G722            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-RU-SLN16           MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-RU-SIREN7          MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-RU-SIREN14         MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-JA-WAV             MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-JA-ULAW            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-JA-ALAW            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-JA-GSM             MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-JA-G729            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-JA-G722            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-JA-SLN16           MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-JA-SIREN7          MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-JA-SIREN14         MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-SV-WAV             MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-SV-ULAW            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-SV-ALAW            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-SV-GSM             MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-SV-G729            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-SV-G722            MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-SV-SLN16           MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-SV-SIREN7          MENUSELECT_CORE_SOUNDS
- CORE-SOUNDS-SV-SIREN14         MENUSELECT_CORE_SOUNDS
+ MOH-OPSOUND-WAV                MENUSELECT_MOH
- MOH-OPSOUND-ULAW               MENUSELECT_MOH
- MOH-OPSOUND-ALAW               MENUSELECT_MOH
- MOH-OPSOUND-GSM                MENUSELECT_MOH
- MOH-OPSOUND-G729               MENUSELECT_MOH
- MOH-OPSOUND-G722               MENUSELECT_MOH
- MOH-OPSOUND-SLN16              MENUSELECT_MOH
- MOH-OPSOUND-SIREN7             MENUSELECT_MOH
- MOH-OPSOUND-SIREN14            MENUSELECT_MOH
- EXTRA-SOUNDS-EN-WAV            MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-EN-ULAW           MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-EN-ALAW           MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-EN-GSM            MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-EN-G729           MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-EN-G722           MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-EN-SLN16          MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-EN-SIREN7         MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-EN-SIREN14        MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-EN_GB-WAV         MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-EN_GB-ULAW        MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-EN_GB-ALAW        MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-EN_GB-GSM         MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-EN_GB-G729        MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-EN_GB-G722        MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-EN_GB-SLN16       MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-EN_GB-SIREN7      MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-EN_GB-SIREN14     MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-FR-WAV            MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-FR-ULAW           MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-FR-ALAW           MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-FR-GSM            MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-FR-G729           MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-FR-G722           MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-FR-SLN16          MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-FR-SIREN7         MENUSELECT_EXTRA_SOUNDS
- EXTRA-SOUNDS-FR-SIREN14        MENUSELECT_EXTRA_SOUNDS
```

