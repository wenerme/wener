---
title: SNI Reverse Proxy
---

# SNI Reverse Proxy

- [mashirozx/Pixiv-Nginx](https://github.com/mashirozx/Pixiv-Nginx)
- https://south-plus.net/read.php?tid-1032029.html
- [dlundquist/sniproxy](https://github.com/dlundquist/sniproxy)
- [gost](./gost.md)
- clash premium 支持 Sniff TLS SNI

```bash
gost -L sni://:80 -L sni://:443 -F socks5://192.168.1.1:1080
```

## HAProxy SNI Proxy

:::tip

- 可部署在内部环境使用
- 代理范围可控
- 客户端 0 配置

:::

```bash
# haproxy -c -V -f haproxy.conf
global
  log stdout format raw local0

defaults
  log global

  mode tcp
  option tcplog
  option dontlognull

  timeout http-request    10s
  timeout queue           1m
  timeout connect         10s
  timeout client          1m
  timeout server          1m
  timeout http-keep-alive 10s
  timeout check           10s
  timeout tunnel          1h
  maxconn                 10000

frontend http
  mode http
  bind *:80
  use_backend registry.k8s.io.http if { hdr(host) -m end registry.k8s.io }

frontend https
  mode tcp
  bind *:443

  tcp-request inspect-delay 5s
  tcp-request content accept if { req.ssl_hello_type 1 }

  use_backend registry.k8s.io.https if { req_ssl_sni -m end -i registry.k8s.io }
  use_backend pkg.dev.https if { req_ssl_sni -m end -i pkg.dev }

backend registry.k8s.io.https
  mode tcp
  server s1 34.96.108.209:443 check check-via-socks4 socks4 127.0.0.1:7890

backend registry.k8s.io.http
  mode http
  server s1 34.96.108.209:80 check check-via-socks4 socks4 127.0.0.1:7890

backend pkg.dev.https
  mode tcp
  server s1 216.239.32.27:443 check check-via-socks4 socks4 127.0.0.1:7890

listen stats
  bind :8404
  mode http

  #option http-use-htx
  #http-request use-service prometheus-exporter if { path /metrics }

  stats enable
  stats hide-version
  stats uri /
  stats refresh 5s
```

```bash
haproxy -f haproxy.conf
# 如果在内网部署了 adguard 可以直接配置
# registry.k8s.io -> pkg.dev
echo '127.0.0.1 registry.k8s.io' >> /etc/hosts
echo '127.0.0.1 asia-east1-docker.pkg.dev' >> /etc/hosts
echo '127.0.0.1 us-south1-docker.pkg.dev' >> /etc/hosts

# https://explore.ggcr.dev/?repo=registry.k8s.io
curl -sL "https://registry.k8s.io/v2/tags/list" | jq .
docker pull registry.k8s.io/pause:3.8
```
