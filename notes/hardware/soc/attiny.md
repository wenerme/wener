---
title: ATtiny
---

# ATtiny

- ATtiny / tinyAVR 是 Microchip AVR 8-bit MCU 的小封装、低资源分支。
- 适合低功耗、小 IO、小逻辑控制、传感器节点、按键/LED/蜂鸣器、简单 PWM/ADC 场景。
- 经典 ATtiny 多用 ISP / debugWIRE；新 tinyAVR 0/1/2-series 多用 UPDI。
- 参考通用 AVR 工具链：[AVR Development & Reverse Engineering](../microcontroller/dev/avr.md)

## 选型关注

| 关注点 | 说明 |
| ------ | ---- |
| Flash / SRAM | ATtiny13A 只有 1KB Flash / 64B SRAM；ATtiny85 有 8KB Flash / 512B SRAM，体验差异很大 |
| Pin count | 常见 8-pin 封装实际可用 IO 很少，`RESET` 复用为 IO 会影响后续 ISP 烧录 |
| 时钟 | 内部 RC 简单省料，但精度有限；串口、时间敏感协议要校准或用外部时钟 |
| 电压 / 频率 | 低电压下可用最高频率会下降；不要只看 `20MHz` 上限 |
| 编程接口 | 旧 ATtiny 常见 ISP；tinyAVR 0/1/2-series 常见 UPDI |
| 外设 | 小型号没有完整 UART/SPI/I2C，常通过 USI 或软件模拟 |
| Arduino 支持 | 可用第三方 core，但 fuse、bootloader、时钟配置要明确 |

## 经典型号

| 型号 | Flash | SRAM | EEPROM | IO / Pin | ADC | Timer / PWM | 接口 | 电压 | 备注 |
| ---- | ----- | ---- | ------ | -------- | --- | ----------- | ---- | ---- | ---- |
| ATtiny13A | 1KB | 64B | 64B | 6 IO / 8-pin | 4ch 10-bit | 1x 8-bit timer, 2 PWM | - | 1.8-5.5V | 极小资源，适合一次性小逻辑 |
| ATtiny25 | 2KB | 128B | 128B | 6 IO / 8-pin | 4ch 10-bit | 8-bit timer + high-speed timer | USI | 1.8-5.5V | ATtiny25/45/85 同族低容量版 |
| ATtiny45 | 4KB | 256B | 256B | 6 IO / 8-pin | 4ch 10-bit | 8-bit timer + high-speed timer | USI | 1.8-5.5V | ATtiny85 中间容量版 |
| ATtiny85 | 8KB | 512B | 512B | 6 IO / 8-pin | 4ch 10-bit | 6 PWM | SPI / I2C via USI | 1.8-5.5V | 经典 8-pin ATtiny，Arduino 生态常见 |

## ATtiny13A

