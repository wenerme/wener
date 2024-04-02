---
tags:
  - Configuration
---

# PowerDNS Authoritative Server Setting

- [Authoritative Server Settings](https://doc.powerdns.com/authoritative/settings.html)
- 支持 `+=` 语法
- loglevel - 类似 syslog
  - 0 = emergency
  - 1 = alert
  - 2 = critical
  - 3 = error
  - 4 = warning
  - 5 = notice
  - 6 = info
  - 7 = debug
- loglevel-show=no
  - 4.9+
  - 输出为结构化日志
  - `msg="" prio="Error"`
- logging-facility=0
  - 对应 syslog 的 facility

```ini
# SQLite
# ==========
launch=gsqlite3
gsqlite3-database=powerdns.sqlite

# PostgreSQL
# ==========
launch=gpgsql
gpgsql-host=127.0.0.1
gpgsql-port=5432
gpgsql-dbname=mydb
gpgsql-user=pdns
gpgsql-password=PASSWORD
# 可以修改为使用其他 schema
gpgsql-extra-connection-parameters=options='-csearch_path=public' sslmode=disable

```


```ini
# 后台运行
daemon=no

# 默认为 hostname
server-id=localhost

# 是否监听 TCP 端口
disable-tcp=no
# 是否启用 RFC2136/DNS Update
dnsupdate=no

# 包含其他配置目录
include-dir=
# 加载模块, 逗号分隔
load-modules=
# 模块地址
# 编译时 PKGLIBDIR 指定
module-dir=
# 不要尝试读取配置文件
no-config=no

local-ipv6=
# 本地监听地址
local-address=0.0.0.0
local-port=53

tcp-control-address=
tcp-control-port=53000
tcp-control-range=
tcp-control-secret=

# dig chaos txt version.bind @pdns.ip.address
# 可选 anonymous, powerdns, full
version-string=full

# Linux 3.9 SO_REUSEPORT
reuseport=no
# fast open 的队列大小, 0 为禁用
tcp-fast-open=0
# LOCALSTATEDIR
socket-dir=/var/run

# 缓存数据库域名数据的时间
domain-metadata-cache-ttl=60

# Server
# ==========
# 守护者模式 - 当不通过 supervisor 启动时建议开启
guardian=yes

# SOA
# ==========
default-soa-name=a.misconfigured.powerdns.server
default-soa-edit=
default-soa-edit-signed=
default-soa-mail=
soa-expire-default=604800
soa-minimum-ttl=3600
soa-refresh-default=10800
soa-retry-default=3600

# Logging
# ==========
disable-syslog=yes
# syslog 的编号
# 数字, 例如 1 会记录日志到 local1
logging-facility=
# 信息相关的 DNS 不会发送到 syslog, 提升性能
log-dns-details=no
# 会记录所有 DNS 查询请求, 会产生较多日志, 建议只用于调试
log-dns-queries=no
log-timestamp=yes
# 建议不要低于 3
loglevel=4
# 提示后端对查询进行日志
query-logging=ni

# 默认 TTL
default-ttl=3600

# 缓存带结果的查询时间
query-cache-ttl=20

# 递归查询的缓存事件
recursive-cache-ttl=10

# API/Webserver
# ==========
# 隐性的指定 webserver
api=yes
api-key=KEY
api-readonly=no

# 用于监控的 web 服务
webserver=no
webserver-address=127.0.0.1
webserver-allow-from=127.0.0.1,::1
webserver-password=
webserver-port=8001
webserver-print-arguments=no


# Backend
# =========
# 启动的后端名字
# launch=bind,gmysql,remote
# launch=gmysql,gmysql:server2 两个 mysql, 第二个的配置为 gmysql-server2-host
launch=
```

**pdns.conf**

```ini
cache-ttl=60
chroot=/var/empty
config-dir=/etc/pdns
daemon=yes
distributor-threads=1
guardian=yes
local-port=53
loglevel=3
module-dir=/usr/lib/pdns/pdns
negquery-cache-ttl=60
setgid=pdns
setuid=pdns
socket-dir=/var/run
use-logfile=no
webserver=no
wildcards=yes
```
