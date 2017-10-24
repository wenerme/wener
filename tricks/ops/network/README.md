# Network

## Tips
* tunneling
  * [HTTP tunneling](https://wiki.archlinux.org/index.php/HTTP_tunneling)
    * Corkscrew + SSH
  * [chisel](https://github.com/jpillora/chisel)
    * [HN](https://news.ycombinator.com/item?id=13957242)
    * TCP over WS
* [iproute2](https://pkgs.alpinelinux.org/contents?branch=v3.6&name=iproute2&arch=x86_64&repo=main)

https://www.owasp.org/index.php/Category:Vulnerability_Scanning_Tools
https://hackertarget.com/nmap-cheatsheet-a-quick-reference-guide/

* 获取 IP
  * http://checkip.amazonaws.com/




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

## Wifi

### Tips

```bash

# 速度检测
# 服务端
nc -v -v -l -n -p 8000 | pv > /dev/null
# 客户端
time yes | pv |nc -v -v -n 192.168.1.1 8000 >/dev/null

# UDP
# Listen
netcat -ul 2115
# 端口检测
netcat -zv -u 127.0.0.1  2115
ls /usr/local/opt/nmap/bin
# ncat  ndiff  nmap  nping  uninstall_ndiff

# https://nmap.org/ncat/guide/ncat-usage.html
man ncat

# 端口转发
ncat -l localhost 8080 --sh-exec "ncat wener.me 80"
```

### 无线
* [WPA_supplicant](https://wiki.archlinux.org/index.php/WPA_supplicant)
  * man [wpa_supplicant](https://linux.die.net/man/8/wpa_supplicant)
  * man [wpa_supplicant.conf](https://linux.die.net/man/5/wpa_supplicant.conf)
* man [iwconfig](https://linux.die.net/man/8/iwconfig)
* man [iwlist](https://linux.die.net/man/8/iwlist)

```bash
# 启用网卡
ifconfig wlan0 up
# 扫描热点
iwlist scan
# 生成配置
wpa_passphrase ssid-name passphrase > wpa.conf

# 在前台运行以便调试, 可以使用 -B 参数在后台运行
wpa_supplicant -Dwext -ieth1 -c/root/wpa.conf
dhclient -r
dhclient wlan0
```

## Link aggregation
* http://www.linux-kvm.org/page/HOWTO_BONDING
* [Link aggregation](https://en.wikipedia.org/wiki/Link_aggregation)
* Linux [bonding](https://wiki.linuxfoundation.org/networking/bonding)
* [What can you do with a second Ethernet port ?](https://www.linux.com/news/what-can-you-do-second-ethernet-port)
* kernel/doc/[bonding](https://www.kernel.org/doc/Documentation/networking/bonding.txt)
* [Bonding Modes](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Virtualization/3.3/html/Installation_Guide/Bonding_Modes.html)
* 模式
  * balance-rr - 0 - 轮询
    * 代价是碎片化
    * 对有些协议(CIFS)来说会影响性能
  * active-backup - 1 - 主备
  * balance-xor - 2 - XOR
    * 基于 HASH 算法进行负载均衡
  * broadcast - 3 - 广播
    * 所有绑定的网卡都收到相同的数据, 用于特殊需求, 例如两个互相没连接的交换机发送相同的数据
  * 802.3ad - 4 - IEEE 802.3ad
    * 要求交换机支持 IEEE 802.3ad, 网卡带宽理论上可以翻倍
  * and balance-tlb - Adaptive transmit load balancing - 5 - 适配器传输负载均衡
    * 输出的数据会通过所有被绑定的网卡输出, 接收则只选择其中一个
  * balance-alb - Adaptive load balancing - 6 - 适配器输入/输出负载模式
    * balance-tlb + receive load balancing (rlb)
    * 在 5 的基础上, 接收数据也实现负载均衡
* balance-rr, active-backup, balance-tlb 和 balance-alb 不需要交换机支持
* balance-alb 和 balance-tlb 不一定所有交换机都能使用
  * 可能会有 arp 问题, 例如有些机器不能相互连接
  * 需要对 miimon, updelay 进行调试
* balance-xor 可能会需要交换机配置
  * You need to set up an interface group (not LACP) on HP and Cisco switches, but apparently it's not necessary on D-Link, Netgear and Fujitsu switches.
* 802.3ad 需要交换机支持 LACP 组, 性能最好
* 无论如何配置, 单个网络链接都不会超过单个物理链路的速度
* [Achieving 450 MB/s Network File Transfers Using Linux Bonding](http://louwrentius.com/achieving-450-mbs-network-file-transfers-using-linux-bonding.html)
* bonding
  * lacp_rate
* [The basics of SMB Multichannel, a feature of Windows Server 2012 and SMB 3.0](https://blogs.technet.microsoft.com/josebda/2012/06/28/the-basics-of-smb-multichannel-a-feature-of-windows-server-2012-and-smb-3-0/)
  * Windows 的 SMB 共享本身支持多通道
  * 协议支持自动发现多网卡, 并且自动利用多网卡进行网络传输
  * 和链路聚合有本质区别


```bash
#  jumbo frames
ifconfig bond0 mtu 9000 up
```
