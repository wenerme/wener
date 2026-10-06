---
title: HAProxy Logging
description: HAProxy 的 stdout 与 syslog 日志配置、HTTP/TCP 日志格式、JSON 转义示例，以及没有访问日志时的排查顺序。
tags:
  - Logging
---

# HAProxy Logging

## 最小 HTTP 日志配置

下面配置直接向 stdout 输出 HTTP 访问日志，并在 `8080` 返回测试响应。适合先确认日志链路，再替换成实际 backend。

```haproxy
global
  log stdout format raw local0

defaults
  log global
  mode http
  option httplog
  timeout connect 5s
  timeout client 30s
  timeout server 30s

frontend http-in
  bind :8080
  http-request return status 200 content-type text/plain string ok
```

```bash
haproxy -c -f haproxy.cfg # 检查配置
haproxy -db -f haproxy.cfg # 前台运行，查看 stdout
curl -i http://127.0.0.1:8080/
```

`global` 中的 `log` 指定目标，`defaults` / `frontend` 中的 `log global` 启用继承的目标。HTTP 用 `option httplog`，TCP frontend 用 `mode tcp` 与 `option tcplog`。自定义 `log-format` 会覆盖此前的 `httplog` / `tcplog`，要留意指令顺序。

## 日志目标

下面列出几种目标写法，按运行环境选用；同时配置多个目标会分别发送日志。

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

frontend tcp-in
  bind :9000
  mode tcp
  option tcplog
```

- https://www.haproxy.com/documentation/hapee/latest/onepage/#8
- https://www.haproxy.com/documentation/hapee/latest/observability/logging/overview/
- https://www.haproxy.com/blog/introduction-to-haproxy-logging/

## Log format

- https://www.haproxy.com/documentation/haproxy-configuration-manual/latest/#8.2.2

**TCP log format**


```
mode tcp
option tcplog
```

```
log-format "%ci:%cp [%t] %ft %b/%s %Tw/%Tc/%Tt %B %ts %ac/%fc/%bc/%sc/%rc %sq/%bq"
```

```
Feb  6 12:12:56 localhost haproxy[14387]: 10.0.1.2:33313 [06/Feb/2009:12:12:51.443] fnt bck/srv1 0/0/5007 212 -- 0/0/0/0/3 0/0
```

```
 Field   Format                                Extract from the example above
      1   process_name '[' pid ']:'                            haproxy[14387]:
      2   client_ip ':' client_port                             10.0.1.2:33313
      3   '[' accept_date ']'                       [06/Feb/2009:12:12:51.443]
      4   frontend_name                                                    fnt
      5   backend_name '/' server_name                                bck/srv1
      6   Tw '/' Tc '/' Tt*                                           0/0/5007
      7   bytes_read*                                                      212
      8   termination_state                                                 --
      9   actconn '/' feconn '/' beconn '/' srv_conn '/' retries*    0/0/0/0/3
     10   srv_queue '/' backend_queue                                      0/0
