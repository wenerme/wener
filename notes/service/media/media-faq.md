---
title: Media FAQ
tags:
  - FAQ
---

# Media FAQ

| codec      | chrome              | safari               | notes                        |
| ---------- | ------------------- | -------------------- | ---------------------------- |
| **Image**  |
| webp       | 2014-01 Chrome 32+  | 2022-09 Safari 14.1+ |
| avif       | 2020-08 Chrome 85+  | 2023-03 Safari 16.4+ |
| **Video**  |
| av1        | 2018-10 Chrome 70+  | 2023-09 Safari 17.0+ | safari 要求硬件支持          |
| HEVC/H.265 | 2022-10 Chrome 107+ | 2019-09 Safari 11+   | chrome 要求硬件支持          |
| **Audio**  |
| webm       | 2013-01 Chrome 25+  | 2021-04 Safari 14.1  |
| opus       | 2014-02 Chrome 33+  | 2017-09 Safari 11+   | safari 要求 caf 或 webm 容器 |

## VP9

- Apple Safari 不支持 VP9
- Youtube 高清为 VP9

## HEIC

- HEIF - High Efficiency Image File Format
  - SDR, HDR
- HEIC: HEVC in HEIF
- AVIF: AV1 in HEIF
- AVCI: AVC in HEIF
- HEVC - High Efficiency Video Coding - ITU-T H.265
- MIAF - Multi-Image Application Format

---

- wikipedia [HEIF](https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format)

## MP4 vs MKV

- MKV - Matroska
  - 更宽泛的容器定义，几乎能包含任意视频、音频、字幕
  - Chapter
  - 多 Track 视频、音频
  - H.264/AVC
  - 支持蓝光
  - 劣势
    - 文件可能更大
    - 不同特性可能需要不同工具
    - MK3D, MKA, MKS 有点困扰
- MP4
  - 更简单容器，对内容格式有要求
  - 多个文件可保存为单个 MP4 文件
  - 复制、移动、上传更加友好
  - 劣势
    - 最高分辨率 1440x1080/30p (16:9)
    - 音频最高 2 channels/48 kHz
    - 音频 MPEG-4 AAC LC - 低复杂度编码

## 目录结构 / 命名标准

- Kodi [Naming video files](https://kodi.wiki/view/Naming_video_files)
  - Movies
  - TV Shows
    - 特殊季使用 S00
    - 分组目录
      - Star Trek Series - 系列分组
      - A-M - 名字分组
- TV Shows
  - Name (2020)
    - Name (2020) S01E01.mkv
    - Name (2020) S01E02.mkv
  - Name (2020) - DVD 的结构
    - Name (2020) S01E01
      - AUDIO_TS
      - VIDEO_TS
  - Name (2020) - BD 的结构
    - Name (2020) S01E01
      - BDMV
      - CERTIFICATE

## bitrate

|   res |    fps |        youtube ref |
| ----: | -----: | -----------------: | -------------: |
|  720p |  30fps |     1500-4000 kbps |       2-5 Mbps |
|  720p | 60 fps |     2250-6000 kbps |   2.9-7.4 Mbps |
| 1080P | 30 fps |     3000-6000 kbps |   3.8-7.4 Mbps |
| 1080P | 60 fps |     4500-9000 kbps |    5.6-11 Mbps |
| 1440P | 30 fps |   6000-13,000 kbps |  7.4-15.8 Mbps |
| 1440P | 60 fps |   9000-18,000 kbps |   11-21.8 Mbps |
|    4K | 30 fps | 13,000-34,000 kbps |   15.8-41 Mbps |
|    4K | 60 fps | 20,000-51,000 kbps | 24.2-61.5 Mbps |

|   res |    fps |     twitch ref |
| ----: | -----: | -------------: | -----------: |
|  720P | 30 fps | 2500-4000 kbps |   3.2-5 Mbps |
|  720P | 60 fps | 3500-5000 kbps | 4.4-6.2 Mbps |
| 1080P | 30 fps | 3500-5000 kbps | 4.4-6.2 Mbps |
| 1080P | 60 fps | 4500-6000 kbps | 5.6-7.4 Mbps |

- [Choose live encoder settings, bitrates, and resolutions](https://support.google.com/youtube/answer/2853702?hl=en#zippy=%2Ck-p-fps%2Cp-fps%2Cp)
- https://stream.twitch.tv/encoding/
- https://www.facebook.com/help/1534561009906955?helpref=faq_content
- https://toolstud.io/video/bitrate.php
- https://www.omnicalculator.com/other/streaming-bitrate
- https://castr.io/bitrate-calculator/
