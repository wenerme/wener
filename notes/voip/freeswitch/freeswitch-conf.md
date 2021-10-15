---
title: FreeSWITCH Conf
---

# FreeSWITCH Conf

- 变量作用域
  - 全局
  - 通道
- [Understanding the Configuration Files](https://freeswitch.org/confluence/display/FREESWITCH/Understanding+the+Configuration+Files)
- https://freeswitch.org/confluence/display/FREESWITCH/Configuration

## 配置说明

- 动态配置，没有 DTD，有 schema 概念
- 入口配置 switch.conf
- 模块配置 modules.conf
- 模式
  - default.xml - `<user id="1000" type="pointer"/>` 指向 目录里的具体配置
    - default/
      - spec.xml
  - `<param name="password" value="$${default_password}"/>` 变量引用
- XML 接口模块
  - mod_xml_cdr
  - mod_xml_curl
  - mod_xml_diaplan
  - mod_xml_radius
  - mod_xml_rpc
  - mod_xml_scgi

## 预处理

- include
- set - 全局变量
  - $$
    {variable}
    - 配置时在预处理后会被替换
    - 运行时同 `${variable}`
    $$
  - ${variable} - 不受预处理影响
  - 静态，一次性
- exec - 执行脚本
- exec-set - 结果设置为变量
- comment

```xml title="变量"
<!-- 设置变量 -->
<X-PRE-PROCESS cmd="set" data="my_variable='value'"/>
<!--#set my_variable='value'-->

<!-- 不生效 - 临时禁用 -->
<X-PRE-PROCESS cmd="comment" data="my_variable='value'"/>
<X-NO-PRE-PROCESS cmd="set" data="my_variable='value'"/>
<Y-PRE-PROCESS cmd="set" data="my_variable='value'"/>

<X-PRE-PROCESS cmd="exec" data="/path/to/my_script_that_dumps_all_configs_to_stdout.pl"/>
<X-PRE-PROCESS cmd="exec-set" data="local_ip_v4=ip addr show eth1 | awk '/inet /{print $2}' | head -n 1 | cut -d '/' -f 1"/>
```

- 不能注释
- 可以移除或者改名字 - 例如 改为 X-NO-PRE-PROCESS

```xml title="include"
<X-PRE-PROCESS cmd="include" data="vars.xml"/>

<section name="configuration" description="Various Configuration">
    <X-PRE-PROCESS cmd="include" data="autoload_configs/*.xml"/>
</section>
```

```xml title="vars.xml"
<include>
    <!-- 被 include 内容 -->
</include>
```

## 配置文件

- extensions.conf
- freeswitch.xml
- fur_elise.xml
- mime.types
- notify-voicemail.tpl
- tetris.ttml
- vars.xml
- voicemail.tpl
- web-vm.tpl
- autoload_configs/ - 自动加载的配置目录
  - switch.conf.xml - 核心配置
- chatplan/
- dialplan/
  - features.xml
  - default.xml
  - default/
  - public.xml
  - public/
  - skinny-patterns.xml
  - skinny-patterns/
- directory/
  - default.xml
  - default/
- ivr_menus
- jingle_profiles
- lang
- mrcp_profiles
- sip_profiles
- skinny_profiles
- tls
  - dtls-srtp.pem
  - wss.pem

## vars

```
global_getvar variable_name
uuid_getvar <uuid> variable_name
```

### 目录

| name           | value                                 | desc |
| -------------- | ------------------------------------- | ---- |
| base_dir       | /etc/freeswitch                       |
| cache_dir      | /var/cache/freeswitch                 |
| certs_dir      | /etc/freeswitch/tls                   |
| conf_dir       | /etc/freeswitch                       |
| data_dir       | /share/freeswitch                     |
| db_dir         | /var/lib/freeswitch/db                |
| fonts_dir      | /share/freeswitch/fonts               |
| grammar_dir    | /share/freeswitch/grammar             |
| htdocs_dir     | /share/freeswitch/htdocs              |
| images_dir     | /var/lib/freeswitch/images            |
| localstate_dir | /var/lib/freeswitch                   |
| log_dir        | /var/log/freeswitch                   |
| mod_dir        | /lib/freeswitch/mod                   |
| recordings_dir | /var/lib/freeswitch/recordings        |
| run_dir        | /var/run/freeswitch                   |
| script_dir     | /share/freeswitch/scripts             |
| sounds_dir     | /share/freeswitch/sounds              |
| storage_dir    | /var/lib/freeswitch/storage           |
| temp_dir       | /tmp                                  |
| sound_prefix   | /share/freeswitch/sounds/en/us/callie |

### 网络

| name                      | value                    | desc                    |
| ------------------------- | ------------------------ | ----------------------- |
| domain                    | $${local_ip_v4}          | default/fallback domain |
| domain_name               | $${domain}               |
| external_auth_calls       | false                    |
| external_rtp_ip           | stun:stun.freeswitch.org | stun-set                |
| external_sip_ip           | stun:stun.freeswitch.org | stun-set                |
| unroll_loops              | true                     | sip loopback unrolling  |
| external_sip_port         | 5080                     |
| external_ssl_enable       | false                    |
| external_tls_port         | 5081                     |
| internal_auth_calls       | true                     |
| internal_sip_port         | 5060                     |
| internal_ssl_enable       | false                    |
| internal_tls_port         | 5061                     |
| local_ip_v4               | 192.168.1.1              |
| local_ip_v6               | ::1                      |
| local_mask_v4             | 255.255.252.0            |
| zrtp_secure_media         | true                     | ZRTP                    |
| nat_public_addr           |
| nat_private_addr          |
| nat_type                  |
| rtp_secure_media          |                          | SRTP                    |
| rtp_secure_media_inbound  |                          |
| rtp_secure_media_outbound |                          |

- ZRTP http://wiki.freeswitch.org/wiki/ZRTP
- SRTP
  - do not offer or accept variable bit rate codecs

### 媒体

| name             | value | desc |
| ---------------- | ----- | ---- |
| call_debug       | false |
| console_loglevel | info  |
| default_areacode | 918   |
| default_country  | US    |

| name                         | value                        | desc                                        |
| ---------------------------- | ---------------------------- | ------------------------------------------- |
| core_uuid                    |
| default_password             | 1234                         |
| default_provider             | example.com                  |
| default_provider_contact     | 5000                         |
| default_provider_from_domain | example.com                  |
| default_provider_password    | password                     |
| default_provider_register    | false                        |
| default_provider_username    | joeuser                      |
| global_codec_prefs           | OPUS,G722,PCMU,PCMA,H264,VP8 |
| outbound_codec_prefs         | OPUS,G722,PCMU,PCMA,H264,VP8 |
| hold_music                   | local_stream://moh           |
| outbound_caller_id           | 0000000000                   |
| outbound_caller_name         | FreeSWITCH                   | conference.conf.xml, user directory default |
| presence_privacy             | false                        |
| rtp_liberal_dtmf             | true                         |
| rtp_video_max_bandwidth_in   | 3mb                          |
| rtp_video_max_bandwidth_out  | 3mb                          |
| suppress_cng                 | true                         |
| use_profile                  | external                     |

- `codecname[@8000h|16000h|32000h[@XXi]]`

### dingaling

| name                | value | desc |
| ------------------- | ----- | ---- |
| bind_server_ip      | auto  |
| xmpp_client_profile | xmppc |
| xmpp_server_profile | xmpps |

## switch.conf

```xml
<configuration name="switch.conf" description="Core Configuration">
  <cli-keybindings>
    <!-- bind function key -->
    <key name="[1-12]" value="[api command]"/>
  </cli-keybindings>
  <!-- 所有 codec 默认 20ms -->
  <default-ptimes>
    <!-- <codec name="G729" ptime="40"/> -->
  </default-ptimes>
  <settings>
  </settings>
</configuration>
```

| setting                   | value  | desc                     |
| ------------------------- | ------ | ------------------------ |
| max-db-handles            | 50     |
| db-handle-timeout         | 10     |
| min-idle-cpu              | 25     |
| event-heartbeat-interval  | 10     |
| max-sessions              | 1000   |
| sessions-per-second       | 30     |
| loglevel                  | debug  | 全局默认 log 级别        |
| debug-level               |        | 0-10                     |
| sql-buffer-len            | 1m     |
| max-sql-buffer-len        | 2m     |
| min-dtmf-duration         | 400    | 最低 400                 |
| max-dtmf-duration         | 192000 |
| default_dtmf_duration     | 2000   |
| verbose-channel-events    | no     |
| enable-clock-nanosleep    | true   |
| enable-monotonic-timing   | true   |
| rtp-start-port            | 16384  |
| rtp-end-port              | 32768  |
| rtp-port-usage-robustness | true   | 使用端口前先测试未被使用 |
| rtp-enable-zrtp           | false  |
| rtp-retain-crypto-keys    | false  |
| core-db-dsn               |        | 数据库配置               |
| core-db-name              |
| auto-create-schemas       | true   |
| auto-clear-sql            | true   |
| enable-early-hangup       | true   |
| core-dbtype               |        |
| multiple-registrations    | true   |
| max-audio-channels        | 2      |

**默认按键绑定**

| key | command                             |
| --- | ----------------------------------- |
| F1  | help                                |
| F2  | status                              |
| F3  | show channels                       |
| F4  | show calls                          |
| F5  | sofia status                        |
| F6  | reloadxml                           |
| F7  | console loglevel 0                  |
| F8  | console loglevel 7                  |
| F9  | sofia status profile internal       |
| F10 | sofia profile internal siptrace on  |
| F11 | sofia profile internal siptrace off |
| F12 | version                             |

## modules.conf

- 顺序
  - logger
  - Multi-Faceted
  - xml interface
  - event handler
  - directory interface
  - Endpoints
  - Applications
  - SNOM
  - Dialplan Interfaces
  - Codec Interfaces
  - File Format Interfaces
  - Timer
  - Languages
  - ASR/TTS
  - Say
  - 第三方

```xml
<configuration name="modules.conf" description="Modules">
  <modules>
    <!-- 自定义加载模块 - 内置模块不需要 path -->
    <load module="mod_com_g729" path="/opt/fs/mod_com" critical="true"/>
  </modules>
</configuration>
```

## 通道

- [Channel Variables Catalog](https://freeswitch.org/confluence/display/FREESWITCH/Channel+Variables+Catalog)
