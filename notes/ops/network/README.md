# Network

## Tips
* tunneling
  * [HTTP tunneling](https://wiki.archlinux.org/index.php/HTTP_tunneling)
    * Corkscrew + SSH
  * [chisel](https://github.com/jpillora/chisel)
    * [HN](https://news.ycombinator.com/item?id=13957242)
    * TCP over WS
* [iproute2](https://pkgs.alpinelinux.org/contents?branch=v3.6&name=iproute2&arch=x86_64&repo=main)
* https://iptoasn.com/
* https://www.quaxio.com/bgp/


https://www.owasp.org/index.php/Category:Vulnerability_Scanning_Tools

https://www.kernel.org/doc/Documentation/networking/


* [Protocol Numbers](https://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml)

## 路由
```bash
# -n 不做 dns 查找
# -w secopnds 超时时间, 默认 50s
# -q NUMBER 每跳的包数, 默认 3
# -I 使用 icmp, 可能会需要 root 权限
traceroute -n -w3 -q1 172.172.0.1
traceroute -nI 172.172.0.1
```

## 转发

* http://www.dest-unreach.org/socat/

```bash
# 将改机作为对外访问的路由
# 通过 SNAT 将 172.16.1.0 网段的请求通过改机抓发
# 172.16.1.11 为本机地址
iptables -t nat -I POSTROUTING -s 172.16.1.0/24 -j SNAT --to-source 172.16.1.11
# 允许路由转发
sed -i 's/net.ipv4.ip_forward = 0/net.ipv4.ip_forward = 1/g' /etc/sysctl.conf;sysctl -p
```

## SDN
* [5 Open Source Software Defined Networking Projects to Know](https://www.linux.com/news/open-cloud-report/2016/5-open-source-software-defined-networking-projects-know)
* SDN 也可以通过特殊的硬件来实现


Internet protocol suite
https://en.wikipedia.org/wiki/Internet_protocol_suite

Link layer
Internet layer
Transport layer
Application layer


OSI model
https://en.wikipedia.org/wiki/OSI_model

Layer 1: Physical Layer
Layer 2: Data Link Layer
Layer 3: Network Layer
Layer 4: Transport Layer
Layer 5: Session Layer
Layer 6: Presentation Layer
Layer 7: Application Layer

## FAQ

### Infiniband vs 10 Gig Eth

NDR = Next Data Rate
HDR = High Data Rate
EDR = Enhanced Data Rate
FDR = Fourteen Data Rate
QDR = Quad Data Rate
DDR = Double Data Rate
SDR = Single Data Rate (not shown)

Infiniband vs 10 gig Enet - pros and cons ?
https://www.reddit.com/r/networking/comments/5kuxia/infiniband_vs_10_gig_enet_pros_and_cons/

http://www.ics.uci.edu/~ccgrid11/files/ccgrid11-ib-hse_last.pdf

InfiniBand aimed at all three bottlenecks (protocol
processing, I/O bus, and network speed)

Ethernet aimed at directly handling the network speed
bottleneck and relying on complementary technologies to
alleviate the protocol processing and I/O bus bottlenecks


High-speed Ethernet Consortium (10GE/40GE/100GE)


To design a scalable and high performance communication
and I/O architecture by taking an integrated view of computing,
networking, and storage technologies

To achieve a scalable and high performance
communication architecture while maintaining backward
compatibility with Ethernet
• http://www.ethernetalliance.org
