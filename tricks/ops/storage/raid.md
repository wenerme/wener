# RAID

## Tips
* [RAID](https://en.wikipedia.org/wiki/RAID)
  * Redundant Array of Independent Disks - 独立硬盘冗余阵列
* [Standard_RAID_levels](https://en.wikipedia.org/wiki/Standard_RAID_levels)
  *	RAID 0
  *	RAID 1
  *	RAID 2
  *	RAID 3
  *	RAID 4
  *	RAID 5
    * write hole
      * in which data and parity become inconsistent	after a	power loss
  *	RAID 6
* [Nested RAID levels](https://en.wikipedia.org/wiki/Nested_RAID_levels)
  *	RAID 01 (RAID 0+1)
  *	RAID 03 (RAID 0+3)
  *	RAID 10 (RAID 1+0)
  *	RAID 50 (RAID 5+0)
  *	RAID 60 (RAID 6+0)
  *	RAID 100 (RAID 10+0)
* JBOD - Just Bunch Of Disk
* [Data striping](https://en.wikipedia.org/wiki/Data_striping) - 数据分条
  * segmenting logically sequential data, such as a file, so that consecutive segments are stored on different physical storage devices.
  * 增加吞吐量
  * IO 负载

* https://raid.wiki.kernel.org
* https://raid.wiki.kernel.org/index.php/RAID_setup
* [Hardware Raid Setup using MegaCli](https://raid.wiki.kernel.org/index.php/Hardware_Raid_Setup_using_MegaCli)


* [LSI MegaRAID SAS](https://hwraid.le-vert.net/wiki/LSIMegaRAIDSAS)

ftp://download2.boulder.ibm.com/ecc/sar/CMA/XSA
ftp://download2.boulder.ibm.com/ecc/sar/CMA/XSA/ibm_utl_sraidmr_megacli-8.00.48_linux_32-64.zip


[Introduction to LSI's MegaCLI Utility](https://www.cisco.com/c/en/us/support/docs/servers-unified-computing/ucs-c-series-rack-servers/115020-intro-lsi-megacli-00.html)


Note that MegaCLI is now called StorCLI.
https://www.thomas-krenn.com/en/wiki/StorCLI

https://www.thomas-krenn.com/en/download.html?product=12190

StorCLI Reference Manual - Broadcom Limited

https://docs.broadcom.com/docs/12352476

Storcli常用命令
http://blog.51cto.com/mofesi/1309251

```bash
./storcli64 show
```

```bash
# 查看使用时间
# Power_On_Hours
smartctl --all /dev/sdj  | command grep -i Power
```

1064、1064e、1068、1068e、2008、2308、3008属于IOC；2108、2208属于ROC；
基于IOC的产品，一般称为HBA卡，也就是常说的直连卡，一般支持Raid0/1/10/1E
基于ROC的产品，一般称为Raid卡，一般带有缓存，支持Raid0/1/10/1E/5/50/6/60，可选BBU，附带的高级软件包括：CacheCade、FashPath、SafeStore等


DELL H200
LSI-9211-8I IT IR


https://www.broadcom.com/products/storage/raid-controllers/

https://www.broadcom.com/products/storage/host-bus-adapters/



https://tobert.github.io/post/2014-06-17-jbod-vs-raid.html

JBOD is ~30% faster than MD RAID0. ext2/xfs/ext4 perform similarly.
