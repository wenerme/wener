---
id: conf
title: Asterisk 配置
---

## 目录

* [文件和目录结构](https://wiki.asterisk.org/wiki/display/AST/Directory+and+File+Structure)
* `astetcdir => /etc/asterisk`
  * 用于存储配置文件
  * 一般为 `.conf` 但也包含 `.lua` 和 `.ael`
* `astmoddir => /usr/lib/asterisk/modules`
  * 模块目录
* `astvarlibdir => /var/lib/asterisk`
  * 运行时生成的目录
* `astdbdir => /var/lib/asterisk`
  * 存储内部数据库
  * [astdb.sqlite3](https://wiki.asterisk.org/wiki/display/AST/SQLite3+astdb+back-end)
* `astkeydir => /var/lib/asterisk`
  * 存储密钥，生成 `keys` 子目录 - 可能会锁定
* `astdatadir => /var/lib/asterisk`
  * 系统数据目录
  * sounds 存储声音
* `astagidir => /var/lib/asterisk/agi-bin`
  * 存储 AGI - Asterisk Gateway Interface
* `astspooldir => /var/spool/asterisk`
  * 存储各种模块的 spool 文件
  * 常见的子目录
    * dictate
    * meetme
    * monitor
    * outgoing
    * recording
    * system
    * tmp
    * voicemail
* `astrundir => /var/run/asterisk`
  * 运行目录
  * 存储 `asterisk.ctl` `asterisk.pid`
* `astlogdir => /var/log/asterisk`
  * 存储[日志](https://wiki.asterisk.org/wiki/display/AST/Logging)
* `astsbindir => /usr/sbin`
  * 系统可执行文件

## 配置

### 配置文件

* 目录解释


https://wiki.asterisk.org/wiki/display/AST/Asterisk+Configuration+Files
execincludes=yes

asterisk.conf
modules.conf

```conf
[section-name]
setting=true
#include otherconfig.conf      ; include another configuration file
#include my_other_files/*.conf ; include all .conf files in the subdirectory my_other_files
#tryinclude mytest/*.conf
#exec otherprogram             ; include output of otherprogram


#exec /usr/bin/curl -s http://example.com/mystuff > /etc/asterisk/mystuff
#include mystuff
```

https://github.com/asterisk/asterisk/tree/master/configs/samples
https://github.com/asterisk/asterisk/tree/master/configs/basic-pbx


https://github.com/asterisk/asterisk/tree/master/contrib/ast-db-manage

```bash
docker run --rm -it --name ast wener/asterisk:full

# 拷贝出配置文件
docker cp ast:/etc/asterisk etc
docker cp ast:/etc/dahdi etc
# 拷贝出录音文件
docker cp ast:/var/lib/asterisk/moh var/lib/asterisk/moh
docker cp ast:/var/lib/asterisk/sounds var/lib/asterisk/sounds

# 拷贝完成后可以使用主机上的配置启动 - 并添加宿主主机目录和 DB
# 16.6 - PG 12 有兼容问题
# https://github.com/asterisk/asterisk/commit/52ade18420b346449dff40d6bdb071444cf29e2d
docker run -d \
  -p 5432:5432 -v $PWD/pg:/var/lib/postgresql/data \
  -e POSTGRES_USER=ast -e POSTGRES_PASSWORD=ast -e POSTGRES_DB=ast \
  --name ast-pg postgres:11-alpine

docker run --rm -it \
  -v $PWD/etc/asterisk:/etc/asterisk \
  -v $PWD/etc/dahdi:/etc/dahdi \
  -v $PWD:/host \
  --link ast-pg:ast-pg \
  --name ast wener/asterisk:full

# 启动服务 - 可以了解各种命令
asterisk -cvvv
```

```bash
# 所有加载的模块 - 可以逐步了解各个模块
module show

core restart

# pg 相关模块 - cdr cel config
module show like pgsql
```

## asterisk.conf
核心配置文件


```conf
# 目录配置
[directories](!)
# 配置目录
astetcdir => /etc/asterisk
# 模块目录
astmoddir => /usr/lib/asterisk/modules
astvarlibdir => /var/lib/asterisk
astdbdir => /var/lib/asterisk
astkeydir => /var/lib/asterisk
astdatadir => /var/lib/asterisk
astagidir => /var/lib/asterisk/agi-bin
astspooldir => /var/spool/asterisk
astrundir => /var/run/asterisk
astlogdir => /var/log/asterisk
astsbindir => /usr/sbin
```

## modules.conf
模块配置

```conf
[modules]
; 是否自动加载 - 初学建议自动加载，当配置确定后建议添加 noload
autoload=yes

; 必须加载
require = chan_pjsip.so

; 加载
load => res_musiconhold.so

; 不加载
noload => chan_alsa.so
;noload => chan_oss.so
noload => chan_console.so
```

### 示例

```conf
[modules]
; 以前需要 preload - 现在不需要了
load => res_config_pgsql.so
load => res_realtime.so

autoload=yes

; 使用 pg 数据库 - res_pgsql.conf cdr_pgsql.conf cel_pgsql.conf
noload => res_odbc.so
noload => res_config_odbc.so
noload => res_config_sqlite3.so
noload => res_odbc_transaction.so

noload => func_odbc.so

noload => cel_tds.so
noload => cel_odbc.so
noload => cel_sqlite3_custom.so
noload => cel_custom.so

noload => cdr_tds.so
noload => cdr_sqlite3_custom.so
noload => cdr_odbc.so
noload => cdr_mysql.so
noload => cdr_adaptive_odbc.so
noload => cdr_csv.so
noload => cdr_custom.so

; 使用 pgsip
noload => chan_mobile.so
noload => chan_dongle.so
noload => chan_skinny.so
noload => chan_phone.so
noload => chan_unistim.so
noload => chan_mgcp.so
noload => chan_sip.so

; 推荐使用 alsa - docker 下只能使用 oss
noload => chan_console.so
noload => chan_alsa.so
; 如果运行环境并不能连接耳机等，可以考虑直接关闭
noload => chan_oss.so

; DAHDi
noload => chan_dahdi.so
noload => codec_dahdi.so
noload => res_timing_dahdi

; 不需要 pbx_*
noload => pbx_dundi.so
noload => pbx_gtkconsole.so
noload => pbx_ael.so

noload => res_hep_rtcp.so
noload => res_hep_pjsip.so

; 不需要的一些模块
noload => res_phoneprov.so
noload => res_pjsip_phoneprov_provider.so
noload => res_smdi.so
```

## res_pgsql.conf
```conf
[general]
dbhost=ast-pg
dbport=5432
dbname=ast
dbuser=ast
dbpass=ast
; 如果配置列不存在
; warn 警告 createclose 创建尽量类似的列 createchar 只创建 char 列
requirements=warn
```

## calender

https://www.voip-info.org/asterisk-config-alsaconf/
alsa.conf

## cdr
* 呼叫详细记录
### cdr.conf

```conf
[general]
enable=yes

; 是否记录未应答
unanswered = yes

; 是否记录被拥塞呼叫
congestion = yes

; 是否在 h/hangup 之前结束 CDR - 默认等待所有扩展执行完成
endbeforehexten=no

; 日志记录使用 billsec 字段 - 挂断时间减应答时间 - 秒级
; 系统内部使用 微秒和秒 - 开启该配置会影响微秒计算 round up - 一般使用影响不大
;initiatedseconds=no

; 批量 - 默认未开启
; 在 kill -9 可能丢失数据
;batch=no

; 批大小
;size=100

; 批缓冲最大时间 - 秒 - 默认 5 分钟
;time=300

; 默认在调度线程提交 - 如果批较大设置为 no 则在在额外线程进行提交
;scheduleronly=no

; 停止服务时安全写入日志 - cdr status 可以看当前的提交情况
;safeshutdown=yes
```

### cdr_manager.conf

```conf
[general]
enabled = no

; 定义额外的包含在管理事件中的 KV 值
; "varname => label" 映射为 "label: ${CDR(varname)}"
;[mappings]
;rate => Rate
;carrier => Carrier
```

### cdr_pgsql.conf
CDR 记录到 PG 数据库

```conf
hostname=db
port=5432
dbname=ast
password=ast
user=ast
appname=asterisk    ; Postgres application_name support (optional). Whitespace not allowed.
table=cdr		        ; 记录的表名
;encoding=LATIN9	  ; 日志编码
;timezone=UTC		    ; 时区
```

### cdr_beanstalkd.conf
https://github.com/beanstalkd/beanstalkd

Simple and fast general purpose work queue.

```conf
[general]
enabled = yes

host = 127.0.0.1
port = 11300
tube = asterisk-cdr ; 队列
priority = 99       ; 默认优先级 - 在存在多个 asterisk 时有用
```

## cel

### cel.conf

```conf
[general]
; 开启
enable=yes

; 应用事件跟踪
; 逗号分割的应用列表，例如 dial,park
; all 标示全部开启，可能影响性能
apps=dial,park

; 事件跟踪
; 逗号分割的事件列表
;
;  ALL              -- Generate entries on all events
;  CHAN_START       -- The time a channel was created
;  CHAN_END         -- The time a channel was terminated
;  ANSWER           -- The time a channel was answered (ie, phone taken off-hook)
;  HANGUP           -- The time at which a hangup occurred
;  BRIDGE_ENTER       -- The time a channel was connected into a conference room
;  BRIDGE_EXIT        -- The time a channel was removed from a conference room
;  APP_START        -- The time a tracked application was started
;  APP_END          -- the time a tracked application ended
;  PARK_START       -- The time a call was parked
;  PARK_END         -- Unpark event
;  BLINDTRANSFER    -- When a blind transfer is initiated
;  ATTENDEDTRANSFER -- When an attended transfer is initiated
;  PICKUP           -- This channel picked up the specified channel
;  FORWARD          -- This channel is being forwarded somewhere else
;  LINKEDID_END     -- The last channel with the given linkedid is retired
;  USER_DEFINED     -- Triggered from the dialplan, and has a name given by the
;                      user
;  LOCAL_OPTIMIZE   -- A local channel pair is optimizing away.
;
;events=APP_START,CHAN_START,CHAN_END,ANSWER,HANGUP,BRIDGE_ENTER,BRIDGE_EXIT
events=ALL

; 日期格式
; strftime 支持的格式
;
; 例如: "%F %T" "2009-06-23 17:02:35"
; 不指定默认为 "<seconds>.<microseconds>" - microseconds 长度固定 6 有前缀0
;
;dateformat = %F %T

; Asterisk Manager Interface (AMI) 事件记录
[manager]
enabled=yes

; 显示 USER_DEFINED 事件类型而不是直接放事件名字
; 可以使用 UserDefType 头指定
show_user_defined=yes

;
; RADIUS CEL Backend 
;
[radius]
;
; Log date/time in GMT
;usegmtime=yes
;
; Set this to the location of the radiusclient-ng configuration file
; The default is /etc/radiusclient-ng/radiusclient.conf
;radiuscfg => /usr/local/etc/radiusclient-ng/radiusclient.conf
;
```

### cel_pgsql.conf
```conf
[global]
; 默认只记录事件名字，开启后会添加 USER_DEFINED 事件类型
show_user_defined=yes

; 记录 GMT 格式的日期事件 - 默认 no
;usegmtime=yes

hostname=ast-pg
port=5432
dbname=ast
password=ast
user=ast
table=cel
schema=public
```

## sorcery.conf
* 配置和数据库映射

```conf
; 外部 MWI mailbox 映射 - 持久化消息数量
;[res_mwi_external]
;mailboxes=astdb,mwi_external

[res_pjsip]
auth        =realtime,ps_auths
aor         =realtime,ps_aors
contact     =realtime,ps_contacts
domain_alias=realtime,ps_domain_aliases
endpoint    =realtime,ps_endpoints
global      =realtime,ps_globals
system      =realtime,ps_systems
transport   =realtime,ps_transports

; ps_resource_list
; ps_subscription_persistence

; PJSIP 配置映射

[res_pjsip_endpoint_identifier_ip]
identify              =realtime,ps_endpoint_id_ips

[res_pjsip_outbound_publish]
outbound-publish      =realtime,ps_outbound_publishes

[res_pjsip_pubsub]
inbound-publication   =realtime,ps_inbound_publications

[res_pjsip_outbound_registration]
registration          =realtime,ps_registrations

[res_pjsip_publish_asterisk]
asterisk-publication  =realtime,ps_asterisk_publications
```

## extconfig.conf
* 静态和实时外部配置
* [实时数据库配置](https://wiki.asterisk.org/wiki/display/AST/Realtime+Database+Configuration)


```conf
[settings]
; 静态文件配置映射
; file.conf => driver,database[,table[,priority]]

; 配置文件 => 数据库驱动,数据库[,表名 = 默认为文件名]
;queues.conf => odbc,asterisk,ast_config
;extensions.conf => sqlite,asterisk,ast_config

; 自定义数据库
; staffs  => pgsql,ast
; logs    => pgsql,ast

; conf
queues => pgsql,ast

; pjsip
ps_aors                     => pgsql,ast
ps_asterisk_publications    => pgsql,ast
ps_auths                    => pgsql,ast
ps_contacts                 => pgsql,ast
ps_domain_aliases           => pgsql,ast
ps_endpoint_id_ips          => pgsql,ast
ps_endpoints                => pgsql,ast
ps_globals                  => pgsql,ast
ps_inbound_publications     => pgsql,ast
ps_outbound_publishes       => pgsql,ast
ps_registrations            => pgsql,ast
ps_resource_list            => pgsql,ast
ps_subscription_persistence => pgsql,ast
ps_systems                  => pgsql,ast
ps_transports               => pgsql,ast
```
## http.conf
* 内置的 HTTP 服务器
* 静态 HTTP 位于 `/var/lib/asterisk/static-http`

```conf
[general]
; Server 头和一些请求的消息体里包含
servername=Asterisk

; 启用
; 影响 manager/rawman/mxml 访问 - manager.conf
enabled=yes

bindaddr=127.0.0.1  ; 绑定地址
bindport=8088       ; 端口 - 默认 8080

;prefix=asterisk    ; 路径前缀
;sessionlimit=100   ; 会话数 - 默认 100
; 会话不活跃关闭的等待事件 ms 单位
;session_inactivity=30000
; Keep Alive 时间 ms
;session_keep_alive=15000

; 启用静态文件服务
enablestatic=yes

; 重定向
;redirect = / /static/config/index.html

; 文件上传映射
;[post_mappings]
; 访问需要合法的 AMI mansession_id cookie
;
; 上传到 /uploads 的文件会存放在 /var/lib/asterisk/uploads/
;uploads = /var/lib/asterisk/uploads/
```
## ari.conf

```conf
[general]
; 允许访问的 origin
allowed_origins=http://ari.asterisk.org
; 启用 ARI
enabled = yes
;pretty = no        ; 返回结果格式化
;allowed_origins =  ; CORS 选项
;auth_realm =       ; 鉴权的域 - 默认 Asterisk
; 默认写超时 - 默认 100ms
;websocket_write_timeout = 100
; 发起呼叫时显示指定变量
;channelvars = var1,var2,var3

; 添加一个用户
[admin]
type = user
read_only = no      ; 只读
password = admin    ; 密码
; 明文密码 - 设置为 crypt 可以使用 echo -n admin | mkpasswd -m sha-512 -P 0 生成
password_format = plain
```

## pjsip

### pjsip.conf
```conf
; Anonymous Calls
;
; By default anonymous inbound calls via PJSIP are not allowed. If you want to
; route anonymous calls you'll need to define an endpoint named "anonymous".
; res_pjsip_endpoint_identifier_anonymous.so handles that functionality so it
; must be loaded. It is not recommended to accept anonymous calls.

[transport-ws]
type=transport
protocol=ws
bind=0.0.0.0

```

## extension
### extensions.conf

```conf

```



## PG

### cdr/cel
```sql
CREATE TABLE cdr
(
  id          serial primary key,
  accountcode text,
  src         text,
  src         text,
  dst         text,
  dcontext    text,
  clid        text,
  channel     text,
  dstchannel  text,
  lastapp     text,
  lastdata    text,
  start       TIMESTAMP WITHOUT TIME ZONE,
  answer      TIMESTAMP WITHOUT TIME ZONE,
  "end"       TIMESTAMP WITHOUT TIME ZONE,
  duration    INTEGER,
  billsec     INTEGER,
  disposition text,
  amaflags    text,
  userfield   text,
  uniqueid    text,
  linkedid    text,
  peeraccount text,
  sequence    INTEGER
);

CREATE TABLE cel
(
  id          serial primary key,
  eventtype   text      NOT NULL,
  eventtime   timestamp NOT NULL,
  userdeftype text      NOT NULL,
  cid_name    text      NOT NULL,
  cid_num     text      NOT NULL,
  cid_ani     text      NOT NULL,
  cid_rdnis   text      NOT NULL,
  cid_dnid    text      NOT NULL,
  exten       text      NOT NULL,
  context     text      NOT NULL,
  channame    text      NOT NULL,
  appname     text      NOT NULL,
  appdata     text      NOT NULL,
  amaflags    int       NOT NULL,
  accountcode text      NOT NULL,
  peeraccount text      NOT NULL,
  uniqueid    text      NOT NULL,
  linkedid    text      NOT NULL,
  userfield   text      NOT NULL,
  peer        text      NOT NULL
);
```

## FAQ

### dtmfmode
rfc2833
rfc4733
