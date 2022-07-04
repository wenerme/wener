---
title: FFMpeg FAQ
tags:
  - FAQ
---

# FFMpeg FAQ

## 提取音轨

```bash
# 确认音频信息
ffprobe in.avi

ffmpeg -i in.avi -vn -acodec copy out.aac      # 单音频时
ffmpeg -i in.mkv -map 0:a:3 -c copy out.m4a    # 提取 #3
ffmpeg -i in.mov -map 0:a -c copy out.mov      # 提取所有
ffmpeg -i in.mp4 -q:a 0 -map a -c copy out.aac # 提取 #0 音轨
```

## 添加音轨

```bash
# 替换 #0
ffmpeg -i in.mp4 -i in.wav -map 0:v -map 1:a -c:v copy -shortest out.mp4
# 添加 并设置语言
ffmpeg -i in.mkv -i in.mp3 -map 0 -map 1:a -metadata:s:a:1 language=chi -c:v copy -shortest out.mkv
# 混合
ffmpeg -i in.mkv -i in.m4a -filter_complex "[0:a][1:a]amerge=inputs=2[a]" -map 0:v -map "[a]" -c:v copy -ac 2 -shortest out.mkv
```

## Protocol 'https' not on whitelist 'file,crypto,data'

```bash
ffmpeg -protocol_whitelist file,http,https,tcp,tls,crypto -i MIE.m3u8 -c copy -bsf:a aac_adtstoasc MIE.mp4
```

## FFmpeg Service01.kms key

加密视频

```m3u8
#EXT-X-KEY:MEATHOD=AES-128,URI=""
```

- 以 encrypt-stream.m3u8 一般为阿里云加密,不好解密
- 解密方式
  - [nilaoda/N_m3u8DL-CLI#473](https://github.com/nilaoda/N_m3u8DL-CLI/issues/473)

## 添加字幕

```bash
# 嵌套
# 烧录字幕到视频 -vf subtitles=subtitles.srt
# -vf ass=subtitles.ass
# 单独指定 copy - -c:v copy -c:a copy -c:s mov_text
ffmpeg -i in.mp4 -i in.srt -c copy -c:s mov_text out.mp4


# MKV
# -metadata:s:s:0 language=eng
ffmpeg -i input.mp4 -f srt -i input.srt \
  -map 0:0 -map 0:1 -map 1:0 -c:v copy -c:a copy \
  -c:s srt  output.mkv
```

## 硬件加速

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

- `{h264,hevc}_{videotoolbox,amf,vaapi}`
  - videotoolbox - macOS
  - amf - Windows
  - vaapi - Linux - vainfo
- -hwaccel auto
  - dxva2,cuda,d3d11va,videotoolbox
  - -hwaccel_device
- [VideoToolbox](https://developer.apple.com/documentation/videotoolbox)
  - Decode H.263, H.264, HEVC, MPEG1, MPEG2, MPEG4, ProRes
  - Encode H.264, HEVC, ProRes
  - 不支持 CRF/constant quality - 必须指定 -b:v
- [HWAccelIntro](https://trac.ffmpeg.org/wiki/HWAccelIntro)
  - macOS: VideoToolbox
  - OpenCL 大多平台支持，但是不可以 encode/decode - 用于 Filtering
- [Intel Quick Sync Video](https://en.wikipedia.org/wiki/Intel_Quick_Sync_Video)
  - 查看 Intel CPU 支持的编码
- [List of Macintosh models grouped by CPU type](https://en.wikipedia.org/wiki/List_of_Macintosh_models_grouped_by_CPU_type#Intel_x86)
  - 查看 Macbook 对应的 Intel CPU 版本


## Tag hvc1 incompatible with output codec id avc1

```bash
ffmpeg -i in.mp4 -tag:v hvc1 -c:a copy -c:v copy -movflags faststart out.mp4
```