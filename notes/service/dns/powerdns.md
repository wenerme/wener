---
title: PowerDNS
---


# PowerDNS

* [PowerAdmin](http://www.poweradmin.org/) 网页管理工具
* Auth server [settings](https://doc.powerdns.com/md/authoritative/settings/)
* https://doc.powerdns.com/authoritative/indexTOC.html
* [PowerDNS/pdns](https://github.com/PowerDNS/pdns)
* 特性
  * 多种后端
  * 多种复制方式
  * 修改不需要重启
  * 定制缓存
  * Supermaster
    * 当为一个节点设置了 Supermaster 后,在主节点上创建 zone,所有子节点会自动创建相应的 zone, 并发起一个 AXFR 请求
    * bind 中需要手动为所有子节点添加 zone
* NOTES
  * 当找到一条匹配的后不会再尝试使用通配符查找
    * 例如 *.example.org A 192.168.1.1, test.example.org TXT Test, 当查询 ANY test.example.org 只会返回 TXT
* 参考
  * [Backend writers' guide](https://doc.powerdns.com/md/appendix/backend-writers-guide/)
* pdnsutil
  * 域名管理工具
  * 通过修改 DB - 可以远程使用


dnsdist is a DNS loadbalancer from the people behind PowerDNS that balances DNS packets based on rules.

```bash
# macOS 安装
brew install pdns --with-postgresql --with-remote

# SQLite3
# https://doc.powerdns.com/md/authoritative/backend-generic-sqlite/
# 将 Schema 保存到 schema.sqlite3
sqlite3 powerdns.sqlite .read schema.sqlite3
# 在前台启动, 之所以修改 端口和 socket-dir 是因为可能会没有权限
pdns_server --daemon=no --launch=gsqlite3 --local-port=5300 --socket-dir=`pwd`/socket
# 将配置文件写入到 pdns.conf
# launch=gsqlite3
# local-port=5300
# socket-dir=./socket
# gsqlite3-database=powerdns.sqlite
# 使用配置文件启动
pdns_server --daemon=yes --config-dir=.

pdns_server --daemon=no --launch=remote --local-port=5300 --socket-dir=`pwd`/socket

# pdns_control 用于操作实例
# 简化 pdns_control 操作
alias pc="pdns_control --config-dir=`pwd`"
# 退出服务
pc quite
# 获取当前的配置
pc current-config

# pdnsutil 用于操作后端数据, 即便没有启动 server 也可以
# 简化 pdnsutil 操作
alias pu="pdnsutil --config-dir=`pwd`"
# 添加用于测试的记录
pu add-record i.wener.me @ A 127.0.0.1
pu add-record i.wener.me dev A 127.0.0.1

# 测试添加的记录
dig @127.0.0.1 -p 5300 dev.i.wener.me

# 常用操作
# 创建
pdnsutil create-zone mydomain.com
# 检测现有的问题
pdnsutil check-zone mydomain.com
# add-record ZONE NAME TYPE [ttl] content


# Playground
docker run --rm -it -p 5353:53 --entrypoint bash wener/pdns:edge

```

## Get Start

```bash
docker run --rm -it -p 80:80 -p 53:53 -p 53:53/udp -v $PWD:/host -w /host wener/dns bash

# 用于接口请求
API_KEY=$(cat /dev/urandom | env LC_CTYPE=C tr -dc 'a-zA-Z0-9' | head -c 32)
WEBSERVER_PASSWORD=$(cat /dev/urandom | env LC_CTYPE=C tr -dc 'a-zA-Z0-9' | head -c 32)
# /etc/pdns/pdns.conf 标准配置目录
cat <<EOF | tee pdns.conf > /etc/pdns/pdns.conf
# backend
launch=gsqlite3
gsqlite3-database=$PWD/pdns.sqlite
# handle dnssec
gsqlite3-dnssec

# server
local-port=53
local-address=0.0.0.0
daemon=yes
guardian=yes

# dyndns
dnsupdate=yes
allow-dnsupdate-from=

# web/api
webserver=yes
webserver-address=0.0.0.0
webserver-password=$WEBSERVER_PASSWORD
webserver-loglevel=normal
webserver-port=80

api=yes
api-key=$API_KEY

# soa default
default-soa-name=ns1.wener.me
default-soa-edit=
default-soa-edit-signed=
default-soa-mail=
soa-expire-default=604800
soa-minimum-ttl=3600
soa-refresh-default=10800
soa-retry-default=3600
EOF
# 初始化 sqlite
curl -LO https://raw.githubusercontent.com/PowerDNS/pdns/master/modules/gsqlite3backend/schema.sqlite3.sql
sqlite3 pdns.sqlite ".read schema.sqlite3.sql"

# 前台启动
pdns_server --daemon=no

# 从另外一个会话操作

# 重启 - 修改配置后可以使用
pdns_control cycle

# 域名管理
pdnsutil create-zone wener.me
# 添加记录 - ns1.wener.tech 实际上就是需要指向当前的服务器
pdnsutil add-record wener.me @ NS ns1.wener.tech
pdnsutil add-record wener.me @ A 127.0.0.1
pdnsutil add-record wener.me app A 127.0.0.1
# 检查
pdnsutil check-all-zones
# 所有的记录
sqlite3 pdns.sqlite "select * from records"

# 将三级域名作为 zone
pdnsutil create-zone svc.wener.me
pdnsutil add-record svc.wener.me @ NS ns1.wener.tech
pdnsutil add-record svc.wener.me @ A 127.0.0.1
# 在上级添加 NS 记录
pdnsutil add-record wener.me svc NS ns1.wener.tech

# NSUPDATE
# --------------------
# 上级启用 TSIG
pdnsutil activate-tsig-key wener.me admin master
# 下级启用 TSIG slave
pdnsutil activate-tsig-key svc.wener.me admin slave
# 单域名配置
pdnsutil generate-tsig-key svc-admin hmac-md5
pdnsutil set-meta svc.wener.me TSIG-ALLOW-DNSUPDATE svc-admin
pdnsutil set-meta svc.wener.me ALLOW-DNSUPDATE-FROM 0.0.0.0/0

# 查看
pdnsutil list-tsig-keys
# 启用的配置信息
sqlite3 pdns.sqlite "select * from domainmetadata"

SECRET=$(sqlite3 pdns.sqlite "select secret from tsigkeys where name='svc-admin'")
# DNS UPDATE
# 默认只支持 hmac-md5
nsupdate <<EOF
server 127.0.0.1 53
zone svc.wener.me
update add web.svc.wener.me 3600 A 1.2.3.4
key svc-admin $SECRET
send
EOF
# 泛域名修改
nsupdate <<EOF
server 127.0.0.1 53
zone svc.wener.me
update add *.svc.wener.me 3600 A 4.3.2.1
key svc-admin $SECRET
send
EOF

# 修改上级域名会失败
nsupdate <<EOF
server 127.0.0.1 53
zone wener.me
update add web.wener.me 3600 A 1.2.3.4
key svc-admin $SECRET
send
EOF

# 查看所有域名信息
dig -t axfr svc.wener.me @127.0.0.1

# DNSSEC
# --------------------
pdnsutil secure-zone wener.me
pdnsutil secure-zone svc.wener.me

# 输出的 DS 添加到上级
pdnsutil show-zone svc.wener.me

# 关闭 - 记得删除上级的 DS
pdnsutil disable-dnssec wener.me
```

## GEO
https://doc.powerdns.com/md/authoritative/backend-geo/

## Setting
https://doc.powerdns.com/authoritative/settings.html

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

https://raw.githubusercontent.com/PowerDNS/pdns/master/docs/http-api/swagger/authoritative-api-swagger.yaml
http://petstore.swagger.io/

```bash
# server id 为 hostname, 大多数时候为 localhost
curl -v -H 'X-API-Key: KEY' http://127.0.0.1:8001/api/v1/servers/localhost | jq .
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
# 信息想干的 DNS 不会发送到 syslog, 提升性能
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

__pdns.conf__

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

## CHANGELOG
### 4.2
* [changelog](https://doc.powerdns.com/authoritative/changelog/4.2.html) / [发布申明](https://blog.powerdns.com/2019/08/30/powerdns-authoritative-server-4-2-0/)
* LUA 记录支持
* LMDB 后端支持

### 4.1
* [changelog](https://doc.powerdns.com/authoritative/changelog/4.1.html)
* api 添加 metadata 接口
* 移除了 as 中的 recursor
  1. 通过 recursor 转发到 as
  2. 通过 dnsdist 负载均衡基于规则进行分发

* [Migrating from using recursion on the Authoritative Server to using a Recursor](https://doc.powerdns.com/authoritative/guides/recursion.html)


### 后端
* 后端模块
  * sql
    * sqlite
    * oracle
    * mysql
    * pgsql
    * odbc
    * opendb
  * bind
  * tinydns
  * remote
  * pipe
  * lua
  * ldap
* 后端方法分类
  * minimal
    * list
      * 用于支持 AXFR
    * lookup
    * get
    * getSOA
  * master
    * getUpdatedMasters
    * setNotifed
  * slave
    * getDomainInfo
    * isMaster
    * getUnfreshSlaveInfos
    * setFresh
    * startTransaction
    * commitTransaction
    * abortTransaction
    * feedRecord
  * supermaster
    * superMasterBackend
    * createSlaveDomain
  * dnssec
  * 其他
* 主要接口
  * `BackendFactory`
    * `DNSBackend` 的工厂类
  * `DNSBackend`
    * 后端接口
  * `XXXLoader`
    * 静态初始化类
    * 用于注册工厂方法
    * `BackendMakers().report(new XXXFactory)`
* 需要实现 `pdns/dnsbackend.hh` 中的 DNSBackend
* AXFR

## recursor
https://doc.powerdns.com/md/recursor/settings/

```bash
# macOS 安装
brew install pdnsrec

# 生成配置文件
pdns_recursor --config > recursor.conf

# 测试本地启动
pdns_recursor --daemon=no --local-port=5003 --socket-dir=$PWD --config-dir=$PWD

# 启动 53 端口需要 root
# LOCALSTATEDIR 控制 socket-dir
sudo LOCALSTATEDIR=$PWD pdns_recursor --config-dir=$PWD

sudo rec_control --config-dir=$PWD --socket-dir=$PWD ping
```

```ini
# ==========
# simple
# ==========
allow-from=0.0.0.0/0
daemon=no
local-address=127.0.0.1
local-port=53
reuseport=yes
forward-zones=.=8.8.8.8

# ==========
# webserver
# ==========
#
webserver=yes
webserver-port=8082
api-key=key
```
## FAQ

### TSIG is provided, but domain is not secured with TSIG. Processing continues
* 通过 nsupdate 修改 - 操作会成功
* zone 允许 tsig - 但未通过 tsig 加密

