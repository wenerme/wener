# Ops


## Tips

```bash
# 查看 Mac 地址
ping 192.168.1.1
arp -a
arp-scan 192.168.200.0/24
arp-scan -I wlan0 192.168.200.0/24
arping -c 1 -I eth0 10.100.10.11
```

## Ops School

* [Ops School](http://www.opsschool.org/en/latest/)

## CPU

http://ark.intel.com/

## DELL PERC 6/i

* RAID 卡

## SATA
* SATA
  * Serial ATA
* ATA
  * AT Attachment

* 1.0
  * 1.5 Gbit/s, 150 MB/s
  * 2003
* 2.0
  * 3 Gbit/s, 300 MB/s
  * 2004
* 3.0
  * 6 Gbit/s, 600 MB/s
  * 2008
* 3.2
  * 16 Gbit/s, 1969 MB/s
  * 2013


## iSCSI

* [iSCSI](https://en.wikipedia.org/wiki/ISCSI) Internet Small Computer System Interface
* [Linux iSCSI](http://www.linux-iscsi.org)
* [Using iSCSI On Ubuntu 10.04 (Initiator And Target)](https://www.howtoforge.com/using-iscsi-on-ubuntu-10.04-initiator-and-target)
* SCSI commands over network


## SAN
* [SAN](https://en.wikipedia.org/wiki/Storage_area_network) Storage Area Network

## FS
* [Ubuntu 文件服务器](https://help.ubuntu.com/lts/serverguide/file-servers.html)


## Netatalk


```bash
sudo docker run -h timemachine --name timemachine \
  -e AFP_LOGIN=<YOUR_USER> \
  -e AFP_PASSWORD=<YOUR_PASS> \
  -e AFP_NAME=<TIME_MACHINE_NAME> \
  -e AFP_SIZE_LIMIT=<MAX_SIZE_IN_MB> \
  -d -v /route/to/your/timemachine:/timemachine -t -i -p 548:548 -p 636:636 odarriba/timemachine
```

* [odarriba/timemachine](https://store.docker.com/community/images/odarriba/timemachine)

## Synology
https://www.synology.com/zh-cn/compatibility

## FreeNAS
