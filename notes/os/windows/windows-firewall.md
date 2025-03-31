---
tags:
  - Security
  - Firewall
  - Network
---

# Firewall


```shell
# 查看防火墙状态
netsh advfirewall show allprofiles state

Get-NetFirewallProfile
Get-NetFirewallProfile | Select-Object Name, Enabled

# Allow MySQL 3306
netsh advfirewall firewall add rule name="Allow MySQL 3306" protocol=TCP dir=in localport=3306 action=allow
# Allow PostgreSQL 5432
netsh advfirewall firewall add rule name="Allow PostgreSQL 5432" protocol=TCP dir=in localport=5432 action=allow

# ALlow SSH 22
netsh advfirewall firewall add rule name="Allow SSH 22" protocol=TCP dir=in localport=22 action=allow

# Allow HTTP 80, 8080
netsh advfirewall firewall add rule name="Allow HTTP" protocol=TCP dir=in localport=80,8080 action=allow
```
