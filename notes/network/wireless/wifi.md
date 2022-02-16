---
title: IEEE 802.11
---

# IEEE 802.11

- [IEEE 802.11](https://en.wikipedia.org/wiki/IEEE_802.11)
  - Wi-Fi
- OFDMA
- BSS Coloring
- Beamforming
- WPA3
- WEP
- WDS
- AP - Access Point
- Station = AP
- Plug-n-Share
- IBBS - Ad Hoc

| Known as | IEEE          |
| -------- | ------------- | -------- |
| WiFi 4   | IEEE 802.11n  | 450 Mbps |
| WiFi 5   | IEEE 802.11ac |
| WiFi 6   | IEEE 802.11ax |

- IEEE 802.11n - Wi-Fi 4
  - 150Mbps - 低端规格
  - 300Mbps - 目前常见
- AC - IEEE 802.11ac - Wi-Fi 5
  - AC2900 -> 2900Mbps
  - MIMO
- AX - IEEE 802.11ax - Wi-Fi 6
  - AX1800 -> 1800 Mbps
    - 2.4 GHz 574 Mbps + 5 GHz 1201 Mbps

**traffic**

| IEEE             | Data Rate |
| ---------------- | --------: |
| IEEE 802.11a     |   54 Mbps |
| IEEE 802.11b     |   11 Mbps |
| IEEE 802.11g     |   54 Mbps |
| IEEE 802.11n     |  450 Mbps |
| IEEE 802.11ac    | 1734 Mbps |
| 1024QAM (2.4GHz) |  750 Mbps |
| 1024QAM (5GHz)   | 2167 Mbps |

| IEEE      | for             |
| --------- | --------------- |
| [802.11s] | mesh networking |
| 802.11r   |
| 802.11w   |

---

- IEEE 802.11ax
  - 替代 IEEE 802.11ac
  - 用于高密度场景
  - OFDMA - Orthogonal frequency-division multiple access
  - Wi-Fi 6 - 2.4 GHz, 5 GHz
  - Wi-Fi 6E - 6 GHz

## WiFi Roaming

- Scanning
- Authentication
- Re-association
- 常见 AP 自带功能 - 无线客户端的信号低于设定值主动断开连接

## Mesh

- 硬件 - IEEE [802.11s]
  - Linux [IEEE 802.11s](https://wireless.wiki.kernel.org/en/developers/Documentation/ieee80211/802.11s)
  - 有线 Mesh
  - 无线 Mesh
    - 三频 - 预留一个频段用于 Mesh 回程
- 动态链路状态
  - B.A.T.M.A.N. - Better Approach To Mobile Adhoc Networking
    - https://www.open-mesh.org/
  - OLSR - Optimized Link State Routing
  - OSPF
- AC+AP - 最佳、需要预布线

[802.11s]: https://en.wikipedia.org/wiki/IEEE_802.11s
