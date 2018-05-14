# IPTable

## Tips
* http://ipset.netfilter.org/ipset.man.html
* https://github.com/coreos/go-iptables
* https://linux.die.net/man/8/iptables
* http://www.netfilter.org/
* https://wiki.archlinux.org/index.php/Iptables_(简体中文)
* [IPTables packet traverse map](http://www.adminsehow.com/2011/09/iptables-packet-traverse-map/)
* [第九章、防火墙与 NAT 服务器](http://cn.linux.vbird.org/linux_server/0250simple_firewall.php)
* [How can I port forward with iptables?](https://serverfault.com/questions/140622)

* table
  * nat
* PREROUTING
  * 修改来源 IP
* POSTROUTING
  * 修改目标 IP
* SNAT
  * Source NAT
* NAT/DNAT
  * Destination NAT


```bash
# 重置 iptables
iptables -P INPUT ACCEPT
iptables -P FORWARD ACCEPT
iptables -P OUTPUT ACCEPT
iptables -t nat -F
iptables -t mangle -F
iptables -F
iptables -X

# 查看状态
iptables -nvL

# 查看 nat 路由表
iptables -t nat -v -L -n --line-number
# 显示 PREROUTING 表
iptables -t nat -v -L PREROUTING -n --line-number
# 显示 POSTROUTING 表
iptables -t nat -v -L POSTROUTING -n --line-number
```


* 五个 Hook 点
  * PREROUTING, INPUT, FORWARD, POSTROUTING, OUTPUT
* 三个内建的表
  * filter, mangle, nat.
* 內建目标
  * ACCEPT, DROP, QUEUE, RETURN

__NAT 表__
```
NIC +----> PREROUTING +-------------------> Local
              +                 ^
              |                 |
              |                 |
              v                 +
NIC <----+ POSTROUTING <----+ OUTPUT <----+ Local
```

__filter 表__

__mangle 表__


## Notes

## FAQ

### How to do the port forwarding from one ip to another ip in same network?
* https://serverfault.com/q/586486/190601


```bash
echo 1 > /proc/sys/net/ipv4/ip_forward

iptables -F
iptables -t nat -F
iptables -X

iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 192.168.12.77:80
iptables -t nat -A POSTROUTING -p tcp -d 192.168.12.77 --dport 80 -j SNAT --to-source 192.168.12.87
```
