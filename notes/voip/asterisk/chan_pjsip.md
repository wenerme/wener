---
title: chan_pjsip
---

# chan_pjsip

- 基于 pjproject 实现的 sip 通道
- pjsip 功能很多，因此有很多的 res_pjsip，也有很多配置项

```bash
# 所有 pjproject 相关模块
ls /usr/lib/asterisk/modules | grep pj | sort
```

| type          | meaning                 | desc                             |
| ------------- | ----------------------- | -------------------------------- |
| acl           | Access Control List     | res_pjsip_acl, acl.conf 引用     |
| aor           | Address of Record       |
| auth          | Authentication          |
| contact       |
| domain_alias  | Domain Alias            | 域名别名                         |
| endpoint      |
| identify      | Endpoint Identification | host to endpoint                 |
| phoneprov     | Phone Provisioning      | res_phoneprov                    |
| registration  |                         | outbound SIP                     |
| resource_list | Resource lists          |
| transport     |                         | udp,tcp,tls,ws,wss,flow          |
| wizard        |                         | 聚合配置,res_pjsip_config_wizard |

- 匹配规则
  - From in inbound SIP -> endpoint
  - To in inbound SIP REGISTER -> aor
  - IP 地址匹配
- endpoint
  - -0..1-> auth
  - -1..N-> transport
  - -N-> aor
    - 实际地址信息
    - 关联 MWI
    - -N-> contact
- registration
  - 注册到外部服务 - 相当于 Trunk
  - -0..1-> auth
  - -1..N-> transport
- auth - 由 endpoint 和 registration 使用
- identify
  - -0..1-> endpoint
  - match
  - res_pjsip_endpoint_identifier_ip
- acl
- domain_alias
- resource_list - 资源列表订阅 - SIP 设备订阅 SIP 服务端提供的资源
  - Asterisk 13+
  - RFC 4662
  - 不使用 resource_list 则是每个端直接订阅状态 - `N*(N-1)` - 服务端压力非常大
  - resource_list 将多个 客户端或 resouece_list 状态聚合为一组
  - 例如 销售组一个订阅、服务组一个订阅

## pjsip_wizard.conf

- 聚合配置 endpoint, aor, auth, identify, registration, phoneprov

```ini
[user](!)
type = wizard
accepts_registrations = yes
accepts_auth = yes
endpoint/context = default
endpoint/allow = !all,ulaw,gsm,g722
aor/max_contacts=5

[6001](user)
inbound_auth/username = 6001
inbound_auth/password = 6001

[trunk](!)
type = wizard
sends_registrations = yes
sends_auth = yes
remote_hosts=192.168.1.1
endpoint/context = default
endpoint/allow = !all,ulaw,gsm,g722
aor/max_contacts=5

[trunk-6003](trunk)
outbound_auth/username = 6003
outbound_auth/password = 6003
```

```ini
[wizard]
; outbound auth
sends_auth=no
outbound_auth/username=
outbound_auth/password=

; inbound auth
accepts_auth=no
inbound_auth/username=
inbound_auth/password=

; outbound registration
sends_registrations=no
sends_line_with_registrations=no

; inbound registration
accepts_registrations=no
; accepts_registrations=yes - aor 静态 contact
; accepts_registrations=no - match/identify
; remote_hosts=<ipaddress | hostname>[:port] [,<ipaddress | hostname>[:port] ]

outbound_proxy=
; endpoint/outbound_proxy
; aor/outbound_proxy
; registration/outbound_proxy

transport=

; registrations
server_uri_pattern=sip:${REMOTE_HOST}
client_uri_pattern=sip:${USERNAME}@${REMOTE_HOST}
contact_pattern=sip:${REMOTE_HOST}

; phoneprov
has_phoneprov=no
phoneprov/MAC=

; hint exten
has_hint=no
hint_context=endpoint/context
; PJSIP/<wizard_id>
hint_exten=none
; 例如 Gosub(stdexten,${EXTEN},1(${HINT}))"
hint_application=Dial(${HINT})

; 子对象
;endpoint/<param>
;aor/<param>
;inbound_auth/<param>
;outbound_auth/<param>
;identify/<param>
;registration/<param>
;phoneprov/<param>
```

## pjsip.conf

:::caution

- pjsip.conf.sample 中并不包含完整配置

:::

### global

