---
id: faq
title: 常见问题
---

# Asterisk FAQ

## Tips
* [Hangup Cause Mappings](https://wiki.asterisk.org/wiki/display/AST/Hangup+Cause+Mappings)

## 系统问题排查

1. 硬件的问题
  * 中断
2. 版本问题
  * 考虑降级测试
3. 驱动问题
  * 如果是用的 OpenVox, 那么需要从新编译
  * 编译驱动时和内核版本有关
4. 系统问题
  * 切换操作系统
  * AsteriskNow, Alpine, CentOS
5. 配置问题
6. SIP/PJSIP 的问题
  * 切换使用 `chan_sip` 和 `chan_pjsip` 进行尝试
7. PJSIP 的问题
  * 可能是由于 `pjproject` 的 bug 问题, 使用 asterisk buddlen 的 pj

## 诊断命令
* [CLI commands useful for debugging](https://wiki.asterisk.org/wiki/display/AST/CLI+commands+useful+for+debugging)


```bash
# 系统状态 - 内存, 运行时间
core show sysinfo
# 查看线程
core show threads


# 查看通话统计
# uptime 会显示通话时间
core show calls uptime
# 查看通道信息
core show channels
# 终止一个 channel 
channel request hangup SIP/4003-00000a2f

# 查看注册的 PBX 交换
core show switches

# 开启日志进行排查
core set verbose 4
core set debug 4

# 开启 SIP 日志
pjsip set logger on
```

## 终端问题排查
* 确保 context 正确
* 尝试关闭 ICE

## 常见 HTTP 异常状态码

No Response
408 Request Timeout
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable 线路忙、拥塞
504 Server Timeout
Any 600-class response

401 Unauthorized
407 Proxy Authentication Required

## Assertion failed: sess && sess->endpt
* 该异常后程序会直接崩溃
* pjproject [sip_auth_client.c#L507](https://github.com/pjsip/pjproject/blob/master/pjsip/src/pjsip/sip_auth_client.c#L507)
* https://github.com/asterisk/pjproject/blob/master/pjsip/src/pjsip/sip_auth_client.c
* https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=842878
* asterisk 14.4.1 依赖的 pjproject 2.5.5 未修复
* 代码
  * [#1946](https://trac.pjsip.org/repos/ticket/1946) Assertion in deinitializing client auth session when dialog creation fails
  * [changeset#5401](https://trac.pjsip.org/repos/changeset/5401)
    * 避免处理未初始化的客户端授权会话
  * [changeset#5373](https://trac.pjsip.org/repos/changeset/5373)
    * 添加了断言
* 建议编译 asterisk 使用 bundle pjproject 的形式, 避免外部依赖, 并且 asterisk 也有不少针对 pjproject 的补丁

```
Assertion failed: sess && sess->endpt (../src/pjsip/sip_auth_client.c: pjsip_auth_clt_deinit: 507)
```

## cel_pgsql.c:352 pgsql_log: Reason: ERROR:  value too long for type character varying
* 将 CEL 的 APPDATA 改为更长的类型, 如果是 pg, 建议直接改为 text

```
[Sep 11 09:30:06] WARNING[3434]: cel_pgsql.c:351 pgsql_log: Failed to insert call detail record into database!
[Sep 11 09:30:06] WARNING[3434]: cel_pgsql.c:352 pgsql_log: Reason: ERROR:  value too long for type character varying(255)
```

## translate.c:407 framein: no samples for ulawtolin
* http://lists.digium.com/pipermail/asterisk-users/2012-October/275509.html
  * It means that one of clients, is using 'silence suppression' mechanism 
* [RTP Silence Suppression](https://www.voip-info.org/wiki/view/RTP+Silence+Suppression)
* [Asterisk config sip.conf](https://www.voip-info.org/wiki/view/Asterisk+config+sip.conf)
* [Silence suppression:wiki](https://en.wikipedia.org/wiki/Silence_suppression)
* pjsip [Adaptive Silence Detection](http://www.pjsip.org/pjmedia/docs/html/group__PJMEDIA__SILENCEDET.htm)
* X-Lite 中可以设置 `Transmit Silence=YES`
* 在配合 Asterisk 时, 建议都将客户端的 静音抑制 都关闭
* 讯时网关中有 静音压缩(G.723，GSM，iLBC) 和 静音包丢弃 的相关设置

```
[Sep 11 09:25:37] WARNING[1109][C-00000068]: translate.c:407 framein: no samples for ulawtolin
```

## app_dial.c:2472 dial_exec_full: Dial argument takes format (technology/resource)
* 一般是 Dial 的参数没传, 或者是错误的参数

```
[Sep 11 09:43:18] WARNING[11181][C-000000bb]: app_dial.c:2472 dial_exec_full: Dial argument takes format (technology/resource)
```

## tcptls.c:746 ast_tcptls_close_session_file: ast_tcptls_close_session_file invoked on session instance without file or file descriptor
* 调用 ARI 时会触发
* [ASTERISK-26842](https://issues.asterisk.org/jira/browse/ASTERISK-26842)
  * 这里提到使用 ARI Websocket 时也会触发
* [tcptls.c#L780](https://github.com/asterisk/asterisk/blob/1bec535df2e8a7968a810cbef594fa17f7b642bc/main/tcptls.c#L780)

```
[Sep 12 11:13:38] ERROR[25317]: tcptls.c:746 ast_tcptls_close_session_file: ast_tcptls_close_session_file invoked on session instance without file or file descriptor
```

## Log queue threshold exceeded.  Discarding new message
* [logger.c#L1980](https://github.com/asterisk/asterisk/blob/master/main/logger.c#L1980)
* [logger.c#L727](https://github.com/asterisk/asterisk/blob/master/main/logger.c#L727)
  * `logger.conf` 中配置 `[general]`/`logger_queue_limit` 默认为 1000
  * 示例配置中没有说明
* 系统卡顿的时候会出现该问题
* 请求加压过多时会出现该问题

```
[Jun 29 11:11:57] WARNING[5024]: logger:0 ***: Log queue threshold (5000) exceeded.  Discarding new messages.
[Jun 29 11:16:37] WARNING[28086]: logger:0 ***: Logging resumed.  158329 messages discarded.
```

## 系统间歇性卡顿
[Asterisk hanging occasionally](http://forums.asterisk.org/viewtopic.php?f=1&t=79945)

## Error loading module 'res_pjsip.so': undefined symbol: ast_sip_session_register_supplement

* [ASTERISK-26518](https://issues.asterisk.org/jira/browse/ASTERISK-26518)
  * 将部分代码注释即可

```bash
curl -O https://issues.asterisk.org/jira/secure/attachment/54695/ast.diff
```

## Read factory 0xb6d0acb8 was pretty quick last time, waiting for them / DTMF best
* [ASTERISK-15743](https://issues.asterisk.org/jira/browse/ASTERISK-15743)
  * Read factory 0xb6d0acb8 was pretty quick last time, waiting for them
* [audiohook.c#L275](https://github.com/asterisk/asterisk/blob/master/main/audiohook.c#L275)
  * `"Read factory %p and write factory %p both fail to provide %zu samples\n"`
* [audiohook.c#L281](https://github.com/asterisk/asterisk/blob/master/main/audiohook.c#L281)
  * `"Write factory %p was pretty quick last time, waiting for them.\n"`
* [dsp.c#L735](https://github.com/asterisk/asterisk/blob/master/main/dsp.c#L735)
  * `"DTMF best '%c' Erow=%.4E Ecol=%.4E Erc=%.4E Et=%.4E\n"`
* 出现大量这样的日志时, 还会有噪音
* 可能是线路干扰导致, 尝试调整线路测试噪音是否发生变化


```
[Sep 15 10:51:36] DEBUG[27592][C-00000024] audiohook.c: Read factory 0x559839609568 and write factory 0x559839609fa8 both fail to provide 160 samples
[Sep 15 10:51:36] DEBUG[27592][C-00000024] audiohook.c: Write factory 0x559839609fa8 was pretty quick last time, waiting for them.
[Sep 15 10:51:36] DEBUG[27589][C-00000024] dsp.c: DTMF best 'B' Erow=4.6720E+03 Ecol=1.9114E+04 Erc=2.3786E+04 Et=5.8752E+04
[Sep 15 10:51:36] DEBUG[27592][C-00000024] audiohook.c: Read factory 0x559839609568 and write factory 0x559839609fa8 both fail to provide 160 samples
[Sep 15 10:51:36] DEBUG[27592][C-00000024] audiohook.c: Write factory 0x559839609fa8 was pretty quick last time, waiting for them.
[Sep 15 10:51:36] DEBUG[27589][C-00000024] dsp.c: DTMF best 'B' Erow=4.6720E+03 Ecol=1.9114E+04 Erc=2.3786E+04 Et=5.8752E+04
[Sep 15 10:51:36] DEBUG[27589][C-00000024] dsp.c: DTMF best 'B' Erow=4.6720E+03 Ecol=1.9114E+04 Erc=2.3786E+04 Et=5.8752E+04
[Sep 15 10:51:36] DEBUG[27592][C-00000024] audiohook.c: Read factory 0x559839609568 and write factory 0x559839609fa8 both fail to provide 160 samples
[Sep 15 10:51:36] DEBUG[27592][C-00000024] audiohook.c: Write factory 0x559839609fa8 was pretty quick last time, waiting for them.
[Sep 15 10:51:36] DEBUG[27589][C-00000024] dsp.c: DTMF best 'B' Erow=4.6720E+03 Ecol=1.9114E+04 Erc=2.3786E+04 Et=5.8752E+04
[Sep 15 10:51:36] DEBUG[27592][C-00000024] audiohook.c: Read factory 0x559839609568 and write factory 0x559839609fa8 both fail to provide 160 samples
[Sep 15 10:51:36] DEBUG[27592][C-00000024] audiohook.c: Write factory 0x559839609fa8 was pretty quick last time, waiting for them.
[Sep 15 10:51:36] DEBUG[27589][C-00000024] dsp.c: DTMF best 'B' Erow=4.6720E+03 Ecol=1.9114E+04 Erc=2.3786E+04 Et=5.8752E+04
```

### Couldn't find mailbox 4021 in context default
* 注意, DADHI FXS 生成的配置文件会默认添加 voicemail, 会导致出现非常多这样的日志


```
[Sep 25 18:18:46] WARNING[3003]: app_voicemail.c:2476 __messagecount: Couldn't find mailbox 4021 in context default

# 关闭 `app_voicemail` 后会出现下面的问题

No voicemail provider registered.
```


### chan_dahdi.c:19031 process_dahdi: Ignoring any changes to 'userbase' (on reload)
* 只是说这部分配置不能被重载

```
[Sep 11 14:07:34] WARNING[12741]: chan_dahdi.c:19031 process_dahdi: Ignoring any changes to 'userbase' (on reload) at line 23.
[Sep 11 14:07:34] WARNING[12741]: chan_dahdi.c:19031 process_dahdi: Ignoring any changes to 'vmsecret' (on reload) at line 31.
[Sep 11 14:07:34] WARNING[12741]: chan_dahdi.c:19031 process_dahdi: Ignoring any changes to 'hassip' (on reload) at line 35.
[Sep 11 14:07:34] WARNING[12741]: chan_dahdi.c:19031 process_dahdi: Ignoring any changes to 'hasiax' (on reload) at line 39.
[Sep 11 14:07:34] WARNING[12741]: chan_dahdi.c:19031 process_dahdi: Ignoring any changes to 'hasmanager' (on reload) at line 47.
```

### pbx.c: sent to invalid extension but no invalid handler: context,exten,priority=from-pstn,s,1
* DADHI FXO 进入的 exten 为 `s`, 所以需要 `exten => s,1,NoOp()`

```
[Sep 25 18:49:33] WARNING[3328][C-00000004]: pbx.c:4458 __ast_pbx_run: Channel 'DAHDI/2-1' sent to invalid extension but no invalid handler: context,exten,priority=from-pstn,s,1
```

### Unable to create channel of type 'DAHDI' (cause 17 - User busy)
* DAHDI FXO 可能会出现挂断后通道未释放的情况

```
[Sep 25 18:32:19] WARNING[3709][C-00000005]: app_dial.c:2530 dial_exec_full: Unable to create channel of type 'DAHDI' (cause 17 - User busy)
```

### codec_dahdi.c:820 find_transcoders: Failed to open /dev/dahdi/transcode: No such file or directory

```
[Sep 25 18:54:00] ERROR[3333]: codec_dahdi.c:820 find_transcoders: Failed to open /dev/dahdi/transcode: No such file or directory
```

### Couldn't find mailbox 1234 in context default
* 示例配置中的配置文件中包含了这几个配置, 把相关的配置取消掉即可

```
  == Parsing '/etc/asterisk/voicemail.conf': Found
  == Parsing '/etc/asterisk/users.conf': Found
[Sep 25 18:54:00] ERROR[3333]: app_voicemail.c:2836 inboxcount2: Couldn't find mailbox 1234 in context default
[Sep 25 18:54:00] ERROR[3333]: app_voicemail.c:2836 inboxcount2: Couldn't find mailbox 1234 in context other
```

### sig_pri.c:6425 pri_dchannel: pri_check_event returned error 22 (Invalid argument)
* [sig_pri.c#L6425](https://github.com/asterisk/asterisk/blob/master/channels/sig_pri.c#L6425)
* pri_check_event [pri.c#L776](https://github.com/asterisk/libpri/blob/master/pri.c#L776)
  * pri->read_func
  * q921_receive
* https://downloads.asterisk.org/pub/telephony/libpri/
* TODD
  * 导致该问题的具体原因还不清楚
  * 会有什么影响也暂不清楚

PRI locks randomly, hangup cause 102, "recovery on timer expiry".
[ASTERISK-15529](https://issues.asterisk.org/jira/browse/ASTERISK-15529)

http://lists.digium.com/pipermail/asterisk-users/2009-August/236460.html
http://lists.digium.com/pipermail/asterisk-users/2014-August/284268.html


```
[Sep  5 19:42:22] NOTICE[14239]: chan_dahdi.c:2840 my_handle_dchan_exception: Got DAHDI event: HDLC Abort (6) on D-channel of span 1
[Sep  5 19:42:22] NOTICE[14239]: sig_pri.c:6425 pri_dchannel: pri_check_event returned error 22 (Invalid argument)
[Sep  5 19:42:22] NOTICE[14239]: chan_dahdi.c:2840 my_handle_dchan_exception: Got DAHDI event: HDLC Abort (6) on D-channel of span 1
[Sep  5 19:42:22] NOTICE[14239]: sig_pri.c:6425 pri_dchannel: pri_check_event returned error 22 (Invalid argument)
[Sep  5 19:42:23] NOTICE[14239]: sig_pri.c:6425 pri_dchannel: pri_check_event returned error 22 (Invalid argument)
[Sep  5 19:42:23] NOTICE[14239]: sig_pri.c:6425 pri_dchannel: pri_check_event returned error 22 (Invalid argument)
[Sep  5 19:42:32] NOTICE[14239]: chan_dahdi.c:2840 my_handle_dchan_exception: Got DAHDI event: HDLC Abort (6) on D-channel of span 1
[Sep  5 19:42:32] NOTICE[14239]: sig_pri.c:6425 pri_dchannel: pri_check_event returned error 22 (Invalid argument)

```


```
PRI Span: 1 < TEI: 0 State 7(Multi-frame established)
PRI Span: 1 < V(A)=0, V(S)=0, V(R)=0
PRI Span: 1 < K=7, RC=0, l3_initiated=0, reject_except=0, ack_pend=0
PRI Span: 1 < T200_id=0, N200=3, T203_id=8192
PRI Span: 1 < [ 02 01 01 01 ]
PRI Span: 1 < Supervisory frame:
PRI Span: 1 < SAPI: 00  C/R: 1 EA: 0
PRI Span: 1 <  TEI: 000        EA: 1
PRI Span: 1 < Zero: 0     S: 0 01: 1  [ RR (receive ready) ]
PRI Span: 1 < N(R): 000 P/F: 1
PRI Span: 1 < 0 bytes of data
PRI Span: 1
PRI Span: 1 > TEI: 0 State 7(Multi-frame established)
PRI Span: 1 > V(A)=0, V(S)=0, V(R)=0
PRI Span: 1 > K=7, RC=0, l3_initiated=0, reject_except=0, ack_pend=0
PRI Span: 1 > T200_id=0, N200=3, T203_id=8192
PRI Span: 1 > [ 02 01 01 01 ]
PRI Span: 1 > Supervisory frame:
PRI Span: 1 > SAPI: 00  C/R: 1 EA: 0
PRI Span: 1 >  TEI: 000        EA: 1
PRI Span: 1 > Zero: 0     S: 0 01: 1  [ RR (receive ready) ]
PRI Span: 1 > N(R): 000 P/F: 1
PRI Span: 1 > 0 bytes of data
PRI Span: 1 -- Got ACK for N(S)=0 to (but not including) N(S)=0
PRI Span: 1 -- T200 requested to stop when not started
PRI Span: 1 T203 requested to start without stopping first
PRI Span: 1 -- Starting T203 timer
PRI Span: 1 Done handling message for SAPI/TEI=0/0
pri_check_event returned error 22 (Invalid argument)
PRI Span: 1
PRI Span: 1 < TEI: 0 State 8(Timer recovery)
PRI Span: 1 < V(A)=0, V(S)=0, V(R)=0
PRI Span: 1 < K=7, RC=0, l3_initiated=0, reject_except=0, ack_pend=0
PRI Span: 1 < T200_id=8192, N200=3, T203_id=0
PRI Span: 1 < [ 00 01 01 01 ]
PRI Span: 1 < Supervisory frame:
PRI Span: 1 < SAPI: 00  C/R: 0 EA: 0
PRI Span: 1 <  TEI: 000        EA: 1
PRI Span: 1 < Zero: 0     S: 0 01: 1  [ RR (receive ready) ]
PRI Span: 1 < N(R): 000 P/F: 1
PRI Span: 1 < 0 bytes of data
PRI Span: 1 -- Got ACK for N(S)=0 to (but not including) N(S)=0
PRI Span: 1 -- Stopping T200 timer
PRI Span: 1 -- Starting T203 timer
PRI Span: 1 Done handling message for SAPI/TEI=0/0
pri_check_event returned error 22 (Invalid argument)
PRI Span: 1
PRI Span: 1 < TEI: 0 State 7(Multi-frame established)
PRI Span: 1 < V(A)=0, V(S)=0, V(R)=0
PRI Span: 1 < K=7, RC=0, l3_initiated=0, reject_except=0, ack_pend=0
PRI Span: 1 < T200_id=0, N200=3, T203_id=8192
PRI Span: 1 < [ 02 01 01 01 ]
PRI Span: 1 < Supervisory frame:
PRI Span: 1 < SAPI: 00  C/R: 1 EA: 0
PRI Span: 1 <  TEI: 000        EA: 1
PRI Span: 1 < Zero: 0     S: 0 01: 1  [ RR (receive ready) ]
PRI Span: 1 < N(R): 000 P/F: 1
PRI Span: 1 < 0 bytes of data
PRI Span: 1
PRI Span: 1 > TEI: 0 State 7(Multi-frame established)
PRI Span: 1 > V(A)=0, V(S)=0, V(R)=0
PRI Span: 1 > K=7, RC=0, l3_initiated=0, reject_except=0, ack_pend=0
PRI Span: 1 > T200_id=0, N200=3, T203_id=8192
PRI Span: 1 > [ 02 01 01 01 ]
PRI Span: 1 > Supervisory frame:
PRI Span: 1 > SAPI: 00  C/R: 1 EA: 0
PRI Span: 1 >  TEI: 000        EA: 1
PRI Span: 1 > Zero: 0     S: 0 01: 1  [ RR (receive ready) ]
PRI Span: 1 > N(R): 000 P/F: 1
PRI Span: 1 > 0 bytes of data
PRI Span: 1 -- Got ACK for N(S)=0 to (but not including) N(S)=0
PRI Span: 1 -- T200 requested to stop when not started
PRI Span: 1 T203 requested to start without stopping first
PRI Span: 1 -- Starting T203 timer
PRI Span: 1 Done handling message for SAPI/TEI=0/0
pri_check_event returned error 22 (Invalid argument)
PRI Span: 1
PRI Span: 1 < TEI: 0 State 8(Timer recovery)
PRI Span: 1 < V(A)=0, V(S)=0, V(R)=0
PRI Span: 1 < K=7, RC=0, l3_initiated=0, reject_except=0, ack_pend=0
PRI Span: 1 < T200_id=8192, N200=3, T203_id=0
PRI Span: 1 < [ 00 01 01 01 ]
PRI Span: 1 < Supervisory frame:
PRI Span: 1 < SAPI: 00  C/R: 0 EA: 0
PRI Span: 1 <  TEI: 000        EA: 1
PRI Span: 1 < Zero: 0     S: 0 01: 1  [ RR (receive ready) ]
PRI Span: 1 < N(R): 000 P/F: 1
PRI Span: 1 < 0 bytes of data
PRI Span: 1 -- Got ACK for N(S)=0 to (but not including) N(S)=0
PRI Span: 1 -- Stopping T200 timer
PRI Span: 1 -- Starting T203 timer
PRI Span: 1 Done handling message for SAPI/TEI=0/0
pri_check_event returned error 22 (Invalid argument)
```

### pjproject:0 sip_transport.c Error processing 430 bytes packet from UDP 192.168.8.121:5061 : PJSIP syntax error exception when parsing '' header on line 2 col 6:
* 网关的问题, 重启下网关就好了

```
[Oct 11 13:06:06] ERROR[15471]: pjproject:0 <?>:               sip_transport.c Error processing 430 bytes packet from UDP 192.168.8.121:5061 : PJSIP syntax error exception when parsing '' header on line 2 col 6:
REGISTER sip:192.168.8.125 SIP/2.0
Via: 0/2.0/0 192.168.8.121:5061;rport;branch=z9hG4bK--106272960715076983491506365490
To: <sip:8076@192.168.8.125>
From: <sip:8076@192.168.8.125>;tag=15064208101506326178-1
Call-ID: 15064208101187768510-0@192.168.8.121
CSeq: 4535 REGISTER
Max-Forwards: 70
Expires: 600
Contact: <sip:8076@192.168.8.121:5061>
User-Agent: NewRockTech MX8-8S VER.1.9.82.343/UA 2.0
Content-Length: 0


-- end of packet.
```

### res_pjsip.c:3053 ast_sip_create_dialog_uac: Endpoint Could not create dialog to invalid URI
* 终端未注册上, 在 CONTACTS 中不存在对应记录, 使用 PJSIP 请求所有 CONTACTS 时不会返回任何东西
* 尝试将终端离线再从新上线

```
[Oct 11 13:08:04] ERROR[15472]: res_pjsip.c:3053 ast_sip_create_dialog_uac: Endpoint '8380': Could not create dialog to invalid URI '8380'.  Is endpoint registered and reachable?
[Oct 11 13:08:04] ERROR[15472]: chan_pjsip.c:2219 request: Failed to create outgoing session to endpoint '8380'
```

### res_pjsip/config_system.c:236 system_create_resolver_and_set_nameservers: There are no local system nameservers configured, resorting to system resolution

```
[Sep 11 14:07:32] ERROR[12786]: res_pjsip/config_system.c:236 system_create_resolver_and_set_nameservers: There are no local system nameservers configured, resorting to system resolution
```

### Everyone is busy/congested at this time (1:0/0/1)

* 开启日志排查 `pjsip set logger on`
* 遇到过的问题
  * `488 Not Acceptable Here` Warning: 305 devnull "SDP: Incompatible media format: no common codec"
    * 被叫返回不支持编码
    * 尝试 allow=all 来进行调试 - 然后再修改允许的编码
* [Mysterious 'everybody is busy/congested at this time' error in Asterisk](https://feeding.cloud.geek.nz/posts/asterisk-everyone-busy-congested-at-this-time/)
  * 原因是被叫返回了 `Do Not Disturb`

## WARNING[14901][C-00000d1b]: res_rtp_asterisk.c:2524 __rtp_recvfrom: PJ ICE Rx error status code: 370401 'Unauthorized'.

### 发起通话的事件间隔很长

### ISSUES


## TBD

http://lists.digium.com/pipermail/asterisk-users/2011-May/262225.html

```
[Sep  5 19:36:48] NOTICE[14195]: chan_dahdi.c:2840 my_handle_dchan_exception: Got DAHDI event: HDLC Abort (6) on D-channel of span 1
[Sep  5 19:36:48] NOTICE[14195]: sig_pri.c:6425 pri_dchannel: pri_check_event returned error 22 (Invalid argument)
  == Primary D-Channel on span 1 down
[Sep  5 19:36:49] WARNING[14195]: sig_pri.c:1211 pri_find_dchan: Span 1: D-channel is down!
```




```
[Sep  7 00:17:21] VERBOSE[9550][C-00000005] res_rtp_asterisk.c: PT: 202(Unknown)
[Sep  7 00:17:21] VERBOSE[9550][C-00000005] res_rtp_asterisk.c: Reception reports: 1
[Sep  7 00:17:21] VERBOSE[9550][C-00000005] res_rtp_asterisk.c: SSRC of sender: 324822813
[Sep  7 00:17:21] VERBOSE[9550][C-00000005] res_rtp_asterisk.c: Received an SDES from 192.168.8.120:10021
```

```
Assertion failed: !"Calling pjlib from unknown/external thread. You must " "register external threads with pj_thread_register() " "before calling any pjlib functions." (../src/pj/os_core_unix.c: pj_thread_this: 692)
```

```
[Sep 18 14:11:42] DEBUG[6106][C-00000002] res_rtp_asterisk.c: Got RTCP report of 64 bytes
[Sep 18 14:11:42] DEBUG[6106][C-00000002] res_rtp_asterisk.c: 0x5651ad288300 -- Received RTCP report from 192.168.9.126:12723, dropping due to strict RTP protection. Received SSRC '1930845172' but expected '912503297'
[Sep 18 14:11:42] DEBUG[6106][C-00000002] res_rtp_asterisk.c: 0x5651ad288300 -- Received RTCP report from 192.168.9.126:12723, dropping due to strict RTP protection. Received SSRC '1930845172' but expected '912503297'
```


```
PRI Span: 2 Changing from state 4(TEI assigned) to 5(Awaiting establishment)
PRI Span: 2 TEI=0 Sending SABME
PRI Span: 2 TEI=0 Sending SABME
PRI Span: 2 TEI=0 Sending SABME
PRI Span: 2 TEI=0 MDL-ERROR (G): T200 expired N200 times sending SABME in state 5(Awaiting establishment)
PRI Span: 2 Changing from state 5(Awaiting establishment) to 4(TEI assigned)
PRI Span: 2 TEI=0 DL event: Q931_DL_EVENT_DL_RELEASE_IND(3)
PRI Span: 2 SAPI/TEI=0/0 Kick starting link
PRI Span: 2 TEI=0 Sending SABME
PRI Span: 2 Changing from state 4(TEI assigned) to 5(Awaiting establishment)
PRI Span: 2 TEI=0 Sending SABME
PRI Span: 2 TEI=0 Sending SABME
PRI Span: 2 TEI=0 Sending SABME
PRI Span: 2 TEI=0 MDL-ERROR (G): T200 expired N200 times sending SABME in state 5(Awaiting establishment)
PRI Span: 2 Changing from state 5(Awaiting establishment) to 4(TEI assigned)
PRI Span: 2 TEI=0 DL event: Q931_DL_EVENT_DL_RELEASE_IND(3)
PRI Span: 2 SAPI/TEI=0/0 Kick starting link
PRI Span: 2 TEI=0 Sending SABME
PRI Span: 2 Changing from state 4(TEI assigned) to 5(Awaiting establishment)
```


```
PJ ICE Rx error status code: 370401 'Unauthorized'.
```

```
[Sep 11 09:48:21] WARNING[13742][C-000000c5]: app_dial.c:1625 wait_for_answer: Unable to write frametype: 2
```

```
[Sep 11 09:46:06] NOTICE[29187]: sig_pri.c:6425 pri_dchannel: pri_check_event returned error 22 (Invalid argument)
```

```
[Sep 11 09:43:18] WARNING[11181][C-000000bb]: pjsip/dialplan_functions.c:875 pjsip_acf_dial_contacts_read: Specified endpoint '8319' was not found
```

```
[Sep 11 14:07:34] ERROR[12741]: codec_dahdi.c:820 find_transcoders: Failed to open /dev/dahdi/transcode: No such file or directory
```
```
[Sep 11 14:07:34] ERROR[12741]: app_voicemail.c:2833 inboxcount2: Couldn't find mailbox 1234 in context defaul
[Sep 11 14:07:34] ERROR[12741]: app_voicemail.c:2833 inboxcount2: Couldn't find mailbox 1234 in context other
```

```
[Sep 14 11:56:49] WARNING[19345]: sig_pri.c:1211 pri_find_dchan: Span 1: D-channel is down!
[Sep 14 11:57:08] WARNING[21631][C-00000015]: app_dial.c:2530 dial_exec_full: Unable to create channel of type'DAHDI' (cause 34 - Circuit/channel congestion)
```


S 口网关拨号异常
```
[ 6756.928153] traps: asterisk[3656] general protection ip:6d92805f5b54 sp:6d92557d86c0 error:0
[ 6756.928157]  in ld-musl-x86_64.so.1[6d92805d2000+89000]
[ 6756.928166] grsec: From 192.168.9.92: Segmentation fault occurred at            (nil) in /usr/sbin/asterisk[asterisk:3656] uid/euid:0/0 gid/egid:0/0, parent /bin/bash[bash:3188] uid/euid:0/0 gid/egid:0/0
```

```
  == Primary D-Channel on span 1 down
[Sep 14 12:40:22] WARNING[6093]: sig_pri.c:1211 pri_find_dchan: Span 1: D-channel is down!
  == Primary D-Channel on span 1 up
```


```
[Sep 12 09:33:08] ERROR[28000]: codec_dahdi.c:820 find_transcoders: Failed to open /dev/dahdi/transcode: No such file or directory
```


```
[255795.036971] dahdi: HDLC Receiver overrun on channel TE2/0/1/16 (master=TE2/0/1/16)
[255962.284877] asterisk[18859]: segfault at 7525fadecbb8 ip 0000752624ecd6bc sp 00007525fb3618c0 error 6 in ld-musl-x86_64.so.1[752624e7d000+89000]
[255962.284889] grsec: From 192.168.10.25: Segmentation fault occurred at 00007525fadecbb8 in /usr/sbin/asterisk[asterisk:18859] uid/euid:0/0 gid/egid:0/0, parent /bin/bash[bash:3484] uid/euid:0/0 gid/egid:0/0
```


```
[Sep 11 14:07:33] WARNING[12741]: res_phoneprov.c:1231 get_defaults: Unable to find a valid server address or name.
```





```
[Sep 12 11:18:57] NOTICE[25466]: res_pjsip_exten_state.c:418 new_subscribe: Endpoint '8292' state subscription failed: Extension '09198118662' does not exist in context 'inside' or has no associated hint
```



```
[Oct 24 15:48:58] ERROR[4217] chan_dahdi.c: PRI Span: 1 !! Not yet handling pre-handle message type USER_INFORMATION (0x20)
[Oct 24 15:48:58] ERROR[4217] chan_dahdi.c: PRI Span: 1 !! Don't know how to pre-handle message type USER_INFORMATION (0x20)
```


```
[Jun 29 11:28:22] NOTICE[3759]: res_pjsip_exten_state.c:418 new_subscribe: Endpoint '1009' state subscription failed: Extension '185555555555' does not exist in context 'inside' or has no associated hint
```

```
SecurityEvent="ChallengeSent",EventTV="2018-07-02T10:27:12.637+0800",Severity="Informational",Service="PJSIP",EventVersion="1",AccountID="9001",SessionID="90533OTQ3MGM0MzYwNjdjMjk5ODMyZTZmNTE2NzIyZTYwNzc",LocalAddress="IPV4/UDP/192.168.88.125/5060",RemoteAddress="IPV4/UDP/192.168.89.11/60448",Challenge=""
SecurityEvent="SuccessfulAuth",EventTV="2018-07-02T10:27:12.640+0800",Severity="Informational",Service="PJSIP",EventVersion="1",AccountID="9001",SessionID="90533OTQ3MGM0MzYwNjdjMjk5ODMyZTZmNTE2NzIyZTYwNzc",Local$ddress="IPV4/UDP/192.168.88.125/5060",RemoteAddress="IPV4/UDP/192.168.89.11/60448",UsingPassword="1"
```

```
[Jul  2 10:39:00] WARNING[32235]: res_rtp_asterisk.c:2524 __rtp_recvfrom: PJ ICE Rx error status code: 370401 'Unauthorized'.
```



```
[Jan 15 18:32:43] WARNING[1855]: res_pjsip/config_transport.c:506 transport_apply: Transport 'transport-udp' is not reloadable, maintaining previous values
[Jan 15 18:32:43] WARNING[1904]: res_pjsip/config_transport.c:506 transport_apply: Transport 'transport-tcp' is not reloadable, maintaining previous values
[Jan 15 18:32:43] NOTICE[1904]: res_pjsip/pjsip_distributor.c:676 log_failed_request: Request 'REGISTER' from '<sip:8225@10.10.0.200>' failed for '10.10.0.3:53380' (callid: 102009Y2Q2N2QwNDMwNjFkZmFiZDZjNWIxMDg5MzMzMzI1YTA) - No matching endpoint found
[Jan 15 18:32:43] NOTICE[1904]: res_pjsip/pjsip_distributor.c:676 log_failed_request: Request 'REGISTER' from '<sip:8225@10.10.0.200>' failed for '10.10.0.3:53380' (callid: 102009Y2Q2N2QwNDMwNjFkZmFiZDZjNWIxMDg5MzMzMzI1YTA) - No matching endpoint found
[Jan 15 18:32:43] NOTICE[1904]: res_pjsip/pjsip_distributor.c:676 log_failed_request: Request 'REGISTER' from '<sip:8225@10.10.0.200>' failed for '10.10.0.3:53380' (callid: 102009Y2Q2N2QwNDMwNjFkZmFiZDZjNWIxMDg5MzMzMzI1YTA) - Failed to authenticate
```
