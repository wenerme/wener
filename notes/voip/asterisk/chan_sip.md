---
title: chan_sip
---

# chan_sip

- 是什么？
  - pjsip 之前的 sip 通道实现
  - 功能满足 VoIP
  - 不支持现代化通讯 - WebRTC, Websocket 等

**modules.conf**

```ini
# 自动加载
autoload => yes
# 排除 pjsip
noload => res_pjsip.so
noload => res_pjsip_pubsub.so
noload => res_pjsip_session.so
noload => chan_pjsip.so
noload => res_pjsip_exten_state.so
noload => res_pjsip_log_forwarder.so
```

# 命令

| cli                                                         | desc                                                       |
| ----------------------------------------------------------- | ---------------------------------------------------------- |
| sip notify                                                  | Send a notify packet to a SIP peer                         |
| `sip prune realtime [peer [<name>|all|like <pattern>]|all]` | Prune cached Realtime users/peers                          |
| sip qualify peer                                            | Send an OPTIONS packet to a peer                           |
| sip reload                                                  | Reload SIP configuration                                   |
| `sip set debug {on|off|ip|peer}`                            | Enable/Disable SIP debugging                               |
| `sip set history {on|off}`                                  | Enable/Disable SIP history                                 |
| `sip show {channels|subscriptions}`                         | List active SIP channels or subscriptions                  |
| sip show bridged                                            | List all SIP bridges                                       |
| sip show channelstats                                       | List statistics for active SIP channels                    |
| sip show channel                                            | Show detailed SIP channel info                             |
| sip show domains                                            | List our local SIP domains                                 |
| sip show history                                            | Show SIP dialog history                                    |
| sip show inuse                                              | List all inuse/limits                                      |
| sip show mwi                                                | Show MWI subscriptions                                     |
| sip show objects                                            | List all SIP object allocations                            |
| sip show peers                                              | List defined SIP peers                                     |
| sip show peer                                               | Show details on specific SIP peer                          |
| sip show registry                                           | List SIP registration status                               |
| sip show sched                                              | Present a report on the status of the scheduler queue      |
| sip show settings                                           | Show SIP global settings                                   |
| sip show tcp                                                | List TCP Connections                                       |
| sip show users                                              | List defined SIP users                                     |
| sip show user                                               | Show details on specific SIP user                          |
| sip unregister                                              | Unregister (force expiration) a SIP peer from the registry |

# sip.conf

- [configs/samples/sip.conf.sample](https://github.com/asterisk/asterisk/blob/master/configs/samples/sip.conf.sample)
- type=peer
  - 处理呼入呼出， ip/port 匹配
- type=user
  - 处理呼入 - user 能呼叫 asterisk, asterisk 不能呼叫 user
  - 通过注册信息匹配 - authname, secret
  - 不依赖 IP 信息，不关心 host 设置
- type=friend
  - 会创建 friend 和 user
- remotesecret 呼出认证, secret 呼入认证

## nat

| conf        | desc              |
| ----------- | ----------------- |
| nat         | 配置 NAT 处理逻辑 |
| qualify=yes | 保持 NAT 会话开启 |

**Asterisk 不同版本 nat 的选项**

| asterisk | nat                                                      |
| -------- | -------------------------------------------------------- |
| >= 1.8   | no, force_rport, comedia, auto_force_rport, auto_comedia |
| < 1.8    | no, yes, never, route                                    |

### chan_sip nat vs chan_pjsip

| chan_sip/nat | chan_pjsip/rtp_symmetric | chan_pjsip/force_rport | chan_pjsip/rewrite_contact |
| ------------ | ------------------------ | ---------------------- | -------------------------- |
| nat=yes      | rtp_symmetric=yes        | force_rport=yes        | rewrite_contact=yes        |
| nat=no       | rtp_symmetric=no         | force_rport=no         | rewrite_contact=no         |
| nat=never    | rtp_symmetric=no         | force_rport=no         | rewrite_contact=no         |
| nat=route    | rtp_symmetric=no         | force_rport=yes        | rewrite_contact=yes        |