```conf
[global]
type=global
; SIP Max Forwards header
max_forwards=70
; 默认 Asterisk PBX + 版本
;user_agent=Asterisk PBX
; 默认 出局 终端 - 未指定时使用
default_outbound_endpoint=default_outbound_endpoint
debug=no
; 发送 双 CRLF 作为 keep-alives 的间隔 - 单位 秒
; 面向有连接传输协议 - 例如 tcp websocket
keep_alive_interval=90
; contacts 失效检测 - 单位秒
;contact_expiration_check_interval=30
; 禁用多 域名 支持可增加 realtime 处理性能 - 减少 db 请求
disable_multi_domain=no
; endpoint 识别顺序 - ip,header,username,auth_username,anonymous
; 部分通过模块 res_pjsip_endpoint_identifier_* 提供支持
; 查看当前支持 pjsip show identifiers
endpoint_identifier_order=ip,username,anonymous
; 启动后验证所有 contacts 的最大时间
; 如果大于 qualify_frequency 则会使用 qualify_frequency
;max_initial_qualify_time=4
; 指定注册上下文后 Asterisk 会为 endpoint 维护一个 NoOp 的 extension
;regcontext=sipregistrations
; 默认语音邮箱 extension - 会在 NOTIFY Message-Account 头中返回
;default_voicemail_extension=asterisk

; unidentified_request_* 仅用于 endpoint_identifier_order 启用了 auth_username 场景
;
; 在 unidentified_request_period 内未识别的请求次数 - 超过产生安全事件
unidentified_request_count=5
; 单位 秒
unidentified_request_period=5
; 检测清除 未识别 的间隔 - 超过两倍 unidentified_request_period 则会被清除
;unidentified_request_prune_interval=30

; 默认 出局 SIP 的用户名 - 优先使用 CallerID 和 endpoint/from_user
;default_from_user=asterisk
; 生成 auth challenge 时的默认 realm
;default_realm=asterisk

                    ; Asterisk Task Processor Queue Size
                    ; On heavy loaded system with DB storage you may need to increase
                    ; taskprocessor queue.
                    ; If the taskprocessor queue size reached high water level,
                    ; the alert is triggered.
                    ; If the alert is set the pjsip distibutor stops processing incoming
                    ; requests until the alert is cleared.
                    ; The alert is cleared when taskprocessor queue size drops to the
                    ; low water clear level.
                    ; The next options set taskprocessor queue levels for MWI.
;mwi_tps_queue_high=500 ; Taskprocessor high water alert trigger level.
;mwi_tps_queue_low=450  ; Taskprocessor low water clear alert level.
                    ; The default is -1 for 90% of high water level.

                    ; Unsolicited MWI
                    ; If there are endpoints configured with unsolicited MWI
                    ; then res_pjsip_mwi module tries to send MWI to all endpoints on startup.
;mwi_disable_initial_unsolicited=no ; Disable sending unsolicited mwi to all endpoints on startup.
                    ; If disabled then unsolicited mwi will start processing
                    ; on the endpoint's next contact update.

; 移除 URI 中 ; 后面部分 - 用于兼容旧设备 例如 ITSP
ignore_uri_user_options=no

; 设备刷新注册信息时发送 AMI ContactStatus 事件
send_contact_status_on_update_registration=no

taskprocessor_overload_trigger=global
                ; Set the trigger the distributor will use to detect
                ; taskprocessor overloads.  When triggered, the distributor
                ; will not accept any new requests until the overload has
                ; cleared.
                ; "global": (default) Any taskprocessor overload will trigger.
                ; "pjsip_only": Only pjsip taskprocessor overloads will trigger.
                ; "none":  No overload detection will be performed.
                ; WARNING: The "none" and "pjsip_only" options should be used
                ; with extreme caution and only to mitigate specific issues.
                ; Under certain conditions they could make things worse.

; 在支持场景发送 norefersub 标签表示 支持 REFER subscription - RFC 4488
norefersub=yes
```

### system

