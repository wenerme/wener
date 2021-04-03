---
title: SNMP MIB
---

# SNMP MIB

- 参考
  - [mibDepot](http://www.mibdepot.com) - Free SNMP MIB Search Engine for SNMP MIBs
  - [prometheus/snmp_exporter/generator/generator.yml](https://github.com/prometheus/snmp_exporter/blob/main/generator/generator.yml)

```bash
net-snmp-config --default-mibdirs
mkdir -p ~/.snmp/mibs
# --create-dirs
curl --output-dir ~/.snmp/mibs -O ftp://ftp.cisco.com/pub/mibs/v2/CISCO-SMI.my
curl --output-dir ~/.snmp/mibs -O ftp://ftp.cisco.com/pub/mibs/v2/CISCO-RHINO-MIB.my

snmptranslate -m +CISCO-RHINO-MIB -IR -On ciscoLS1010ChassisFanLed
snmptranslate -On CISCO-RHINO-MIB::ciscoLS1010ChassisFanLed

# mibs +ALL
cat <<CONF >> $HOME/.snmp/snmp.conf
mibs +CISCO-RHINO-MIB
CONF

# env
MIBS=+CISCO-RHINO-MIB:SOME-OTHER-SPIFFY-MIB
export MIBS
```

## General

- sysLocation https://www.alvestrand.no/objectid/1.3.6.1.2.1.1.6.html

## Printer

- Printer MIB v2 https://tools.ietf.org/html/rfc3805
- Printer MIB https://tools.ietf.org/html/rfc1759

## HOST-RESOURCES-MIB

- [HOST-RESOURCES-MIB](http://www.oidview.com/mibs/0/HOST-RESOURCES-MIB.html)
  - 系统运行情况
    - hrProcessorLoad=1.3.6.1.2.1.25.3.3 CPU %
  - http://www.oidview.com/mibs/0/HOST-RESOURCES-TYPES.html
- [rfc2790](https://tools.ietf.org/html/rfc2790)

```bash
snmpwalk -Os -c public -v 2c 192.168.1.1 host
# 或
snmpwalk -Os -c public -v 2c 192.168.1.1 1.3.6.1.2.1.25
```

## UCD-SNMP-MIB

- [UCD-SNMP-MIB](http://www.oidview.com/mibs/2021/UCD-SNMP-MIB.html)
- http://www.debianadmin.com/linux-snmp-oids-for-cpumemory-and-disk-statistics.html

| name                   | oid                       | desc       |
| ---------------------- | ------------------------- | ---------- |
| UCD-SNMP-MIB::laLoad.1 | 1.3.6.1.4.1.2021.10.1.3.1 | 1min load  |
| UCD-SNMP-MIB::laLoad.2 | 1.3.6.1.4.1.2021.10.1.3.2 | 5min load  |
| UCD-SNMP-MIB::laLoad.3 | 1.3.6.1.4.1.2021.10.1.3.3 | 15min load |

## UBNT

- [UBNT UniFi MIB](http://www.circitor.fr/Mibs/Html/U/UBNT-UniFi-MIB.php)
- http://dl.ubnt-ut.com/snmp/UBNT-MIB
- http://dl.ubnt-ut.com/snmp/UBNT-UniFi-MIB
- unifiIfRxBytes 为 802.3 - ethternet
- unifiVapTxBytes 为 802.11 - 无线
- ng - 2.4 GHz
- na/ac - 5 GHz
- 常用
  - sysUpTime
  - interfaces
  - ifXTable
  - 1.3.6.1.4.1.41112.1.4 # ubntAirMAX
  - 1.3.6.1.4.1.41112.1.6 # ubntUniFi

:::caution

* 开启 `高性能设备` 选项会导致 unifiVapNumStations 错误计数
  * 仅将高性能客户端连接到 5G
  * unifiVapNumStations.0 和 unifiVapNumStations.1 返回相同数值 - guest 和 user

:::

```bash
curl --output-dir ~/.snmp/mibs -O http://dl.ubnt-ut.com/snmp/UBNT-MIB
curl --output-dir ~/.snmp/mibs -O http://dl.ubnt-ut.com/snmp/UBNT-UniFi-MIB

snmpwalk -v 2c -c public -m +UBNT-UniFi-MIB 192.168.1.1 1.3.6.1.4.1.41112.1.6
```

```
unifiVapEssId * on(unifiVapIndex) group_right(unifiVapEssId) (unifiVapRadio * on(unifiVapIndex) group_right(unifiVapRadio) unifiVapNumStations)

unifiVapEssId{instance="$instance"} * on(unifiVapIndex) group_right(unifiVapEssId) (unifiVapRadio{instance="$instance"}  * on(unifiVapIndex) group_right(unifiVapRadio)  unifiVapNumStations{instance="$instance"})
```
