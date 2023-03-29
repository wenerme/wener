---
title: strongSwan FAQ
tags:
- FAQ
---

# strongSwan FAQ

## no IDi configured, fall back on IP address

## ipsec.conf 自动重连

```ini
# 启动自动启动
auto=start

dpdaction=restart
closeaction=restart
keyingtries=%forever
```

## peer didn't accept DH group ECP_256, it requested MODP_2048

注意选择 cipher suit, 如果服务端不支持则会出现该异常

ipsec 使用 aes128-sha256 AES_CBC_128/HMAC_SHA1_96, 但 swanctl 不会优先尝试。

之后会从新选择

```
selected proposal: IKE:AES_CBC_128/HMAC_SHA1_96/PRF_HMAC_SHA1/MODP_2048
```

- ipsec.conf 配置 esp 或者 ah
- swanctl.conf 配置 esp_proposal

## giving up after 5 retransmits

```
12[IKE] establishing IKE_SA failed, peer not responding
```

**ipsec.conf**

```ini
dpdaction=restart
retransmit_tries=5
# default 3
keyingtries=%forever
```

**swanctl.conf**

```
connections {
  conn {
    # default 1
    keyingtries=0
    children {
      child {
        dpd_action=start
      }
    }
  }
}
```

- 参考
  - https://wiki.strongswan.org/issues/2665

## virtual ip 总是返回同一个

修改 id 会返回不同 ip

```
connections {
  vpn {
    remote {
      id=vpnx
      auth=psk
    }
    local {
      # 使用不同 ID
      id=vpnx
      auth=psk
    }
  }
```

## 多个客户端访问会掉

检查是不是 id 相同，获取到的 vip 相同，导致一个上另外一个会被挤下去。
