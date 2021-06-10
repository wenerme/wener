---
id: faq
title: 常见问题
---

# Asterisk FAQ

## Everyone is busy/congested at this time (1:0/0/1)

- 开启日志排查 `pjsip set logger on`
- 遇到过的问题
  - `488 Not Acceptable Here` Warning: 305 devnull "SDP: Incompatible media format: no common codec"
    - 被叫返回不支持编码
    - 尝试 allow=all 来进行调试 - 然后再修改允许的编码
- [Mysterious 'everybody is busy/congested at this time' error in Asterisk](https://feeding.cloud.geek.nz/posts/asterisk-everyone-busy-congested-at-this-time/)
  - 原因是被叫返回了 `Do Not Disturb`
- pjsip contacts NonQual
  - 为 aor 设置 qualify 间隔
- pjsip 注册到对方 - 对方显示 UNKNOWN
  - 在 stun 完成后即可注册成功

## verbose 3 Remote UNIX connection

- verbose 设置为 3 时非常多这个日志
- AMI 请求导致 - 例如 freepbx 或者其他网关接口请求
- SNMP 请求导致
- asterisk -r 导致

```
-- Remote UNIX connection
-- Remote UNIX connection disconnected
-- Remote UNIX connection
-- Remote UNIX connection disconnected
```

**asterisk.conf**

```ini
[options]
# 隐藏 remote console 连接信息
hideconnect=yes
```

```bash
# 修改后重启
asterisk -rx 'core restart now'
```

## 发起呼叫设置 CallerID

> 命令行发起无法设置

**#1 AMI 发起**

```
Action: Originate
Channel: local/12345@outgoing
Application: Echo
CallerID: Asterisk <12345>
```

**#2 extensions 设置**

```conf
[outgoing]
exten => 12345,1,NoOp()
same => n,Verbose(1, Outgoing Caller ID: {$CALLERID(all)})
same => n,Dial(SIP/${EXTEN})
same => n,Hangup()

exten => 12345,1,NoOp()
same => n,Set(CALLERID(num)=54321)
same => n,Set(CALLERID(name)=Asterisk)
same => n,Verbose(1, Outgoing Caller ID: {$CALLERID(all)})
same => n,Dial(SIP/${EXTEN})
same => n,Hangup()
```

## AES encryption disabled. Install OpenSSL.

iax2 时发生, 加载 res_crypto

## cel_pgsql.c:352 pgsql_log: Reason: ERROR: value too long for type character varying

- 将 CEL 的 APPDATA 改为更长的类型, 如果是 pg, 建议直接改为 text

```
[Sep 11 09:30:06] WARNING[3434]: cel_pgsql.c:351 pgsql_log: Failed to insert call detail record into database!
[Sep 11 09:30:06] WARNING[3434]: cel_pgsql.c:352 pgsql_log: Reason: ERROR:  value too long for type character varying(255)
```

## Couldn't find mailbox 4021 in context default

注意, DADHI FXS 生成的配置文件会默认添加 voicemail, 会导致出现非常多这样的日志

```
[Sep 25 18:18:46] WARNING[3003]: app_voicemail.c:2476 __messagecount: Couldn't find mailbox 4021 in context default

# 关闭 `app_voicemail` 后会出现下面的问题

No voicemail provider registered.
```

## IAX2 status UNKNOWN

## Dial 接通之前没有铃声

可以在 Dial 之前先 Answer
