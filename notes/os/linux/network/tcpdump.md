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


# HTTP GET 显示头信息
tcpdump -vvvs 1024 -A port 80 and 'tcp[((tcp[12:1] & 0xf0) >> 2):4] = 0x47455420'
# POST 请求
tcpdump -vvvs 1024 -A port 80 and 'tcp[((tcp[12:1] & 0xf0) >> 2):4] = 0x504F5354'
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

## 抓进程网络

```bash
strace -f -e trace=network -s 10000 PROCESS
strace -f -e trace=network -s 10000 -p PID
```

- https://github.com/nsntrace/nsntrace


```bash
tcptracer-bpfcc -v -p (PID)
```
