---
title: TProxy
---

# TProxy

- 透明代理 - 转发流量到给定端口
- 支持 TCP, UDP
- Linux 2.2+
- Linux 4.18+ nf_tables
- 服务支持: Squid, Envoy, HAProxy, Clash
- [IP_TRANSPARENT](<https://man7.org/linux/man-pages/man7/ip.7.html#:~:text=IP_TRANSPARENT%20(since%20Linux%202.6.24)>)
  - 允许代理程序接受原本不属于本机 IP 的连接，并获取数据包中的原始目标地址信息。
  - 需要 CAP_NET_ADMIN 权限
  - `getsockopt(SO_ORIGINAL_DST)`
- 参考
  - [networking/tproxy.txt](https://www.kernel.org/doc/Documentation/networking/tproxy.txt)
  - https://blog.csdn.net/dog250/article/details/13161945
  - https://toutyrater.github.io/app/tproxy.html
  - https://gost.run/en/tutorials/redirect/#tproxy
  - https://asphaltt.github.io/post/linux-how-tproxy-works/

```bash
#
modinfo xt_TPROXY

# Legacy IPTables
iptables -t mangle -N DIVERT
iptables -t mangle -A PREROUTING -p tcp -m socket -j DIVERT
iptables -t mangle -A DIVERT -j MARK --set-mark 1
iptables -t mangle -A DIVERT -j TPROXY --on-port 1080

ip rule add fwmark 1 lookup 100
ip route add local 0.0.0.0/0 dev lo table 100

# 重定向
iptables -t mangle -A PREROUTING -p tcp --dport 50080 -j TPROXY --tproxy-mark 0x1/0x1 --on-port 80
iptables -t mangle -A PREROUTING -p tcp -m multiport --dport 50080 -j REDIRECR --to-port 1234

iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080

#
iptables -t mangle -A PREROUTING -p tcp --dport 80 -j TPROXY --tproxy-mark 0x1/0x1 --on-port 3128
```

## nftables

```bash
# enable forwarding
cat /proc/sys/net/ipv4/ip_forward

# 创建新的路由表并设置路由规则
echo 100 mytable >> /etc/iproute2/rt_tables

# 添加路由规则，指定通过代理接口转发流量
ip rule add fwmark 1 table mytable
ip route add default via 192.168.1.100 dev eth0 table mytable
```

```nft
# 允许 IP 透明代理（TProxy）流量
table inet filter {
    chain input {
        type filter hook input priority 0; policy accept;

        # 允许到达 TProxy 的流量，通常会是代理端口（如 1080 或其他）
        ip daddr 0.0.0.0/0 tcp dport 1080 tproxy
    }
}

# 透明代理转发流量
table ip nat {
    chain prerouting {
        type nat hook prerouting priority -100; policy accept;

        # 将流量重定向到透明代理端口（如 1080）
        iifname "eth0" ip daddr 0.0.0.0/0 tcp dport {80,443} counter tproxy to :1080
    }
}

# 转发配置
table inet filter {
    chain forward {
        type filter hook forward priority 0; policy accept;

        # 允许透明代理转发
        ip protocol {tcp, udp} accept
    }
}
```
