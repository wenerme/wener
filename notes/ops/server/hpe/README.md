---
title: HPE
---

# HP

- HPE - Hewlett Packard Enterprise
  - 慧与公司
- HPI - Hewlett Packard Inc.
  - 惠普 - 主营 PC 和打印机
- [保修查询](http://h20564.www2.hp.com/hpsc/wc/public/find)

| Gen               | Date    |
| ----------------- | ------- |
| HP ProLiant Gen10 | Q4 2017 |
| HP ProLiant Gen9  | 2014-08 |

| Part                   | Note |
| ---------------------- | ---- |
| HP ProLiant DL380 Gen9 |

- https://buy.hpe.com/tw/zh
- [USB Key Utility for Windows](http://h20564.www2.hpe.com/hpsc/swd/public/readIndex?sp4ts.oid=1008862658)
- Hewlett-Packard [设备列表](https://en.wikipedia.org/wiki/List_of_Hewlett-Packard_products)
- [Hewlett Packard Enterprse](https://www.hpe.com)
- HPE [PartSurfer](http://partsurfer.hpe.com/)
  - 通过序列号查产品信息
- HP ProLiant BL685c G7
- HP ProLiant BL685c G6
- HP ProLiant BL680c G7
- HPE ProLiant BL660c Gen9
- HP ProLiant BL660c Gen8
- HP ProLiant BL620c G7
- HP ProLiant BL490c G7
- HP ProLiant BL490c G6
- HP ProLiant BL465c Gen8
- HP ProLiant BL465c G7
- HPE ProLiant BL460c Gen9
- HP ProLiant BL460c Gen8
- HP ProLiant BL460c G7
- HP ProLiant BL460c G6
- HP ProLiant BL420c Gen8
- HP ProLiant BL280c G6
- HP ProLiant BL2x220c G7
- HP ProLiant BL2x220c G6
- HPE ProLiant WS460c Gen9
- Graphics Server Blade
- HP ProLiant WS460c Gen8
- Graphics Server Blade
- HP ProLiant DL360E G8
  - [HP ProLiant DL360e Gen8 服务器用户指南](http://h20564.www2.hpe.com/hpsc/doc/public/display?docId=emr_na-c03415393&DocLang=zh&docLocale=zh_CN)
    - 中文版 2014
  - [HPE ProLiant DL360e Gen8 Server User Guide](http://h20564.www2.hpe.com/hpsc/doc/public/display?docId=emr_na-c03415393)
    - 英文版更新 2016
  - [二手](https://item.taobao.com/item.htm?id=555850763009)
  - 16G, 16 核, 1.4k 左右
  - Smart Array B120i
  - 兼容 Smart Array B320i
- HP ProLiant DL360p Gen8
  - [LED 指示灯](http://h20564.www2.hpe.com/hpsc/doc/public/display?docId=emr_na-c03245333)
  - [指示灯](http://h20564.www2.hpe.com/hpsc/doc/public/display?docId=emr_na-c03243777)
- [ProLiant](https://en.wikipedia.org/wiki/ProLiant)
  - 字母代号
    - ML Modular Line - 模块 - 直立型的服务器
    - DL Density Line - 密度 - 代表可收纳于 19 寸宽机架的机型
    - BL Blade Line - 刀片
    - SL Scalable Line 堆栈式服务器
  - 数字代号
    - 区别 CPU
    - 数字越高性能越好
    - 100,200,300,400 两个 CPU
    - 500,600 四个 CPU
    - 700 八个 CPU
    - 900 八个 CPU, 可以使用 80 核心,支持 4TB

## RAID

- [HP Dynamic Smart Array B120i Controller](http://h20564.www2.hpe.com/hpsc/swd/public/readIndex?sp4ts.oid=5293150)
- [HP Dynamic Smart Array RAID Controller User Guide](http://h20565.www2.hpe.com/hpsc/doc/public/display?docId=c03326739)
  - B120i
  - B320i

## FAQ

### HP 部分机型出现硬盘不兼容问题,会导致错误的过热检测,提升风扇转速,噪音很大

- 兼容的磁盘说明 http://dascomputerconsultants.com/HPCompaqServerDrives.htm
- 可能的原因
  - 磁盘没有温度传感,导致检测不到问题使得风扇转速不停提升
  - 选择硬盘是选择有温度传感的硬盘
- 新版的固件有对该问题进行修复

### Gen8 小机箱的 USB 无法识别

- 在进入界面大概 8s 后再插入 USB, 此时应该能识别
- 升级 iLO 后可以解决这个问题

### BIOS HAS CORRUPT [hw] PMU RESOURCES

- https://community.hpe.com/t5/ProLiant-Servers-ML-DL-SL/BIOS-HAS-CORRUPT-hw-PMU-RESOURCES/td-p/6006799

DUD Driver User Diskette（驱动程序用户软盘）
EFM Enclosure Firmware Management（机箱固件管理）- 一项 OA 功能
HBA Host bus adapter（主机总线适配器）
HP iLO Integrated Lights-Out
HP SUM HP Smart Update Manager
LDU Linux Deployment Utility（Linux 部署实用程序）
LILO Linux Loader（Linux 加载器）
OA Onboard Administrator
POST Power-On Self-Test（开机自测）
PSP HP ProLiant Support Pack（HP ProLiant 支持包）
RBSU HP ROM-Based Setup Utility
RIBCL Remote Insight Board Command Language（远程控制卡命令语言）
RPM Red Hat Package Manager
SAS Serial attached SCSI（串行连接 SCSI）
SDR Software Delivery Repository（软件交付存储库）
SMHP HP System Management Homepage
SOAP Simple Object Access Protocol（简单对象访问协议）
SPP HP Service Pack for ProLiant
SUV Serial, USB, video（串行、USB、视频）
TPM Trusted Platform Module（可信平台模块）
UNC Universal Naming Convention（通用命名约定）
VC Virtual Connect
VCA Version Control Agent
VCRM Version Control Repository Manager
WMI Windows Management Instrumentation
