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
# Allow PostgreSQL 5432
netsh advfirewall firewall add rule name="Allow PostgreSQL 5432" protocol=TCP dir=in localport=5432 action=allow
```
