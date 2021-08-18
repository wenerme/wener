---
title: Squid Conf
---

# Squid Conf

- 参考
  - http://www.squid-cache.org/Doc/config/
  - https://gist.github.com/kipyegonmark/ef54ea4fb7a11f4d0470
  - https://docs.netgate.com/pfsense/en/latest/cache-proxy/squid-package-tuning.html
  - https://filterlists.com/

:::caution

- ssl_bump 不能指定 cache_peer
  - 可以配置全部转发

:::

## 基础配置

```ini
# 监听端口
http_port 7777

# 定义本地网络
acl localnet src 127.0.0.0/24
acl localnet src 192.168.0.0/16
acl localnet src 10.0.0.0/8
http_access allow localnet

# 缓存目录 - 500MB - 第一级 16 - 第二级 256
cache_dir ufs .caache 500 16 256
```

## 上级转发配置

```ini
# 上级缓存
cache_peer 127.0.0.1 parent 7777 7 no-query

# FTP 不转发 - 直接访问
acl ftp proto FTP
always_direct allow ftp

# 全部走 cache_peer
never_direct allow all
```

## 推荐配置

```ini
# 最小缓存对象
maximum_object_size 1 MB
# 不发送版本信息
httpd_suppress_version_string on

# 定义本地网络
acl localnet src 10.0.0.0/8
acl localnet src 172.16.0.0/12
acl localnet src 192.168.0.0/16
acl localnet src fc00::/7
acl localnet src fe80::/10

# acl localnet src all

# 定义安全端口
acl SSL_ports port 443
acl Safe_ports port 80		# http
acl Safe_ports port 21		# ftp
acl Safe_ports port 443		# https
acl Safe_ports port 70		# gopher
acl Safe_ports port 210		# waiss
acl Safe_ports port 1025-65535	# unregistered ports
acl Safe_ports port 280		# http-mgmt
acl Safe_ports port 488		# gss-http
acl Safe_ports port 591		# filemaker
acl Safe_ports port 777		# multiling http

# 识别 CONNECT 方法
acl CONNECT method CONNECT
# 识别查询参数
acl QUERY urlpath_regex cgi-bin \? asp aspx jsp
# 带参数不缓存
cache deny QUERY

# 只允许安全端口
http_access deny !Safe_ports

# 只允许 CONNECT SSL 端口
http_access deny CONNECT !SSL_ports

# 只允许本地访问 cachemgr
http_access allow localhost manager
http_access deny manager

# 不允许访问本地
http_access deny to_localhost

# 允许本地访问
http_access allow localnet
http_access allow localhost
http_access deny all
```

## 网络配置

```
http_port port [mode] [options]
http_port hostname:port [mode] [options]
http_port 1.2.3.4:port [mode] [options]
```

- mode - 默认为转发模式
  - intercept - IP-Layer NAT interception
  - tproxy - Linux TPROXY
  - accel - Accelerator / reverse proxy
  - ssl-bump
    - generate-host-certificates - on/off
    - dynamic_cert_mem_cache_size=SIZE - 默认 4MB
- options
  - TLS/SSL
    - cipher=
    - options=

## SSL

```
ssl_bump <action> [!]acl ...
```

- action
  - splice - 默认 - 转为 TCP 通道，不解密代理流量
  - bump
    - SslBump1 和客户端建立安全链接，然后连接到服务端
    - SslBump2 - 服务端建立连接
    - SslBump3 - 模仿 服务端 证书
  - peek
    - SslBump1 接收到客户端证书
    - SslBump2 接收到服务端证书
    - 根据获取的证书信息判断是否 bump 进入 step 3
  - stare
    - 类似 peed，控制 splice
  - terminate
    - 终止连接

```
# 不做特殊处理 - 可用于记录 SNI 信息
ssl_bump peek all
ssl_bump splice all

# 处理所有
acl step1 at_step SslBump1
ssl_bump peek step1
ssl_bump bump all
ssl_bump splice all
```

## 缓存节点选择

