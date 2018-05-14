
# IPRoute2

## Tips

* [iproute2](https://en.wikipedia.org/wiki/Iproute2)
* [Linux Advanced Routing & Traffic Control HOWTO](http://lartc.org/howto/)
* [IPROUTE2 Utility Suite Howto](http://www.policyrouting.org/iproute2.doc.html)
* [iproute2+tc notes](http://www-online.kek.jp/~yasu/ATLAS/QoS/iproute2-notes.html)
* [iproute2 cheatsheet](http://baturin.org/docs/iproute2/)
  * https://github.com/dmbaturin/iproute2-cheatsheet
* IPIP (IPv4 in IPv4), SIT (IPv6 in IPv4), IP6IP6 (IPv6 in IPv6), IPIP6 (IPv4 in IPv6), GRE (virtually anything in anything), and, in very recent versions, VTI (IPv4 in IPsec).
* [Linux BRIDGE-STP-HOWTO](https://www.tldp.org/HOWTO/BRIDGE-STP-HOWTO/index.html)
* [6. Set Up The Bridge](https://www.tldp.org/HOWTO/BRIDGE-STP-HOWTO/set-up-the-bridge.html)
* STP(Spanning Tree Protocol)即生成树协议，标准为IEEE802.1D-1998。 
  * STP是一种二层冗余技术，利用STA算法构建一个逻辑上没有环路的树形网络拓扑结构，并且可以通过一定的方法实现路径冗余。
* [Linux STP介绍](http://www.cnblogs.com/hzl6255/p/3259909.html)
* [How can I bridge two interfaces with ip/iproute2?](https://unix.stackexchange.com/q/255484/47774)
* ip, ss, bridge, rtacct, rtmon, tc, ctstat, lnstat, nstat, routef, routel, rtstat, tipc, arpd, devlink, tc
* [iproute2 rules and iptables NAT… what is the difference?](https://serverfault.com/q/135053/190601)

Legacy utility  | Obsoleted by                | Note
----------------|-----------------------------|------
ifconfig	      | ip addr, ip link, ip -s	    | Address and link configuration
route	          | ip route	                  | Routing tables
arp	            | ip neigh	                  | Neighbors
iptunnel	      | ip tunnel	                  | Tunnels
nameif	        | ifrename, ip link set name	| Rename network interfaces
ipmaddr	        | ip maddr	                  | Multicast
netstat	        | ip -s, ss, ip route	        | Show various networking statistics


## Notes

```bash
# 添加桥接
ip li add name br0 type bridge
# 添加 if
ip li set dev eth0 master br0
# 移除 if
ip li set dev eth0 nomaster
# 同时给 br0 添加多个地址可在保证网络访问的同事进行桥接
# 因为桥接, 所以 gw 的信息要手动配置
# 默认网关
ip route add 0.0.0.0/0 via 10.0.2.2


# greptap
# ==============================
# GRE bridging, IPsec and NFQUEUE http://backreference.org/2013/07/23/gre-bridging-ipsec-and-nfqueue/
# Layer 2 over Layer 3
# 
# A
ip link add gretap0 type gretap local 172.31.0.1 remote 172.31.0.2
ip link set dev gretap0 up
ip link set dev eth0 up
brctl addbr br0
brctl addif br0 gretap0
brctl addif br0 eth0
ip addr add 10.10.10.1/24 dev br0
ip link set br0 up
# B
ip link add gretap0 type gretap local 172.31.0.2 remote 172.31.0.1
ip link set dev gretap0 up
ip link set dev eth0 up
brctl addbr br0
brctl addif br0 gretap0
brctl addif br0 eth0
ip addr add 10.10.10.2/24 dev br0
ip link set br0 up
```

## FAQ
### Stateless NAT with iproute2
* [Stateless NAT with iproute2](http://linux-ip.net/html/nat-stateless.html)
