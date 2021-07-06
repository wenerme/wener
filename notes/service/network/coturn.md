---
title: coturn
---

# coturn

- [coturn/coturn](https://github.com/coturn/coturn)
  - BSD-3, C, RFC 3489/5389/5766/5780/6062/6156 STUN/TURN Server
  - 实现了非常多的规范 - 比 pion/turn 实现更多
  - 支持协议 UDP, TCP, TLS, DTLS, SCTP
  - 支持中继协议 UDP, TCP
  - 支持用户数据库 SQLite, MySQL, PostgreSQL, Redis, MongoDB
  - prometheus metrics :9641
  - 支持多平台- Linux, BSD, macOS, Windows/cygwin
- 参考
  - [TURN server installation Guide](https://www.webrtc-experiment.com/docs/TURN-server-installation-guide.html)
  - [Trickle ICE](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/)
    - 测试工具
    - 注意需要写端口 例如 3478
    - turn 需要授权信息
    - turn 添加 `?transport=tcp` 使用 TCP 协议
    - turn 修改端口后 udp 似乎不通
  - bigbluebutton [Configure TURN](https://docs.bigbluebutton.org/admin/setup-turn-server.html)
  - nextcloud-talk [Configuring coTURN](https://nextcloud-talk.readthedocs.io/en/turn_doc/TURN/)
- SQLite DB 位置 /var/lib/turn/turndb, /usr/local/var/db/turndb

:::caution

- chrome turn 不支持三方授权 - 不支持 oauth
  - [chromium/webrtc#4907](https://bugs.chromium.org/p/webrtc/issues/detail?id=4907)
  - [coturn/coturn#448](https://github.com/coturn/coturn/issues/448)
- webrtc 本身没有 realm 概念 - 是通过换取 token 后包含了 realm
  - 推荐使用 TURN REST API 方式授权

:::

| port  | conf                   |
| ----- | ---------------------- |
| 3478  | listening-port         |
| 3479  | alt-listening-port     |
| 5934  | tls-listening-port     |
| 5935  | alt-tls-listening-port |
| 49152 | min-port               |
| 65535 | max-port               |
| 5766  | cli-port               |

> alt 端口是标准端口+1

| protocol      | port     | desc                             |
| ------------- | -------- | -------------------------------- |
| stun          | 3478/udp | STUN                             |
| stun          | 3478/tcp | STUN/TLS - de-multiplex          |
| turn          | 3478/tcp | TURN over TCP                    |
| turn          | 3478/udp | TURN over UDP                    |
| stun-behavior | 3478/tcp | STUN Behavior Discovery over TCP |
| stun-behavior | 3478/udp | STUN Behavior Discovery over UDP |

**PeerConnection 参数**

```json
{
  "iceServers": [
    { "urls": ["stun:stun.l.google.com:19302"] },
    { "urls": ["turn:192.168.1.2:3478"], "username": "test", "credential": "test" }
  ],
  "iceTransportPolicy": "all",
  "iceCandidatePoolSize": "0"
}
```

```bash
# macOS
brew install coturn
# AlpineLinux
apk add coturn

turnserver
turnutils_stunclient 127.0.0.1

# 如果有外网 IP
turnserver -X $(curl icanhazip.com) -a -f -r example

# 测试服务
sudo turnadmin -a -r example -u test -p test
sudo turnadmin -A -u admin -p admin
sudo turnserver -L 0.0.0.0 -a -f -r example -v --web-admin --web-admin-ip 0.0.0.0 --cli-password test
```

| cli                     | desc                                               |
| ----------------------- | -------------------------------------------------- |
| turnadmin -> turnserver | TURN relay administration tool - 管理 Server 账户  |
| turnserver              |
| turnutils_natdiscovery  | RFC5780 nat 发现                                   |
| turnutils_oauth         | 生成，校验 access_token                            |
| turnutils_peer          | UDP echo 后端服务, 用于配合 turnutils_uclient 测试 |
| turnutils_rfc5769check  | 检测 STUN/TURN 实现准确                            |
| turnutils_stunclient    | STUN RFC 5389 UDP 客户端                           |
| turnutils_uclient       | 测试应用                                           |
| /etc/init.d/turnserver  | OpenRC init                                        |

## 配置示例

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

### turn

```ini
# 建议修改
#external-ip=
#listening-ip=0.0.0.0
#listening-port=
#tls-listening-port=
# 看情况
web-admin
web-admin-ip=127.0.0.1

realm=example.com
# openssl rand -hex 16
static-auth-secret = <secret_value>

fingerprint
lt-cred-mech
use-auth-secret

# 默认 - 使用 selfsign 或 acme
# cert=turn_server_cert.pem
# pkey=turn_server_pkey.pem
# From https://ssl-config.mozilla.org/ Intermediate, openssl 1.1.0g, 2020-01
cipher-list="ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384"
# openssl dhparam -dsaparam  -out /etc/coturn/dhp.pem 2048
dh-file=/etc/coturn/dhp.pem

keep-address-family
no-cli
no-tlsv1
no-tlsv1_1
no-software-attribute

# Block connections to IP ranges which shouldn't be reachable
no-loopback-peers
no-multicast-peers

# IPv4 Private-Use
denied-peer-ip=10.0.0.0-10.255.255.255
denied-peer-ip=172.16.0.0-172.31.255.255
denied-peer-ip=192.168.0.0-192.168.255.255
# Other IPv4 Special-Purpose addresses
denied-peer-ip=100.64.0.0-100.127.255.255
denied-peer-ip=169.254.0.0-169.254.255.255
denied-peer-ip=192.0.0.0-192.0.0.255
denied-peer-ip=192.0.2.0-192.0.2.255
denied-peer-ip=198.18.0.0-198.19.255.255
denied-peer-ip=198.51.100.0-198.51.100.255
denied-peer-ip=203.0.113.0-203.0.113.255
# IPv6 Unique-Local
denied-peer-ip=fc00::-fdff:ffff:ffff:ffff:ffff:ffff:ffff:ffff
# IPv6 Link-Local Unicast
denied-peer-ip=fe80::-febf:ffff:ffff:ffff:ffff:ffff:ffff:ffff
# Other IPv6 Special-Purpose assignments
denied-peer-ip=::ffff:0:0-::ffff:ffff:ffff
denied-peer-ip=64:ff9b::-64:ff9b::ffff:ffff
denied-peer-ip=64:ff9b:1::-64:ff9b:1:ffff:ffff:ffff:ffff:ffff
denied-peer-ip=2001::-2001:1ff:ffff:ffff:ffff:ffff:ffff:ffff
denied-peer-ip=2001:db8::-2001:db8:ffff:ffff:ffff:ffff:ffff:ffff
denied-peer-ip=2002::-2002:ffff:ffff:ffff:ffff:ffff:ffff:ffff
```

## 配置

- 配置也可以通过命令行参数传递，部分参数有短参模式
- 推荐 TCP SSLv3, TLS 1.0,1.1,1.2、UDP DTLSv1
- -c 配置文件 - 默认 turnserver.conf
- -n 不使用配置文件
- [examples/etc/turnserver.conf](https://github.com/coturn/coturn/blob/master/examples/etc/turnserver.conf)
- use-auth-secret 与 lt-cred-mech 冲突
  - 推荐 use-auth-secret，但要复杂一点

```conf
# -d 监听设备 - 不建议使用 - linux 的 interface
# listening-device=
# -p 监听端口
# 也能接收 TLS & DTLS 会话
listening-port=3478
# TLS & DTLS
# 也能接收 "plain" TCP & UDP 会话 - 会自动识别
tls-listening-port=5349

# 端口的额外监听端口 - STUN CHANGE_REQUEST - RFC 5780
# 0=listening-port+1
alt-listening-port=0
alt-tls-listening-port=0

# tcp proxy 协议 - https://www.haproxy.org/download/1.8/doc/proxy-protocol.txt
# 用于支持负载均衡
# tcp-proxy-port=

# -L 监听地址，支持多个
# 默认监听 所有 IPv4 和 IPv6
# listening-ip=0.0.0.0

# 辅助服务地址
# 辅助服务不支持 alternative ports, 不支持 CHANGE REQUEST
# aux-server = <ip:port>

# 仅用于旧的 Linux - 自动与 auxiliary 服务均衡 UDP 流量
udp-self-balance

# -i 中继设备 - 不推荐
# relay-device = <device-name>
# -E 中继地址
# relay-ip = <ip>

# -X 外部地址
# TURN Server 共私地址映射
# 如果只指定了 public 地址，则所有 relay 都会使用该地址 - one single relay, no RFC5780 functionality is required
# 地址会返回为 XOR-RELAYED-ADDRESS 字段
# external-ip = <public-ip[/private-ip]>

# 允许本地地址 - 127.x.x.x,::1
allow-loopback-peers
# 不允许广播地址 - 224.0.0.0, FFXX:*
no-multicast-peers
# -m 中继线程数量 - 0 为单线程模式, 默认会使用 cpu 数
# relay-threads = <number>

# 中继 UDP 端口范围
min-port=49152
max-port=65535

# Production mode - 隐藏服务端版本
# 之前是 prod
no-software-attribute
# -f 在 TURN 消息中添加指纹
fingerprint
# -a long-term credential mechanism
lt-cred-mech
# 无认证 - 允许匿名访问
no-auth
# 用户账号
# user = <user:pwd>
# 默认域
# realm = <realm>
# 要求请求的 ORIGIN 相同
check-origin-consistency

# -q 单用户配额 - 一个用户可以创建多少并发
# user-quota = <number>
# -Q 总配额 - 全局并发限制
# total-quota = <number>
# TURN 限流 - sessoion bytes-per-second
# max-bps = <number>
# 服务器流量 - bytes-per-second
# bps-capacity = <number>

# -b,--userdb SQLite DB
# /usr/local/var/db/turndb, /var/lib/turn/turndb.
# db=/var/db/turndb

# -e, --psql-userdb, --sql-userdb
# http://www.postgresql.org/docs/9.2/static/libpq-connect.html#LIBPQ-CONNSTRING
# psql-userdb = <conn-string>

# -N
# host=<ip-addr> dbname=<db-number> password=<database-user-password> port=<db-port> connect_timeout=<seconds>
# redis-userdb = <connection-string
# -O redisl 统计和状态 db，支持事件订阅
# redis-statsdb = <connection-string>

# TURN REST API
#
# Time Limited Long Term Credential
#   sets a special authorization option that is based upon authentication secret
# 用于支持 TURN Server REST API
# usercombo -> "timestamp:userid"
# turn user -> usercombo
# turn password -> base64(hmac(secret key, usercombo))
#
# allows TURN credentials to be accounted for a specific user id
# turning on secret-based authentication - static-auth-secret 或 turn_secret 表
# 依赖 lt-cred-mech，会修改部分配置
# use-auth-secret
# 静态 secret - 默认使用 turn_secret 表数据
# static-auth-secret = <secret>
# 用于 oAuth 流程 - 默认为 realm 名字
# server-name
# 启用 oAuth
oauth

# 静态用户 - 不可以用于 TURN REST API
# 生成 key - turnadmin -k -u ninefingers -r north.gov -p youhavetoberealistic
#user=usr:key
#user=usr:pass

# Disable periodic health checks to 'dynamic' auth secret tables
no-auth-pings
# 不使用动态的 允许/拒绝 ip 列表
no-dynamic-ip-list
# 不使用动态 realm 属性
no-dynamic-realms


# TLS
# ====================
# 默认 turn_server_cert.pem
# cert = <filename>
# 默认 turn_server_pkey.pem
# pkey = <filename>
# pkey-pwd = <password>
# 默认值为 DEFAULT
# cipher-list = <"cipher-string">
# 设置 CA 后会验证客户端证书
# CA-file = <filename>
# 默认 prime256v1
# ec-curve-name = <curve-name>
# 566 bits predefined DH TLS key - 默认 2066.
# dh566
# 1066 bits predefined DH TLS key - 默认 2066.
# dh1066
# DH TLS key - pem 格式
# dh-file = <dh-file-name>

no-tlsv1
no-tlsv1_1
no-tlsv1_2

# 协议配置
# ====================
# 不监听 协议
no-udp
no-udp
no-tls
no-dtls
# 禁止 udp relay - 只使用 tcp
no-udp-relay
# 禁止 tcp relay - 只使用 udp
no-tcp-relay
# 服务端中继 - 非标准逻辑 - 仅用于特殊场景
# server-relay

# 禁用 RFC5780 (NAT behavior discovery)
# 如果监听了多个相同地址族则会启用该功能
# 启用会返回更多信息，禁用可以减小攻击放大风险
# 建议开启该选项
no-rfc5780

# 禁用 MAPPED-ADDRESS, 只使用 XOR-MAPPED-ADDRESS
# 启用可以 decrease gain factor in STUN binding responses
# 建议开启该选项
no-stun-backward-compatibility

# 如果开启了 RFC5780 只发送 RESPONSE-ORIGIN
# 启用可以 decrease gain factor in STUN binding responses
# 建议开启该选项
response-origin-only-with-rfc5780

# 日志配置
# ====================
# -l 文件名可以使用 syslog,stdout 和 -
# 会尝试目录 /var/log/turnserver/, /var/log, /var/tmp, /tmp, .
# log-file = <filename>
# 不输出 stdout - 默认是 log 文件+stdout
no-stdout-log
syslog
# log 文件名不添加 pid 和日期信息
simple-log

# ISO-8601
new-log-timestamp
# strftime
# new-log-timestamp-format = <format>
# STUN binding request - 默认关闭 - 避免 DoS
# log-binding

# 失效时间 - 秒
stale-nonce=600
max-allocate-lifetime=3600
channel-lifetime=600
# 生产不建议修改
permission-lifetime=300
max-allocate-timeout=60

# -S 拒绝所有 turn 请求
stun-only
# 拒绝所有 sturn 请求
no-stun
# stun 要求验证
secure-stun

# 用于负载的服务 - 会重定向
# alternate-server = <ip:port>
# tls-alternate-server = <ip:port>

# -C timestamp/username 分割
rest-api-separator=:
# 重定向 ^/.well-known/acme-challenge/(.*)
# acme-redirect = <URL>

# allowed-peer-ip = <ip[-ip]>
# denied-peer-ip = <ip[-ip]>

# 会尝试 /var/run/turnserver.pid, /var/tmp/turnserver.pid
# pidfile = <"pid-file-name">
# 进程运行身份
# proc-user = <user-name>
# proc-group = <group-name>

# 支持 MICE - Mobility with ICE
mobility
# -K 基于通讯选择地址 - RFC6156 section-4.2 要求默认 IPv4
# keep-address-family

# 禁用 CLI 支持
# no-cli
cli-ip=127.0.0.1
cli-port=5766
# 建议使用 turnadmin -P 生成加密密钥
# cli-password = <password>
cli-max-output-sessions

# 启用 web-admin - 需要 cert
web-admin
web-admin-ip=127.0.0.1
web-admin-port=8080
# 出于安全考虑默认关闭
web-admin-listen-on-workers

prometheus
```

## TURN REST API
- 使用 use-auth-secret+static-auth-secret 授权方式相对更安全
- password=`base64(hmac(usercombo = "${timestamp}:${username}", secret))`
- timestamp 为失效时间
- 请求 turn 的时候 username 需要使用 usercombo
- 支持配置多个 shared-secret，会遍历，可以根据 realm 配置
- 流程
  - 客户端先和自己的服务端交互
    - 服务端验证客户端，从 coturn 生成 token
  - 客户端取到 token 进行 turn 操作
- [A REST API For Access To TURN Services](https://datatracker.ietf.org/doc/html/draft-uberti-behave-turn-rest-00)


```go
func hashPassword(name, ts, secret string) (string, string) {
	combo := fmt.Sprintf("%v:%v", ts, name)
	hash := hmac.New(sha1.New, []byte(secret))
	hash.Write([]byte(combo))
	return combo, base64.StdEncoding.EncodeToString(hash.Sum(nil))
}
```

```bash
SECRET=<secret_value>

time=$(date +%s)
expiry=8400
username=$(( $time + $expiry )):${username}
echo username: ${username}
echo password:
echo -n $username | openssl dgst -binary -sha1 -hmac $SECRET | openssl base64
```

```js
var crypto = require('crypto');

function getTURNCredentials(name, secret) {
  var unixTimeStamp = parseInt(Date.now() / 1000) + 24 * 3600, // this credential would be valid for the next 24 hours
    username = [unixTimeStamp, name].join(':'),
    password,
    hmac = crypto.createHmac('sha1', secret);
  hmac.setEncoding('base64');
  hmac.write(username);
  hmac.end();
  password = hmac.read();
  return {
    username: username,
    password: password,
  };
}
```


# FAQ

## server stun returned an error with code=701

701 - none of the ICE candidates were able to successfully make contact with the STUN or TURN server

## self-signed certificates for Turn Server

```bash
openssl req -x509 -newkey rsa:2048 -keyout turn_server_pkey.pem -out turn_server_cert.pem -days 3650 -nodes
turnserver -n -L 0.0.0.0 -v -a -f -r example -u test:test --cert turn_server_cert.pem --pkey turn_server_pkey.pem --oauth --web-admin
```
