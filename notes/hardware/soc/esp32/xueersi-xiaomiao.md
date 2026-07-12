---
title: 学而思小喵掌机
---

# 学而思小喵掌机

- XiaoMiao / 小喵掌机；Wener 实机外观和 PCB 对照确认与 KittenBot MeowBit v1 / `diegosanzmartin/Reversing-Meowbit-v1` 同版硬件高度一致。
- 主控：ESP32
- 外设：TFT、MicroSD、6 键、无源蜂鸣器、ADC 光照/热敏传感器、I2C、UART0
- 本页是实机观察、硬件推测和社区资料整理；`pysn2012/xueersi-xiaomiao` 只是参考来源之一，不代表官方资料。
- [pysn2012/xueersi-xiaomiao](https://github.com/pysn2012/xueersi-xiaomiao)
  - Apache-2.0, Python, ESP32, MicroPython, ESPHome, LVGL
  - 学而思 ESP32 小喵掌机开发资料，包含硬件引脚、MicroPython 示例、ESPHome 配置和预编译固件。
- [diegosanzmartin/Reversing-Meowbit-v1](https://github.com/diegosanzmartin/Reversing-Meowbit-v1)
  - MIT, C++
  - KittenBot 为 Xueersi Coding 平台开发的 MeowBit v1 硬件逆向资料，按键、LCD pinout 和板面布局可作为本机主要硬件参考。
- https://meowbit.kittenbot.cc/

## 硬件资源

| 模块 | 资源 | 说明 |
| ---- | ---- | ---- |
| 主控 | ESP32 | 常规 ESP32，仓库提供 ESP32 SPIRAM 固件 |
| 辅助 MCU | GD32 | 板上可见，疑似 USB-UART / 外设 / 下载辅助，需连线验证 |
| 显示 | SPI TFT / ST7735 类 | 128x160，SPI2，示例 rotation `90`；原屏具体驱动 IC 待确认 |
| 存储 | MicroSD | 与 TFT 共享 SPI2，通过 CS 分时复用 |
| 按键 | 上 / 下 / 左 / 右 / A / B | 6 键输入 |
| 蜂鸣器 | GPIO14 | 无源蜂鸣器，PWM / LEDC 驱动 |
| 光照 | GPIO36 / ADC1_CH0 | 仅输入 ADC |
| 温度 | GPIO39 / ADC1_CH3 | 热敏电阻，ESPHome 示例用 NTC |
| I2C | GPIO15 / GPIO21 | 图示列出 MPU6050 / 运动传感器、马达/LED 控制器 |
| UART0 | GPIO1 / GPIO3 | 原生串口；是否经过 GD32 待确认 |
| 侧边接口 | MOTOR-A / MOTOR-B | 上游图示标注；是否对应背面 `M1/M2` 2Pin 小座需追线确认 |
| 扩展 | GPIO33 / GPIO32 / GPIO26 / GPIO25 | 底部 1/2/3/4 扩展位；图上每路还标 `GVD`，疑似公共电源/地，需实测 |

## MeowBit 对照

- Wener 实机观察确认：手头这台小喵掌机与 `diegosanzmartin/Reversing-Meowbit-v1` 图片中的外观和 PCB 布局完全一致。
- KittenBot 官方 MeowBit 资料列出 TFT、Dual LEDs、Light Sensor、Temperature Sensor、6 Programmable Buttons、Passive Buzzer、SD Card Slot、Gyroscope、Expansion Pins、JacDac Port、Micro:bit-compatible 40-pin expansion connector。
- MeowBit v1 逆向资料中的按键 GPIO 与小喵仓库一致：`GPIO2/13/27/35/34/12`。
- MeowBit v1 逆向资料中的 LCD FPC 14Pin 与小喵资料一致：`DC GPIO4`、`MOSI GPIO23`、`SCK GPIO18`、`CS GPIO5`。
- 因此后续可以把 `Reversing-Meowbit-v1` 当作本机主要硬件基准；GD32 角色、右侧 M1/M2 接口和 IMU/扩展位的实际电气连接仍需实测确认。

## 上游图示信息

`pysn2012/xueersi-xiaomiao/image/xiaomiao.png` 是当前最完整的上游标注图之一，包含屏幕、SD、按键、UART、底部扩展、MOTOR-A/B 和 I2C 设备地址。

| 模块 | 图示信息 | 备注 |
| ---- | -------- | ---- |
| TFT 屏幕 | `SPI2: sck=18, mosi=23, cs=5, dc=4, res=19, bl=None` | ST7735 / SPI TFT 方向 |
| SD 卡 | `SPI2: sck=18, mosi=23, miso=19, cs=22` | 与 TFT 共享 `SCK/MOSI/MISO` |
| 按键 | 上 `2`、下 `13`、左 `27`、右 `35`、A `34`、B `12` | 与 MeowBit v1 逆向资料一致 |
| 蜂鸣器 | `14` | PWM / LEDC |
| 光照 | `36` | ADC input-only |
| 热敏电阻 | `39` | ADC input-only |
| UART | `TX=1`、`RX=3` | ESP32 UART0 |
| I2C | `SCL=15`、`SDA=21` | 图示列出姿态/运动传感器和马达/LED 控制器 |
| I2C 设备 | `0x68: MPU6050（运动传感器）`、`0x40: 马达/LED控制器` | 图示功能速记：`姿态(0x6B)`、`电机/LED(0x40)`；`0x68` 与 `0x6B` 的关系需结合驱动/scan 确认 |
| MOTOR-A / MOTOR-B | 左右侧绿色箭头标注 | 是否对应背面 `M1/M2` 2Pin 小座，需追线确认 |
| 底部扩展 | `1 -> GPIO33`、`2 -> GPIO32`、`3 -> GPIO26`、`4 -> GPIO25` | 图上每路上方还标 `GVD`，疑似公共电源/地，需万用表确认 |

图示里给出的 `0x40` I2C 写入示例：

```python
# 格式: i2c.writeto_mem(设备地址, 寄存器地址, 数据)
i2c.writeto_mem(0x40, 0xA0, bytes([1]))
# 向地址 0x40 的设备，在寄存器 0xA0 中写入数据 1

# 使用 writeto: 地址 + 数据
i2c.writeto(0x40, bytes(data_sequence))
# 告诉 0x40 设备接收这些数据，设备自行解析含义
```

## Pinout

| 功能 | 引脚 | 备注 |
| ---- | ---- | ---- |
| Key Up | GPIO2 | 输入 |
| Key Down | GPIO13 | 输入 |
| Key Left | GPIO27 | 输入 |
| Key Right | GPIO35 | 仅输入 |
| Key A | GPIO34 | 仅输入 |
| Key B | GPIO12 | 启动敏感，上电阶段避免外部高电平 |
| TFT SCK | GPIO18 | SPI2，与 SD 共享 |
| TFT MOSI | GPIO23 | SPI2，与 SD 共享 |
| TFT CS | GPIO5 | TFT 片选 |
| TFT DC | GPIO4 | TFT Data/Command |
| TFT RES | GPIO19 | 与 SD MISO 共享 |
| SD SCK | GPIO18 | SPI2，与 TFT 共享 |
| SD MOSI | GPIO23 | SPI2，与 TFT 共享 |
| SD MISO | GPIO19 | SPI2，与 TFT RES 共享 |
| SD CS | GPIO22 | SD 片选 |
| Buzzer | GPIO14 | PWM |
| Light ADC | GPIO36 | ADC1_CH0，仅输入 |
| NTC ADC | GPIO39 | ADC1_CH3，仅输入 |
| I2C SCL | GPIO15 | I2C |
| I2C SDA | GPIO21 | I2C |
| UART0 TX | GPIO1 | 原生串口 |
| UART0 RX | GPIO3 | 原生串口 |

## LCD FPC 14Pin

- 观察到的 14Pin 屏幕排线定义符合典型 SPI TFT LCD。
- `SCL` 对应 SPI Clock，`SDA` 对应 SPI MOSI。
- `VCC` / `IOVCC` / 背光供电方式需要实测后才能直接替换屏幕。

| Pin | Symbol | Function | 说明 |
| --- | ------ | -------- | ---- |
| 1 | NC | 空脚 | 未连接 |
| 2 | GND | 电源接地 | 地 |
| 3 | LEDK | 背光阴极 | 背光 LED 阴极 |
| 4 | LEDA | 背光阳极 | 背光 LED 阳极 |
| 5 | GND | 电源接地 | 地 |
| 6 | RESET | 显示屏复位脚 | LCD reset |
| 7 | D/C | 数据/命令控制脚 | Data / Command 选择 |
| 8 | SDA | 数据 | SPI MOSI / SDA |
| 9 | SCL | 时钟 | SPI SCLK |
| 10 | VCC | 模拟电压 | 屏幕供电，可能是 2.8V / 3.3V，需实测 |
| 11 | IOVCC | 逻辑电压 | IO 电平供电，通常 3.3V，需实测 |
| 12 | CS | 片选信号 | SPI CS |
| 13 | GND | 电源接地 | 地 |
| 14 | NC | 空脚 | 未连接 |

## LCD 替换推测

- 14Pin pinout 与常见 SPI TFT 模组接近，理论上可替换成 SPI 接口的 ST7789 屏幕。
- ST7789 常见信号包括 `VCC`、`GND`、`SCL`、`SDA`、`RES`、`DC`、`CS`、`BLK` / `LED`。
- 如果原屏也是 ST7789 / ST7735 / GC9A01 / ILI9341 类 SPI 屏，替换难度主要在 pinout、供电、初始化参数和 framebuffer 尺寸。
- 如果原屏已经是 ST7789 且只是分辨率不同，通常重点改 init sequence、分辨率、偏移量、RGB/BGR 和旋转方向。

| 检查项 | 说明 |
| ------ | ---- |
| 排线 pinout | 14Pin 顺序必须完全对应，不一致需要转接板 |
| FPC pitch | 间距要匹配，常见有 0.5mm 等规格，需量测 |
| 触点方向 | 同向 / 反向会影响能否直插 |
| VCC / IOVCC | 确认是 3.3V、2.8V 还是其它电压 |
| 背光驱动 | 确认 LEDA / LEDK 是直接供电、限流电阻还是开关管控制 |
| 屏幕尺寸 | 外形、可视区、固定结构要匹配外壳 |
| 初始化参数 | 分辨率、offset、RGB/BGR、rotation 因模组而异 |
| 固件驱动 | 需要能改 LCD init sequence、尺寸和 framebuffer |

### ST7789 可选方向

| 分辨率 | 常见尺寸 | 备注 |
| ------ | -------- | ---- |
| 240x240 | 1.3 / 1.54 寸 | 最常见，适合小掌机 |
| 240x280 | 1.69 寸 | 竖屏设备常见 |
| 240x320 | 2.0 寸左右 | 接近小屏手机比例 |
| 320x240 | 2.0 / 2.4 寸 | 横屏掌机更舒服 |

- ESP32 推 SPI TFT 时，分辨率越高刷新压力越大。
- UI、菜单和简单游戏可以考虑 240x320；复杂动画优先考虑 240x240 / 240x280。

## M1 / M2 与 MOTOR-A/B

- 上游 `xiaomiao.png` 图示把左右侧接口标成 `MOTOR-A` / `MOTOR-B`，同时列出 I2C `0x40` 为 `马达/LED控制器`。
- 背面板图可见两组 2Pin 小接口，丝印类似 `M1+ / M1-`、`M2+ / M2-`。
- 目前可以推测 `M1/M2` 与 `MOTOR-A/B`、I2C `0x40` 控制器有关，但还不能在未追线前直接确认电气连接和可承载负载。
- KittenBot 官方 MeowBit pinout 未把 `M1/M2` 列为可编程 IO 名称。
- 公开资料里 `M1/M2` 也常出现在 Robotbit 扩展板的 motor port 文档中，但那是外接扩展板，不能直接套用到小喵/MeowBit 本体。
- 验证前不要接低阻电机、外部供电或大电流负载。

| 检查项 | 目的 |
| ------ | ---- |
| 断电量 `M1+/-`、`M2+/-` 到 `GND` / `3V3` 的连通 | 判断是否是电源/地/信号 |
| 上电测两组接口静态电压 | 判断是否有固定供电或受控输出 |
| 追线到 ESP32 / GD32 / 驱动芯片 | 判断接口真实归属 |
| 观察运行时波形 | 判断是否为 UART、GPIO、PWM、I2C 或其它协议 |

## GD32 / USB-UART 推测

- 板上未见独立 USB-UART 芯片，同时观察到 GD32 MCU。
- 推测 GD32 可能承担 USB CDC 转 UART、ESP32 自动下载控制或外设辅助控制。
- 是否真实承担 USB-UART 需要用连线、枚举信息和串口行为确认。

| 可能方案 | 说明 |
| -------- | ---- |
| GD32 作为 USB-UART 桥 | GD32 连接 USB D+ / D-，再通过 UART 接 ESP32 |
| GD32 作为键盘 / 外设控制 MCU | 负责按键、蜂鸣器、传感器等，再和 ESP32 通信 |
| GD32 作为下载 / 烧录辅助芯片 | 控制 ESP32 EN / GPIO0，实现自动下载 |
| GD32 是主控之一 | ESP32 负责无线或应用，GD32 负责底层外设 |

### 验证点

| 检查项 | 判断 |
| ------ | ---- |
| USB D+ / D- 是否接到 GD32 | 如果直连 GD32，说明 GD32 至少参与 USB 侧功能 |
| GD32 UART 是否接 ESP32 U0RXD / U0TXD | 可验证是否作为 USB-UART 桥 |
| GD32 是否连接 ESP32 EN / GPIO0 | 可验证是否参与自动下载 |
| 插 USB 后 VID/PID / 串口名称 | CDC 串口且无 CH340/CP2102/FT232 时，GD32 做 USB CDC 的可能性较高 |

## IMU 预留推测

- 板上存在空置焊盘，疑似 MPU6050 / MPU6500 / ICM-206xx 一类 I2C IMU 预留位。
- 如果焊盘连接到 `GPIO15` / `GPIO21`，可尝试 I2C scan。
- 焊上 MPU6050 后，常见 I2C 地址为 `0x68` 或 `0x69`。

| 信号 | 说明 |
| ---- | ---- |
| VCC | IMU 供电 |
| GND | 地 |
| SCL | I2C clock，可能接 GPIO15 |
| SDA | I2C data，可能接 GPIO21 |
| INT | 中断脚，需追线确认 |
| AD0 | 地址选择脚，决定 `0x68` / `0x69` |

## 注意事项

- GPIO34、GPIO35、GPIO36、GPIO39 是 input-only，不能作为输出。
- GPIO12 是 ESP32 strapping pin；小喵掌机 B 键接在 GPIO12，上电阶段要避免外部高电平影响启动。
- TFT 与 MicroSD 共享 SPI2 的 GPIO18、GPIO23、GPIO19，通过不同 CS 分时访问。
- 上游 README 中的部分扩展说明需要按实机追线复核，不宜直接当作确定硬件结论。
- 如果使用 ESPHome 示例，示例 AP / Wi-Fi 配置应改成自己的配置，不要沿用公开仓库里的默认值。

## 下一步确认

| 优先级 | 项目 | 目的 |
| ------ | ---- | ---- |
| P0 | 测量 LCD `VCC` / `IOVCC` | 判断 ST7789 是否可直接接入 |
| P0 | 确认 FPC pitch 和触点方向 | 判断是否能直接换屏或需要转接 |
| P0 | 确认原屏驱动 IC | 判断是否只需改初始化参数 |
| P1 | 追 GD32 到 ESP32 的 UART / EN / GPIO0 | 判断 USB-UART、烧录和辅助控制路径 |
| P1 | 追右侧 `M1/M2` 2Pin 小座 | 判断是电源、GPIO、通信口还是专用模块接口 |
| P1 | 记录 USB VID/PID 和串口名称 | 验证 GD32 是否作为 USB CDC 设备 |
| P1 | 扫 I2C 总线 | 确认是否已有 IMU 或预留地址 |
| P2 | 测背光 LEDA / LEDK 驱动 | 判断换屏背光是否需要限流或开关控制 |

## 软件入口

| 路径 | 内容 |
| ---- | ---- |
| `bins/ESP32_SPIRAM_1.24_SDCARDST7735.bin` | 预编译 ESP32 SPIRAM / SDCard / ST7735 固件 |
| `bins/lvgl9.3_mpy_ESP32_GENERIC_SPIRAM_4MB_st7735.bin` | LVGL 9.3 + MicroPython 固件 |
| `microptyhon/` | MicroPython 示例；上游目录名保留拼写 `microptyhon` |
| `lvgl-mpy/` | LVGL MicroPython 示例、字体和 screen 示例 |
| `esphome/xiaomiao.yaml` | ESPHome 主配置，包含 Wi-Fi、packages、Home Assistant 时间同步 |
| `esphome/packages/device.yaml` | SPI / ST7735 显示配置 |
| `esphome/packages/sensors.yaml` | 在线状态、uptime、Wi-Fi、光照 ADC、NTC 温度、IP 信息 |
| `esphome/packages/fonts.yaml` | 字体配置 |

## MicroPython 初始化

```python
from machine import I2C, PWM, Pin, SPI

key_up = Pin(2, Pin.IN, Pin.PULL_UP)

spi = SPI(2, baudrate=40_000_000, sck=Pin(18), mosi=Pin(23), miso=Pin(19))
i2c = I2C(0, scl=Pin(15), sda=Pin(21))
buzzer = PWM(Pin(14), freq=2000, duty=512)
```

## ESPHome 片段

```yaml
spi:
  - id: lcd_spi
    clk_pin: GPIO18
    mosi_pin: GPIO23

display:
  - platform: mipi_spi
    id: tft_display
    model: ST7735
    spi_id: lcd_spi
    cs_pin: 5
    dc_pin: 4
    reset_pin: 19
    rotation: 90
    dimensions:
      width: 128
      height: 160
```

## 参考

- [pysn2012/xueersi-xiaomiao](https://github.com/pysn2012/xueersi-xiaomiao)
- [diegosanzmartin/Reversing-Meowbit-v1](https://github.com/diegosanzmartin/Reversing-Meowbit-v1)
- [Meowbit | Kittenbot](https://learn.kittenbot.cc/docs/meowbit/)
- [Meowbit Introductions](https://kittenbot-doc-en.readthedocs.io/en/latest/mainBoard/Meowbit/meowbit.html)
- [Kittenbot 中文站](https://www.kittenbot.cn/)
- [小喵科技产品文档](http://learn.kittenbot.cn/)
- [Arcade编程 | Kittenbot](https://kittenbot.cn/doc/hardware/meowbit/Arcade%E7%BC%96%E7%A8%8B/)
- [ESP32](./README.md)
- [Home Assistant](../../iot/home-assistant.md)
