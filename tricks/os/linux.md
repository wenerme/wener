
## CentOS change hostname
https://www.vultr.com/docs/how-to-change-your-hostname-on-centos

```bash
hostname server01
nano /etc/hosts
nano /etc/sysconfig/network # HOSTNAME=server01
hostname # check is ok
```
