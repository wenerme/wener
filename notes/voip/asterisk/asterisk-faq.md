---
id: faq
title: 常见问题
---

# Asterisk FAQ

## 多租户方式

- 可以实现简单的多租户
  - 使用 context 隔离租户路由
  - 使用 realm 隔离租户用户
- 复杂多租户很难实现
  - 例如 难以支持 meetme, message, transfer 等
  - 多套部署可能会简单点
- 其他方案
  - 使用 FreeSwitch - 对多租户和大规模支持更好
  - 使用 Kamailio 前端分流和负载
- 类似场景商业产品
  - [MiRTA PBX](https://www.mirtapbx.com/architecture.html)
  - [Vital PBX](https://www.vitalpbx.org/)
  - [iHostPBX: Your Multi-Tenant PBX Setup Using Asterisk](https://www.indosoft.com/multi-tenant-pbx.htm)
- 参考
  - [a4business/MPBX](https://github.com/a4business/MPBX)
    Multitenant PBX

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

## The canary is no more. He has ceased to be!

```c
static void *canary_thread(void *unused)
{
	struct stat canary_stat;
	struct timeval now;

	/* Give the canary time to sing */
	sleep(120);

	for (;;) {
		now = ast_tvnow();
		if (stat(canary_filename, &canary_stat) || now.tv_sec > canary_stat.st_mtime + 60) {
			ast_log(LOG_WARNING,
				"The canary is no more.  He has ceased to be!  "
				"He's expired and gone to meet his maker!  "
				"He's a stiff!  Bereft of life, he rests in peace.  "
				"His metabolic processes are now history!  He's off the twig!  "
				"He's kicked the bucket.  He's shuffled off his mortal coil, "
				"run down the curtain, and joined the bleeding choir invisible!!  "
				"THIS is an EX-CANARY.  (Reducing priority)\n");
			set_priority_all(0);
			pthread_exit(NULL);
		}

		/* Check the canary once a minute */
		sleep(60);
	}
}
```

## app_dial.c: Unable to create channel of type 'IAX2' (cause 20 - Subscriber absent)

表示 iax 未注册上

```bash
iax2 show peers
```

## 端口检测

```bash
# 检测 iax2 端口是否开放
nmap -sU --script iax2-version.nse -p 4569 192.168.1.2

# SIP 探测
nmap -sU --script sip-methods -p 4569 192.168.1.2
# 伪造拨号
nmap --script=sip-call-spoof -sU -p 5060 --script-args 'sip-call-spoof.ua=Nmap, sip-call-spoof.from=Boss' <targets>
# 枚举用户
nmap --script=sip-enum-users -sU -p 5060 <targets> --script-args 'sip-enum-users.padding=4, sip-enum-users.minext=1000,sip-enum-users.maxext=9999'

# STUN
nmap -sU --script stun-version -p 3478 <target>
nmap -sV -PN -sU -p 3478 --script stun-info <ip>
```