```

**HTTP log format**

```
mode http
option httplog
```

等同于

```
log-format "%ci:%cp [%tr] %ft %b/%s %TR/%Tw/%Tc/%Tr/%Ta %ST %B %CC %CS %tsc %ac/%fc/%bc/%sc/%rc %sq/%bq %hr %hs %{+Q}r"
```

```
Jan 27 21:52:56 localhost hapee-lb[3098]: 192.168.50.1:61818 [27/Jan/2021:21:52:56.086] fe_main be_servers/s1 0/0/1/1/2 200 517 - - ---- 1/1/0/0/0 0/0 {1wt.eu} {} "GET / HTTP/1.1"
```

**CLF log format**

```
mode http
option httplog clf
```

等同于

```
log-format "%{+Q}o %{-Q}ci - - [%trg] %r %ST %B \"\" \"\" %cp %ms %ft %b %s %TR %Tw %Tc %Tr %Ta %tsc %ac %fc  %bc %sc %rc %sq %bq %CC %CS %hrl %hsl"
```

**HTTPS log format**

```
mode http
option httpslog
```

等同于

```
log-format "%ci:%cp [%tr] %ft %b/%s %TR/%Tw/%Tc/%Tr/%Ta %ST %B %CC %CS %tsc %ac/%fc/%bc/%sc/%rc %sq/%bq %hr %hs %{+Q}r %[fc_err]/%[ssl_fc_err,hex]/%[ssl_c_err]/%[ssl_c_ca_err]/%[ssl_fc_is_resumed] %[ssl_fc_sni]/%sslv/%sslc"
```

```
Feb  6 12:14:14 localhost hapee-lb[3098]: 192.168.50.1:61818 [27/Jan/2021:21:52:56.086] fe_main be_servers/s1 0/0/1/1/2 200 517 - - ---- 1/1/0/0/0 0/0 {1wt.eu} {} "GET / HTTP/1.1" 0/0/0/0/0 1wt.eu/TLSv1.3/TLS_AES_256_GCM_SHA384
```

- https://www.haproxy.com/documentation/haproxy-enterprise/administration/logs/

## Custom log format

```
global
  setenv HAPROXY_TCP_LOG_FMT "%ci:%cp [%t] %ft %b/%s %Tw/%Tc/%Tt %B %ts %ac/%fc/%bc/%sc/%rc %sq/%bq"
  setenv HAPROXY_HTTP_LOG_FMT "%ci:%cp [%tr] %ft %b/%s %TR/%Tw/%Tc/%Tr/%Ta %ST %B %CC %CS %tsc %ac/%fc/%bc/%sc/%rc %sq/%bq %hr %hs %{+Q}r"
  setenv HAPROXY_HTTPS_LOG_FMT "%ci:%cp [%tr] %ft %b/%s %TR/%Tw/%Tc/%Tr/%Ta %ST %B %CC %CS %tsc %ac/%fc/%bc/%sc/%rc %sq/%bq %hr %hs %{+Q}r %[fc_err]/%[ssl_fc_err,hex]/%[ssl_c_err]/%[ssl_c_ca_err]/%[ssl_fc_is_resumed] %[ssl_fc_sni]/%sslv/%sslc"

defaults
  http-request set-var(txn.mypath) path
  log-format "$HAPROXY_HTTP_LOG_FMT %[var(txn.mypath)]"
```


## SNI

```
tcp-request inspect-delay 3s
tcp-request content capture req.ssl_sni len 100
log-format "%[capture.req.hdr(0)]"
```

## JSON

字符串字段需要 JSON 转义，不能直接把请求 URL 或 header 填入带双引号的模板。`json(utf8s)` 负责转义；请求字段先保存到 `txn` 变量，便于请求结束时记录。

下面是完整的 HTTP JSON 日志测试配置。自定义格式放在 `frontend`，覆盖从 `defaults` 继承的默认格式。

```haproxy
global
  log stdout format raw local0

defaults
  log global
  mode http
  timeout connect 5s
  timeout client 30s
  timeout server 30s

frontend http-in
  bind :8080
  http-request set-var(txn.log_method) method
  http-request set-var(txn.log_url) url
  http-request set-var(txn.log_host) req.hdr(host)
  http-request set-var(txn.log_ua) req.hdr(user-agent)
  log-format '{"client_ip":"%ci","client_port":%cp,"method":"%[var(txn.log_method),json(utf8s)]","url":"%[var(txn.log_url),json(utf8s)]","host":"%[var(txn.log_host),json(utf8s)]","user_agent":"%[var(txn.log_ua),json(utf8s)]","status":%ST,"bytes":%B}'
  http-request return status 200 content-type text/plain string ok
```

- [HAProxy 配置手册：JSON converter](https://docs.haproxy.org/3.2/configuration.html#7.3.1-json)
- https://gist.github.com/vr/c9e158e298e6e316544c399b2ff3ef22

## 没有访问日志

1. 确认请求经过配置了日志的 `frontend` / `listen`，而不是只在 `backend` 中设置格式。
2. 检查 `log global` 是否继承了目标，以及 `mode` 与 HTTP/TCP 格式是否对应。
3. stdout 目标先以前台模式 `-db` 运行；syslog 目标检查 socket/端口和收集器，chroot 环境还要检查 socket 的可见性。
4. 日志通常在请求或连接结束时输出，TCP 长连接需要等连接结束；`option logasap` 会提前记录，但计时和字节数也会受影响。
5. 检查是否启用了 `option dontlognull`、`option dontlog-normal`，或被后续 `log-format` 覆盖。
