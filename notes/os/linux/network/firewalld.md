---
title: firewalld
---

# firewalld

```bash
systemctl status firewalld

# 'tcp'|'udp'|'sctp'|'dccp'
firewall-cmd --permanent --add-port=22/tcp

firewall-cmd --permanent --add-source=192.168.1.0/24

firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.100" port protocol="tcp" port="3306" accept'

# 保存 生效
firewall-cmd --reload
firewall-cmd --list-all
```
