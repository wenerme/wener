# Tuning

## Tips
* [Linux Web Server Kernel Tuning](https://gist.github.com/kgriffs/4027835)

## ESnet Linux Tuning
* ESnet [Linux Tuning](https://fasterdata.es.net/host-tuning/linux/)
### TCP
* `/etc/sysctl.conf`

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

## Red Hat Enterprise Linux 6/Performance Tuning Guide
* [Performance Tuning Guide](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html-single/Performance_Tuning_Guide/index.html)
  * Optimizing subsystem throughput in Red Hat Enterprise Linux 6
