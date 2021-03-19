---
title: strongSwan FAQ
---

# strongSwan FAQ

## no IDi configured, fall back on IP address

## peer didn't accept DH group ECP_256, it requested MODP_2048

注意选择 cipher suit, 如果服务端不支持则会出现该异常

ipsec 使用 aes128-sha256 AES_CBC_128/HMAC_SHA1_96, 但 swanctl 不会优先尝试。

之后会从新选择

```
selected proposal: IKE:AES_CBC_128/HMAC_SHA1_96/PRF_HMAC_SHA1/MODP_2048
```

* ipsec.conf 配置 esp 或者 ah
* swanctl.conf 配置 esp_proposal

