---
title: AT 指令
---

# AT 指令

- Hayes command set/AT command set
- [海斯命令集](https://zh.wikipedia.org/wiki/海斯命令集)
- [AT Commands](https://doc.qt.io/archives/qtextended4.4/atcommands.html)

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

## 历史

- V.250：该标准于 1995 年建立，1998 年重命名为 V.250
- ETSI GSM 07.07（3GPP TS 27.007）：用于控制 GSM modem 的 AT 指令集
- GSM 07.07 是基于 V.250 标准的。是目前最新的 AT 标准。
- 蜂窝模块、WiFi 模块、BLE 模块中，目的是为了简化嵌入式设备联网的复杂度

## 协议

AT 标准定义了 AT 命令的格式本身，比如命令以 AT 为前缀开头，以 或者 结尾，这被现有的 AT 模块所延用。

AT 开始，以 \r 或者 \r\n 结尾，参数之间使用 , 隔开，字符串参数使用双引号 "" 包裹，整形参数不适用双引号。

| Format         | Type    |
| -------------- | ------- |
| `AT+<x>=?`     | Test    |
| `AT+<x>?`      | Read    |
| `AT+<x>=<...>` | Set     |
| `AT+<x>`       | Execute |

在收到 +++，并且接下来 1s 内未收到其他数据的话，将从数据模式切换到指令模式。
数据模式，可以透传数据，client 发什么，server 就原封不动发出去。指令模式时，AT Server 需要解析 AT 指令，并作出响应。

## cellular extensions

- cellular extensions - 蜂窝网络扩充命令
  - 新的高通处理器使用 QMI 替代