```conf
[system]
type=system

; transaction timer T1 - 单位 ms
timer_t1=500
; transaction timer B
timer_b=32000
; 使用更短的 SIP 头名字
compact_headers=no
; res_pjsip 线程池初始线程
threadpool_initial_size=0
; 线程池增长
threadpool_auto_increment=5
threadpool_idle_timeout=60
threadpool_max_size=0
; 出局时 - 如果请求过大 禁止自动从 UDP 切换到 TCP - RFC 3261 section 18.1.1.
; 设置为 no 可能导致兼容问题
disable_tcp_switch=yes
; 出局时 - 如果 USA 在后续 18X 和 2XX 返回 SDP 属性包含不同的 To 信息时，跟随新的信息
; 也需要在 endpoint 启用
; 通常发生在 INVITE fork 到多 UAS 时
follow_early_media_fork=yes
; 出局时 - 类似 follow_early_media_fork，更改 port 属性
; 也需要在 endpoint 启用
; 通常发生在使用不同端口 ringback 时
accept_multiple_sdp_answers=no

; 出局禁用 rport
;disable_rport=no
```

### acl

- res_pjsip_acl

```conf
[acl]
type=acl
; List of IP ACL section names in acl conf
;acl=
; List of Contact ACL section names in acl conf
;contact_acl=
; List of Contact header addresses to deny
;contact_deny=
; List of Contact header addresses to permit
;contact_permit=
; List of IP addresses to deny access from
;deny=
; List of IP addresses to permit access from
;permit=
```

### transport
- res_pjsip_transport_websocket

```conf
[transport]
type=transport

; 传输协议
protocol=udp
; IP Address and optional port to bind to for this transport
;bind=
; Number of simultaneous Asynchronous Operations
async_operations=1

; Note that for the Websocket transport the TLS configuration is configured
; in http.conf and is applied for all HTTPS traffic.
;
; File containing a list of certificates to read TLS ONLY
;ca_list_file=
;ca_list_path=  ; Path to directory containing certificates to read TLS ONLY.
                ; PJProject version 2.4 or higher is required for this option to
                ; be used.
;cert_file=     ; Certificate file for endpoint TLS ONLY
                ; Will read .crt or .pem file but only uses cert,
                ; a .key file must be specified via priv_key_file.
                ; Since PJProject version 2.5: If the file name ends in _rsa,
                ; for example "asterisk_rsa.pem", the files "asterisk_dsa.pem"
                ; and/or "asterisk_ecc.pem" are loaded (certificate, inter-
                ; mediates, private key), to support multiple algorithms for
                ; server authentication (RSA, DSA, ECDSA). If the chains are
                ; different, at least OpenSSL 1.0.2 is required.
                ; (default: "")
; Preferred cryptography cipher names TLS ONLY
;cipher=
; Method of SSL transport TLS ONLY
;method=
;priv_key_file= ; Private key file TLS ONLY (default: "")
; Require verification of client certificate TLS ONLY
;verify_client=
; Require verification of server certificate TLS ONLY
;verify_server=
; Require client certificate TLS ONLY
;require_client_cert=
; Domain the transport comes from
;domain=
; External IP address to use in RTP handling
;external_media_address=
; External address for SIP signalling
;external_signaling_address=
; External port for SIP signalling
external_signaling_port=0
; 本地网络 - NAT 时使用
;local_net=
; 密钥
;password=

tos=0  ; TOS for the signalling sent over this transport
cos=0  ; COS for the signalling sent over this transport

; websocket 超时时间 - 单位 ms
; 客户端较慢的场景需要调整
websocket_write_timeout=100
; 是否允许重载 - 有时重载可能导致通话中断
allow_reload=no
; 对等传输
; 当从一个动态 contact 请求进来时，记录传输到 uri 参数 x-ast-txp
; 请求出去时，如果 uri 不是 hostname 则会使用记录的 x-ast-txp 参数
symmetric_transport=no
```

### auth

- 不推荐 inbound 和 outbound 使用相同 auth
- 空 realm 对 inbound 和 outbound 含义不同
  - inbound
    - 在授权是发送给 peer 作为授权的一部分
    - 默认为全局的 default_realm
  - outbound
    - 会匹配返回的 realm 来返回 auth
    - 空 匹配所有 realm

```conf
[auth]
type=auth
; 用户名
;username=
; 授权类型 userpass, md5
auth_type=userpass
; 明文密码
;password=
; MD5 密钥
; echo -n "myname:myrealm:mypassword" | md5sum
; outbound 时 realm 不能为 空 - 如果为空则要求服务端发送 空 realm 而不是匹配任意
;md5_cred=
; outgoing 时 空 或 * 都标识使用服务端返回 realm
;realm=
; Lifetime of a nonce
nonce_lifetime=32
```

### endpoint

- res_pjsip

