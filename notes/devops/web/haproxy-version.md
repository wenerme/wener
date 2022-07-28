---
title: HAProxy Version
---

# HAProxy Version

| version       | release date |
| ------------- | ------------ |
| [HAProxy 2.6] | 2022-05-31   |
| [HAProxy 2.5] | 2021-11-23   |
| [HAProxy 2.4] | 2021-05-13   |
| [HAProxy 2.3] | 2020-11-05   |

[haproxy 2.6]: #haproxy-26
[haproxy 2.5]: #haproxy-25
[haproxy 2.4]: #haproxy-24
[haproxy 2.3]: #haproxy-23

## HAProxy 2.6

- HTTP/3 over QUIC
- Generic hash load balancing algorithm
  - `balance hash pathq`
- 支持 OpenSSL 3.0
- Master CLI
  - HAProxy worker processes
  - `socat /run/haproxy-master.sock -`
- `http-request set-var`, `tcp-request content set-var` 支持 选项
  - ifexists, ifnotexists, ifempty, ifnotempty, ifset, ifnotset, ifgt, iflt

```bash
# 显示所有配置
haproxy -dKhelp -q -c -f /dev/null
# 某个主题下的配置项
haproxy -dKacl -q -c -f /dev/null
```

```haproxy
frontend mysite
  # enables HTTP/3 over QUIC
  bind quic4@:443 ssl crt /etc/haproxy/certs/foo.com/cert.pem alpn h3
  # 支持 stateless reset packets https://tools.ietf.org/id/draft-ietf-quic-transport-29.html#name-stateless-reset
  #cluster-secret
```

**Reload**

```haproxy
global
  stats socket /var/run/haproxy/api.sock mode 660 level admin expose-fd listeners
```

## HAProxy 2.5

- QUIC, HTTP/3 - 实验支持
- 完整动态服务支持
  - 2.4 动态服务不支持 check, track, slowstart, error-limit, ssl, observe
- 支持在 defaults 配置 tcp-request 和 http-request 规则
- Lua
  - 新增 httpclient - 可发起请求
- [Announcing HAProxy 2.5](https://www.haproxy.com/blog/announcing-haproxy-2-5/)

```bash
# 特性检查
haproxy -cc 'feature(PROMEX)' || echo not supported

# runtime api shell
socat stdio tcp4-connect:127.0.0.1:9999

experimental-mode on
```

```haproxy
global
  nbthread 40

defaults frontend-defaults
  log global
  mode http
  option httplog
  option dontlognull
  timeout client  10m
  # 新增
  http-request redirect scheme https unless { ssl_fc }

frontend mysite from frontend-defaults
  mode http
  # 废弃 process 使用 thread
  # 新增 shards 参数 - 等同于多次 bind
  bind :80 thread 1-20 shards 2 name website
  bind :443 ssl crt /etc/haproxy/ssl/cert.pem
  default_backend webservers
```

## HAProxy 2.4

> 变化非常大

- 协议
  - HTTP2/WebSocket
    - [rfc8441](https://tools.ietf.org/html/rfc8441) HTTP CONNECT
  - FIX - Financial Information eXchange
  - MQTT
    - 包有效性校验
    - 基于客户端标识路由
- 负载均衡
  - 支持 TCP DNS
  - 熔断增强 - http_fail_cnt, http_fail_rate
- SSL/TLS
  - 动态 SSL 证书存储 - 不再需要重启
  - 允许动态 SNI 链接复用 - `sni req.hdr(host)`
- Observability
  - 内置 **OpenTracing**
  - Prometheus 增加指标
  - 统计增加 SSL/TLS 模块相关 - `stats show-modules`
- 缓存
  - 支持 Vary 头 - `process-vary on`
  - 最大缓存条目控制 - `max-secondary-entries 10`
- 配置
  - 支持预处理
    - `.if <condition> ... .elif <condition> ... .else ... .endif`
    - `.diag`, `.notice`, `.warning`, `.alert`
      - -dD 显示诊断信息
    - 条件
      - `defined(<name>)`
      - `feature(<name>)` - `haproxy -vv`
        - OT - OpenTracing
      - `streq(<str1>,<str2>)`, `strneq(<str1>,<str2>)`
      - `version_atleast(<ver>)`, `version_before(<ver>)`
  - 默认路径 - `default-path`
  - 默认命名 - `default http-defaults from tcp-defaults`
  - 动态超时 - `http-request set-timeout`
  - TCP 升级 HTTP - fe tcp, be http - `tcp-request content switch-mode`
  - 匹配删除 HTTP 头 - `http-request del-header X-Forwarded -m beg`
  - 新增实验模式 - 开启实验功能
    - 动态服务
      - 通过 runtime api 新增服务
    - 变量修改
- Lua
  - 多线程 - `lua-load-per-thread`
- 参考
  - [Announcing HAProxy 2.4](https://www.haproxy.com/blog/announcing-haproxy-2-4)

```bash
# runtime api
echo "help add" | socat /var/run/haproxy/api.sock -
echo "show state" | socat /var/run/haproxy/api.sock -

# 服务
echo "experimental-mode on; add server be_app/app4 192.168.1.22:80" | socat /var/run/haproxy/api.sock -
echo "experimental-mode on; del server be_app/app4" | socat /var/run/haproxy/api.sock -
# 变量
echo "experimental-mode on; get var proc.myapp_version" | socat /var/run/haproxy/api.sock -
echo "experimental-mode on; set var proc.myapp_version str(green)" | socat /var/run/haproxy/api.sock -
echo "experimental-mode on; get var proc.myapp_version" | socat /var/run/haproxy/api.sock -
```

## HAProxy 2.3

- 链接增强 - 为支持 QUIC 和 UDP 做准备
  - 完善 Linux keepalive - 支持 sysctl 修改参数
- 协议 - Syslog TCP/UDP
- 负载均衡
  - balance uri path-only - 解决 HTTP1 和 HTTP2 地址不一样问题
- SSL/TLS
  - 允许静态 SNI 链接复用 - `sni str(example.local)`
- Observability
  - stats HTTP 2 信息 - `stats show-modules`
  - 基于 SPOE 集成 OpenTracing
- Lua 5.4
- 参考
  - [Announcing HAProxy 2.3](https://www.haproxy.com/blog/announcing-haproxy-2-3)
