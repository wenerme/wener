# IPTable

http://ipset.netfilter.org/ipset.man.html
https://github.com/coreos/go-iptables

## Tips
* https://linux.die.net/man/8/iptables
* http://www.netfilter.org/
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
