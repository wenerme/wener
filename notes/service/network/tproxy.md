---
title: TProxy
---

# TProxy

- 透明代理
- Linux 2.2+
- 服务支持: Squid, Envoy
- 参考
  - [networking/tproxy.txt](https://www.kernel.org/doc/Documentation/networking/tproxy.txt)
  - https://blog.csdn.net/dog250/article/details/13161945
  - https://toutyrater.github.io/app/tproxy.html


```bash
iptables -t mangle -N DIVERT
iptables -t mangle -A PREROUTING -p tcp -m socket -j DIVERT
iptables -t mangle -A DIVERT -j MARK --set-mark 1
iptables -t mangle -A DIVERT -j TPROXY --on-port 1080

ip rule add fwmark 1 lookup 100
ip route add local 0.0.0.0/0 dev lo table 100

#iptables -t mangle -A PREROUTING -p tcp --dport 50080 -j TPROXY --tproxy-mark 0x1/0x1 --on-port 80
```
