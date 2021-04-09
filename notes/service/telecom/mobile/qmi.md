---
title: QMI
---

# QMI

- QMI - Qualcomm MSM Interface
  - 替代 Hayes command set/AT 命令 中的 cellular extensions
- [linux-mobile-broadband/libqmi](https://github.com/linux-mobile-broadband/libqmi)
- 参考
  - [gartfr/QualcommLTE](https://github.com/gartfr/QualcommLTE)
    - 操作命令参考
  - wikipedia [Qualcomm MSM Interface](https://en.wikipedia.org/wiki/Qualcomm_MSM_Interface)
  - https://osmocom.org/projects/quectel-modems/wiki/QMI
  - S5P4418 android 5.1 EC20 R2.0 PCIE接口调试记录 https://blog.csdn.net/hnjztyx/article/details/72495433

| dev           | desc                         |
| ------------- | ---------------------------- |
| /dev/ttyUSB0  | diagnostic port / DM         |
| /dev/ttyUSB1  | GPS NMEA/USB Audio Data port |
| /dev/ttyUSB2  | control port / AT command    |
| /dev/ttyUSB3  | PPP                          |
| /dev/cdc-wdm0 | data port for QMI mode       |

CDC ACM

| dev     | desc        |
| ------- | ----------- |
| ttyACM0 | PPP / AT    |
| ttyACM1 | Trace1      |
| ttyACM2 | Trace2      |
| ttyACM3 | AT commands |
| ttyACM4 | AT commands |

- CDC - Communication Device Class

```bash
apk add libqmi

qmicli --device=/dev/cdc-wdm0 --device-open-proxy --dms-get-ids
```

# FAQ

## GobiNet vs QMI

> 建议使用 qmi_wwan 驱动

- GobiNet 内核外模块/out-of-tree
  - 内核功能更多
  - 支持固件升级 - 厂商应用+GobiNet
- QMI 内核模块
  - Linux 3.4 添加 QMI-WWAN
  - 功能少于 GobiNet，可由用户空间应用补齐
    - ofono, uqmi, libqmi
  - 只能一个进程操作控制端口 - 1.8 实现 qmi-proxy 来实现代理操作
- 参考
  - [GobiNet vs libqmi](https://wiki.postmarketos.org/wiki/QMI#GobiNet_vs_libqmi)

## PPP vs QMI vs AT
* https://unix.stackexchange.com/questions/523321
* https://www.outdoorrouter.com/4g-mobile-interface-protocol-qmi-and-ppp/
