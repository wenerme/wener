---
tags:
- FAQ
---

# Dev FAQ


## Device Info

```bash
apk add smartmontools
smartctl -i /dev/sda

lshw -class disk
hdparm -I /dev/sda
```