```conf
[endpoint]
type=endpoint

; RFC3262 provisional ACK tags
100rel=yes
aggregate_mwi=yes
; Media Codec s to allow
;allow=
; RFC3578 overlap dialing support
allow_overlap=yes
; AoR s to be used with the endpoint
;aors=
; Authentication Object s associated with the endpoint
;auth=
; CallerID
;callerid=
; 隐私级别
callerid_privacy=allowed_not_screened
; 内部 id_tag
;callerid_tag=
; Dialplan context for inbound sessions
context=default
; Mitigation of direct media re INVITE glare
direct_media_glare_mitigation=none
; Direct Media method type
direct_media_method=invite
; Accept Connected Line updates from this endpoint
trust_connected_line=yes
; Send Connected Line updates to this endpoint
;send_connected_line=yes
connected_line_method=invite   ; Connected line method type.
                                ; When set to "invite", check the remote's
                                ; Allow header and if UPDATE is allowed, send
                                ; UPDATE instead of INVITE to avoid SDP
                                ; renegotiation.  If UPDATE is not Allowed,
                                ; send INVITE.
                                ; If set to "update", send UPDATE regardless
                                ; of what the remote Allows.
                                ; (default: "invite")
; media may flow directly between endpoints
direct_media=yes
; Disable direct media session refreshes when NAT obstructs the media session
;disable_direct_media_on_nat=no
; 禁用编码
;disallow=
;dtmf_mode=rfc4733
; SDP 媒体地址
;media_address=
; 绑定 RTP 会话到 media_address - 会导致所有RTP包发往指定地址
bind_rtp_to_media_address=no
; Force use of return port
force_rport=yes
; 启用 ICE 辅助 NAT 穿透
ice_support=no
; 终端 AoR 标识逻辑 - username, auth_username, ip, header
; header 在 username+realm 失败时尝试 username 匹配
identify_by=username,ip
; 重定向处理方式
;redirect_method=user
;mailboxes=     ; NOTIFY the endpoint when state changes for any of the specified mailboxes.
                ; Asterisk will send unsolicited MWI NOTIFY messages to the endpoint when state
                ; changes happen for any of the specified mailboxes. (default: "")
;voicemail_extension= ; The voicemail extension to send in the NOTIFY Message-Account header
                      ; (default: global/default_voicemail_extension)
;mwi_subscribe_replaces_unsolicited=no
                      ; An MWI subscribe will replace unsoliticed NOTIFYs
                      ; (default: "no")
; 默认 MOH 分类
moh_suggest=default
; Pass Music On Hold through using SIP re-invites with sendonlywhen placing on hold and sendrecv when taking off hold
;moh_passthrough=yes

; 出局授权对象
;outbound_auth=
; 出局请求代理 - SIP URI
;outbound_proxy=

; 使用来源 IP 地址端口重写 contact
rewrite_contact=no
; Enforce RTP symmetric
rtp_symmetric=no
; Send the Diversion header conveying the diversion information to the called user agent
send_diversion=yes

; Send the P Asserted Identity header
send_pai=no
; Send the Remote Party ID header
send_rpid=no
; Send connected line updates on unanswered incoming calls immediately
rpid_immediate=no
; Minimum session timers expiration period
timers_min_se=90
; Session timers for SIP packets
timers=yes
; Maximum session timer expiration period
timers_sess_expires=1800
; 限定通讯协议 - 默认都可以
;transport=

; Accept identification information received from this endpoint
trust_id_inbound=no
; Send private identification details to the endpoint
trust_id_outbound=no
; Use Endpoint s requested packetisation interval
use_ptime=no
; 强制使用 AVPF
use_avpf=no
; 强制媒体加密
;media_encryption=no
; 尝试加密
;media_encryption_optimistic=no
; yes => g.726 失败后尝试 g726aal2 - 与 RFC3551 不同
; 需要 allow g726aal2
g726_non_standard=no
; indicate ringing inband progress
;inband_progress=no

; The numeric pickup groups for a channel
;call_group=
; The numeric pickup groups that a channel can pickup
;pickup_group=
; The named pickup groups for a channel
;named_call_group=
; The named pickup groups that a channel can pickup
;named_pickup_group=

; The number of in use channels which will cause busy to be returned as device state
device_state_busy_at=0

;t38_udptl=no   ; Whether T 38 UDPTL support is enabled or not (default: "no")
;t38_udptl_ec=none      ; T 38 UDPTL error correction method (default: "none")
;t38_udptl_maxdatagram=0        ; T 38 UDPTL maximum datagram size (default:
                                ; "0")
;fax_detect=no  ; Whether CNG tone detection is enabled (default: "no")
;fax_detect_timeout=30  ; How many seconds into a call before fax_detect is
                        ; disabled for the call.
                        ; Zero disables the timeout.
                        ; (default: "0")
;t38_udptl_nat=no       ; Whether NAT support is enabled on UDPTL sessions
                        ; (default: "no")

;tone_zone=     ; Set which country s indications to use for channels created
                ; for this endpoint (default: "")
;language=      ; Set the default language to use for channels created for this
                ; endpoint (default: "")

; one touch recording
one_touch_recording=no
; 处理 one touch recording 的方式
record_on_feature=automixmon
record_off_feature=automixmon

; Name of the RTP engine to use for channels created for this endpoint
rtp_engine=asterisk
; SIP REFER transfers
allow_transfer=yes
; SDP origin 后的 username 信息
;sdp_owner=-
; String used for the SDP session s line
;sdp_session=Asterisk

;tos_audio=0    ; DSCP TOS bits for audio streams (default: "0")
;tos_video=0    ; DSCP TOS bits for video streams (default: "0")
;cos_audio=0    ; Priority for audio streams (default: "0")
;cos_video=0    ; Priority for video streams (default: "0")

; endpoint is allowed to initiate subscriptions
allow_subscribe=yes
; The minimum allowed expiry time for subscriptions initiated by the endpoint
;sub_min_expiry=0

; Username to use in From header for requests to this endpoint
;from_user=
; Username to use in From header for unsolicited MWI NOTIFYs to this endpoint
;mwi_from_user=
; Domain to user in From header for requests to this endpoint
;from_domain=

;dtls_verify=no ; Verify that the provided peer certificate is valid (default:
                ; "no")
;dtls_rekey=0   ; Interval at which to renegotiate the TLS session and rekey
                ; the SRTP session (default: "0")
;dtls_auto_generate_cert= ; Enable ephemeral DTLS certificate generation (default:
                          ; "no")
;dtls_cert_file=          ; Path to certificate file to present to peer (default:
                          ; "")
;dtls_private_key=        ; Path to private key for certificate file (default:
                          ; "")
;dtls_cipher=   ; Cipher to use for DTLS negotiation (default: "")
;dtls_ca_file=  ; Path to certificate authority certificate (default: "")
;dtls_ca_path=  ; Path to a directory containing certificate authority
                ; certificates (default: "")
;dtls_setup=    ; Whether we are willing to accept connections connect to the
                ; other party or both (default: "")
;dtls_fingerprint= ; Hash to use for the fingerprint placed into SDP
                   ; (default: "SHA-256")
;srtp_tag_32=no ; Determines whether 32 byte tags should be used instead of 80
                ; byte tags (default: "no")
;set_var=       ; Variable set on a channel involving the endpoint. For multiple
                ; channel variables specify multiple 'set_var'(s)
;rtp_keepalive= ; Interval, in seconds, between comfort noise RTP packets if
                ; RTP is not flowing. This setting is useful for ensuring that
                ; holes in NATs and firewalls are kept open throughout a call.
;rtp_timeout=      ; Hang up channel if RTP is not received for the specified
                   ; number of seconds when the channel is off hold (default:
                   ; "0" or not enabled)
;rtp_timeout_hold= ; Hang up channel if RTP is not received for the specified
                   ; number of seconds when the channel is on hold (default:
                   ; "0" or not enabled)
;contact_user= ; On outgoing requests, force the user portion of the Contact
               ; header to this value (default: "")
;incoming_call_offer_pref= ; Based on this setting, a joint list of
                           ; preferred codecs between those received in an
                           ; incoming SDP offer (remote), and those specified
                           ; in the endpoint's "allow" parameter (local)
                           ; is created and is passed to the Asterisk core.
                           ;
                           ; local - Include all codecs in the local list that
                           ; are also in the remote list preserving the local
                           ; order. (default).
                           ; local_first - Include only the first codec in the
                           ; local list that is also in the remote list.
                           ; remote - Include all codecs in the remote list that
                           ; are also in the local list preserving remote list
                           ; order.
                           ; remote_first - Include only the first codec in
                           ; the remote list that is also in the local list.
;outgoing_call_offer_pref= ; Based on this setting, a joint list of
                           ; preferred codecs between those received from the
                           ; Asterisk core (remote), and those specified in
                           ; the endpoint's "allow" parameter (local) is
                           ; created and is used to create the outgoing SDP
                           ; offer.
                           ;
                           ; local - Include all codecs in the local list that
                           ; are also in the remote list preserving the local
                           ; order.
                           ; local_merge - Include all codecs in the local list
                           ; preserving the local order.
                           ; local_first - Include only the first codec in the
                           ; local list.
                           ; remote - Include all codecs in the remote list that
                           ; are also in the local list preserving remote list
                           ; order.
                           ; remote_merge - Include all codecs in the local list
                           ; preserving the remote list order. (default)
                           ; remote_first - Include only the first codec in the
                           ; remote list that is also in the local list.
;preferred_codec_only=no   ; Respond to a SIP invite with the single most
                           ; preferred codec rather than advertising all joint
                           ; codec capabilities. This limits the other side's
                           ; codec choice to exactly what we prefer.
                           ; default is no.
                           ; NOTE: This option is deprecated in favor
                           ; of incoming_call_offer_pref.  Setting both
                           ; options is unsupported.
; 允许发送接收不同编码 - 不自动匹配
asymmetric_rtp_codec=no
refer_blind_progress=yes ; Whether to notifies all the progress details on blind
                       ; transfer (default: "yes"). The value "no" is useful
                       ; for some SIP phones (Mitel/Aastra, Snom) which expect
                       ; a sip/frag "200 OK" after REFER has been accepted.
;notify_early_inuse_ringing = ; Whether to notifies dialog-info 'early'
                              ; on INUSE && RINGING state (default: "no").
                              ; The value "yes" is useful for some SIP phones
                              ; (Cisco SPA) to be able to indicate and pick up
                              ; ringing devices.
max_audio_streams=1 ; The maximum number of allowed negotiated audio streams
                    ; (default: 1)
;
max_video_streams=1 ; The maximum number of allowed negotiated video streams
                    ; (default: 1)

; yes => rtcp_mux, use_avpf, ice_support, use_received_transport
; 默认
;   media_encryption=dtls
;   dtls_verify=fingerprint
;   dtls_setup=actpass
; dtls_cert_file, dtls_ca_file
webrtc=no
;incoming_mwi_mailbox = ; Mailbox name to use when incoming MWI NOTIFYs are
                        ; received.
                        ; If an MWI NOTIFY is received FROM this endpoint,
                        ; this mailbox will be used when notifying other modules
                        ; of MWI status changes.  If not set, incoming MWI
                        ; NOTIFYs are ignored.
follow_early_media_fork=yes ; On outgoing calls, if the UAS responds with
                           ; different SDP attributes on subsequent 18X or 2XX
                           ; responses (such as a port update) AND the To tag
                           ; on the subsequent response is different than that
                           ; on the previous one, follow it.  This usually
                           ; happens when the INVITE is forked to multiple UASs
                           ; and more than 1 sends an SDP answer.
                           ; This option must also be enabled in the system
                           ; section.
                           ; (default: yes)
accept_multiple_sdp_answers=no
                           ; On outgoing calls, if the UAS responds with
                           ; different SDP attributes on non-100rel 18X or 2XX
                           ; responses (such as a port update) AND the To tag on
                           ; the subsequent response is the same as that on the
                           ; previous one, process it. This can happen when the
                           ; UAS needs to change ports for some reason such as
                           ; using a separate port for custom ringback.
                           ; This option must also be enabled in the system
                           ; section.
                           ; (default: no)
;suppress_q850_reason_headers =
                           ; Suppress Q.850 Reason headers for this endpoint.
                           ; Some devices can't accept multiple Reason headers
                           ; and get confused when both 'SIP' and 'Q.850' Reason
                           ; headers are received.  This option allows the
                           ; 'Q.850' Reason header to be suppressed.
                           ; (default: no)
;ignore_183_without_sdp =
                           ; Do not forward 183 when it doesn't contain SDP.
                           ; Certain SS7 internetworking scenarios can result in
                           ; a 183 to be generated for reasons other than early
                           ; media.  Forwarding this 183 can cause loss of
                           ; ringback tone.  This flag emulates the behavior of
                           ; chan_sip and prevents these 183 responses from
                           ; being forwarded.
                           ; (default: no)
;stir_shaken =
                           ; If this is enabled, STIR/SHAKEN operations will be
                           ; performed on this endpoint. This includes inbound
                           ; and outbound INVITEs. On an inbound INVITE, Asterisk
                           ; will check for an Identity header and attempt to
                           ; verify the call. On an outbound INVITE, Asterisk will
                           ; add an Identity header that others can use to verify
                           ; calls from this endpoint. Additional configuration is
                           ; done in stir_shaken.conf.
                           ; The STIR_SHAKEN dialplan function must be used to get
                           ; the verification results on inbound INVITEs. Nothing
                           ; happens to the call if verification fails; it's up to
                           ; you to determine what to do with the results.
                           ; (default: no)
allow_unauthenticated_options=no
                           ; By default, chan_pjsip will challenge an incoming
                           ; OPTIONS request for authentication credentials just
                           ; as it would an INVITE request. This is consistent
                           ; with RFC 3261.
                           ; There are many UAs that use an OPTIONS request as a
                           ; "ping" and they expect a 200 response indicating that
                           ; the remote party is up and running without a need to
                           ; authenticate.
                           ; Setting allow_unauthenticated_options to 'yes' will
                           ; instruct chan_pjsip to skip the authentication step
                           ; when it receives an OPTIONS request for this
                           ; endpoint.
                           ; There are security implications to enabling this
                           ; setting as it can allow information disclosure to
                           ; occur - specifically, if enabled, an external party
                           ; could enumerate and find the endpoint name by
                           ; sending OPTIONS requests and examining the
                           ; responses.
```

