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
* [Link aggregation](https://en.wikipedia.org/wiki/Link_aggregation)
* Linux [bonding](https://wiki.linuxfoundation.org/networking/bonding)
* [What can you do with a second Ethernet port ?](https://www.linux.com/news/what-can-you-do-second-ethernet-port)
* kernel/doc/[bonding](https://www.kernel.org/doc/Documentation/networking/bonding.txt)