- [Features/CacheHierarchy](https://wiki.squid-cache.org/Features/CacheHierarchy)
- dead_peer_timeout 10 seconds
  - peer 10 秒超时认为失败
- forward_max_tries 25
  -  转发重试次数

**缓存节点**

```
cache_peer hostname type proxy-port icp-port options
```

- type parent,sibling,multicast
- proxy-port - 代理端口
- icp-port - ICP, HTCP 端口 - 用于查询相邻服务
  - squid 端口 3130
  - 0 表示不支持
- options
  - 节点选择方式
    - default - 默认最后选择 last-resort
    - round-robin - 轮训 parent
    - weighted-round-robin - 支持 weight 的轮训
  - 通用选项
    - name=xxx - 当单主机多 port 时需要，默认为主机名字，会被其他配置引用
    - standby=N - 热备连接数
    - max-conn=N - 最大连接数
    - connect-timeout=N - 超时
    - connect-fail-limit=N - 标记节点 Down 的失败次数
    - allow-miss
    - no-tproxy - 不使用 TPROXY
    - proxy-only - 不存储
  - ICP
    - no-query - disable icp
  - HTCP
    - htcp - enable HTCP

**节点 ACL**

```
cache_peer_access peer-name allow|deny [!]aclname
```

- peer-name
  - cache_peer 的 hostname

**域名匹配缓存节点类型**

```
neighbor_type_domain neighbor parent|sibling domain domain ...
```

- neighbor - cache_peer 名字

```ini
cache_peer 127.0.0.1 sibling 7777 icp-port options

acl extdomain dstdomain .google.com
cache_peer_access 127.0.0.1 allow extdomain
# 匹配的域名使用 sibling cache_peer
neighbor_type_domain 127.0.0.1 sibling .google.com

never_direct allow all
```

## 磁盘缓存配置

```
# 最小缓存对象
minimum_object_size 0
# 最大缓存对象
maximum_object_size 4 MB
```

### cache_dir

缓存存储目录

```
cache_dir type directory-name fs-specific-data [options]
```

- type
  - ufs - mbytes L1 L2 - 默认内置
    - mbytes 最大使用空间，可以使用百分比，默认 100 MB
    - L1 - 第一层目录数量 - 默认 6
    - L2 - 第二层目录数量 - 默认 256
  - aufs - mbytes L1 L2
    - 同 ufs，但使用 POSIX 线程避免阻塞主 squid 进程
  - diskd - `mbytes l1 l2 [options] [q1=n] [q2=n]`
    - 结构同 ufs，使用独立进程
    - Q1=64 - 当达到 Q1 个未 ACK 请求时，squid 停止打开新文件
    - Q2=72 - 当达到 Q2 个未 ACK 请求时，squid 开始阻塞
  - rock - mbytes
    - 存储为类似数据库文件
    - 会启独立进程 disker - 避免阻塞
- options
  - no-store - 不存储新对象
  - min-size=n
  - max-size=n
- 多个 cache_dir 应该按照 max-size 进行排序

### store_dir_select_algorithm

存储目录选择算法

```
store_dir_select_algorithm algorithm
```

- algorithm
  - least-load - 默认
  - round-robin - 轮训

### cache_replacement_policy

缓存替换策略

```
cache_replacement_policy policy
```

- policy
  - lru 默认
  - heap GDSF : Greedy-Dual Size Frequency
  - heap LFUDA: Least Frequently Used with Dynamic Aging
  - heap LRU : LRU policy implemented using a heap

## 内存缓存

- cache_mem 256 MB
- maximum_object_size_in_memory 512 KB
- memory_cache_shared on
- memory_cache_mode always
  - always - 最近请求的对象都会到内存缓存
  - disk - 只有 disk cache 才会到内存缓存
  - network - 网络请求的对象会到内存缓存
- memory_replacement_policy lru

## 缓存调优

```
max_stale 1 week
minimum_expiry_time 60 seconds
```

### refresh_pattern

- 控制缓存洛基
- `refresh_pattern [-i] regex min percent max [options]`
  - -i - 正则大小写不敏感
  - regex - 匹配 URL 的正则
  - min - 默认最小失效时间 - 分钟
  - percent - 失效时间比例 - 例如虽然指定 1h 但达到 50% 的时候就失效
  - max - 最大失效时间 - 分钟
  - options
    - override-expire - 重写 Expires 头，确保最小缓存时间
    - override-lastmod - 覆盖上次修改时间，确保最小缓存时间
    - reload-into-ims - reload 请求判断 If-Modified-Since /If-None-Match
    - ignore-reload - 忽略 no-cache/reload 请求 头
    - ignore-no-store -  忽略 Cache-control: no-store
    - ignore-private - 忽略 Cache-control: private
    - max-stale=NN - 最大过期时间 - 默认为全局 max_stale
    - refresh-ims - 客户端请求 If-Modified-Since 时，请求到源服务器
    - store-stale - 保存过期数据
- [refresh_pattern](http://www.squid-cache.org/Doc/config/refresh_pattern/)

逻辑

```
FRESH if expire > now, else STALE
STALE if age > max
FRESH if lm-factor < percent, else STALE
FRESH if age < min
else STALE
```

```
# 强制缓存
refresh_pattern . 2 20% 360 override-expire override-lastmod
```

```
# windows 更新
refresh_pattern -i windowsupdate.com/.*\.(cab|exe|ms[i|u|f|p]|[ap]sf|wm[v|a]|dat|zip|psf) 43200 80% 129600 reload-into-ims
refresh_pattern -i microsoft.com/.*\.(cab|exe|ms[i|u|f|p]|[ap]sf|wm[v|a]|dat|zip|psf) 43200 80% 129600 reload-into-ims
refresh_pattern -i windows.com/.*\.(cab|exe|ms[i|u|f|p]|[ap]sf|wm[v|a]|dat|zip|psf) 43200 80% 129600 reload-into-ims
refresh_pattern -i microsoft.com.akadns.net/.*\.(cab|exe|ms[i|u|f|p]|[ap]sf|wm[v|a]|dat|zip|psf) 43200 80% 129600 reload-into-ims
refresh_pattern -i deploy.akamaitechnologies.com/.*\.(cab|exe|ms[i|u|f|p]|[ap]sf|wm[v|a]|dat|zip|psf) 43200 80% 129600 reload-into-ims
range_offset_limit none

# mac 更新
refresh_pattern ([^.]+.|)(download|adcdownload).(apple.|)com/.*\.(pkg|dmg) 4320 100% 43200 reload-into-ims

# avg 更新
refresh_pattern ([^.]+.|)avg.com/.*\.(bin) 4320 100% 43200 reload-into-ims
refresh_pattern ([^.]+.|)spywareblaster.net/.*\.(dtb) 4320 100% 64800 reload-into-ims
refresh_pattern ([^.]+.|)symantecliveupdate.com/.*\.(zip|exe) 43200 100% 43200 reload-into-ims
refresh_pattern ([^.]+.|)avast.com/.*\.(vpu|vpaa) 4320 100% 43200 reload-into-ims

## common
refresh_pattern ^ftp:		1440	20%	10080
refresh_pattern ^gopher:	1440	0%	1440
refresh_pattern -i \.(gif|png|jpg|jpeg|ico)$ 10080 90% 43200 override-expire ignore-no-cache ignore-no-store ignore-private
refresh_pattern -i \.(iso|avi|wav|mp3|mp4|mpeg|swf|flv|x-flv)$ 43200 90% 432000 override-expire ignore-no-cache ignore-no-store ignore-private
refresh_pattern -i \.(deb|rpm|exe|zip|tar|tgz|ram|rar|bin|ppt|doc|tiff)$ 10080 90% 43200 override-expire ignore-no-cache ignore-no-store ignore-private

refresh_pattern -i (/cgi-bin/|\?) 0	0%	0
refresh_pattern .		0	40%	40320

refresh_pattern -i youtube.com/.* 10080 90% 43200
refresh_pattern (/cgi-bin/|\?) 0 0% 0
```

## 日志配置

```
xxx_log <module>:<place> [option ...] [acl acl ...]
xxx_log none [acl acl ...]
```

- option
  - logformat=squid
  - buffer-size=64KB
  - on-error=die|drop
  - rotate=N
    - squid -k rotate
    - 默认遵循 logfile_rotate
    - 0 禁用
- module
  - none
  - stdio
  - daemon
  - syslog
  - udp
  - tcp

```
# 访问日志
access_log      daemon:/usr/local/squid/var/logs/access.log squid
# 存储日志
cache_store_log none

# 管理日志
# 通过 debug_options 控制
cache_log       /usr/local/squid/var/logs/cache.log
# module,level
# level 1-9
# module 支持 ALL 表示所有模块
# debug_options

# CoreDump 目录
coredump_dir /var/cache/squid
```

## 其他配置

```
# 添加 X-Forwarded-For 头
# off -> unknown
# transparent 不动
# delete 删除头
# truncate 移除现有，添加 客户端 IP
forwarded_for on
# 手机客户端统计信息
client_db on

# 离线模式 - 不验证已缓存的数据
offline_mode off
```

## FAQ

### 转发所有请求到 HTTP Proxy

```
cache_peer <Parent_proxy_IP> parent <port> 0 no-query default
acl all src 0.0.0.0/0.0.0.0
http_access allow all
never_direct allow all
```

### 根据地址路由 cache_peer

```

acl up_urls dstdom_regex "/etc/squid/urls"

# SSL bump rules
sslproxy_cert_error allow all
acl DiscoverSNIHost at_step SslBump1
ssl_bump peek DiscoverSNIHost
acl NoSSLIntercept ssl::server_name_regex -i "/etc/squid/urls.nobump"
acl NoSSLIntercept ssl::server_name_regex -i "/etc/squid/urls"
ssl_bump splice NoSSLIntercept
ssl_bump bump all

never_direct allow up_urls
cache_peer 127.0.0.1 parent 8118 0 no-query no-digest default

cache_peer_access 127.0.0.1 allow up_urls
cache_peer_access 127.0.0.1 deny all
```

## TBD

```
cache_replacement_policy heap LFUDA
range_offset_limit -1
quick_abort_min -1 KB
refresh_pattern . 525600 100% 525600 ignore-reload ignore-no-store ignore-private ignore-auth ignore-must-revalidate store-stale
```
