---
title: chan_pjsip
---

# chan_pjsip

- 基于 pjproject 实现的 sip 通道
- pjsip 功能很多，因此有很多的 res_pjsip，也有很多配置项

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

## pjsip_wizard

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
