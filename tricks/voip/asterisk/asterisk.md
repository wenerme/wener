# Asterisk

* [源码](https://gerrit.asterisk.org/)
* 语音文件 https://www.asterisksounds.org
* Asterisk NOW
  * 是一个立即可用的系统镜像
  * [下载](http://www.asterisk.org/downloads/asterisknow-6-64)
* Asterisk
  * [文档](https://wiki.asterisk.org/wiki/display/AST/Home)
  * http://www.asterisk.org/community/documentation
  * https://github.com/asterisk/asterisk
  * https://wiki.asterisk.org/wiki/display/AST/Home
  * https://wiki.asterisk.org/wiki/display/AST/Asterisk+Architecture%2C+The+Big+Picture

https://store.docker.com/community/images/luar/asterisk
https://wiki.alpinelinux.org/wiki/FreePBX





## 服务端
* Asterisk
* Elastix
* FreePBX
* FreeSwitch
* Trixbox
* Yate
* PBX in a Flash
* IPPBX/IVR

http://wiki.alpinelinux.org/wiki/FaxServer_using_Asterisk

## 客户端
* Softphone
  * ring.cx GNU
  * x.lite
* 协议
  http://www.pjsip.org/
  http://sipml5.org/
  http://wiki.freepbx.org/display/FPG/Extensions+Module+-+PJSIP+Extension

http://www.studyweb.com/wide-open-voip-top-50-open-source-voip-apps/
* [SIP-Client for Raspberry Pi that works from command line?](http://stackoverflow.com/a/29715067/1870054)

http://www.linphone.org/technical-corner/ortp/overview

## 硬件
* PSTN(E1) -> 数字 -> Asterisk -> 模拟 -> FXS -> 座机
* [Digium Board selector](https://store.digium.com/boards)
* 电信光纤 -> ?
  * 电信光纤是怎么转成电话的,是转的数字还是模拟
  * 怎么在同一个光纤中支持多个通道
* 转换器接口类型
  * PCI
  * PCIe
  * USB
    * 较少
* OpenVox
* 回音消除/EC/Echo Cancelation
* RJ48
* RJ45

https://www.voip-info.org/wiki/view/Analog+Telephone+Adapters
http://www.synway.cn/
http://www.synway.cn/index.php/product/product-list/14

三汇CTI语音产品分为SHT模拟语音卡、SHD数字中继卡、SHN VOIP语音卡、SHF系列传真卡

SHD-30C-CT/PCI
SHD系列数字中继卡，可分为C型、D型号、E型号、CAS卡，四种类型。C型/D型数字卡，是一种采用PCI总线的数字中继线语音卡，该系列语音卡可以实现采用E1/T1数字中继线接 入的电话语音处理系统所需的绝大部分功能。D型数字卡增强了回波抵消的能力；同时，采用的DMA数据读写方式具有传输速率高和CPU占用率小的优点，进一步提高了系统性能。E型数字中继卡，是采用PCIe总线，CAS语音卡包含SHD-120D-CT/PCI/CAS、SHD-240D-CT/PCI /CAS等2种语音卡，是一种采用PCI总线的数字中继线语音卡，支持E1模式下1号信令的呼叫接续。 - See more at: http://www.synway.cn/index.php/product/product-content/14/203#sthash.oi5mAdNR.dpuf

## Tips
```bash
# 一个基于 Ubuntu 的 freepbx 容器
docker run --net=host -it --name freepbx jmar71n/freepbx
```

* /etc/asterisk/modules.conf

* 模块类型
* Applications
  * app_
* Bridging modules
  * bridge_
* Call detail recording (CDR) modules
  * cdr_
* Channel event logging (CEL) modules
  * cel_
* Channel drivers
  * chan_
* Codec translators
  * codec_
* Format interpreters
  * format_
* Dialplan functions
  * func_
* PBX modules
  * pbx_
* Resource modules
  * res_
* Add-on modules
* Test modules

* 文件结构
  * 配置
    * /etc/asterisk
  * 模块
    * /usr/lib/asterisk/modules
  * 资源库
    * /var/lib/asterisk
  * spool
    * /var/spool/asterisk
    * 存储临时数据
    * 语言信息, 通话记录, 通话文件等
  * 日志
    * /var/log/asterisk
    * cdr,cel,debug,队列,消息,错误等
  * Dialplan
    * 传统方式 /etc/asterisk/extensions.conf
    * Asterisk Extension Logic (AEL) in /etc/asterisk/extensions.ael
    * Lua /etc/asterisk/extensions.lua
  * 硬件
    * 常见的厂商 Digium (the sponsor, owner, and primary developer of Asterisk), Sangoma, Rhino, OpenVox, Pika, Voicetronix, Junghanns, Dialogic, Xorcom, beroNet
    * Digium Asterisk Hardware Device Interface - DAHDI

```bash
apk add asterisk
apk add asterisk-{alsa,cdr-mysql,chan-dongle,curl,dahdi,dbg,dev,doc,fax,mobile,sample-config,sounds-en,sounds-moh,speex,srtp,tds}
asterisk -cvvv
#> module show
#> core stop now
# -c 在前台运行
# -v, -vv, -vvv, -vvvv 详细程度 0-5
# -d, -dd, -ddd, -dddd 日志级别, logger.conf
# -r 远程连接, exit 退出
# -T 在 CLI 输出上添加时间戳
# -x 执行的命令 asterisk -rx 'core show channels'
# -g 如果崩溃了,则生成一个转储文件
```

sip show users
sip show peers               Show all SIP peers (including friends)
sip show registry            Show status of hosts we register with
sip set debug on             Show all SIP messages
sip reload                   Reload configuration file
sip show settings            Show the current channel configuration
iax2 reload
iax2 show peers
iax2 show users

* 基础配置
  * asterisk.conf
    * directories
    * options
    * files
    * compact
  * modules.conf
    * modules
  * indications.conf
  * musiconhold.conf
* 通道配置
  * sip.conf
  * iax.conf

__asterisk.conf [directories]__
Option | Value/Example | Notes
-------|----|----
astetcdir   | /etc/asterisk             | 配置存储目录
astmoddir   | /usr/lib/asterisk/modules | 加载模块的目录
astvarlibdir| /usr/lib/asterisk         | 其他状态信息存储的基础目录.也包含运行时写出的内容
astdbdir    | /var/lib/asterisk         | 会将内部数据库 astdb 存储于该目录
astkeydir   | /var/lib/asterisk         | 会使用该目录下的 keys 子目录来加载加密使用的秘钥
astdatadir  | /var/lib/asterisk         | 系统提供数据的基础目录,例如声音文件.
astagidir   | /var/lib/asterisk/agi-bin | 会使用该目录下的 agi-bin 子目录作为默认加载 AGI 脚本的位置
astspooldir | /var/spool/asterisk       | 语音邮件,通话记录,和通话相关的 spool 存储位置
astrundir   | /var/run/asterisk         | 存储 unix socket 和 pid 文件的位置
astlogdir   | /var/log/asterisk         | 日志文件存储位置


__sip.conf type__
type | Description
-----|----
peer    | 使用来源请求的 IP 和端口来匹配配置
user    | 使用 SIP 来源请求 From 头中的用户名来匹配 sip.conf 中同样名字的配置段例如 `[wener]`.
friend  | 同时使用 peer 和 user. 对于 SIP 电话来说这是最常用的设置.

;	1. Asterisk checks the SIP From: address username and matches against
;	   names of devices with type=user
;	   The name is the text between square brackets [name]
;	2. Asterisk checks the From: addres and matches the list of devices
;	   with a type=peer
;	3. Asterisk checks the IP address (and port number) that the INVITE
;	   was sent from and matches against any devices with type=peer

sip
default is port 5060 for UDP and TCP, 5061
; for TLS).

SIP 由三部分组成
1) the SIP connection (signaling for the call),
2) the outgoing audio stream (RTP),
3) the incoming audio stream (RTP).


Asterisk as a B2BUA
B2BUA (Back to Back User Agent)

部分 VoIP 支持 T.38 faxing protocol, 但更好的做法是 Fax over IP server

http://www.voipsupply.com/voip-adapter-overview




Digium Phone Module for Asterisk (DPMA)
a proprietary technology which allows a secure connection between an Asterisk system and a Digium telephone

注册主要是为了在网络上标识自己,而不是授权,标识自己后才能接收到来电.
授权是在每次拨号时触发,一个座机可以未注册但也可以拨号,不过此时无法接到来电.


MOH
https://www.jamendo.com/start

http://www.thegeekstuff.com/2009/05/sound-exchange-sox-15-examples-to-manipulate-audio-files
https://linux.die.net/man/1/rec
https://www.voip-info.org/wiki/view/Asterisk+config+musiconhold.conf

https://github.com/bg111/asterisk-chan-dongle
http://chan-dongle.blogspot.hk/2017/02/list-of-supported-models.html
https://github.com/bg111/asterisk-chan-dongle/wiki/Requirements-and-Limitations

https://web.archive.org/web/20150821112735/http://wiki.e1550.mobi/doku.php?id=compatible_usb_hubs




```bash
sox SilentCity.mp3 -t raw -r 8000 -s -2 -c 1 SilentCity.sln
cp *.sln /var/lib/asterisk/moh
asterisk -rx "module reload res_musiconhold.so"

# exten => 664,1,NoOp()
#     same => n,Progress()
#     same => n,MusicOnHold()

lame --decode music.mp3 music.wav
sox -V music.wav -r 8000 -c 1 -w music.raw
sox -V music.wav -r 8000 -c 1 -w music.gsm

for i in *.wav; do \
sox $i -r 8000 -c 1 $(basename $i .wav).raw; \
sox $i -r 8000 -c 1 $(basename $i .wav).gsm; \
done
rm *.wav
```

Dialplan
* dialplan reload
* cointext 名字长度为 80, 但有最后一位 null, 所以是 79
* [general] and [globals] 特殊
* 避免使用  [general], [default], and [globals] 作为名字
* The context is the point in the dialplan where connections from that channel will begin.
* channel 中 context 名字是链接开始的点
* 推荐使用非数字而是具体含义的名字作为不可拨号的扩展名

```
exten => name,priority,application()
; priority 可使用 n 替代 2,3,4,5,6..., 但 1 必须指定
;   n 也可以做算术运算,例如 n+200, 但不推荐使用
; 相同的名字可以使用 same => 替代

exten => 123,1,Answer()
  same => n,do something
  same => n,do something else
  same => n,do one last thing
  same => n,Hangup()

exten => 123,n(label),application()
; 在扩展中可以给优先级指定标签,因此可以通过名字而不是一个数字来引用优先级
```

Applications
Answer()
  建立通道
Playback(filename)
  播放预先录制好的声音文件
  预先附带的文件位于 /var/lib/asterisk/sounds, 但是是有语言限制的,主要注意
  core show sounds 查看所有的, core show sound 查看单个
  filename 可以是绝对路径,也可以是相对于音频文件夹的相对路径
  filename 可以不带扩展类型,会尝试播放最好编码的文件
Hangup([code])
  code 为 ISDN cause code
Progress()
  主要用于返回通话过程信息给对方,部分服务提供商可能对此有要求,当遇到奇怪问题的时候可以试试
Goto(context,extension,priority)
Goto(extension,priority)
Goto(priority)
  跳转到其他的位置
Background()
  在后台播放音频,但是是会等待 DTMF
  与 Playback, 但用户马上可以做出操作而不是等待声音播放完成
WaitExten([timeout])
  当 Background 播放完成后使用改程序等待 DTMF 数字输入
  timeout 如果不传则会使用默认的, 参考 TIMEOUT()
  如果输入的扩展不存在则会使用 i 扩展
  如果超时了则会使用 t
Dial(destination[,timeout[,option[,URI]]])
  destination
    DAHDI/1 模拟电话的 FXS 通道. DAHDI 技术, 资源(通道标识符) 1
    SIP/0004F2001122
    IAX2/Softphone
    同时多方拨号 DAHDI/1&SIP/0004F2001122&IAX2/Softphone, 但只会接通第一个
    远程 VoIP `technology/user[:password]@remote_host[:port][/remote_extension]`
  如果拨号失败会设置变量 DIALSTATUS 记录失败原因
  Digium 演示服务 Dial(DAHDI/[gGrR]channel_or_group[/remote_extension])
  例如 Dial(IAX2/guest@misery.digium.com/s)
  如果拨号成功则会桥接过去,而不会继续执行
```
exten => 502,1,Dial(DAHDI/1,10)
  ; 无人接听
  same => n,Playback(vm-nobodyavail)
  same => n,Hangup()
```
  option 有非常多,例如 m,当在拨号时使用 moh 而不是对方的声音
  URI 很少使用, 在支持的环境下可能会打开该 URI 指向的网页
  没有的参数可以留空 Dial(DAHDI/1,,m)
Set()
  设置变量
  全局变量
  通道变量
    ${EXTEN} 通道名
  环境变量(${ENV(var)})
  变量操作
    `${EXTEN:x}` 移除前面 x 位
    `${EXTEN:x:y}` y 为长度
    x,y 可以为负
```
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
SayNumber(number)
  报数, number 不能过大
SayDigits(digits)
  说出每个数字
Verbose(2, Call from VoIP network to ${EXTEN})
  日志

模式匹配
  以 _ 开头
  X => [0-9]
  Z => [1-9]
  N => [2-9]
  [15-7] => [15-7] 匹配单个数字, 1 或者 5,6,7
  . => .+ 匹配一个或多个任意字符
  ! => .*

引入其他上下文
```
include => context
```

外部连通性


```
[globals]
LOCAL=DAHDI/G0           ; assuming you have a PSTN card in your system
TOLL=SIP/YourVoipCarrier ; as defined in sip.conf

; 匹配外部电话
[external]
exten => _NXXNXXXXXX,1,Dial(${LOCAL}/${EXTEN}) ; 10-digit pattern match for NANP
exten => _NXXXXXX,1,Dial(${LOCAL}/${EXTEN})    ; 7-digit pattern match for NANP
exten => _1NXXNXXXXXX,1,Dial(${TOLL}/${EXTEN}) ; Long-distance pattern match
                                               ; for NANP
exten => _011.,1,Dial(${TOLL}/${EXTEN})        ; International pattern match for
                                               ; calls made from NANP
; This section is functionally the same as the above section.
; It is for people who like to dial '9' before their calls
exten => _9NXXNXXXXXX,1,Dial(${LOCAL}/${EXTEN:1})
exten => _9NXXXXXX,1,Dial(${LOCAL}/${EXTEN:1})
exten => _91NXXNXXXXXX,1,Dial(${TOLL}/${EXTEN:1})
exten => _9011.,1,Dial(${TOLL}/${EXTEN:1})

; 该上下文中允许对外拨号
[LocalSets]
include => external


; 本地通道
; https://wiki.asterisk.org/wiki/display/AST/Local+Channel
[LocalSets]
exten => 107,1,Verbose(2,Dialing multiple locations with time delay)
  ; *** This all needs to be on a single line
  same => n,Dial(Local/channel_1@TimeDelay&Local/channel_2@TimeDelay&Local/channel_3@TimeDelay,40)
  same => n,Hangup()

[TimeDelay]
exten => channel_1,1,Verbose(2,Dialing the first channel)
  same => n,Dial(SIP/0000FFFF0001,20)
  same => n,Hangup()

exten => channel_2,1,Verbose(2,Dialing the second channel with a delay)
  same => n,Wait(10)
  same => n,Dial(DAHDI/g0/14165551212)

exten => channel_3,1,Verbose(2,Dialing the third channel with a delay)
  same => n,Wait(15)
  same => n,Dial(SIP/MyITSP/12565551212,15)
  same => n,Hangup()
```

AstDB
Berkeley database

```
; database put <family> <key> <value>.
; database get <family> <key>
; database del <key>
; database deltree <family>

exten => 456,1,NoOp()
  same => n,Set(DB(test/count)=1)
  same => n,Set(COUNT=${DB(test/count)}) same => n,Answer()
  same => n,SayNumber(${COUNT})

; deletes the key and returns its value in one step
exten => 457,1,Verbose(0, The value was ${DB_DELETE(test/count)})

exten => 457,1,DBdeltree(test)
```

__HotDesking__

```
[HotDesking]
; Control extension range using pattern matches
; Login with 71XX will logout existing extension at this location
; and log this device in with new extension.
; Logoff with 7000 from any device.
;
; 使用模式匹配控制扩展
; 71XX 会注销当前位置现有扩展,并将还设备记录到新的扩展
; 7000 会进行设备注销
exten => 7000,1,Verbose(2,Attempting logoff from device ${CHANNEL(peername)})
  same => n,Set(PeerName=${CHANNEL(peername)})
  same => n,Set(CurrentExtension=${DB(HotDesk/${PeerName})})
  same => n,GoSubIf($[${EXISTS(${CurrentExtension})}]? subDeviceLogoff,1(${PeerName},${CurrentExtension}):loggedoff)
  same => n,GotoIf($[${GOSUB_RETVAL} = 0]?loggedoff)
  same => n,Playback(an-error-has-occurred)
  same => n,Hangup()
  same => n(loggedoff),Playback(silence/1&agent-loggedoff)
  same => n,Hangup()

exten => _71XX,1,Verbose(2,Attempting to login device ${CHANNEL(peername)} to extension ${EXTEN:1})
  same => n,Set(NewPeerName=${CHANNEL(peername)})
  same => n,Set(NewExtension=${EXTEN:1})
; Check if existing extension is logged in for this device (NewPeerName)
; -- If existing extension exists (ExistingExtension)
;    -- get existing device name
;       -- If no existing device
;          -- (login) as we'll overwrite existing extension for this device
;       -- If existing device name
;          -- logoff ExistingExtension + ExistingDevice
;             -- Goto check_device ---------------------------------------+
; -- If no existing extension exists                                      |
;    -- Check if existing device is logged in for this extension          |
;       (NewExtension) <-----------------------------------------------+
;       -- If existing device exists
;          -- Get existing extension
;             -- If extension exists
;                -- Logoff Device + Extension
;                   -- Login
;             -- If no extension exists
;                -- Remove device from AstDB
;                   -- Login
;       -- If no device exists for NewExtension
;           -- Login

; Tests:
; * Login 100 to 0000FFFF0001
; * Login 101 to 0000FFFF0001 (Result: Only 101 logged in)
; * Login 101 to 0000FFFF0002 (Result: Only 101 logged in to new location)
; * Login 100 to 0000FFFF0001 (Result: Both 100 and 101 logged in)
; * Login 100 to 0000FFFF0002 (Result: Only 100 logged into 0000FFFF0002
;                                      -- change locations)
; * Login 100 to 0000FFFF0001 (Result: Only 100 logged in)
   same => n,Set(ExistingExtension=${DB(HotDesk/${NewPeerName})})
   same => n,GotoIf($[${EXISTS(${ExistingExtension})}]?get_existing_device)
   same => n(check_device),NoOp()
   same => n,Set(ExistingDevice=${DB(HotDesk/${NewExtension})})
   same => n,GotoIf($[${EXISTS(${ExistingDevice})}]?get_existing_extension)
   same => n,NoOp(Nothing to logout)
   same => n,Goto(login)
   same => n(get_existing_device),NoOp()
   same => n,Set(ExistingDevice=${DB(HotDesk/${ExistingExtension})})
   same => n,GotoIf($[${ISNULL(${ExistingDevice})}]?login)
   same => n,GoSub(subDeviceLogoff,1(${ExistingDevice},${ExistingExtension}))
   same => n,GotoIf($[${GOSUB_RETVAL} = 0]?check_device)
   same => n,Playback(silence/1&an-error-has-occurred)
   same => n,Hangup()
   same => n(get_existing_extension),NoOp()
   same => n,Set(ExistingExtension=${DB(HotDesk/${ExistingDevice})})
   same => n,GoSubIf($[${EXISTS(${ExistingExtension})}]? subDeviceLogoff,1(${ExistingDevice},${ExistingExtension}):remove_device)
   same => n,GotoIf($[${GOSUB_RETVAL} = 0]?loggedoff)
   same => n,Playback(silence/1&an-error-has-occurred)
   same => n,Hangup()
   same => n(remove_device),NoOp()
   same => n,Set(Result=${DB_DELETE(HotDesk/${ExistingDevice})})
   same => n,Goto(loggedoff)
   same => n(loggedoff),Verbose(2,Existing device and extensions have been logged off prior to login)
   same => n(login),Verbose(2,Now logging in extension ${NewExtension} to device ${NewPeerName})
   same => n,GoSub(subDeviceLogin,1(${NewPeerName},${NewExtension}))
   same => n,GotoIf($[${GOSUB_RETVAL} = 0]?login_ok)
   same => n,Playback(silence/1&an-error-has-occurred)
   same => n,Hangup()
   same => n(login_ok),Playback(silence/1&agent-loginok)
   same => n,Hangup()
; 设备注销
; subDeviceLogoff(PeerName,Extension)
; 返回 尚未注册 -1, 注销成功 0
exten => subDeviceLogoff,1,NoOp()
  same => n,Set(LOCAL(PeerName)=${ARG1})
  same => n,Set(LOCAL(Extension)=${ARG2})
  same => n,ExecIf($[${ISNULL(${LOCAL(PeerName)})} | ${ISNULL(${LOCAL(Extension)})}]?Return(-1))
  same => n,Set(PeerNameResult=${DB_DELETE(HotDesk/${LOCAL(PeerName)})})
  same => n,Set(ExtensionResult=${DB_DELETE(HotDesk/${LOCAL(Extension)})})
  same => n,Return(0)

exten => subDeviceLogin,1,NoOp()
   same => n,Set(LOCAL(PeerName)=${ARG1})
   same => n,Set(LOCAL(Extension)=${ARG2})
   same => n,ExecIf($[${ISNULL(${LOCAL(PeerName)})} | ${ISNULL(${LOCAL(Extension)})}]?Return(-1))
   same => n,Set(DB(HotDesk/${LOCAL(PeerName)})=${LOCAL(Extension)})
  same => n,Set(DB(HotDesk/${LOCAL(Extension)})=${LOCAL(PeerName)})
  same => n,Set(ReturnResult=${IF($[${DB_EXISTS(HotDesk/${LOCAL(PeerName)})} & ${DB_EXISTS(HotDesk/${LOCAL(Extension)})}]?0:-1)})
  same => n,Return(${ReturnResult})
```

```
; Zapateller
; 对于特定的情况播放特定的音频
exten => s,1,NoOp()
  same => n,Zapateller(nocallerid)
  same => n,Playback(enter-ext-of-person)

; Call Parking
[incoming]
include => parkedcalls
exten => 103,1,Dial(SIP/Bob,,tT)
exten => 104,1,Dial(SIP/Charlie,,tT)
```


传统 PSTN 线路: 模拟和数字
模拟技术
  没有信号通道,大多数信号通道是电子的
  断开连接通常需要几秒,并且不稳定
  Far-end supervision is minimal
  不同的电路就意味着不同的音频特性,需要进行调整
连接到 Asterisk 的模拟线路需要通过 FOX(Foreign eXchange Office) 端口
如果想要将传统电话连接到 Asterisk 也需要同样的转接卡


数字线路
T1,24路
  加拿大或美国,ISDN-PRI
E1,32路
  世界其他国家,ISDN-PRI 或 MFC/R2
  中国
BRI,2路
  ISDN-BRI, Euro-ISDN

PRI ISDN Primary Rate Interface ISDN (一般称为PRI) 协议主要运行于 DS1(T1/E1)线路
MFC/R2 拉丁美洲和亚洲 (E1)

Phone numbers as used for the purpose of origination are commonly called direct inward dialing numbers (DIDs)
Historically, a DID referred to a phone number asso‐ ciated with a trunk connected to customer premise equipment (CPE).
The number that was dialed is commonly referred to as the Dialed Number Identification Service (DNIS) number

CAS-based protocol (like R2).
PRI terminated in an RJ45 will be an ISDN connection,
BNC Connector

```
; 处理来自 pstn 的请求
[from-pstn]
; This is the context that would be listed in the config file
; for the circuit (i.e. chan_dahdi.conf)
exten => _X.,1,Verbose(2,Incoming call to ${EXTEN})
    same => n,Goto(number-mapping,${EXTEN},1)
[number-mapping]
; This context is not strictly required, but will make it easier
; to keep track of your DIDs in a single location in your dialplan.
; From here you can pass the call to another part of the dialplan
; where the actual dialplan work will take place.
exten => 4165551234,1,Dial(SIP/0000FFFF0001)
exten => 4165554321,1,Goto(autoattendant-context,start,1)
exten => 4165559876,1,VoiceMailMain() ; a handy back door for listening
                                      ; to voice messages
exten => i,1,Verbose(2,Incoming call to invalid number)
```

```
; 复杂判断
[incoming]
exten => _X.,1,Answer()
  same => n,GotoIf($["${CHANNEL(secure_signaling)}" = "1"]?secure:insecure)
  same => n(secure),NoOp(Signaling is encrypted.)
  same => n,Hangup()
  same => n(insecure),NoOp(Signaling is not encrypted.)
  same => n,Hangup()
```

https://groups.google.com/forum/#!forum/asterisk-tw

深入拨号计划
表达式
https://wiki.asterisk.org/wiki/display/AST/Expressions
https://www.voip-info.org/wiki/view/Asterisk+Expressions

core show functions
GotoIf(expression?destination1:destination2)
GotoIfTime(times,days_of_week,days_of_month,months?label)

${MACRO_CONTEXT}
The original context in which the macro was called.
${MACRO_EXTEN}
The original extension in which the macro was called.
${MACRO_PRIORITY}
The original priority in which the macro was called.
${ARG n }
The nth argument passed to the macro. For example, the first argument would be ${ARG1}, the second ${ARG2}, and so on.

```
exten => 123,1,NoOp()
  same => n,GotoIf($[${CALLERID(num)} = 8885551212]?reject:allow)
  same => n(allow),Dial(DAHDI/4)
  same => n,Hangup()
  same => n(reject),Playback(abandon-all-hope)
  same => n,Hangup()

; If it's any hour of the day, on any day of the week,
; during the fourth day of the month, in the month of July,
; we're closed
exten => s,1,NoOp()
  same => n,GotoIfTime(*,*,4,jul?closed,s,1)
; During business hours, send calls to the open context
  same => n,GotoIfTime(09:00-17:59,mon-fri,*,*?open,s,1)
  same => n,GotoIfTime(09:00-11:59,sat,*,*?open,s,1)
; Otherwise, we're closed
  same => n,Goto(closed,s,1)

; 宏 di
[macro-voicemail]
exten => s,1,NoOp()
  same => n,Dial(${ARG1},10)
  same => n,GotoIf($["${DIALSTATUS}" = "BUSY"]?busy:unavail)
  same => n(unavail),VoiceMail(101@default,u)
  same => n,Hangup()
  same => n(busy),VoiceMail(101@default,b)
  same => n,Hangup()

[other]
; 调用宏
exten => 101,1,Macro(voicemail,${JOHN})

; 协程定义
 [subDialer]
exten => start,1,NoOp()
  same => n,Dial(${ARG1},${ARG2})
  same => n,Return(${DIALSTATUS})
[subVoicemail]
exten => start,1,NoOp()
  same => n,VoiceMail(${ARG1}@${ARG2},${ARG3})
  same => n,Hangup()

; 调用协程
[other]
exten => 101,1,NoOp()
  same => n,GoSub(subDialer,start,1(${JOHN},30))
  same => n,Set(VoicemailMessage=${IF($[${GOSUB_RETVAL} = BUSY]?b:u)})
  same => n,GoSub(subVoicemail,start,1(${EXTEN},default,${VoicemailMessage}))
```

__VoIP Protocol__
Protocol | Mean | Notes
----|----|----
SIP   | Session Initiation Protocol          | SIP 基于标准的协议,大多数 VoIP 电话和服务都在使用或提供响应支持.
SCCP  | Cisco Skinny Client Control Protocol | SCCP 是私有协议,主要用于 Cisco's Call Manager 和 IP 电话
MGCP  | MGCP 很老的 VoIP 协议,已经很少使用了.
H.323 | 类似于 MGCP , 是很老的 VoIP 协议,已经很少使用了.

__语音编码__
编码 | 速率 | Fidelity
----|----
GSM   | 13 Kbps| 8k
iLBC  | 15 Kbps
G.711 | 64 Kbps
G.722 | 48/56/64 Kbps
G.726 | 16/24/32/40 Kbps
G.728 | 16 Kbps
G.729 | 8 Kbps

SPEEX Narrowband | 14Kps-23Kps | 8k
SPEEX Wideband | 20800-58400 | 16k
OPUS | 6k-51k | 48k
G.722 | 8K-80k | 16k



视频编码
H.263 90000

VoIP 适配类型
Single FXS – A single FXS VoIP adapter allows you to connect one telephone. Single FXS VoIP adapters come with either one or two Ethernet ports.
Dual FXS – A dual FXS VoIP adapter allows you to connect up to two telephones. Dual FXS VoIP adapters come with either one or two Ethernet ports.
FXO / FXS – A FXO / FXS VoIP adapter allows you to connect a single telephone and a single POTS line. These combination adapters are typically used to provide fail-over or life-line capabilities.

如果需要超过两个线,则需要使用 VoIP 网关



```
!                              -- Execute a shell command
acl show                       -- Show a named ACL or list all named ACLs
ael reload                     -- Reload AEL configuration
ael set debug {read|tokens|macros|contexts|off} -- Enable AEL debugging flags
agent logoff                   -- Sets an agent offline
agent show all                 -- Show status of all agents
agent show online              -- Show status of online agents
agent show                     -- Show information about an agent
agi dump html                  -- Dumps a list of AGI commands in HTML format
agi exec                       -- Add AGI command to a channel in Async AGI
agi set debug [on|off]         -- Enable/Disable AGI debugging
agi show commands [topic]      -- List AGI commands or specific help
aoc set debug                  -- enable cli debugging of AOC messages
ari mkpasswd                   -- Encrypts a password
ari set debug                  -- Enable/disable debugging of an ARI application
ari show apps                  -- List registered ARI applications
ari show app                   -- Display details of a registered ARI application
ari show status                -- Show ARI settings
ari show users                 -- List ARI users
ari show user                  -- List single ARI user
bridge kick                    -- Kick a channel from a bridge
bridge show all                -- List all bridges
bridge show                    -- Show information about a bridge
bridge technology show         -- List registered bridge technologies
bridge technology {suspend|unsuspend} -- Suspend/unsuspend a bridge technology
calendar dump sched            -- Dump calendar sched context
calendar show calendar         -- Display information about a calendar
calendar show calendars        -- Show registered calendars
calendar show types            -- Show all calendar types loaded
cc cancel                      -- Kill a CC transaction
cc report status               -- Reports CC stats
cdr set debug [on|off]         -- Enable debugging in the CDR engine
cdr show active                -- Display active CDRs for channels
cdr show status                -- Display the CDR status
cdr submit                     -- Posts all pending batched CDR data
cel show status                -- Display the CEL status
channel originate              -- Originate a call
channel redirect               -- Redirect a call
channel request hangup         -- Request a hangup on a given channel
cli check permissions          -- Try a permissions config for a user
cli reload permissions         -- Reload CLI permissions config
cli show aliases               -- Show CLI command aliases
cli show permissions           -- Show CLI permissions
confbridge kick                -- Kick participants out of conference bridges.
confbridge list                -- List conference bridges and participants.
confbridge lock                -- Lock a conference.
confbridge mute                -- Mute participants.
confbridge record start        -- Start recording a conference
confbridge record stop         -- Stop recording a conference.
confbridge show menu           -- Show a conference menu
confbridge show menus          -- Show a list of conference menus
confbridge show profile bridge -- Show a conference bridge profile.
confbridge show profile bridges -- Show a list of conference bridge profiles.
confbridge show profile user   -- Show a conference user profile.
confbridge show profile users  -- Show a list of conference user profiles.
confbridge unlock              -- Unlock a conference.
confbridge unmute              -- Unmute participants.
config list                    -- Show all files that have loaded a configuration file
config reload                  -- Force a reload on modules using a particular configuration file
config show help               -- Show configuration help for a module
console answer                 -- Answer an incoming console call
console boost                  -- Sets/displays mic boost in dB
console dial                   -- Dial an extension on the console
console flash                  -- Flash a call on the console
console hangup                 -- Hangup a call on the console
console {mute|unmute} [toggle] -- Disable/Enable mic input
console send text              -- Send text to the remote device
console transfer               -- Transfer a call to a different extension
console {device}               -- Generic console command
console {set|show} autoanswer [on|off] -- Sets/displays autoanswer
console {set|show} active [<device>] -- Sets/displays active console
core abort shutdown            -- Cancel a running shutdown
core clear profile             -- Clear profiling info
core ping taskprocessor        -- Ping a named task processor
core reload                    -- Global reload
core restart gracefully        -- Restart Asterisk gracefully
core restart now               -- Restart Asterisk immediately
core restart when convenient   -- Restart Asterisk at empty call volume
core set debug channel         -- Enable/disable debugging on a channel
core set debug                 -- Set level of debug chattiness
core set verbose               -- Set level of verbose chattiness
core show applications [like|describing] -- Shows registered dialplan applications
core show application          -- Describe a specific dialplan application
core show calls [uptime]       -- Display information on calls
core show channels [concise|verbose|count] -- Display information on channels
core show channel              -- Display information on a specific channel
core show channeltypes         -- List available channel types
core show channeltype          -- Give more details on that channel type
core show codecs [audio|video|image|text] -- Displays a list of registered codecs
core show codec                -- Shows a specific codec
core show config mappings      -- Display config mappings (file names to config engines)
core show file formats         -- Displays file formats
core show functions [like]     -- Shows registered dialplan functions
core show function             -- Describe a specific dialplan function
core show hanguphandlers all   -- Show hangup handlers of all channels
core show hanguphandlers       -- Show hangup handlers of a specified channel
core show help                 -- Display help list, or specific help on a command
core show hints                -- Show dialplan hints
core show hint                 -- Show dialplan hint
core show image formats        -- Displays image formats
core show license              -- Show the license(s) for this copy of Asterisk
core show profile              -- Display profiling info
core show settings             -- Show some core settings
core show sounds               -- Shows available sounds
core show sound                -- Shows details about a specific sound
core show switches             -- Show alternative switches
core show sysinfo              -- Show System Information
core show taskprocessors       -- List instantiated task processors and statistics
core show threads              -- Show running threads
core show translation          -- Display translation matrix
core show uptime [seconds]     -- Show uptime information
core show version              -- Display version info
core show warranty             -- Show the warranty (if any) for this copy of Asterisk
core stop gracefully           -- Gracefully shut down Asterisk
core stop now                  -- Shut down Asterisk immediately
core stop when convenient      -- Shut down Asterisk at empty call volume
core waitfullybooted           -- Wait for Asterisk to be fully booted
dahdi create channels          -- Create channels
dahdi destroy channels         -- Destroy channels
dahdi restart                  -- Fully restart DAHDI channels
dahdi set dnd                  -- Sets/resets DND (Do Not Disturb) mode on a channel
dahdi set hwgain {rx|tx}       -- Set hardware gain on a channel
dahdi set swgain {rx|tx}       -- Set software gain on a channel
dahdi show cadences            -- List cadences
dahdi show channels [group|context] -- Show active DAHDI channels
dahdi show channel             -- Show information on a channel
dahdi show status              -- Show all DAHDI cards status
dahdi show version             -- Show the DAHDI version in use
data get                       -- Data API get
data show providers            -- Show data providers
database del                   -- Removes database key/value
database deltree               -- Removes database keytree/values
database get                   -- Gets database value
database put                   -- Adds/updates database value
database query                 -- Run a user-specified query on the astdb
database show                  -- Shows database contents
database showkey               -- Shows database contents
devstate change                -- Change a custom device state
devstate list                  -- List currently known custom device states
dialplan add extension         -- Add new extension into context
dialplan add ignorepat         -- Add new ignore pattern
dialplan add include           -- Include context in other context
dialplan debug                 -- Show fast extension pattern matching data structures
dialplan reload                -- Reload extensions and *only* extensions
dialplan remove context        -- Remove a specified context
dialplan remove extension      -- Remove a specified extension
dialplan remove ignorepat      -- Remove ignore pattern from context
dialplan remove include        -- Remove a specified include from context
dialplan save                  -- Save current dialplan into a file
dialplan set chanvar           -- Set a channel variable
dialplan set extenpatternmatchnew false -- Use the Old extension pattern matching algorithm.
dialplan set extenpatternmatchnew true -- Use the New extension pattern matching algorithm.
dialplan set global            -- Set global dialplan variable
dialplan show                  -- Show dialplan
dialplan show chanvar          -- Show channel variables
dialplan show globals          -- Show global dialplan variables
dnsmgr refresh                 -- Performs an immediate refresh
dnsmgr reload                  -- Reloads the DNS manager configuration
dnsmgr status                  -- Display the DNS manager status
dundi flush [stats]            -- Flush DUNDi cache
dundi lookup                   -- Lookup a number in DUNDi
dundi precache                 -- Precache a number in DUNDi
dundi query                    -- Query a DUNDi EID
dundi set debug {on|off}       -- Enable/Disable DUNDi debugging
dundi show cache               -- Show DUNDi cache
dundi show entityid            -- Display Global Entity ID
dundi show hints               -- Show DUNDi hints in the cache
dundi show mappings            -- Show DUNDi mappings
dundi show peers [registered|include|exclude|begin] -- Show defined DUNDi peers
dundi show peer                -- Show info on a specific DUNDi peer
dundi show precache            -- Show DUNDi precache
dundi show requests            -- Show DUNDi requests
dundi show trans               -- Show active DUNDi transactions
dundi store history {on|off}   -- Enable/Disable DUNDi historic records
fax set debug {on|off}         -- Enable/Disable FAX debugging on new FAX sessions
fax show capabilities          -- Show the capabilities of the registered FAX technology modules
fax show session               -- Show the status of the named FAX sessions
fax show sessions              -- Show the current FAX sessions
fax show settings              -- Show the global settings and defaults of both the FAX core and technology modules
fax show stats                 -- Summarize FAX session history
fax show version               -- Show versions of FAX For Asterisk components
features show                  -- Lists configured features
file convert                   -- Convert audio file
group show channels            -- Display active channels with group(s)
hangup request                 -- <no description available>
help                           -- <no description available>
http show status               -- Display HTTP server status
iax2 provision                 -- Provision an IAX device
iax2 prune realtime            -- Prune a cached realtime lookup
iax2 reload                    -- Reload IAX configuration
iax2 set debug {on|off|peer}   -- Enable/Disable IAX debugging
iax2 set debug jb {on|off}     -- Enable/Disable IAX jitterbuffer debugging
iax2 set debug trunk {on|off}  -- Enable/Disable IAX trunk debugging
iax2 set mtu                   -- Set the IAX systemwide trunking MTU
iax2 show cache                -- Display IAX cached dialplan
iax2 show callnumber usage     -- Show current entries in IP call number limit table
iax2 show channels             -- List active IAX channels
iax2 show firmware             -- List available IAX firmware
iax2 show netstats             -- List active IAX channel netstats
iax2 show peer                 -- Show details on specific IAX peer
iax2 show peers                -- List defined IAX peers
iax2 show provisioning         -- Display iax provisioning
iax2 show registry             -- Display IAX registration status
iax2 show stats                -- Display IAX statistics
iax2 show threads              -- Display IAX helper thread info
iax2 show users [like]         -- List defined IAX users
iax2 test losspct              -- Set IAX2 incoming frame loss percentage
iax2 unregister                -- Unregister (force expiration) an IAX2 peer from the registry
indication add                 -- Add the given indication to the country
indication remove              -- Remove the given indication from the country
indication show                -- Display a list of all countries/indications
keys init                      -- Initialize RSA key passcodes
keys show                      -- Displays RSA key information
local show channels            -- List status of local channels
logger add channel             -- Adds a new logging channel
logger mute                    -- Toggle logging output to a console
logger reload                  -- Reopens the log files
logger remove channel          -- Removes a logging channel
logger rotate                  -- Rotates and reopens the log files
logger set level {DEBUG|NOTICE|WARNING|ERROR|VERBOSE|DTMF} {on|off} -- Enables/Disables a specific logging level for this console
logger show channels           -- List configured log channels
manager reload                 -- Reload manager configurations
manager set debug [on|off]     -- Show, enable, disable debugging of the manager code
manager show command           -- Show a manager interface command
manager show commands          -- List manager interface commands
manager show connected         -- List connected manager interface users
manager show eventq            -- List manager interface queued events
manager show events            -- List manager interface events
manager show event             -- Show a manager interface event
manager show settings          -- Show manager global settings
manager show users             -- List configured manager users
manager show user              -- Display information on a specific manager user
media cache create             -- Create an item in the media cache
media cache delete             -- Remove an item from the media cache
media cache refresh            -- Refresh an item in the media cache
media cache show all           -- Show all items in the media cache
media cache show               -- Show a single item in the media cache
meetme kick                    -- Kick a conference or a user in a conference.
meetme list                    -- List all conferences or a specific conference.
meetme {lock|unlock}           -- Lock or unlock a conference to new users.
meetme {mute|unmute}           -- Mute or unmute a conference or a user in a conference.
mgcp audit endpoint            -- Audit specified MGCP endpoint
mgcp reload                    -- Reload MGCP configuration
mgcp set debug {on|off}        -- Enable/Disable MGCP debugging
mgcp show endpoints            -- List defined MGCP endpoints
minivm list accounts           -- List defined mini-voicemail boxes
minivm list templates          -- List message templates
minivm list zones              -- List zone message formats
minivm reload                  -- Reload Mini-voicemail configuration
minivm show settings           -- Show mini-voicemail general settings
minivm show stats              -- Show some mini-voicemail statistics
mixmonitor {start|stop|list}   -- Execute a MixMonitor command
module load                    -- Load a module by name
module reload                  -- Reload configuration for a module
module show [like]             -- List modules and info
module unload                  -- Unload a module by name
moh reload                     -- Reload MusicOnHold
moh show classes               -- List MusicOnHold classes
moh show files                 -- List MusicOnHold file-based classes
no debug channel               -- Disable debugging on channel(s)
originate                      -- <no description available>
parking show                   -- Show a parking lot or a list of all parking lots.
phoneprov show routes          -- Show registered phoneprov http routes
pjproject show buildopts       -- Show the compiled config of the pjproject in use
pjproject show log mappings    -- Show pjproject to Asterisk log mappings
pjsip dump endpt               -- Dump the res_pjsip endpt internals
pjsip export config_wizard primitives [to] -- Export config wizard primitives
pjsip list aors                -- List PJSIP Aors
pjsip list auths               -- List PJSIP Auths
pjsip list channels            -- List PJSIP Channels
pjsip list ciphers             -- List available OpenSSL cipher names
pjsip list contacts            -- List PJSIP Contacts
pjsip list endpoints           -- List PJSIP Endpoints
pjsip list identifies          -- List PJSIP Identifies
pjsip list registrations       -- List PJSIP Registrations
pjsip list transports          -- List PJSIP Transports
pjsip qualify                  -- Send an OPTIONS request to a PJSIP endpoint
pjsip reload                   -- <no description available>
pjsip send notify              -- Send a NOTIFY request to a SIP endpoint
pjsip send register            -- Registers an outbound registration target
pjsip send unregister          -- Unregisters outbound registration target
pjsip set history {on|off|clear} -- Enable/Disable PJSIP History
pjsip set logger {on|off|host} -- Enable/Disable PJSIP Logger Output
pjsip show aors                -- Show PJSIP Aors
pjsip show aor                 -- Show PJSIP Aor
pjsip show auths               -- Show PJSIP Auths
pjsip show auth                -- Show PJSIP Auth
pjsip show channels            -- Show PJSIP Channels
pjsip show channel             -- Show PJSIP Channel
pjsip show channelstats        -- Show PJSIP Channel Stats
pjsip show contacts            -- Show PJSIP Contacts
pjsip show contact             -- Show PJSIP Contact
pjsip show endpoints           -- Show PJSIP Endpoints
pjsip show endpoint            -- Show PJSIP Endpoint
pjsip show history             -- Display PJSIP History
pjsip show identifiers         -- List registered endpoint identifiers
pjsip show identifies          -- Show PJSIP Identifies
pjsip show identify            -- Show PJSIP Identify
pjsip show registrations       -- Show PJSIP Registrations
pjsip show registration        -- Show PJSIP Registration
pjsip show scheduled_tasks     -- Show all scheduled tasks
pjsip show settings            -- Show global and system configuration options
pjsip show transports          -- Show PJSIP Transports
pjsip show transport           -- Show PJSIP Transport
pjsip show unidentified_requests -- Show PJSIP Unidentified Requests
pjsip show version             -- Show the version of pjproject in use
presencestate change           -- Change a custom presence state
presencestate list             -- List currently know custom presence states
pri destroy span               -- Destroy a PRI span
pri intense debug span         -- <no description available>
pri service disable channel    -- Remove a channel from service
pri service enable channel     -- Return a channel to service
pri set debug {on|off|hex|intense|0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15} span -- Enables PRI debugging on a span
pri set debug file             -- Sends PRI debug output to the specified file
pri show channels              -- Displays PRI channel information
pri show debug                 -- Displays current PRI debug settings
pri show spans                 -- Displays PRI span information
pri show span                  -- Displays PRI span information
pri show version               -- Displays libpri version
queue add member               -- Add a channel to a specified queue
queue reload {parameters|members|rules|all} -- Reload queues, members, queue rules, or parameters
queue remove member            -- Removes a channel from a specified queue
queue reset stats              -- Reset statistics for a queue
queue set penalty              -- Set penalty for a channel of a specified queue
queue set ringinuse            -- Set ringinuse for a channel of a specified queue
queue show                     -- Show status of a specified queue
queue show rules               -- Show the rules defined in queuerules.conf
queue {pause|unpause} member   -- Pause or unpause a queue member
realtime destroy               -- Delete a row from a RealTime database
realtime load                  -- Used to print out RealTime variables.
realtime store                 -- Store a new row into a RealTime database
realtime update                -- Used to update RealTime variables.
realtime update2               -- Used to test the RealTime update2 method
reload                         -- <no description available>
rtcp set debug {on|off|ip}     -- Enable/Disable RTCP debugging
rtcp set stats {on|off}        -- Enable/Disable RTCP stats
rtp set debug {on|off|ip}      -- Enable/Disable RTP debugging
say load [new|old]             -- Set or show the say mode
sip notify                     -- Send a notify packet to a SIP peer
sip prune realtime [peer|all]  -- Prune cached Realtime users/peers
sip qualify peer               -- Send an OPTIONS packet to a peer
sip reload                     -- Reload SIP configuration
sip set debug {on|off|ip|peer} -- Enable/Disable SIP debugging
sip set history {on|off}       -- Enable/Disable SIP history
sip show {channels|subscriptions} -- List active SIP channels or subscriptions
sip show channelstats          -- List statistics for active SIP channels
sip show channel               -- Show detailed SIP channel info
sip show domains               -- List our local SIP domains
sip show history               -- Show SIP dialog history
sip show inuse                 -- List all inuse/limits
sip show mwi                   -- Show MWI subscriptions
sip show objects               -- List all SIP object allocations
sip show peers                 -- List defined SIP peers
sip show peer                  -- Show details on specific SIP peer
sip show registry              -- List SIP registration status
sip show sched                 -- Present a report on the status of the scheduler queue
sip show settings              -- Show SIP global settings
sip show tcp                   -- List TCP Connections
sip show users                 -- List defined SIP users
sip show user                  -- Show details on specific SIP user
sip unregister                 -- Unregister (force expiration) a SIP peer from the registry
skinny message clear           -- Clear message to devices
skinny message set             -- Send message to devices
skinny reload                  -- Reload Skinny config
skinny reset                   -- Reset Skinny device(s)
skinny show devices            -- List defined Skinny devices
skinny show device             -- List Skinny device information
skinny show lines [verbose]    -- List defined Skinny lines per device
skinny show line               -- List Skinny line information
skinny show settings           -- List global Skinny settings
sla show stations              -- Show SLA Stations
sla show trunks                -- Show SLA Trunks
sorcery memory cache dump      -- Dump all objects within a sorcery memory cache
sorcery memory cache expire    -- Expire a specific object or ALL objects within a sorcery memory cache
sorcery memory cache populate  -- Clear and populate the sorcery memory cache with objects from the backend
sorcery memory cache show      -- Show sorcery memory cache information
sorcery memory cache stale     -- Mark a specific object or ALL objects as stale within a sorcery memory cache
stun set debug {on|off}        -- Enable/Disable STUN debugging
stun show status               -- Show STUN servers and statuses
timing test                    -- Run a timing test
transcoder show                -- Display DAHDI transcoder utilization.
udptl set debug {on|off|ip}    -- Enable/Disable UDPTL debugging
udptl show config              -- Show UDPTL config options
ulimit                         -- Set or show process resource limits
unistim reload                 -- Reload UNISTIM configuration
unistim send packet            -- Send packet (for reverse engineering)
unistim set debug {on|off}     -- Toggle UNITSTIM debugging
unistim show devices           -- Show UNISTIM devices
unistim show info              -- Show UNISTIM info
voicemail reload               -- Reload voicemail configuration
voicemail show users           -- List defined voicemail boxes
voicemail show zones           -- List zone message formats
xmldoc dump                    -- Dump the XML docs to the specified file
```


## Web

https://wiki.asterisk.org/wiki/display/AST/Asterisk+WebRTC+Support
https://wiki.asterisk.org/wiki/display/AST/WebRTC+tutorial+using+SIPML5

* 客户端
  * https://github.com/DoubangoTelecom/sipml5
  * http://jssip.net/

## 视频
http://www.voip-info.org/wiki/view/Asterisk+video

## 名词

* AGI
* AMI
* ARI
* Diaplan
* DAHDI
* libpri
* IVR
  * 交互式语音应答
