# Disk

- [常见速率表](https://en.wikipedia.org/wiki/List_of_device_bit_rates)
- [硬盘厂商列表](https://en.wikipedia.org/wiki/List_of_defunct_hard_disk_manufacturers)
- [计算机硬件厂商列表](https://en.wikipedia.org/wiki/List_of_computer_hardware_manufacturers)

## 存储控制器

- 常见的存储控制器
  - SATA
  - IDE
  - SCSI
  - USB
  - SAS

## RAID 级别

| RAID | 最少磁盘 | 最大容错 | 可用容量 | 读取性能 | 写入性能 | 安全性                         | 目的                             | 应用产业           |
| ---- | -------- | -------- | -------- | -------- | -------- | ------------------------------ | -------------------------------- | ------------------ |
| 0    | 2        | 0        | n        | n        | n        | 一个硬碟异常，全部硬碟都会异常 | 追求最大容量、速度               | 影片剪接快取用途   |
| 1    | 2        | n/2      | 1        | n        | n/2      | 最高，一个正常即可             | 追求最大安全性                   | 个人、企业备份     |
| 5    | 3        | 1        | n-1      | n-1      | n-1      | 高                             | 追求最大容量、最小预算           | 个人、企业备份     |
| 6    | 4        | 2        | n-2      | n-2      | n-2      | 安全性较 RAID 5 高             | 同 RAID 5，但较安全              | 个人、企业备份     |
| 10   | 4        | n/2      | n/2      | n        | n/2      | 安全性高                       | 综合 RAID 0/1 优点，理论速度较快 | 大型资料库、伺服器 |

## HBA

- HAB 相当于是无 RAID 功能的 RAID 卡

mount -t nfs 192.168.10.183:/mnt/yky-store/share ~/mnt/share/

Automatic - Pick reasonable defaults for available drives
Virtualization (RAID 10: Good Reliability, Better Performance, Minimum Storage)
Backups (RAID Z2: Good Reliability, Medium Performance, Medium Storage)
Media (RAID Z1: Medium Reliability, Good Performance, More Storage)
Logs (RAID 0: No Reliability, Best Performance, Maximum Storage)

Automatic: automatically creates a mirrored, RAIDZ1, or RAIDZ2 pool, depending upon the number of disks. If you prefer to control the type of redundancy, select one of the other options.
RAID 10: creates a striped mirror and requires a minimum of 4 disks.
RAIDZ2: requires a minimum of 4 disks. Up to 2 disks can fail without data loss.
RAIDZ1: requires a minimum of 3 disks. Up to 1 disk can fail without data loss.
Stripe: requires a minimum of 1 disk. Provides no redundancy, meaning if any of the disks in the stripe fails, all data in the stripe is lost.

- 起名时尽量起不会再日志中出现的名字,比如 data,freenas 等

```bash
# vbox 磁盘路径
ls "$HOME/VirtualBox VMs/freenas"

vbox createhd disk --filename $PWD/disk0.vdi --size $((8*1024))
vbox storageattach freenas --storagectl SATA --port 7 --device 0 --type hdd --medium $PWD/disk1.vdi
```
