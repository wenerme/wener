# UPS
## Tips
* 类型
  * Standby
    * 对电源充电，等待断电，断电后进行机械切换
    * 切换 20-100 ms
  * Line-Interactive
    * 类似于 Standby
    * 包含转换器，更好处理 brownouts 和 power sags
    * 适合 电涌和电压不稳定 场景
  * Online
    * 价格最贵
    * 通过电池吸引过滤，不存在切换
    * 将连接设备与实际供点隔离
* [Network UPS Tools](https://en.wikipedia.org/wiki/Network_UPS_Tools) - NUT
* SNMP Telnet 485 PDU
* 参考
  * [APC UPS 选择器](https://www.apc.com/shop/cn/zh/tools/ups_selector/) / [APC UPS Selector](https://www.apc.com/shop/us/en/tools/ups_selector)
  * [How to Select an Uninterruptible Power Supply (UPS) for Your Computer](https://www.howtogeek.com/161479/how-to-select-a-battery-backup-for-your-computer/)
  * APC [VA vs watt](https://download.schneider-electric.com/files?p_Doc_Ref=SPD_SADE-5TNQYF_EN)
  * [The difference between VA and watts](http://powerquality.eaton.com/thoughtleadership/power-protection/va-vs-watts.asp?cx=-400)
    * `Watts = VA * Power Factor`
    * `VA = Watts / Power Factor`
    * 例如一杯啤酒 🍺，VA 是酒花的最高点，实际的液体才是 Watt
