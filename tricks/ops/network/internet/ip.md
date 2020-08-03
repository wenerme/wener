---
id: ip
title: IP
---

# TCP/IP

## Tips
* https://en.wikipedia.org/wiki/IP_address
* https://en.wikipedia.org/wiki/Reserved_IP_addresses
* http://ip.taobao.com/

```bash
# 获取 IP
curl checkip.amazonaws.com
curl ipinfo.io/ip
curl ifconfig.co
curl ipecho.net/plain
curl icanhazip.com
curl ipv4.icanhazip.com

# 使用 DNS 的方式获取
dig +short myip.opendns.com @resolver1.opendns.com
```

Start       | End             | Count     | Class | CIDR
------------|-----------------|-----------|-------|--------------
10.0.0.0	  | 10.255.255.255	| 16777216  | A     | 10.0.0.0/8
172.16.0.0  |	172.31.255.255	| 1048576   | B     | 172.16.0.0/12
192.168.0.0 | 192.168.255.255 | 65536     | B     | 192.168.0.0/16

https://www.cloudflare.com/ips/

## Google
* https://md5calc.com/google/ip
  * `copy($$('table tr td:first-child').map(v=>v.innerText).join(','))`
  * 35.190.247.0/24,35.191.0.0/16,64.233.160.0/19,66.102.0.0/20,66.249.80.0/20,72.14.192.0/18,74.125.0.0/16,108.177.8.0/21,108.177.96.0/19,130.211.0.0/22,172.217.0.0/19,172.217.32.0/20,172.217.128.0/19,172.217.160.0/20,172.217.192.0/19,173.194.0.0/16,209.85.128.0/17,216.239.32.0/19,216.58.192.0/19
* Googlebot
  * 64.68.90.1 – 64.68.90.255
  * 64.233.173.193 – 64.233.173.255
  * 66.249.64.1 – 66.249.79.255
  * 216.239.33.96 – 216.239.59.128

## Tiwtter
* IP Range https://ipinfo.io/AS13414
* `copy($$('#ipv4-data table tr td:first-child').map(v=>v.innerText).join(','))`
* 103.252.112.0/23,103.252.114.0/23,104.244.40.0/24,104.244.41.0/24,104.244.42.0/24,104.244.44.0/24,104.244.45.0/24,104.244.46.0/24,104.244.47.0/24,185.45.5.0/24,185.45.6.0/23,192.133.76.0/22,192.133.76.0/23,192.44.69.0/24,199.16.156.0/22,199.16.156.0/23,199.59.148.0/22,199.96.56.0/23,199.96.56.0/24,199.96.57.0/24,199.96.58.0/23,199.96.60.0/23,199.96.60.0/24,199.96.61.0/24,199.96.62.0/23,202.160.128.0/24,202.160.129.0/24,202.160.130.0/24,202.160.131.0/24,209.237.192.0/24,209.237.193.0/24,209.237.194.0/24,209.237.195.0/24,209.237.196.0/24,209.237.197.0/24,209.237.198.0/24,209.237.199.0/24,209.237.200.0/24,209.237.201.0/24,209.237.204.0/24,209.237.205.0/24,209.237.206.0/24,209.237.207.0/24,209.237.208.0/24,209.237.209.0/24,209.237.210.0/24,209.237.211.0/24,209.237.212.0/24,209.237.213.0/24,209.237.214.0/24,209.237.215.0/24,209.237.216.0/24,209.237.217.0/24,209.237.218.0/24,209.237.219.0/24,209.237.220.0/24,209.237.221.0/24,209.237.222.0/24,209.237.223.0/24,64.63.0.0/18,69.195.160.0/24,69.195.162.0/24,69.195.163.0/24,69.195.164.0/24,69.195.165.0/24,69.195.166.0/24,69.195.168.0/24,69.195.169.0/24,69.195.171.0/24,69.195.172.0/24,69.195.174.0/24,69.195.175.0/24,69.195.176.0/24,69.195.177.0/24,69.195.178.0/24,69.195.179.0/24,69.195.180.0/24,69.195.181.0/24,69.195.182.0/24,69.195.184.0/24,69.195.185.0/24,69.195.186.0/24,69.195.187.0/24,69.195.188.0/24,69.195.189.0/24,69.195.190.0/24,69.195.191.0/24

## ipcalc

```
Usage: ipcalc [options] <ADDRESS>[[/]<NETMASK>] [NETMASK]

ipcalc takes an IP address and netmask and calculates the resulting broadcast,
network, Cisco wildcard mask, and host range. By giving a second netmask, you
can design sub- and supernetworks. It is also intended to be a teaching tool
and presents the results as easy-to-understand binary values.

 -n --nocolor  Don't display ANSI color codes.
 -b --nobinary Suppress the bitwise output.
 -c --class    Just print bit-count-mask of given address.
 -h --html     Display results as HTML (not finished in this version).
 -v --version  Print Version.
 -s --split n1 n2 n3
               Split into networks of size n1, n2, n3.
 -r --range    Deaggregate address range.
    --help     Longer help text.

Examples:

ipcalc 192.168.0.1/24
ipcalc 192.168.0.1/255.255.128.0
ipcalc 192.168.0.1 255.255.128.0 255.255.192.0
ipcalc 192.168.0.1 0.0.63.255


ipcalc <ADDRESS1> - <ADDRESS2>  deaggregate address range

ipcalc <ADDRESS>/<NETMASK> --s a b c
                                split network to subnets
				where a b c fits in.
```

## FAQ
### IP-address ending with zero?
* [IP-address ending with zero?](https://stackoverflow.com/questions/14915188)
* 现在来说是没问题的, 20年前有隐性的子网约定, .0 代表网络, .255 代表广播, 许多硬件设备和软件规则有基于这样的假设, 现在都是以 CIDR 为标准, 因此 .0 和 .255 都是有效的地址

### Tools
https://ipjisuanqi.com/
https://dnsdaquan.com/
https://ipchaxun.com/
https://icplishi.com/jiashule.com/
