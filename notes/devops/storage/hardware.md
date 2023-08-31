# Storage Hardware

## Tips
* FreeBSD [Supported Devices](https://www.freebsd.org/releases/11.0R/hardware.html#support)
* ebay [RAID Card Buying Guide](http://www.ebay.com/gds/RAID-Card-Buying-Guide-/10000000177629608/g.html)
* JBOD - Just a Bunch of Disks.

## RAID
* M1015
  * 可刷成 IT 模式
  * [CP值高的IBM M1015 SAS/SATA磁碟陣列控制卡](http://www.c4it.tw/archives/1530)

IT Mode 就是純SAS/SATA控制器，IR Mode 則加上陣列功能(RAID 0,1,10)，若只想做單純控制器，可刷IT Mode，同時不刷ROM，可節省開機時間

https://www.broadcom.com/products/storage/host-bus-adapters/


lsi 8708em2

HBA
LSI 9217-8i

HP 24 Bay SAS Expander Card , 468405-002 487738-001


HPE 24 Bay 3Gb SAS Expander Card - Overview
http://h20564.www2.hpe.com/hpsc/doc/public/display?docId=emr_na-c01733557

Expander card connector | Server connector
------------------------|-----------------
Port 1C (external connector)  | HP external tape device
Port 2C - Port 7C             | Hard drive backplanes
Port 8C                       | Controller port 1
Port 9C                       | Controller port 2

MOLEX 
MINI-SAS 线 SFF-8087 TO 4 SATA 线 36P TO 4*7P

部分 raid 卡有 SFF-8087 口, 可以使用转接线转出 4 个 SAS 口
AMPHENOL  安费诺 也是一个厂家


https://en.wikipedia.org/wiki/LSI_Corporation
2014 年后被博通收购

SFF-8644 SFF-8643 12Gb/s

SFF-8088 SFF-8087 6Gb/s

9207-8e 为 SFF-8088
9207-8i 为 SFF-8087

9305-16e 为 SFF-8644
9305-16i 为 SFF-8643

https://www.broadcom.com/products/storage/host-bus-adapters/

MegaRAID


N8103-117A
RAID controller (RAID 0/1/5/6, 128MB) (PCI EXPRESS (x8))

DELL H200 支持 JBOD

HP Smart Array P420i 之前的 RAID 都不能禁用 RAID 功能


FBWC=Flash-Based Write Cache(FBWC)    使用 flash 做存储，掉电时有一个大电容供电，将缓存中的内容写入flash. 写入flash 后，永久有效，无72小时限制。

BBWC=Battery-Backed Write Cache(BBWC)   使用 电池供电，只能保持72小时的数据。

