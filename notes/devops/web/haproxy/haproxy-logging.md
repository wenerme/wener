---
tags:
  - Logging
---

# HAProxy Logging

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

```
log-format '{"host":"%H","ident":"haproxy","pid":%pid,"time":"%Tl","haproxy":{"conn":{"act":%ac,"fe":%fc,"be":%bc,"srv":%sc},"queue":{"backend":%bq,"srv":%sq},"time":{"tq":%Tq,"tw":%Tw,"tc":%Tc,"tr":%Tr,"tt":%Tt},"termination_state":"%tsc","retries":%rc,"network":{"client_ip":"%ci","client_port":%cp,"frontend_ip":"%fi","frontend_port":%fp},"ssl":{"version":"%sslv","ciphers":"%sslc"},"request":{"method":"%HM","hu":"%HU",hp:"%HP",hq:"%HQ","protocol":"%HV","header":{"host":"%[capture.req.hdr(0),json(utf8s)]","xforwardfor":"%[capture.req.hdr(1),json(utf8s)]","referer":"%[capture.req.hdr(2),json(utf8s)]"}},"name":{"backend":"%b","frontend":"%ft","server":"%s"},"response":{"status_code":%ST,"header":{"xrequestid":"%[capture.res.hdr(0),json(utf8s)]"}},"bytes":{"uploaded":%U,"read":%B}}}'
```

```
frontend whatever
    capture request header Host len 40
    capture request header X-Forwarded-For len 50
    capture request header Referer len 200
    capture request header User-Agent len 200

    capture response header X-Request-ID len 50
```

- https://gist.github.com/vr/c9e158e298e6e316544c399b2ff3ef22
