---
title: Authoritative Server
---

# PowerDNS Authoritative Server

- [PowerDNS/pdns](https://github.com/PowerDNS/pdns)
  - GPLv2, C
- 特性
  - 多种后端
  - 多种复制方式
  - 修改不需要重启
  - 定制缓存
  - Supermaster
    - 当为一个节点设置了 Supermaster 后,在主节点上创建 zone,所有子节点会自动创建相应的 zone, 并发起一个 AXFR 请求
    - bind 中需要手动为所有子节点添加 zone
- NOTES
  - 当找到一条匹配的后不会再尝试使用通配符查找
    - 例如 \*.example.org A 192.168.1.1, test.example.org TXT Test, 当查询 ANY test.example.org 只会返回 TXT
- 参考
  - [Backend writers' guide](https://doc.powerdns.com/md/appendix/backend-writers-guide/)
  - https://doc.powerdns.com/
- pdnsutil
  - 域名管理工具
  - 通过修改 DB - 可以远程使用


```bash
brew install pdns # macOS 安装

# SQLite3
# https://doc.powerdns.com/authoritative/backends/generic-sqlite3.html
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

