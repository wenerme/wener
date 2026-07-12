---
title: ESPHome
---

# ESPHome

- [esphome/esphome](https://github.com/esphome/esphome)
  - ESPHome 使用 YAML 配置为 ESP32、ESP8266、BK72xx、RP2040、nRF52、RTL87xx 等芯片生成固件，并接入 Home Assistant / MQTT 等自动化系统。
- 官网：https://esphome.io/
- 特点
  - YAML 配置，不需要直接写 C++。
  - 支持 OTA 更新。
  - 支持传感器、开关、灯、显示屏、总线、媒体、蓝牙代理等组件。
  - 默认偏本地控制，常和 Home Assistant native API 配合使用。

## CLI

```bash
# 创建配置
esphome wizard livingroom.yaml

# 校验、编译、上传、看日志
esphome run livingroom.yaml

# 只编译
esphome compile livingroom.yaml

# 看日志
esphome logs livingroom.yaml

# 清理构建缓存
esphome clean livingroom.yaml

# 启动 Device Builder / dashboard
esphome dashboard config
```

Docker：

```bash
docker pull ghcr.io/esphome/esphome

# Linux USB 首刷
docker run --rm --privileged \
  -v "$PWD":/config \
  --device=/dev/ttyUSB0 \
  -it ghcr.io/esphome/esphome run livingroom.yaml

# Dashboard
docker run --rm --net=host \
  -v "$PWD":/config \
  -it ghcr.io/esphome/esphome
```

- macOS Docker 不能直接透传 USB 设备，USB 首刷不适合在 Docker for Mac 内做；可用 ESPHome Web / esptool / 原生环境首刷。
- 首次刷入通常需要 USB；之后可通过 OTA 更新。
- Docker tag 建议固定到 `YEAR.MONTH` 或明确版本，不要无脑跟随 `latest`。

## 配置骨架

```yaml
substitutions:
  name: livingroom
  friendly_name: Living Room

esphome:
  name: ${name}
  friendly_name: ${friendly_name}
  project:
    name: wener.livingroom
    version: "1.0.0"

esp32:
  variant: esp32
  framework:
    type: esp-idf

logger:

api:
  encryption:
    key: !secret api_encryption_key

ota:
  - platform: esphome
    password: !secret ota_password

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: ${friendly_name} Fallback
    password: !secret fallback_ap_password
```

## 核心字段

| 字段 | 说明 |
| ---- | ---- |
| `esphome.name` | 节点名，影响 mDNS、OTA、构建目录 |
| `esphome.friendly_name` | 展示名称 |
| `esphome.project` | 项目信息，会暴露到 device info / logger / mDNS |
| `esp32.variant` | ESP32 芯片族，推荐显式设置 |
| `esp32.board` | PlatformIO board ID；新配置优先用 `variant`，`board` 主要影响 pin alias 和默认参数 |
| `esp32.framework.type` | `esp-idf` 或 `arduino`；新 ESP32 变体多要求 ESP-IDF |
| `logger` | 串口/运行日志 |
| `api` | Home Assistant native API |
| `ota` | OTA 更新入口 |
| `wifi` | Wi-Fi 和 fallback AP |
| `secrets.yaml` | 保存 Wi-Fi、API key、OTA password 等私密值 |
| `substitutions` | 字符串替换，适合统一设备名、GPIO、尺寸等参数 |
| `packages` | 拆分公共配置，适合多设备复用 |

## ESP32

- 至少设置 `esp32.variant` 或 `esp32.board` 之一。
- 官方推荐新配置优先用 `variant`；`board` 仍可用于兼容旧配置和 pin alias。
- 常见 `variant`：`esp32`、`esp32s2`、`esp32s3`、`esp32c3`、`esp32c6`、`esp32h2`、`esp32p4`。
- 经典 ESP32 没有原生 USB，刷机/串口依赖外部 USB-UART 或板载辅助 MCU。
- 如果商业设备里的 ESP32 在默认最高频率下重启或启动失败，可尝试设置 `cpu_frequency: 160MHz`。
- `flash_size` 不要写大于实际 flash 的值，否则可能无法启动。

```yaml
esp32:
  variant: esp32
  flash_size: 4MB
  cpu_frequency: 160MHz
  framework:
    type: esp-idf
```

## Packages

```yaml
packages:
  device: !include packages/device.yaml
  sensors: !include packages/sensors.yaml
  display: !include packages/display.yaml
```

- 用 `packages/` 拆分设备、传感器、显示、网络、通用行为。
- 配合 `substitutions` 可以复用同一份配置到多个设备。
- package 里使用新特性时，可以在 `esphome.min_version` 标注最低 ESPHome 版本。

## 常用组件

| 组件 | 用途 |
| ---- | ---- |
| `binary_sensor` | GPIO 按键、门磁、在线状态 |
| `sensor` | ADC、温湿度、Wi-Fi signal、uptime |
| `text_sensor` | Wi-Fi info、版本、IP |
| `switch` | GPIO 开关、模板开关 |
| `output` | PWM、LED、蜂鸣器输出 |
| `light` | 单色/RGB 灯 |
| `i2c` | I2C 总线和传感器 |
| `spi` | SPI 总线、显示屏、外设 |
| `display` | TFT、OLED、电子纸等显示 |
| `time` | Home Assistant / SNTP 时间源 |
| `web_server` | 本地 Web 管理页面 |

## 小喵掌机方向

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
    cs_pin: GPIO5
    dc_pin: GPIO4
    reset_pin: GPIO19
    rotation: 90
    dimensions:
      width: 128
      height: 160
```

- 小喵/MeowBit 类硬件可把 ESPHome 当作硬件验证工具：先验证 Wi-Fi、ADC、按键、I2C、TFT 显示，再决定是否转 MicroPython/LVGL/原生固件。
- GPIO34、GPIO35、GPIO36、GPIO39 是 input-only，适合按键/ADC，不适合作输出。
- TFT 与 MicroSD 共享 SPI 时，要确认各自 CS 和驱动访问方式。

## FAQ

### 改名后 OTA 找不到设备怎么办？

用旧地址上传一次：

```yaml
wifi:
  use_address: old-name.local
```

上传成功后再移除 `use_address`。

### 什么时候用 ESP-IDF，什么时候用 Arduino？

- 新项目优先 ESP-IDF。
- 需要 Arduino-only 组件或库时再考虑 Arduino framework。
- ESP32-C2/C5/C6/C61/H2/P4 等新变体通常要求 ESP-IDF。

### secrets.yaml 放什么？

- Wi-Fi SSID/password
- API encryption key
- OTA password
- MQTT password
- 外部服务 token

不要把 `secrets.yaml` 提交到公开仓库。

## 参考

- https://esphome.io/
- https://esphome.io/guides/getting_started_command_line
- https://esphome.io/components/esphome/
- https://esphome.io/components/esp32
- https://esphome.io/components/wifi
- https://esphome.io/components/api
- https://esphome.io/components/ota/esphome
- https://esphome.io/components/logger
- https://esphome.io/guides/configuration-types
