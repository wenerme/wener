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

| 特性     | Auth/权威服务器          | Rec/递归解析器              | dnsdist/分发器                |
| -------- | ------------------------ | --------------------------- | ----------------------------- |
| 主要角色 | 存储和提供 DNS 记录      | 为客户端查找 DNS 记录       | 负载均衡、过滤和路由 DNS 流量 |
| 数据来源 | 自身后端存储（数据库等） | 从其他 DNS 服务器获取并缓存 | 不存储记录，转发请求          |
| 查询处理 | 提供权威答案             | 执行递归查询                | 转发、过滤和缓存查询          |
| 典型场景 | 托管域名                 | 提供 DNS 解析服务           | 保护和扩展 DNS 基础设施       |

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
