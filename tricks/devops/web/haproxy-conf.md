---
id: haproxy-conf
title: HAProxy 配置
---

# HAProxy 配置

## HAProxy 透明代理+Traefik
* [haproxy/proxy-protocol](https://www.haproxy.com/blog/haproxy/proxy-protocol)
* [proxy-protocol.txt](https://www.haproxy.org/download/2.2/doc/proxy-protocol.txt)
* [traefik proxy protocol](https://docs.traefik.io/routing/entrypoints/#proxyprotocol)
* 参考
  * [HAProxy tcp mode source client ip](https://stackoverflow.com/a/57503161/1870054)
  * [Haproxy全透明代理](https://yq.aliyun.com/articles/492367)

```haproxy
global
    log /dev/log    local0
    log /dev/log    local1 notice
    chroot /var/lib/haproxy
    stats socket /run/haproxy/admin.sock mode 660 level admin
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
