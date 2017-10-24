# Ops


## Tips

```bash
# 查看 Mac 地址
ping 192.168.1.1
arp -a
arp-scan 192.168.200.0/24
arp-scan -I wlan0 192.168.200.0/24
arping -c 1 -I eth0 10.100.10.11

# 查看内存
dmidecode -t memory
dmidecode -t 16
lshw -class memory
cat /proc/meminfo
```

## kernel module
* [LKM](https://en.wikipedia.org/wiki/Loadable_kernel_module) - Loadable kernel module
* [modprobe](https://en.wikipedia.org/wiki/Modprobe)

## FAQ
### htop 的 cpu 显示在一列上

```bash
# 打开 htop
htop
# <F2> 进入配置, 将 CPU(1/1) 删掉, 添加 CPU(2/1) 到左边, 添加 CPU(2/2) 到右边, 然后保存
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


