## General
* sysLocation https://www.alvestrand.no/objectid/1.3.6.1.2.1.1.6.html

## Printer
* Printer MIB v2 https://tools.ietf.org/html/rfc3805
* Printer MIB https://tools.ietf.org/html/rfc1759

## HOST-RESOURCES-MIB
* [HOST-RESOURCES-MIB](http://www.oidview.com/mibs/0/HOST-RESOURCES-MIB.html)
  * 系统运行情况
    * hrProcessorLoad=1.3.6.1.2.1.25.3.3 CPU %
  * http://www.oidview.com/mibs/0/HOST-RESOURCES-TYPES.html

```bash
snmpwalk -Os -c public -v 2c 192.168.1.1 host
# 或
snmpwalk -Os -c public -v 2c 192.168.1.1 1.3.6.1.2.1.25
```