### registration

- res_pjsip_outbound_registration

```conf
[registration]
type=registration
;auth_rejection_permanent=yes   ; Determines whether failed authentication
                                ; challenges are treated as permanent failures
                                ; (default: "yes")
;client_uri=    ; Client SIP URI used when attemping outbound registration
                ; (default: "")
;contact_user=  ; Contact User to use in request (default: "")
;expiration=3600        ; Expiration time for registrations in seconds
                        ; (default: "3600")
;max_retries=10 ; Maximum number of registration attempts (default: "10")
;outbound_auth= ; Authentication object to be used for outbound registrations
                ; (default: "")
;outbound_proxy=        ; Proxy through which to send registrations, a full SIP URI
                        ; must be provided (default: "")
;retry_interval=60      ; Interval in seconds between retries if outbound
                        ; registration is unsuccessful (default: "60")
;forbidden_retry_interval=0     ; Interval used when receiving a 403 Forbidden
                                ; response (default: "0")
;fatal_retry_interval=0 ; Interval used when receiving a fatal response.
                        ; (default: "0") A fatal response is any permanent
                        ; failure (non-temporary 4xx, 5xx, 6xx) response
                        ; received from the registrar. NOTE - if also set
                        ; the 'forbidden_retry_interval' takes precedence
                        ; over this one when a 403 is received. Also, if
                        ; 'auth_rejection_permanent' equals 'yes' a 401 and
                        ; 407 become subject to this retry interval.
;server_uri=    ; SIP URI of the server to register against (default: "")
;transport=     ; Transport used for outbound authentication (default: "")
;line=          ; When enabled this option will cause a 'line' parameter to be
                ; added to the Contact header placed into the outgoing
                ; registration request. If the remote server sends a call
                ; this line parameter will be used to establish a relationship
                ; to the outbound registration, ultimately causing the
                ; configured endpoint to be used (default: "no")
;endpoint=      ; When line support is enabled this configured endpoint name
                ; is used for incoming calls that are related to the outbound
                ; registration (default: "")
```

# FAQ

## res_pjsip_outbound_registration.c:1061 handle_registration_response: Fatal response '401' received from 'sip:192.168.1.2' on registration attempt to 'sip:6001@192.168.2.2', stopping outbound registration

初次注册成功，之后注册都失败

```bash
pjsip send registry trunk-6001-reg-0
```

尝试修改配置增加重试机制

```conf
expiration = 300
auth_rejection_permanent = no
retry_interval = 30
forbidden_retry_interval = 60
fatal_retry_interval = 120
max_retries = 120
```

- [pjsip.conf#fatal_retry_interval](https://github.com/asterisk/asterisk/blob/35437879e55b67d46cb9d0e558edef1e1609a28d/configs/samples/pjsip.conf.sample#L1335)
