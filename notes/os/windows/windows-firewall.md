---
tags:
  - Security
  - Firewall
  - Network
---

# Firewall


```shell
# Allow MySQL 3306
netsh advfirewall firewall add rule name="Allow MySQL 3306" protocol=TCP dir=in localport=3306 action=allow
```
