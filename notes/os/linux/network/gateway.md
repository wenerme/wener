---
title: gateway
---

# gateway

```bash
# test gateway
# ====================
IP=$(dig +short ipv4.icanhazip.com | tail -1)
curl -H 'Host: icanhazip.com' $IP

# add route
ip ro add $IP via 192.168.1.2
# test again
curl -H 'Host: icanhazip.com' $IP
```
