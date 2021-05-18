---
id: reference
title: 参考
---

# Asterisk Reference

## Tips

- [chan-sccp/chan-sccp](https://github.com/chan-sccp/chan-sccp)
  - http://chan-sccp-b.sourceforge.net/
  - a replacement Channel Driver for chan_skinny in the Asterisk Channel Driver Library
- BUGS
  - [#26423]https://issues.asterisk.org/jira/browse/ASTERISK-26423 res_pjsip_sdp_rtp: Asymmetric RTP codec can cause audio loss and wonkiness

## Install

- https://git.alpinelinux.org/cgit/aports/tree/main/asterisk/APKBUILD

## FAQ

### user , peer, friend

- user 本端做验证, 呼入
- peer 远端做验证, 呼出
- friend 两端都要验证
- agent
  - 用户代理
    - 终端
  - 代理服务

### Macro vs Sub

- 首选 Sub
- Macro 最多 7 层嵌套

### Failed to insert call detail record into database

在使用 `PJSIP_DIAL_CONTACTS` 时, 号码可能非常长, 会导致数据库插入失败

```
[Sep  5 11:34:50] WARNING[11511]: cel_pgsql.c:351 pgsql_log: Failed to insert call detail record into database!
[Sep  5 11:34:50] WARNING[11511]: cel_pgsql.c:352 pgsql_log: Reason: ERROR:  value too long for type character varying(80)
```

### 对接 O 口网关时, 程序崩溃

可能是由于 UDP 消息截断导致, 打开日志可以看到消息内容应该只有一部分

### CDR vs CEL

- 都可以对接后端存储
- CDR
  - 相对信息更少
- CEL
  - 支持用于账单
  - Control over which Asterisk applications are tracked.
  - Control over which events should be raised.
  - Configurable date format.
  - Integration with the Asterisk Manager Interface.
  - Integration with RADIUS
  - Modules for various logging back-ends including customized CEL output, integration with ODBC, PGSQL, SQLite and TDS.

### DAHDi 有持续性的噪音

- 可能是打开了 crc4 导致的, 在 `system.conf` 中关闭即可
- 如果有异常, 那也可能是 crc4 导致的

### DAHDi 拨号选项

- [channels/chan_dahdi.c#L13167](https://github.com/asterisk/asterisk/blob/master/channels/chan_dahdi.c#L13167)
- `Dial(DAHDI/pseudo[/extension[/options]])`
- `Dial(DAHDI/<channel#>[c|r<cadance#>|d][/extension[/options]])`
- `Dial(DAHDI/<subdir>!<channel#>[c|r<cadance#>|d][/extension[/options]])`
- `Dial(DAHDI/i<span>[/extension[/options]])`
- `Dial(DAHDI/[i<span>-](g|G|r|R)<group#(0-63)>[c|r<cadance#>|d][/extension[/options]])`
- i - ISDN span channel restriction.
  - Used by CC to ensure that the CC recall goes out the same span.
  - Also to make ISDN channel names dialable when the sequence number is stripped off. (Used by DTMF attended transfer feature.)
- g - channel group allocation search forward
- G - channel group allocation search backward
- r - channel group allocation round robin search forward
- R - channel group allocation round robin search backward
- c - Wait for DTMF digit to confirm answer
- r<cadance#> - Set distintive ring cadance number
- d - Force bearer capability for ISDN/SS7 call to digital.

### PJ ICE Rx error status code: 370401

### Core Dump

- [Getting a Backtrace](https://wiki.asterisk.org/wiki/display/AST/Getting+a+Backtrace)
- 需要安装 `gdb`
- 除非编译时带了 `DEBUG_THREADS`, 否则 `locks` 为空
- 可以使用 `libbfd`, 在编译时加上 `DONT_OPTIMIZE`, `BETTER_BACKTRACES` 以获得更好的转储信息
- 默认转储文件位于当前目录下的 `core`, 会遵循 `kernel.core_pattern` 配置将转储存到指定的地方

```bash
sysctl -n kernel.core_pattern

/var/lib/asterisk/scripts/ast_coredumper core
```

### `Probation passed` 后程序崩溃

- 在 cli.conf 中打开全量日志
- `res_rtp_asterisk.c: Unsupported payload type received`
  - [res_rtp_asterisk.c#L5109](https://github.com/asterisk/asterisk/blob/master/res/res_rtp_asterisk.c#L5109)
  - http://asteriskfaqs.org/2017/03/14/asterisk-users/codec-negotiation-or-transcoding-issue.html
    - https://issues.asterisk.org/jira/browse/ASTERISK-26423
    - https://issues.asterisk.org/jira/browse/ASTERISK-25676

### CEL 数据库写入失败, 字段过长

- 应该是 appdata 字段导致, 可以将数据库的长度改长

## DAHDi

- [asterisk/dahdi-linux](https://github.com/asterisk/dahdi-linux)

## DTMF/Dual-tone multi-frequency

- [DTMF:wikipedia](https://en.wikipedia.org/wiki/Dual-tone_multi-frequency_signaling)
- https://www.voip-info.org/wiki/view/Asterisk+sip+dtmfmode
- https://www.voip-info.org/wiki/view/DTMF
- 可选模式包括
  - inband
  - rfs2833
  - info
  - auto

## ADSI/Analog Display Services Interface

- https://www.voip-info.org/wiki/view/ADSI
- adsi.conf
- asterisk.adsi

## HA

- [Asterisk High Availability Design](https://www.voip-info.org/wiki/view/Asterisk+High+Availability+Design)

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

- sqlite
  - render_as_batch=True

### 找不到 `ENUM`

- [ASTERISK-27272](https://issues.asterisk.org/jira/browse/ASTERISK-27272)
  使用的那个版本配置可能有点问题, 在那个文件里添加以下内容即可

```python
from sqlalchemy.dialects.postgresql import ENUM
YESNO_NAME = 'yesno_values'
YESNO_VALUES = ['yes', 'no']
```

### 实时配置

- [Realtime Database Configuration](https://wiki.asterisk.org/wiki/display/AST/Realtime+Database+Configuration)
- 实时模块主要是抽象数据层的访问, 是可以添加自定义的表的

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

```bash
# 获取一条数据
realtime load sippeers name 9009
realtime load queues name marka

# 操作自定义的表
realtime load staffs no 8002
```

**cel.postgres.sql**

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

- [Sorcery](https://wiki.asterisk.org/wiki/display/AST/Sorcery)
- Asterisk 12 添加
- 数据对象 CURD 抽象层
  - Asterisk Database
  - Static Configuration Files
  - Asterisk Realtime Architecture
  - In-Memory
- 提供了缓存服务, 用于从 ARI 推送配置
- `AST_SORCERY(module_name,object_type,object_id,field_name[,retrieval_method[,retrieval_details]])`
  - 操作函数
    - retrieval_method, 默认为 concat
      - concat, 当有多条数据时进行拼接, 默认使用 `,`
      - single, 当有多条时返回一条记录, 默认为 `1`
    - retrieval_details, 控制 concat 的连接符和 single 的位置
- 先配置 extconfig.conf, 再配置 sorcery.conf 使用 extconfig 中定义的信息

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

**\_extconfig.conf**

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

**sorcery.conf**

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

- 同一时间只能启用一个, 默认启用 oss
- ALSA - Advanced Linux Sound Architecture
- OSS - Open Sound System
  - Linux 2.6 默认为 ALSA, OSS 标记为废弃
- console - [PortAudio](https://en.wikipedia.org/wiki/PortAudio)

### chan_sip

- 传输支持: tcp,udp,tls,ws,wss
  - tcp 和 tls 位于实验阶段
- 5060: This is the standard port for SIP communications
- 8089: This is the standard port for Secure Websockets when used with Asterisk's built-in HTTP sever
- 10000:20000: This is the port range configured in rtp.conf for audio to flow.

#### QoS

- [IP Quality of Service](https://wiki.asterisk.org/wiki/display/AST/IP+Quality+of+Service)
- 默认未开启 QoS, 所以 Peer 的状态都是显示的未知

### res_pjsip

- 总结: 建议使用 `res_pjsip`, 禁用 `chan_sip`
- [SIP vs. CHAN_SIP vs. CHAN_PJSIP](https://www.linkedin.com/pulse/faqs-sip-vs-chansip-chanpjsip-kent-adams)
- [Migrating from chan sip to res pjsip](https://youtu.be/KD-48p0iALg)
  - [幻灯片](https://www.controlaltdieliet.be/astricon2015/pjsip/presentation/index.html)
  - [astricon2015](https://www.controlaltdieliet.be/astricon2015/)
    - 脚本和相关文件配置
    - 包含数据库 `sippeers` 转 `ps_` 的脚本
- [PJSIP: Tuning for Performance](https://youtu.be/BDB4Sr9NVSM)
- WHY
  - 更好的配置
  - 多个 aors -> 单个终端
    - 多个终端共振
  - NAT 更简单
  - 没有 user,peer,friend
  - 更好的设备和邮箱状态
  - 更简单更快更好的开发
- 配置类型
  - transport
    - 绑定 res_pjsip 到地址端口
    - 可绑定多个
    - 不能重载
  - endpoint
    - 发起和接收通话的设备
    - 包含: transport, aor, auth
    - 配置的 transport 主要用于发送, 所有的都能接收
  - auth
    - `auth_type`
      - 授权类型
      - nonce_lifetime
        - 单位 秒
        - 默认 32
      - userpass
        - password 存储明文
      - md5
        - md5_cred 存储密文
        - 格式为 账号:asterisk:密码
        - asterisk 为 realm, 可以修改
  - aor
    - Address of Record
    - Multiple AORS for 1 device
    - AORS can be overwritten or not
    - Can be static or dynamic (qualify)
  - identify
    - Endpoint Identification
    - `res_pjsip_endpoint_identifier_ip`
      - 基于 IP 的认证
      - 匹配进入的包 -> 终端
    - `res_pjsip_endpoint_identifier_user`
      - 可以从 `From` 头中提取出用户信息由于验证
    - 使用 IP 还是用用户取决于模块加载顺序
    - 用于外部线路，直接匹配 IP 来对应 endpoint
  - registration
    - 将 Asterisk 连接到另外一个 Asterisk
    - 以前为 `register => username:password@server/context`
  - acl
    - Access Control List
  - phoneprov
    - Phone Provisioning
  - System
  - Domain alias
    - 域名别名
    - 在 AOR 的域名找不到时尝试找别名
  - outbound-publish
- Tips
  - `Dial(PJSIP/${EXTEN})`
  - `Dial(${PJSIP_DIAL_CONTACTS(${EXTEN})})`
    - 拨打所有设备
    - `PJSIP/9001/sip:9001@192.168.1.90:33322&PJSIP/9001/sip:9001@192.168.1.91:58069`
  - `Dial(PJSIP/mytrunk/sip:${EXTEN:1})`
  - `Dial(PJSIP/${EXTEN:1}@mytrunk)`
- PJSIP 使用的表前缀为 `ps_`, 有很多表, 而不像 chan_sip 只有一个 sippeers 表
  - aors, auths, contacts, endpoints, domain_aliases, endpoint_id_ips, globals, registrations, subscription_persistence, systems, transports

```bash
# 问题排查
core set verbose 4
core set debug 4
pjsip set logger on
```

```conf
[ts-udp]
type=transport
protocol=udp
bind=0.0.0.0
[ts-tcp]
type=transport
protocol=tcp
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


; 简单的用户模板
[user-template](!)
type = wizard
accepts_registrations = yes
accepts_auth = yes
endpoint/context = default
endpoint/allow = !all,ulaw,gsm,g722
aor/max_contacts=5

[9001](user-template)
inbound_auth/username = 9001
inbound_auth/password = 9001

[9002](user-template)
inbound_auth/username = 9002
inbound_auth/password = 9002
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

#### wizard

#### 配置

- qualify_frequency
  - QoS

##### NAT

- rtp_symmetric
  - Send media to the address and port from which Asterisk receives it, regardless of where SDP indicates that it should be sent
- force_rport
  - Send responses to the source IP address and port as though port were present, even if it's not
- rewrite_contact
  - Rewrite SIP Contact to the source address and port of the request so that subsequent requests go to that address and port.
- [Configuring res_pjsip to work through NAT](https://wiki.asterisk.org/wiki/display/AST/Configuring+res_pjsip+to+work+through+NAT)

| chan_sip/nat    | yes | no  | never | route |
| --------------- | --- | --- | ----- | ----- |
| rtp_symmetric   | yes | no  | no    | no    |
| force_rport     | yes | no  | no    | yes   |
| rewrite_contact | yes | no  | no    | yes   |

## Modules

- Tips
  - `module show` 显示所有模块

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
