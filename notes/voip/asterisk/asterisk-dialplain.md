---
title: 拨号计划
---

# Asterisk Dialplan

- `dialplan reload` 重载配置
- `dialplan show 88888888@from-app` 测试匹配
- cointext 名字长度为 80, 但有最后一位 null, 所以是 79
- 避免使用 `[general]`, `[default]`, 和 `[globals]` 作为名字
- channel 中 context 名字是通道开始的点
- 推荐使用非数字而是具体含义的名字作为不可拨号的扩展名
- 模式匹配规则
  - `_` 开始
  - X = `[0-9]`, Z = `[1-9]`, N = `[2-9]`, `[15-7]` = 1|5|6|7
  - `. = .*`, `! = .+`
- 搜索顺序
  - Explicit extensions
  - Pattern match extensions
  - Includes
  - Switches
- 特殊扩展
  - a - Assistant extension
    - 类似于 o, 只有在录语音邮件时按 `*` 触发, 主要用于访问助手.
  - e - Exception Catchall extension
    - 用于捕获 `i`, `t`, `T` 扩展. 可使用 `EXCEPTION` 来获取到具体异常信息
  - h - Hangup extension
    - 在挂断后会触发
  - i - Invalid entry extension
    - 当 `Background`, `WaitExten` 的输入在当前上下文中找不到匹配的扩展时触发
  - o - Operator extension
    - 当在录制语言邮件时按 `0` 触发, 主要用于访问操作员
  - s - Start extension
    - 当模拟通话接入时触发, 也可以再宏中使用
    - 并不是用于捕获所有扩展, 只是简单的代表模拟通话和宏的开始.
  - t - Response timeout extension
    - `Background` 和 `WaitExten` 时超时
  - T - Absolute timeout extension
    - `absolute` 超时时触发
    - `core show function TIMEOUT`
