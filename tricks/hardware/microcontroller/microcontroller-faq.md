# 单片机 FAQ

## microcontroller vs microproceessor
* microproceessor/proceessor - 处理器
  * 通常用于 PC
  * ALU+CU+MU
  * 与其他组件交互 - 内存、硬盘等 IO 体系
  * 针脚固定
* microcontroller
  * 通常用于自动化控制
  * CPU+内存+外设
  * 通常是一个完整系统 - SoC
    * 有 ROM、RAM、外设等
  * 针脚可编程

## 单片机定义

* 常用名词
  * microcontroller
  * microcontroller unit - MCU
  * single chip microcomputer
  * system on chip - SoC
* 没有明确定义，根据上下文定位单片机
* 常见组件
  * CPU、RAM、ROM、IO
  * Timer、Counter
  * Interrupt Control
  * ADC、DAC
  * 串口
  * 振荡电路
  * GPIO

## 芯片封装方式
* [Integrated circuit packaging](https://en.wikipedia.org/wiki/Integrated_circuit_packaging)
* DIP
* QFP
* LCC
* PGA
* SOT/TSOP
* WB BGA
* SiP
* FCC BGA/CSP
* WL CSP
* QFN
* PoP/PiP 
* 3D WLP
* 2.5D interposer
* FO WLP
* Embedded SiP
* 3DIC
* FO PoP
* FO SiP
* wire bonding
  * 芯片覆膜
  * 牛屎芯片
* [Flip chip](https://en.wikipedia.org/wiki/Flip_chip)
  * 倒晶封装
