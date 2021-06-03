---
title: tcpdump
---

# tcpdump

- 参考
  - [tcpdump.1](https://www.tcpdump.org/manpages/tcpdump.1.html)
  - [A tcpdump Tutorial with Examples](https://danielmiessler.com/study/tcpdump/)
  - [dhcpdump](http://www.mavetju.org/unix/dhcpdump-man.php)
- http://linuxwiki.github.io/NetTools/tcpdump.html
- https://github.com/linuxwiki/SourceWiki

```bash
# 监听 ICMP
tcpdump -nni eth0 icmp
# NAT 包
tcpdump -qnn
# 广播包 - DHCP, ARP
tcpdump -n -i mynet broadcast
# DHCP - 匹配 Client MAC
tcpdump -i br0 -vvv -s 1500 '((port 67 or port 68) and (udp[38:4] = 0x3e0ccf08))'
# DHCP - DISCOVER, REQUEST, INFORM
tcpdump -i br0 -vvv -s 1500 '((port 67 or port 68) and (udp[8:1] = 0x1))'

tcpdump port 80 -w capture_file
tcpdump -r capture_file

tcpdump -i any host 1.1.1.1
```

```shell
# 协议
# /etc/protocols
icmp
ip6

# 端口
port 443
portrange 21-23

# 主机
# to or from
host 1.1.1.1
# to or from
net 1.2.3.0/24

# from
src 1.1.1.1
# to
dst 1.0.0.1

# 来源限定
src port 1025
src net 192.168.0.0/16

# 包大小
less 32
greater 64
<= 128
```
