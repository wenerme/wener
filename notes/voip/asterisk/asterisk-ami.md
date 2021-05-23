---
title: Asterisk AMI
---

# Asterisk AMI

- AMI - Asterisk Manager Interface
- 配置文件 `manager.conf`
- 默认端口 5038
- 服务端会主动发送头 `Asterisk Call Manager/3.2.0`
- 响应均为异步事件
- 包类型分为: 事件, 响应, 和发送的操作
- 格式类似于 HTTP 头
- Action,Response,Event 必须在第一行
- 请求通过 ActionID, 服务端返回 ActionID 来识别响应
- 一次请求除了会返回一个响应以外, 可能还会范围一列数据, 此时列数据是通过事件发送的, 没有 ActionID
  - 例如: 以 `EndpointDetail` 开始, 以 `EndpointDetailComplete` 结束
- Action
  - CLIENT -> Asterisk
- Response
  - CLIENT -> Asterisk -Response-> CLIENT
- Event
  - Asterisk -> CLIENT
- 参考
  - [AMI v2 Specification](https://wiki.asterisk.org/wiki/display/AST/AMI+v2+Specification)
    - asterisk 12+
    - 版本号为 2.0.0 - asterisk 1.8 是 1.1

:::caution

- AMI v1 可能内容包含换行
- UTF8 包含 BOM - EF BB BF

:::

```bash
# 命令文档
asterisk -rx 'manager show commands'
# 事件文档
asterisk -rx 'manager show events'
```

**manager.conf**

- [1.8/configs/manager.conf.sample](https://github.com/asterisk/asterisk/blob/1.8/configs/manager.conf.sample)

## AMI 协议

- 初始服务端会发送一条信息包含版本
  - `Asterisk Call Manager/1.1`
- 客户端会接收到 FullyBooted 表示启动完成
- 新版本会返回 SuccessfulAuth - 包含账号权限、链接等信息
- 服务退出或重启会发送 Shutdown
- Newchannel - 通道建立
  - 包含 Uniqueid 可用于持续跟踪通道
  - 然后会有很多 VarSet - SIPURI

## 一次呼叫过程产生的事件

```
Event: Newchannel
Privilege: call,all
ChannelState: 0
CallerIDNum: 6003
AccountCode:
Channel: SIP/6003-000000de
ChannelStateDesc: Down
CallerIDName:
Exten: 10085
Context: sipinbound
Uniqueid: 1621433208.393
```

- SIPURI=sip:6003@192.168.1.2
- SIPDOMAIN=192.168.1.2
- SIPCALLID=NKEVsn22tE
- SIPROUTE=sip-6003 - 应用自定义
- Newstate - Ring
- Newexten - 执行的 extension 序列
- Macro 包含的变量
  - MACRO_EXTEN
  - MACRO_CONTEXT
  - MACRO_PRIORITY
  - MACRO_DEPTH
- Newchannel - EXTRA/7-1 对方通道
  - DIALEDPEERNUMBER=7/10086
  - NewCallerid EXTRA/7-1
- Newstate - Dialing
- Dial
- RTCPReceived
- RTCPSent
- Newstate - Up
- DIALSTATUS=ANSWER
- DIALEDPEERNAME=EXTRA/7-1
- BRIDGEPEER=EXTRA/7-1 - 两个通达设置对方为 peer
- BRIDGEPEER=SIP/6003-000000de
- Bridge
- BRIDGEPVTCALLID=NKEVsn22tE
- Unlink - 断开 bridge
- ANSWEREDTIME=16
- ExtraUp - 板卡 Board=1
- Hangup - EXTRA/7-1
- RTPAUDIOQOS=ssrc=1662980482;themssrc=2301022491;lp=0;rxjitter=0.014852;rxcount=1238;txjitter=0.000000;txcount=1238;rlp=0;rtt=0.005000
  - RTP QOS 信息
- Hangup - SIP/6003-000000de
  - CallerIDNum: 6003
  - Uniqueid: 1621433208.393
