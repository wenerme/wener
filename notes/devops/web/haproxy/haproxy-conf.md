---
title: HAProxy 配置
tags:
  - Configuration
---

# HAProxy 配置

```bash
haproxy -c -V -f /etc/haproxy/haproxy.cfg
```

- http-tunnel
  - 处理 HTTP CONNECT
- https://cbonte.github.io/haproxy-dconv
- https://www.haproxy.com/documentation/hapee/latest/onepage

---

- maxconn
  - frontend 接受的最大连接数
  - 4096 fd 默认 maxconn ~ 1700
  - 10000 连接 ~450MB - ~580MB
  - fd ~= maxconn\*2 + 1000
- /proc/sys/fs/file-max

## Timeout

- HTTP or TCP
- One Shot or Stream
- Latency or Bandwidth

```
# HTTP 场景
timeout connect 5s    # 客户端 connect 上的时间
timeout client 50s    # 客户端 idle 时长，一般 5m
timeout server 50s    # 服务端响应时长 - 504

retries                 3
timeout http-request    10s
timeout queue           1m
timeout connect         10s
timeout client          10m
timeout server          10m
timeout http-keep-alive 10s
timeout check           10s
maxconn                 30000

timeout http-request    10s # 整个请求时长
timeout http-keep-alive 2s
timeout queue           5s  # concurrent connections，默认 timeout connect
timeout tunnel          2m  # WebSockets，类似 keep-alive
timeout client-fin      1s  # dropped client side connections 可能会恢复的时间
timeout server-fin      1s
```

- https://www.papertrail.com/solution/tips/haproxy-logging-how-to-tune-timeouts-for-performance/

## env

- `${ENV_NAME-默认值}`
- HAPROXY_LOCALPEER
  - `-L`
- HAPROXY_CFGFILES
- HAPROXY_HTTP_LOG_FMT
- HAPROXY_HTTPS_LOG_FMT
- HAPROXY_TCP_LOG_FMT
- HAPROXY_MWORKER
- HAPROXY_MASTER_CLI
- HAPROXY_STARTUP_VERSION
- 伪变量
  - `.FILE`
  - `.LINE`
  - `.SECTION`

## 控制流 {#control-flow}

- `.if`,`.elif`,`.else`,`.endif`
- 断言
  - `defined(<name>)`
  - `feature(<name>)` - `haproxy -vv`
  - `streq(<str1>,<str2>)`
  - `strneq(<str1>,<str2>)`
  - `version_atleast(<ver>)`
  - `version_before(<ver>)`
- .diag "message"
- .notice
- .warning
- .alert

## acl

- named acl
  - `acl is_static path -i -m beg /static/`
- in-line acl
  - `use_backend be_static if { path -i -m beg /static/ }`
  - if, unless
- 多个条件默认为 and 关系
  - `http-request deny if { path -i -m beg /api/ } { src 10.0.0.0/16 }`
- 支持逻辑: || or && and !
  - `http-request deny if { path -i -m beg /api/ } || !{ src 10.0.0.0/16 }`
- fetch - 指匹配的来源信息
  - 例如: src, path, hdr 等
- converter - 转换
  - 例如: lower, upper, base64, field, bytes, map
- flag - fetch 操作支持通过 flag 修改行为

| flag | for                                                                   |
| ---- | --------------------------------------------------------------------- |
| -i   | 忽略大小写，匹配后续所有                                              |
| -f   | 匹配文件内 patterns                                                   |
| -m   | 指定匹配方式                                                          |
| -n   | 禁止 DNS 解析                                                         |
| -M   | load the file pointed by -f like a map file.                          |
| -u   | force the unique id of the ACL                                        |
| --   | force end of flags. Useful when a string looks like one of the flags. |

- 匹配方法 - -m
  - 部分 fetch 有变种 `path_beg` -> `path -m beg`

| -m    | for                         |
| ----- | --------------------------- |
| str   | 完整匹配                    |
| sub   | 包含                        |
| end   | 开头                        |
| beg   | 结尾                        |
| dir   | `/` 分隔，路径匹配          |
| dom   | `.` 分隔，域名匹配          |
| reg   | 正则匹配 - **注意性能问题** |
| found | 存在                        |
| len   | 长度匹配                    |
| bin   | 二进制数据匹配 - Hex        |

- `hdr_end(host) .wener.me` 不会匹配 `wener.me`
- `hdr_end(host) wener.me` 会匹配 `xyzwener.me`
- `hdr_dom(host) wener.me` 会匹配 `wener.me` 和 `*.wener.me`, 不会匹配 `xyzwener.me`
  - 大多时候期望结果

| method   | alias       |
| -------- | ----------- |
| base_beg | base -m beg |
| hdr_end  | hdr -m end  |
| path_beg | path -m beg |

