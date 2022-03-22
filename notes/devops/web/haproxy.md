---
title: HAProxy
---

# HAProxy

- [haproxy.com](https://www.haproxy.com/) - The #1 Open Source Software Load Balancer and Application Delivery Controller
- [haproxy/haproxy](https://github.com/haproxy/haproxy)
- 最擅长 **负载均衡**
- 特性
  - L4(TCP) L7(HTTP) 负载均衡
  - URL 重写
  - 限流
  - SSL/TLS termination/offload
  - Gzip
  - 支持 HTTP 代理协议
  - 监控检查
  - 链接和 HTTP 日志
  - HTTP/2
  - 多线程
  - 无缝重载
  - gRPC
  - Lua 和 SPOE 支持
  - L4 重试
  - 简单熔断机制
- 参考
  - HAproxy [Starter Guide](https://cbonte.github.io/haproxy-dconv/2.3/intro.html)
  - [HAProxy at GitHub](https://www.haproxy.com/user-spotlight-series/inside-the-github-load-balancer/)
  - [5 Ways to Extend HAProxy with Lua](https://www.haproxy.com/blog/5-ways-to-extend-haproxy-with-lua/)
  - [Using HAProxy as an API Gateway](https://www.haproxy.com/blog/using-haproxy-as-an-api-gateway-part-3-health-checks/)
  - [haproxytech/client-native](https://github.com/haproxytech/client-native)
    - Go client for HAProxy configuration and runtime API
    - 配置模型 [models](https://github.com/haproxytech/client-native/tree/master/models)

:::caution

- 不能转发任意 UDP - Nginx 可以
  - 2.3+ 支持 syslog UDP
  - 2.5+ 支持 QUIC, HTTP/3
  - 未来可能支持 DNS

:::

```bash
haproxy -c -f haproxy.cfg # 检查配置是否正确
# master-worker mode - reload
# 本质也是 -sf 启新的进程
kill -USR2 $(cat /var/run/haproxy.pid)

# 重启新的 haproxy - reload
haproxy -D -f /etc/haproxy/haproxy.cfg -p /var/run/haproxy.pid -sf $(cat /var/run/haproxy.pid)
```

```bash title="docker"
docker run --rm -it \
  -v /path/to/etc/haproxy:/usr/local/etc/haproxy:ro \
  --sysctl net.ipv4.ip_unprivileged_port_start=0 \
  --name haproxy haproxy:2.5

# reload
docker kill -s HUP haproxy
```

## metrics

- https://www.haproxy.com/blog/haproxy-exposes-a-prometheus-metrics-endpoint/
- https://www.haproxy.com/blog/exploring-the-haproxy-stats-page/

## Runtime API

```haproxy
global
  stats socket ipv4@127.0.0.1:9999 level admin
  stats socket /run/haproxy-runtime-api.sock mode 666 level admin
  stats timeout 2m
```

```bash
echo "help" | socat stdio tcp4-connect:127.0.0.1:9999
echo "show acl" | socat stdio /run/haproxy-runtime-api.sock
socat readline /run/haproxy-runtime-api.sock
help
```

## Proxy Protocol

- [proxy-protocol.txt](https://github.com/haproxy/haproxy/blob/master/doc/proxy-protocol.txt)
  - v1 - 明文 `PROXY TCP4 255.255.255.255 255.255.255.255 65535 65535\r\n\r\n`
  - v2 - 支持二进制，支持更多协议
- 支持的服务: haproxy, nginx, varnish, stud, stunnel
- 希望基于来源 IP 做策略的一般都会支持

```haproxy title="frontend"
frontend http
  mode http
  bind 0.0.0.0:80 name v4
  bind :::80 name v6
  tcp-request connection expect-proxy layer4

frontend https
  mode http
  bind 127.0.0.1:443 name v4 crt /etc/haproxy/certs/frontend ssl alpn h2,http/1.1 accept-proxy
  bind :::443 name v6 crt /etc/haproxy/certs/frontend ssl v4v6 alpn h2,http/1.1 accept-proxy

frontend ssl
  mode tcp
  bind 0.0.0.0:443 name v4
  bind :::443 name v6 v4v6
  tcp-request connection expect-proxy layer4
```

```haproxy title="backend"
backend be
  server svr 192.168.1.2:443 check send-proxy
```

```bash
# CURL 测试 proxy protocol
curl --haproxy-protocol 192.168.1.2
```

**nginx**

```nginx
http {
  server {
    listen 80   proxy_protocol;
    listen 443  ssl proxy_protocol;

    #set_real_ip_from 192.168.1.0/24;
    #real_ip_header proxy_protocol;
  }
}

stream {
  server {
    listen 12345 proxy_protocol;
  }
}
```

- [Accepting the PROXY Protocol](https://docs.nginx.com/nginx/admin-guide/load-balancer/using-proxy-protocol/)

## Connect() failed for backend : no free ports

```bash
cat /proc/sys/net/ipv4/ip_local_port_range

echo "2000 60999" | sudo tee /proc/sys/net/ipv4/ip_local_port_range
```

- 尝试添加 `resolve-prefer ipv4`
