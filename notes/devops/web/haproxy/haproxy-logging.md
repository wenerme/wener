---
title: HAProxy Logging
tags:
  - Logging
---

# HAProxy Logging

## 最小 HTTP 日志配置

- stdout HTTP 日志；:8080 返回 200 / ok，用于验证日志链路

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

- `global.log` - 日志目标
- `defaults` / `frontend` 的 `log global` - 继承目标
- HTTP - `mode http` + `option httplog`
- TCP - `mode tcp` + `option tcplog`

:::caution

- 后写的 `log-format` 覆盖前面的 `httplog` / `tcplog`，注意指令顺序

:::

## 日志目标

- 多个 log 目标分别发送日志

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

- 请求字段先存到 txn 变量，供日志阶段使用
- frontend 自定义格式覆盖 defaults 继承格式

:::caution

- JSON 字符串用 `json(utf8s)` 转义
- URL / header 不能直接插入双引号模板

:::

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

**JSON 字段速查**

| 字段 | 取值 |
| --- | --- |
| host / ident / pid / time | `%H` / `haproxy` / `%pid` / `%Tl` |
| conn act / fe / be / srv | `%ac` / `%fc` / `%bc` / `%sc` |
| queue backend / srv | `%bq` / `%sq` |
| time tq / tw / tc / tr / tt | `%Tq` / `%Tw` / `%Tc` / `%Tr` / `%Tt` |
| termination_state / retries | `%tsc` / `%rc` |
| client / frontend address | `%ci:%cp` / `%fi:%fp` |
| ssl version / ciphers | `%sslv` / `%sslc` |
| request method / hu / hp / hq / protocol | `%HM` / `%HU` / `%HP` / `%HQ` / `%HV` |
| name backend / frontend / server | `%b` / `%ft` / `%s` |
| response status_code | `%ST` |
| bytes uploaded / read | `%U` / `%B` |
| request header host / xforwardfor / referer | `capture.req.hdr(0)` / `capture.req.hdr(1)` / `capture.req.hdr(2)`，加 `json(utf8s)` |
| response header xrequestid | `capture.res.hdr(0)`，加 `json(utf8s)` |

```haproxy
# 合并到记录日志的 frontend；不是独立配置
# capture 编号按声明顺序，请求、响应分开计数
frontend whatever
  capture request header Host len 40
  capture request header X-Forwarded-For len 50
  capture request header Referer len 200
  capture request header User-Agent len 200

  capture response header X-Request-ID len 50
```

- User-Agent → `capture.req.hdr(3)`，原 JSON 模板未引用

- [HAProxy 配置手册：JSON converter](https://docs.haproxy.org/3.2/configuration.html#7.3.1-json)
- https://gist.github.com/vr/c9e158e298e6e316544c399b2ff3ef22

## 没有访问日志

1. 确认请求经过配置了日志的 `frontend` / `listen`，而不是只在 `backend` 中设置格式。
2. 检查 `log global` 是否继承了目标，以及 `mode` 与 HTTP/TCP 格式是否对应。
3. stdout 目标先以前台模式 `-db` 运行；syslog 目标检查 socket/端口和收集器，chroot 环境还要检查 socket 的可见性。
4. 日志通常在请求或连接结束时输出，TCP 长连接需要等连接结束；`option logasap` 会提前记录，但计时和字节数也会受影响。
5. 检查是否启用了 `option dontlognull`、`option dontlog-normal`，或被后续 `log-format` 覆盖。
