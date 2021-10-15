---
title: FreeSWITCH 模块
---

# FreeSWITCH Modules

| 分类               | 描述              |
| ------------------ | ----------------- |
| Application        | 提供 action 处理  |
| Script language    | 提供脚本能力      |
| Codec              | 媒体编码支持      |
| Databases          | 数据库集成        |
| High Volume System |
| Event Socket Layer | 事件系统          |
| Logging            | 日志、CDR         |
| Endpoint           | 终端              |
| Dialplan           | Dialplan 能力扩展 |
| Client             |

- 数据库: pg, sqlite, redis, memcache, mongo
- 语言集成支持: lua, java, python, js/v8, perl, ruby
- CDR
  - 格式: csv, json
  - 存储: pg, sqlite, radius, mongodb, odbc
- 编码: opus, g711, g723, g729
- 参考
  - https://freeswitch.org/confluence/display/FREESWITCH/Modules

| type        | name                    | description                                 |           |
| ----------- | ----------------------- | ------------------------------------------- | --------- |
|             | mod_avmd                | Advanced Voice Mail Detection               |
|             | mod_blacklist           | blacklist extension,script                  |
|             | mod_com_amd             |
|             | mod_conference          |
|             | mod_distributor         | calls to gateways in a weighted round-robin |
|             | mod_easyroute           | DID routing                                 |
|             | mod_enum                |
|             | mod_esl                 |                                             | ⭐️⭐️⭐️ |
|             | mod_event_multicast     |
|             | mod_event_socket_dotnet |
|             | mod_file_string         | multiple sound file                         |
|             | mod_fsk                 | Frequency-shift keying                      |
|             | mod_fsv                 | FS Video - play back RTP video frames       |
| ha          | mod_ha_cluster          |
|             | mod_http_cache          |
|             | mod_isac                |
|             | mod_janus               |
|             | mod_json_cdr            |
|             | mod_kazoo               |
|             | mod_ladspa              | Linux only                                  |
|             | mod_lcr                 |
|             | mod_managed             |
|             | mod_memcache            |
|             | mod_mongo               |
|             | mod_mp4v2               |
|             | mod_nibblebil           |
|             | mod_opal                |
|             | mod_oreka               |
|             | mod_osp                 |
|             | mod_rad_auth            |
|             | mod_radius_cdr          |
|             | mod_rayo                |
|             | mod_skel                |
|             | mod_skyopen             |
|             | mod_snapshot            |
|             | mod_soundtouch          |
|             | mod_ssml                |
|             | mod_stress              |
|             | mod_timezone            |
|             | mod_unimrcp             |
|             | mod_vlc                 |
|             | mod_vmd                 |
|             | mod_watson              |
|             | mod_yaml                |
| application | mod_abstraction         | 接口映射                                    |
| application | mod_callcenter          | inbound call queuing                        |
| application | mod_cidlookup           | CID Lookup                                  |
| application | mod_commands            | api commands, esl, fs_cli                   |
| application | mod_curl                |
| application | mod_directory           | dial by name                                |
| application | mod_dptools             | xml dialplan                                | ⭐️⭐️⭐️ |
| application | mod_esf                 | extra SIP functionality                     |
| application | mod_expr                | ExprEval - http://expreval.sourceforge.net/ |
| application | mod_fifo                |
| application | mod_hash                | hash table & backend                        |
| application | mod_httapi              |                                             | ⭐️⭐️⭐️ |
| application | mod_random              |
| application | mod_signalwire          |
| application | mod_sms                 |
| application | mod_spy                 |
| application | mod_translate           |
| application | mod_valet_parking       |
| application | mod_voicemail           |
| application | mod_voicemail_callpage  |
| application | mod_voicemail_ivr       |
| asr/tts     | mod_cepstral            | tts                                         |
| asr/tts     | mod_flite               | Festival Lite - TTS                         |
| asr/tts     | mod_pocketsphinx        |
| asr/tts     | mod_rss                 |
| asr/tts     | mod_tts_commandline     |
| codec       | mod_amr                 | Adaptive Multi-Rate                         |
| codec       | mod_amr_wb              | AMR Widband G.722.2                         |
| codec       | mod_b64                 |                                             |
| codec       | mod_celt                | HD CELT                                     |
| codec       | mod_codec2              | speex nb                                    |
| codec       | mod_com_g729            | G.729/A                                     |
| codec       | mod_g711                |
| codec       | mod_g723_1              |
| codec       | mod_g729                |
| codec       | mod_h26x                |
| codec       | mod_ilbc                |
| codec       | mod_opus                |
| codec       | mod_sangoma_codec       |
| codec       | mod_siren               |
| codec       | mod_spandsp             |
| codec       | mod_speex               |
| db          | mod_db                  | dialplan + sqlite,odbc                      |
| db          | mod_hiredis             |
| db          | mod_odbc_cdr            |
| db          | mod_odbc_query          |
| db          | mod_pgsql               |
| db          | mod_redis               |                                             | ⛔️       |
| dialplan    | mod_dialplan_asterisk   |
| dialplan    | mod_dialplan_directory  |
| dialplan    | mod_dialplan_xml        |
| directory   | mod_ldap                |
| endpoint    | mod_alsa                |
| endpoint    | mod_dingaling           | xmpp registration                           |
| endpoint    | mod_freetdm             |
| endpoint    | mod_gsmopen             | channel driver - SMS, GSM voice call        |
| endpoint    | mod_h323                |
| endpoint    | mod_khomp               |
| endpoint    | mod_loopback            |
| endpoint    | mod_portaudio           |
| endpoint    | mod_rtc                 |
| endpoint    | mod_rtmp                |
| endpoint    | mod_skinny              |
| endpoint    | mod_sofia               |
| endpoint    | mod_unicall             |
| endpoint    | mod_verto               | VER-to RTC                                  |
| endpoint    | mod_woomera             |
| event       | mod_amqp                |
| event       | mod_cdr_csv             |
| event       | mod_cdr_mongodb         |
| event       | mod_cdr_pg_csv          |
| event       | mod_cdr_sqlite          |
| event       | mod_erlang_event        | behave like Erlang node                     |
| event       | mod_event_socket        |
| event       | mod_event_zmq           | ZeroMQ                                      |
| event       | mod_smpp                |
| event       | mod_snmp                |
| event       | mod_zeroconf            |
| format      | mod_av                  | Video Codec, libav                          |
| format      | mod_local_stream        | play all the files in a directory           |
| format      | mod_native_file         |
| format      | mod_opusfile            |
| format      | mod_png                 |
| format      | mod_shell_stream        |
| format      | mod_shout               | icecast/mp3 streams/files                   |
| format      | mod_sndfile             |
| format      | mod_tone_stream         |
| language    | mod_java                |
| language    | mod_lua                 |
| language    | mod_perl                |
| language    | mod_python              |
| language    | mod_ruby                |
| language    | mod_v8                  |
| logger      | mod_console             | console message                             |
| logger      | mod_format_cdr          | Multi Format CDR CURL logger                |
| logger      | mod_graylog2            |
| logger      | mod_logfile             |
| logger      | mod_syslog              |
| say         | mod_say_en              |
| say         | mod_say_he              |
| say         | mod_say_ru              |
| say         | mod_say_sv              |
| say         | mod_say_zh              |
| security    | mod_fail2ban            | log inbound registration                    |
| SNOM        | mod_snom                |
| test        | mod_bert                |
| test        | mod_cluechoo            | Steam Locomotive - sl                       |
| timer       | mod_posix_timer         |
| timer       | mod_timerfd             |
| xml         | mod_xml_cdr             |
| xml         | mod_xml_curl            |
| xml         | mod_xml_diaplan         |
| xml         | mod_xml_radius          |
| xml         | mod_xml_rpc             |
| xml         | mod_xml_scgi            |

- 大多模块的配置都是 `<name>.conf.xml`

```xml
<action application="bridge" data="sofia/gateway/${distributor(distributor_list)}/${destination_number}"/>
<action application="bridge" data="sofia/external/${destination_number}@${distributor(distributor_list)}"/>
```

```
db insert/realm/key/value
db delete/realm/key
db select/realm/key
db exists/realm/key

directory <profile_name> <domain name> <transfer context>
```
