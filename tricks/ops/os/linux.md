# Linux

## Tips

* [Linux insides](https://github.com/0xAX/linux-insides)
* [How to Make a Computer Operating System](https://github.com/SamyPesse/How-to-Make-a-Computer-Operating-System)

### halt vs poweroff vs shutdown
* halt
  * 终止所有进程并关闭 CPU
* poweroff
  * 与 halt 相似,但也会关闭 PC 自身.会发送 ACPI 命令到主板, PSU 然后切断电源
* shutdown -t now
  * 与 poweroff 相似,但会执行关机脚本

## CentOS change hostname
https://www.vultr.com/docs/how-to-change-your-hostname-on-centos

```bash
hostname server01
nano /etc/hosts
nano /etc/sysconfig/network # HOSTNAME=server01
hostname # check is ok
```
