---
title: 电信术语
---

# 电信术语

- WG - Wireless Gateway
  - 无线网关
- GoIP
  - GSM over IP
  - SIM -> SIP 语音网关
- VoLTE - Voice over Long-Term Evolution
- UMTS - Universal Mobile Telecommunications System - 通用移动通讯系统
  - 3G
- Gobinet & QMI-WWAN - 高通 4G 解决方案
  - GobiNet 内核外模块
  - Linux 3.4 添加 QMI-WWAN - 功能少于 GobiNet，可由用户空间应用补齐
    - ofono, uqmi, libqmi
  - [GobiNet vs libqmi](https://wiki.postmarketos.org/wiki/QMI#GobiNet_vs_libqmi)

## wwan

## 卡池 - Card Pool

-  多个 SIM 口，同时只用一个 SIM 卡
- 通过控制卡池选择当前使用的卡
- 常见 1 拖 4、1 拖 8、 1 拖 128

## 猫池

- 提供 SIM 卡交互 - 通常为 AT 命令
- 一个猫对应一个 SIM 卡 - 对应一路并发
- 猫池通过一个串口线链接，通常一组为 8 个或 16 个猫
- 通常只有串口 AT 命令，而语音需要通过 Jack 接猫

# 模拟通讯

- ATA - Analog Telephone Adapter - 模拟电话适配器
  - 模拟电话、传真 转 数字电话、VoIP

## FX - Foreign eXchange service - 外部交换服务

- 端口是使用连接到的设备来命名的,而不是他做的事情.
- 例如 FXO 实际上是一个 station, 连接到 office.
- FXS 实际上是提供 office 的端口,可以将任意模拟信号设备插入 FXS 端口
- 模拟端口一般用在小型办公环境, 不多于 10 条线路 30 个话机.

## FXO - Foreign eXchange Office - 外部交换局

- Office - 一般为 PSTN 的中心
- 对线路供电,一般为 48v 直流
- 响铃(Ringing voltage)供电 一般为 90v 交流
- 提供拨号声音(dialtone)
- 检测联通状态 hook state (off-hook and on-hook)
- 发送必要的信号例如被叫 ID

## FXS - Foreign eXchange Station

- Station - 一般为一个电话,但也可能发是一个 modem 或者线路卡
- 提供响铃,处理 Ringing voltage
- 提供拨号面板或发送 DTMF 的方
- 提供线路状态检测
- Providing a hook switch to indicate the status of the line

## PBX - Private Branch Exchange - 专用小交换机

- 提供企业内部与 PTSN 电话交换能力
- 集成 电话、传真、调制解调器 等功能
- 通过 ext/extension 实现主线分机

- PABX - private automatic branch exchange - 用户自动交换机
- PMBX - private manual branch exchange - 用户手动交换机
- EPABX - electronic private automatic branch exchanges - 电子用户自动交换机

目前 PBX 已经不在只指代传统能力的 PBX，而是所有现代电话交换系统统称。
