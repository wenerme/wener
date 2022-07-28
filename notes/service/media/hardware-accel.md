---
title: HW Accel
---

# HW Accel

| OS      | HW Acceleration         |
| ------- | ----------------------- |
| Linux   | QSV, NVENC, AMF, VA-API |
| Windows | QSV, NVENC, AMF         |
| MacOS   | VideoToolbox            |
| RPi     | V4L2                    |

| Vendor | HW Acceleration |
| ------ | --------------- |
| NVIDIA | NVENC           |
| AMD    | AMF, VA-API     |
| Intel  | QSV, VA-API     |
| Apple  | VideoToolbox    |
| RPi    | V4L2            |

| Project     | Graphics Gen              | Repo                                         |
| ----------- | ------------------------- | -------------------------------------------- |
| oneVPL      | gen12+                    | ​https://github.com/oneapi-src/oneVPL        |
| iHD driver  | gen8+                     | ​https://github.com/intel/media-driver       |
| Libva       | gen5+                     | ​https://github.com/intel/libva              |
| MSDK        | gen8 ~ gen12(Rocket Lake) | ​https://github.com/Intel-Media-SDK/MediaSDK |
| i965 driver | gen5 ~ gen9.5             | ​https://github.com/intel/intel-vaapi-driver |

- Intel QuickSync (QSV)
  - 基于 VAAPI
- 没有硬解支持 H.264 / AVC 10-bit
  - 升级为 HEVC 10-bit
- /usr/lib/dri/ - 安装的驱动
  - iHD_drv_video.so
  - i965_drv_video.so
- `/dev/dri/render*` DRM render node
- i915
- i965

```bash
cat /proc/cpuinfo | grep "model name" | uniq

apk add pciutils
lspci -nn | egrep -i "3d|display|vga"

apk add lshw
lshw -C display
lshw -c video

apk add inxi
inxi -G

# i915_cur_delayinfo
sudo sh -c 'cat /sys/kernel/debug/dri/*/name'


ls /dev/dri

# VA-API
# ==========
# AlpineLinux edge/testing libva-utils
apk -X https://mirrors.sjtug.sjtu.edu.cn/alpine/edge/testing add libva-utils
vainfo
# https://github.com/intel/libva-utils
# /dev/dri/renderXX

# Intel QSV
# =============
apk add intel-media-driver libva-intel-driver
sudo LIBVA_TRACE=/tmp/libva_trace.log DRI_PRIME=1 LIBVA_DRIVER_NAME=iHD vainfo

LIBVA_TRACE=/tmp/libva_trace.log DRI_PRIME=1 LIBVA_DRIVER_NAME=iHD ffmpeg -loglevel verbose -init_hw_device vaapi

# options i915 enable_guc=3
# options i915 enable_fbc=1
echo "options i915 force_probe=4692" | sudo tee /etc/modprobe.d/i915.conf

# GPU freq
sudo find /sys -type f -name gt_cur* -print0

# X11
# ==========
# apk add vdpauinfo
# vdpauinfo
grep -iE 'vdpau | dri driver' /var/log/Xorg.0.log

# FFMpeg
# =======
ffmpeg -hide_banner -decoders | grep qsv # 判断是否有加速
ffmpeg -hwaccel vaapi -vaapi_device /dev/dri/renderD128 -i "video.MP4" -vf "select=eq(pict_type\,I)" -vsync vfr -qscale:v 2 -f image2 "%08d.jpg"
```

## FFmpeg

- `{h264,hevc}_{videotoolbox,amf,vaapi}`
  - videotoolbox - macOS
  - amf - Windows
  - vaapi - Linux - vainfo
- -hwaccel auto
  - dxva2,cuda,d3d11va,videotoolbox
  - -hwaccel_device

```bash
ffmpeg -encoders | grep videotoolbox # 支持的 videotoolbox 编码
ffmpeg -h encoder=h264_videotoolbox  # 查看编码器选项

ffprobe in.mp4                           # 弄清楚原始 bitrate
ffmpeg -b:v 1900k -c:v h264_videotoolbox # -b:v 匹配原始 bitrate

# 使用 hwaccel 方式 - 外置 GPU
ffmpeg \
  -hwaccel videotoolbox -i in.mp4 \
  -c:v libx265 -preset medium -crf 28 \
  -c:a copy \
  out.mp4
```

- apple [VideoToolbox](https://developer.apple.com/documentation/videotoolbox)
  - Decode H.263, H.264, HEVC, MPEG1, MPEG2, MPEG4, ProRes
  - Encode H.264, HEVC, ProRes
  - 不支持 CRF/constant quality - 必须指定 -b:v
- [HWAccelIntro](https://trac.ffmpeg.org/wiki/HWAccelIntro)
  - macOS: VideoToolbox
  - OpenCL 大多平台支持，但是不可以 encode/decode - 用于 Filtering
  - [Hardware/QuickSync](https://trac.ffmpeg.org/wiki/Hardware/QuickSync)
- [Intel Quick Sync Video](https://en.wikipedia.org/wiki/Intel_Quick_Sync_Video)
  - 查看 Intel CPU 支持的编码
- [List of Macintosh models grouped by CPU type](https://en.wikipedia.org/wiki/List_of_Macintosh_models_grouped_by_CPU_type#Intel_x86)
  - 查看 Macbook 对应的 Intel CPU 版本
- [intel/media-driver](https://github.com/intel/media-driver)
  - Intel(R) Media Driver for VAAPI
- [joshuaboniface/rffmpeg](https://github.com/joshuaboniface/rffmpeg)
  - remote SSH FFmpeg
- archlinux [Hardware video acceleration](https://wiki.archlinux.org/title/Hardware_video_acceleration)
- https://jellyfin.org/docs/general/administration/hardware-acceleration.html
- [intel/intel-device-plugins-for-kubernetes](https://github.com/intel/intel-device-plugins-for-kubernetes)
- https://www.techspot.com/article/1131-hevc-h256-enconding-playback/
- https://www.elpamsoft.com/?p=Plex-Hardware-Transcoding
- [intel/vaapi-bypass](https://github.com/intel/vaapi-bypass)

## vaInitialize failed with error code 18

## 看不到显卡
- 尝试调整 BIOS - 修改为可切换显卡