- [ATtiny13A](https://www.microchip.com/en-us/product/ATTINY13A)
- 1KB ISP Flash、64B EEPROM、64B SRAM、32 个通用工作寄存器。
- 4-channel 10-bit ADC。
- 一个 8-bit timer/counter，两个 PWM channel。
- 最高 20 MIPS / 20MHz，工作电压 1.8-5.5V。
- 适合：状态机、小 LED/PWM、简单 ADC 采样、一次性控制逻辑。
- 不适合：复杂协议栈、较大查表、USB、复杂 UI。

## ATtiny85

- [ATtiny85](https://www.microchip.com/en-us/product/ATTINY85)
- 8KB ISP Flash、512B EEPROM、512B SRAM。
- 6 个通用 IO，8-pin 常见封装。
- 4-channel 10-bit ADC、1 个 analog comparator。
- 一个 8-bit timer/counter、一个 8-bit high-speed timer/counter、6 PWM。
- 支持 USI，可用于 SPI / I2C 类场景。
- 支持 watchdog、power-saving modes、debugWIRE。
- 适合：Digispark 类小板、简单 HID/USB bitbang 项目、传感器小节点、PWM/LED 控制。

## 新 tinyAVR 系列

- tinyAVR 0-series / 1-series / 2-series 是 Microchip 后续 tinyAVR 产品线，命名如 `ATtiny412`、`ATtiny1616`、`ATtiny3227`。
- 相比 ATtiny13A/25/45/85 这类经典型号，通常有更现代的外设、更多存储组合和 UPDI 编程接口。
- 新项目如果不依赖老 ATtiny 封装/库，优先看 tinyAVR 1/2-series。

| 系列 | 特点 | 注意 |
| ---- | ---- | ---- |
| tinyAVR 0-series | 低成本、现代外设、UPDI | 外设比 1-series 少 |
| tinyAVR 1-series | 更完整外设组合，常见 ADC、DAC、event system、configurable custom logic | 资料和工具链要按具体型号确认 |
| tinyAVR 2-series | 更新一代 tinyAVR，更多模拟和定时器能力 | Arduino/第三方 core 支持需单独确认 |

## 开发与烧录

```bash
# Alpine
apk add avr-gcc avr-libc avrdude

# 典型 ISP 烧录，型号按实际替换
avrdude -c usbasp -p t85 -U flash:w:firmware.hex:i

# 读取 fuse，先备份再改
avrdude -c usbasp -p t85 -U lfuse:r:lfuse.bin:r -U hfuse:r:hfuse.bin:r -U efuse:r:efuse.bin:r
```

- `-p t13`：ATtiny13 / 13A 常用 avrdude part id。
- `-p t85`：ATtiny85 常用 avrdude part id。
- UPDI 型号不要用 ISP 流程，使用支持 UPDI 的工具，如 pyupdi、SerialUPDI、jtag2updi 或 Microchip 工具。

## Arduino

- [SpenceKonde/ATTinyCore](https://github.com/SpenceKonde/ATTinyCore)
  - Arduino core for many classic ATtiny families.
- 使用 Arduino core 时要明确：
  - clock source / clock speed
  - brown-out detection
  - millis / timer 占用
  - reset pin 是否作为 IO
  - 是否需要 bootloader，或直接 ISP upload

## Fuse 注意事项

| 项目 | 风险 |
| ---- | ---- |
| Clock source | 选错外部时钟后，芯片可能看起来“死掉”，需要提供对应时钟才能恢复 |
| CKDIV8 | 默认分频可能导致实际频率比预期低 8 倍 |
| RESET disable | 把 reset pin 改成 GPIO 后，普通 ISP 不能再烧录，可能需要高压编程恢复 |
| Brown-out | BOD 电压过高会让低电压项目无法启动；过低可能导致 EEPROM/Flash 写入不可靠 |
| SPIEN | 关闭 SPI programming 会阻断 ISP |

## FAQ

### ATtiny13A 和 ATtiny85 怎么选？

- 极简单逻辑、成本/体积优先：ATtiny13A。
- 想用 Arduino 生态、要多一点 SRAM/Flash、要更舒服调试：ATtiny85。
- 新设计且不受老封装限制：优先看 tinyAVR 1/2-series。

### ATtiny 能不能用 I2C / SPI？

- ATtiny85 这类经典小型号通常通过 USI 支持 SPI/I2C 类用法，不等同于大 MCU 上完整 TWI/SPI 外设体验。
- 资源紧张时要注意中断、buffer 和时钟精度。

### 为什么烧录后程序运行很慢？

常见原因是默认 fuse 开了 `CKDIV8`，例如内部 8MHz RC 实际按 1MHz 跑。

### 为什么改 fuse 后烧不进去了？

常见原因：

- 选了外部晶振/外部时钟，但板上没有提供。
- 关闭了 reset pin。
- 关闭了 SPI programming。

## 参考

- [ATtiny13A](https://www.microchip.com/en-us/product/ATTINY13A)
- [ATtiny85](https://www.microchip.com/en-us/product/ATTINY85)
- [AVR Instruction Set Manual](https://ww1.microchip.com/downloads/aemDocuments/documents/MCU08/ProductDocuments/ReferenceManuals/AVR-InstructionSet-Manual-DS40002198.pdf)
- [tinyAVR 0-series Overview](https://onlinedocs.microchip.com/oxy/GUID-5A56DB3A-31E1-4F46-984F-39186535C84E-en-US-7/GUID-409AF466-FD03-4597-8CB2-F9B47C5B595D.html)
- [tinyAVR 1-series Overview](https://onlinedocs.microchip.com/oxy/GUID-4B32B28F-63FC-4320-842D-ECC5E5164A23-en-US-3/GUID-DE6A72E2-8433-4105-9455-F2ED02C57B7A.html)
- [ATtiny microcontroller comparison chart](https://en.wikipedia.org/wiki/ATtiny_microcontroller_comparison_chart)
- [AVR Development & Reverse Engineering](../microcontroller/dev/avr.md)
