---
title: SNMP
---

# SNMP

## Tips

- [Simple Network Management Protocol](https://en.wikipedia.org/wiki/Simple_Network_Management_Protocol)
  - 简单网络管理协议
- 通常用于管理和监控网络设备
- UDP 161

```bash
# 扫描有 SNMP 的设备
sudo apk add nmap nmap-scripts
sudo nmap -sU -p 161 --script default,snmp-sysdescr 192.169.1.0/24
```

| abbr | full                       | chinese      | desc               |
| ---- | -------------------------- | ------------ | ------------------ |
| OID  | Object Identifiers         | 对象标识符   |
| MIB  | Management Infomation Base | 管理信息基础 | OID 映射描述性文字 |
| NMS  | Network Management System  | 网络管理系统 |

- SNMPv1 - rfc1155, rfc1157, rfc1212
  - community based management
- SNMPv2 - 衍生自 v1，没有消息定义
  - 添加数据类型 - Counter32, Counter64, Gauge32, UInteger32, NsapAdress, BIT STRING
  - 增强 OID 表 和 值
- SNMPv2c - rfc1901-rfc1908
- SNMPv3 - rfc3411-rfc3418
  - 新的消息格式
  - 增加 ACL 和一些安全相关能力
  - 增加远程参数配置
- rfc3584 - 多版本共存

## printer

- prtMarkerSuppliesType
  - https://oidref.com/1.3.6.1.2.1.43.11.1.1.5
  - other(1),
  - unknown(2),
  - toner(3),
  - wasteToner(4),
  - ink(5),
  - inkCartridge(6),
  - inkRibbon(7),
  - wasteInk(8),
  - opc(9),
  - developer(10),
  - fuserOil(11),
  - solidWax(12),
  - ribbonWax(13),
  - wasteWax(14)