```haproxy
redirect scheme code 301 https if !{ ssl_fc }

# 动态名字
use_backend be_%[path,map_beg(/etc/haproxy/paths.map, mydefault)]
```

- `%[var()]`

---

- 参考
  - [ebtree](http://wtarreau.blogspot.com/2011/12/elastic-binary-trees-ebtree.html)

## balance

- [balance](https://www.haproxy.com/documentation/hapee/latest/onepage/#4.2-balance)
- hash - 2.6+
- roundrobin
  - 根据 weight 轮训 - weight 可动态调整
  - 最多 4095 server
- static-rr
  - 同 roundrobin 但不支持调整 weight，不限制 server 数量
- leastconn
  - 选择最少连接数的 server
  - 在 server 中使用 rr 就行选择 - 支持动态 weight
  - 适用于长链接 （例如：LDAP, SQL, TSE） 不适用于短链接 （例如： HTTP）
- first
  - 通过 server id 顺序选择第一个 slot - id 默认为 server 顺序
  - 当 server 达到 maxconn 时选择下一个 - 使用该算法要设置了 maxconn 才有意义
  - 该算法可以使后面的 server 按需启动 - 配合基础设施动态控制服务器起停
  - 忽略 weight，更适用于长链接
  - 可使用 `http-check send-state` 告知服务器负载
- source
  - 通过 IP hash 取模选择 server
  - 修改 server 数量会影响选取结果 - server up、down 也会影响
  - 默认静态 weight 无效，可配置 hash-type
- uri
  - URL hash 取模选择 server
  - URL 使用路径 `?` 前面部分，可指定为 `whole` 使用所有
  - 可增加缓存命中，只适用于 HTTP 后端
  - 默认静态 weight 无效，可配置 hash-type
  - 参数
    - len - 截取长度
    - depth - 目录深度
- url_param
  - 使用 HTTP GET 请求上的 URL 参数
  - 未找到参数则使用 rr
  - 默认静态 weight 无效，可配置 hash-type
  - 参数
    - check_post - 针对 POST 也检测
- `hdr(<name>)`
  - 使用 HTTP 头 `<name>` - 大小写不敏感，不存在则使用 rr
  - 默认静态 weight 无效，可配置 hash-type
  - 参数
    - use_domain_only - HASH 域名，也就是 `Host` 头
- `random`, `random(<draws>)`
  - 随机数，一致性 hash - weight 动态
  - 适用于 server 数量多且频繁加减场景 - 比 roundrobin 和 leastconn 影响更小
  - `<draws>` - number of draws before selecting the least loaded of these servers
    - 默认 2
  - 参数
    - hash-balance-factor
      - 可增强公平性
  - [Power of Two Random Choices](http://www.eecs.harvard.edu/~michaelm/postscripts/handbook2001.pdf)
- rdp-cookie, `rdp-cookie(<name>)`
  - name 默认 `mstshash`
  - 需要 `tcp-request content accept` + `req_rdp_cookie_cnt`
  - 默认静态 weight 无效，可配置 hash-type

## HAProxy 透明代理+Traefik

- [haproxy/proxy-protocol](https://www.haproxy.com/blog/haproxy/proxy-protocol)
- [proxy-protocol.txt](https://www.haproxy.org/download/2.2/doc/proxy-protocol.txt)
- [traefik proxy protocol](https://docs.traefik.io/routing/entrypoints/#proxyprotocol)
- 参考
  - [HAProxy tcp mode source client ip](https://stackoverflow.com/a/57503161/1870054)
  - [Haproxy 全透明代理](https://yq.aliyun.com/articles/492367)

```haproxy
global
  log /dev/log    local0
  log /dev/log    local1 notice
  chroot /var/lib/haproxy
  # 常见位置
  # /run/haproxy/admin.sock
  # /var/run/haproxy.sock
  stats socket /var/lib/haproxy/stats mode 660 level admin
  # stats socket ipv4@192.168.0.1:9999 level admin
  stats timeout 30s
  user haproxy
  group haproxy
  daemon

defaults
  log global
  retries 2
  option  dontlognull
  timeout connect 10000
  timeout server 600000
  timeout client 600000

frontend https
  bind 0.0.0.0:443
  default_backend https

backend https
  mode tcp
  balance roundrobin
  option tcp-check
  # traefik 后端也支持 proxy 协议
  server traefik 192.168.128.5:9443 check fall 3 rise 2 send-proxy
```

```bash
iptables -F
iptables -t mangle -N DIVERT
iptables -t mangle -A PREROUTING -p tcp -m socket -j DIVERT
iptables -t mangle -A DIVERT -j MARK --set-mark 222
iptables -t mangle -A DIVERT -j ACCEPT
ip rule add fwmark 222 lookup 100
ip route add local 0.0.0.0/0 dev lo table 100

# 允许ip转发
echo 1 > /proc/sys/net/ipv4/conf/all/forwarding

# 设置松散逆向路径过滤
echo 2 > /proc/sys/net/ipv4/conf/default/rp_filter
echo 2 > /proc/sys/net/ipv4/conf/all/rp_filter
echo 0 > /proc/sys/net/ipv4/conf/enp0s8/rp_filter

# 允许ICMP重定向
echo 1 > /proc/sys/net/ipv4/conf/all/send_redirects
echo 1 > /proc/sys/net/ipv4/conf/enp0s8/send_redirects
```

## 保留状态

- 不会保留统计信息

```
global
  # 状态文件
  server-state-file /var/lib/haproxy/server-state
  stats socket /var/lib/haproxy/stats

defaults
  # 加载统计
  load-server-state-from-file global
```

```bash
# 保留状态
echo "show servers state" | socat /var/lib/haproxy/stats stdio > /var/lib/haproxy/server-state
```

## 交互命令

- [Unix Socket commands](https://cbonte.github.io/haproxy-dconv/2.2/management.html#9.3)

```bash
# 脚本一次执行
# socat 可能需要 sudo
echo "show info;show stat;show table" | socat /var/lib/haproxy/stats stdio
# 交互式
socat /var/lib/haproxy/stats readline
# prompt
```

## SNI Proxy

- http://blog.haproxy.com/2012/04/13/enhanced-ssl-load-balancing-with-server-name-indication-sni-tls-extension/
- [HAProxy selective TLS termination](https://www.liip.ch/en/blog/haproxy-selective-tls-termination)

```haproxy
backend bk_ssl
  mode tcp
  no option checkcache
  no option httpclose
  tcp-request inspect-delay 5s
  tcp-request content accept if { req.ssl_hello_type 1 }
  tcp-request content reject
  use-server server1 if { req.ssl_sni -m beg app1. }
  server server1 server1:8443 check id 1 weight 0
```

```haproxy
backend https
  option tcplog
  bind 0.0.0.0:443
  tcp-request inspect-delay 5s
  tcp-request content accept if { req_ssl_hello_type 1 }

  use_backend s1 if { req.ssl_sni -i site1.example.com or site1alias.example.com }

  use_backend s2 if { ssl_fc_sni_end s2.example.com }
```

-m end
use_backend apache if { ssl_fc_sni_end domain.com }

hdr(host)
hdr_end(host) -i .wener.me
hdr_beg(host) -i .wener.me

## Logging

```haproxy
global
  # syslog UNIX socket
  log /dev/log local0

  # 本地 syslog server
  log 127.0.0.1 local1 notice
  # log 到 hostname 为 rsyslog 的服务器
  log rsyslog:514 local0

  # stdout - 用于容器环境
  log stdout format raw local0
  log stdout format raw daemon debug

defaults
  log global
  mode http
  option httplog

backend s1
  mode tcp
  option tcplog
```

- https://www.haproxy.com/documentation/hapee/latest/onepage/#8
- https://www.haproxy.com/documentation/hapee/latest/observability/logging/overview/
- https://www.haproxy.com/blog/introduction-to-haproxy-logging/

## 参考

- [HAProxy Documentation Converter](https://cbonte.github.io/haproxy-dconv/)
  - [Proxy keywords matrix](https://cbonte.github.io/haproxy-dconv/2.6/configuration.html#4.1)
- https://gist.github.com/krams915/1269101/62614130ae58a1ae107cef251a82716af3edf95b

## 实验

```haproxy
global
  log stdout format raw local0
  log stdout format raw daemon debug

defaults
  log global
  option httplog
  timeout client 300s
  timeout server 300s
  timeout connect 5s

  mode http

frontend f1
  bind 0.0.0.0:8088

  use_backend http:b1 if { hdr_dom(host) -i wener.me }

backend http:b1
  mode http

backend tcp:b1
  mode tcp

listen stats
  bind :8084
  mode http

  http-request use-service prometheus-exporter if { path /metrics }

  stats enable
  stats hide-version
  stats uri /
  stats refresh 5s
  stats realm Haproxy\ Statistics
  # stats auth Username:Password

```

```bash
haproxy -c -f haproxy.cfg # Check
haproxy -f haproxy.cfg    # Run
# stats http://127.0.0.1:8083

# 验证路由
curl -H 'Host: wener.me' 127.0.0.1:8088
```

## redispatch

- session redistribution in case of connection failure

## Health Check

- agent-check

```
option ldap-check
# user USER
option mysql-check
option pgsql-check
option redis-check

option smtpchk
# [HELO|EHLO] [<domain>]
option smtpchk EHLO mydomain.com
```
- 如果设置了密码， PING 也需要密码
- https://www.haproxy.com/documentation/hapee/latest/service-reliability/health-checking/active-checks/
