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
|             | mod_com_amd             |
|             | mod_file_string         | multiple sound file                         |
|             | mod_janus               |
|             | mod_timezone            |
|             | mod_watson              |
| application | mod_abstraction         | 接口映射                                    |
| application | mod_av                  | Video Codec, libav                          |
| application | mod_avmd                | Advanced Voice Mail Detection               |
| application | mod_bert                |                                             |
| application | mod_blacklist           | blacklist extension,script                  |
| application | mod_callcenter          | inbound call queuing                        |
| application | mod_cidlookup           | CID Lookup                                  |
| application | mod_cluechoo            | Steam Locomotive - sl                       |
| application | mod_commands            | api commands, esl, fs_cli                   |
| application | mod_conference          |
| application | mod_curl                |
| application | mod_db                  | dialplan + sqlite,odbc                      |
| application | mod_directory           | dial by name                                |
| application | mod_distributor         | calls to gateways in a weighted round-robin |
| application | mod_dptools             | xml dialplan                                | ⭐️⭐️⭐️ |
| application | mod_easyroute           | DID routing                                 |
| application | mod_enum                |
| application | mod_esf                 | extra SIP functionality                     |
| application | mod_esl                 |                                             | ⭐️⭐️⭐️ |
| application | mod_expr                | ExprEval - http://expreval.sourceforge.net/ |
| application | mod_fifo                |
| application | mod_fsk                 | Frequency-shift keying                      |
| application | mod_fsv                 | FS Video - play back RTP video frames       |
| application | mod_hash                | hash table & backend                        |
| application | mod_hiredis             |
| application | mod_httapi              |                                             | ⭐️⭐️⭐️ |
| application | mod_http_cache          |
| application | mod_ladspa              | Linux only                                  |
| application | mod_lcr                 |
| application | mod_memcache            |
| application | mod_mongo               |
| application | mod_mp4                 |
| application | mod_mp4v2               |
| application | mod_nibblebil           |
| application | mod_odbc_query          |
| application | mod_oreka               |
| application | mod_osp                 |
| application | mod_prefix              |
| application | mod_rad_auth            |
| application | mod_random              |
| application | mod_redis               |                                             | ⛔️       |
| application | mod_rss                 |
| application | mod_signalwire          |
| application | mod_skel                |
| application | mod_sms                 |
| application | mod_sms_flowroute       |
| application | mod_snapshot            |
| application | mod_snom                |
| application | mod_sonar               |
| application | mod_soundtouch          |
| application | mod_spandsp             |
| application | mod_spy                 |
| application | mod_stress              |
| application | mod_test                |
| application | mod_translate           |
| application | mod_valet_filter        |
| application | mod_valet_parking       |
| application | mod_vmd                 |
| application | mod_voicemail           |
| application | mod_voicemail_callpage  |
| application | mod_voicemail_ivr       |
| asr/tts     | mod_cepstral            | tts                                         |
| asr/tts     | mod_flite               | Festival Lite - TTS                         |
| asr/tts     | mod_pocketsphinx        |
| asr/tts     | mod_tts_commandline     |
| asr/tts     | mod_unimrcp             |
| codec       | mod_amr                 | Adaptive Multi-Rate                         |
| codec       | mod_amrwb               | AMR Widband G.722.2                         |
| codec       | mod_b64                 |                                             |
| codec       | mod_bv                  |                                             |
| codec       | mod_celt                | HD CELT                                     |
| codec       | mod_clearmode           |                                             |
| codec       | mod_codec2              | speex nb                                    |
| codec       | mod_com_g729            | G.729/A                                     |
| codec       | mod_dahdi_codec         |
| codec       | mod_g711                |
| codec       | mod_g723_1              |
| codec       | mod_g729                |
| codec       | mod_h26x                |
| codec       | mod_ilbc                |
| codec       | mod_isac                |
| codec       | mod_mp4v                |
| codec       | mod_openh264            |
| codec       | mod_opus                |
| codec       | mod_sangoma_codec       |
| codec       | mod_silk                |
| codec       | mod_siren               |
| codec       | mod_skel_codec          |
| codec       | mod_speex               |
| codec       | mod_theora              |
| codec       | mod_yuv                 |
| db          | mod_mariadb             |
| db          | mod_pgsql               |
| dialplan    | mod_dialplan_asterisk   |
| dialplan    | mod_dialplan_directory  |
| dialplan    | mod_dialplan_xml        |
| directory   | mod_ldap                |
| endpoint    | mod_alsa                |
| endpoint    | mod_dingaling           | xmpp registration                           |
| endpoint    | mod_freetdm             | ~= chan_dahdi                               |
| endpoint    | mod_gsmopen             | channel driver - SMS, GSM voice call        |
| endpoint    | mod_h323                |
| endpoint    | mod_khomp               |
| endpoint    | mod_loopback            |
| endpoint    | mod_opal                | H.323, IAX2                                 |
| endpoint    | mod_iax                 | -1.0.5                                      | ⛔️       |
| endpoint    | mod_portaudio           |
| endpoint    | mod_rtc                 |
| endpoint    | mod_rtmp                |
| endpoint    | mod_skinny              |
| endpoint    | mod_skyopen             |
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
| event       | mod_event_multicast     |
| event       | mod_event_socket        |
| event       | mod_event_socket_dotnet |
| event       | mod_event_zmq           | ZeroMQ                                      |
| event       | mod_fail2ban            | log inbound registration                    |
| event       | mod_format_cdr          | Multi Format CDR CURL logger                |
| event       | mod_json_cdr            |
| event       | mod_kazoo               |
| event       | mod_odbc_cdr            |
| event       | mod_radius_cdr          |
| event       | mod_rayo                |
| event       | mod_smpp                |
| event       | mod_snmp                |
| event       | mod_zeroconf            |
| format      | mod_imagick             |
| format      | mod_local_stream        | play all the files in a directory           |
| format      | mod_native_file         |
| format      | mod_opusfile            |
| format      | mod_png                 |
| format      | mod_portaudio_stream    |
| format      | mod_shell_stream        |
| format      | mod_shout               | icecast/mp3 streams/files                   |
| format      | mod_sndfile             |
| format      | mod_ssml                |
| format      | mod_tone_stream         |
| format      | mod_vlc                 |
| format      | mod_webm                |
| ha          | mod_ha_cluster          |
| language    | mod_java                |
| language    | mod_lua                 |
| language    | mod_managed             |
| language    | mod_perl                |
| language    | mod_python              |
| language    | mod_python3             |
| language    | mod_ruby                |
| language    | mod_v8                  |
| language    | mod_yaml                |
| logger      | mod_console             | console message                             |
| logger      | mod_graylog2            |
| logger      | mod_logfile             |
| logger      | mod_raven               |
| logger      | mod_syslog              |
| say         | mod_say_en              |
| say         | mod_say_he              |
| say         | mod_say_ru              |
| say         | mod_say_sv              |
| say         | mod_say_zh              |
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
