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


## DELL PERC 6/i

* RAID 卡

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
