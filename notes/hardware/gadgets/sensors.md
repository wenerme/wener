---
title: 常用电子传感器与模块
tags:
  - Hardware
  - Sensor
  - Arduino
  - IoT
  - Electronics
---

# 常用电子传感器与模块 {#common-electronic-sensors-modules}

Arduino 和其他微控制器入门套件中常见的传感器和输入/输出模块参考列表。

## 环境传感器 {#environmental-sensors}

- **Temperature & Humidity (温湿度)**: 通常是 **DHT11** 或 **DHT22**。
- **Digital Temperature (数字温度)**: 通常基于 **DS18B20** (1-Wire 接口)。
- **Analog Temperature (模拟温度)**: 使用热敏电阻和分压器。
- **Flame Sensor (火焰传感器)**: 对火焰波长敏感的红外接收器。

## 运动与姿态 {#motion-orientation}

- **XY Joystick (XY 摇杆)**: 双轴模拟摇杆。
- **Rotary Encoder (旋转编码器)**: 用于确定旋转方向和数量的数字输入。
- **Ball/Tilt Switch (倾斜开关)**: 使用滚珠或水银 (旧版本) 检测物理倾斜。
- **Shock/Vibration Switch (震动开关)**: 检测物理冲击或移动。
- **Avoidance (避障碍)**: 红外接近传感器。
- **Tracking (循迹)**: 用于巡线机器人的红外反射传感器。

## 磁性与触摸 {#magnetic-touch}

- **Linear/Analog Hall (线性/模拟霍尔)**: 使用霍尔效应检测磁场强度。
- **Hall Magnetic (霍尔磁力)**: 磁场的二进制检测。
- **Reed Switch (磁簧开关)**: 在磁场中闭合的玻璃封装开关。
- **Touch Sensor (人体触摸)**: 电容式或电阻式触摸检测。

## 光与声 {#light-sound}

- **Photoresistor (光敏电阻)**: 检测环境光水平 (LDR)。
- **Light Cup (魔术光杯)**: 为了学习水银开关和 LED 组合。
- **Light Blocking (光遮断)**: 用于边缘/运动检测的光断续器。
- **Sound Sensors (声音/麦克风)**: 有高灵敏度 (Big Sound) 和小型变体。
- **Laser Emit (激光发射)**: 650nm 红色激光二极管模块。
- **IR Emission/Receiver (红外发射/接收)**: 用于遥控和通信。

## 输出与指示器 {#output-indicators}

- **Buzzer (蜂鸣器)**:
  - **Active (有源)**: 施加直流电源时发声。
  - **Passive (无源)**: 需要 PWM 信号产生不同音调。
- **LED Modules (LED 模块)**:
  - **RGB LED**: 红、绿、蓝封装在一起 (SMD 或直插)。
  - **Two-Color LED**: 通常是红/绿或红/蓝。
  - **7-Color Flash**: 自动变色闪烁 LED。
- **Relay (继电器)**: 用于控制高压 AC/DC 电路的电磁开关。

## 专用传感器 {#specialized-sensors}

- **Heartbeat Sensor (手指测心跳)**: 红外脉率传感器。
- **Tao Module (敲击模块)**: 压电冲击/敲击传感器。
