---
title: coturn
---

# coturn

- [coturn/coturn](https://github.com/coturn/coturn)
  - BSD-3, C, TURN/STUN Server
  - 实现了非常多的规范 - 比 pion/turn 实现更多
  - 支持协议 UDP, TCP, TLS, DTLS, SCTP
  - 支持中继协议 UDP, TCP
  - 支持用户数据库 SQLite, MySQL, PostgreSQL, Redis, MongoDB
  - prometheus metrics :9641
  - 支持多平台- Linux, BSD, macOS, Windows/cygwin
- 参考
  - [TURN server installation Guide](https://www.webrtc-experiment.com/docs/TURN-server-installation-guide.html)

```bash
# macOS
brew install coturn
# AlpineLinux
apk add coturn

turnserver
turnutils_stunclient 127.0.0.1
```

| cli                     | desc                                              |
| ----------------------- | ------------------------------------------------- |
| turnadmin -> turnserver | TURN relay administration tool - 管理 Server 账户 |
| turnserver              |
| turnutils_natdiscovery  |
| turnutils_oauth         |
| turnutils_peer          |
| turnutils_stunclient    |
| turnutils_uclient       |
| /etc/init.d/turnserver  | OpenRC init                                       |

## 配置

```conf
# 监听端口
listening-port=3478

tls-listening-port=5349

# 端口的额外监听端口
# alt-listening-port<port>	<port>

# 监听地址
listening-ip=0.0.0.0

# 辅助地址
# aux-server=<ip:port>

# 中继地址
# relay-ip=<ip>

# 外部地址
# external-ip=<public-ip[/private-ip]>

# 允许本地地址
allow-loopback-peers
# 不允许广播地址 - 224.0.0.0, FFXX:*
no-multicast-peers

# UDP 端口范围
min-port=49152
max-port=65535

# Production mode - 隐藏服务端版本
prod

# 无认证 - 允许匿名访问
no-auth

# 用户账号
# user=<user:pwd>
# 用户域
# realm=<realm>

# 要求请求的 ORIGIN 相同
check-origin-consistency

# 单用户配额
# user-quota=<number>
# 总配额
# total-quota=<number>

# TURN 限流
# max-bps=<number>
# 服务器流量
# bps-capacity=<number>

# SQLite DB
# db=/var/db/turndb

# use-auth-secret
# static-auth-secret=<secret>
# 默认为 realm 名字
# server-name
# 启用 oAuth
oauth

# TLS 相关配置
# cert=<filename>
# pkey=<filename>
# pkey-pwd=<password>
# cipher-list=<"cipher-string">
# CA-file=<filename>
# ec-curve-name=<curve-name>

no-udp
no-udp
no-tls
no-dtls
no-udp-relay
no-tcp-relay

# 文件名可以使用 stdout 和 -
# log-file=<filename>
no-stdout-log
syslog

# 失效时间 - 秒
stale-nonce=600
max-allocate-lifetime=3600
channel-lifetime=600
permission-lifetime=300

stun-only
no-stun
# alternate-server=<ip:port>
# tls-alternate-server=<ip:port>

# stun 要求验证
secure-stun

rest-api-separator=:

allowed-peer-ip=<ip[-ip]>
denied-peer-ip=<ip[-ip]>

; pidfile <"pid-file-name">

; proc-user <user-name>
; proc-group <group-name>

# 支持 MICE - Mobility with ICE
mobility

keep-address-family

no-cli
cli-ip=127.0.0.1
cli-port=5766
cli-password=<password>

cli-max-output-sessions

web-admin
web-admin-ip=127.0.0.1
web-admin-port=8080
web-admin-listen-on-workers

; server-relay
```

**/etc/turnserver.conf**

```conf
# you can listen ports 3478 and 5349 instead of 80/443
listening-port=80
tls-listening-port=443

listening-ip=your-ip-address

relay-ip=your-ip-address
external-ip=your-ip-address

realm=yourdomain.com
server-name=yourdomain.com

lt-cred-mech
userdb=/etc/turnuserdb.conf

# use real-valid certificate/privatekey files
cert=/etc/ssl/certificate.pem
pkey=/etc/ssl/private.key

no-stdout-log
```

**/etc/turnuserdb.conf**

```conf
# pass
yourName:yourPassword

# db
userdb=/var/lib/turn/turndb

# in this case, please add following:
# lt-cred-mech             # remove or comment this one
oauth                      # add this
user=youruser:yourpassword # add this

# source: askubuntu.com/a/819264
```
