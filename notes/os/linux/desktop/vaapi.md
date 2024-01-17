---
title: VA-API
---

# VA-API

- [intel/libva](https://github.com/intel/libva)
- VA-API - Videp Acceleration API
  - by Intel
  - 兼容更多
- VDPAU - Video Decode and Presentation API for Unix
  - by Nvdia
- DRI - Direct Rendering Infrastructure

```bash
apk add pciutils
lspci | grep -i graph
lspci -v -s $(lspci | grep VGA | cut -d" " -f 1)

apk add libva-utils
vainfo

apk add vdpauinfo
vdpauinfo

ls /usr/lib/dri/
ls /usr/lib/dri/${LIBVA_DRIVER_NAME}_drv_video.so

ls /dev/dri

LIBVA_DRIVER_NAME=iHD vainfo --device card1 --display drm
LIBVA_DRIVER_NAME=i1965 LIBVA_TRACE=./vainfo.log vainfo

# 内核模块
modinfo i915

# https://github.com/gjasny/v4l-utils
apk add v4l-utils
v4l2-ctl --list-devices
```

- LIBVA_DRIVER_NAME
- Intel graphics
  - libva-intel-driver i965
    - 早期 - brodwell、skylake
  - intel-media-driver iHD
    - 后期 - kebey lake、coffee lake
- NVIDIA
  - Nouveau `nouveau`.
  - NVIDIA VDPAU `vdpau`
  - NVIDIA NVDEC `nvidia`
- AMD
  - AMDGPU `radeonsi`
- libva-vdpau-driver
  - VDPAU backend for VA API
- VAProfileNone
- intel_gpu_top
  - debian intel-gpu-tools
- i915 内核通用模块
- V4L2 - Video4Linux2
  - 电视卡、网络摄像头、模拟视频采集卡
  - 视频设备管理和控制
- Iris
  - Intel Iris Graphics
  - Gen11 GPU
  - 优于 i964 Mesa
  - Ice Lake(9代)+

---

- CFL - Coffee Lake
- ICL - Ice Lake
- Intel N100
  - Intel® UHD Graphics
  - Alder Lake-N
  - https://ark.intel.com/content/www/us/en/ark/products/231803/intel-processor-n100-6m-cache-up-to-3-40-ghz.html
- https://en.wikipedia.org/wiki/Intel_Quick_Sync_Video#Hardware_decoding_and_encoding
- https://wiki.archlinux.org/title/Hardware_video_acceleration

```
00:02.0 VGA compatible controller: Intel Corporation Alder Lake-N [UHD Graphics] (prog-if 00 [VGA controller])
	DeviceName: Onboard - Video
	Subsystem: Intel Corporation Device 7270
	Flags: bus master, fast devsel, latency 0, IRQ 137
	Memory at 6000000000 (64-bit, non-prefetchable) [size=16M]
	Memory at 4000000000 (64-bit, prefetchable) [size=256M]
	I/O ports at 3000 [size=64]
	Expansion ROM at 000c0000 [virtual] [disabled] [size=128K]
	Capabilities: <access denied>
	Kernel driver in use: i915
```
