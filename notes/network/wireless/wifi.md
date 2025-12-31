---
title: IEEE 802.11
tags:
  - Network
  - Wireless
  - WiFi
  - Protocol
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
- 802.11k/v/r - WiFi 快速漫游协议

---

- IEEE 802.11n - Wi-Fi 4
  - 150Mbps - 低端规格
  - 300Mbps - 目前常见
- AC - IEEE 802.11ac - Wi-Fi 5
  - AC2900 -> 2900Mbps
  - MIMO
- AX - IEEE 802.11ax - Wi-Fi 6
  - AX1800 -> 1800 Mbps
    - 2.4 GHz 574 Mbps + 5 GHz 1201 Mbps

|            | WiFi 4       | WiFi 5                | WiFi 6/6E         | WiFi 7          |
| ---------- | ------------ | --------------------- | ----------------- | --------------- |
| Date       | 2007         | 2013                  | 2019/2021         | 2024            |
| IEEE       | 802.11n      | 802.11ac              | 802.11ax          | 802.11be        |
| Date Rate  | 1.2Gbps      | 3.5Gbps               | 9.6Gbps           | 46Gbps          |
| Bands      | 2.5,5GHz     | 5GHz                  | 2.5,5GHz/6GHz     | 1-7.25GHz       |
| Security   | WPA2         | WPA2                  | WPA3              | WPA3            |
| Channels   | 20,40MHz     | 20,40,80,80+80,160MHz | same as WiFi 5    | <= 320MHz       |
| Modulation | 64 QAM, OFDM | 256 QAM, OFDM         | 1024 QAM, OFDMA   | 4096 QAM, OFDMA |
| MIMO       | 4x4 MIMO     | 4x4 MIMO,DL MU-MIMO   | 8x8 UL/DL MU-MIMO | 16x16 MU-MIMO   |

- WiFi 7 - 9.6 Gbpsx1.2x2x2=46 Gbps

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

## Security

- airmon-ng - 抓包
- aircrack-ng - 爆破
- hashcat - 爆破 hash
- [Crack WPA/WPA2 Wi-Fi Routers with Aircrack-Ng and Hashcat](https://github.com/brannondorsey/wifi-cracking)
  - [HN](https://news.ycombinator.com/item?id=14840539)
- WEP, WPA 不安全，很容易攻击
- WPA2 只能抓包爆破
- [d33tah/call-for-wpa3](https://github.com/d33tah/call-for-wpa3)
- [derv82/wifite2](https://github.com/derv82/wifite2)

## Tips

- [Captive Portal](https://captivebehavior.wballiance.com/)
- [Captive Portals - text/plain](https://textslashplain.com/2022/06/24/captive-portals/)
  - [HN Discussion](https://news.ycombinator.com/item?id=32092104)

- [IEEE 802.11 - Wikipedia](https://en.wikipedia.org/wiki/IEEE_802.11)
- [Wifi BSS ESS SSID ESSID BSSID](https://note-on-clouds.blogspot.com/2018/11/wifi-bss-ess-ssid-essid-bssid.html)
- [IEEE 802.11 frame format vs IEEE 802.3 frame format](https://dot11ap.wordpress.com/ieee-802-11-frame-format-vs-ieee-802-3-frame-format)

  802.11na 非官方

  802.11n can run in either the 2.4 GHz or 5.8 GHz bands.
  802.11a is 5.8GHz only.
  802.11g is 2.4 GHz only.

Juniper uses the terms 80.211na to mean "5.8 GHz 802.11n" and 802.11ng to mean "2.4 GHz 802.11n."

- [Understand Wi-Fi 4/5/6/6E/7 (802.11 n/ac/ax/be)](https://www.duckware.com/tech/wifi-in-the-us.html)

Wi-Fi 4 (2.4 GHz 802.11n) to Wi-Fi 5 (5 GHz 802.11ac), and now to Wi-Fi 6 (6 GHz 802.11ax
802.11ac wireless device will likely max out at around 600 Mbps (±60 Mbps) for 2x2 MIMO, to 1000 Mbps (±200 Mbps) for 4x4 MIMO

Gen Spec Year Speeds Unofficial name
802.11 1997 2 Mbps Wi-Fi 0 (beta)
First 802.11b 1999 11 Mbps Wi-Fi 1
Second 802.11a 1999 54 Mbps Wi-Fi 2
Third 802.11g 2003 54 Mbps Wi-Fi 3
