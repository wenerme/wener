---
title: MTU
---

# MTU

- MTU - [Maximum transmission unit](https://en.wikipedia.org/wiki/Maximum_transmission_unit)
  - 最大传输单元
  - 超过 MTU 产生 碎片/fragment
    - 可配置 DF don't fragment
- Tinc 默认 PMTU 1431
- Ping 头 28 = 20 IP + 8 ICMP

| Transport              | MTU        | Desc                           |
| ---------------------- | ---------- | ------------------------------ |
| Ethvernet v2           | 1500       |
| Ethvernet jumbo frames | 1501-9202+ |
| PPPoE v2               | 1492       | PPPoE+8                        |
| IEEE 802.11/Wi-Fi      | 2304       | WEP+8,WPA-TKIP+20,WPA2-CCMP+16 |

```bash
# 一般最大 1464
# 1500=1464+20+8+8 = Body+IP+ICMP+PPoE
ping -s 1464 baidu.com

# 但有些支持更大的 MTU
ping -s 2000 wener.me
```

## PMTU

- PMTUD - Path MTU Discovery - 自动发现链路 MTU
  - IPv4 可选, IPv6 强制
- socket 选项 IP_MTU_DISCOVER - 默认开启
- 一般无连接，不稳定连接不会开启 PMTUD

```bash
# 为 0 表示开启 pmtu
cat /proc/sys/net/ipv4/ip_no_pmtu_disc

sudo apk add iputils
# 发信息/probe mtu
tracepath -n 114.114.114.114

# 返回当前的路由缓存和 MTU
ip route get 114.114.114.114
```
