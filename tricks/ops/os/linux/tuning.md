# Tuning

## Tips
* [Linux Web Server Kernel Tuning](https://gist.github.com/kgriffs/4027835)

## ESnet Linux Tuning
* ESnet [Linux Tuning](https://fasterdata.es.net/host-tuning/linux/)


### Networking
* https://www.kernel.org/doc/ols/2009/ols2009-pages-169-184.pdf
* [Tuning 10Gb NICs highway to hell](https://darksideclouds.wordpress.com/2016/10/10/tuning-10gb-nics-highway-to-hell/)
* `/etc/sysctl.conf`

https://www.kernel.org/doc/html/latest/networking/device_drivers/intel/ixgb.html

```bash
apk add iperf3

iperf3 -s
iperf3 -c HOST


```

```conf
# Maximum receive socket buffer size
net.core.rmem_max = 134217728 

# Maximum send socket buffer size
net.core.wmem_max = 134217728 

# Minimum, initial and max TCP Receive buffer size in Bytes
net.ipv4.tcp_rmem = 4096 87380 134217728 

# Minimum, initial and max buffer space allocated
net.ipv4.tcp_wmem = 4096 65536 134217728 

# Maximum number of packets queued on the input side
net.core.netdev_max_backlog = 300000 

# Auto tuning
net.ipv4.tcp_moderate_rcvbuf =1

# Don't cache ssthresh from previous connection
net.ipv4.tcp_no_metrics_save = 1

# The Hamilton TCP (HighSpeed-TCP) algorithm is a packet loss based congestion control and is more aggressive pushing up to max bandwidth (total BDP) and favors hosts with lower TTL / VARTTL.
net.ipv4.tcp_congestion_control=htcp

# If you are using jumbo frames set this to avoid MTU black holes.
net.ipv4.tcp_mtu_probing = 1
```

* 10G NIC, 100ms RTT

```conf
# allow testing with buffers up to 64MB 
net.core.rmem_max = 67108864 
net.core.wmem_max = 67108864 
# increase Linux autotuning TCP buffer limit to 32MB
net.ipv4.tcp_rmem = 4096 87380 33554432
net.ipv4.tcp_wmem = 4096 65536 33554432
# recommended default congestion control is htcp 
net.ipv4.tcp_congestion_control=htcp
# recommended for hosts with jumbo frames enabled
net.ipv4.tcp_mtu_probing=1
# recommended for CentOS7/Debian8 hosts
net.core.default_qdisc = fq
```

* 10G NIC, 200ms RTT
* 40G NIC, 50ms RTT
* single and parallel stream tools

```conf
# allow testing with buffers up to 128MB
net.core.rmem_max = 134217728 
net.core.wmem_max = 134217728 
# increase Linux autotuning TCP buffer limit to 64MB
net.ipv4.tcp_rmem = 4096 87380 67108864
net.ipv4.tcp_wmem = 4096 65536 67108864
# recommended default congestion control is htcp 
net.ipv4.tcp_congestion_control=htcp
# recommended for hosts with jumbo frames enabled
net.ipv4.tcp_mtu_probing=1
# recommended for CentOS7/Debian8 hosts
net.core.default_qdisc = fq
```

```bash
sysctl -w net.ipv4.tcp_window_scaling=1
sysctl -p
```

ifconfig eth0 mtu 6000
修改RX  TX 为 4096
ethtool -g eth0
/etc/sysctl.conf

```conf
net.ipv4.tcp_rmem = 53687091 53687091 536870912
net.ipv4.tcp_wmem = 53687091 53687091 536870912
net.ipv4.tcp_mem = 53687091 53687091 536870912
net.core.rmem_max = 536870912
net.core.wmem_max = 536870912
net.core.rmem_default = 53687091
net.core.wmem_default = 53687091
net.core.optmem_max = 536870912
```

## NFS

172.17.10.101:/mnt/nas/lun1/NFS-SHARE1 on /mnt/test1 type nfs4 (rw,relatime,vers=4.1,rsize=1048576,wsize=1048576,namlen=255,hard,proto=tcp,port=0,timeo=600,retrans=2,sec=sys,clientaddr=172.17.10.102,local_lock=none,addr=172.17.10.101)

dd if=/dev/zero of=/mnt/test1/ta2 bs=4k count=xxxxxxx 

conv=fdatasync or oflag=direct 

NFS v4.1 支持线程 /etc/sysconfig/nfs

fio --name=read-test1 --ioengine=libaio --bs=9k --rw=read --direct=1 --iodepth=32 --runtime=60 --size=40G --group_reporting --filename=/mnt/volume/fio-read-t1

## Red Hat Enterprise Linux 6/Performance Tuning Guide
* [Performance Tuning Guide](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html-single/Performance_Tuning_Guide/index.html)
  * Optimizing subsystem throughput in Red Hat Enterprise Linux 6
