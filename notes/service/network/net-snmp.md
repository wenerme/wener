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

# SNMP 配置目录
net-snmp-config --snmpconfpath

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

## EdgeOS system

```
$ snmpwalk -Os -c public -v 1 192.168.1.1 system
sysDescr.0 = STRING: EdgeOS v2.0.1.5174690.190312.1614
sysObjectID.0 = OID: enterprises.41112.1.5
sysUpTimeInstance = Timeticks: (3210) 0:00:32.10
sysContact.0 = STRING: root
sysName.0 = STRING: ubnt
sysLocation.0 = STRING: Unknown
sysServices.0 = INTEGER: 14
sysORLastChange.0 = Timeticks: (14) 0:00:00.14
sysORID.1 = OID: snmpMPDCompliance
sysORID.2 = OID: usmMIBCompliance
sysORID.3 = OID: snmpFrameworkMIBCompliance
sysORID.4 = OID: snmpMIB
sysORID.5 = OID: vacmBasicGroup
sysORID.6 = OID: tcpMIB
sysORID.7 = OID: ip
sysORID.8 = OID: udpMIB
sysORID.9 = OID: snmpNotifyFullCompliance
sysORID.10 = OID: notificationLogMIB
sysORDescr.1 = STRING: The MIB for Message Processing and Dispatching.
sysORDescr.2 = STRING: The management information definitions for the SNMP User-based Security Model.
sysORDescr.3 = STRING: The SNMP Management Architecture MIB.
sysORDescr.4 = STRING: The MIB module for SNMPv2 entities
sysORDescr.5 = STRING: View-based Access Control Model for SNMP.
sysORDescr.6 = STRING: The MIB module for managing TCP implementations
sysORDescr.7 = STRING: The MIB module for managing IP and ICMP implementations
sysORDescr.8 = STRING: The MIB module for managing UDP implementations
sysORDescr.9 = STRING: The MIB modules for managing SNMP Notification, plus filtering.
sysORDescr.10 = STRING: The MIB module for logging SNMP Notifications.
sysORUpTime.1 = Timeticks: (11) 0:00:00.11
sysORUpTime.2 = Timeticks: (11) 0:00:00.11
sysORUpTime.3 = Timeticks: (11) 0:00:00.11
sysORUpTime.4 = Timeticks: (13) 0:00:00.13
sysORUpTime.5 = Timeticks: (13) 0:00:00.13
sysORUpTime.6 = Timeticks: (13) 0:00:00.13
sysORUpTime.7 = Timeticks: (13) 0:00:00.13
sysORUpTime.8 = Timeticks: (13) 0:00:00.13
sysORUpTime.9 = Timeticks: (14) 0:00:00.14
sysORUpTime.10 = Timeticks: (14) 0:00:00.14
```

## unifi system

```
sysDescr.0 = STRING: UAP-AC-Lite 4.3.20.11298
sysObjectID.0 = OID: netSnmpAgentOIDs.10
sysUpTimeInstance = Timeticks: (35927661) 4 days, 3:47:56.61
sysContact.0 = STRING: root@localhost
sysName.0 = STRING: D
sysLocation.0 = STRING: Unknown
sysServices.0 = INTEGER: 79
sysORLastChange.0 = Timeticks: (67) 0:00:00.67
sysORID.1 = OID: ip
sysORID.2 = OID: snmpMIB
sysORID.3 = OID: udpMIB
sysORID.4 = OID: vacmBasicGroup
sysORID.5 = OID: snmpFrameworkMIBCompliance
sysORID.6 = OID: snmpMPDCompliance
sysORID.7 = OID: usmMIBCompliance
sysORID.8 = OID: transmission.131
sysORDescr.1 = STRING: The MIB module for managing IP and ICMP implementations
sysORDescr.2 = STRING: The MIB module for SNMPv2 entities
sysORDescr.3 = STRING: The MIB module for managing UDP implementations
sysORDescr.4 = STRING: View-based Access Control Model for SNMP.
sysORDescr.5 = STRING: The SNMP Management Architecture MIB.
sysORDescr.6 = STRING: The MIB for Message Processing and Dispatching.
sysORDescr.7 = STRING: The management information definitions for the SNMP User-based Security Model.
sysORDescr.8 = STRING: RFC 2667 TUNNEL-MIB implementation for Linux 2.2.x kernels.
sysORUpTime.1 = Timeticks: (35) 0:00:00.35
sysORUpTime.2 = Timeticks: (35) 0:00:00.35
sysORUpTime.3 = Timeticks: (35) 0:00:00.35
sysORUpTime.4 = Timeticks: (35) 0:00:00.35
sysORUpTime.5 = Timeticks: (35) 0:00:00.35
sysORUpTime.6 = Timeticks: (35) 0:00:00.35
sysORUpTime.7 = Timeticks: (36) 0:00:00.36
sysORUpTime.8 = Timeticks: (67) 0:00:00.67
```