- 变量
  - `${variable_name[:offset[:length]]}`
    - 裁剪
    - offset,length 可以为负
  - 通道变量在转移后,变量不会被继承
    - `_` 开始的变量会在单次转移后则会失效
    - `__` 开始的变量会在转移后一直继承
  - [标准的通道变量](https://wiki.asterisk.org/wiki/display/AST/Asterisk+Standard+Channel+Variables)
    - `CALLERID(name)`, `CALLERID(name)` 拨号者的名字和号码, 在 Dial 之前
    - `CHANNEL` 当前通道名
    - `CONTEXT` 当前上下文
    - `EXTEN` 当前扩展
    - `ENV(VAR)` 环境变量
    - `LEN(VAR)` 变量长度
    - `PRIORITY` 当前拨号计划的优先级
    - `UNIQUEID` 当前通话唯一标识符
- 表达式
  - `$[1+1]`
  - 操作符
    - `|`, `&`, `=`, `>=`, `<=`, `!=`, `>`, `<`, `+`, `-`
    - `! exp`, `- exp`
    - `a : b` 字符串正则匹配
      - 从头开始匹配
      - 前后的引号会被去除
      - 匹配成功, 如果有子表达式, 返回 `\1`, 否则返回匹配的字符数
      - 匹配失败, 如果有字表达式, 返回 `null`, 否则返回 0
    - `a =~ b`
      - 同 `:`, 但不从头开始匹配
    - `a ? b : c`
    - `a ~~ b`
      - 字符串链接
      - 会去除引号
  - 所有的数字均为浮点数, 表达浮点数必须要以 `D.D` 的形式, 转换为整数 `TRUNC`
- 参考
  - [AST/Dialplan](https://wiki.asterisk.org/wiki/display/AST/Dialplan)
  - [Asterisk Expressions](https://www.voip-info.org/wiki/view/Asterisk+Expressions)

```conf
; ==========
; 拨号计划格式
; ==========
exten => name,priority,application([arg1[,arg2...]])
; priority 可使用 n 替代 2,3,4,5,6..., 但 1 必须指定
;   n 也可以做算术运算,例如 n+200, 但不推荐使用
; 相同的名字可以使用 same => 替代

exten => 123,1,Answer()
  same => n,do something
  same => n,do something else
  same => n,do one last thing
  same => n,Hangup()

; 在扩展中可以给优先级指定标签,因此可以通过名字而不是一个数字来引用优先级
exten => 123,n(label),application()
; 处理所有无效的号码
exten => _.!,1,Verbose("Catch all for invalid numbers")
; 处理所有号码
exten => _.!,n,Verbose("Surprise - executed for all numbers!")

; 引入其他上下文
include => context

; 变量继承
exten => example,1,Set(_MyVariable=thisValue)
exten => example,1,Set(__MyVariable=thisValue)
; 在别的通道使用变量
exten => example,1,Verbose(1,Value of MyVariable is: ${MyVariable})
```

## 应用控制流

- Goto
  - 参数 named_priority; `[[context,]extension,]priority`
  - 跳转失败执行 `i` (invalid) extension
    - 不存在则执行 `h`
    - 不存在则直接 hangup
- GotoIf(condition?label1:label2)
- GotoIfTime(times,days_of_week,days_of_month,months?label)
  - time - 时间,24 小时制
  - `GotoIfTime(09:00-17:59,mon-fri,*,*?open,s,1)`
  - `GotoIfTime(09:00-11:59,sat,*,*?open,s,1)`
- `Gosub([context,[exten,]]priority[(arg1,[...][argN]]))`
- GosubIf(condition?labeliftrue:labeliffalse)
  - `GosubIf($["${CALLERID(num)}" = ""]?setcallerid,1)`
  - label 为 `[[context,]extension,]priority`
- `Return([value])`
- Macro(macroname,arg1,arg2...)
  - 实际执行为 `macro-macroname`, s extension
  - 执行 macro 会将 context 变为当前 macro
  - 最多 7 层
  - MACRO_EXTEN
  - MACRO_CONTEXT
  - MACRO_PRIORITY
  - ARG1...ARGN
  - MACRO_OFFSET - 结束时设置则会跳转到 MACRO_OFFSET+n+1 如果不存在调整 n+1
  - Macro 里不能使用 h - Gosub 可以
- MacroExit
- StackPop
  - 弹出栈 - 移除上一次 Gosub 位置
- `Exec(appname(arguments))`
- `ExecIf(expression?appiftrue:[appiffalse])`
- `ExecIfTime(times,weekdays,mdays,months,[timezone]?appname[(appargs]))`
- TryExec(appname(arguments))

```ini
  same => n,NoOp(Macro From ${MACRO_CONTEXT},${MACRO_EXTEN},${MACRO_PRIORITY})
  ; same => n,Goto(${MACRO_CONTEXT},${MACRO_EXTEN},${MATH(${MACRO_PRIORITY}+1,int)})
```

**Goto vs GoSub**

- Goto
  - 修改当前上下文
- GoSub
  - 保留当前上下文
  - 可以 Return

## 函数控制流

- `IF(expr?[true][:false])`
  - 例如 `exten => 123,1,Set(something=${IF($[2 > 1]?foo:bar)})`
- `IFTIME(times,days_of_week,days_of_month,months?[true][:false])`
- DIALPLAN_EXISTS(context,extension,priority)
- EXISTS(data)

## Demo

```conf
# 将拨打到 900X 的转发到 SIP, 并进行录音
exten => _900X,1,NoOp()
    same => n,Verbose(2, Forward call ${EXTEN})
    same => n,Verbose(2, Monitor file ${EXTEN}.${UNIQUEID}.wav)
    same => n,MixMonitor(${EXTEN}.${UNIQUEID}.wav,ab)
    same => n,Dial(SIP/${EXTEN},30,m())
    same => n,Log(NOTICE, Forward call ${EXTEN} result: ${DIALSTATUS})
    same => n,StopMixMonitor()
    same => n,GotoIf($["${DIALSTATUS}" = "BUSY"]?busy:unavailable)
    ; 占线
    same => n(busy),NoOp()
    same => n,Verbose(2, Failed Forward ${EXTEN}: Busy now)
    same => n,Playback(vm-no)
    same => n,Hangup()
    ; 无人接听
    same => n(unavailable),NoOp()
    same => n,Verbose(2, Failed Forward ${EXTEN}: No body)
    same => n,Playback(vm-nobodyavail)
    same => n,Hangup()
```

- 简单用于测试的拨号计划

```conf
[default]
exten => _9XXXXXX!,1,NoOp()
  same => n,Dial(DAHDI/g1/${EXTEN:1})
  same => n,Hangup()
exten => 1992,1,NoOp()
  same => n,Answer()
  same => n,Playback(demo-instruct)
  same => n,Hangup()

[from-pstn]
exten => _X!,1,NoOp()
  same => n,Answer()
  same => n,Playback(demo-instruct)
  same => n,Hangup()
```

## Command

```bash
# 请求发起通话
channel originate SIP/9001 extension 9002@public
```

- channel
  - `originate <tech/data> application <appname> [appdata]`
  - `originate <tech/data> extension [exten@][context]`
    - 发起通话
    - 发起通话时的 CALLER 需要调用者进行设置, 或者在 extension 中设置, 否则默认为 asterisk
    - 例如在 extension 中设置
      - `same => n,Set(CALLERID(num)=54321)`
      - `same => n,Set(CALLERID(name)=Asterisk)`
  - `redirect <channel> <[[context,]exten,]priority>`
    - 重定向一个通道到一个扩展
  - `hangup <channel>|<all>`
    - 挂断所有或单个通道

### AEL

- [Asterisk Extension Language](https://wiki.asterisk.org/wiki/pages/viewpage.action?pageId=4620445)
- [AEL version 2 BNF](https://wiki.asterisk.org/wiki/display/AST/AEL+version+2+BNF)
- [conf2ael](https://github.com/asterisk/asterisk/blob/master/utils/conf2ael.c)
  - conf 转 ael 工具
- [res/ael](https://github.com/asterisk/asterisk/tree/master/res/ael)
  - 源码

## Applications

- Answer()
  - 建立通道
- Playback(filename)
  - 播放预先录制好的声音文件
  - 预先附带的文件位于 /var/lib/asterisk/sounds, 但是是有语言限制的,主要注意
  - core show sounds 查看所有的, core show sound 查看单个
  - filename 可以是绝对路径,也可以是相对于音频文件夹的相对路径
  - filename 可以不带扩展类型,会尝试播放最好编码的文件
- Hangup([code])
  - code 为 ISDN cause code
- Progress()
  - 主要用于返回通话过程信息给对方,部分服务提供商可能对此有要求,当遇到奇怪问题的时候可以试试
- Goto(context,extension,priority)
- Goto(extension,priority)
- Goto(priority)
  - 跳转到其他的位置
- Background()
  - 在后台播放音频,但是是会等待 DTMF
  - 与 Playback 类似, 但用户马上可以做出操作而不是等待声音播放完成
- WaitExten([timeout])
  - 当 Background 播放完成后使用改程序等待 DTMF 数字输入
  - timeout 如果不传则会使用默认的, 参考 TIMEOUT()
  - 如果输入的扩展不存在则会使用 i 扩展
  - 如果超时了则会使用 t
- Dial(destination[,timeout[,option[,URI]]])
  - destination
    - DAHDI/1 模拟电话的 FXS 通道. DAHDI 技术, 资源(通道标识符) 1
    - SIP/0004F2001122
    - IAX2/Softphone
    - 同时多方拨号 DAHDI/1&SIP/0004F2001122&IAX2/Softphone, 但只会接通第一个
    - 远程 VoIP `technology/user[:password]@remote_host[:port][/remote_extension]`
  - 如果拨号失败会设置变量 DIALSTATUS 记录失败原因
  - DIALSTATUS
    - CHANUNAVAIL
    - CONGESTION
    - NOANSWER
    - BUSY
    - ANSWER
    - CANCEL
    - DONTCALL
    - TORTURE
    - INVALIDARGS
  - Digium 演示服务 Dial(DAHDI/[gGrR]channel_or_group[/remote_extension])
  - 例如 Dial(IAX2/guest@misery.digium.com/s)
  - 如果拨号成功则会桥接过去,而不会继续执行

```
exten => 502,1,Dial(DAHDI/1,10)
  ; 无人接听
  same => n,Playback(vm-nobodyavail)
  same => n,Hangup()
```

- option

  - `A(x)` 播放提示音文件 `x`
  - `b([[context^]exten^]priority[(arg1[^...][^argN])])`
    - 在呼出前跳转到指定位置, 使用新的通道
  - `B([[context^]exten^]priority[(arg1[^...][^argN])])`
    - 在呼出前跳转到指定位置, 使用当前通道
  - `R`
    - 重置当前 CDR
  - `c`

  t: Allow the called party to transfer the calling party by sending the DTMF
  sequence defined in "features.conf". This setting does not perform policy
  enforcement on transfers initiated by other methods.

  T: Allow the calling party to transfer the called party by sending the DTMF
  sequence defined in "features.conf". This setting does not perform policy
  enforcement on transfers initiated by other methods.

  - m,当在拨号时使用 moh 而不是对方的声音

- URI 很少使用, 在支持的环境下可能会打开该 URI 指向的网页
- 没有的参数可以留空 Dial(DAHDI/1,,m)
- Set()
  - 设置变量
  - 全局变量
  - 通道变量
    - \${EXTEN} 通道名
  - 环境变量(\${ENV(var)})
  - 变量操作
    - `${EXTEN:x}` 移除前面 x 位
    - `${EXTEN:x:y}` y 为长度
    - x,y 可以为负

```conf
exten => 301,1,Set(LEIF=SIP/0000FFFF0001)
  ; 对变量的应用
  same => n,Dial(${LEIF})
; 全局变量
[globals]
LEIF=SIP/0000FFFF0001

; 修改通道相关的变量
; gives the choice of (1) French, (2) Spanish, or (3) German
exten => s,1,Background(choose-language)
   same => n,WaitExten(5)
exten => 1,1,Set(CHANNEL(language)=fr)
exten => 2,1,Set(CHANNEL(language)=es)
exten => 3,1,Set(CHANNEL(language)=de)
; the next priority for extensions 1, 2, or 3 would be handled here
exten => _[123],n,Goto(menu,s,1)
```

- SayNumber(number)
  - 报数, number 不能过大
- SayDigits(digits)
  - 说出每个数字
- Verbose([level,]message)
  - `Verbose(2, Call from VoIP network to ${EXTEN})`
  - 日志
- Monitor/StopMonitor
- MixMonitor(filename.extension[,options[,command]])/StopMixMonitor
  - 通话录音
  - 建议使用 Mix, 因为 Monitor 只会录制进的或出的
  - 建议录制为 wav , 每天归档时可考虑转换为 ogg
  - 默认存放目录 `/var/spool/asterisk/monitor`

## Dial

- `Dial(PJSIP/${EXTEN})`
  - 呼叫 aor 对应的第一个 contact
- `Dial(${PJSIP_DIAL_CONTACTS(${EXTEN})})`
  - 呼叫 aor 对应的所有 contact
- `Dial(PJSIP/mytrunk/sip:${EXTEN:1}@203.0.113.1:5060)`
  - 指定线路和 URL
- `Dial(PJSIP/${EXTEN:1}@mytrunk)`
  - 选择 aor 中匹配线路的 contact

### Dial Help

```
-= Info about application 'Dial' =-

[Synopsis]
Attempt to connect to another device or endpoint and bridge the call.

[Description]
This application will place calls to one or more specified channels. As soon as
one of the requested channels answers, the originating channel will be
answered, if it has not already been answered. These two channels will then be
active in a bridged call. All other channels that were requested will then be
hung up.
Unless there is a timeout specified, the Dial application will wait
indefinitely until one of the called channels answers, the user hangs up, or if
all of the called channels are busy or unavailable. Dialplan execution will
continue if no requested channels can be called, or if the timeout expires.
This application will report normal termination if the originating channel
hangs up, or if the call is bridged and either of the parties in the bridge
ends the call.
If the ${OUTBOUND_GROUP} variable is set, all peer channels created by this
application will be put into that group (as in 'Set(GROUP()=...'). If the
${OUTBOUND_GROUP_ONCE} variable is set, all peer channels created by this
application will be put into that group (as in 'Set(GROUP()=...'). Unlike
${OUTBOUND_GROUP}, however, the variable will be unset after use.
Example: Dial with 30 second timeout

  same => n,Dial(PJSIP/alice,30)

Example: Parallel dial with 45 second timeout

  same => n,Dial(PJSIP/alice&PJIP/bob,45)

Example: Dial with 'g' continuation option

  same => n,Dial(PJSIP/alice,,g)
  same => n,Log(NOTICE, Alice call result: ${DIALSTATUS})

Example: Dial with transfer/recording features for calling party

  same => n,Dial(PJSIP/alice,,TX)

Example: Dial with call length limit

  same => n,Dial(PJSIP/alice,,L(60000:30000:10000))

Example: Dial alice and bob and send NO_ANSWER to bob instead of
ANSWERED_ELSEWHERE when alice answers

  same => n,Dial(PJSIP/alice&PJSIP/bob,,Q(NO_ANSWER))

Example: Dial with pre-dial subroutines

 [default]
 exten => callee_channel,1,NoOp()
  same => n,Log(NOTICE, I'm called on channel ${CHANNEL} prior to it starting
  the dial attempt)
  same => n,Return()
 exten => called_channel,1,NoOp()
  same => n,Log(NOTICE, I'm called on outbound channel ${CHANNEL} prior to it
  being used to dial someone)
  same => n,Return()
 exten => _X.,1,NoOp()
  same => n,Dial(PJSIP/alice,,b(default^called_channel^1)B(default^callee_chann
  l^1))
  same => n,Hangup()

Example: Dial with post-answer subroutine executed on outbound channel

 [default]
 exten => called_channel,1,NoOp()
  same => n,Playback(hello)
  same => n,Return()
 exten => _X.,1,NoOp()
  same => n,Dial(PJSIP/alice,,U(default^called_channel^1))
  same => n,Hangup()

Example: Dial into ConfBridge using 'G' option

  same => n,Dial(PJSIP/alice,,G(jump_to_here))
  same => n(jump_to_here),Goto(confbridge)
  same => n,Goto(confbridge)
  same => n(confbridge),ConfBridge(${EXTEN})

This application sets the following channel variables:
${DIALEDTIME}: This is the time from dialing a channel until when it is
disconnected.
${ANSWEREDTIME}: This is the amount of time for actual call.
${DIALEDPEERNAME}: The name of the outbound channel that answered the call.
${DIALEDPEERNUMBER}: The number that was dialed for the answered outbound
channel.
${FORWARDERNAME}: If a call forward occurred, the name of the forwarded
channel.
${DIALSTATUS}: This is the status of the call
    CHANUNAVAIL
    CONGESTION
    NOANSWER
    BUSY
    ANSWER
    CANCEL
    DONTCALL: For the Privacy and Screening Modes. Will be set if the called
    party chooses to send the calling party to the 'Go Away' script.
    TORTURE: For the Privacy and Screening Modes. Will be set if the called
    party chooses to send the calling party to the 'torture' script.
    INVALIDARGS

[Syntax]
Dial(Technology/Resource[&Technology2/Resource2[&...]][,timeout[,options[,URL]]])

[Arguments]
Technology/Resource
    Specification of the device(s) to dial.  These must be in the format of
    'Technology/Resource', where <Technology> represents a particular channel
    driver, and <Resource> represents a resource available to that particular
    channel driver.
Technology2/Resource2
    Optional extra devices to dial in parallel
    If you need more than one enter them as Technology2/Resource2&Technology3/R
    source3&.....
timeout
    Specifies the number of seconds we attempt to dial the specified devices.
    If not specified, this defaults to 136 years.
options
    A(x):
        x - The file to play to the called party
Play an announcement to the called party, where <x> is the prompt to be played

    a: Immediately answer the calling channel when the called channel answers
    in all cases. Normally, the calling channel is answered when the called
    channel answers, but when options such as 'A()' and 'M()' are used, the
    calling channel is not answered until all actions on the called channel
    (such as playing an announcement) are completed.  This option can be used
    to answer the calling channel before doing anything on the called channel.
    You will rarely need to use this option, the default behavior is adequate
    in most cases.

    b([[context^]exten^]priority[(arg1[^...][^argN])]): Before initiating an
    outgoing call, 'Gosub' to the specified location using the newly created
    channel.  The 'Gosub' will be executed for each destination channel.

    B([[context^]exten^]priority[(arg1[^...][^argN])]): Before initiating the
    outgoing call(s), 'Gosub' to the specified location using the current
    channel.

    C: Reset the call detail record (CDR) for this call.

    c: If the Dial() application cancels this call, always set ${HANGUPCAUSE}
    to 'answered elsewhere'

    d: Allow the calling user to dial a 1 digit extension while waiting for a
    call to be answered. Exit to that extension if it exists in the current
    context, or the context defined in the ${EXITCONTEXT} variable, if it
    exists.
    NOTE: Many SIP and ISDN phones cannot send DTMF digits until the call is
    connected.  If you wish to use this option with these phones, you can use
    the 'Answer' application before dialing.

    D([called][:calling[:progress]]): Send the specified DTMF strings *after*
    the called party has answered, but before the call gets bridged.  The
    <called> DTMF string is sent to the called party, and the <calling> DTMF
    string is sent to the calling party.  Both arguments can be used alone.  If
    <progress> is specified, its DTMF is sent to the called party immediately
    after receiving a 'PROGRESS' message.
    See 'SendDTMF' for valid digits.

    e: Execute the 'h' extension for peer after the call ends

    f([x]): If <x> is not provided, force the CallerID sent on a call-forward
    or deflection to the dialplan extension of this 'Dial()' using a dialplan
    'hint'. For example, some PSTNs do not allow CallerID to be set to anything
    other than the numbers assigned to you. If <x> is provided, force the
    CallerID sent to <x>.

    F([[context^]exten^]priority): When the caller hangs up, transfer the
    *called* party to the specified destination and *start* execution at that
    location.
    NOTE: Any channel variables you want the called channel to inherit from the
    caller channel must be prefixed with one or two underbars ('_').

    F: When the caller hangs up, transfer the *called* party to the next
    priority of the current extension and *start* execution at that location.
    NOTE: Any channel variables you want the called channel to inherit from the
    caller channel must be prefixed with one or two underbars ('_').
    NOTE: Using this option from a Macro() or GoSub() might not make sense as
    there would be no return points.

    g: Proceed with dialplan execution at the next priority in the current
    extension if the destination channel hangs up.

    G([[context^]exten^]priority): If the call is answered, transfer the
    calling party to the specified <priority> and the called party to the
    specified <priority> plus one.
    NOTE: You cannot use any additional action post answer options in
    conjunction with this option.

    h: Allow the called party to hang up by sending the DTMF sequence defined
    for disconnect in "features.conf".

    H: Allow the calling party to hang up by sending the DTMF sequence defined
    for disconnect in "features.conf".
    NOTE: Many SIP and ISDN phones cannot send DTMF digits until the call is
    connected.  If you wish to allow DTMF disconnect before the dialed party
    answers with these phones, you can use the 'Answer' application before
    dialing.

    i: Asterisk will ignore any forwarding requests it may receive on this dial
    attempt.

    I: Asterisk will ignore any connected line update requests or any
    redirecting party update requests it may receive on this dial attempt.

    k: Allow the called party to enable parking of the call by sending the DTMF
    sequence defined for call parking in "features.conf".

    K: Allow the calling party to enable parking of the call by sending the
    DTMF sequence defined for call parking in "features.conf".

    L(x[:y[:z]]):
        x - Maximum call time, in milliseconds

        y - Warning time, in milliseconds

        z - Repeat time, in milliseconds
Limit the call to <x> milliseconds. Play a warning when <y> milliseconds are
left. Repeat the warning every <z> milliseconds until time expires.
    This option is affected by the following variables:
        ${LIMIT_PLAYAUDIO_CALLER}:
            yes
            no
            If set, this variable causes Asterisk to play the prompts to the
            caller.
        ${LIMIT_PLAYAUDIO_CALLEE}:
            yes
            no
            If set, this variable causes Asterisk to play the prompts to the
            callee.
        ${LIMIT_TIMEOUT_FILE}:
            filename
            If specified, <filename> specifies the sound prompt to play when
            the timeout is reached. If not set, the time remaining will be
            announced.
        ${LIMIT_CONNECT_FILE}:
            filename
            If specified, <filename> specifies the sound prompt to play when
            the call begins. If not set, the time remaining will be announced.
        ${LIMIT_WARNING_FILE}:
            filename
            If specified, <filename> specifies the sound prompt to play as a
            warning when time <x> is reached. If not set, the time remaining
            will be announced.

    m([class]): Provide hold music to the calling party until a requested
    channel answers. A specific music on hold <class> (as defined in
    "musiconhold.conf") can be specified.

    M(macro[^arg[^...]]):
        macro - Name of the macro that should be executed.

        arg - Macro arguments
Execute the specified <macro> for the *called* channel before connecting to the
calling channel. Arguments can be specified to the Macro using '^' as a
delimiter. The macro can set the variable ${MACRO_RESULT} to specify the
following actions after the macro is finished executing:
        ${MACRO_RESULT}: If set, this action will be taken after the macro
        finished executing.
            ABORT: Hangup both legs of the call
            CONGESTION: Behave as if line congestion was encountered
            BUSY: Behave as if a busy signal was encountered
            CONTINUE: Hangup the called party and allow the calling party to
            continue dialplan execution at the next priority
            GOTO:[[<context>^]<exten>^]<priority>: Transfer the call to the
            specified destination.
    NOTE: You cannot use any additional action post answer options in
    conjunction with this option. Also, pbx services are run on the peer
    (called) channel, so you will not be able to set timeouts via the
    'TIMEOUT()' function in this macro.
    WARNING!!!: Be aware of the limitations that macros have, specifically with
    regards to use of the 'WaitExten' application. For more information, see
    the documentation for 'Macro()'.

    n([delete]):
        delete - With <delete> either not specified or set to '0', the recorded
        introduction will not be deleted if the caller hangs up while the
        remote party has not yet answered.
 - With <delete> set to '1', the introduction will always be deleted.
This option is a modifier for the call screening/privacy mode. (See the 'p' and
'P' options.) It specifies that no introductions are to be saved in the
"priv-callerintros" directory.

    N: This option is a modifier for the call screening/privacy mode. It
    specifies that if CallerID is present, do not screen the call.

    o([x]): If <x> is not provided, specify that the CallerID that was present
    on the *calling* channel be stored as the CallerID on the *called* channel.
    This was the behavior of Asterisk 1.0 and earlier. If <x> is provided,
    specify the CallerID stored on the *called* channel. Note that
    'o(${CALLERID(all)})' is similar to option 'o' without the parameter.

    O([mode]):
        mode - With <mode> either not specified or set to '1', the originator
        hanging up will cause the phone to ring back immediately.
 - With <mode> set to '2', when the operator flashes the trunk, it will ring
 their phone back.
Enables *operator services* mode.  This option only works when bridging a DAHDI
channel to another DAHDI channel only. if specified on non-DAHDI interfaces, it
will be ignored. When the destination answers (presumably an operator services
station), the originator no longer has control of their line. They may hang up,
but the switch will not release their line until the destination party (the
operator) hangs up.

    p: This option enables screening mode. This is basically Privacy mode
    without memory.

    P([x]): Enable privacy mode. Use <x> as the family/key in the AstDB
    database if it is provided. The current extension is used if a database
    family/key is not specified.

    Q(cause): Specify the Q.850/Q.931 <cause> to send on unanswered channels
    when another channel answers the call. As with 'Hangup()', <cause> can be a
    numeric cause code or a name such as 'NO_ANSWER', 'USER_BUSY',
    'CALL_REJECTED' or 'ANSWERED_ELSEWHERE' (the default if Q isn't specified).
    You can also specify '0' or 'NONE' to send no cause.  See the "causes.h"
    file for the full list of valid causes and names.
    NOTE: chan_sip does not support setting the cause on a CANCEL to anything
    other than ANSWERED_ELSEWHERE.

    r([tone]): Default: Indicate ringing to the calling party, even if the
    called party isn't actually ringing. Pass no audio to the calling party
    until the called channel has answered.
        tone - Indicate progress to calling party. Send audio 'tone' from the
        "indications.conf" tonezone currently in use.

    R: Default: Indicate ringing to the calling party, even if the called party
    isn't actually ringing.  Allow interruption of the ringback if early media
    is received on the channel.

    S(x): Hang up the call <x> seconds *after* the called party has answered
    the call.

    s(x): Force the outgoing CallerID tag parameter to be set to the string
    <x>.
    Works with the 'f' option.

    t: Allow the called party to transfer the calling party by sending the DTMF
    sequence defined in "features.conf". This setting does not perform policy
    enforcement on transfers initiated by other methods.

    T: Allow the calling party to transfer the called party by sending the DTMF
    sequence defined in "features.conf". This setting does not perform policy
    enforcement on transfers initiated by other methods.

    U(x[^arg[^...]]):
        x - Name of the subroutine to execute via 'Gosub'

        arg - Arguments for the 'Gosub' routine
Execute via 'Gosub' the routine <x> for the *called* channel before connecting
to the calling channel. Arguments can be specified to the 'Gosub' using '^' as
a delimiter. The 'Gosub' routine can set the variable ${GOSUB_RESULT} to
specify the following actions after the 'Gosub' returns.
        ${GOSUB_RESULT}:
            ABORT: Hangup both legs of the call.
            CONGESTION: Behave as if line congestion was encountered.
            BUSY: Behave as if a busy signal was encountered.
            CONTINUE: Hangup the called party and allow the calling party to
            continue dialplan execution at the next priority.
            GOTO:[[<context>^]<exten>^]<priority>: Transfer the call to the
            specified destination.
    NOTE: You cannot use any additional action post answer options in
    conjunction with this option. Also, pbx services are run on the peer
    (called) channel, so you will not be able to set timeouts via the
    'TIMEOUT()' function in this routine.

    u(x):
        x - Force the outgoing callerid presentation indicator parameter to be
        set to one of the values passed in <x>: 'allowed_not_screened'
        'allowed_passed_screen' 'allowed_failed_screen' 'allowed'
        'prohib_not_screened' 'prohib_passed_screen' 'prohib_failed_screen'
        'prohib' 'unavailable'
Works with the 'f' option.

    w: Allow the called party to enable recording of the call by sending the
    DTMF sequence defined for one-touch recording in "features.conf".

    W: Allow the calling party to enable recording of the call by sending the
    DTMF sequence defined for one-touch recording in "features.conf".

    x: Allow the called party to enable recording of the call by sending the
    DTMF sequence defined for one-touch automixmonitor in "features.conf".

    X: Allow the calling party to enable recording of the call by sending the
    DTMF sequence defined for one-touch automixmonitor in "features.conf".

    z: On a call forward, cancel any dial timeout which has been set for this
    call.

URL
    The optional URL will be sent to the called party if the channel driver
    supports it.

[See Also]
RetryDial(), SendDTMF(), Gosub(), Macro()
```
