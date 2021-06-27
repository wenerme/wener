---
title: OpenVox Asterisk
---

# OpenVox Asterisk

- 参考
  - [GSM Gateways APP Note](https://openvoxwiki.atlassian.net/wiki/spaces/VG/pages/2473082832/GSM+Gateways+APP+Note)

```bash
# 发起呼叫
channel originate SIP/6003 extension 10086@sip-6003
channel originate IAX2/dev/6003 extension 10086@iax-dev
```

| conf         | val                       |
| ------------ | ------------------------- |
| astetcdir    | /etc/asterisk             |
| astmoddir    | /usr/lib/asterisk/modules |
| astvarlibdir | /usr/lib/asterisk         |
| astagidir    | /usr/lib/asterisk/agi-bin |
| astspooldir  | /tmp/media/spool/asterisk |
| astrundir    | /var/run                  |
| astlogdir    | /tmp/log/asterisk         |
| astdatadir   | /etc/asterisk             |

:::tip 💡

- spool 为 /tmp/media/spool/asterisk
- 录音存储在 /tmp/media/spool/asterisk/monitor
- tmpfs 根据内存不一样大小不一样 - 小的可能只有 30MB 左右 free 内存

:::

:::caution ⚠️

- wg 系列没有 app_stack
  - 基于 Debian 8, Linux 4.19.81, asterisk 1.8.20

:::

- rtg - 路由分组
- 一个路由规则会基于目标生成 N 个 context - `rtg-test-1`
- 每个目标 include 一个
- sounds - 只有部分 sounds 可用于测试
  - agent-pass.gsm
  - auth-incorrect.gsm
  - auth-thankyou.gsm
  - vm-goodbye.gsm

```ini
; 自定义路由 目标 channel 设置为 custom 支持自定义上下文
; Macro(my-inside) -> macro-my-inside
[rtg-test-1]
exten => _[*#+0-9].,1,NoOp(_[*#+0-9]. matches Rule rtg-test-1)
exten => _[*#+0-9].,n,Set(CDR_CALLEEID=${EXTEN})
exten => _[*#+0-9].,n,Macro(my-inside)
exten => _[*#+0-9].,n(nochannel),ChannelHangup("${CDR_TOCHAN}")
exten => _[*#+0-9].,n,Goto(nocdr,s,1)
exten => _[*#+0-9].,n,Hangup()

[nothingtodo]
exten => _[*#+0-9].,1,NoOp(Nothing to do, Not setting out channel)
exten => _[*#+0-9].,n,Hangup(42)

# SIP 内线
[internalsip]
exten => _9X.,1,NoOp(SIP Internal Call)
exten => _9X.,n,Set(CDR_CALLEEID=${EXTEN:1})
exten => _9X.,n,Set(CDR_TOCHAN=${EXTEN:1})
exten => _9X.,n,Set(CDR_TOCHAN=${SHELL(/my_tools/get_sipendpointname "${CDR_TOCHAN}")})
exten => _9X.,n,Dial(SIP/${EXTEN:1})
exten => _9X.,n,Hangup(42)

# SIP 出局逻辑
[sipinbound]
exten => _[*#+0-9].,1,NoOp(SIP Inbound)
exten => _[*#+0-9].,n,GotoIf(${DIALPLAN_EXISTS(${SIPROUTE},${EXTEN},1)}?:nocdr)
exten => _[*#+0-9].,n,Goto(${SIPROUTE},${EXTEN},1)
exten => _[*#+0-9].,n(nocdr),Goto(nocdr,s,1)

[iaxinbound]
exten => _[*#+0-9].,1,NoOp(IAX Inbound)
exten => _[*#+0-9].,n,GotoIf(${DIALPLAN_EXISTS(${IAXROUTE},${EXTEN},1)}?:nocdr)
exten => _[*#+0-9].,n,Goto(${IAXROUTE},${EXTEN},1)
exten => _[*#+0-9].,n(nocdr),Goto(nocdr,s,1)

[nocdr]
exten => s,1,ChannelHangup("${CDR_TOCHAN}")
exten => s,n,Hangup(42)

[globals]
# 默认 SIP 路由
SIPROUTE=sipdefault
```


## macro

- dial-failover
  - gsm
    - `Macro(dial-failover,,${EXTEN},${POLICY_GROUP-RND-OUT},RET)`
      - 例如 `Macro("SIP/6003-0000000c", "dial-failover,,10086,extra/7,0,gsm-4,RET")`
    - ARG1 forward callee id
    - ARG2 dial extension
    - ARG3 设备
    - ARG4 extension flag
    - ARG5 CDR_TOCHAN
  - wg - `Macro(dial-failover,,${CDR_CALLEEID},RET,extra/r1,0,0)`
    - ARG1 呼转号码
    - ARG2 补叫号
    - ARG3 返回 - nocarrier, hangup, congestion
    - ARG4 设备
    - ARG5 额外标识
    - ARG6 CDR 中的 TO
    - 4，5，6 变量在每一次 failover 会递增


