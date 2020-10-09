# Port forward

## Tips
* 所有的负载均衡都能实现
  * Nginx - TCP,UDP
  * HAProxy - TCP
  * Keepalived
* iptables - 内核层实现
* SSH
* socat
* nc
* [samhocevar/rinetd](https://github.com/samhocevar/rinetd)
  * [rinetd.8](https://manpages.debian.org/unstable/rinetd/rinetd.8.en.html)
* 参考
  * [How To Forward Ports through a Linux Gateway with Iptables](https://www.digitalocean.com/community/tutorials/how-to-forward-ports-through-a-linux-gateway-with-iptables)

```bash
socat TCP4-LISTEN:80,fork TCP4:www.yourdomain.org:8080

# 启用端口转发
echo 1 | sudo tee /proc/sys/net/ipv4/ip_forward

# 本地
#   eth0 192.168.1.2
#   testnet 10.10.1.1
# 目标
#   testnet 10.10.2.1
# eth0:80 -> testnet 10.10.2.1

# 允许新的链接 eth0:80 -> testnet
iptables -A FORWARD -i eth0 -o testnet -p tcp --syn --dport 80 -m conntrack --ctstate NEW -j ACCEPT
# 允许链接通信 eth0 -> testnet 和 testnet -> eth0
iptables -A FORWARD -i eth0 -o testnet -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables -A FORWARD -i testnet -o eth0 -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# 默认拒绝
iptables -P FORWARD DROP


# 从外部可以通过，但是本地是不可以的
curl 192.168.1.2
```

## DNAT
* 不同网口转发需要控制好 SNAT 地址

```bash
# 允许转发 - 实际使用时建议进行更精细化控制 - 防火墙
iptables -A FORWARD -j ACCEPT

# DNAT eth0:80 -> 10.10.2.1
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j DNAT --to-destination 10.10.2.1
# SNAT eth0:80 -> 10.10.2.1 from 10.10.1.1
iptables -t nat -A POSTROUTING -o eth0 -p tcp --dport 80 -d 10.10.2.1 -j SNAT --to-source 10.10.1.1
```
