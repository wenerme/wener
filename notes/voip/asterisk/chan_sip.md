---
title: chan_sip
---

# chan_sip

- chan_sip 是什么？
  - pjsip 之前的 sip 通道实现
  - 功能满足 VoIP
  - 不支持现代化通讯 - WebRTC, Websocket 等

:::caution

- chan_sip 已经废弃，尽量使用 chan_pjsip

:::

**modules.conf**

```ini
autoload => no
load => chan_sip

# 自动加载
autoload => yes
# 排除 pjsip
noload => chan_pjsip
noload => res_pjsip
noload => res_pjsip_exten_state
noload => res_pjsip_log_forwarder
noload => res_pjsip_pubsub
noload => res_pjsip_session
```

## Dial 语法

- SIP/devicename
- SIP/username@domain - SIP uri
- `SIP/username[:password[:md5secret[:authname[:transport]]]]@host[:port]`
  - 直接定义完整信息
- SIP/devicename/extension
- SIP/devicename/extension/IPorHost
- SIP/username@domain//IPorHost
- 添加 `[![touser[@todomain]][![fromuser][@fromdomain]]]` 修改 To: 和 From:

---

- devicename - 定义的 peer 名字
- username@domain - 互联网上的 SIP 用户 - 建议开启 DNS SRV
- devicename/extension - 用于代理场景、Trunk 线路
  - `SIP/proxyhostname/user` 和 `SIP/user@proxyhostname` 相同

## 命令

| cli                                                             | desc                                                       |
| --------------------------------------------------------------- | ---------------------------------------------------------- |
| sip notify                                                      | Send a notify packet to a SIP peer                         |
| `sip prune realtime [peer [< name >|all|like < pattern >]|all]` | Prune cached Realtime users/peers                          |
| sip qualify peer                                                | Send an OPTIONS packet to a peer                           |
| sip reload                                                      | Reload SIP configuration                                   |
| `sip set debug {on|off|ip|peer}`                                | Enable/Disable SIP debugging                               |
| `sip set history {on|off}`                                      | Enable/Disable SIP history                                 |
| `sip show {channels|subscriptions}`                             | List active SIP channels or subscriptions                  |
| sip show bridged                                                | List all SIP bridges                                       |
| sip show channelstats                                           | List statistics for active SIP channels                    |
| sip show channel                                                | Show detailed SIP channel info                             |
| sip show domains                                                | List our local SIP domains                                 |
| sip show history                                                | Show SIP dialog history                                    |
| sip show inuse                                                  | List all inuse/limits                                      |
| sip show mwi                                                    | Show MWI subscriptions                                     |
| sip show objects                                                | List all SIP object allocations                            |
| sip show peers                                                  | List defined SIP peers                                     |
| sip show peer                                                   | Show details on specific SIP peer                          |
| sip show registry                                               | List SIP registration status                               |
| sip show sched                                                  | Present a report on the status of the scheduler queue      |
| sip show settings                                               | Show SIP global settings                                   |
| sip show tcp                                                    | List TCP Connections                                       |
| sip show users                                                  | List defined SIP users                                     |
| sip show user                                                   | Show details on specific SIP user                          |
| sip unregister                                                  | Unregister (force expiration) a SIP peer from the registry |

## sip.conf

- [configs/samples/sip.conf.sample](https://github.com/asterisk/asterisk/blob/master/configs/samples/sip.conf.sample)

### 设备配置

- type=peer
  - 处理呼入呼出， ip/port 匹配
  - host=dynamic
- type=user
  - 处理呼入 - user 能呼叫 asterisk, asterisk 不能呼叫 user
  - 通过注册信息匹配 - authname, secret
  - 不依赖 IP 信息，不关心 host 设置
- type=friend
  - 会创建 friend 和 user
  - 一般本地电话使用
- remotesecret 呼出认证, secret 呼入认证

:::tip

- 推荐设备名字 `[0-9a-z_]`
- 如果用到了 nat 确保 `qualify=yes`

:::

### 通用配置

- 安全相关
  - allowguest - 默认开启
  - permit/deny/acl - IP address filters
  - contactpermit/contactdeny/contactacl - IP address filters for registrations
  - context - Which set of services you offer various users

```conf
[general]
; 默认 context - 默认为 default
context=public
; 是否允许匿名呼叫
;allowguest=no
; 尝试使用授权信息里的 username 匹配而不是 From 头
;match_auth_username=yes

; overlap dialing - use the Incomplete application to collect the needed digits from an ambiguous dialplan match.
; 默认 yes
; yes - RFC3578 overlap dialing
; dtmf - inband, RFC2833, SIP INFO
allowoverlap=no

; 禁止 transfer
;allowtransfer=no

; digest 授权 realm
; 默认 asterisk - 如果 asterisk.conf 设置了系统名则默认为系统名字 - 需要全局唯一
;realm=mydomain.tld
; 使用域名列表作为域
;domainsasrealm=no

; 处理 'Record: on' 头逻辑 - 默认 automon, 设置为 空 禁用
;recordonfeature=automixmon
; 处理 'Record: off' 头逻辑 - 默认 automon, 设置为 空 禁用
;recordofffeature=automixmon

udpbindaddr=0.0.0.0
;rtpbindaddr=172.16.42.1
; disallowed_methods = UPDATE

tcpenable=no
tcpbindaddr=0.0.0.0

tlsenable=no
tlsbindaddr=0.0.0.0

;tcpauthtimeout = 30
; unauthenticated sessions limit
;tcpauthlimit = 100

; 与 res_pjsip_transport_websockets 冲突
;websocket_enabled = true
; 单位 ms
;websocket_write_timeout = 100


transport=udp
; DNS SRV lookups on outbound
; 只会用 SRV 记录 - 禁用后外呼无法只使用域名
srvlookup=yes

;pedantic=yes


; https://wiki.asterisk.org/wiki/display/AST/IP+Quality+of+Service


; 全局 outbound 授权信息
[authentication]
; <user>:<secret>@<realm>
; <user>#<md5secret>@<realm>
;auth=mark:topsecret@digium.com
```

## nat

| conf        | desc              |
| ----------- | ----------------- |
| nat         | 配置 NAT 处理逻辑 |
| qualify=yes | 保持 NAT 会话开启 |

**Asterisk 不同版本 nat 的选项**

| asterisk | nat                                                      |
| -------- | -------------------------------------------------------- |
| `>= 1.8` | no, force_rport, comedia, auto_force_rport, auto_comedia |
| `< 1.8`  | no, yes, never, route                                    |

### chan_sip nat vs chan_pjsip

| chan_sip/nat | chan_pjsip/rtp_symmetric | chan_pjsip/force_rport | chan_pjsip/rewrite_contact |
| ------------ | ------------------------ | ---------------------- | -------------------------- |
| nat=yes      | rtp_symmetric=yes        | force_rport=yes        | rewrite_contact=yes        |
| nat=no       | rtp_symmetric=no         | force_rport=no         | rewrite_contact=no         |
| nat=never    | rtp_symmetric=no         | force_rport=no         | rewrite_contact=no         |
| nat=route    | rtp_symmetric=no         | force_rport=yes        | rewrite_contact=yes        |
