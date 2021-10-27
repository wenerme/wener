---
title: Switch
---

# Switch

- 交换背板、交换矩阵
  - bps
- 包转发速率
  - pps
  - 千兆端口线速包转发速率 = `1000Mbps(84bytes*8)=1.488Mpps`
    - 84bytes
      - 20 bytes（tcp 报文头）
      - 20 bytes（ip 包头）
      - 6 bytes（pad）
      - 18 - 以太网帧头尾
      - 12 bytes 帧间隙
      - 8 bytes 前导码 Preamble
        - 7个字节为AA,接收端同步
        - 第8个字节为AB(帧定界符),用于定界,标明从现在开始后面的是以太网帧
- IPG Inter-Packet Gap 帧间隙
  - 发送12个字节的时间
- [Cisco 200 Series Switches Data Sheet](https://www.cisco.com/c/en/us/products/collateral/switches/small-business-200-series-smart-switches/data_sheet_c78-634369.html)
- [Performance metrics for switches](https://www.ibm.com/docs/en/spectrum-control/5.4.4?topic=metrics-performance-switches)
