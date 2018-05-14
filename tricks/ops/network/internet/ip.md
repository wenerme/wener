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


* Google
  * 64.233.160.0 – 64.233.191.255 
  * 66.102.0.0 – 66.102.15.255
  * 66.249.64.0 – 66.249.95.255
  * 72.14.192.0 – 72.14.255.255
  * 74.125.0.0 – 74.125.255.255
  * 209.85.128.0 – 209.85.255.255
  * 216.239.32.0 – 216.239.63.255

* Googlebot
  * 64.68.90.1 – 64.68.90.255
  * 64.233.173.193 – 64.233.173.255
  * 66.249.64.1 – 66.249.79.255
  * 216.239.33.96 – 216.239.59.128

## FAQ
### IP-address ending with zero?
* [IP-address ending with zero?](https://stackoverflow.com/questions/14915188)
* 现在来说是没问题的, 20年前有隐性的子网约定, .0 代表网络, .255 代表广播, 许多硬件设备和软件规则有基于这样的假设, 现在都是以 CIDR 为标准, 因此 .0 和 .255 都是有效的地址
