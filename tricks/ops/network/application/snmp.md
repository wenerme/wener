# SNMP

## Tips
* [Simple Network Management Protocol](https://en.wikipedia.org/wiki/Simple_Network_Management_Protocol)
  * 简单网络管理协议
* 通常用于管理和监控网络设备
* UDP 161
* mibs
  * [UBNT UniFi MIB](http://www.circitor.fr/Mibs/Html/U/UBNT-UniFi-MIB.php)
  * http://dl.ubnt-ut.com/snmp/UBNT-MIB
  * http://dl.ubnt-ut.com/snmp/UBNT-UniFi-MIB

```bash
# 扫描有 SNMP 的设备
sudo apk add nmap nmap-scripts
sudo nmap -sU -p 161 --script default,snmp-sysdescr 192.169.1.0/24
```

## printer
* prtMarkerSuppliesType
  * https://oidref.com/1.3.6.1.2.1.43.11.1.1.5
  * other(1),
  * unknown(2),
  * toner(3),
  * wasteToner(4),
  * ink(5),
  * inkCartridge(6),
  * inkRibbon(7),
  * wasteInk(8),
  * opc(9),
  * developer(10),
  * fuserOil(11),
  * solidWax(12),
  * ribbonWax(13),
  * wasteWax(14)
