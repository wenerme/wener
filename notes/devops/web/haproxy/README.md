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
  - [roxy-wi/roxy-wi](https://github.com/roxy-wi/roxy-wi)
    - Apache-2.0, Python
    - Roxy-WI is a web interface for managing Haproxy, Nginx, Apache and Keepalived

:::caution

- 不能转发任意 UDP - Nginx 可以
  - 2.3+ 支持 syslog UDP
  - 2.5+ 支持 QUIC, HTTP/3
  - 未来可能支持 DNS

:::

```bash
haproxy -c -f haproxy.cfg # 检查配置是否正确
haproxy -f haproxy.cfg    # 启动
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

## Connect() failed for backend : no free ports

```bash
cat /proc/sys/net/ipv4/ip_local_port_range

echo "2000 60999" | sudo tee /proc/sys/net/ipv4/ip_local_port_range
```

- 尝试添加 `resolve-prefer ipv4`
