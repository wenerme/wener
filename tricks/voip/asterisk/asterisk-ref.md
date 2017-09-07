# Asterisk Reference


## Tips
* [chan-sccp/chan-sccp](https://github.com/chan-sccp/chan-sccp)
  * http://chan-sccp-b.sourceforge.net/
  * a replacement Channel Driver for chan_skinny in the Asterisk Channel Driver Library
* BUGS
  * [#26423]https://issues.asterisk.org/jira/browse/ASTERISK-26423 res_pjsip_sdp_rtp: Asymmetric RTP codec can cause audio loss and wonkiness

## Install
* https://git.alpinelinux.org/cgit/aports/tree/main/asterisk/APKBUILD

## FAQ
### Macro vs Sub
* 首选 Sub
* Macro 最多 7 层嵌套

### Failed to insert call detail record into database

在使用 `PJSIP_DIAL_CONTACTS` 时, 号码可能非常长, 会导致数据库插入失败

```
[Sep  5 11:34:50] WARNING[11511]: cel_pgsql.c:351 pgsql_log: Failed to insert call detail record into database!
[Sep  5 11:34:50] WARNING[11511]: cel_pgsql.c:352 pgsql_log: Reason: ERROR:  value too long for type character varying(80)
```

### 对接 O 口网关时, 程序崩溃
可能是由于 UDP 消息截断导致, 打开日志可以看到消息内容应该只有一部分


### CDR vs CEL
* 都可以对接后端存储
* CDR
  * 相对信息更少
* CEL
  * 支撑订单
  * Control over which Asterisk applications are tracked.
  * Control over which events should be raised.
  * Configurable date format.
  * Integration with the Asterisk Manager Interface.
  * Integration with RADIUS
  * Modules for various logging back-ends including customized CEL output, integration with ODBC, PGSQL, SQLite and TDS.

### DAHDi 有持续性的噪音
* 可能是打开了 crc4 导致的, 在 `system.conf` 中关闭即可
* 如果有异常, 那也可能是 crc4 导致的

### DAHDi 拨号选项
* https://github.com/asterisk/asterisk/blob/master/channels/chan_dahdi.c#L13167

* `Dial(DAHDI/pseudo[/extension[/options]])`
* `Dial(DAHDI/<channel#>[c|r<cadance#>|d][/extension[/options]])`
* `Dial(DAHDI/<subdir>!<channel#>[c|r<cadance#>|d][/extension[/options]])`
* `Dial(DAHDI/i<span>[/extension[/options]])`
* `Dial(DAHDI/[i<span>-](g|G|r|R)<group#(0-63)>[c|r<cadance#>|d][/extension[/options]])`
* i - ISDN span channel restriction.
  * Used by CC to ensure that the CC recall goes out the same span.
  * Also to make ISDN channel names dialable when the sequence number is stripped off.  (Used by DTMF attended transfer feature.)
* g - channel group allocation search forward
* G - channel group allocation search backward
* r - channel group allocation round robin search forward
* R - channel group allocation round robin search backward
* c - Wait for DTMF digit to confirm answer
* r<cadance#> - Set distintive ring cadance number
* d - Force bearer capability for ISDN/SS7 call to digital.


### PJ ICE Rx error status code: 370401


### Core Dump
* [Getting a Backtrace](https://wiki.asterisk.org/wiki/display/AST/Getting+a+Backtrace)
* 需要安装 `gdb`
* 除非编译时带了 `DEBUG_THREADS`, 否则 `locks` 为空
* 可以使用 `libbfd`, 在编译时加上 `DONT_OPTIMIZE`, `BETTER_BACKTRACES` 以获得更好的转储信息
* 默认转储文件位于当前目录下的 `core`, 会遵循 `kernel.core_pattern` 配置将转储存到指定的地方

```bash
sysctl -n kernel.core_pattern

/var/lib/asterisk/scripts/ast_coredumper core
```

### `Probation passed` 后程序崩溃
* 在 cli.conf 中打开全量日志
* `res_rtp_asterisk.c: Unsupported payload type received`
  * [res_rtp_asterisk.c#L5109](https://github.com/asterisk/asterisk/blob/master/res/res_rtp_asterisk.c#L5109)
  * http://asteriskfaqs.org/2017/03/14/asterisk-users/codec-negotiation-or-transcoding-issue.html
    * https://issues.asterisk.org/jira/browse/ASTERISK-26423
    * https://issues.asterisk.org/jira/browse/ASTERISK-25676

### CEL 数据库写入失败, 字段过长
* 应该是 appdata 字段导致, 可以将数据库的长度改长


## Codec
* VoIP 常用编码包括 ITU-T 系列的 G.7xx, GSM, iLBC
  * 其它编码, speex 等已经不推荐使用
* [Asterisk codecs](https://www.voip-info.org/wiki/view/Asterisk+codecs)
* [G.729](https://en.wikipedia.org/wiki/G.729)
  * 需要版权, 默认只能透传
* G.711
  * [ulaw](https://en.wikipedia.org/wiki/%CE%9C-law_algorithm)
    * US
  * [alaw](https://en.wikipedia.org/wiki/A-law_algorithm)
    * Europe
* [iLBC](https://en.wikipedia.org/wiki/Internet_Low_Bitrate_Codec)
  * Internet low Bitrate Codec
* slin (16 bit Signed Linear PCM)
Convert WAV audio files for use in Asterisk https://www.voip-info.org/wiki/view/Convert+WAV+audio+files+for+use+in+Asterisk

```
core show codecs
core show translation
```

__VoIP 常用编码__

以下编码时钟频率均为 8000, 默认包大小 20

Codec   | PT | Note |
--------|----|------|
PCMU    | 0  | G.711/ulaw
GSM     | 3  |         
G723    | 4  |         
PCMA    | 8  | G.711/alaw
G722    | 9  |         
G729    | 18 | G.729a


```
         Translation times between formats (in microseconds) for one second of data
          Source Format (Rows) Destination Format (Columns)

           ulaw  alaw   gsm  g726 g726aal2 adpcm  slin  slin  slin  slin  slin  slin  slin  slin  slin lpc10  ilbc  g722 testlaw
     ulaw     -  9150 15000 15000    15000 15000  9000 17000 17000 17000 17000 17000 17000 17000 17000 15000 15000 17250   15000
     alaw  9150     - 15000 15000    15000 15000  9000 17000 17000 17000 17000 17000 17000 17000 17000 15000 15000 17250   15000
      gsm 15000 15000     - 15000    15000 15000  9000 17000 17000 17000 17000 17000 17000 17000 17000 15000 15000 17250   15000
     g726 15000 15000 15000     -    15000 15000  9000 17000 17000 17000 17000 17000 17000 17000 17000 15000 15000 17250   15000
 g726aal2 15000 15000 15000 15000        - 15000  9000 17000 17000 17000 17000 17000 17000 17000 17000 15000 15000 17250   15000
    adpcm 15000 15000 15000 15000    15000     -  9000 17000 17000 17000 17000 17000 17000 17000 17000 15000 15000 17250   15000
     slin  6000  6000  6000  6000     6000  6000     -  8000  8000  8000  8000  8000  8000  8000  8000  6000  6000  8250    6000
     slin 14500 14500 14500 14500    14500 14500  8500     -  8000  8000  8000  8000  8000  8000  8000 14500 14500 14000   14500
     slin 14500 14500 14500 14500    14500 14500  8500  8500     -  8000  8000  8000  8000  8000  8000 14500 14500  6000   14500
     slin 14500 14500 14500 14500    14500 14500  8500  8500  8500     -  8000  8000  8000  8000  8000 14500 14500 14500   14500
     slin 14500 14500 14500 14500    14500 14500  8500  8500  8500  8500     -  8000  8000  8000  8000 14500 14500 14500   14500
     slin 14500 14500 14500 14500    14500 14500  8500  8500  8500  8500  8500     -  8000  8000  8000 14500 14500 14500   14500
     slin 14500 14500 14500 14500    14500 14500  8500  8500  8500  8500  8500  8500     -  8000  8000 14500 14500 14500   14500
     slin 14500 14500 14500 14500    14500 14500  8500  8500  8500  8500  8500  8500  8500     -  8000 14500 14500 14500   14500
     slin 14500 14500 14500 14500    14500 14500  8500  8500  8500  8500  8500  8500  8500  8500     - 14500 14500 14500   14500
    lpc10 15000 15000 15000 15000    15000 15000  9000 17000 17000 17000 17000 17000 17000 17000 17000     - 15000 17250   15000
     ilbc 15000 15000 15000 15000    15000 15000  9000 17000 17000 17000 17000 17000 17000 17000 17000 15000     - 17250   15000
     g722 15600 15600 15600 15600    15600 15600  9600 17500  9000 17000 17000 17000 17000 17000 17000 15600 15600     -   15600
  testlaw 15000 15000 15000 15000    15000 15000  9000 17000 17000 17000 17000 17000 17000 17000 17000 15000 15000 17250       -
```


## RFCs
* RFC 3262 Reliability of Provisional Responses in the Session Initiation Protocol
  * 临时响应的可靠传输
  * [RFC4028的不足与SIP KEEP-ALIVE方法](https://www.myvoipapp.com/blogs/yxh/2011/10/30/rfc4028%E7%9A%84%E4%B8%8D%E8%B6%B3%E4%B8%8Esip-keep-alive%E6%96%B9%E6%B3%95/)
* RFC 4028 - Session Timers in the Session Initiation Protocol
  * 会话刷新
* RFC 3261 SIP: Session Initiation Protocol
  * https://tools.ietf.org/html/rfc3261
  * 定义了使用 OPTIONS 来检测状态
    * asterisk 中的 qualify
* RFC 2833 - RTP Payload for DTMF Digits, Telephony Tones and Telephony Signals
  * https://tools.ietf.org/html/rfc2833
* RFC 4733 - RTP Payload for DTMF Digits, Telephony Tones, and Telephony Signals
  * 替代 2833
  * https://tools.ietf.org/html/rfc4733
* RFC 6913 - Indicating Fax over IP Capability in the Session Initiation Protocol (SIP)
  * https://tools.ietf.org/html/rfc6913

## DTMF/Dual-tone multi-frequency
* [DTMF:wikipedia](https://en.wikipedia.org/wiki/Dual-tone_multi-frequency_signaling)
* https://www.voip-info.org/wiki/view/Asterisk+sip+dtmfmode
* https://www.voip-info.org/wiki/view/DTMF
* 可选模式包括
  * inband
  * rfs2833
  * info
  * auto

## ADSI/Analog Display Services Interface
* https://www.voip-info.org/wiki/view/ADSI
* adsi.conf
* asterisk.adsi

## HA
* [Asterisk High Availability Design](https://www.voip-info.org/wiki/view/Asterisk+High+Availability+Design)

## Database
```bash
# 源码中包含了操作数据库的脚本
cd ./contrib/ast-db-manage
pip install alembic

# 创建配置文件
cp config.ini.sample config.ini
# 调整配置项
# 主要配置 sqlalchemy.url
nano config.in
# 数据库更新到最新结构
alembic -c config.ini upgrade head
# 如果不想操作数据库, 也可以生成 SQL
alembic -c config.ini upgrade head --sql
```

### 找不到 `ENUM`
使用的那个版本配置可能有点问题, 在那个文件里添加以下内容即可
```python
from sqlalchemy.dialects.postgresql import ENUM
YESNO_NAME = 'yesno_values'
YESNO_VALUES = ['yes', 'no']
```

### 实时配置
* [Realtime Database Configuration](https://wiki.asterisk.org/wiki/display/AST/Realtime+Database+Configuration)

```conf
; modules.conf
; 预先加载必须的模块
[modules]
preload => res_odbc.so
preload => res_config_odbc.so

; extconfig.conf
; 定义外部配置
[settings]
; 语法
; file.conf => driver,database[,table[,priority]]
meetme => odbc,general
```

```
# 加载一条数据
realtime load sippeers name 9009
```

__cel.postgres.sql__
```sql
CREATE TABLE cel (
        id serial ,
        eventtype varchar (30) NOT NULL ,
        eventtime timestamp NOT NULL ,
        userdeftype varchar(255) NOT NULL ,
        cid_name varchar (80) NOT NULL ,
        cid_num varchar (80) NOT NULL ,
        cid_ani varchar (80) NOT NULL ,
        cid_rdnis varchar (80) NOT NULL ,
        cid_dnid varchar (80) NOT NULL ,
        exten varchar (80) NOT NULL ,
        context varchar (80) NOT NULL ,
        channame varchar (80) NOT NULL ,
        appname varchar (80) NOT NULL ,
        appdata varchar (80) NOT NULL ,
        amaflags int NOT NULL ,
        accountcode varchar (20) NOT NULL ,
        peeraccount varchar (20) NOT NULL ,
        uniqueid varchar (150) NOT NULL ,
        linkedid varchar (150) NOT NULL ,
        userfield varchar (255) NOT NULL ,
        peer varchar (80) NOT NULL
);
```

### Sorcery
* [Sorcery](https://wiki.asterisk.org/wiki/display/AST/Sorcery)
* Asterisk 12 添加
* 数据对象 CURD 抽象层
  * Asterisk Database
  * Static Configuration Files
  * Asterisk Realtime Architecture
  * In-Memory
* 提供了缓存服务, 用于从 ARI 推送配置
* `AST_SORCERY(module_name,object_type,object_id,field_name[,retrieval_method[,retrieval_details]])`
  * 操作函数
    * retrieval_method, 默认为 concat
      * concat, 当有多条数据时进行拼接, 默认使用 `,`
      * single, 当有多条时返回一条记录, 默认为 `1`
    * retrieval_details, 控制 concat 的连接符和 single 的位置
* 先配置 extconfig.conf, 再配置 sorcery.conf 使用 extconfig 中定义的信息

```
func_sorcery.so                Get a field from a sorcery object
res_sorcery_astdb.so           Sorcery Astdb Object Wizard
res_sorcery_config.so          Sorcery Configuration File Object Wizard
res_sorcery_memory.so          Sorcery In-Memory Object Wizard
res_sorcery_memory_cache.so    Sorcery Memory Cache Object Wizard
res_sorcery_realtime.so        Sorcery Realtime Object Wizard
```

#### pjsip 的默认配置
```conf
[res_pjsip]
auth=config,pjsip.conf,criteria=type=auth
domain_alias=config,pjsip.conf,criteria=type=domain_alias
global=config,pjsip.conf,criteria=type=global
system=config,pjsip.conf,criteria=type=system
transport=config,pjsip.conf,criteria=type=transport
aor=config,pjsip.conf,criteria=type=aor
endpoint=config,pjsip.conf,criteria=type=endpoint
contact=astdb,registrator

[res_pjsip_endpoint_identifier_ip]
identify=config,pjsip.conf,criteria=type=identify

[res_pjsip_outbound_publish]
outbound-publish=config,pjsip.conf,criteria=type=outbound-publish

[res_pjsip_outbound_registration]
registration=config,pjsip.conf,criteria=type=registration
```

#### pjsip 实时配置
___extconfig.conf__

```conf
ps_aors                     => pgsql,asterisk
ps_asterisk_publications    => pgsql,asterisk
ps_auths                    => pgsql,asterisk
ps_contacts                 => pgsql,asterisk
ps_domain_aliases           => pgsql,asterisk
ps_endpoint_id_ips          => pgsql,asterisk
ps_endpoints                => pgsql,asterisk
ps_globals                  => pgsql,asterisk
ps_inbound_publications     => pgsql,asterisk
ps_outbound_publishes       => pgsql,asterisk
ps_registrations            => pgsql,asterisk
ps_resource_list            => pgsql,asterisk
ps_subscription_persistence => pgsql,asterisk
ps_systems                  => pgsql,asterisk
ps_transports               => pgsql,asterisk
```

__sorcery.conf__
```conf
[res_pjsip]
auth        =realtime,ps_auths
domain_alias=realtime,ps_domain_aliases
global      =realtime,ps_globals
system      =realtime,ps_systems
transport   =realtime,ps_transports
aor         =realtime,ps_aors
endpoint    =realtime,ps_endpoints
contact     =realtime,ps_contacts

[res_pjsip_endpoint_identifier_ip]
identify    =realtime,ps_endpoint_id_ips

[res_pjsip_outbound_publish]
outbound-publish=realtime,ps_outbound_publishes

[res_pjsip_outbound_registration]
registration=realtime,ps_registrations
```

## Channel

```bash
# 查看所有的通道类型
core show channeltypes
```

### chan_alsa/chan_console/chan_oss
* 同一时间只能启用一个, 默认启用 oss
* ALSA - Advanced Linux Sound Architecture
* OSS - Open Sound System
  * Linux 2.6 默认为 ALSA, OSS 标记为废弃
* console - [PortAudio](https://en.wikipedia.org/wiki/PortAudio)

### chan_sip
* 传输支持: tcp,udp,tls,ws,wss
  * tcp 和 tls 位于实验阶段
* 5060: This is the standard port for SIP communications
* 8089: This is the standard port for Secure Websockets when used with Asterisk's built-in HTTP sever
* 10000:20000: This is the port range configured in rtp.conf for audio to flow.

#### QoS
* [IP Quality of Service](https://wiki.asterisk.org/wiki/display/AST/IP+Quality+of+Service)
* 默认未开启 QoS, 所以 Peer 的状态都是显示的未知

### res_pjsip
* 总结: 建议使用 `res_pjsip`, 禁用 `chan_sip`
* [SIP vs. CHAN_SIP vs. CHAN_PJSIP](https://www.linkedin.com/pulse/faqs-sip-vs-chansip-chanpjsip-kent-adams)
* [Migrating from chan sip to res pjsip](https://youtu.be/KD-48p0iALg)
  * [幻灯片](https://www.controlaltdieliet.be/astricon2015/pjsip/presentation/index.html)
  * [astricon2015](https://www.controlaltdieliet.be/astricon2015/)
    * 脚本和相关文件配置
    * 包含数据库 `sippeers` 转 `ps_` 的脚本
* [PJSIP: Tuning for Performance](https://youtu.be/BDB4Sr9NVSM)
* WHAY
  * 更好的配置
  * 多个 aors -> 单个终端
    * 多个终端共振
  * NAT 更简单
  * 没有 user,peer,friend
  * 更好的设备和邮箱状态
  * 更简单更快更好的开发
* 配置类型
  * transport
    * 绑定 res_pjsip 到地址端口
    * 可绑定多个
    * 不能重载
  * endpoint
    * 发起和接收通话的设备
    * 包含: transport, aor, auth
    * 配置的 transport 主要用于发送, 所有的都能接收
  * auth
  * aor
    * Address of Record
    * Multiple AORS for 1 device
    * AORS can be overwritten or not
    * Can be static or dynamic (qualify)
  * identify
    * Endpoint Identification
    * `res_pjsip_endpoint_identifier_ip`
      * 基于 IP 的认证
      * 匹配进入的包 -> 终端
    * `res_pjsip_endpoint_identifier_user`
      *  可以从 `From` 头中提取出用户信息由于验证
    * 使用 IP 还是用用户取决于模块加载顺序
  * registration
    * 将 Asterisk 连接到另外一个 Asterisk
    * 以前为 `register => username:password@server/context`
  * acl
    * Access Control List
  * phoneprov
    * Phone Provisioning
  * System
  * Domain alias
  * outbound-publish
* Tips
  * `Dial(PJSIP/${EXTEN})`
  * `Dial(${PJSIP_DIAL_CONTACTS(${EXTEN})})`
    * 拨打所有设备
    * `PJSIP/9001/sip:9001@192.168.1.90:33322&PJSIP/9001/sip:9001@192.168.1.91:58069`
  * `Dial(PJSIP/mytrunk/sip:${EXTEN:1})`
  * `Dial(PJSIP/${EXTEN:1}@mytrunk)`
* PJSIP 使用的表前缀为 `ps_`, 有很多表, 而不像 chan_sip 只有一个 sippeers 表
  * aors, auths, contacts, endpoints, domain_aliases, endpoint_id_ips, globals, registrations, subscription_persistence, systems, transports

```
# 问题排查
core set verbose 4
core set debug 4
pjsip set logger on
```

```conf
[trans-one]
type=transport
protocol=udp
bind=0.0.0.0

[trans-more]
type=transport
protocol=udp,tcp,tls,ws,wss
bind=0.0.0.0:5061
local_net=192.0.2.0/2
external_medial_address=20.0.113.1
external_signaling_address=20.0.113.1

[6001]
type=endpoint
context=default
disallow=all
allow=ulw
transport=trans-one
auth=auth6001
aors=6001

; aor static
[6001]
type=aor
contact=sip:6001@192.168.0.2.1:5060
contact=sip:6001@192.168.0.2.2:5060

; aor dynamic
[6001]
type=aor
default_exporation=3600
maximum_exporation=7200
minimum_exporation=60
max_contacts=1
remove_existing=yes
qualify_frequency=60
qualify_timeout=3.0

[auth6001]
type=auth
auth_type=userpass
password=secret
username=6001

[mytrunk]
type=registration
transport=simpletrans
outbound_auth=mytrunk
server_uri=sip:sip.example.com
client_uri=sip:1234567890@sip.example.com
retry_interval=60

[my-itsip]
type=wizard
sends_auth=yes
sends_registrations=yes
remote_hosts=sip.my-itsp.net
outbound_auth/username=my_username
outbound_auth/password=my_password
endpoint/context=default
aor/qualify_frequency=15


```

#### 禁用
```conf
noload => res_pjsip.so
noload => res_pjsip_pubsub.so
noload => res_pjsip_session.so
noload => chan_pjsip.so
noload => res_pjsip_exten_state.so
noload => res_pjsip_log_forwarder.so
```

#### 配置


* qualify_frequency
  * QoS
    

##### NAT
* rtp_symmetric
  * Send media to the address and port from which Asterisk receives it, regardless of where SDP indicates that it should be sent
* force_rport
  * Send responses to the source IP address and port as though port were present, even if it's not
* rewrite_contact
  * Rewrite SIP Contact to the source address and port of the request so that subsequent requests go to that address and port.
* [Configuring res_pjsip to work through NAT](https://wiki.asterisk.org/wiki/display/AST/Configuring+res_pjsip+to+work+through+NAT)

chan_sip/nat    | yes | no | never | route
----------------|-----|----|-------|------
rtp_symmetric   | yes | no | no | no
force_rport     | yes | no | no | yes
rewrite_contact | yes | no | no | yes



## Dialplan
* dialplan reload
* `dialplan show 88888888@from-app` 测试匹配
* cointext 名字长度为 80, 但有最后一位 null, 所以是 79
* [general] 和 [globals] 特殊
* 避免使用  [general], [default], 和 [globals] 作为名字
* channel 中 context 名字是通道开始的点
* 推荐使用非数字而是具体含义的名字作为不可拨号的扩展名
* 模式匹配规则
  * `_` 开始
  * X = [0-9], Z = [1-9], N = [2-9], [15-7] = [15-7] = 1|5|6|7
  * `. = .*`, `! = .+`
* 搜索顺序
  * Explicit extensions
  * Pattern match extensions
  * Includes
  * Switches
* 特殊扩展
  * a - Assistant extension
    * 类似于 o, 只有在录语音邮件时按 `*` 触发, 主要用于访问助手.
  * e - Exception Catchall extension
    * 用于捕获 `i`, `t`, `T` 扩展. 可使用 `EXCEPTION` 来获取到具体异常信息
  * h - Hangup extension
    * 在挂断后会触发
  * i - Invalid entry extension
    * 当 `Background`, `WaitExten` 的输入在当前上下文中找不到匹配的扩展时触发
  * o - Operator extension
    * 当在录制语言邮件时按 `0` 触发, 主要用于访问操作员
  * s - Start extension
    * 当模拟通话接入时触发, 也可以再宏中使用
    * 并不是用于捕获所有扩展, 只是简单的代表模拟通话和宏的开始.
  * t - Response timeout extension
    * `Background` 和 `WaitExten` 时超时
  * T - Absolute timeout extension
    * `absolute` 超时时触发
    * `core show function TIMEOUT`
* 变量
  * `${variable_name[:offset[:length]]}`
    * 裁剪
    * offset,length 可以为负
  * 通道变量在转移后,变量不会被继承
    * `_` 开始的变量会在单次转移后则会失效
    * `__` 开始的变量会在转移后一直继承
  * [标准的通道变量](https://wiki.asterisk.org/wiki/display/AST/Asterisk+Standard+Channel+Variables)
    * `CALLERID(name)`, `CALLERID(name)` 拨号者的名字和号码, 在 Dial 之前
    * `CHANNEL` 当前通道名
    * `CONTEXT` 当前上下文
    * `EXTEN` 当前扩展
    * `ENV(VAR)` 环境变量
    * `LEN(VAR)` 变量长度
    * `PRIORITY` 当前拨号计划的优先级
    * `UNIQUEID` 当前通话唯一标识符
* 表达式
  * `$[1+1]`
  * 操作符
    * `|`, `&`, `=`, `>=`, `<=`, `!=`, `>`, `<`, `+`, `-`
    * `! exp`, `- exp`
    * `a : b` 字符串正则匹配
      * 从头开始匹配
      * 前后的引号会被去除
      * 匹配成功, 如果有子表达式, 返回 `\1`, 否则返回匹配的字符数
      * 匹配失败, 如果有字表达式, 返回 `null`, 否则返回 0
    * `a =~ b`
      * 同 `:`, 但不从头开始匹配
    * `a ? b : c`
    * `a ~~ b`
      * 字符串链接
      * 会去除引号
  * 所有的数字均为浮点数, 表达浮点数必须要以 `D.D` 的形式, 转换为整数 `TRUNC`
* 参考
  * [AST/Dialplan](https://wiki.asterisk.org/wiki/display/AST/Dialplan)
  * [Asterisk Expressions](https://www.voip-info.org/wiki/view/Asterisk+Expressions)

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

## Command
```bash
# 请求发起通话
channel originate SIP/9001 extension 9002@public
```

* channel
  * `originate <tech/data> application <appname> [appdata]`
  * `originate <tech/data> extension [exten@][context]`
    * 发起通话
    * 发起通话时的 CALLER 需要调用者进行设置, 或者在 extension 中设置, 否则默认为 asterisk
    * 例如在 extension 中设置
      * `same => n,Set(CALLERID(num)=54321)`
      * `same => n,Set(CALLERID(name)=Asterisk)`
  * `redirect <channel> <[[context,]exten,]priority>`
    * 重定向一个通道到一个扩展
  * `hangup <channel>|<all>`
    * 挂断所有或单个通道

### AEL
* [Asterisk Extension Language](https://wiki.asterisk.org/wiki/pages/viewpage.action?pageId=4620445)
* [AEL version 2 BNF](https://wiki.asterisk.org/wiki/display/AST/AEL+version+2+BNF)
* [conf2ael](https://github.com/asterisk/asterisk/blob/master/utils/conf2ael.c)
  * conf 转 ael 工具
* [res/ael](https://github.com/asterisk/asterisk/tree/master/res/ael)
  * 源码



## Applications

* Answer()
  * 建立通道
* Playback(filename)
  * 播放预先录制好的声音文件
  * 预先附带的文件位于 /var/lib/asterisk/sounds, 但是是有语言限制的,主要注意
  * core show sounds 查看所有的, core show sound 查看单个
  * filename 可以是绝对路径,也可以是相对于音频文件夹的相对路径
  * filename 可以不带扩展类型,会尝试播放最好编码的文件
* Hangup([code])
  * code 为 ISDN cause code
* Progress()
  * 主要用于返回通话过程信息给对方,部分服务提供商可能对此有要求,当遇到奇怪问题的时候可以试试
* Goto(context,extension,priority)
* Goto(extension,priority)
* Goto(priority)
  * 跳转到其他的位置
* Background()
  * 在后台播放音频,但是是会等待 DTMF
  * 与 Playback 类似, 但用户马上可以做出操作而不是等待声音播放完成
* WaitExten([timeout])
  * 当 Background 播放完成后使用改程序等待 DTMF 数字输入
  * timeout 如果不传则会使用默认的, 参考 TIMEOUT()
  * 如果输入的扩展不存在则会使用 i 扩展
  * 如果超时了则会使用 t
* Dial(destination[,timeout[,option[,URI]]])
  * destination
    * DAHDI/1 模拟电话的 FXS 通道. DAHDI 技术, 资源(通道标识符) 1
    * SIP/0004F2001122
    * IAX2/Softphone
    * 同时多方拨号 DAHDI/1&SIP/0004F2001122&IAX2/Softphone, 但只会接通第一个
    * 远程 VoIP `technology/user[:password]@remote_host[:port][/remote_extension]`
  * 如果拨号失败会设置变量 DIALSTATUS 记录失败原因
  * DIALSTATUS
    * CHANUNAVAIL
    * CONGESTION
    * NOANSWER
    * BUSY
    * ANSWER
    * CANCEL
    * DONTCALL
    * TORTURE
    * INVALIDARGS
  * Digium 演示服务 Dial(DAHDI/[gGrR]channel_or_group[/remote_extension])
  * 例如 Dial(IAX2/guest@misery.digium.com/s)
  * 如果拨号成功则会桥接过去,而不会继续执行
```
exten => 502,1,Dial(DAHDI/1,10)
  ; 无人接听
  same => n,Playback(vm-nobodyavail)
  same => n,Hangup()
```
  * option 有非常多,例如 m,当在拨号时使用 moh 而不是对方的声音
  * URI 很少使用, 在支持的环境下可能会打开该 URI 指向的网页
  * 没有的参数可以留空 Dial(DAHDI/1,,m)
* Set()
  * 设置变量
  * 全局变量
  * 通道变量
    * ${EXTEN} 通道名
  * 环境变量(${ENV(var)})
  * 变量操作
    * `${EXTEN:x}` 移除前面 x 位
    * `${EXTEN:x:y}` y 为长度
    * x,y 可以为负
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
* SayNumber(number)
  * 报数, number 不能过大
* SayDigits(digits)
  * 说出每个数字
* Verbose([level,]message)
  * `Verbose(2, Call from VoIP network to ${EXTEN})`
  * 日志
* Monitor/StopMonitor
* MixMonitor(filename.extension[,options[,command]])/StopMixMonitor
  * 通话录音
  * 建议使用 Mix, 因为 Monitor 只会录制进的或出的
  * 建议录制为 wav , 每天归档时可考虑转换为 ogg
  * 默认存放目录 `/var/spool/asterisk/monitor`

### Dial
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


## Modules
* Tips
  * `module show` 显示所有模块


```
app_adsiprog.so                Asterisk ADSI Programming Application    0          Running          extended
app_agent_pool.so              Call center agent pool applications      0          Running              core
app_alarmreceiver.so           Alarm Receiver for Asterisk              0          Running          extended
app_amd.so                     Answering Machine Detection Application  0          Running          extended
app_authenticate.so            Authentication Application               0          Running              core
app_bridgeaddchan.so           Bridge Add Channel Application           0          Running              core
app_bridgewait.so              Place the channel into a holding bridge  0          Running              core
app_cdr.so                     Tell Asterisk to not maintain a CDR for  0          Running              core
app_celgenuserevent.so         Generate an User-Defined CEL event       0          Running              core
app_chanisavail.so             Check channel availability               0          Running          extended
app_channelredirect.so         Redirects a given channel to a dialplan  0          Running              core
app_chanspy.so                 Listen to the audio of an active channel 0          Running              core
app_confbridge.so              Conference Bridge Application            0          Running              core
app_controlplayback.so         Control Playback Application             0          Running              core
app_dahdiras.so                DAHDI ISDN Remote Access Server          0          Running          extended
app_db.so                      Database Access Functions                0          Running              core
app_dial.so                    Dialing Application                      0          Running              core
app_dictate.so                 Virtual Dictation Machine                0          Running          extended
app_directed_pickup.so         Directed Call Pickup Application         0          Running              core
app_directory.so               Extension Directory                      0          Running              core
app_disa.so                    DISA (Direct Inward System Access) Appli 0          Running              core
app_dumpchan.so                Dump Info About The Calling Channel      0          Running              core
app_echo.so                    Simple Echo Application                  0          Running              core
app_exec.so                    Executes dialplan applications           0          Running              core
app_externalivr.so             External IVR Interface Application       0          Running          extended
app_festival.so                Simple Festival Interface                0          Running          extended
app_flash.so                   Flash channel application                0          Running              core
app_followme.so                Find-Me/Follow-Me Application            0          Running              core
app_forkcdr.so                 Fork The CDR into 2 separate entities    0          Running              core
app_getcpeid.so                Get ADSI CPE ID                          0          Running          extended
app_ices.so                    Encode and Stream via icecast and ices   0          Running          extended
app_image.so                   Image Transmission Application           0          Running          extended
app_macro.so                   Extension Macros                         0          Running              core
app_meetme.so                  MeetMe conference bridge                 0          Running          extended
app_milliwatt.so               Digital Milliwatt (mu-law) Test Applicat 0          Running              core
app_minivm.so                  Mini VoiceMail (A minimal Voicemail e-ma 0          Running          extended
app_mixmonitor.so              Mixed Audio Monitoring Application       0          Running              core
app_morsecode.so               Morse code                               0          Running          extended
app_mp3.so                     Silly MP3 Application                    0          Running          extended
app_nbscat.so                  Silly NBS Stream Application             0          Running          extended
app_originate.so               Originate call                           0          Running              core
app_page.so                    Page Multiple Phones                     0          Running              core
app_playback.so                Sound File Playback Application          0          Running              core
app_playtones.so               Playtones Application                    0          Running              core
app_privacy.so                 Require phone number to be entered, if n 0          Running              core
app_queue.so                   True Call Queueing                       0          Running              core
app_read.so                    Read Variable Application                0          Running              core
app_readexten.so               Read and evaluate extension validity     0          Running              core
app_record.so                  Trivial Record Application               0          Running              core
app_sayunixtime.so             Say time                                 0          Running              core
app_senddtmf.so                Send DTMF digits Application             0          Running              core
app_sendtext.so                Send Text Applications                   0          Running              core
app_sms.so                     SMS/PSTN handler                         0          Running          extended
app_softhangup.so              Hangs up the requested channel           0          Running              core
app_speech_utils.so            Dialplan Speech Applications             0          Running              core
app_stack.so                   Dialplan subroutines (Gosub, Return, etc 0          Running              core
app_stasis.so                  Stasis dialplan application              0          Running              core
app_system.so                  Generic System() application             0          Running              core
app_talkdetect.so              Playback with Talk Detection             0          Running          extended
app_test.so                    Interface Test Application               0          Running          extended
app_transfer.so                Transfers a caller to another extension  0          Running              core
app_url.so                     Send URL Applications                    0          Running          extended
app_userevent.so               Custom User Event Application            0          Running              core
app_verbose.so                 Send verbose output                      0          Running              core
app_voicemail.so               Comedian Mail (Voicemail System) with IM 0          Running              core
app_waitforring.so             Waits until first ring after time        0          Running          extended
app_waitforsilence.so          Wait For Silence                         0          Running          extended
app_waituntil.so               Wait until specified time                0          Running              core
app_while.so                   While Loops and Conditional Execution    0          Running              core
app_zapateller.so              Block Telemarketers with Special Informa 0          Running          extended
bridge_builtin_features.so     Built in bridging features               1          Running              core
bridge_builtin_interval_features.so Built in bridging interval features      0          Running              core
bridge_holding.so              Holding bridge module                    0          Running              core
bridge_native_rtp.so           Native RTP bridging module               0          Running              core
bridge_simple.so               Simple two channel bridging module       0          Running              core
bridge_softmix.so              Multi-party software based channel mixin 0          Running              core
cdr_csv.so                     Comma Separated Values CDR Backend       0          Running          extended
cdr_custom.so                  Customizable Comma Separated Values CDR  0          Running              core
cdr_manager.so                 Asterisk Manager Interface CDR Backend   0          Running              core
cdr_pgsql.so                   PostgreSQL CDR Backend                   0          Running          extended
cdr_syslog.so                  Customizable syslog CDR Backend          0          Not Running          core
cel_manager.so                 Asterisk Manager Interface CEL Backend   0          Running              core
cel_pgsql.so                   PostgreSQL CEL Backend                   0          Running          extended
chan_bridge_media.so           Bridge Media Channel Driver              0          Running              core
chan_dahdi.so                  DAHDI Telephony w/PRI                    0          Running              core
chan_iax2.so                   Inter Asterisk eXchange (Ver 2)          0          Running              core
chan_pjsip.so                  PJSIP Channel Driver                     0          Running              core
chan_rtp.so                    RTP Media Channel                        0          Running              core
codec_a_mu.so                  A-law and Mulaw direct Coder/Decoder     0          Running              core
codec_adpcm.so                 Adaptive Differential PCM Coder/Decoder  0          Running              core
codec_alaw.so                  A-law Coder/Decoder                      0          Running              core
codec_dahdi.so                 Generic DAHDI Transcoder Codec Translato 0          Running              core
codec_g722.so                  ITU G.722-64kbps G722 Transcoder         0          Running              core
codec_g726.so                  ITU G.726-32kbps G726 Transcoder         0          Running              core
codec_gsm.so                   GSM Coder/Decoder                        0          Running              core
codec_ilbc.so                  iLBC Coder/Decoder                       0          Running              core
codec_lpc10.so                 LPC10 2.4kbps Coder/Decoder              0          Running              core
codec_resample.so              SLIN Resampling Codec                    0          Running              core
codec_ulaw.so                  mu-Law Coder/Decoder                     0          Running              core
format_g719.so                 ITU G.719                                0          Running              core
format_g723.so                 G.723.1 Simple Timestamp File Format     0          Running              core
format_g726.so                 Raw G.726 (16/24/32/40kbps) data         0          Running              core
format_g729.so                 Raw G.729 data                           0          Running              core
format_gsm.so                  Raw GSM data                             0          Running              core
format_h263.so                 Raw H.263 data                           0          Running              core
format_h264.so                 Raw H.264 data                           0          Running              core
format_ilbc.so                 Raw iLBC data                            0          Running              core
format_jpeg.so                 jpeg (joint picture experts group) image 0          Running          extended
format_pcm.so                  Raw/Sun uLaw/ALaw 8KHz (PCM,PCMA,AU), G. 0          Running              core
format_siren14.so              ITU G.722.1 Annex C (Siren14, licensed f 0          Running              core
format_siren7.so               ITU G.722.1 (Siren7, licensed from Polyc 0          Running              core
format_sln.so                  Raw Signed Linear Audio support (SLN) 8k 0          Running              core
format_vox.so                  Dialogic VOX (ADPCM) File Format         0          Running          extended
format_wav.so                  Microsoft WAV/WAV16 format (8kHz/16kHz S 0          Running              core
format_wav_gsm.so              Microsoft WAV format (Proprietary GSM)   0          Running              core
func_aes.so                    AES dialplan functions                   0          Running              core
func_audiohookinherit.so       Audiohook inheritance placeholder functi 0          Running        deprecated
func_base64.so                 base64 encode/decode dialplan functions  0          Running              core
func_blacklist.so              Look up Caller*ID name/number from black 0          Running              core
func_callcompletion.so         Call Control Configuration Function      0          Running              core
func_callerid.so               Party ID related dialplan functions (Cal 0          Running              core
func_cdr.so                    Call Detail Record (CDR) dialplan functi 0          Running              core
func_channel.so                Channel information dialplan functions   0          Running              core
func_config.so                 Asterisk configuration file variable acc 0          Running              core
func_curl.so                   Load external URL                        0          Running              core
func_cut.so                    Cut out information from a string        0          Running              core
func_db.so                     Database (astdb) related dialplan functi 0          Running              core
func_devstate.so               Gets or sets a device state in the dialp 0          Running              core
func_dialgroup.so              Dialgroup dialplan function              0          Running              core
func_dialplan.so               Dialplan Context/Extension/Priority Chec 0          Running              core
func_enum.so                   ENUM related dialplan functions          0          Running              core
func_env.so                    Environment/filesystem dialplan function 0          Running              core
func_extstate.so               Gets an extension's state in the dialpla 0          Running              core
func_frame_trace.so            Frame Trace for internal ast_frame debug 0          Running          extended
func_global.so                 Variable dialplan functions              0          Running              core
func_groupcount.so             Channel group dialplan functions         0          Running              core
func_hangupcause.so            HANGUPCAUSE related functions and applic 0          Running              core
func_holdintercept.so          Hold interception dialplan function      0          Running              core
func_iconv.so                  Charset conversions                      0          Running              core
func_jitterbuffer.so           Jitter buffer for read side of channel.  0          Running              core
func_lock.so                   Dialplan mutexes                         0          Running              core
func_logic.so                  Logical dialplan functions               0          Running              core
func_math.so                   Mathematical dialplan function           0          Running              core
func_md5.so                    MD5 digest dialplan functions            0          Running              core
func_module.so                 Checks if Asterisk module is loaded in m 0          Running              core
func_periodic_hook.so          Periodic dialplan hooks.                 0          Running              core
func_pitchshift.so             Audio Effects Dialplan Functions         0          Running          extended
func_pjsip_aor.so              Get information about a PJSIP AOR        0          Running              core
func_pjsip_contact.so          Get information about a PJSIP contact    0          Running              core
func_pjsip_endpoint.so         Get information about a PJSIP endpoint   0          Running              core
func_presencestate.so          Gets or sets a presence state in the dia 0          Running              core
func_rand.so                   Random number dialplan function          0          Running              core
func_realtime.so               Read/Write/Store/Destroy values from a R 0          Running              core
func_sha1.so                   SHA-1 computation dialplan function      0          Running              core
func_shell.so                  Collects the output generated by a comma 0          Running              core
func_sorcery.so                Get a field from a sorcery object        0          Running              core
func_sprintf.so                SPRINTF dialplan function                0          Running              core
func_srv.so                    SRV related dialplan functions           0          Running              core
func_strings.so                String handling dialplan functions       0          Running              core
func_sysinfo.so                System information related functions     0          Running              core
func_talkdetect.so             Talk detection dialplan function         0          Running              core
func_timeout.so                Channel timeout dialplan functions       0          Running              core
func_uri.so                    URI encode/decode dialplan functions     0          Running              core
func_version.so                Get Asterisk Version/Build Info          0          Running              core
func_vmcount.so                Indicator for whether a voice mailbox ha 0          Running              core
func_volume.so                 Technology independent volume control    0          Running              core
pbx_ael.so                     Asterisk Extension Language Compiler     0          Not Running      extended
pbx_config.so                  Text Extension Configuration             0          Running              core
pbx_loopback.so                Loopback Switch                          0          Running              core
pbx_lua.so                     Lua PBX Switch                           0          Not Running      extended
pbx_realtime.so                Realtime Switch                          0          Running          extended
pbx_spool.so                   Outgoing Spool Support                   0          Running              core
res_adsi.so                    ADSI Resource                            0          Running              core
res_ael_share.so               share-able code for AEL                  0          Running          extended
res_agi.so                     Asterisk Gateway Interface (AGI)         1          Running              core
res_ari.so                     Asterisk RESTful Interface               10         Running              core
res_ari_applications.so        RESTful API module - Stasis application  0          Running              core
res_ari_asterisk.so            RESTful API module - Asterisk resources  0          Running              core
res_ari_bridges.so             RESTful API module - Bridge resources    0          Running              core
res_ari_channels.so            RESTful API module - Channel resources   0          Running              core
res_ari_device_states.so       RESTful API module - Device state resour 0          Running              core
res_ari_endpoints.so           RESTful API module - Endpoint resources  0          Running              core
res_ari_events.so              RESTful API module - WebSocket resource  0          Running              core
res_ari_model.so               ARI Model validators                     0          Running              core
res_ari_playbacks.so           RESTful API module - Playback control re 0          Running              core
res_ari_recordings.so          RESTful API module - Recording resources 0          Running              core
res_ari_sounds.so              RESTful API module - Sound resources     0          Running              core
res_calendar.so                Asterisk Calendar integration            0          Running              core
res_clialiases.so              CLI Aliases                              0          Running              core
res_clioriginate.so            Call origination and redirection from th 0          Running              core
res_config_curl.so             Realtime Curl configuration              0          Running              core
res_config_pgsql.so            PostgreSQL RealTime Configuration Driver 0          Running          extended
res_convert.so                 File format conversion CLI command       0          Running              core
res_crypto.so                  Cryptographic Digital Signatures         1          Running              core
res_curl.so                    cURL Resource Module                     0          Running              core
res_format_attr_celt.so        CELT Format Attribute Module             1          Running              core
res_format_attr_g729.so        G.729 Format Attribute Module            1          Running              core
res_format_attr_h263.so        H.263 Format Attribute Module            1          Running              core
res_format_attr_h264.so        H.264 Format Attribute Module            1          Running              core
res_format_attr_ilbc.so        iLBC Format Attribute Module             1          Running              core
res_format_attr_opus.so        Opus Format Attribute Module             1          Running              core
res_format_attr_silk.so        SILK Format Attribute Module             1          Running              core
res_format_attr_siren14.so     Siren14 Format Attribute Module          1          Running              core
res_format_attr_siren7.so      Siren7 Format Attribute Module           1          Running              core
res_format_attr_vp8.so         VP8 Format Attribute Module              1          Running              core
res_hep.so                     HEPv3 API                                0          Running          extended
res_hep_pjsip.so               PJSIP HEPv3 Logger                       0          Running          extended
res_hep_rtcp.so                RTCP HEPv3 Logger                        0          Running           unknown
res_http_media_cache.so        HTTP Media Cache Backend                 1          Running              core
res_http_websocket.so          HTTP WebSocket Support                   2          Running          extended
res_limit.so                   Resource limits                          0          Running              core
res_manager_devicestate.so     Manager Device State Topic Forwarder     0          Running              core
res_manager_presencestate.so   Manager Presence State Topic Forwarder   0          Running              core
res_monitor.so                 Call Monitoring Resource                 0          Running              core
res_musiconhold.so             Music On Hold Resource                   0          Running              core
res_mutestream.so              Mute audio stream resources              0          Running              core
res_parking.so                 Call Parking Resource                    0          Running              core
res_phoneprov.so               HTTP Phone Provisioning                  0          Running          extended
res_pjproject.so               PJPROJECT Log and Utility Support        1          Running              core
res_pjsip.so                   Basic SIP resource                       26         Running              core
res_pjsip_acl.so               PJSIP ACL Resource                       0          Running              core
res_pjsip_authenticator_digest.so PJSIP authentication resource         0          Running              core
res_pjsip_caller_id.so         PJSIP Caller ID Support                  0          Running              core
res_pjsip_config_wizard.so     PJSIP Config Wizard                      1          Running              core
res_pjsip_dialog_info_body_generator.so PJSIP Extension State Dialog Info+XML Pr 0          Running              core
res_pjsip_diversion.so         PJSIP Add Diversion Header Support       0          Running              core
res_pjsip_dlg_options.so       SIP OPTIONS in dialog handler            0          Running           unknown
res_pjsip_dtmf_info.so         PJSIP DTMF INFO Support                  0          Running              core
res_pjsip_empty_info.so        PJSIP Empty INFO Support                 0          Running              core
res_pjsip_endpoint_identifier_anonymous.so PJSIP Anonymous endpoint identifier      0          Running              core
res_pjsip_endpoint_identifier_ip.so PJSIP IP endpoint identifier        0          Running              core
res_pjsip_endpoint_identifier_user.so PJSIP username endpoint identifier0          Running              core
res_pjsip_exten_state.so       PJSIP Extension State Notifications      0          Running              core
res_pjsip_header_funcs.so      PJSIP Header Functions                   0          Running              core
res_pjsip_history.so           PJSIP History                            0          Running          extended
res_pjsip_logger.so            PJSIP Packet Logger                      0          Running              core
res_pjsip_messaging.so         PJSIP Messaging Support                  0          Running              core
res_pjsip_multihomed.so        PJSIP Multihomed Routing Support         0          Running              core
res_pjsip_mwi.so               PJSIP MWI resource                       0          Running              core
res_pjsip_mwi_body_generator.so PJSIP MWI resource                      0          Running              core
res_pjsip_nat.so               PJSIP NAT Support                        0          Running              core
res_pjsip_notify.so            CLI/AMI PJSIP NOTIFY Support             0          Running              core
res_pjsip_one_touch_record_info.so PJSIP INFO One Touch Recording Support   0          Running              core
res_pjsip_outbound_authenticator_digest.so PJSIP authentication resource0          Running              core
res_pjsip_outbound_publish.so  PJSIP Outbound Publish Support           4          Running           unknown
res_pjsip_outbound_registration.so PJSIP Outbound Registration Support  0          Running              core
res_pjsip_path.so              PJSIP Path Header Support                0          Running              core
res_pjsip_phoneprov_provider.so PJSIP Phoneprov Provider                0          Running           unknown
res_pjsip_pidf_body_generator.so PJSIP Extension State PIDF Provider    0          Running              core
res_pjsip_pidf_digium_body_supplement.so PJSIP PIDF Digium presence supplement    0          Running              core
res_pjsip_pidf_eyebeam_body_supplement.so PJSIP PIDF Eyebeam supplement 0          Running              core
res_pjsip_publish_asterisk.so  PJSIP Asterisk Event PUBLISH Support     0          Running           unknown
res_pjsip_pubsub.so            PJSIP event resource                     5          Running              core
res_pjsip_refer.so             PJSIP Blind and Attended Transfer Suppor 0          Running              core
res_pjsip_registrar.so         PJSIP Registrar Support                  0          Running              core
res_pjsip_registrar_expire.so  PJSIP Contact Auto-Expiration            0          Running              core
res_pjsip_rfc3326.so           PJSIP RFC3326 Support                    0          Running              core
res_pjsip_sdp_rtp.so           PJSIP SDP RTP/AVP stream handler         0          Running              core
res_pjsip_send_to_voicemail.so PJSIP REFER Send to Voicemail Support    0          Running              core
res_pjsip_session.so           PJSIP Session resource                   25         Running              core
res_pjsip_sips_contact.so      UAC SIPS Contact support                 0          Running              core
res_pjsip_t38.so               PJSIP T.38 UDPTL Support                 0          Running              core
res_pjsip_transport_management.so PJSIP Reliable Transport Management   1          Running              core
res_pjsip_transport_websocket.so PJSIP WebSocket Transport Support      0          Running              core
res_pjsip_xpidf_body_generator.so PJSIP Extension State PIDF Provider   0          Running              core
res_realtime.so                Realtime Data Lookup/Rewrite             0          Running              core
res_rtp_asterisk.so            Asterisk RTP Stack                       0          Running              core
res_rtp_multicast.so           Multicast RTP Engine                     0          Running              core
res_security_log.so            Security Event Logging                   0          Running              core
res_smdi.so                    Simplified Message Desk Interface (SMDI) 0          Running              core
res_sorcery_astdb.so           Sorcery Astdb Object Wizard              2          Running              core
res_sorcery_config.so          Sorcery Configuration File Object Wizard 16         Running              core
res_sorcery_memory.so          Sorcery In-Memory Object Wizard          8          Running              core
res_sorcery_memory_cache.so    Sorcery Memory Cache Object Wizard       0          Running              core
res_sorcery_realtime.so        Sorcery Realtime Object Wizard           0          Running              core
res_speech.so                  Generic Speech Recognition API           0          Running              core
res_srtp.so                    Secure RTP (SRTP)                        0          Running              core
res_stasis.so                  Stasis application support               12         Running              core
res_stasis_answer.so           Stasis application answer support        0          Running              core
res_stasis_device_state.so     Stasis application device state support  0          Running              core
res_stasis_playback.so         Stasis application playback support      0          Running              core
res_stasis_recording.so        Stasis application recording support     0          Running              core
res_stasis_snoop.so            Stasis application snoop support         0          Running              core
res_statsd.so                  Statsd client support                    0          Running          extended
res_stun_monitor.so            STUN Network Monitor                     0          Running              core
res_timing_dahdi.so            DAHDI Timing Interface                   0          Not Running          core
res_timing_pthread.so          pthread Timing Interface                 0          Running          extended
res_timing_timerfd.so          Timerfd Timing Interface                 1          Running              core
```
