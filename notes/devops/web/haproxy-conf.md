---
id: haproxy-conf
title: HAProxy 配置
---

# HAProxy 配置

## balance

- [balance](https://www.haproxy.com/documentation/hapee/latest/onepage/#4.2-balance)
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
- https://www.haproxy.com/documentation/hapee/latest/onepage/#8
- https://www.haproxy.com/documentation/hapee/latest/observability/logging/overview/

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
