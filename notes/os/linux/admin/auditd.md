---
title: auditd
---

# auditd

- /etc/audit/rules.d/audit.rules
- /var/log/audit/audit.log

```bash
# -w file -p permissions -k key_name
auditctl -w /etc/passwd -p wa -k user-modify
# useradd testuser # 会修改 /etc/passwd
cat /var/log/audit/audit.log | grep user-modify

ausearch -i -k user-modify
aureport -x
```
