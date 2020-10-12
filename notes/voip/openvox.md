---
id: openvox
title: OpenVox
---

# OpenVox

* [OpenVox](http://www.openvox.cn/cn/)
* https://openvox.cn/pub/
* 型号格式
  * D - Digit, B - BRI, X - 混合, G - GSM, A - Analog, V - 编码转换卡, TAP - 录音卡, WCD - G 卡的 WCDMA 扩展模块
  * E - 回声消除
  * 数字 路数 1,2,4,8,24
  * 版本 10/30, 30 是 10 的升级
  * P - PCI, E - PCIE
* 210 vs 230
  * 230 has a longer wake width wise in the and not as steep; and the 210 has a steep shorter wake
  * The D230E/DE230E is an upgrade product of the D210E/DE210E.
* [D230E/DE230E on DAHDI User Manual](https://openvoxwiki.atlassian.net/wiki/spaces/UM/pages/917549/D230E+DE230E+on+DAHDI+User+Manual)
* http://www.openvox.cn/pub/
  * 公共文档
  * [D130/D230/D430 Series PRI Card_Datasheet](http://www.openvox.cn/pub/datasheets/English/D130_D230_D430_Series_PRI_Card_Datasheet.pdf)
* `cat /proc/interrupts`
  * 查看是否有独立中断
* 单机多卡需要时钟线
* A 卡都是附加 FXO-400, FSO-400
* D230E
  * [infineon](https://www.infineon.com/)
    * PEF 22554 HT v2.1
    * QuadFALC
    * G0624
    * Framer and LIU (Line Interface Unit) Component (FALC)
    * [Infineon Introduces 4-Line T1/E1/J1 Framer and LIU Component with Smallest Footprint and Lowest Power Consumption](https://www.infineon.com/cms/en/about-infineon/press/market-news/2002/129029.html)
  * 4x MNOVR MS1442 1443Y
  * AITRA cyclone IV
    * [Altera Cyclone® IV](https://www.altera.com.cn/products/fpga/cyclone-series/cyclone-iv/overview.html)
    * EP4CE10E17CBN
    * MALAYSIA
* 驱动下载 - https://openvox.cn/pub/drivers/dahdi-linux-complete/

## A810

* Communication controller: OpenVox Communication Co. Ltd. Device 0810 (rev 15)
* OpenVOX电话模拟语音卡 A810E Asterisk 卡8路语音卡FXO/FXS模块化 A810E
* AE810E/AE810P [手册](https://openvox.cn/pub/misc/AE810E_AE810P_Elastix%202.0.4_User_Manual_English.pdf)

```bash
modprobe –r opvxa24xx
```
