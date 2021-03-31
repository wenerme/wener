---
title: Asterisk Network
---

# Asterisk Network

> Asterisk 11+ 支持 ICE

- Asterisk 是 B2BUA back-to-back user agent - 不是 SIP Proxy
- 参考
  - [Asterisk sip nat](https://www.voip-info.org/asterisk-sip-nat)
  - [Asterisk Firewall Rules](https://www.voip-info.org/asterisk-firewall-rules)
  - [PJSIP with Proxies](https://wiki.asterisk.org/wiki/display/AST/PJSIP+with+Proxies)
  - [SIP with NAT or Firewalls](https://www.asteriskguru.com/tutorials/sip_nat_oneway_or_no_audio_asterisk.html)
  - [SIP and RTP Routing](https://www.asterisk.org/sip-and-rtp-routing/)
  - https://blog.csdn.net/SUKHOI27SMK/article/details/40107553

| port            | desc |
| --------------- | ---- |
| 5060/udp        | sip  |
| 5060/tcp        | sip  |
| 4569/udp        | IAX2 |
| 5036/udp        | IAX  |
| 10000-20000/udp | RTP  |
| 2727/udp        | MGCP |

```bash
nmap 192.168.1.1 -P0 -p 5060 -sU
```

# NAT

- [Asterisk SIP NAT solutions](https://www.voip-info.org/asterisk-sip-nat-solutions/)

| case | asterisk role | other              | nat      |
| ---- | ------------- | ------------------ | -------- |
| #1   | client nat    | outside sip        | yes      |
| #2   | client nat    | inside sip         | no       |
| #3   | server nat    | outside client     | yes      |
| #4   | server nat    | outside client nat | yes      |
| #5   | server nat    | inside client      | no       |
| #6   | client        | outside sip        | no       |
| #7   | client        | inside sip         | yes - #3 |
| #8   | server nat    | outside client     | no       |
| #9   | server nat    | inside client      | yes      |

1. SIP outside proxy
2. OK
3. 1:1 端口转发
4. 端口转发 + 客户端 STUN
5. OK
6. OK
7. 同 #3
8. OK
9. nat=yes, qualify=xxx, 客户端可以 stun 辅助

# 配置
## sip.conf

* asterisk [nat support](https://github.com/asterisk/asterisk/blob/master/configs/samples/sip.conf.sample#L869)
* asterisk 1.8 [nat support](https://github.com/asterisk/asterisk/blob/1.8/configs/sip.conf.sample#L761)
* symmetric RTP
* Asterisk will always send RTP packets from the same port number it expects to receive them on.

:::tip

* 建议只在 general 配置 nat 相关选项
  * 不同的 nat 配置可能相互影响

:::

__基础服务__

```ini
[general]
port = 5060
bindaddr = 0.0.0.0
context = error
qualify=no
srvlookup=yes
```

```ini
[general]
; 区分 inside 和 outside
; 判断是否 NAT
localnet=192.168.0.0/255.255.0.0
; SIP 和 SDP 使用的静态地址 - 端口默认为 udpbindaddr
; hostname 启动时查询一次
; externip
externaddr = 12.34.56.78:9900
; externtcpport = 9900
; externtlsport = 12600

; 同 externaddr - 每隔 externrefresh(默认 10s) 查询一次 hostname
externhost = hostname[:port]
externrefresh = 10

; no - use rport if remote request
; force_rport - 强制 rport - 默认
; yes - force_rport + comedia RTP
; comedia - no + comedia RTP
; comedia - connection-oriented media
nat = force_rport

; 修改 audio, video, text 等 SDP 地址
media_address =
```

### nat

- nat=yes
  - Asterisk 忽略 SIP, SDP 头中的地址信息, 直接返回给发送者的 IP 地址和端口
  - 强制 RFC 3581， 开启 [对称 RTP](https://www.voip-info.org/rtp-symmetric)
- net=never - 2004 年 7 月 29 添加
  - 用于 UA/客户端 不支持 rport 常见
  - 之后添加 route 选项 - 添加参数控制是否支持

| nat         | rfc3581 | Symmetric RTP |
| ----------- | ------- | ------------- |
| yes         | force   | enable        |
| no          | enable  | disable       |
| force_rport | force   | disable       |
| comedia     | enable  | enable        |

# FAQ

## tcpdump

```bash
# UDP
tcpdump -n dst portrange 10000-11000

tcpdump -i bond3 udp port 5060 or udp portrange 10000-20000
```

## nftables 转发

```
# SIP
iifname "wan0" udp dport 5060 counter dnat to 192.168.1.2
iifname "wan0" tcp dport 5060 counter dnat to 192.168.1.2
# RTP
iifname "wan0" udp dport 10000-20000 counter dnat to 192.168.1.2
# IAX
iifname "wan0" udp dport 4569 counter dnat to 192.168.1.2
iifname "wan0" udp dport 5036 counter dnat to 192.168.1.2
# MGCP
iifname "wan0" udp dport 2727 counter dnat to 192.168.1.2
```

## IPTables 转发

```bash
# SIP
iptables -A INPUT -p udp -m udp --dport 5060 -j ACCEPT
iptables -A INPUT -p tcp -m tcp --dport 5060 -j ACCEPT

# IAX2- the IAX protocol
iptables -A INPUT -p udp -m udp --dport 4569 -j ACCEPT
# IAX
iptables -A INPUT -p udp -m udp --dport 5036 -j ACCEPT
# RTP
iptables -A INPUT -p udp -m udp --dport 10000:20000 -j ACCEPT
# MGCP
iptables -A INPUT -p udp -m udp --dport 2727 -j ACCEPT
```
