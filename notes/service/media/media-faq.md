---
title: Media FAQ
---

# Media FAQ

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
