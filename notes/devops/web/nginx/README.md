---
title: Nginx
---

# Nginx

- `/usr/share/nginx/html` 静态文件目录
- `/etc/nginx/nginx.conf` 配置目录
- `/etc/nginx/conf.d/*.conf` 其他的配置目录
- `/var/log/nginx/access.log` 日志
- [核心变量](http://nginx.org/en/docs/http/ngx_http_core_module.html#variables)
- 可在日志中使用 `$request_time $upstream_response_time` 来记录访问使用时间
- [ngx_http_auth_request_module](http://nginx.org/en/docs/http/ngx_http_auth_request_module.html)
  - 可将授权交由其他请求处理
  - [教程](https://developers.shopware.com/blog/2015/03/02/sso-with-nginx-authrequest-module/)
- Reference
  - [agentzh's Nginx Tutorials ](http://openresty.org/download/agentzh-nginx-tutorials-en.html)
  - [Full Example Configuration](https://www.nginx.com/resources/wiki/start/topics/examples/full/)
  - [第三方模块列表](https://www.nginx.com/resources/wiki/modules/)
  - [Ngx PageSpeed](http://ngxpagespeed.com/)
  - [Doc](http://nginx.org/en/docs/)
  - [NGINX Reverse Proxy](https://www.nginx.com/resources/admin-guide/reverse-proxy/)
  - [NAXSI](https://github.com/nbs-system/naxsi)
    - is an open-source, high performance, low rules maintenance WAF for NGINX
    - NAXSI means Nginx Anti XSS & SQL Injection.
- [denji/homebrew-nginx](https://github.com/denji/homebrew-nginx)
- [Virtual Hosts on nginx](https://gist.github.com/soheilhy/8b94347ff8336d971ad0)
- WebUI
  - [NginxProxyManager/nginx-proxy-manager](https://github.com/NginxProxyManager/nginx-proxy-manager)
    - MIT, JS
  - [0xJacky/nginx-ui](https://github.com/0xJacky/nginx-ui)
    - AGPLv3, Go, Vue
    - Demo https://demo.nginxui.com admin/admin

```bash
# brew 安装
brew install nginx
# 查看已安装模块
nginx -V 2>&1 | tr -- - '\n' | grep 'module[^a-z=]'

# 基于当前目录启动
nginx -p $PWD -c nginx.conf -g 'daemon off;'

nginx -s reload
```

| nginx         | for                        |
| ------------- | -------------------------- |
| -t            | test                       |
| -T            | test & dump                |
| -q            | suppress non-error message |
| -s signal     | stop, quit, reopen, reload |
| -p prefix     |
| -e filename   | error log file             |
| -c filename   | conf                       |
| -g directives |

- -e
  - /usr/local/var/log/nginx/error.log
- -c
  - /usr/local/etc/nginx/nginx.conf

### 常用配置

### Websocket 反向代理

```nginx
location /chat/ {
    proxy_pass http://backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

也可以直接使用客户端的参数

```nginx
http {
    map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
    }

    server {
        # ...

        location /chat/ {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
        }
    }
}
```

简单暴力的映射

**sites.conf**

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name $http_host;
    root /sites/$http_host;
    access_log logs/$http_host;
    gzip on;
}
```

```bash
docker run --rm -it -v $PWD:/sites -v $PWD/sites.conf:/etc/nginx/conf.d/default.conf -p 8080:80 --name web wener/nginx
```

```nginx
# 默认日志格式
log_format combined '$remote_addr - $remote_user [$time_local] '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent"';

# 添加了压缩信息的日志
log_format compression '$remote_addr - $remote_user [$time_local] '
                       '"$request" $status $bytes_sent '
                       '"$http_referer" "$http_user_agent" "$gzip_ratio"';

# 添加了响应时间的日志
log_format timed  '$remote_addr - $remote_user [$time_local] '
                  '"$request" $status $body_bytes_sent '
                  '"$http_referer" "$http_user_agent"'
                  '"$http_x_forwarded_for" $request_time $upstream_response_time';

```

https://www.nginx.com/resources/admin-guide/logging-and-monitoring/

$upstream_connect_time – The time spent on establishing a connection with an upstream server
$upstream_header_time – The time between establishing a connection and receiving the first byte of the response header from the upstream server
$upstream_response_time – The time between establishing a connection and receiving the last byte of the response body from the upstream server
$request_time – The total time spent processing a request

## 常用配置

### proxy.nginx

```nginx
proxy_redirect          off;
proxy_set_header        Host                $host;
proxy_set_header        X-Real-IP           $remote_addr;
proxy_set_header        X-Forwarded-For     $proxy_add_x_forwarded_for;
proxy_set_header        X-Forwarded-Proto   $scheme;
# client_max_body_size    200m;
# client_body_buffer_size 128k;
proxy_connect_timeout   90;
proxy_send_timeout      90;
proxy_read_timeout      90;
proxy_buffers           32 4k;
```

```nginx
location / {
    proxy_pass http://mysvr;
    include conf/proxy.nginx;
}
```

### proxy_ws.nginx

- 反向代理 websocket

```nginx
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection $connection_upgrade;

proxy_set_header        Host                $host;
proxy_set_header        X-Real-IP           $remote_addr;
proxy_set_header        X-Forwarded-For     $proxy_add_x_forwarded_for;
proxy_set_header        X-Forwarded-Proto   $scheme;

proxy_buffering off;
proxy_redirect  off;
chunked_transfer_encoding off;

# 因为是 ws, 所以将超时时间设置的长一点
proxy_read_timeout 600s;
```

```nginx
location /socket.io/ {
    proxy_pass http://mysvr/socket.io/;
    include conf/proxy_ws.nginx;
}
```

### conf/proxy_ssl.nginx

- 反向代理 SSL
- [Securing HTTP Traffic to Upstream Servers](https://docs.nginx.com/nginx/admin-guide/security-controls/securing-http-traffic-upstream/)
- 还是需要证书信息, 因为 SNI

```nginx
ssl_session_cache    shared:SSL:1m;
ssl_session_timeout  10m;
ssl_certificate /etc/nginx/ssl/example.com.crt;
ssl_certificate_key /etc/nginx/ssl/example.com.key;
ssl_verify_client off;
ssl_protocols        SSLv3 TLSv1 TLSv1.1 TLSv1.2;
ssl_ciphers RC4:HIGH:!aNULL:!MD5;
ssl_prefer_server_ciphers on;
```

### proxy_elb.nginx

- https://www.nginx.com/resources/wiki/start/topics/examples/forwarded/
- http://scottwb.com/blog/2013/10/28/always-on-https-with-nginx-behind-an-elb/

## pagespeed

https://github.com/apache/incubator-pagespeed-ngx

https://github.com/sitespeedio/sitespeed.io

Build ngx_pagespeed From Source
https://www.modpagespeed.com/doc/build_ngx_pagespeed_from_source

https://en.wikipedia.org/wiki/Google_PageSpeed_Tools

## 主要内容

### 管理

### 代理和缓存

### 重写和访问控制

### 管理出入流

### 性能调优

## listen

http://nginx.org/en/docs/http/ngx_http_core_module.html#listen

```
listen address[:port] [default_server] [ssl] [http2 | spdy] [proxy_protocol] [setfib=number] [fastopen=number] [backlog=number] [rcvbuf=size] [sndbuf=size] [accept_filter=filter] [deferred] [bind] [ipv6only=on|off] [reuseport] [so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt]];
listen port [default_server] [ssl] [http2 | spdy] [proxy_protocol] [setfib=number] [fastopen=number] [backlog=number] [rcvbuf=size] [sndbuf=size] [accept_filter=filter] [deferred] [bind] [ipv6only=on|off] [reuseport] [so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt]];
listen unix:path [default_server] [ssl] [http2 | spdy] [proxy_protocol] [backlog=number] [rcvbuf=size] [sndbuf=size] [accept_filter=filter] [deferred] [bind] [so_keepalive=on|off|[keepidle]:[keepintvl]:[keepcnt]];
```

## stream

- [ngx_stream_core_module](http://nginx.org/en/docs/stream/ngx_stream_core_module.html)
  - 自 1.9.0
- [ngx_stream_proxy_module](http://nginx.org/en/docs/stream/ngx_stream_proxy_module.html)

  - allows proxying data streams over TCP, UDP and UNIX-domain sockets.

- 参考
  - [TCP/UDP Load Balancing with NGINX: Overview, Tips, and Tricks](https://www.nginx.com/blog/tcp-load-balancing-udp-load-balancing-nginx-tips-tricks/)
  - [Announcing UDP Load Balancing in NGINX](https://www.nginx.com/blog/announcing-udp-load-balancing/)
    - March 15, 2016

```nginx
# Load balance UDP-based DNS traffic across two servers
stream {
    upstream dns_upstreams {
        server 192.168.136.130:53;
        server 192.168.136.131:53;
    }

    server {
        listen 53 udp;
        proxy_pass dns_upstreams;
        proxy_timeout 1s;
        proxy_responses 1;
        error_log logs/dns.log;
    }
}
```

```
ngx_stream_core_module
ngx_stream_access_module
ngx_stream_geo_module
ngx_stream_geoip_module
ngx_stream_js_module
ngx_stream_limit_conn_module
ngx_stream_log_module
ngx_stream_map_module
ngx_stream_proxy_module
ngx_stream_realip_module
ngx_stream_return_module
ngx_stream_split_clients_module
ngx_stream_ssl_module
ngx_stream_ssl_preread_module
ngx_stream_upstream_module
ngx_stream_upstream_hc_module
```

Choosing an NGINX Plus Load‑Balancing Technique
https://www.nginx.com/blog/choosing-nginx-plus-load-balancing-techniques/

proxy_responses
控制 Nginx 应该等待上游返回多少信息

对于单 udp 会话, 不做特殊处理时, nginx 能够从上游接收到多个包, 但只会从下游接收到一个包.
因为下一次从下游接收到的包会认为是另外一个会话. 导致 udp 适用于下载但不适用于上传.

10 Tips for 10x Application Performance
https://www.nginx.com/blog/10-tips-for-10x-application-performance/

IP Transparency and Direct Server Return with NGINX and NGINX Plus as Transparent Proxy
https://www.nginx.com/blog/ip-transparency-direct-server-return-nginx-plus-transparent-proxy/

https://www.kernel.org/doc/Documentation/networking/tproxy.txt
https://github.com/benoitc/tproxy

tproxy 要求 upstream 修改默认路由, 保证所有请求都能被路由回去. 因此在 VPN 的情况下会有点尴尬

PROXY 10.0.1.1, 172.16.0.1

SERVER 10.0.2.1, 192.168.1.2

代理服务器通过 10.0.0.0/16 和后端服务器通讯, SERVER LAN 地址为 192.168.1.0/24, 要求 SERVER 能正确把包导回需修改默认路由为 10.0.1.1, 因此只能有一个前端的反向代理, 还是非常的不方便使用

如果有多个网卡, 还需要开启转发.

```bash
# server
route del default gw 172.16.0.1
route add default gw 10.0.1.1
route -n

# 或者使用 ip 命令
ip ro del default via 172.16.0.1 dev eth0

# proxy
ip rule add fwmark 1 lookup 100
ip route add local 0.0.0.0/0 dev lo table 100
# 针对 80 端口
iptables -t mangle -A PREROUTING -p tcp -s 10.0.0.0/16 --sport 80 -j MARK --set-xmark 0x1/0xffffffff

iptables -t mangle -L
```
