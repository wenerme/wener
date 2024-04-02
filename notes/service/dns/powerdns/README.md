---
title: PowerDNS
---

# PowerDNS

- [PowerDNS/pdns](https://github.com/PowerDNS/pdns)
  - GPLv2, C
- [Authoritative Server](./as/README.md)
- PowerDNS Recursor
- PowerDNS DNSdist
- PowerDNS Cloud Control
- PowerDNS Dstore
- PowerDNS Lightning Stream
- ZoneControl
- 参考
  - [PowerAdmin](http://www.poweradmin.org/) 网页管理工具


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

# dnsdist

- DNS loadbalancer
- by PowerDNS
