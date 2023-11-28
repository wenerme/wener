---
title: HTTP Proxy
---

# HTTP Proxy

- HTTP CONNECT 方法
  - 只能 HTTP 1.1

```
CONNECT github.com:443 HTTP/1.1
Host: github.com:443
User-Agent: curl/7.64.1
Proxy-Connection: Keep-Alive
```

```
HTTP/1.1 200 Connection Established
Proxy-agent: nginx
X-Proxy-Connected-Addr: 13.229.188.59:443
```

## HAProxy

- Upstream
  - https://github.com/haproxy/haproxy/issues/1542
- 2.2 ~~http-tunnel~~
  - https://news.ycombinator.com/item?id=23817444

## Nginx

- [chobits/ngx_http_proxy_connect_module](https://github.com/chobits/ngx_http_proxy_connect_module)
  - 支持 HTTP CONNECT

```bash
nginx -V | grep http_proxy_connect_module
```

```nginx
server {
    listen  443;

    # dns resolver used by forward proxying
    resolver  114.114.114.114;

    # forward proxy for CONNECT request
    proxy_connect;
    proxy_connect_allow            443;
    proxy_connect_connect_timeout  10s;
    proxy_connect_read_timeout     10s;
    proxy_connect_send_timeout     10s;

    # forward proxy for non-CONNECT request
    location / {
        proxy_pass http://$host;
        proxy_set_header Host $host;
    }
}
```
