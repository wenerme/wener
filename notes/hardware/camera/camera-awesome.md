---
tags:
  - Awesome
---

# Camera Awesome

| abbr. | stand for          | cn         |
| ----- | ------------------ | ---------- |
| FOV   | Field of View      | 视场角     |
| MP    | Megapixel          | 百万像素   |
| WDR   | Wide Dynamic Range | 宽动态范围 |

| 传感器   | 最大分辨率 |   像素 | 适合用途                              |
| -------- | ---------- | -----: | ------------------------------------- |
| OV7670   | 640×480    |  0.3MP | 基础视觉实验                          |
| OV2640   | 1600×1200  |    2MP | 传统 ESP32-CAM                        |
| OV3660   | 2048×1536  |    3MP | 高分辨率拍照、低帧率监控              |
| OV5640   | 2592×1944  |    5MP | 高清拍照、图像分析                    |
| OV5647   | 2592×1944  |    5MP | 传统 Raspberry Pi Camera、兼容旧项目  |
| IMX219   | 3280×2464  |    8MP | Raspberry Pi 通用拍照、监控、野外相机 |
| IMX708   | 4608×2592  | 11.9MP | HDR、自动对焦、1080p 视频流           |
| IMX477   | 4056×3040  | 12.3MP | 高质量拍照、可换镜头、长曝光          |
| IMX296   | 1456×1088  | 1.58MP | 高速运动、机器视觉、多相机同步        |
| OV9281   | 1280×800   |    1MP | 高速黑白视觉、3D/深度、条码识别       |
| AR0234CS | 1920×1200  |  2.3MP | 全局快门机器视觉、机器人、动态场景    |

