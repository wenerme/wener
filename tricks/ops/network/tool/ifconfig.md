# ifconfig

## Tips
```bash
# 判断路由会怎么走
ip route get 192.168.8.135 from 192.168.8.140

sysctl net.ipv4.ip_forward

ip rule add from <source>/<mask> table <name>
ip route add 1.2.3.4/24 via <router> dev eth4 table <name>
# http://wiki.wlug.org.nz/SourceBasedRouting
# http://lartc.org/howto/lartc.rpdb.html

echo 200 isp2 >> /etc/iproute2/rt_tables
ip rule add from <interface_IP> dev <interface> table isp2
ip route add default via <gateway_IP> dev <interface> table isp2

```
* socat 可以指定 interface, nc 不可以
* socat 在各个平台下统一, nc 有兼容问题

## 多网卡配置
* https://www.hi-linux.com/posts/64963.html
* [Network configuration](https://wiki.archlinux.org/index.php/Network_configuration)
  * [简体中文](https://wiki.archlinux.org/index.php/Network_configuration_(简体中文))

```bash
# 当前路由状态
ip route show
# main 表中的路由
ip route list table main

# Linux 支持 256 张路由表
# 当前路由表别名
cat /etc/iproute2/rt_tables

# 简单的让一个 ip 走单个网卡
# 如果有多网卡时可以利用
ip route add default via 192.168.1.120 dev eth1 table 120
ip rule add from 192.168.1.120 table 120
```
