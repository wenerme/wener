---
title: RAID
---

# RADI

```bash
apk add dmraid mdadm pciutils
lspci -vv | grep -i raid

cat /proc/mdstat # 软 RAID
dmraid -rE       # 移除

# Dell
omreport storage vdisk
# Adaptec RAID controller
arcconf getconfig 2
```
