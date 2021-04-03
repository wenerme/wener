---
title: AT 指令
---

# AT 指令
- Hayes command set/AT command set

- [https://zh.wikipedia.org/wiki/海斯命令集](https://zh.wikipedia.org/wiki/海斯命令集)

```bash
# http://m2msupport.net/m2msupport/atcardlock-card-lock-command/
AT^CARDLOCK?
^CARDLOCK: 1,10,0 # 锁定
^CARDLOCK: 2,10,0 # 未锁定
# ^CARDLOCK: A,B,C
# A: 1 锁定 2 未锁定, B: 剩余次数, C: 使用的次数

# 测试是否有 AT 命令
AT
# 模型号
AT+CGMM
# 制造商
AT+CGMI

# 修改工作模式
# http://m2msupport.net/m2msupport/atu2diag-set-the-device-mode/
AT^U2DIAG=$MODE
# 0 Modem, 1 modem mode + CD ROM, 255 modem mode + CD ROM + Card Reader,  256 modem mode + Card Reader

# 查看系统状态
# http://m2msupport.net/m2msupport/atsysinfo-get-the-system-mode/
AT^SYSINFO

# IMEI
AT+CGSN
ATD*#06#

```
