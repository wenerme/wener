---
title: Selkies
---

# Selkies

- [selkies-project/selkies](https://github.com/selkies-project/selkies)
  - MPL-2.0
  - 开源的低延迟、GPU/CPU 加速的 Linux WebRTC HTML5 远程桌面流媒体平台
  - 面向需要 3D 硬件加速的容器化应用（如云游戏、Graphical AI、仿真器）
  - 提供完整的 WebRTC 串流、K8s 编排支持，取代 noVNC / Guacamole，提供类似 GeForce NOW/Stadia 的体验
  - 核心架构包含 GStreamer（编码/WebRTC 转发）、Python 控制端、HTML5 前端组件和 WebRTC DataChannel
  - 最初由 Google 工程师发起并开源，后由云游戏和学术界研究人员主导扩展
- 参考
  - https://github.com/nickrunning/wechat-selkies
    - 基于Selkies的Linux网页版微信/QQ，支持本地中文输入法，支持AMD64和ARM64。

## Docker

- `ghcr.io/selkies-project/nvidia-glx-desktop` (支持 OpenGL GLX，适合 NVIDIA GPU)
- `ghcr.io/selkies-project/nvidia-egl-desktop` (支持 OpenGL EGL)

```bash
docker run --name selkies-desktop -it -d \
  --gpus 1 --runtime nvidia \
  --tmpfs /dev/shm:rw \
  -p 8080:8080 \
  -e TZ=UTC \
  -e DISPLAY_SIZEW=1920 -e DISPLAY_SIZEH=1080 \
  -e DISPLAY_REFRESH=60 -e DISPLAY_DPI=96 \
  -e PASSWD=mypasswd \
  -e SELKIES_ENCODER=nvh264enc \
  ghcr.io/selkies-project/nvidia-glx-desktop:latest
```

> **注意**：
>
> 1. `--tmpfs /dev/shm:rw` 是必须的，用于容器内的共享内存交换。
> 2. `SELKIES_ENCODER` 控制视频编码格式，硬件加速可选 `nvh264enc` 等，不支持 GPU 时可改为软件编码 `x264enc`, `vp8enc` 等。
> 3. 如果在无 Host Networking 且有防火墙的场景下，WebRTC 可能需要配置额外的 TURN Server 来建立连接（可以通过配置传入 TURN credentials）。
