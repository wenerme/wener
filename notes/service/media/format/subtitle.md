---
title: 字幕
---

# 字幕

- .srt - SubRip
  - 最简单
- .aas - Advanced SubStation Alpha
  - 复杂、包含 srt 所有能力
- .vtt - WebVTT - Web Video Text Tracks
  - Web 用
- .ssa - Sub Station Alpha freeware
  - 复杂、少见、专用
- .ttml - Timed Text Markup Language
- sbv, sub, ttml, rt, scc, dfxp, tml, scc sami
- sup
- .ysjml - 人人译视界

```bash title="sup -> sub"
ffmpeg -i input.mkv -map 0:s:0 -c:s dvdsub -f matroska output.mks
mkvextract output.mks tracks 0:output.sub
del output.mks
```

## Sync

- [smacke/ffsubsync](https://github.com/smacke/ffsubsync)
  - MIT, Python
- [kaegi/alass](https://github.com/kaegi/alass)
  - Automatic Language-Agnostic Subtitle Synchronization
- [tympanix/subsync](https://github.com/tympanix/subsync)

```bash
# AlpineLinux
apk add ffmpeg python3 py3-pip py3-numpy alpine-sdk python3-dev
pip install ffsubsync


ffsubsync video.mp4 -i unsynchronized.srt -o synchronized.srt --gss
ffsubsync reference.srt -i unsynchronized.srt -o synchronized.srt --gss
```

## Tools

- [asticode/go-astisub](https://github.com/asticode/go-astisub)
  - .srt, .ssa, .ass, .stl, .ttml, .vtt
- [Aegisub/Aegisub](https://github.com/Aegisub/Aegisub)
  - BSD-3, C++
  - Cross-platform advanced subtitle editor

## srt

```srt
1
00:01:00,770 --> 00:01:01,780
已各就各位

2
00:01:01,780 --> 00:01:03,110
准备完毕
```

## ass

```ass
[Script Info]
Title: 字幕
ScriptType: v4.00+
PlayResX: 1280
PlayResY: 720
YCbCr Matrix: TV.601

[Aegisub Project Garbage]
Last Style Storage: Default
Audio File: file.mkv
Video File: file.mkv
Video AR Mode: 4
Video AR Value: 1.777778
Video Zoom Percent: 0.625000
Scroll Position: 504
Active Line: 507
Video Position: 25147

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,微软雅黑,58,&H00FFFFFF,&HF0000000,&H00030304,&H00000000,0,0,0,0,100,100,0,0,1,2,1,2,5,5,2,0

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:03:08.37,0:03:09.54,Default,,0,0,0,,{\fs45\shad0\bord0\b1\pos(625.6,304.4)}哈哈
```

## 形式

- 内置字幕
- 内挂字幕
- 外挂字幕
- 内嵌字幕
- 封装字幕
- 内封字幕

---

- 内置 - 硬字幕 - 视频包含字幕
- 外挂 - 外部文件 - 例如 .srt, .ass
- 内挂、封装、内封 - 在 mkv 里包含 字幕 文件
- CC - Closed Caption - 隐藏字幕
- SDH - Subtitles for the Deaf & Hard of Hearing
  - 字幕内容包含场景说明 - 例如 音乐、过场 说明
- AD - 口述音频
- HI

## Caption vs Subtitle

区别在于语言。

- Caption - 相同语言 - 辅助功能
  - Closed Caption - 隐藏字幕
    - 对于相同语言的人来说起辅助作用
    - Television Decoder Circuitry Act 要求 1993 年后产出电视必须支持 Closed Caption
  - Open Caption  - 提示信息、外国语对话、音乐、音效
- Subtitle - 语言不一定相同
