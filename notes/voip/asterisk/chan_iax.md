---
title: chan_iax
---

# chan_iax

- IAX - Inter-Asterisk-eXchange
  - 单 TCP 支持多线路
  - 早期用于客服 NAT 问题
  - 2015 年 后相关开发较少
  - 默认端口 4569/udp
  - AES-128
  - [rfc5456](https://datatracker.ietf.org/doc/html/rfc5456)
    IAX: Inter-Asterisk eXchange Version 2
- [Why IAX2?](https://wiki.asterisk.org/wiki/pages/viewpage.action?pageId=4817138)
  - NAT
  - High performance, low overhead protocol
    - 4 bytes overhead
  - Internationalization - 传输包含语言信息
  - Remote dialplan polling
  - Flexible authentication
  - Multimedia protocol
  - Call statistic gathering
  - Call parameter communication
  - Single socket design
- 参考
  - [Is IAX2 still best trunk type for Internal Calling between FreePBX Systems?](https://community.freepbx.org/t/is-iax2-still-best-trunk-type-for-internal-calling-between-freepbx-systems-specifically-related-to-encryption/61907/7)
- 出局 `IAX2/[<user>[:<secret>]@]<peer>[:<port_number>][/<extension>[@<context>][/<option>]]`
- 入局 `IAX2/[[<username>@]<host>]/<call_number>`

:::tip

- 和老设备交互不能直连的时候可以考虑 IAX
- 容器部署，提供 webrtc，对接上游线路可以考虑 IAX

:::

```conf
load => chan_iax2
; trunk 需要 timing interface
load => res_timing_timerfd
```

## iax.conf

- type=user
  - 服务端定义 - 接受客户端 - 接受呼叫
- type=peer
  - 客户端定义 - 注册到对方 - 发起呼叫
  - 如果 host 为 dynamic 则需要 register 注册
- type=friend
  - 创建 user+peer
  - 如果设置了 host=hostname,domain.ext 则会限定可发起请求的 peer

```bash
iax2 reload
```

### general

```conf
[general]
; 配置需要在 bindaddr 之前
bindport=4569

; 默认监听所有
; 也可以包含端口 192.168.0.1:4569
;bindaddr=192.168.0.1

; 独立线程处理 IAX2 DPREQ - 一定的性能换取更好的延时
; 默认 block 处理
; iaxcompat=yes

; UDP checksum
;nochecksums=yes

; 避免密码爆破 - 延迟 reject
;delayreject=yes


; 全局 iaxtel AMA flag - 生成 cdr 会用到
; default, omit, billing, documentation
;amaflags=billing

; ADSI/Analog Display Services Interface 兼容 CPE 设备
;adsi=yes

; 呼出时查询 SRV
;srvlookup=yes

; 默认 CDR 账号
;accountcode=lss0101

; 默认语言代码
;language=en

; This option specifies a preference for which music-on-hold class this channel
; should listen to when put on hold if the music class has not been set on the
; channel with Set(CHANNEL(musicclass)=whatever) in the dialplan, and the peer
; channel putting this one on hold did not suggest a music class.
;
; If this option is set to "passthrough", then the hold message will always be
; passed through as signalling instead of generating hold music locally.
;
; This option may be specified globally, or on a per-user or per-peer basis.
;
; Accepted values: passthrough, or any music-on-hold class name
; Default value:   <empty>
;
;mohinterpret=default
;

;
; The 'mohsuggest' option specifies which music on hold class to suggest to the
; peer channel when this channel places the peer on hold. It may be specified
; globally or on a per-user or per-peer basis.
;
;mohsuggest=default
;

; 带宽情况
; low, medium, high
bandwidth=low

; 编码配置
;allow=all
;disallow=g723.1
disallow=lpc10
;allow=gsm


; Jitter Buffer/抖动缓冲器
; ======================
;
; You can adjust several parameters relating to the jitter buffer.  The jitter
; buffer's function is to compensate for varying network delay.
;
; All of the jitter buffer settings are in milliseconds.  The jitter buffer
; works for INCOMING audio only - the outbound audio will be dejittered by the
; jitter buffer at the other end.
;
; jitterbuffer=yes|no: global default as to whether you want
; the jitter buffer at all.
;
; maxjitterbuffer: a maximum size for the jitter buffer.
; Setting a reasonable maximum here will prevent the call delay
; from rising to silly values in extreme situations; you'll hear
; SOMETHING, even though it will be jittery.
;
; resyncthreshold: when the jitterbuffer notices a significant change in delay
; that continues over a few frames, it will resync, assuming that the change in
; delay was caused by a timestamping mix-up. The threshold for noticing a
; change in delay is measured as twice the measured jitter plus this resync
; threshold.
; Resyncing can be disabled by setting this parameter to -1.
;
; maxjitterinterps: the maximum number of interpolation frames the jitterbuffer
; should return in a row. Since some clients do not send CNG/DTX frames to
; indicate silence, the jitterbuffer will assume silence has begun after
; returning this many interpolations. This prevents interpolating throughout
; a long silence.
;
; jittertargetextra: number of milliseconds by which the new jitter buffer
; will pad its size. the default is 40, so without modification, the new
; jitter buffer will set its size to the jitter value plus 40 milliseconds.
; increasing this value may help if your network normally has low jitter,
; but occasionally has spikes.
;

jitterbuffer=no
;maxjitterbuffer=1000
;maxjitterinterps=10
;resyncthreshold=1000
;jittertargetextra=40


; IAX2 Encryption
; ===============
; 开启加密
;encryption=yes

; 强制加密 - 隐含 encryption=yes
;forceencryption=yes

; IAX2 trunk 最大 payload - 单位 byte
; 例如 最大800通话， 20ms 每 frame，使用 ulaw
;
;     (8000hz / 1000ms) * 20ms * 1 byte per sample = 160 bytes per frame
;
; 最大带宽为:
;
;     (160 bytes per frame) * (800 calls) = 128000 bytes
;
; 超过限制呼叫可能会被忽略
; 默认 128000 - 128k
; trunkmaxsize = 128000

; 流量大的时候由系统处理 udp 分片可能影响通话质量
; 设置 mtu 避免系统处理 udp 分片 - 设置为 0 则由系统处理
; trunkmtu = 1240

; 消息发送频率 - 单位 ms 默认 20ms，接受 10ms - 1000ms
; 如果消息达到了 trunkmtu 也会发送
; trunkfreq=20

; Should we send timestamps for the individual sub-frames within trunk frames?
; There is a small bandwidth use for these (less than 1kbps/call), but they
; ensure that frame timestamps get sent end-to-end properly.  If both ends of
; all your trunks go directly to TDM, _and_ your trunkfreq equals the frame
; length for your codecs, you can probably suppress these.  The receiver must
; also support this feature, although they do not also need to have it enabled.
;
; trunktimestamps=yes

; 注册间隔 - 单位 秒
; minregexpire = 60
; maxregexpire = 60

; IAX2 helper threads

; Establishes the number of iax helper threads to handle I/O.
; iaxthreadcount = 10

; Establishes the number of extra dynamic threads that may be spawned to handle I/O
; iaxmaxthreadcount = 100

; 注册到另外一个 IAX2 服务器 - 发现 IP
;
;register => marko:secretpass@tormenta.linux-support.net
;
; 无密码
;
;register => joe@remotehost:5656
;
; RSA key 注册
;
;register => marko:[torkey]@tormenta.linux-support.net
;
; Sample Registration for iaxtel
;
; Visit http://www.iaxtel.com to register with iaxtel.  Replace "user"
; and "pass" with your username and password for iaxtel.  Incoming
; calls arrive at the "s" extension of "default" context.
;
;register => user:pass@iaxtel.com
;
; Sample Registration for IAX2 + FWD
;
; To register using IAX2 with FWD, it must be enabled by visiting the URL
; http://www.fwdnet.net/index.php?section_id=112
;
; Note that you need an extension in you default context which matches
; your free world dialup number.  Please replace "FWDNumber" with your
; FWD number and "passwd" with your password.
;
;register => FWDNumber:passwd@iax.fwdnet.net


; 开启 res_stun_monitor 模块后可订阅网络变化，网络变化后重新注册
; 默认开启
; subscribe_network_change_event = yes

; 开启认证调试日志
;authdebug = yes
;
; See https://wiki.asterisk.org/wiki/display/AST/IP+Quality+of+Service for a description of these parameters.
;tos=ef
;cos=5

; 设置后会动态创建 NoOp extension
; & 分隔指定多个
;regcontext=iaxregistrations

; NEW 后 2000ms 未响应 ACK 则 自动 kill - 避免异常导致卡死
; 也可以直接指定 时间 - 单位 ms
; 单个 peer 使用 qualify 控制
autokill=yes

; 编码协商逻辑 - 默认 host
; caller - 优先 caller 定义的编码
; host - host 定义的编码
; disabled
; reqonly - 类似 disabled，但如果编码不支持可以请求新的编码
;codecpriority=host
;
; allowfwdownload controls whether this host will serve out firmware to
; IAX2 clients which request it.  This has only been used for the IAXy,
; and it has been recently proven that this firmware distribution method
; can be used as a source of traffic amplification attacks.  Also, the
; IAXy firmware has not been updated for at least 18 months, so unless
; you are provisioning IAXys in a secure network, we recommend that you
; leave this option to the default, off.
; IAXy 相关
;allowfwdownload=yes

;rtcachefriends=yes ; Cache realtime friends by adding them to the internal list
                    ; just like friends added from the config file only on a
                    ; as-needed basis? (yes|no)

;rtsavesysname=yes  ; Save systemname in realtime database at registration
                    ; Default = no

;rtupdate=yes       ; Send registry updates to database using realtime? (yes|no)
                    ; If set to yes, when a IAX2 peer registers successfully,
                    ; the IP address, the origination port, the registration period,
                    ; and the username of the peer will be set to database via realtime.
                    ; If not present, defaults to 'yes'.

;rtautoclear=yes    ; Auto-Expire friends created on the fly on the same schedule
                    ; as if it had just registered? (yes|no|<seconds>)
                    ; If set to yes, when the registration expires, the friend will
                    ; vanish from the configuration until requested again.
                    ; If set to an integer, friends expire within this number of
                    ; seconds instead of the registration interval.

;rtignoreregexpire=yes ; When reading a peer from Realtime, if the peer's registration
                       ; has expired based on its registration interval, used the stored
                       ; address information regardless. (yes|no)

;parkinglot=edvina     ; Default parkinglot for IAX2 peers and users
                       ; This can also be configured per device
                       ; Parkinglots are defined in features.conf

;
; The following two options are used to disable call token validation for the
; purposes of interoperability with IAX2 endpoints that do not yet support it.
;
; Call token validation can be set as optional for a single IP address or IP
; address range by using the 'calltokenoptional' option. 'calltokenoptional' is
; only a global option.
;
;calltokenoptional=209.16.236.73/255.255.255.0

; 设置为 no 则不需要验证 call token - 在定义 peer/user/friend 时使用
; 默认 yes
;requirecalltoken=no
; 最大 call token 认证握手时间 -  单位 秒
;calltokenexpiration=10

; 每个远程 IP 允许的拨号数量 - 超过不再建立新链接
;maxcallnumbers=512
; 该限制不区分 IP - 计算未验证 call token 的数量
; 默认 8192
;maxcallnumbers_nonvalidated=1024

; 根据 IP 限定呼叫数量
;[callnumberlimits]
; 范围内独立 IP 限制而不是 IP 段总数
;10.1.1.0/255.255.255.0 = 24
;10.1.2.0/255.255.255.0 = 32

; 移除 '(', ' ', ')', non-trailing '.', and '-' not in square brackets
; 例如 555.5555 -> 5555555
; 默认 开启
;shrinkcallerid=yes     ; on by default
```

### user/peer
- register 映射 peer - 动态 IP 场景
  - 反向注册到对方，而不是对方通过 peer 定义链接
- 用户认证方式 - username+secret
- 密钥方式
  - plaintext
  - md5
  - rsa
    - inkeys - 接受的 pubkey - `/var/lib/asterisk/keys/<name>.pub`
      - `:` 分割
    - outkey - 发起请求的 key - `/var/lib/asterisk/keys/<name>.key`
      - 3DES encrypted
- 访问控制 - permit,deny,acl

```conf
; guest 配置未认证连接请求 - 可配置 secret
[guest]
type=user
context=public
callerid="Guest IAX User"

; 用户配置
;[markster]
;type=user
;context=default
;context=local
;auth=md5,plaintext,rsa
; 可写多行 secret 实现多密码
;secret=markpasswd
;setvar=ATTENDED_TRANSFER_COMPLETE_SOUND=beep   ; This channel variable will
                                                ; cause the given audio file to
                                                ; be played upon completion of
                                                ; an attended transfer to the
                                                ; target of the transfer.
;dbsecret=mysecrets/place    ; Secrets can be stored in astdb, too
;transfer=no                 ; Disable IAX2 native transfer
;transfer=mediaonly          ; When doing IAX2 native transfers, transfer only
                             ; the media stream
;jitterbuffer=yes            ; Override the global setting and enable the jitter
                             ; buffer for this user
;maxauthreq=10               ; Set the maximum number of outstanding AUTHREQs
                             ; waiting for replies. If this limit is reached,
                             ; any further authentication will be blocked, until
                             ; the pending requests expire or a reply is
                             ; received.
; 覆盖 CallerID
;callerid="Mark Spencer" <(256) 428-6275>
;deny=0.0.0.0/0.0.0.0
;permit=209.16.236.73/255.255.255.0
;accountcode=markster0101
;language=en                 ; Use english as default language
;encryption=yes              ; 开启加密
;keyrotate=off               ; 默认开启 - 旧版本不知支持 - IAX_COMMAND_RTENC

;
; 定义远程节点 peer
;
;[demo]
;type=peer
;username=asterisk
;secret=supersecret
; 主机
;host=192.168.10.10
; iax2 show peers 描述
;description=My IAX2 Peer
;sendani=no
;host=asterisk.linux-support.net
;port=5036
;mask=255.255.255.255
;qualify=yes                ; Make sure this peer is alive.
;qualifysmoothing = yes     ; Use an average of the last two PONG results to
                            ; reduce falsely detected LAGGED hosts.  The default
                            ; is 'no.'
;qualifyfreqok = 60000      ; OK 状态 PING 间隔 - 单位 ms
;qualifyfreqnotok = 10000   ; 非 OK（LAGGED/UNAVAILABLE） 状态 PING 间隔 - 单位 ms
;jitterbuffer=no            ; Turn off jitter buffer for this peer
;
;encryption=yes             ; 默认不开启
;keyrotate=off              ; 默认不开启

; Peers can remotely register as well, so that they can be mobile.  Default
; IPs can also optionally be given but are not required.  Caller*ID can be
; suggested to the other side as well if it is for example a phone instead of
; another PBX.
; yes - 发送接受 connected line
; send - 只发送
; receive
; no - Asterisk v1.4 peer 需要设置 no
; 不兼容表现为通话异常中断
;connectedline=yes


;[dynamichost]
;host=dynamic
;secret=mysecret
; Note: app_voicemail mailboxes must be in the form of mailbox@context.
;mailbox=1234		; Notify about mailbox 1234
;inkeys=key1:key2
;peercontext=local	; Default context to request for calls to peer
;defaultip=216.207.245.34
;callerid="Some Host" <(256) 428-6011>

;[biggateway]
;type=peer
;host=192.168.0.1
;description=Gateway to PSTN
;context=*
;secret=myscret
;trunk=yes			; Use IAX2 trunking with this host
;timezone=America/New_York	; Set a timezone for the date/time IE

;
; Friends are a shortcut for creating a user and a peer with the same values.
;

;[marko]
;type=friend
;host=dynamic
;regexten=1234
;secret=moofoo   ; Multiple secrets may be specified. For a "user", all
;secret=foomoo   ; specified entries will be accepted as valid. For a "peer",
;secret=shazbot  ; only the last specified secret will be used.
;context=default
;permit=0.0.0.0/0.0.0.0
;acl=example_named_acl

;
; With immediate=yes, an IAX2 phone or a phone on an IAXy acts as a hot-line
; which goes immediately to the s extension when picked up.  Useful for
; elevator phones, manual service, or other similar applications.
;
;[manual]
;type=friend
;host=dynamic
;immediate=yes  ; go immediately to s extension when picked up
;secret=moofoo	; when immediate=yes is specified, secret is required
;context=number-please ; we start at the s extension in this context
;

; Trust Caller*ID Coming from iaxtel.com
[iaxtel]
type=user
context=default
auth=rsa
inkeys=iaxtel

; Trust Caller*ID Coming from iax.fwdnet.net
[iaxfwd]
type=user
context=default
auth=rsa
inkeys=freeworlddialup

; Trust Caller*ID delivered over DUNDi/e164
;[dundi]
;type=user
;dbsecret=dundi/secret
;context=dundi-e164-local
```

# FAQ

## Unable to support trunking on peer without a timing interface

加载一个 timing interface 实现

- res_timing_timerfd
- res_timing_pthread
- res_timing_dahdi
- res_timing_kqueue

```bash
module load res_timing_timerfd
```

# FAQ

## IAX2 Trunk

- 互相 register
- 互相添加 friend
- 可以通过 deny+permit 来提高安全性

**A/iax.conf**

```
[general]
register => B:B@192.168.1.2

[B]
type=friend
host=dynamic
trunk=yes
secret=B
context=iaxinbound
```

**B/iax.conf**

```
[general]
register => A:A@192.168.1.2

[A]
type=friend
host=dynamic
trunk=yes
secret=A
context=iaxinbound
```