- [Raspberry Pi Camera hardware specification](https://github.com/raspberrypi/documentation/blob/master/documentation/asciidoc/accessories/camera/hardware_specification.adoc)：OV5647、IMX219、IMX708、IMX477 的分辨率对照。
- [Raspberry Pi Global Shutter Camera](https://www.raspberrypi.com/products/raspberry-pi-global-shutter-camera/)：IMX296、全局快门和机器视觉用途。
- [OMNIVISION OV9281](https://www.ovt.com/products/ov9281/)：1280×800、120 FPS、全局快门和黑白视觉用途。
- [onsemi AR0234CS](https://www.onsemi.com/products/sensors/image-sensors/ar0234cs)：1920×1200、2.3MP、全局快门。

## 接口

相机系统里的接口通常分成四层：传感器输出图像数据，控制总线配置传感器，摄像头模块再把图像封装成 USB/网络/长距离链路，音频则走独立的音频总线。

| 接口                   | 所在链路                    | 传输内容                                            | 常见使用情况                             | 说明                                                                                |
| ---------------------- | --------------------------- | --------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------- |
| MIPI CSI-2             | 传感器 → SoC/ISP            | RAW、YUV、RGB 等像素流                              | 手机、Raspberry Pi、Jetson、嵌入式 Linux | 当前嵌入式 raw camera 的主流接口，通常通过 MIPI D-PHY 或 C-PHY，按 lane 扩展带宽    |
| DVP / Parallel         | 传感器 → MCU/SoC            | 并行像素、PCLK、VSYNC、HSYNC/HREF                   | OV7670、OV2640、OV5640、ESP32-CAM        | 时序直观、容易接 MCU，但占用较多 GPIO，分辨率和频率提升后布线与时序压力较大         |
| I2C / SCCB             | SoC/MCU → 传感器            | 芯片 ID、寄存器、曝光、增益、分辨率、帧率等控制信息 | 几乎所有 raw sensor                      | 这是控制总线，不承载完整图像；OmniVision 常称 SCCB，实际电气和时序以 datasheet 为准 |
| SPI                    | SoC/MCU ↔ 传感器或桥接芯片 | 配置寄存器，少数模块也传低速图像                    | 特定传感器、热成像或小型摄像头模块       | 可作为控制接口，但通常不是高分辨率视频的主像素链路                                  |
| USB UVC                | 摄像头模块 → 主机           | UVC 视频帧，可为 YUYV、MJPEG 或其他格式             | USB Webcam、显微镜、采集卡               | 模块内部通常已经完成 sensor 配置、ISP 和 USB 封装，主机按标准 USB Video Class 使用  |
| Ethernet / GigE Vision | 摄像头 → 网络主机           | 网络数据包中的视频帧                                | 工业相机、IP Camera、多摄像头系统        | 适合长距离和多机部署；RTSP、ONVIF 属于上层协议，不是传感器接口                      |
| GMSL / FPD-Link        | Serializer → Deserializer   | 长距离串行视频、同步和控制通道                      | 汽车环视、机器人、远距离机器视觉         | 通常走同轴线或屏蔽双绞线；主机端解串后常再输出 MIPI CSI-2                           |
| SLVS-EC / sub-LVDS     | 传感器 → FPGA/ISP           | 高速原始像素流                                      | 工业相机、高速采集、定制板卡             | 适合高带宽板级设计，普通 MCU 和 SBC 很少直接使用                                    |
| I2S                    | 麦克风/音频 Codec ↔ SoC    | PCM 音频采样                                        | 带麦克风的 USB/网络摄像头、会议设备      | I2S 是音频总线，不传图像；摄像头的画面仍需同时走 MIPI、USB 或网络链路               |

### 常见组合

```text
传感器级相机

                    ┌─ MIPI CSI-2 / DVP / SLVS-EC ─→ SoC / ISP
Image Sensor ───────┤
                    └← I2C / SCCB / SPI：寄存器、曝光、增益、模式配置
```

```text
成品摄像头

Image Sensor → ISP / Encoder → USB UVC / Ethernet / GMSL / FPD-Link → 主机
Microphone  ─────────────────────────── I2S ───────────────────────→ SoC
```

- Raspberry Pi raw camera：通常是 `MIPI CSI-2 + I2C`，CSI-2 传图像，I2C 配置传感器；Linux 侧由 sensor subdev、CSI-2 receiver 和 ISP/应用组成。
- ESP32-CAM：常见组合是 `DVP + SCCB`，DVP 传像素，SCCB 配置 OV 系列传感器。
- USB Webcam：主机只看到 `USB UVC`，sensor 的 MIPI/DVP 和 ISP 通常都封装在摄像头内部。
- IP Camera/NVR：摄像头内部完成采集和编码，通过 Ethernet 输出 RTSP/ONVIF 等视频流；I2S 可能只用于内部麦克风音频。

- [Raspberry Pi CSI-2 usage](https://github.com/raspberrypi/documentation/blob/master/documentation/asciidoc/computers/camera/csi-2-usage.adoc)：CSI-2、Unicam、I2C/SPI sensor control 和 Linux V4L2 链路。
- [MIPI Camera Serial Interface 2](https://www.mipi.org/specifications/csi-2)：CSI-2、D-PHY/C-PHY 和嵌入式/汽车/机器视觉场景。
- [OMNIVISION OV7739](https://www.ovt.com/products/ov7739/)：并行 DVP、MIPI serial 和 SCCB 的传感器实例。
- [USB Video Class v1.5](https://www.usb.org/document-library/video-class-v15-document-set)：USB 摄像头的标准类协议。
- [Linux ASoC Digital Audio Interface](https://docs.kernel.org/sound/soc/dai.html)：I2S 的音频传输定义。
- [TI FPD-Link III serializer](https://www.ti.com/lit/ds/symlink/ds90ub933-q1.pdf) / [Analog Devices GMSL cameras](https://www.analog.com/en/resources/analog-dialogue/articles/gigabit-multimedia-serial-link-gmsl-cameras.html)：长距离相机 SerDes 链路。

| 模式 | 分辨率    |   像素 | 用途           |
| ---- | --------- | -----: | -------------- |
| QVGA | 320×240   | 0.08MP | 最基础移动检测 |
| VGA  | 640×480   | 0.31MP | 低成本变化检测 |
| SVGA | 800×600   | 0.48MP | 低资源视频监控 |
| XGA  | 1024×768  | 0.79MP | 平衡画质       |
| HD   | 1280×720  | 0.92MP | 视频流         |
| SXGA | 1280×1024 | 1.31MP | 中等清晰度拍照 |
| UXGA | 1600×1200 | 1.92MP | 高清抓拍       |
| QXGA | 2048×1536 | 3.15MP | 最高分辨率抓拍 |

- NVR/Motion
  - https://github.com/blakeblackshear/frigate
    - AI NVR
  - [motioneye-project/motioneye](https://github.com/motioneye-project/motioneye)
  - [ZoneMinder/zoneminder](https://github.com/ZoneMinder/zoneminder)
  - [Shinobi-Systems/ShinobiCE](https://gitlab.com/Shinobi-Systems/ShinobiCE)
    - Node
  - [kerberos-io/agent](https://github.com/kerberos-io/agent)
- Service/Infra
  - [AlexxIT/go2rtc](https://github.com/AlexxIT/go2rtc)
- https://github.com/espressif/esp32-camera
- OpenIPC
- Onvif
- P5V04A SUNNY
  - OmniVision OV5647
  - SUNNY（舜宇光学）
  - 500 MP
  - 2592 × 1944
  - 1080p @ 30fps
  - 720p @ 60fps
  - MIPI CSI-2
- Camera Module V1
- rtmp
- rtsp
- gb28181
- webrtc

```
Camera
   ↓
H.264 / H.265
   ↓
RTSP
   ↓
NVR
```

```
ESP32-CAM
    │
    │ HTTP MJPEG
    ▼
  go2rtc
    │
    │ FFmpeg → H.264
    ▼
  Frigate
    │
    ├── Motion Detection
    ├── Object Detection
    └── Recording
```

## 监控

| 分辨率    |  像素 | 建议                           |
| --------- | ----: | ------------------------------ |
| 640×480   | 0.3MP | 能发现移动，不适合看清面部     |
| 1280×720  | 0.9MP | 能看清大致行为                 |
| 1920×1080 |   2MP | 基本够用                       |
| 2560×1440 | 3.7MP | 画质与存储较平衡               |
| 2560×1920 |   5MP | 适合需要较多画面细节的场景     |
| 3840×2160 | 8.3MP | 适合大范围、需要裁切放大的场景 |

假设门口距离摄像头 3 米：

- 1080p：一般可以判断是否有人、穿什么衣服。
- 2K：有更多面部和衣物细节。
- 4K：适合需要进一步裁切的场景，但增加存储压力。

# 检测

- 640×360 5 FPS
- https://docs.frigate.video/frigate/camera_setup/?utm_source=chatgpt.com

| 类型        | 英文               | 检测内容             | 计算成本 |
| ----------- | ------------------ | -------------------- | -------- |
| 画面变化    | Frame Differencing | 前后画面是否有差异   | 很低     |
| 运动检测    | Motion Detection   | 某区域是否出现运动   | 低       |
| AI 目标检测 | Object Detection   | 人、车、动物、包裹等 | 中等到高 |
