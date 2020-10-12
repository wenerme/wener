---
id: the-definitive-guide-4th
title: Asterisk 权威指南,第四版
---

# Asterisk 权威指南,第四版 - The Definitive Guide, 4th Edition

读书笔记

## Ch1. 电话技术革命

## Ch2. 架构

## Ch3. 安装

## Ch4. 初始配置

## Ch5. 用户设备配置

## Ch6. 拨号计划基础

## Ch7. 外部连通性

## Ch8. 语音信箱

* app_voice mail.so
* 特性
  * 不限的密码保护的语音信箱.
  * 不同的问候,忙音和无效状态
  * 不同的自定义问候语
  * 语音信箱和电话之间多对多关联
  * 邮件提醒并在附件中附上语音文件
  * 语音邮件转发和广播
  * 消息等待提示
* voicemail.conf
* 密码
  * `mailbox context oldpass newpass`
* `mailbox => password[,FirstName LastName[,email addr[,pager addr [,options[|options]]]]]`
* [VoiceMail](https://wiki.asterisk.org/wiki/display/AST/Asterisk+14+Application_VoiceMail)(mailbox1&[mailbox2[&...]],[options])
  * 特殊 DTMF 操作
    * `0` 跳转到 `o` 扩展
    * `*` 跳转到 `a` 扩展
  * VMSTATUS
    * SUCCESS
    * USEREXIT
    * FAILED
  * options
    * b - 播放忙音
    * d( c ) - Accept digits for a new extension in context c, if played during the greeting. Context defaults to the current context.
      * c
    * g( # ) - Use the specified amount of gain when recording the voicemail message. The units are whole-number decibels (dB). Only works on supported technologies, which is DAHDI only.
      * #
    * s - 不播放任何提示音
    * u - 播放无效音(unavailable greeting)
    * U - 标记消息 URGENT.
    * P - 标记消息 PRIORITY.
* [VoiceMailMain](https://wiki.asterisk.org/wiki/display/AST/Asterisk+14+Application_VoiceMailMain)([mailbox@[context]],[options])
  * 特殊 DTMF 操作
    * `*` 跳转到 `a` 扩展
  * options
    * p - Consider the mailbox parameter as a prefix to the mailbox that is entered by the caller.
    * g( # ) - Use the specified amount of gain when recording a voicemail message. The units are whole-number decibels (dB).
      * #
    * s - 不检测密码
    * a( folder ) - 跳过目录询问, 直接进入指定目录. 默认为 INBOX (0).
      * folder
        * 0 - 收件箱 - INBOX
        * 1 - 旧邮件 - Old
        * 2 - 工作 - Work
        * 3 - 家庭 - Family
        * 4 - 朋友 - Friends
        * 5 - 自定义1 - Cust1
        * 6 - 自定义2 - Cust2
        * 7 - 自定义3 - Cust3
        * 8 - 自定义4 - Cust4
        * 9 - 自定义5 - Cust5
* [VoiceMailPlayMsg](https://wiki.asterisk.org/wiki/display/AST/Asterisk+14+Application_VoiceMailPlayMsg)([mailbox@[context]],msg_id)
  * VOICEMAIL_PLAYBACKSTATUS
    * SUCCESS
    * FAILED

__extensions.conf__
```
; 根据状态不同进行不同的提示
exten => 101,1,NoOp()
  same => n,Dial(${JOHN},10)
  same => n,GotoIf($["${DIALSTATUS}" = "BUSY"]?busy:unavail) same => n(unavail),VoiceMail(101@default,u)
  same => n,Hangup()
  same => n(busy),VoiceMail(101@default,b)
  same => n,Hangup()

; 进入语言信箱
exten => *98,1,NoOp(Access voicemail retrieval.)
  same => n,VoiceMailMain()
```
## Ch9. 国际化

## Ch10. 深入拨号计划

### MeetMe

* 创建密码保护的会议
* 会议管理
  * 静音
  * 锁定
  * 踢出参与者
* 可以选择只允许单人发话
* 静态或动态的会议创建
* 需要 DAHDI 支持
__meetme.conf__
```
[rooms]
conf => 600
```
__extensions.conf__
```
[LocalConf]
; 54321 为密码
exten => 600,1,MeetMe(600,i,54321)

; MeetMeCount(room[, var])
; 获取会议人数, 并指定到变量, 如果不指定则会报给对方
exten => 601,1,NoOp()
  same => n,Playback(conf-thereare)
  same => n,MeetMeCount(600)
  same => n,Playback(conf-peopleinconf)

; 限制最多 10 人参与会议
exten => 602,1,NoOp()
  same => n,MeetMeCount(600,CONFCOUNT)
  same => n,GotoIf($[${CONFCOUNT} <= 10]?meetme:conf_full,1)
  same => n(meetme),MeetMe(600,i,54321)
exten => conf_full,1,Playback(conf-full)
```

### ConfBridge

* Asterisk 10+
* 用来替代 MeetMe 的应用
* 新特性
  * 高清音频, 8kHz - 96kHz
  * 视频
  * 动态控制菜单
  * 额外的配置文件 _confbridge.conf_


__confbridge.conf__
```
[general]
[default_user]
type=user

[default_bridge]
type=bridge
```

__extensions.conf__
```
; ConfBridge(conference,[bridge_profile:default_bridge,[user_profile:default_user,[menu]]])
; https://wiki.asterisk.org/wiki/display/AST/Asterisk+14+Application_ConfBridge
[ConferenceRooms]
exten => 602,1,NoOp()
  same => n,ConfBridge(${EXTEN})
[LocalSets]
include => ConferenceRooms
```

```bash
asterisk -rx "module load app_confbridge.so"
```

## Ch11. Parking, Paging, and Conferencing

* [Parking](https://en.wikipedia.org/wiki/Call_parking) 呼叫保留, Paging 寻呼
* features.conf
  * general
  * featuremap
  * applicationmap
* 重载配置 `features reload`
* 重载 ConfBridge `module reload app_confbridge.so`
* Asterisk 11+ 后可以使用 `FEATURE` 和 `FEATUREMAP` 函数动态创建特性映射(Feature-Map).
  * [FEATURE](https://wiki.asterisk.org/wiki/display/AST/Asterisk+14+Function_FEATURE)(option_name)
    * option_name
      * atxfer      Attended transfer
      * blindxfer   Blind transfer
      * automon     Auto Monitor() (call recording)
      * disconnect  Call disconnect
      * parkcall    Call parking
      * automixmon  Auto MixMonitor() (call recording)
    * 修改超时 `Set(FEATURE(parkingtime)=60)`
  * [FEATUREMAP](https://wiki.asterisk.org/wiki/display/AST/Asterisk+14+Function_FEATUREMAP)(feature_name)
    * feature_name
      * atxfer - Attended Transfer
      * blindxfer - Blind Transfer
      * automon - Auto Monitor
      * disconnect - Call Disconnect
      * parkcall - Park Call
      * automixmon - Auto MixMonitor
    * 设置或获取特定通道的特性映射
    * `Verbose(2,Current DTMF for atxfer: ${FEATUREMAP(atxfer)})`
    * `Set(FEATUREMAP(atxfer)=*9)`
  * `Set(__DYNAMIC_FEATURES=shifteight)` 使用自定义的特性组
* [Page](https://wiki.asterisk.org/wiki/display/AST/Asterisk+14+Application_Page)(Technology/Resource&[Technology2/Resource2[&...]],[options,[timeout]])
* [Read](https://wiki.asterisk.org/wiki/display/AST/Asterisk+14+Application_Read)(variable,filename&[filename2[&...]],[maxdigits,[options,[attempts,[timeout]]]]])
  * 读取 `#` 结尾的数字
  * READSTATUS - 读取状态
    * OK
    * ERROR
    * HANGUP
    * INTERRUPTED
    * SKIPPED
    * TIMEOUT
  * maxdigits
    * 最大长度,默认 0, 不限, 等待用户输入 `#`, 最长 255
  * options
    * s - 如果线路中断则立即返回
    * i - 将文件名作为 indications.conf 中定义的提示音进行播放
    * n - 即便是线路状态中断也读取
  * attempts
    * 尝试次数, 默认 0
  * timeout
    * 超时时间, 秒, 如果设置了则会覆盖默认值,可以为浮点数
* [Originate](https://wiki.asterisk.org/wiki/display/AST/Asterisk+14+Application_Originate)(tech_data,type,arg1,[arg2,[arg3,[timeout]]])
  * 外部呼叫,并关联到指定的扩展或应用.会阻塞直到接通或失败.该应用会返回并继续处理.
  * ORIGINATE_STATUS - 返回状态
    * FAILED
    * SUCCESS
    * BUSY
    * CONGESTION
    * HANGUP
    * RINGING
    * UNKNOWN - 正常情况下是不会出现该值的,如果出现了请前去提 BUG
* ConfBridge
  * 支持视频,但 Asterisk 不支持视频转码,需要所有人都使用同样的编码
  * 不支持视频广播,在同一时间只能显示一个视频源
  * 在 sip.conf 中配置 `videosupport=yes`
  * 在 confbridg.conf bridge 中配置 `video_mode`
    * none
    * follow_talker - 会将视频源切换为说话的人
    * last_marked
    * first_marked
  * `sip show peer 0F1` 可查看对视频的支持状态和支持的编码
  * https://jitsi.org/
  * 推荐使用 H.264/H.263 编码

overhead paging system (PA system, or Tannoy, for our UK readers)
paging system (more formally known as a public address system)
https://en.wikipedia.org/wiki/Public_address_system

__extensions.conf__
```
; 启用在 applicationmap 中定义的特性
exten => 101,1,NoOp()
  same => n,Set(__DYNAMIC_FEATURES=agi_test)
  same => n,Dial(SIP/0000FFFF0002)

; 等待标记的用户进入会议
[ConferenceRooms]
; 一般参与者
exten => 602,1,NoOp()
    same => n,Set(CONFBRIDGE(user,wait_marked)=yes)
    same => n,Set(CONFBRIDGE(user,end_marked)=yes)
    same => n,Goto(conference,1)
; 标记的参与值,需要密码
exten => 603,1,NoOp()
    same => n,Set(CONFBRIDGE(user,marked)=yes)
    same => n,Set(CONFBRIDGE(user,pin)=1200)
    same => n,Goto(conference,1)
; 所有人都使用同样的桥接
exten => conference,1,NoOp()
    same => n,ConfBridge(primary)


[ConferenceRooms]
; 一般参与者
exten => 602,1,NoOp()
  same => n,Goto(conference,1)
exten => conference,1,NoOp()
  same => n,Set(thisBridge=primary)
  same => n,ConfBridge(${thisBridge},,,volume_ctrl_menu)
; 由菜单执行
exten => conference_joiner,1,NoOp()
  same => n,Read(numberToDial,vm-enter-num-to-call)
  same => n,Originate(SIP/my_itsp/${numberToDial},exten,ConferenceRooms,602,1)
```

__confbridge.conf__
```
[volume_ctrl_menu]
type=menu
*5=toggle_mute
1=increase_listening_volume 4=decrease_listening_volume
7=reset_listening_volume
3=increase_talking_volume
6=decrease_talking_volume
9=reset_talking_volume
; 特殊的菜单功能
0=dialplan_exec(ConferenceRooms,conference_joiner,1)
```

## Ch12. 网络通话路由

## Ch13. 自动呼叫分发队列 - ACD Queue
* ACD: Automatic Call Distribution
* member & agent
  * Asterisk 中的 member 是指能够进行拨号的通道.例如 SIP/0F1
  * agent 一般也指用来拨号的通道,但现在 agent 通道现在已经不再使用了.因此不建议使用 chan_agent.
  * agent 可用来特指接线员.
* queues.conf

* AddQueueMember()
* RemoveQueueMember()
* PauseQueueMember()
* UnpauseQueueMember()

```bash
# 重载配置
module reload app_queue.so
queue show
# W: Queue weight
# C: Number of calls presented to this queue
# A: Number of calls that have been answered by a member SL: Service level
# 成员管理
# queue add member <channel> to <queue> [[[penalty <penalty>] as <membername>] state_interface <interface>]
queue add member SIP/0F1 to support
queue show support
queue remove member SIP/0F1 from support

queue pause member SIP/0F1 queue support reason DoingCallbacks
queue unpause member SIP/0F1 queue support reason off-break


```

__extensions.conf__
```
[Queues]
exten => 7001,1,Verbose(2,${CALLERID(all)} entering the support queue)
  same => n,Queue(support)
  same => n,Hangup()
exten => 7002,1,Verbose(2,${CALLERID(all)} entering the sales queue)
  same => n,Queue(sales)
  same => n,Hangup()

[LocalSets]
include => Queues      ; allow phones to call queues
```

## Ch14. 设备状态

虚拟设备| 描述
----|----
`MeetMe:<conference bridge>` |
`SLA:<shared line>`|
`Custom:<custom name>`|
`Park:<exten@context>`|
`Calendar:<calendar name>`|



## Ch15. 自动出席

## Ch16. 关系型数据库集成

## Ch17. 交互语言响应 - IVR
## Ch18. 外部服务

## Ch19. 传真
## Ch20. 管理接口 - AMI
## Ch21. 网关接口 - AGI
## Ch22. 集群
## Ch23. 分布式全球号码发现 - DUNDi
* Distributed Universal Number Discovery (DUNDi)
* [DUNDi](https://en.wikipedia.org/wiki/Distributed_Universal_Number_Discovery)

## Ch24. 系统监控和日志
## Ch25. Web 接口
## Ch26. 安全
## Ch27. 未来展望

## Apd.A 理解电话技术
## Apd.B VoIP 中的协议

## Apd.C 系统准备
