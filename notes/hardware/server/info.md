# Information

## Tips
``` bash
sudo lshw -short
sudo lshw -html > lshw.html

lscpu
lsblk
lsblk -a

lsusb

lspci
lspci -t
lspci -v

lsscsi
lsscsi -s

# 查看 SATA 设备信息
sudo hdparm /dev/sda1
# 查看 Linux 文件系统信息
sudo fdisk -l

# 从硬件设备的 DMI 表提取信息
sudo dmidecode -t memory
sudo dmidecode -t system
sudo dmidecode -t bios
sudo dmidecode -t processor

hwinfo --short

inxi -Fx
inxi -Fxxxrz

df -H
pydf
mount | column -t
free -m

# cpu information
cat /proc/cpuinfo
# memory information
cat /proc/meminfo
# 内核版本
cat /proc/version
# 设备信息
cat /proc/scsi/scsi
# 分区信息
cat /proc/partitions

# https://pkgs.alpinelinux.org/package/edge/main/x86_64/smartmontools
# https://www.smartmontools.org/
# https://linux.die.net/man/8/smartctl
# Self-Monitoring, Analysis and Reporting Technology
# 检查是否有 SMART 支持
sudo smartctl -i /dev/sda1
# 开启监控
sudo smartctl --smart=on --offlineauto=on --saveauto=on /dev/sdb
# 监控状况查看
sudo smartctl  -H /dev/sdb


# https://github.com/eLvErDe/hwraid
# Raid 管理工具
# 没有 xenial 的发布版
echo 'deb http://hwraid.le-vert.net/ubuntu precise main' > /etc/apt/sources.list.d/raid.list

# HP RAID 可以使用 hpacucli
# http://downloads.linux.hpe.com/SDR/downloads/ManagementComponentPack/
# http://cxj632840815.blog.51cto.com/3511863/1209383
# mcp 的工具支持 Ubuntu

sudo echo "deb http://downloads.linux.hpe.com/SDR/repo/mcp `lsb_release -cs`/current non-free" | sudo tee -a /etc/apt/sources.list.d/hp-mcp.list
# http://downloads.linux.hpe.com/SDR/keys.html
curl http://downloads.linux.hpe.com/SDR/hpPublicKey1024.pub | apt-key add -
curl http://downloads.linux.hpe.com/SDR/hpPublicKey2048.pub | apt-key add -
curl http://downloads.linux.hpe.com/SDR/hpPublicKey2048_key1.pub | apt-key add -
curl http://downloads.linux.hpe.com/SDR/hpePublicKey2048_key1.pub | apt-key add -
apt-key list
# http://downloads.linux.hpe.com/SDR/repo/mcp/pool/non-free/
sudo apt install hpacucli

# hp-health	         HPE System Health Application and Command line Utilities
# hponcfg	           HPE RILOE II/iLO online configuration utility
# hp-ams	           HPE Agentless Management Service
# hp-snmp-agents	   Insight Management SNMP Agents for HPE ProLiant Systems
# hpsmh	             HPE System Management Homepage
# hp-smh-templates	 HPE System Management Homepage Templates
# hpssacli	         HPE Command Line Smart Storage Administration Utility
# hpssaducli	       HPE Command Line Smart Storage Administration Diagnostics
# hpssa	             HPE Array Smart Storage Administration Service

# UID 是 unit identification light 的缩写。一般在服务器上机柜时，比较有用，主要是用来定位机柜上的服务器。UID 灯服务器前后都有，无论是按前面还是后面的 UID 按钮，前后的 UID 灯都会亮蓝色，帮助用户定位服务器，也可以在 insight manager console 和 hp 远程管理卡的管理界面中，控制 UID 灯打开或者关闭,当打开的时候，UID 灯会闪烁蓝色光

# UID 控制, -s 查看状态, -e 启用, -d 禁用
hpuid -s
# hpasmcli - HP management CLI

# mdadm RAID 工具
```
