---
title: Raspberry Pi Sensors & Components (传感器与元器件)
tags:
  - Hardware
  - RaspberryPi
  - Sensors
  - Electronics
  - Components
  - 1-Wire
  - I2C
---

# Raspberry Pi Sensors & Components

A collection of technical specifications and pinout information for common sensors and electronic components used with the Raspberry Pi.

## Temperature Sensors

### DS18B20 (Digital Thermometer)

DS18B20 数字温度计是 DALLAS 公司生产的 1-Wire（单总线）器件，具有线路简单、体积小的特点。

- **特点**:
  - 独一无二的序列号，允许在一根通信线上挂载多个传感器。
  - 测量温度范围：-55°C 到 +125°C。
  - 可编程分辨率：9 位到 12 位。
  - 采用 1-Wire 协议，对读写数据位有着严格的时序要求（初始化、读、写时序）。

## Real-Time Clocks (RTC)

### DS1302

DS1302 是 DALLAS 公司推出的涓流充电时钟芯片，内含实时时钟/日历和 31 字节静态 RAM。

- [DS1302 Datasheet](http://datasheets.maximintegrated.com/en/ds/DS1302.pdf)
- **性能指标**:
  - 计算 2100 年之前的秒、分、时、日、星期、月、年。
  - 工作电压：2.0V - 5.5V。
  - 串行 I/O 口方式，仅需 3 根线：RST (复位)、I/O (数据)、SCLK (串行时钟)。
- **模块参数**:
  - 备用电池常用正品天球 CR2032 (3V, 260mAh)。
  - 晶振：32.768KHz。

### DS1307

| GND     | V<sub>BAT</sub> | X2          | X1                 |
| :------ | :-------------- | :---------- | :----------------- |
| **SDA** | **SCL**         | **SQW/OUT** | **V<sub>CC</sub>** |

## Infrared (IR) Components

### VS1838 / VS1838B (IR Receiver)

内含高速高灵敏度 PIN 光电二极管和低功耗、高增益前置放大 IC。

- **特性**:
  - 工作电压：2.7V - 5.5V。
  - 输出匹配 TTL、CMOS 电平，低电平有效。
  - 应用：音箱、电视、空调、电风扇等红外遥控产品。

## Optical & Light Sensors

### LDR (光敏电阻) 模块

- **特性**:
  - 采用灵敏型光敏电阻传感器。
  - 使用 LM393 比较器，驱动能力强 (>15mA)。
  - 数字开关量输出（0 和 1）。
  - **使用说明**: 环境光线亮度达不到设定阈值时，DO 端输出高电平；超过阈值时，DO 输出低电平。

## Connectivity & Tools

### USB 转 TTL (PL2303HX)

用于串口通信、机顶盒升级、路由器刷机等。

- **特点**:
  - 采用 PL2303HX 控制芯片。
  - 500mA 自恢复保险丝保护。
  - 预留 3.3V 与 5V 插针。
  - 支持 WIN7 及以下系统（较新版本 Windows 可能需要特定驱动）。

## Prototyping & Displays

### MB-102 830 (Breadboard)

- 端子条：630 个插孔。
- 分配条：200 个插孔。
- 尺寸：5.6 x 16.5 x 0.85 (cm)。

### 3461 LED (7-Segment Display)

- 0.36 英寸，4 位数码管，共阳极。

## Downloads & External Links

- [传感器相关资料 (Baidu Pan)](http://pan.baidu.com/s/1mgBsMxi)
- [光敏电阻模块资料 (Baidu Pan)](http://pan.baidu.com/s/1eQpQrzO)
