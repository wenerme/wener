---
id: powerdns-rec
title: PowerDNS Recursor
---

# PowerDNS Recursor
## Tips

```bash
# 安装
brew install pdnsrec

pdns_recursor --config >> files/recursor.conf
```

<!--
socket-dir=/
Dec 04 16:00:22 Answer to google.com|A for 127.0.0.1:50371 validates as Bogus
-->

## 配置
* https://doc.powerdns.com/recursor/settings.html

```ini
# 基础配置
daemon=yes
hint-file=/etc/pdns/root.hints
local-port=53
setgid=recursor
setuid=recursor

# 可以考虑包含其它配置文件
forward-zones-file=/etc/pdns/recursor-forwards.conf
# 加载目录下 *.conf
include-dir=/etc/pdns/recursor.d

# Web 服务配置
# ==========
webserver=yes
webserver-port=5380
webserver-address=0.0.0.0
# 默认 127.0.0.1
webserver-allow-from=127.0.0.0/8, 10.0.0.0/8, 100.64.0.0/10, 169.254.0.0/16, 192.168.0.0/16, 172.16.0.0/12, ::1/128, fc00::/7, fe80::/10
# 默认 none
# normal 记录请求
webserver-loglevel=normal
# web 查看密码
webserver-password=
api-key=changme

# enable ipv6
query-local-address6=::
```

## API

```bash
# https://doc.powerdns.com/recursor/http-api/index.html
# 4.3.0
# /metrics

curl -v -H 'X-API-Key: KEY' http://localhost:5380/api/v1/servers/localhost | jq
curl -v -H 'X-API-Key: KEY' http://localhost:5380/api/v1/servers/localhost/zones | jq
```

