---
title: Media FAQ
tags:
  - FAQ
---

# Media FAQ

## is hevc/h265 ready

**NO**

---

- hevc 专利费用高
  - chrome 支持开源 av1
- Intel Skylake Core 6 开始支持解码 - 2015-08
- https://caniuse.com/?search=hevc
- Windows https://www.free-codecs.com/hevc_video_extension_download.htm
- 测试视频 https://www.libde265.org/downloads-videos/
- Google Chromecast 支持 https://developers.google.com/cast/docs/media
- [HEVC media on Apple devices](https://support.apple.com/en-hk/HT207022)

## nfo

- [NFO files](https://kodi.wiki/view/NFO_files)
- Jellyfin 使用 Kodi 的 nfo 格式
- [nfo-maker.com](https://nfo-maker.com/)

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

## 浏览器不支持 H.265 / HEVC

因为专利费用过高，目前基本没有浏览器支持 HEVC。

推荐使用 webm 包装。

厂商们联合构建了 [AOMedia](https://aomedia.org/about/) 来反抗 HEVC，使用 AV1 编码。

- Can I Use [hevc](https://caniuse.com/hevc)
  - safari 支持
    - 但是 jellyfin 播放的时候还是转码了
    - 原始视频编码 HEVC Main
- Can I Use [webm](https://caniuse.com/webm/embed/)
- Can I Use [av1](https://caniuse.com/av1)
- [Supported Media for Google Cast](https://developers.google.com/cast/docs/media)

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
