---
id: net-snmp
title: NetSNMP
---

# NetSNMP
## Tips
* [net-snmp](http://www.net-snmp.org)
  * wikipedia [net-snmp](https://en.wikipedia.org/wiki/Net-SNMP) 
  * alpine [net-snmp](https://pkgs.alpinelinux.org/package/edge/main/x86_64/net-snmp)
  * [snmpd](https://wiki.archlinux.org/index.php/Snmpd)
* 版本
  * 1
    * getnext
  * 2c
    * buildget
  * 3 - 加密通信、认证
* /usr/share/snmp/mibs
* 注意
  * unifi 控制器启用 snmp 是启用 AP 的 snmp 不是自己的

```bash
# 扫描有 SNMP 的设备
sudo apk add nmap nmap-scripts
sudo nmap -sU -p 161 --script default,snmp-sysdescr 192.169.1.0/24

apk add net-snmp net-snmp-tools

# snmpv1 遍历系统信息
snmpwalk -Os -c public -v 1 192.168.1.1 system

# ipv6
snmpwalk -v2c -c public udp6:[2001:0db8:85a3:0:0:8a2e:0370:99]:161 system

# snmpv3
snmpwalk -v 3 -u joe -l authNoPriv -A joe12 sys1 system

# 
snmpget -c public sys1 system.sysDescr.0
# ICMP object (OID=56.1.1.1.1)
snmpget -c public -v 2c sys1 .1.3.6.1.2.1.56.1.1.1.1

#
snmpbulkget -v2c -Cn1 -Cr3 -Os -c public sys1 system ifTable
# IPv6 object (OID=55.1)
snmpbulkget -c public -v 2c 192.0.2.19 .1.3.6.1.2.1.55.1

#
snmpbulkwalk -v2c -Os -c public sys1 system
# udp tcp uptime interface
snmpbulkwalk -v2c -c public  192.0.2.19 udp

# 开发
apk add net-snmp-dev
# 参数
net-snmp-config --agent-libs
```
