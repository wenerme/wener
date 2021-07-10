---
title: Asterisk WebRTC
---

# Asterisk WebRTC

- client
  - [versatica/JsSIP](https://github.com/versatica/JsSIP)
  - [onsip/SIP.js](https://github.com/onsip/SIP.js)
  - [DoubangoTelecom/sipml5](https://github.com/DoubangoTelecom/sipml5)
    - MIT
    - 最早, 不活跃, 最后提交 2018 年
- 参考
  - [Configuring res_pjsip to work through NAT](https://wiki.asterisk.org/wiki/display/AST/Configuring+res_pjsip+to+work+through+NAT)
  - [Configuring Asterisk for WebRTC Clients](https://wiki.asterisk.org/wiki/display/AST/Configuring+Asterisk+for+WebRTC+Clients)

```conf
; webrtc
load => res_crypto
load => res_http_websocket
load => res_pjsip_transport_websocket
load => res_srtp
load => codec_opus_open_source
load => res_format_attr_opus
```

```bash
# 开启 pjsip 日志
pjsip set logger on
```

## rtp.conf

```conf
[general]
; RTP 开始结束端口
; 例如 10000-20000
rtpstart=5000
rtpend=31000

; RTP checksum
;rtpchecksums=no

; DTMF digit with no 'end' marker 连续时间 (in 'samples', 1/8000 of a second)
;dtmftimeout=3000
; rtcp reports 间隔 - 单位 ms
; min 500, max 60000
rtcpinterval = 5000

; 启用严格 RTP 保护
; 丢弃 RTP 流中未知来源的 RTP 包
; 在建立连接前和处理连接中都会校验来源 (e.g., transfers and direct media)
;
; Initial connection and renegotiation starts a learning mode to qualify
; stream source addresses.  Once Asterisk has recognized a stream it will
; allow other streams to qualify and replace the current stream for 5
; seconds after starting learning mode.  Once learning mode completes the
; current stream is locked in and cannot change until the next
; renegotiation.
; Valid options are "no" to disable strictrtp, "yes" to enable strictrtp,
; and "seqno", which does the same thing as strictrtp=yes, but only checks
; to make sure the sequence number is correct rather than checking the time
; interval as well.
; This option is enabled by default.
strictrtp=yes

; Number of packets containing consecutive sequence values needed
; to change the RTP source socket address. This option only comes
; into play while using strictrtp=yes. Consider changing this value
; if rtp packets are dropped from one or both ends after a call is
; connected. This option is set to 4 by default.
; probation=8
;
; Enable sRTP replay protection. Buggy SIP user agents (UAs) reset the
; sequence number (RTP-SEQ) on a re-INVITE, for example, with Session Timers
; or on Call Hold/Resume, but keep the synchronization source (RTP-SSRC). If
; the new RTP-SEQ is higher than the previous one, the call continues if the
; roll-over counter (sRTP-ROC) is zero (the call lasted less than 22 minutes).
; In all other cases, the call faces one-way audio or even no audio at all.
; "replay check failed (index too old)" gets printed continuously. This is a
; software bug. You have to report this to the creator of that UA. Until it is
; fixed, you could disable sRTP replay protection (see RFC 3711 section 3.3.2).
; This option is enabled by default.
; srtpreplayprotection=yes
;
; 启用 ICE 支持
icesupport=true

; STUN 地址，默认端口 3478
; stunaddr=
;
; Some multihomed servers have IP interfaces that cannot reach the STUN
; server specified by stunaddr.  Blacklist those interface subnets from
; trying to send a STUN packet to find the external IP address.
; Attempting to send the STUN packet needlessly delays processing incoming
; and outgoing SIP INVITEs because we will wait for a response that can
; never come until we give up on the response.
; * Multiple subnets may be listed.
; * Blacklisting applies to IPv4 only.  STUN isn't needed for IPv6.
; * Blacklisting applies when binding RTP to specific IP addresses and not
; the wildcard 0.0.0.0 address.  e.g., A PJSIP endpoint binding RTP to a
; specific address using the bind_rtp_to_media_address and media_address
; options.  Or the PJSIP endpoint specifies an explicit transport that binds
; to a specific IP address.  Blacklisting is done via ACL infrastructure
; so it's possible to whitelist as well.
;
; stun_acl = named_acl
; stun_deny = 0.0.0.0/0
; stun_permit = 1.2.3.4/32
; stun_deny 别名
; stun_blacklist=

; TURN 服务，默认端口 3478
; turnaddr=
; TURN relay 用户名
; turnusername=
; TURN relay 密钥
; turnpassword=


; 控制 ICE 发现地址的 ACL - srflx and relay discovery
; 可列多个，默认所有都接受
; ice_acl = named_acl
; ice_deny = 0.0.0.0/0
; ice_permit = 1.2.3.4/32
; ice_deny 别名
; ice_blacklist =

; DTLS 包分片 MTU - 最低 256
dtls_mtu = 1200

[ice_host_candidates]
;
; When Asterisk is behind a static one-to-one NAT and ICE is in use, ICE will
; expose the server's internal IP address as one of the host candidates.
; Although using STUN (see the 'stunaddr' configuration option) will provide a
; publicly accessible IP, the internal IP will still be sent to the remote
; peer. To help hide the topology of your internal network, you can override
; the host candidates that Asterisk will send to the remote peer.
;
; IMPORTANT: Only use this functionality when your Asterisk server is behind a
; one-to-one NAT and you know what you're doing. If you do define anything
; here, you almost certainly will NOT want to specify 'stunaddr' or 'turnaddr'
; above.
;
; The format for these overrides is:
;
;    <local address> => <advertised address>,[include_local_address]
;
; The following will replace 192.168.1.10 with 1.2.3.4 during ICE
; negotiation:
;
;192.168.1.10 => 1.2.3.4
;
; The following will include BOTH 192.168.1.10 and 1.2.3.4 during ICE
; negotiation instead of replacing 192.168.1.10.  This can make it easier
; to serve both local and remote clients.
;
;192.168.1.10 => 1.2.3.4,include_local_address
;
; You can define an override for more than 1 interface if you have a multihomed
; server. Any local interface that is not matched will be passed through
; unaltered. Both IPv4 and IPv6 addresses are supported.

```

## res_stun_monitor.conf

```bash
stun set debug on
```

```conf
;
; Configuration file for the res_stun_monitor module
;
; The res_stun_monitor module sends STUN requests to a configured STUN server
; periodically.  If the monitor detects a change in the external IP address or port
; provided by the STUN server an event is sent out internally within Asterisk
; to alert all listeners to that event of the change.

; The current default listeners for the network change event include chan_sip
; and chan_iax.  Both of these channel drivers by default react to this event
; by renewing all outbound registrations.  This allows the endpoints Asterisk
; is registering with to become aware of the address change and know the new
; location.
;
[general]
;
; ---- STUN Server configuration ---
;  Setting the 'stunaddr' option to a valid address enables the STUN monitor.
;
;stunaddr = mystunserver.com    ; Address of the STUN server to query.
                                ; Valid form:
                                ;   [(hostname | IP-address) [':' port]]
                                ; The port defaults to the standard STUN port (3478).
                                ; Set to an empty value to disable STUN monitoring.
                                ;   Default is disabled.
;stunrefresh = 30               ; Number of seconds between STUN refreshes.
                                ;   Default is 30.
```

# FAQ

## Shutting down transport 'WSS to 172.17.0.1:57434' since no request was received in 32 seconds

- asterisk 16.2.2 修复

## Couldn't negotiate stream 0:audio-0:audio:sendrecv (nothing)

检查编码和加密问题

## No translator path: (starting codec is not valid)

加载 opus, 确保转换路径

```conf
load => codec_opus_open_source
load => res_format_attr_opus
```

```bash
core show translation paths opus
```

from opus:48000 to

| to            | path                                       |
| ------------- | ------------------------------------------ |
| amr:8000      | No Translation Path                        |
| amrwb:16000   | No Translation Path                        |
| codec2:8000   | No Translation Path                        |
| g723:8000     | No Translation Path                        |
| ulaw:8000     | (opus@48000)->(slin@8000)->(ulaw@8000)     |
| alaw:8000     | (opus@48000)->(slin@8000)->(alaw@8000)     |
| gsm:8000      | (opus@48000)->(slin@8000)->(gsm@8000)      |
| g726:8000     | (opus@48000)->(slin@8000)->(g726@8000)     |
| g726aal2:8000 | (opus@48000)->(slin@8000)->(g726aal2@8000) |
| adpcm:8000    | (opus@48000)->(slin@8000)->(adpcm@8000)    |
| slin:8000     | (opus@48000)->(slin@8000)                  |
| slin:12000    | (opus@48000)->(slin@12000)                 |
| slin:16000    | (opus@48000)->(slin@16000)                 |
| slin:24000    | (opus@48000)->(slin@24000)                 |
| slin:32000    | (opus@48000)->(slin@24000)->(slin@32000)   |
| slin:44100    | (opus@48000)->(slin@24000)->(slin@44100)   |
| slin:48000    | (opus@48000)->(slin@48000)                 |
| slin:96000    | (opus@48000)->(slin@48000)->(slin@96000)   |
| slin:192000   | (opus@48000)->(slin@48000)->(slin@192000)  |
| lpc10:8000    | (opus@48000)->(slin@8000)->(lpc10@8000)    |
| g729:8000     | No Translation Path                        |
| speex:8000    | No Translation Path                        |
| speex:16000   | No Translation Path                        |
| speex:32000   | No Translation Path                        |
| ilbc:8000     | No Translation Path                        |
| g722:16000    | (opus@48000)->(slin@16000)->(g722@16000)   |
| siren7:16000  | No Translation Path                        |
| siren14:32000 | No Translation Path                        |
| testlaw:8000  | (opus@48000)->(slin@8000)->(testlaw@8000)  |
| g719:48000    | No Translation Path                        |
| none:8000     | No Translation Path                        |
| silk:8000     | No Translation Path                        |
| silk:12000    | No Translation Path                        |
| silk:16000    | No Translation Path                        |
| silk:24000    | No Translation Path                        |
